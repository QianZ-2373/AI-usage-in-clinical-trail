/* Clinical AI Intelligence Observatory - front-end logic */
(function () {
  "use strict";

  var STORAGE_KEY = "ai_ct_tracker_data_v19";
  var NEW_DAYS = 120; // documents updated within this window are flagged NEW

  // ---------- Data loading: prefer localStorage overrides ----------
  function loadData() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) { /* ignore */ }
    return JSON.parse(JSON.stringify(window.DATA || { organizations: [], themes: [] }));
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
    } catch (e) {
      alert("Failed to save to browser: " + e.message);
    }
  }

  var state = {
    data: loadData(),
    view: "all",          // "all" | orgId | "compare" | "changes"
    query: "",
    sort: "org",
    openTimelines: {},     // docId -> true
    collapsedOrgs: {},     // orgId -> true
    orgSort: {},           // orgId -> "date" | "impact"
    editing: null,
    highlight: {}          // docId -> true (flash after jumping from the matrix)
  };

  // ---------- Helpers ----------
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function toTime(d) {
    if (!d) return 0;
    var m = String(d).match(/(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?/);
    if (!m) return 0;
    var y = +m[1], mo = m[2] ? +m[2] - 1 : 0, day = m[3] ? +m[3] : 1;
    return new Date(y, mo, day).getTime();
  }

  function isNew(d) {
    var t = toTime(d);
    if (!t) return false;
    return (Date.now() - t) <= NEW_DAYS * 24 * 3600 * 1000;
  }

  function avgScore(doc) {
    var s = doc.scores;
    if (!s) return null;
    var vals = [s.impact, s.rigor, s.foresight].filter(function (v) { return typeof v === "number"; });
    if (!vals.length) return null;
    var sum = vals.reduce(function (a, b) { return a + b; }, 0);
    return Math.round((sum / vals.length) * 10) / 10;
  }

  // Sort documents so the most recently published appear first
  function byPublishedDesc(a, b) {
    return toTime(b.publishedAt) - toTime(a.publishedAt);
  }

  function dim(name, val) {
    var pct = Math.max(0, Math.min(5, val || 0)) / 5 * 100;
    return '<span class="dim">' +
        '<span class="dim-name">' + esc(name) + '</span>' +
        '<span class="dim-bar"><i style="width:' + pct + '%"></i></span>' +
        '<span class="dim-val">' + esc(val) + '</span>' +
      '</span>';
  }

  function matchesQuery(org, doc) {
    if (!state.query) return true;
    var q = state.query.toLowerCase();
    var hay = [org.name, doc.title, doc.summary, doc.type, (doc.topics || []).join(" ")].join(" ").toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function typeLabel(t) {
    if (t === "publish") return "Published";
    if (t === "update") return "Updated";
    if (t === "consultation") return "Consultation";
    return t || "";
  }

  function themeById(id) {
    return (state.data.themes || []).find(function (t) { return t.id === id; });
  }
  function themeLabel(id) {
    var t = themeById(id);
    return t ? t.label : id;
  }

  function findOrg(id) {
    return (state.data.organizations || []).find(function (o) { return o.id === id; });
  }

  // Newest entry of the refresh log (what changed at the last reconciliation)
  function latestRefresh() {
    var log = state.data.refreshLog || [];
    if (!log.length) return null;
    return log.slice().sort(function (a, b) { return toTime(b.date) - toTime(a.date); })[0];
  }

  // Resolve a partial date ("2026", "2026-07", "2026-07-27") to the earliest day
  // it can refer to, plus how precisely it was stated.
  function dateSpan(d) {
    var m = String(d || "").match(/^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?/);
    if (!m) return null;
    var y = +m[1];
    if (m[3]) return { start: new Date(y, +m[2] - 1, +m[3]).getTime(), precision: "day" };
    if (m[2]) return { start: new Date(y, +m[2] - 1, 1).getTime(), precision: "month" };
    return { start: new Date(y, 0, 1).getTime(), precision: "year" };
  }

  // A date qualifies when the earliest day it can refer to already falls inside
  // the window. A month-only date therefore needs the whole month to start on or
  // after the window opens, so "2026-06" is not read as late June. Year-only
  // dates are too coarse to place and never qualify.
  function inWindow(d, w) {
    var s = dateSpan(d);
    if (!s || s.precision === "year") return false;
    return s.start >= w.startTime && s.start <= w.endTime;
  }

  // What's new is strictly date-driven: a document qualifies only if it was
  // first published inside the reporting window, or if its trajectory carries
  // an entry dated inside the window. Nothing else is listed.
  function windowChanges() {
    var latest = latestRefresh();
    if (!latest) return null;

    var w = { start: latest.windowStart || latest.date, end: latest.date };
    w.startTime = toTime(w.start);
    w.endTime = toTime(w.end);

    // The refresh log only supplies editorial annotations now, not membership.
    var notes = {}, changes = {};
    (latest.added || []).forEach(function (a) { notes[a.doc] = a.note || ""; });
    (latest.updated || []).forEach(function (u) { changes[u.doc] = u.change || ""; });

    var added = [], updated = [];

    (state.data.organizations || []).forEach(function (org) {
      (org.documents || []).forEach(function (doc) {
        if (inWindow(doc.publishedAt, w)) {
          added.push({ org: org, doc: doc, note: notes[doc.id] || "" });
          return;
        }
        var records = (doc.history || []).filter(function (h) { return inWindow(h.date, w); });
        if (!records.length) return;
        records.sort(function (a, b) { return toTime(b.date) - toTime(a.date); });
        updated.push({ org: org, doc: doc, change: changes[doc.id] || "", records: records });
      });
    });

    added.sort(function (a, b) { return toTime(b.doc.publishedAt) - toTime(a.doc.publishedAt); });
    updated.sort(function (a, b) { return toTime(b.records[0].date) - toTime(a.records[0].date); });

    w.added = added;
    w.updated = updated;
    return w;
  }

  // Resolve a document id to its { org, doc } pair
  function locateDoc(docId) {
    var orgs = state.data.organizations || [];
    for (var i = 0; i < orgs.length; i++) {
      var docs = orgs[i].documents || [];
      for (var j = 0; j < docs.length; j++) {
        if (docs[j].id === docId) return { org: orgs[i], doc: docs[j] };
      }
    }
    return null;
  }

  // ---------- Nav ----------
  var orgNav = document.getElementById("orgNav");

  function navSvg(paths) {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + paths + '</svg>';
  }

  function navLogo(org) {
    var color = org.brandColor || "#7A00E6";
    var mono = esc((org.logoText || org.short || org.name || "?").slice(0, 2));
    var src = org.logo || (org.domain ? faviconUrl(org.domain) : "");
    if (src) {
      return '<img class="nav-logo" src="' + esc(src) + '" alt="" ' +
        'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';" />' +
        '<span class="nav-logo mono" style="display:none;background:' + esc(color) + '">' + mono + '</span>';
    }
    return '<span class="nav-logo mono" style="background:' + esc(color) + '">' + mono + '</span>';
  }

  function renderNav() {
    var orgs = state.data.organizations || [];

    function orgChip(o) {
      var active = state.view === o.id ? " active" : "";
      var c = catInfo(o);
      var brand = c ? c.color : (o.brandColor || "#7A00E6");
      return '<button class="nav-chip nav-org' + active + '" data-view="' + esc(o.id) + '"' +
        ' style="--brand:' + esc(brand) + '"' + (c ? ' title="' + esc(c.label) + '"' : '') + '>' +
        navLogo(o) + '<span>' + esc(o.short || o.name) + '</span></button>';
    }

    var overview = '<button class="nav-chip nav-overview' + (state.view === "all" ? " active" : "") + '" data-view="all">' +
      navSvg('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>') +
      '<span>Overview</span></button>';
    var compare = '<button class="nav-chip compare' + (state.view === "compare" ? " active" : "") + '" data-view="compare">' +
      navSvg('<path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>') +
      '<span>Cross-comparison</span></button>';
    var chg = windowChanges();
    var chgCount = chg ? (chg.added.length + chg.updated.length) : 0;
    var whatsNew = '<button class="nav-chip whatsnew' + (state.view === "changes" ? " active" : "") + '" data-view="changes">' +
      navSvg('<path d="M12 2v4M12 18v4M4.9 4.9l2.9 2.9M16.2 16.2l2.9 2.9M2 12h4M18 12h4M4.9 19.1l2.9-2.9M16.2 7.8l2.9-2.9"/>') +
      '<span>What&#39;s new</span>' +
      (chgCount ? '<em class="nav-count">' + chgCount + '</em>' : '') +
      '</button>';

    var order = ["regulator", "cro", "consultancy", "consortium", "research", "academia"];
    var groups = {};
    orgs.forEach(function (o) { var k = o.category || "other"; (groups[k] = groups[k] || []).push(o); });
    var keys = order.filter(function (k) { return groups[k]; });
    Object.keys(groups).forEach(function (k) { if (order.indexOf(k) < 0) keys.push(k); });

    var boxes = keys.map(function (k) {
      var c = CATEGORY[k];
      var color = c ? c.color : "#6b6485";
      var label = c ? c.label : "Other";
      var icon = c ? navSvg(c.icon).replace('width="16" height="16"', 'width="13" height="13"') : "";
      var wide = groups[k].length >= 4 ? " wide" : "";
      return '<section class="nav-gbox' + wide + '" style="--cc:' + color + '">' +
        '<div class="nav-gtitle">' + icon + '<span>' + esc(label) + '</span><em>' + groups[k].length + '</em></div>' +
        '<div class="nav-gchips">' + groups[k].map(orgChip).join("") + '</div>' +
      '</section>';
    }).join("");

    var html =
      '<div class="nav-primary">' + overview + compare + whatsNew + '</div>' +
      '<div class="nav-groups">' + boxes + '</div>';
    orgNav.innerHTML = html;

    orgNav.querySelectorAll("[data-view]").forEach(function (el) {
      el.addEventListener("click", function () {
        state.view = el.getAttribute("data-view");
        window.scrollTo({ top: 0, behavior: "smooth" });
        render();
      });
    });
  }

  // ---------- Render ----------
  var content = document.getElementById("content");
  var toolbar = document.getElementById("toolbar");

  function render() {
    renderNav();
    if (state.view === "compare") {
      toolbar.style.display = "none";
      renderCompare();
    } else if (state.view === "changes") {
      toolbar.style.display = "none";
      renderChanges();
    } else if (state.view === "all") {
      toolbar.style.display = "none";
      renderOverview();
    } else {
      toolbar.style.display = "block";
      renderDocs();
    }
  }

  function visibleOrgs() {
    var orgs = state.data.organizations || [];
    if (state.view !== "all" && state.view !== "compare" && state.view !== "changes") {
      orgs = orgs.filter(function (o) { return o.id === state.view; });
    }
    return orgs;
  }

  function renderDocs() {
    var orgs = visibleOrgs();
    var totalDocs = 0, shownDocs = 0;

    var filtered = orgs.map(function (org) {
      var docs = (org.documents || []).filter(function (doc) {
        totalDocs++;
        var ok = matchesQuery(org, doc);
        if (ok) shownDocs++;
        return ok;
      });
      return { org: org, docs: docs };
    }).filter(function (g) { return g.docs.length > 0; });

    var html = "";
    if (state.sort === "org") {
      html = filtered.map(renderOrg).join("");
    } else {
      var flat = [];
      filtered.forEach(function (g) {
        g.docs.forEach(function (doc) { flat.push({ org: g.org, doc: doc }); });
      });
      var key = state.sort === "updated" ? "updatedAt" : "publishedAt";
      flat.sort(function (a, b) { return toTime(b.doc[key]) - toTime(a.doc[key]); });
      html = '<div class="org"><div class="org-body" style="padding-top:8px;">' +
        flat.map(function (item) { return renderDoc(item.org, item.doc, true); }).join("") +
        '</div></div>';
    }

    content.innerHTML = html || '<div class="empty">No matching results.</div>';
    // Highlight flashes only once, then clear it so later re-renders don't re-trigger
    state.highlight = {};

    var scope = state.view === "all" ? (state.data.organizations || []).length + " organizations" : "1 organization";
    document.getElementById("countLabel").textContent =
      scope + " \u00B7 " + totalDocs + " documents" +
      (state.query ? " (" + shownDocs + " matched)" : "");

    bindDynamic();
  }

  function computeStats(org) {
    var docs = org.documents || [];
    var updates = 0, finalized = 0, consultation = 0;
    docs.forEach(function (d) {
      updates += (d.history || []).filter(function (h) { return h.type === "update"; }).length;
      if (d.status === "consultation") consultation++;
      else finalized++;
    });
    return { total: docs.length, updates: updates, finalized: finalized, consultation: consultation };
  }

  var CATEGORY = {
    regulator:   { label: "Regulator",          color: "#0071bc", icon: '<path d="M3 21h18M5 21V10l7-4 7 4v11M9 21v-6h6v6M12 3v3"/>' },
    cro:         { label: "Clinical Research",   color: "#00857c", icon: '<path d="M9 3h6M10 3v5l-5 9a3 3 0 0 0 3 4h8a3 3 0 0 0 3-4l-5-9V3M7 15h10"/>' },
    consultancy: { label: "Consultancy",         color: "#6a1fe0", icon: '<path d="M3 3v18h18M7 15l4-5 3 3 5-7"/>' },
    consortium:  { label: "Industry Consortium", color: "#c47f17", icon: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.2"/><path d="M3 20v-1.5A4.5 4.5 0 0 1 7.5 14h3A4.5 4.5 0 0 1 15 18.5V20M15.5 14h1A3.5 3.5 0 0 1 20 17.5V20"/>' },
    research:    { label: "Market Research",     color: "#6b6485", icon: '<path d="M5 20V10M12 20V4M19 20v-7M3 20h18"/>' },
    academia:    { label: "Academic Research",   color: "#3949ab", icon: '<path d="M12 4 2 9l10 5 10-5-10-5M6 11.5V18c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-6.5"/>' }
  };
  function catInfo(org) { return (org && CATEGORY[org.category]) || null; }
  function catLegend() {
    return Object.keys(CATEGORY).map(function (k) {
      var c = CATEGORY[k];
      return '<span class="cat-badge" style="--cc:' + c.color + '">' +
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + c.icon + '</svg>' +
        '<span>' + esc(c.label) + '</span></span>';
    }).join("");
  }
  function catBadge(org) {
    var c = catInfo(org);
    if (!c) return "";
    return '<span class="cat-badge" style="--cc:' + c.color + '">' +
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + c.icon + '</svg>' +
      '<span>' + esc(c.label) + '</span></span>';
  }

  function faviconUrl(domain) {
    return "https://www.google.com/s2/favicons?domain=" + encodeURIComponent(domain) + "&sz=128";
  }

  function renderLogo(org) {
    var color = org.brandColor || "#7A00E6";
    var fallback = esc(org.logoText || org.short || "?");
    var src = org.logo || (org.domain ? faviconUrl(org.domain) : "");
    if (src) {
      // Show the official site icon; if it fails to load, fall back to the monogram.
      return '<div class="org-logo" style="background:' + esc(color) + '">' +
        '<img src="' + esc(src) + '" alt="' + esc(org.name) + ' logo" ' +
          'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';" />' +
        '<span class="logo-fallback" style="display:none;width:100%;height:100%;align-items:center;justify-content:center;">' + fallback + '</span>' +
      '</div>';
    }
    return '<div class="org-logo" style="background:' + esc(color) + '">' + fallback + '</div>';
  }

  function sortOrgDocs(docs, mode) {
    var arr = docs.slice();
    if (mode === "impact") {
      arr.sort(function (a, b) {
        var sa = avgScore(a), sb = avgScore(b);
        sa = (sa == null) ? -1 : sa;
        sb = (sb == null) ? -1 : sb;
        if (sb !== sa) return sb - sa;
        return toTime(b.publishedAt) - toTime(a.publishedAt);
      });
    } else {
      arr.sort(byPublishedDesc);
    }
    return arr;
  }

  function renderOrg(g) {
    var org = g.org;
    var s = computeStats(org);
    var mode = state.orgSort[org.id] || "date";
    var sortedDocs = sortOrgDocs(g.docs, mode);
    var docsHtml = sortedDocs.map(function (doc) { return renderDoc(org, doc, false); }).join("");
    var sortBar =
      '<div class="org-sort">' +
        '<span class="org-sort-lbl">Sort articles</span>' +
        '<div class="org-sort-seg">' +
          '<button class="oss' + (mode === "date" ? " active" : "") + '" data-orgsort="' + esc(org.id) + '::date">Latest first</button>' +
          '<button class="oss' + (mode === "impact" ? " active" : "") + '" data-orgsort="' + esc(org.id) + '::impact">Top impact</button>' +
        '</div>' +
      '</div>';
    var statsHtml =
      '<div class="org-stats">' +
        '<div class="stat docs"><span class="num">' + s.total + '</span><span class="lbl">Documents</span></div>' +
        '<div class="stat updates"><span class="num">' + s.updates + '</span><span class="lbl">Updates / follow-ups</span></div>' +
        '<div class="stat final"><span class="num">' + s.finalized + '</span><span class="lbl">Finalized</span></div>' +
        '<div class="stat consult"><span class="num">' + s.consultation + '</span><span class="lbl">In consultation</span></div>' +
      '</div>';
    return '' +
      '<section class="org" data-org="' + esc(org.id) + '" style="border-top:4px solid ' + esc(org.brandColor || "#7A00E6") + '">' +
        '<div class="org-header">' +
          renderLogo(org) +
          '<div class="org-id-block">' +
            '<h2 class="org-title">' + esc(org.name) + '</h2>' +
            catBadge(org) +
            (org.url ? '<a class="org-link" href="' + esc(org.url) + '" target="_blank" rel="noopener">Website &#8599;</a>' : '') +
          '</div>' +
          statsHtml +
        '</div>' +
        '<div class="org-body">' + sortBar + docsHtml + '</div>' +
      '</section>';
  }

  // A finalized document that was published once and never updated has no
  // meaningful trajectory: its "Updated" date and trajectory toggle are hidden.
  function hasTrajectory_(doc) {
    var hist = doc.history || [];
    var hasExtraHistory = hist.length > 1 || hist.some(function (h) { return h.type === "update" || h.type === "consultation"; });
    var wasUpdated = doc.updatedAt && doc.publishedAt && doc.updatedAt !== doc.publishedAt;
    return !!(hasExtraHistory || wasUpdated);
  }

  function renderDoc(org, doc, showOrgName) {
    var open = state.openTimelines[doc.id] ? " open" : "";
    var newBadge = isNew(doc.updatedAt) ? '<span class="badge-new">NEW</span>' : '';
    var orgLine = showOrgName ? '<div class="doc-times" style="margin-bottom:4px;"><b>' + esc(org.name) + '</b></div>' : '';
    var titleInner = doc.url
      ? '<a href="' + esc(doc.url) + '" target="_blank" rel="noopener">' + esc(doc.title) + '</a>'
      : esc(doc.title);

    var topicsHtml = (doc.topics && doc.topics.length)
      ? '<div class="doc-topics">' + doc.topics.map(function (t) {
          return '<span class="topic-pill">' + esc(themeLabel(t)) + '</span>';
        }).join("") + '</div>'
      : '';

    var avg = avgScore(doc);
    var scoreBadge = "";
    var dimsHtml = "";
    if (avg != null) {
      var cls = avg >= 4.3 ? "hi" : (avg >= 3.5 ? "mid" : "lo");
      var s = doc.scores;
      var tip = "Industry impact " + s.impact + "/5 \u00B7 Data rigor " + s.rigor + "/5 \u00B7 Foresight " + s.foresight + "/5";
      scoreBadge = '<span class="score-badge ' + cls + '" title="' + esc(tip) + '">\u2605 ' + avg.toFixed(1) + '</span>';
      dimsHtml = '<div class="score-dims">' +
        dim("Impact", s.impact) + dim("Rigor", s.rigor) + dim("Foresight", s.foresight) +
      '</div>';
    }

    var hist = doc.history || [];
    var hasTrajectory = hasTrajectory_(doc);

    var timesHtml = '<div class="doc-times">' +
      '<span>Published: <b>' + esc(doc.publishedAt || "\u2014") + '</b></span>' +
      (hasTrajectory ? '<span>Updated: <b>' + esc(doc.updatedAt || "\u2014") + '</b></span>' : '') +
      '</div>';

    var trajectoryBtn = hasTrajectory
      ? '<button class="track-btn" data-toggle-tl="' + esc(doc.id) + '">' +
          (state.openTimelines[doc.id] ? 'Hide trajectory' : 'Update trajectory (' + hist.length + ')') +
        '</button>'
      : '';
    var timelineHtml = hasTrajectory
      ? '<div class="timeline' + open + '" data-tl="' + esc(doc.id) + '">' + renderTimeline(doc) + '</div>'
      : '';

    var hlClass = state.highlight[doc.id] ? " doc-highlight" : "";
    return '' +
      '<div class="doc' + hlClass + '" data-doc="' + esc(doc.id) + '">' +
        '<div class="doc-main">' +
          orgLine +
          '<div class="doc-title">' + titleInner +
            (doc.type ? '<span class="doc-type">' + esc(doc.type) + '</span>' : '') + newBadge + scoreBadge +
          '</div>' +
          (doc.summary ? '<div class="doc-summary">' + esc(doc.summary) + '</div>' : '') +
          dimsHtml +
          topicsHtml +
          timesHtml +
        '</div>' +
        '<div class="doc-side">' +
          trajectoryBtn +
          '<button class="track-btn" data-edit-doc="' + esc(org.id) + '::' + esc(doc.id) + '" style="background:#eef0f6;color:#4a4360;">Edit</button>' +
        '</div>' +
        timelineHtml +
      '</div>';
  }

  function renderTimeline(doc) {
    var hist = (doc.history || []).slice().sort(function (a, b) { return toTime(b.date) - toTime(a.date); });
    if (!hist.length) return '<h4>Update trajectory</h4><div class="tl-note">No records yet</div>';
    var items = hist.map(function (h) {
      var cls = h.type === "publish" ? "publish" : (h.type === "consultation" ? "consultation" : "update");
      return '' +
        '<div class="tl-item ' + cls + '">' +
          '<span class="tl-date">' + esc(h.date) + '</span>' +
          '<span class="tl-tag ' + cls + '">' + esc(typeLabel(h.type)) + '</span>' +
          (h.note ? '<div class="tl-note">' + esc(h.note) + '</div>' : '') +
        '</div>';
    }).join("");
    return '<h4>Update trajectory</h4>' + items;
  }

  // ---------- Overview dashboard ----------
  var KPI_ICONS = {
    org: '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 10h.01M15 10h.01M9 13h.01M15 13h.01"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    check: '<path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/>',
    chat: '<path d="M21 11.5a8.5 8.5 0 0 1-11.9 7.8L3 21l1.7-6.1A8.5 8.5 0 1 1 21 11.5z"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16m0 5v-5h5"/>'
  };
  function kpiIcon(name) {
    return '<span class="kpi-ico"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + (KPI_ICONS[name] || "") + '</svg></span>';
  }

  function smoothPath(pts) {
    if (!pts.length) return "";
    if (pts.length < 2) return "M" + pts[0][0] + "," + pts[0][1];
    var d = "M" + pts[0][0].toFixed(1) + "," + pts[0][1].toFixed(1);
    for (var i = 0; i < pts.length - 1; i++) {
      var p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += " C" + c1x.toFixed(1) + "," + c1y.toFixed(1) + " " + c2x.toFixed(1) + "," + c2y.toFixed(1) + " " + p2[0].toFixed(1) + "," + p2[1].toFixed(1);
    }
    return d;
  }

  function buildYearChart(yearKeys, years) {
    var W = 720, H = 280, padL = 42, padR = 22, padT = 30, padB = 42;
    var plotW = W - padL - padR, plotH = H - padT - padB;
    var baseY = padT + plotH;
    var vals = yearKeys.map(function (y) { return years[y]; });
    var maxV = Math.max.apply(null, vals.concat([1]));
    var axisMax = Math.max(2, Math.ceil(maxV / 2) * 2);
    var n = yearKeys.length || 1;
    var band = plotW / n;
    var barW = Math.min(52, band * 0.4);

    var svg = '<svg class="year-svg" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">';
    svg += '<defs>' +
      '<linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#a855f7"/><stop offset="0.55" stop-color="#7c3aed"/><stop offset="1" stop-color="#3b5bff"/>' +
      '</linearGradient>' +
      '<linearGradient id="barTop" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#ffffff" stop-opacity="0.55"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>' +
      '</linearGradient>' +
      '<linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#00b3a4" stop-opacity="0.22"/><stop offset="1" stop-color="#00b3a4" stop-opacity="0"/>' +
      '</linearGradient>' +
      '<filter id="barShadow" x="-40%" y="-20%" width="180%" height="140%">' +
        '<feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#5b21b6" flood-opacity="0.28"/>' +
      '</filter>' +
      '</defs>';

    // horizontal dashed gridlines + y labels
    var ticks = 4;
    for (var t = 0; t <= ticks; t++) {
      var frac = t / ticks;
      var yy = baseY - frac * plotH;
      var val = Math.round(axisMax * frac);
      svg += '<line x1="' + padL + '" y1="' + yy.toFixed(1) + '" x2="' + (W - padR) + '" y2="' + yy.toFixed(1) + '" stroke="#ecebf3" stroke-width="1" ' + (t === 0 ? '' : 'stroke-dasharray="2 6" ') + '/>';
      svg += '<text x="' + (padL - 10) + '" y="' + (yy + 4).toFixed(1) + '" text-anchor="end" font-size="11" font-weight="600" fill="#aba4c0">' + val + '</text>';
    }

    var pts = [];
    var barsSvg = "";
    var labelsSvg = "";
    yearKeys.forEach(function (y, i) {
      var v = years[y];
      var cx = padL + band * i + band / 2;
      var h = Math.max(3, (v / axisMax) * plotH);
      var x = cx - barW / 2;
      var yTop = baseY - h;
      var r = Math.min(10, barW / 2);
      // bar body with soft shadow
      barsSvg += '<rect x="' + x.toFixed(1) + '" y="' + yTop.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="' + r + '" fill="url(#barGrad)" filter="url(#barShadow)"/>';
      // glossy top highlight
      barsSvg += '<rect x="' + x.toFixed(1) + '" y="' + yTop.toFixed(1) + '" width="' + barW.toFixed(1) + '" height="' + Math.min(h, 22).toFixed(1) + '" rx="' + r + '" fill="url(#barTop)"/>';
      // value label
      labelsSvg += '<text x="' + cx.toFixed(1) + '" y="' + (yTop - 16).toFixed(1) + '" text-anchor="middle" font-size="14" font-weight="800" fill="#2a2340">' + v + '</text>';
      // x axis year
      labelsSvg += '<text x="' + cx.toFixed(1) + '" y="' + (H - 14) + '" text-anchor="middle" font-size="12.5" font-weight="700" fill="#4a4360">' + esc(y) + '</text>';
      pts.push([cx, yTop]);
    });

    svg += barsSvg;

    // smooth trend curve with area fill (drawn above bars, offset a bit higher)
    if (pts.length > 1) {
      var line = smoothPath(pts);
      var area = line + " L" + pts[pts.length - 1][0].toFixed(1) + "," + baseY + " L" + pts[0][0].toFixed(1) + "," + baseY + " Z";
      svg += '<path d="' + area + '" fill="url(#areaGrad)"/>';
      svg += '<path d="' + line + '" fill="none" stroke="#00b3a4" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>';
    }
    pts.forEach(function (p) {
      svg += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="4.5" fill="#fff" stroke="#00b3a4" stroke-width="2.4"/>';
    });

    svg += labelsSvg;
    svg += '</svg>';
    return svg;
  }

  function buildCategoryDist(orgs) {
    var counts = {};
    orgs.forEach(function (o) { var k = o.category || "other"; counts[k] = (counts[k] || 0) + 1; });
    var order = ["regulator", "cro", "consultancy", "consortium", "research", "academia"];
    var keys = order.filter(function (k) { return counts[k]; });
    Object.keys(counts).forEach(function (k) { if (order.indexOf(k) < 0) keys.push(k); });
    var max = Math.max.apply(null, keys.map(function (k) { return counts[k]; }).concat([1]));

    return '<div class="cat-dist">' + keys.map(function (k) {
      var c = CATEGORY[k] || { label: "Other", color: "#6b6485", icon: "" };
      var n = counts[k];
      var pct = Math.max(6, Math.round(n / max * 100));
      var icon = c.icon ? navSvg(c.icon).replace('width="16" height="16"', 'width="14" height="14"') : "";
      return '<div class="cat-row" style="--cc:' + c.color + '">' +
          '<div class="cat-row-top">' +
            '<span class="cat-row-name">' + icon + '<span>' + esc(c.label) + '</span></span>' +
            '<b>' + n + '</b>' +
          '</div>' +
          '<div class="cat-track"><i style="width:' + pct + '%"></i></div>' +
        '</div>';
    }).join("") + '</div>';
  }

  function allDocsFlat() {
    var out = [];
    (state.data.organizations || []).forEach(function (org) {
      (org.documents || []).forEach(function (d) { out.push({ org: org, doc: d }); });
    });
    return out;
  }

  function renderOverview() {
    var orgs = state.data.organizations || [];
    var flat = allDocsFlat();
    var total = flat.length;
    var updates = 0, finalized = 0, consultation = 0;
    flat.forEach(function (x) {
      updates += (x.doc.history || []).filter(function (h) { return h.type === "update"; }).length;
      if (x.doc.status === "consultation") consultation++; else finalized++;
    });

    // Documents per year
    var years = {};
    flat.forEach(function (x) {
      var m = String(x.doc.publishedAt).match(/(\d{4})/);
      var y = m ? m[1] : "N/A";
      years[y] = (years[y] || 0) + 1;
    });
    var yearKeys = Object.keys(years).sort();
    var yearChart = buildYearChart(yearKeys, years);

    var orgCards = orgs.map(function (org) {
      var n = (org.documents || []).length;
      return '<div class="org-card" data-jump-org="' + esc(org.id) + '">' +
          renderLogo(org) +
          '<div class="oc-name">' + esc(org.name) + '</div>' +
          '<div class="oc-meta">' + catBadge(org) +
            '<span class="oc-count">' + n + (n > 1 ? " documents" : " document") + '</span>' +
          '</div>' +
          (org.intro ? '<div class="oc-intro">' + esc(org.intro) + '</div>' : '') +
        '</div>';
    }).join("");

    var refreshed = state.data.lastCheckedAt || "\u2014";

    var html = '' +
      '<div class="ov-hero">' +
        '<h2>Portfolio overview</h2>' +
        '<p>A consolidated snapshot of everything this observatory currently tracks on AI in clinical trial development. Select any organization in the navigation bar above to drill into its documents and update trajectories.</p>' +
        '<span class="ov-note">\u21BB Data last refreshed: ' + esc(refreshed) + '</span>' +
        ' <span class="ov-note">\u2139 Only content published from January 2023 onward is included</span>' +
      '</div>' +

      '<div class="kpi-grid">' +
        '<div class="kpi a"><div class="kpi-top">' + kpiIcon("org") + '<span class="kpi-num">' + orgs.length + '</span></div><div class="kpi-lbl">Organizations tracked</div></div>' +
        '<div class="kpi b"><div class="kpi-top">' + kpiIcon("doc") + '<span class="kpi-num">' + total + '</span></div><div class="kpi-lbl">Documents</div></div>' +
        '<div class="kpi c"><div class="kpi-top">' + kpiIcon("check") + '<span class="kpi-num">' + finalized + '</span></div><div class="kpi-lbl">Finalized</div></div>' +
        '<div class="kpi d"><div class="kpi-top">' + kpiIcon("chat") + '<span class="kpi-num">' + consultation + '</span></div><div class="kpi-lbl">In consultation</div></div>' +
        '<div class="kpi e"><div class="kpi-top">' + kpiIcon("refresh") + '<span class="kpi-num">' + updates + '</span></div><div class="kpi-lbl">Updates / follow-ups</div></div>' +
      '</div>' +

      '<div class="panel">' +
        '<div class="chart-2col">' +
          '<div class="chart-col">' +
            '<h3>Organizations by category</h3>' +
            buildCategoryDist(orgs) +
            '<div class="year-caption">Number of tracked organizations in each institution type.</div>' +
          '</div>' +
          '<div class="chart-col">' +
            '<h3>Documents by year of publication</h3>' +
            '<div class="year-chart-wrap">' + yearChart + '</div>' +
            '<div class="year-caption">From January 2023 onward \u00B7 the teal line marks the year-over-year trend.</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="panel">' +
        '<h3>Organizations included (' + orgs.length + ')</h3>' +
        '<div class="cat-legend">' + catLegend() + '</div>' +
        '<div class="org-cards">' + orgCards + '</div>' +
      '</div>' +

      changesTeaser();

    document.getElementById("countLabel").textContent = "";
    content.innerHTML = html;

    content.querySelectorAll("[data-jump-org]").forEach(function (el) {
      el.addEventListener("click", function () {
        state.view = el.getAttribute("data-jump-org");
        window.scrollTo({ top: 0, behavior: "smooth" });
        render();
      });
    });
    bindViewJumps();
  }

  // ---------- What's new (latest refresh) ----------
  function chgScoreBadge(doc) {
    var avg = avgScore(doc);
    if (avg == null) return "";
    var cls = avg >= 4.3 ? "hi" : (avg >= 3.5 ? "mid" : "lo");
    var s = doc.scores;
    var tip = "Industry impact " + s.impact + "/5 \u00B7 Data rigor " + s.rigor + "/5 \u00B7 Foresight " + s.foresight + "/5";
    return '<span class="score-badge ' + cls + '" title="' + esc(tip) + '">\u2605 ' + avg.toFixed(1) + '</span>';
  }

  // Shared card shell for both sections. `kind` is "added" or "updated" and drives
  // the colour coding and the flag that tells the two sections apart at a glance.
  function chgItem(kind, org, doc, openTl, extra) {
    var flag = kind === "added"
      ? '<span class="chg-flag added">\uFF0B Added to hub</span>'
      : '<span class="chg-flag updated">\u21BB Trajectory amended</span>';
    return '' +
      '<div class="chg-item ' + kind + '" data-jump-doc="' + esc(doc.id) + '"' + (openTl ? ' data-open-tl="1"' : '') + '>' +
        renderLogo(org) +
        '<div class="chg-body">' +
          '<div class="chg-org">' + flag + '<b>' + esc(org.short || org.name) + '</b>' + catBadge(org) + '</div>' +
          '<div class="chg-title">' +
            (doc.url ? '<a href="' + esc(doc.url) + '" target="_blank" rel="noopener">' + esc(doc.title) + '</a>' : esc(doc.title)) +
            (doc.type ? '<span class="doc-type">' + esc(doc.type) + '</span>' : '') +
            chgScoreBadge(doc) +
          '</div>' +
          extra +
          '<div class="doc-times">' +
            '<span>Published: <b>' + esc(doc.publishedAt || "\u2014") + '</b></span>' +
            (hasTrajectory_(doc) ? '<span>Updated: <b>' + esc(doc.updatedAt || "\u2014") + '</b></span>' : '') +
          '</div>' +
        '</div>' +
        '<span class="chg-go">View in context \u2192</span>' +
      '</div>';
  }

  // Compact entry point shown at the end of the Overview and Cross-comparison pages
  function changesTeaser() {
    var w = windowChanges();
    if (!w) return "";
    var a = w.added.length, u = w.updated.length;
    if (!a && !u) return "";
    return '<div class="chg-teaser" data-view-jump="changes">' +
        '<div>' +
          '<span class="chg-teaser-kicker">What&#39;s new</span>' +
          '<b class="chg-teaser-a">' + a + (a === 1 ? " new publication" : " new publications") + '</b> and ' +
          '<b class="chg-teaser-u">' + u + (u === 1 ? " document updated" : " documents updated") + '</b> ' +
          'between ' + esc(w.start) + ' and ' + esc(w.end) +
        '</div>' +
        '<span class="chg-teaser-go">See what changed \u2192</span>' +
      '</div>';
  }

  function bindViewJumps() {
    content.querySelectorAll("[data-view-jump]").forEach(function (el) {
      el.addEventListener("click", function () {
        state.view = el.getAttribute("data-view-jump");
        window.scrollTo({ top: 0, behavior: "smooth" });
        render();
      });
    });
  }

  function renderChanges() {
    var w = windowChanges();
    document.getElementById("countLabel").textContent = "";

    if (!w) {
      content.innerHTML = '<div class="empty">No refresh has been logged yet.</div>';
      return;
    }

    var added = w.added, updated = w.updated;

    var orgsAffected = [];
    added.concat(updated).forEach(function (x) {
      if (orgsAffected.indexOf(x.org.id) < 0) orgsAffected.push(x.org.id);
    });

    var addedByOrg = [];
    (state.data.organizations || []).forEach(function (org) {
      var mine = added.filter(function (x) { return x.org.id === org.id; });
      if (mine.length) addedByOrg.push({ org: org, items: mine });
    });

    var addedHtml = addedByOrg.map(function (g) {
      return '<div class="chg-group">' +
          '<div class="chg-group-hd">' + esc(g.org.name) + '<em>' + g.items.length + (g.items.length > 1 ? " new publications" : " new publication") + '</em></div>' +
          g.items.map(function (x) {
            var note = x.note
              ? '<div class="chg-note"><span class="chg-note-lbl">Why it is tracked</span>' + esc(x.note) + '</div>'
              : '';
            return chgItem("added", g.org, x.doc, false, note);
          }).join("") +
        '</div>';
    }).join("") || '<div class="empty">No document was published between ' + esc(w.start) + ' and ' + esc(w.end) + '.</div>';

    var updatedHtml = updated.map(function (x) {
      var extra = x.change
        ? '<div class="chg-change"><span class="chg-change-lbl">What changed</span>' + esc(x.change) + '</div>'
        : '';
      if (x.records.length) {
        extra += '<div class="chg-entries">' +
            '<div class="chg-entries-hd">Trajectory records dated in this period</div>' +
            x.records.map(function (h) {
              var cls = h.type === "publish" ? "publish" : (h.type === "consultation" ? "consultation" : "update");
              return '<div class="tl-item ' + cls + '">' +
                  '<span class="tl-date">' + esc(h.date) + '</span>' +
                  '<span class="tl-tag ' + cls + '">' + esc(typeLabel(h.type)) + '</span>' +
                  (h.note ? '<div class="tl-note">' + esc(h.note) + '</div>' : '') +
                '</div>';
            }).join("") +
          '</div>';
      }
      return chgItem("updated", x.org, x.doc, true, extra);
    }).join("") || '<div class="empty">No earlier document changed between ' + esc(w.start) + ' and ' + esc(w.end) + '.</div>';

    function sectionHead(num, title, lead, count, unit) {
      return '<header class="chg-sec-hd">' +
          '<span class="chg-sec-num">' + num + '</span>' +
          '<div class="chg-sec-txt">' +
            '<h3>' + title + '</h3>' +
            '<p>' + lead + '</p>' +
          '</div>' +
          '<span class="chg-sec-count"><b>' + count + '</b><span>' + unit + '</span></span>' +
        '</header>';
    }

    var html = '' +
      '<div class="ov-hero">' +
        '<h2>What&#39;s new between ' + esc(w.start) + ' and ' + esc(w.end) + '</h2>' +
        '<p>Only what actually happened in this period: documents first published inside it, and documents published earlier whose content or status changed inside it. Everything else in the hub is omitted here. Select any entry to open it in its organization view.</p>' +
        '<span class="ov-note">\u21BB Reporting period: ' + esc(w.start) + ' \u2192 ' + esc(w.end) + '</span>' +
        ' <span class="ov-note">\u2139 Inclusion follows the source publication and update dates</span>' +
      '</div>' +

      '<div class="kpi-grid">' +
        '<div class="kpi c"><div class="kpi-top">' + kpiIcon("doc") + '<span class="kpi-num">' + added.length + '</span></div><div class="kpi-lbl">Newly published</div></div>' +
        '<div class="kpi d"><div class="kpi-top">' + kpiIcon("refresh") + '<span class="kpi-num">' + updated.length + '</span></div><div class="kpi-lbl">Updated in period</div></div>' +
        '<div class="kpi a"><div class="kpi-top">' + kpiIcon("org") + '<span class="kpi-num">' + orgsAffected.length + '</span></div><div class="kpi-lbl">Organizations involved</div></div>' +
      '</div>' +

      '<section class="chg-sec added">' +
        sectionHead("1", "Newly published in this period",
          "Documents whose publication date falls between " + esc(w.start) + " and " + esc(w.end) + ", grouped by source.",
          added.length, added.length === 1 ? "document" : "documents") +
        '<div class="chg-sec-body">' + addedHtml + '</div>' +
      '</section>' +

      '<section class="chg-sec updated">' +
        sectionHead("2", "Updated in this period",
          "Documents published earlier that gained a trajectory record dated inside this period \u2014 a revision, a status change or a new milestone.",
          updated.length, updated.length === 1 ? "document" : "documents") +
        '<div class="chg-sec-body">' + updatedHtml + '</div>' +
      '</section>';

    content.innerHTML = html;

    content.querySelectorAll("[data-jump-doc]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        // Let the source-document link behave normally
        if (e.target.closest && e.target.closest("a")) return;
        jumpToDoc(el.getAttribute("data-jump-doc"), el.getAttribute("data-open-tl") === "1");
      });
    });
  }

  // ---------- Cross-comparison ----------
  function buildCoverage() {
    // theme id -> { orgId: { org, docs:[{id,title}] } }
    var orgs = state.data.organizations || [];
    var map = {};
    orgs.forEach(function (org) {
      (org.documents || []).forEach(function (doc) {
        (doc.topics || []).forEach(function (tid) {
          if (!map[tid]) map[tid] = {};
          if (!map[tid][org.id]) map[tid][org.id] = { org: org, docs: [] };
          map[tid][org.id].docs.push({ id: doc.id, title: doc.title });
        });
      });
    });
    return map;
  }

  function renderCompare() {
    var orgs = state.data.organizations || [];
    var themes = state.data.themes || [];
    var cov = buildCoverage();

    // themes covered by >= 2 organizations, sorted by coverage desc
    var rows = themes.map(function (th) {
      var orgIds = Object.keys(cov[th.id] || {});
      return { theme: th, orgIds: orgIds, count: orgIds.length };
    }).filter(function (r) { return r.count >= 2; })
      .sort(function (a, b) { return b.count - a.count; });

    var maxCount = rows.reduce(function (m, r) { return Math.max(m, r.count); }, 0);

    var head = '<tr><th class="theme-col">Theme</th>' +
      orgs.map(function (o) { return '<th title="' + esc(o.name) + '">' + esc(o.short || o.name) + '</th>'; }).join("") +
      '<th>Coverage</th></tr>';

    var body = rows.map(function (r) {
      var cells = orgs.map(function (o) {
        var hit = (cov[r.theme.id] || {})[o.id];
        if (hit) {
          var strong = r.count === maxCount ? " strong" : "";
          var tip = hit.docs.map(function (d) { return d.title; }).join(" | ");
          return '<td><span class="cell-dot on' + strong + '" ' +
            'data-jump="' + esc(o.id) + '::' + esc(r.theme.id) + '" ' +
            'title="' + esc(o.name + " \u2014 click to view: " + tip) + '">\u25CF</span></td>';
        }
        return '<td><span class="cell-dot off">\u25CB</span></td>';
      }).join("");
      return '<tr class="matrix-row">' +
        '<td class="theme-cell">' + esc(r.theme.label) + '<small>' + esc(r.theme.description || "") + '</small></td>' +
        cells +
        '<td><span class="cov-count">' + r.count + '</span></td>' +
      '</tr>';
    }).join("");

    // Horizontal bar chart of theme coverage counts
    var barsHtml = rows.map(function (r) {
      var pct = maxCount ? Math.round((r.count / maxCount) * 100) : 0;
      return '<div class="bar-row">' +
        '<div class="bar-label" title="' + esc(r.theme.label) + '">' + esc(r.theme.label) + '</div>' +
        '<div class="bar-track"><div class="bar-fill" style="width:' + pct + '%">' + r.count + '</div></div>' +
      '</div>';
    }).join("");

    var html = '' +
      '<div class="compare-intro">' +
        '<h2>Cross-comparison matrix</h2>' +
        '<p>Themes addressed by <b>two or more</b> organizations, visualized across all sources. A filled dot means the organization has published on that theme; <b>click a dot</b> to jump to that organization and highlight the related documents. Blue dots mark the most widely covered themes.</p>' +
      '</div>' +
      (rows.length
        ? '<div class="bars-card"><h3>Theme coverage (number of organizations)</h3>' + barsHtml + '</div>' +
          renderInsights(rows) +
          '<div class="matrix-wrap"><table class="matrix"><thead>' + head + '</thead><tbody>' + body + '</tbody></table></div>' +
          '<div class="heat-legend">' +
            '<span><span class="lg-dot" style="background:#0f6bff"></span> Most widely covered theme</span>' +
            '<span><span class="lg-dot" style="background:#7A00E6"></span> Covered by this organization</span>' +
            '<span><span class="lg-dot" style="background:#e7e3f0"></span> Not covered</span>' +
          '</div>'
        : '<div class="empty">No theme is currently shared by two or more organizations.</div>') +
      changesTeaser();

    document.getElementById("countLabel").textContent = "";
    content.innerHTML = html;

    content.querySelectorAll("[data-jump]").forEach(function (el) {
      el.addEventListener("click", function () {
        var parts = el.getAttribute("data-jump").split("::");
        jumpToOrgTheme(parts[0], parts[1]);
      });
    });
    bindViewJumps();
  }

  function renderInsights(rows) {
    var flat = allDocsFlat();
    var consult = flat.filter(function (x) { return x.doc.status === "consultation"; })
      .sort(function (a, b) { return toTime(b.doc.publishedAt) - toTime(a.doc.publishedAt); });
    var rated = flat.filter(function (x) { return avgScore(x.doc) != null; })
      .sort(function (a, b) { return avgScore(b.doc) - avgScore(a.doc); }).slice(0, 3);
    var topThemes = rows.slice(0, 3);
    var orgCount = (state.data.organizations || []).length;

    var consensusList = topThemes.map(function (r) {
      return '<li><b>' + esc(r.theme.label) + '</b> — addressed by ' + r.count + ' organizations</li>';
    }).join("") || '<li>No shared themes yet.</li>';

    var watchList = consult.slice(0, 4).map(function (x) {
      return '<li><b>' + esc(x.org.short || x.org.name) + ':</b> ' + esc(x.doc.title) + ' — track finalization / respond to the open consultation</li>';
    }).join("");
    watchList += '<li>Watch for movement from <b>generative</b> to <b>agentic AI</b> pilots in trial design and operations.</li>';
    watchList += '<li>Confirm alignment with the <b>risk-based credibility / GCP</b> expectations now shared by FDA and EMA.</li>';

    var readingList = rated.map(function (x) {
      return '<li><b>' + esc(x.org.short || x.org.name) + '</b> · ' + esc(x.doc.title) + ' <span style="color:var(--muted)">(' + avgScore(x.doc).toFixed(1) + '/5)</span></li>';
    }).join("") || '<li>No rated documents yet.</li>';

    var flow = ["Generative AI", "Agentic / multi-agent AI", "Autonomous trial operations"];
    var flowHtml = flow.map(function (n, i) {
      return (i ? '<span class="trend-arrow">\u2192</span>' : '') + '<span class="trend-node">' + esc(n) + '</span>';
    }).join("");

    return '' +
      '<div class="insight-head">' +
        '<span class="ai-chip">\u2726 AI Insight</span>' +
        '<h2>What the comparison is telling us</h2>' +
      '</div>' +
      '<p class="insight-sub">Automated analysis generated from the cross-comparison across ' + orgCount + ' organizations and ' + flat.length + ' documents. Use it as a periodic (~6-month) briefing on where to focus.</p>' +
      '<div class="insight-grid">' +

        '<div class="insight-card watch">' +
          '<h4><span class="ic-icon">\uD83C\uDFAF</span> Focus for the next ~6 months</h4>' +
          '<div class="ic-meta">Priorities to monitor this half-year</div>' +
          '<ul>' + watchList + '</ul>' +
        '</div>' +

        '<div class="insight-card">' +
          '<h4><span class="ic-icon">\uD83E\uDD1D</span> Where the consensus is strongest</h4>' +
          '<div class="ic-meta">Themes with the broadest cross-organization coverage</div>' +
          '<ul>' + consensusList + '</ul>' +
        '</div>' +

        '<div class="insight-card trend">' +
          '<h4><span class="ic-icon">\uD83D\uDCC8</span> Development trajectory of AI in clinical trials</h4>' +
          '<div class="ic-meta">The direction of travel</div>' +
          '<div class="trend-flow">' + flowHtml + '</div>' +
          '<ul style="margin-top:12px;">' +
            '<li>Regulation is <b>maturing</b> from discussion papers to formal, risk-based guidance (FDA credibility / COU framework; EMA reflection paper).</li>' +
            '<li><b>Document authoring</b> (protocols, CSRs, submissions) is the most production-ready generative-AI use case.</li>' +
            '<li>Early clinical evidence shows <b>AI-discovered molecules</b> clearing Phase I at unusually high rates.</li>' +
            '<li>The market is projected to grow at a <b>~22-43% CAGR</b>, signalling sustained investment.</li>' +
          '</ul>' +
        '</div>' +

        '<div class="insight-card reading">' +
          '<h4><span class="ic-icon">\u2605</span> Highest-signal reading</h4>' +
          '<div class="ic-meta">Top documents by overall importance score</div>' +
          '<ul>' + readingList + '</ul>' +
        '</div>' +

      '</div>';
  }

  function jumpToOrgTheme(orgId, themeId) {
    var org = findOrg(orgId);
    if (!org) return;
    state.view = orgId;
    state.query = "";
    var input = document.getElementById("searchInput");
    if (input) input.value = "";
    state.highlight = {};
    (org.documents || []).forEach(function (d) {
      if ((d.topics || []).indexOf(themeId) !== -1) state.highlight[d.id] = true;
    });
    render();
    // Scroll to the first highlighted document after the DOM updates
    setTimeout(function () {
      var first = content.querySelector(".doc.doc-highlight");
      if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
  }

  function jumpToDoc(docId, openTimeline) {
    var hit = locateDoc(docId);
    if (!hit) return;
    state.view = hit.org.id;
    state.query = "";
    var input = document.getElementById("searchInput");
    if (input) input.value = "";
    state.highlight = {};
    state.highlight[docId] = true;
    if (openTimeline) state.openTimelines[docId] = true;
    render();
    setTimeout(function () {
      var el = content.querySelector('.doc[data-doc="' + docId + '"]');
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 60);
  }

  // ---------- Dynamic events ----------
  function bindDynamic() {
    content.querySelectorAll("[data-toggle-tl]").forEach(function (el) {
      el.addEventListener("click", function () {
        var id = el.getAttribute("data-toggle-tl");
        state.openTimelines[id] = !state.openTimelines[id];
        render();
      });
    });
    content.querySelectorAll("[data-edit-doc]").forEach(function (el) {
      el.addEventListener("click", function () {
        var parts = el.getAttribute("data-edit-doc").split("::");
        openEdit(parts[0], parts[1]);
      });
    });
    content.querySelectorAll("[data-orgsort]").forEach(function (el) {
      el.addEventListener("click", function () {
        var parts = el.getAttribute("data-orgsort").split("::");
        state.orgSort[parts[0]] = parts[1];
        renderDocs();
      });
    });
  }

  document.getElementById("searchInput").addEventListener("input", function (e) {
    state.query = e.target.value.trim();
    renderDocs();
  });
  document.getElementById("sortSelect").addEventListener("change", function (e) {
    state.sort = e.target.value;
    renderDocs();
  });

  // ---------- Add / edit ----------
  var editModal = document.getElementById("editModal");
  var fOrg = document.getElementById("fOrg");
  var newOrgField = document.getElementById("newOrgField");

  function fillOrgOptions() {
    var opts = (state.data.organizations || []).map(function (o) {
      return '<option value="' + esc(o.id) + '">' + esc(o.name) + '</option>';
    }).join("");
    fOrg.innerHTML = opts + '<option value="__new__">\u2795 New organization\u2026</option>';
  }

  function fillTopicHelp() {
    var ids = (state.data.themes || []).map(function (t) { return t.id; });
    document.getElementById("topicHelp").textContent = ids.length ? ("Available: " + ids.join(", ")) : "";
  }

  fOrg.addEventListener("change", function () {
    newOrgField.style.display = fOrg.value === "__new__" ? "block" : "none";
  });

  function openEdit(orgId, docId) {
    fillOrgOptions();
    fillTopicHelp();
    state.editing = { orgId: orgId || null, docId: docId || null };
    var doc = null, org = null;
    if (orgId && docId) {
      org = findOrg(orgId);
      doc = org && (org.documents || []).find(function (d) { return d.id === docId; });
    }
    document.getElementById("editTitle").textContent = doc ? "Edit document" : "Add document";
    document.getElementById("deleteDocBtn").style.display = doc ? "inline-block" : "none";
    fOrg.value = orgId || (state.data.organizations[0] && state.data.organizations[0].id) || "__new__";
    newOrgField.style.display = fOrg.value === "__new__" ? "block" : "none";
    document.getElementById("fNewOrg").value = "";
    document.getElementById("fTitle").value = doc ? doc.title || "" : "";
    document.getElementById("fType").value = doc ? doc.type || "" : "";
    document.getElementById("fUrl").value = doc ? doc.url || "" : "";
    document.getElementById("fPublished").value = doc ? doc.publishedAt || "" : "";
    document.getElementById("fUpdated").value = doc ? doc.updatedAt || "" : "";
    document.getElementById("fSummary").value = doc ? doc.summary || "" : "";
    var sc = (doc && doc.scores) || {};
    document.getElementById("fImpact").value = sc.impact != null ? sc.impact : "";
    document.getElementById("fRigor").value = sc.rigor != null ? sc.rigor : "";
    document.getElementById("fForesight").value = sc.foresight != null ? sc.foresight : "";
    document.getElementById("fTopics").value = doc ? (doc.topics || []).join(", ") : "";
    document.getElementById("fHistory").value = doc
      ? (doc.history || []).map(function (h) { return [h.date, h.type, h.note].join(" | "); }).join("\n")
      : "";
    editModal.classList.add("open");
  }

  function slug(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40)
      || ("id-" + Date.now());
  }

  function parseHistory(text) {
    return text.split("\n").map(function (line) { return line.trim(); }).filter(Boolean).map(function (line) {
      var p = line.split("|").map(function (x) { return x.trim(); });
      return { date: p[0] || "", type: p[1] || "update", note: p[2] || "" };
    });
  }

  function parseTopics(text) {
    return text.split(",").map(function (x) { return x.trim(); }).filter(Boolean);
  }

  function clampScore(v) {
    var n = parseInt(v, 10);
    if (isNaN(n)) return 3;
    return Math.max(1, Math.min(5, n));
  }

  function parseScores() {
    return {
      impact: clampScore(document.getElementById("fImpact").value),
      rigor: clampScore(document.getElementById("fRigor").value),
      foresight: clampScore(document.getElementById("fForesight").value)
    };
  }

  document.getElementById("saveEditBtn").addEventListener("click", function () {
    var title = document.getElementById("fTitle").value.trim();
    if (!title) { alert("Please enter a title"); return; }

    var orgId = fOrg.value;
    var org;
    if (orgId === "__new__") {
      var raw = document.getElementById("fNewOrg").value.trim();
      if (!raw) { alert("Please enter the new organization name"); return; }
      var parts = raw.split("|").map(function (x) { return x.trim(); });
      org = { id: slug(parts[0]) + "-" + Date.now().toString(36), name: parts[0], short: parts[0], url: parts[1] || "", documents: [] };
      state.data.organizations.push(org);
      orgId = org.id;
    } else {
      org = findOrg(orgId);
    }
    if (!org) { alert("Organization not found"); return; }
    org.documents = org.documents || [];

    var docData = {
      title: title,
      type: document.getElementById("fType").value.trim(),
      url: document.getElementById("fUrl").value.trim(),
      publishedAt: document.getElementById("fPublished").value.trim(),
      updatedAt: document.getElementById("fUpdated").value.trim(),
      summary: document.getElementById("fSummary").value.trim(),
      scores: parseScores(),
      topics: parseTopics(document.getElementById("fTopics").value),
      history: parseHistory(document.getElementById("fHistory").value)
    };

    if (state.editing && state.editing.docId && state.editing.orgId === orgId) {
      var existing = org.documents.find(function (d) { return d.id === state.editing.docId; });
      if (existing) Object.assign(existing, docData);
    } else {
      docData.id = slug(title) + "-" + Date.now().toString(36);
      if (state.editing && state.editing.docId) {
        var oldOrg = findOrg(state.editing.orgId);
        if (oldOrg) oldOrg.documents = (oldOrg.documents || []).filter(function (d) { return d.id !== state.editing.docId; });
      }
      org.documents.push(docData);
    }

    persist();
    editModal.classList.remove("open");
    render();
    updateHeaderMeta();
  });

  document.getElementById("deleteDocBtn").addEventListener("click", function () {
    if (!state.editing || !state.editing.docId) return;
    if (!confirm("Delete this document?")) return;
    var org = findOrg(state.editing.orgId);
    if (org) org.documents = (org.documents || []).filter(function (d) { return d.id !== state.editing.docId; });
    persist();
    editModal.classList.remove("open");
    render();
    updateHeaderMeta();
  });

  document.getElementById("cancelEditBtn").addEventListener("click", function () { editModal.classList.remove("open"); });
  document.getElementById("addBtn").addEventListener("click", function () { openEdit(null, null); });
  editModal.addEventListener("click", function (e) { if (e.target === editModal) editModal.classList.remove("open"); });

  // ---------- Export ----------
  var exportModal = document.getElementById("exportModal");
  document.getElementById("exportBtn").addEventListener("click", function () {
    var header = "/* Clinical AI Intelligence Observatory - data (exported from page) */\n";
    var body = "window.DATA = " + JSON.stringify(state.data, null, 2) + ";\n";
    document.getElementById("exportArea").value = header + body;
    exportModal.classList.add("open");
  });
  document.getElementById("copyExportBtn").addEventListener("click", function () {
    var ta = document.getElementById("exportArea");
    ta.select();
    try { navigator.clipboard.writeText(ta.value); } catch (e) { document.execCommand("copy"); }
    document.getElementById("copyExportBtn").textContent = "Copied \u2713";
    setTimeout(function () { document.getElementById("copyExportBtn").textContent = "Copy to clipboard"; }, 1500);
  });
  document.getElementById("closeExportBtn").addEventListener("click", function () { exportModal.classList.remove("open"); });
  exportModal.addEventListener("click", function (e) { if (e.target === exportModal) exportModal.classList.remove("open"); });

  // ---------- Header meta ----------
  function updateHeaderMeta() {
    var orgs = state.data.organizations || [];
    var docCount = orgs.reduce(function (n, o) { return n + (o.documents || []).length; }, 0);
    var html =
      '<div class="hstat"><b>' + orgs.length + '</b><span>Organizations</span></div>' +
      '<div class="hstat"><b>' + docCount + '</b><span>Documents</span></div>';
    if (state.data.lastCheckedAt) {
      html += '<div class="hstat"><b style="font-size:14px;">' + esc(state.data.lastCheckedAt) + '</b><span>Last refreshed</span></div>';
    }
    document.getElementById("headerMeta").innerHTML = html;
  }

  // ---------- Boot ----------
  fillOrgOptions();
  fillTopicHelp();
  updateHeaderMeta();
  render();

  window.resetTrackerData = function () {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  };
})();
