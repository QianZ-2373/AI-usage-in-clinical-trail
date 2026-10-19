/**
 * AI in Clinical Trials — Intelligence Database
 *
 * Data structure:
 *   themes[]                    Cross-cutting topics used by the Cross-Comparison view
 *     - id, label, description
 *
 *   organizations[]             List of organizations / platforms
 *     - id, name, short
 *     - logoText                Monogram shown in the organization's badge
 *     - brandColor              Brand-inspired accent color for the badge / frame
 *     - logo                    (optional) image URL; if set, used instead of the monogram
 *     - url                     Official site / relevant section
 *     - documents[]
 *         - id, title, url, type
 *         - status              "final" (finalized) or "consultation" (draft / open for consultation)
 *         - publishedAt         Publish date (YYYY-MM-DD / YYYY-MM / YYYY)
 *         - updatedAt           Last update date
 *         - summary             Interpretation / abstract
 *         - scores              Importance rating (1-5 each):
 *                                 impact    = industry influence
 *                                 rigor     = strength / persuasiveness of the evidence
 *                                 foresight = forward-looking / novelty
 *         - topics[]            Theme ids (used by Cross-Comparison)
 *         - history[]           Update trajectory (newest first): { date, type, note }
 *
 * Note: the timeline only includes content from January 2023 onward.
 * Some links/dates were gathered via web search and may need review.
 *
 * lastCheckedAt: last time the sources were reconciled (updated by the automation).
 *
 * refreshLog: maintenance record of each reconciliation, newest first.
 *   date          refresh date (the newest entry matches lastCheckedAt)
 *   windowStart   first day of the reporting window shown on "What's new";
 *                 windowStart..date is that window.
 *   added[]       { doc, note }             note supplies the rationale text
 *   updated[]     { doc, change, entries }  change supplies the summary text
 *   themesAdded[] cross-cutting theme ids introduced by the refresh
 *
 * The "What's new" page is driven purely by source dates, not by this log:
 *   Section 1 — documents whose publishedAt falls inside the window
 *   Section 2 — documents published earlier that carry a history entry dated
 *               inside the window
 * The log only supplies the annotation text for whichever documents qualify.
 * Dates known only to the year are too coarse to place and never qualify.
 */
window.DATA = {
  lastCheckedAt: "2026-10-19",

  refreshLog: [
    {
      date: "2026-10-19",
      windowStart: "2026-08-27",
      themesAdded: [],
      added: [
        { doc: "nrco-ai-augmentation-oncology-trials", note: "Peer-reviewed line between AI that augments trial operations today and AI meant to replace evidence generation — still lacking prospective validation." },
        { doc: "tufts-medable-monitoring-agent-enpv", note: "Tufts CSDD / Medable eNPV estimate for an AI monitoring agent ($7.5M–$21M per program); vendor-supplied inputs, not yet peer reviewed." },
        { doc: "iqvia-predictive-clinical-development", note: "IQVIA's commercial launch of an agentic, end-to-end predictive development offering — a CRO-scale bet on orchestrated AI across startup, recruitment, cleaning and phase transitions." },
        { doc: "mhra-national-ai-commission-recommendations", note: "The UK's 44 final recommendations for a proportionate, lifecycle-based AI-in-healthcare framework; government accepted all on 6 October and MHRA committed to change-management draft guidance by December 2026." },
        { doc: "eclinm-ai-trials-evidence-gaps", note: "Independent Lancet eClinicalMedicine synthesis distinguishing AI-as-intervention from AI-for-trial-operations and mapping evidence gaps against ICH E6(R3) and FDA-EMA principles." },
        { doc: "pmda-genai-samd-review-points", note: "Japan's first draft review framework for generative-AI program medical devices, pairing pre-market property-based testing with mandatory post-market performance monitoring." },
        { doc: "mck-ai-drug-discovery-what-matters-most", note: "McKinsey's September 2026 counter-narrative: AI deals and timelines compress discovery, but clinical failure still tracks target validation — investment has concentrated on molecule design, not the harder biology problem." },
        { doc: "rm-ai-in-clinical-trials-market-2040", note: "A fourth market sizing extending the forecast to 2040 ($2.09B in 2026 to $18.62B, 17% CAGR), widening the spread among published estimates tracked in the hub." },
        { doc: "ema-annex22-genai-workshop-report", note: "First EU workshop output on admitting generative AI into GMP under layered, risk-based controls — signals how Annex 22 may evolve beyond the 2025 draft's ban on LLMs in critical use." },
        { doc: "iqvia-life-science-models", note: "IQVIA's purpose-built life-science model suite for protocol simulation, digital twins and outcome prediction — extends Predictive Clinical Development with NVIDIA Nemotron and AWS-backed models." },
        { doc: "ema-ai-focused-group-oct-2026", note: "October 2026 HMA-EMA industry dialogue summary: ongoing glossary work, Annex 22 revision, Biotech Act guidance duties, and industry asks for operational templates beyond high-level principles." }
      ],
      updated: [
        {
          doc: "fda-ai-regulatory-decision-draft",
          change: "Still draft as of 19 October 2026; hub link points to the Federal Register availability notice (fda.gov guidance pages may be unreachable on some corporate networks). ICH M15 final (June 2026) remains the nearest binding modelling framework naming AI/ML.",
          entries: ["2026-10"]
        },
        {
          doc: "fda-ai-early-phase-pilot-rfi",
          change: "No FDA follow-up published by 19 October 2026 — no comment summary, pilot roster, or start date beyond the April RFI and June comment extension.",
          entries: ["2026-10"]
        },
        {
          doc: "fda-good-ai-practice-principles",
          change: "Hub link set to FDA's GovDelivery announcement of the joint FDA-EMA principles (accessible where fda.gov HTML/PDF endpoints are blocked).",
          entries: ["2026-10"]
        },
        {
          doc: "nmpa-gcp-revision-e6r3",
          change: "CDE's companion Guiding Principles for Computerised Systems and Electronic Data (2026 No. 44, 22 September) added to the trajectory — the operative computerised-system layer for AI-enabled trial tools under China's E6(R3)-aligned GCP.",
          entries: ["2026-09-22"]
        },
        {
          doc: "nmpa-ai-drug-regulation",
          change: "NMPA posted an official English policy interpretation (20 August), making the 2030/2035 milestones directly citable for international sponsors.",
          entries: ["2026-08-20"]
        },
        {
          doc: "mhra-national-ai-commission-evidence",
          change: "Evidence phase closed when final recommendations landed on 10 September; this entry remains the supporting research base.",
          entries: ["2026-09-10"]
        },
        {
          doc: "mhra-ai-airlock",
          change: "Phase 3 applications opened on 6 October alongside the government's acceptance of all 44 Commission recommendations.",
          entries: ["2026-10-06"]
        },
        {
          doc: "mhra-national-ai-commission-recommendations",
          change: "Government response (6 October) accepted all 44 recommendations; MHRA committed to draft change-management guidance by December 2026 and AI Airlock Phase 3 opened the same day.",
          entries: ["2026-10-06"]
        },
        {
          doc: "ema-fda-good-ai-practice",
          change: "EMA AI topic page update (14 August) added regulators' peer-reviewed research-priorities article behind the joint principles.",
          entries: ["2026-08-14"]
        },
        {
          doc: "nmpa-patient-centered-triple",
          change: "Link replaced with CDE's official 2023 No. 44 notice (Lexology mirror returned HTTP 403 from automated checks).",
          entries: ["2026-10-19"]
        },
        {
          doc: "eclinm-ai-trials-evidence-gaps",
          change: "Primary link switched to the DOI resolver (stable open-access entry point; Lancet full-text URL often blocks automated fetch).",
          entries: ["2026-10-19"]
        }
      ]
    },
    {
      date: "2026-08-26",
      windowStart: "2026-06-28",
      themesAdded: ["harmonization", "scaling-roi"],
      added: [
        { doc: "ema-fda-good-ai-practice", note: "EMA's side of the first coordinated transatlantic regulatory position on AI in drug development." },
        { doc: "ema-ndsg-workplan-2026-2028", note: "Sets out the EU's committed guidance pipeline for AI across the medicines lifecycle through 2028." },
        { doc: "ema-ai-guidance-roadmap-2026", note: "Names the specific EU instruments coming next, including legally binding AI guidance duties under the proposed Biotech Act." },
        { doc: "nmpa-gcp-revision-e6r3", note: "China's E6(R3)-aligned GCP defines the compliance surface AI-enabled trial tooling must fit, effective 1 September 2026." },
        { doc: "cde-bayesian-external-borrowing", note: "The statistical basis for external controls and simulation-based designs in China." },
        { doc: "mhra-ai-airlock-phase2-report", note: "First consolidated UK recommendations on PCCPs, generative-AI validation and AI-powered IVD performance evaluation." },
        { doc: "mhra-national-ai-commission-evidence", note: "The evidence base for the UK's forthcoming AI framework; the Commission's final recommendations are due late summer 2026." },
        { doc: "pmda-ai-guiding-principles-project-team", note: "Japan's first move toward horizontal AI principles spanning both drugs and devices." },
        { doc: "iqvia-agentic-ai-real-impact", note: "A delivery-side view of moving from AI pilots to orchestrated agents, with the IQVIA.ai platform launch." },
        { doc: "iqvia-tmf-agentification", note: "A concrete agentic use case inside a regulated, inspection-critical workflow." },
        { doc: "iqvia-unified-data-ecosystem", note: "Argues the data foundation, not the model, is the binding constraint on AI in trials." },
        { doc: "zs-in-silico-true-value", note: "Quantifies the in silico opportunity: up to 60% lower trial development costs and 40% shorter cycle times." },
        { doc: "zs-future-drug-development-digital-twins", note: "Describes agent-of-agents protocol design and a real-time R&D command centre." },
        { doc: "mck-linear-gates-to-learning-loops", note: "Argues capturing AI's value requires structurally redesigning R&D into five closed decision loops." },
        { doc: "deloitte-measuring-return-2026", note: "16th-edition R&D returns analysis, stating plainly that AI's promised cost and time savings have not materialized at scale." },
        { doc: "accenture-ryght-ai-investment", note: "Consultancy AI advice turning into deployed capability across feasibility, site selection and recruitment." },
        { doc: "accenture-2026-outlook", note: "Marks the shift from generative to agentic AI, with only about one in five companies having scaled AI successfully." },
        { doc: "tc-tufts-data-collection-burden", note: "Finds that nearly a third of trial procedures and datapoints do not inform key endpoints, and that they drive up to 30% of participant and site burden." },
        { doc: "tc-annual-report-2025", note: "Sets the consortium's priorities: digital protocols for regulatory use and EHR-enabled trial participation." },
        { doc: "fbi-ai-clinical-trials-market-2034", note: "A third independent market sizing, exposing how far published estimates of this market diverge." },
        { doc: "nrco-ai-augmentation-oncology-trials", note: "Peer-reviewed evidence line between AI that augments trial operations today and AI that would replace evidence generation, which is not yet prospectively validated." },
        { doc: "tufts-medable-monitoring-agent-enpv", note: "A quantified per-program value estimate for an AI agent — $7.5M to $21M eNPV — with the caveat that the vendor supplied the operational inputs." }
      ],
      updated: [
        {
          doc: "fda-ai-early-phase-pilot-rfi",
          change: "Added to the hub this refresh. The extended comment period closed on 29 June 2026 and FDA has published nothing further, so the pilot's scope still stands as proposed.",
          entries: ["2026-06-29"]
        },
        {
          doc: "fbi-ai-clinical-trials-market-2034",
          change: "Edition date pinned down at last — the publisher listing shows a 20 July 2026 update, replacing the year-only estimate, with the regional and offering breakdowns verified against it.",
          entries: ["2026-07-20"]
        },
        {
          doc: "ema-fda-good-ai-practice",
          change: "EMA added the regulators' own peer-reviewed research-priorities article alongside the principles, showing which evidence gaps the EU wants closed before binding AI guidance arrives.",
          entries: ["2026-08-14"]
        },
        {
          doc: "mhra-ai-airlock-phase2-report",
          change: "The Phase 2 report was revised in July and the seven innovator case study reports were released, so the underlying evidence — not just the recommendations — is now public.",
          entries: ["2026-07-27", "2026-07-17"]
        },
        {
          doc: "nmpa-gcp-revision-e6r3",
          change: "Confirmed final during the August reconciliation: applies to trials commencing after 31 March 2026 and takes operative effect on 1 September 2026.",
          entries: ["2026-08"]
        },
        {
          doc: "fda-ai-regulatory-decision-draft",
          change: "Status re-verified: FDA's risk-based AI credibility framework is still draft and non-binding. The consultation close and the link to the new joint FDA-EMA principles were added to the trajectory.",
          entries: ["2026-08", "2026-01-14", "2025-04"]
        },
        {
          doc: "fda-good-ai-practice-principles",
          change: "Previously a placeholder awaiting verification. Now confirmed as the ten guiding principles issued jointly with EMA on 14 January 2026, with the full scope, content and drafting process recorded.",
          entries: ["2026-01-14"]
        },
        {
          doc: "ema-reflection-paper-ai",
          change: "Recorded that the reflection paper is now being followed by a dedicated guidance track for AI in clinical development plus a PRAC-joint Q&A on AI in pharmacovigilance, while remaining the operative reference until those are issued.",
          entries: ["2026-02"]
        },
        {
          doc: "mhra-ai-airlock",
          change: "Phase 2 formally closed with its programme report published, and DHSC funding confirmed through 2029, moving the sandbox from short-term pilots to sustained testing.",
          entries: ["2026-06-09", "2026-04-08"]
        },
        {
          doc: "pmda-clinical-trial-ecosystem",
          change: "Added Japan's phased ICH E6(R3) implementation dates and the June 2026 briefing whose outputs feed the GCP ministerial ordinance revision.",
          entries: ["2026-08", "2026-06-11"]
        },
        {
          doc: "mck-agentic-ai-life-sciences",
          change: "The January 2026 edition added harder numbers: 75-85% of pharma workflows are automatable or augmentable, 25-40% of enterprise capacity could be freed, faster filings are worth roughly $180M NPV per priority asset — alongside the paradox that about 80% of companies report no bottom-line benefit yet.",
          entries: ["2026-01"]
        },
        {
          doc: "bcg-ai-discovered-drugs-success",
          change: "Tracking updated to May 2026: more than 75 AI-designed molecules in active trials, around 24 in Phase II and at least three at Phase III, with end-to-end probability of reaching market roughly doubling to 9-18%.",
          entries: ["2026-05"]
        },
        {
          doc: "zs-ai-clinical-development-6-investments",
          change: "The article was reframed around orchestration and agentic AI, recasting protocol design as multi-agent simulation in which clinical, statistical, regulatory and patient-perspective agents critique a design simultaneously.",
          entries: ["2026"]
        },
        {
          doc: "iqvia-promising-new-developments-ai",
          change: "The four-part series continued with part 2, shifting emphasis from use-case discovery to predictability in trial design, planning and delivery.",
          entries: ["2026"]
        },
        {
          doc: "tc-digital-data-flow",
          change: "Added DIA 2026 activity on combining AI with the USDM standard for protocol digitization, and the consortium's 2026 priority of enabling digital protocols for regulatory use.",
          entries: ["2026-06"]
        },
        {
          doc: "rm-ai-in-clinical-trials-market-2026",
          change: "Figures verified against the publisher listing: $9.16B in 2025 rising to $13.08B in 2026 and $54.71B by 2030, with the growth drivers and named trends recorded."
        },
        {
          doc: "gvr-ai-based-clinical-trials-solution",
          change: "Figures re-verified against the publisher listing (still the current edition) and the narrower solution-provider scope made explicit, which explains the gap against the broader market reports."
        }
      ]
    }
  ],

  themes: [
    { id: "regulatory", label: "Regulatory framework & risk-based credibility", description: "Regulatory expectations, risk-based frameworks and credibility / context-of-use assessment for AI models." },
    { id: "gcp", label: "GCP, data integrity & governance", description: "Good Clinical Practice alignment, transparency, model documentation, bias mitigation and data integrity." },
    { id: "harmonization", label: "International harmonization & regulatory convergence", description: "Alignment of AI expectations across regulators (joint FDA-EMA principles, ICH E6(R3)/M11 adoption, cross-border guidance roadmaps)." },
    { id: "genai", label: "Generative AI applications", description: "Use of generative AI across clinical development workflows." },
    { id: "agentic", label: "Agentic AI", description: "Autonomous / multi-agent AI collaborating across the clinical trial process." },
    { id: "doc-authoring", label: "Automated clinical document authoring", description: "AI-assisted drafting of protocols, clinical study reports (CSRs) and regulatory submissions." },
    { id: "recruitment", label: "Patient recruitment, selection & retention", description: "AI for participant identification, stratification, engagement and retention." },
    { id: "site-selection", label: "Site selection & enrollment optimization", description: "AI-driven site selection and enrollment / feasibility optimization." },
    { id: "protocol-design", label: "Protocol design & trial simulation", description: "AI-driven protocol optimization, benchmarking and trial simulation." },
    { id: "data-mgmt", label: "Clinical data management & analysis", description: "AI for data curation, anomaly detection, monitoring and statistical analysis." },
    { id: "drug-discovery-success", label: "AI-discovered drug success rates", description: "Clinical success / performance of AI-discovered molecules." },
    { id: "digital-endpoints", label: "Digital endpoints, DCT & wearables", description: "Decentralized trials, digital endpoints and wearable-collected data." },
    { id: "in-silico", label: "In silico trials & digital twins", description: "Computer simulations and digital twins for trial design and evaluation." },
    { id: "market", label: "Market size & forecast", description: "Market sizing, growth and forecast for AI in clinical trials." },
    { id: "rd-productivity", label: "R&D productivity, timeline & cost reduction", description: "Overall R&D productivity gains, timeline compression and cost reduction." },
    { id: "scaling-roi", label: "From pilots to scale: AI ROI & adoption gap", description: "Why AI pilots stall, the measurable-return gap and what it takes to industrialize AI end to end across clinical development." }
  ],

  organizations: [
    {
      id: "fda",
      name: "FDA — U.S. Food and Drug Administration",
      short: "FDA",
      logoText: "FDA",
      brandColor: "#0071bc",
      domain: "fda.gov",
      category: "regulator",
      intro: "The U.S. regulator for drugs and biologics; issues the guidance and frameworks that shape how AI is used in regulated drug development.",
      url: "https://www.federalregister.gov/documents/search?conditions%5Bagencies%5D%5B0%5D=food-and-drug-administration&conditions%5Bterm%5D=artificial+intelligence+drug&order=newest",
      documents: [
        {
          id: "fda-ai-drug-manufacturing",
          title: "Artificial Intelligence in Drug Manufacturing",
          url: "https://www.federalregister.gov/documents/2023/03/16/2023-05423/artificial-intelligence-in-drug-manufacturing-discussion-paper-and-request-for-feedback",
          type: "Discussion Paper",
          status: "consultation",
          publishedAt: "2023-03",
          updatedAt: "2023-03",
          summary: "Discussion paper exploring the use of AI in pharmaceutical manufacturing and related regulatory considerations; part of FDA's early series soliciting input on AI across the drug lifecycle.",
          scores: { impact: 4, rigor: 3, foresight: 3 },
          topics: ["regulatory"],
          history: [
            { date: "2023-03", type: "publish", note: "Published discussion paper on AI in drug manufacturing; raised questions on cloud/edge deployment, model lifecycle management and quality oversight." }
          ]
        },
        {
          id: "fda-aiml-discussion-paper",
          title: "Using Artificial Intelligence & Machine Learning in the Development of Drug & Biological Products (Discussion Paper)",
          url: "https://www.federalregister.gov/documents/2023/05/11/2023-09985/using-artificial-intelligence-and-machine-learning-in-the-development-of-drug-and-biological",
          type: "Discussion Paper",
          status: "consultation",
          publishedAt: "2023-05",
          updatedAt: "2025-02",
          summary: "FDA discussion paper on the use of AI/ML in drug and biological product development. Attracted 800+ external comments and laid the groundwork for later formal guidance.",
          scores: { impact: 5, rigor: 4, foresight: 4 },
          topics: ["regulatory", "rd-productivity"],
          history: [
            { date: "2025-02", type: "update", note: "Revised PDF (February 2025) reflecting 800+ public comments; full text at https://www.fda.gov/media/167973/download — hub link is the 2023 Federal Register availability notice for network environments that block fda.gov/media." },
            { date: "2023-05", type: "publish", note: "Initial discussion paper published and public docket opened; outlined AI/ML use across the lifecycle and posed questions on standards, governance and transparency." }
          ]
        },
        {
          id: "fda-ai-medical-products-collaboration",
          title: "Artificial Intelligence and Medical Products: How CBER, CDER, CDRH, and OCP are Working Together",
          url: "https://content.govdelivery.com/attachments/USFDA/2024/03/15/file_attachments/2815628/omp_aimedicalproducts_final_240313%20%281%29.pdf",
          type: "Agency Paper",
          status: "final",
          publishedAt: "2024-03",
          updatedAt: "2025-02",
          summary: "Joint paper from four FDA centers (CBER/CDER/CDRH/OCP) describing a coordinated, cross-center approach to regulating AI in medical products.",
          scores: { impact: 4, rigor: 3, foresight: 4 },
          topics: ["regulatory"],
          history: [
            { date: "2025-02", type: "update", note: "Revised to align cross-center coordination language and reflect the four focus areas (standards, evaluation, real-world monitoring and research)." },
            { date: "2024-03", type: "publish", note: "Published cross-center paper describing shared principles and collaboration areas across CBER/CDER/CDRH/OCP." }
          ]
        },
        {
          id: "fda-ai-regulatory-decision-draft",
          title: "Considerations for the Use of Artificial Intelligence to Support Regulatory Decision-Making for Drug and Biological Products (Draft Guidance)",
          url: "https://www.federalregister.gov/documents/2025/01/07/2024-31542/considerations-for-the-use-of-artificial-intelligence-to-support-regulatory-decision-making-for-drug",
          type: "Draft Guidance",
          status: "consultation",
          publishedAt: "2025-01-07",
          updatedAt: "2026-10",
          summary: "FDA's first draft guidance on using AI models in drug/biologics development. Introduces a risk-based credibility assessment framework (7-step) and the 'context of use (COU)' concept, spanning nonclinical, clinical, post-marketing and manufacturing phases. Still draft (non-binding, not for implementation) as of October 2026.",
          scores: { impact: 5, rigor: 4, foresight: 5 },
          topics: ["regulatory", "gcp", "harmonization"],
          history: [
            { date: "2026-10", type: "update", note: "Status re-checked in October 2026: draft guidance (docket FDA-2024-D-4689) remains 'not for implementation' with no finalisation date. ICH M15 final (June 2026) is the nearest binding modelling framework naming AI/ML. Hub link uses the Federal Register availability notice because fda.gov guidance endpoints returned HTTP 404 from Sanofi network checks; the authoritative PDF remains on fda.gov for US access." },
            { date: "2026-08", type: "update", note: "Status check: the document remains draft guidance, explicitly 'not for implementation' and non-binding. Finalization has been anticipated since the comment period closed but had not occurred as of August 2026, so the 7-step credibility framework is still a recommendation rather than a requirement." },
            { date: "2026-01-14", type: "update", note: "Complemented (not replaced) by the joint FDA-EMA Guiding Principles of Good AI Practice in Drug Development, which raise the same themes — risk-based management, context of use, data governance, lifecycle monitoring — at a transatlantic, cross-jurisdictional level." },
            { date: "2025-04", type: "consultation", note: "Public comment period closed. FDA noted the draft was informed by an expert workshop, 800+ comments on the 2023 discussion paper and its own review of 500+ submissions containing AI components between 2016 and 2023." },
            { date: "2025-01-07", type: "publish", note: "Draft guidance issued for public comment; defined the 7-step credibility assessment (question of interest, COU, model risk, credibility plan, execution, documentation, adequacy) and scoped out pure discovery / operational uses." }
          ]
        },
        {
          id: "fda-good-ai-practice-principles",
          title: "Guiding Principles of Good AI Practice in Drug Development (joint FDA-EMA)",
          url: "https://content.govdelivery.com/accounts/USFDA/bulletins/4042e31",
          type: "Guiding Principles",
          status: "final",
          publishedAt: "2026-01-14",
          updatedAt: "2026-01-14",
          summary: "Ten guiding principles issued jointly by FDA and EMA — the first coordinated transatlantic regulatory position on AI in medicine development. The principles cover human-centric design, risk, standards, context of use, multidisciplinary expertise, data governance, model development, performance assessment, lifecycle management and clear information, and apply across the full medicines lifecycle (clinical trials, manufacturing and pharmacovigilance). Adoption is voluntary, but the principles are explicitly intended to shape future binding guidance on both sides of the Atlantic.",
          scores: { impact: 5, rigor: 4, foresight: 5 },
          topics: ["regulatory", "gcp", "harmonization"],
          history: [
            { date: "2026-10", type: "update", note: "Hub link set to FDA's GovDelivery announcement of the joint principles (PDF remains at fda.gov/media/189581 and on EMA's mirror PDF)." },
            { date: "2026-01-14", type: "publish", note: "FDA and EMA jointly published the ten principles, framed as a concrete outcome of renewed EU-U.S. cooperation on emerging health technologies. The EU-side drafting group comprised 15 representatives of the European Medicines Regulatory Network. Aim: reduce regulatory fragmentation and give developers a common early set of expectations." }
          ]
        },
        {
          id: "fda-ai-early-phase-pilot-rfi",
          title: "AI-Enabled Optimization of Early-Phase Clinical Trials Pilot Program (Request for Information)",
          url: "https://www.govinfo.gov/content/pkg/FR-2026-04-29/html/2026-08281.htm",
          type: "Request for Information",
          status: "consultation",
          publishedAt: "2026-04-29",
          updatedAt: "2026-10",
          summary: "FDA's Federal Register request for input on a proposed pilot programme testing whether AI-enabled tools can improve the efficiency, speed and quality of decision-making in early-phase trials — the stage FDA itself calls a critical bottleneck, marked by high uncertainty, small populations and slow go/no-go calls. Named targets: trial efficiency, safety monitoring, dose selection and better-informed early go/no-go decisions (including whether a Phase 1 study may proceed). The pilot will recruit sponsors with applications before CDER, CBER and the Oncology Center of Excellence, is coordinated by the Deputy Chief Medical Officer in the Office of the Commissioner, and will be guided by principles aligned to the NIST AI Risk Management Framework. Significant because it moves FDA from writing expectations about sponsors' AI to operating AI-assisted review workflows itself. Docket FDA-2026-N-4390; 91 FR 23100.",
          scores: { impact: 4, rigor: 3, foresight: 5 },
          topics: ["regulatory", "protocol-design", "data-mgmt", "rd-productivity"],
          history: [
            { date: "2026-10", type: "update", note: "October 2026 reconciliation: still no Federal Register follow-up, comment summary, selected sponsors or pilot start date. FDA's April 2026 press release had anticipated final selection criteria in July and pilot selections in August; neither materialised publicly by mid-October, so the RFI text remains the operative reference." },
            { date: "2026-06-29", type: "consultation", note: "Extended comment period closed. As of late August 2026 FDA had not published a summary of comments, a participant list, a start date or any follow-up notice, so the pilot's scope remains as proposed — the docket is the thing to watch for next steps." },
            { date: "2026-05-28", type: "update", note: "FDA published a comment-period extension notice, moving the deadline out from the initial 30 days." },
            { date: "2026-04-29", type: "publish", note: "RFI published in the Federal Register (91 FR 23100-23102, Docket FDA-2026-N-4390), opening a 30-day comment period and soliciting operational as well as algorithm-validation input." }
          ]
        }
      ]
    },
    {
      id: "ema",
      name: "EMA — European Medicines Agency",
      short: "EMA",
      logoText: "EMA",
      brandColor: "#003399",
      domain: "ema.europa.eu",
      category: "regulator",
      intro: "The European Union's medicines regulator; sets expectations for AI/ML across the medicinal product lifecycle.",
      url: "https://www.ema.europa.eu/en/about-us/how-we-work/data-regulation-big-data-other-sources/artificial-intelligence",
      documents: [
        {
          id: "ema-reflection-paper-ai",
          title: "Reflection Paper on the Use of Artificial Intelligence (AI) in the Medicinal Product Lifecycle",
          url: "https://www.ema.europa.eu/en/documents/scientific-guideline/reflection-paper-use-artificial-intelligence-ai-medicinal-product-lifecycle_en.pdf",
          type: "Reflection Paper",
          status: "final",
          publishedAt: "2023-07",
          updatedAt: "2026-02",
          summary: "EMA/CHMP/CVMP reflection paper on AI/ML use across the medicinal product lifecycle (development, authorisation, post-authorisation). Emphasizes a risk-based, human-centric approach; in clinical trials AI/ML must meet GCP, and high-impact/high-risk uses require full disclosure of model architecture, training data and validation logs. Now the anchor document for a wider EU guidance programme taking shape in 2026.",
          scores: { impact: 5, rigor: 4, foresight: 4 },
          topics: ["regulatory", "gcp", "harmonization"],
          history: [
            { date: "2026-02", type: "update", note: "Superseded in ambition rather than in text: EMA confirmed a dedicated guidance track for AI in clinical development (concept paper first, then full draft guidance) plus a Q&A instrument on AI in pharmacovigilance with PRAC. The reflection paper remains the operative reference until those documents are issued." },
            { date: "2024-09-09", type: "update", note: "Final paper adopted (EMA/CHMP/CVMP/83833/2023). Confirmed the risk-based, human-centric approach; clarified that clinical-trial AI/ML must meet ICH GCP, prohibited incremental learning during pivotal trials, and required pre-specified data curation pipelines plus frozen, documented models." },
            { date: "2023-12", type: "consultation", note: "Public consultation closed; extensive stakeholder feedback received on the draft." },
            { date: "2023-07", type: "publish", note: "Draft reflection paper released for public consultation; set out principles for AI/ML from drug discovery through post-authorisation." }
          ]
        },
        {
          id: "ema-fda-good-ai-practice",
          title: "Guiding Principles of Good AI Practice in Drug Development (joint EMA-FDA)",
          url: "https://www.ema.europa.eu/en/documents/other/guiding-principles-good-ai-practice-drug-development_en.pdf",
          type: "Guiding Principles",
          status: "final",
          publishedAt: "2026-01-14",
          updatedAt: "2026-08-14",
          summary: "EMA's side of the ten joint EMA-FDA guiding principles for good AI practice — a shared regulatory vision for how AI should be designed, validated, monitored and governed across the whole medicines lifecycle, from early research and clinical development to manufacturing and post-marketing safety. The ten are: human-centric by design; risk-based approach; adherence to standards including GxP; clear context of use; multidisciplinary expertise; data governance and documentation; model design and development practices; risk-based performance assessment of the complete system including human-AI interactions; life cycle management with scheduled monitoring and re-evaluation for data drift; and clear, essential information in plain language for users and patients. The document defines AI deliberately broadly, as system-level technologies used to generate or analyse evidence across nonclinical, clinical, post-marketing and manufacturing phases. Voluntary today, but explicitly meant to inform future EU and US guidance and to underpin international cooperation.",
          scores: { impact: 5, rigor: 4, foresight: 5 },
          topics: ["regulatory", "gcp", "harmonization"],
          history: [
            { date: "2026-08-14", type: "update", note: "EMA's AI topic page — the companion landing page to this document — was updated to add the regulators' own peer-reviewed statement of research priorities behind the principles (Pinheiro et al., 'Regulatory Research Priorities for AI Use in the Medicine Lifecycle: A European Perspective with Global Relevance', Clin Pharmacol Ther), the clearest signal yet of which evidence gaps the EU intends to close before binding guidance lands. The principles document itself is unchanged since publication." },
            { date: "2026-01-14", type: "publish", note: "Published jointly with FDA. The European drafting group comprised 15 representatives of the European Medicines Regulatory Network; the principles will be read together with the proposed Biotech Act and the EU AI Act." }
          ]
        },
        {
          id: "ema-ndsg-workplan-2026-2028",
          title: "Network Data Steering Group Workplan 2026-2028: Data and AI in Medicines Regulation",
          url: "https://www.ema.europa.eu/en/documents/other/network-data-steering-group-workplan-2026-2028-data-artificial-intelligence-medicines-regulation_en.pdf",
          type: "Workplan",
          status: "final",
          publishedAt: "2026-02",
          updatedAt: "2026-02",
          summary: "The European medicines regulatory network's multi-year plan for data and AI, adopted by the Network Data Steering Group in February 2026 (first annual revision of the March 2025 workplan). Commits the network to developing AI guidance across the medicines lifecycle — explicitly including AI in clinical development and AI in pharmacovigilance — plus AI literacy, AI tooling, terminology standardization, AI risk management, and compliance with the EU AI Act. A coordinated guidance roadmap aligned with the proposed Biotech Act is to be developed.",
          scores: { impact: 4, rigor: 3, foresight: 5 },
          topics: ["regulatory", "gcp", "data-mgmt", "harmonization"],
          history: [
            { date: "2026-02", type: "publish", note: "Adopted by NDSG as the first annual revision of the workplan, extending activities to 2028. Adds continued support for evaluating AI across the medicines lifecycle (Innovation Task Force, Scientific Advice, qualification procedures) and commits to exploring further opportunities for international harmonization." },
            { date: "2025-03", type: "publish", note: "First NDSG workplan on data and AI in medicines regulation adopted." }
          ]
        },
        {
          id: "ema-ai-guidance-roadmap-2026",
          title: "HMA-EMA Focused Group on AI with Industry Stakeholders — AI Guidance Pipeline and the Biotech Act",
          url: "https://www.ema.europa.eu/en/documents/minutes/summary-notes-meeting-hma-ema-group-focused-ai-industry-stakeholders-february-2026_en.pdf",
          type: "Meeting Summary",
          status: "consultation",
          publishedAt: "2026-02-04",
          updatedAt: "2026-02-04",
          summary: "Summary notes from the HMA-EMA focused group on AI with industry stakeholders, setting out the concrete EU guidance pipeline: guidance on AI in clinical development (a concept paper is expected before a full draft), a PRAC-joint Q&A instrument on AI in pharmacovigilance, and GMP Annex 22 on AI in manufacturing — which drew roughly 1,300 public comments and is under revision with a final text expected by end of year. Most consequential for sponsors: the proposed Biotech Act would introduce legally binding obligations for EMA to issue AI guidance covering pre-clinical research, clinical development and trials, manufacturing, and post-authorisation monitoring.",
          scores: { impact: 4, rigor: 3, foresight: 5 },
          topics: ["regulatory", "gcp", "harmonization"],
          history: [
            { date: "2026-02-04", type: "consultation", note: "Focused-group meeting held with industry stakeholders. EMA noted that guidance work will begin before the Biotech Act is formally adopted, and that a roadmap and revised guidance-development processes will be explored in light of the proposed legal requirements." }
          ]
        },
        {
          id: "ema-annex22-genai-workshop-report",
          title: "Multistakeholder Workshop on Expert Contributions to AI Guidance Development (GMP Annex 22) — Report",
          url: "https://www.ema.europa.eu/en/documents/report/report-multistakeholder-workshop-expert-contributions-artificial-intelligence-guidance-development-annex-22_en.pdf",
          type: "Workshop Report",
          status: "consultation",
          publishedAt: "2026-10-02",
          updatedAt: "2026-10-02",
          summary: "Report of EMA's GMP/GDP Inspectors Working Group workshop (30 June - 1 July 2026) convened to reconsider how draft EU GMP Annex 22 treats generative AI, large language models and other probabilistic or adaptive models. The 2025 consultation draft barred such models from critical GMP applications; the consultation responses signalled support for enabling them under controls, so the drafting group sought expert input on guardrails. Across six topics, participants backed layered, risk-based controls rather than outright exclusion: risk assessment that weighs detectability, model influence, autonomy and novelty alongside severity and probability; human reviewers who understand the model principles, process, output and decision context well enough to challenge the AI; documented escalation and contingency pathways; supplier oversight; and periodic review to keep a demonstrable state of control. Technical examples should stay outside the main body or be non-prescriptive. The outcomes feed the ongoing revision of Annex 22; no final text or adoption date has been announced. Relevant beyond manufacturing because it is the EU's first worked view of how generative AI could be admitted into a GxP-critical process.",
          scores: { impact: 4, rigor: 3, foresight: 5 },
          topics: ["regulatory", "gcp", "genai"],
          history: [
            { date: "2026-10-02", type: "publish", note: "Workshop report published on the EMA event page. Concludes that a broad range of AI uses could be acceptable in GMP-regulated work subject to robust, risk-based validation and oversight, and hands the themes, common approaches and points of divergence to the Annex 22 drafting group." },
            { date: "2026-06-30", type: "consultation", note: "Two-day workshop held: an open expert session on 30 June followed by a closed Annex 22 drafting-group session on 1 July 2026, organised with EMA's Quality Innovation Group." },
            { date: "2025-07", type: "consultation", note: "Draft Annex 22 released for public consultation with revised Annex 11 and Chapter 4; the draft limited critical GMP use to static, deterministic models. Consultation closed in October 2025 after roughly 1,300 comments." }
          ]
        },
        {
          id: "ema-ai-focused-group-oct-2026",
          title: "HMA-EMA Focused Group on AI with Industry Stakeholders — October 2026 Summary Notes",
          url: "https://www.ema.europa.eu/en/documents/report/summary-notes-hma-ema-group-focused-ai-industry-stakeholders-october-2026_en.pdf",
          type: "Meeting Summary",
          status: "consultation",
          publishedAt: "2026-10-14",
          updatedAt: "2026-10-14",
          summary: "Summary notes from the 5 October 2026 virtual meeting of the HMA-EMA group focused on AI with industry stakeholders, published 14 October. Continues the February roadmap dialogue: FDA-EMA guiding principles and ongoing terminology/glossary harmonisation; MWP workplan items on AI in clinical development and PRAC-joint pharmacovigilance Q&A; Annex 22 revision after ~1,300 comments with final text still expected by end of 2026; and Biotech Act provisions that would make several AI guidance streams legally binding. Industry associations (EFPIA, EuropaBio, EUCOPE, AESGP, AnimalhealthEurope, Europharm SMC) reiterated needs for operational guidance — templates, checklists, proportionate risk tiers for SMEs — and clarity on generative AI in submissions, transparency when AI-generated content is used, and boundaries versus SaMD frameworks.",
          scores: { impact: 4, rigor: 3, foresight: 5 },
          topics: ["regulatory", "gcp", "harmonization", "genai"],
          history: [
            { date: "2026-10-14", type: "publish", note: "Summary notes and agenda PDFs posted on the EMA event page for the 5 October 2026 online session (NDSG workplan 2025-2028)." },
            { date: "2026-10-05", type: "consultation", note: "Focused-group meeting with industry stakeholders held online under NDSG co-chairs; registration by invitation." }
          ]
        }
      ]
    },
    {
      id: "nmpa",
      name: "NMPA — National Medical Products Administration (China)",
      short: "NMPA",
      logoText: "NMPA",
      brandColor: "#d81e06",
      domain: "nmpa.gov.cn",
      category: "regulator",
      intro: "China's national drug and medical-device regulator (with its Center for Drug Evaluation, CDE); shapes how AI and decentralized/intelligent approaches are used across drug development and clinical trials in China.",
      url: "https://www.nmpa.gov.cn/",
      documents: [
        {
          id: "nmpa-ai-drug-regulation",
          title: "Implementation Opinions on \"Artificial Intelligence + Drug Regulation\"",
          url: "https://www.gov.cn/zhengce/zhengceku/202604/content_7064591.htm",
          type: "Implementation Opinions",
          status: "final",
          publishedAt: "2026-04-02",
          updatedAt: "2026-08-20",
          summary: "NMPA's overarching policy for embedding AI across the entire drug regulatory lifecycle (evaluation and approval, supervision and inspection, testing and surveillance). Sets milestones to build an integrated 'AI + drug regulation' system by 2030 and a digital-intelligence-driven safety governance model by 2035, including high-quality datasets, vertical large models and intelligent agents.",
          scores: { impact: 4, rigor: 3, foresight: 5 },
          topics: ["regulatory", "rd-productivity"],
          history: [
            { date: "2026-08-20", type: "update", note: "NMPA published an official English-language policy interpretation (english.nmpa.gov.cn), restating the 2030 milestone — high-quality datasets, vertical large models and intelligent agents applied across review and approval, inspection, testing and surveillance, and government services — and the 2035 goal of digital-intelligence-driven, agile drug safety governance. No new obligations; it makes the policy directly citable for non-Chinese sponsors." },
            { date: "2026-04-02", type: "publish", note: "NMPA issued the Implementation Opinions (four parts: overall requirements, key digital-intelligence regulatory scenarios, foundational support, and organizational implementation) outlining seven priority directions and five foundational tasks for AI-enabled regulation." }
          ]
        },
        {
          id: "nmpa-patient-centered-triple",
          title: "Patient-Centered Drug Clinical Trial Guiding Principles — \"Triple Release\" (Design, Implementation, Benefit–Risk Assessment)",
          url: "https://www.cde.org.cn/main/news/viewInfoCommon/42c008e28f7004cd19b73949142380bd",
          type: "Guiding Principles",
          status: "final",
          publishedAt: "2023-07-27",
          updatedAt: "2023-07-27",
          summary: "CDE's three companion guiding principles establishing patient-centered clinical trials and a principle-based framework for decentralized / remote 'intelligent' clinical trials (DCT) in China — covering remote patient recruitment, electronic/remote informed consent, remote visits, direct-to-patient drug supply, patient experiential data collection and remote monitoring.",
          scores: { impact: 4, rigor: 3, foresight: 4 },
          topics: ["recruitment", "digital-endpoints"],
          history: [
            { date: "2023-07-27", type: "publish", note: "CDE officially released and implemented the three trial-version guiding principles (design, implementation, benefit–risk assessment), laying the regulatory basis for DCT and intelligent trial approaches in China." }
          ]
        },
        {
          id: "nmpa-ai-detection-devices",
          title: "Clinical Evaluation Guideline on Artificial Intelligence-assisted Detection Medical Devices (Software)",
          url: "https://chinameddevice.com/nmpa-ai-assisted-software/",
          type: "Clinical Evaluation Guideline",
          status: "final",
          publishedAt: "2023-11-07",
          updatedAt: "2023-11-07",
          summary: "Technical guideline for the clinical evaluation of AI-assisted detection (diagnostic) device software. Specifies acceptable trial designs (randomized parallel, crossover and multiple-reader multiple-case / MRMC), blinded and diverse reader review, data blinding, and sensitivity/specificity/diagnostic-accuracy as preferred primary endpoints.",
          scores: { impact: 3, rigor: 4, foresight: 3 },
          topics: ["regulatory", "data-mgmt"],
          history: [
            { date: "2023-11-07", type: "publish", note: "NMPA released the guideline (referencing FDA computer-assisted-detection guidance), setting clinical-trial design and evaluation-metric expectations for AI-assisted diagnostic software." }
          ]
        },
        {
          id: "nmpa-gcp-revision-e6r3",
          title: "Revised Good Clinical Practice (GCP) Aligned with ICH E6(R3)",
          url: "https://yjj.sh.gov.cn/qtgzwj/20260608/89cbf084b5cb4eab8fd0fb56d8538a1d.html",
          type: "Regulation",
          status: "final",
          publishedAt: "2026-05-21",
          updatedAt: "2026-09-22",
          summary: "China's revised GCP, aligned with the internationally agreed ICH E6(R3), issued as Announcement 2026 No. 50 (dated 21 May 2026, released 8 June 2026) and repealing the 2020 No. 57 announcement. Relevant to AI because E6(R3) reframes trial conduct around risk-proportionate quality by design, data governance across the full data lifecycle, and fitness-for-purpose expectations for computerised systems — the compliance surface into which AI-enabled recruitment, monitoring and data-management tools must fit. Applies to trials commencing after 31 March 2026, with the revised GCP effective 1 September 2026.",
          scores: { impact: 4, rigor: 3, foresight: 3 },
          topics: ["gcp", "regulatory", "data-mgmt", "harmonization"],
          history: [
            { date: "2026-09-22", type: "update", note: "CDE issued the companion Guiding Principles for Computerised Systems and Electronic Data in Drug Clinical Trials (Announcement 2026 No. 44, effective on publication; https://www.cde.org.cn/main/news/viewInfoCommon/2c5d9c3f1afef1605b6a6d3a9df7b5ae). Written to implement E6(R3) and the 2026 GCP, it covers systems that generate, store, transmit, analyse and report trial data (EDC, randomisation/IRT, eTMF), with requirements on data reliability, risk management, validation, access control, audit trails and allocation of responsibilities between sponsor, investigator and site. It does not address AI specifically, so AI-enabled trial systems fall under these general computerised-system controls." },
            { date: "2026-09-01", type: "update", note: "Revised GCP takes effect, making E6(R3)-style risk-based quality management and computerised-system expectations the operative standard for trials in China." },
            { date: "2026-08", type: "update", note: "Verified during the August 2026 source reconciliation: NMPA's E6(R3)-aligned GCP is final, applies to trials commencing after 31 March 2026, and takes operative effect from 1 September 2026 — establishing the risk-based quality and computerised-system expectations that AI-enabled trial tooling must meet in China." },
            { date: "2026-05-21", type: "publish", note: "Announcement 2026 No. 50 issued the revised GCP implementing ICH E6(R3) and repealed the 2020 No. 57 announcement; applies to trials commencing after 31 March 2026." }
          ]
        },
        {
          id: "cde-bayesian-external-borrowing",
          title: "Guiding Principles for Applying Bayesian External Information Borrowing Methods in Drug Clinical Trials (Trial Implementation)",
          url: "https://www.cnpharm.com/c/2026-01-21/1089278.shtml",
          type: "Guiding Principles",
          status: "final",
          publishedAt: "2026-01-20",
          updatedAt: "2026-01-20",
          summary: "CDE announcement No. 6 of 2026. Standardizes the technical requirements for borrowing external information via Bayesian methods in clinical research — the statistical foundation on which data-driven and simulation-based approaches (external controls, synthetic control arms, model-informed drug development) rest. Positioned by CDE as implementing Bayesian statistics as a 'new tool, new method' to raise R&D efficiency and shorten development cycles.",
          scores: { impact: 3, rigor: 4, foresight: 4 },
          topics: ["data-mgmt", "in-silico", "protocol-design"],
          history: [
            { date: "2026-01-20", type: "publish", note: "Issued by the Center for Drug Evaluation under NMPA deployment and effective on publication; sets out how external information may legitimately be borrowed in trial design and analysis." }
          ]
        }
      ]
    },
    {
      id: "mhra",
      name: "MHRA — Medicines and Healthcare products Regulatory Agency (UK)",
      short: "MHRA",
      logoText: "MHRA",
      brandColor: "#005eb8",
      domain: "gov.uk",
      category: "regulator",
      intro: "The United Kingdom's regulator for medicines and medical devices; developing an agile, sandbox-driven approach to regulating AI as a medical device and AI across the product lifecycle.",
      url: "https://www.gov.uk/government/collections/ai-airlock-the-regulatory-sandbox-for-aiamd",
      documents: [
        {
          id: "mhra-ai-airlock",
          title: "AI Airlock — Regulatory Sandbox for AI as a Medical Device (AIaMD)",
          url: "https://www.gov.uk/government/collections/ai-airlock-the-regulatory-sandbox-for-aiamd",
          type: "Regulatory Sandbox",
          status: "final",
          publishedAt: "2024-05-09",
          updatedAt: "2026-10-06",
          summary: "MHRA's first regulatory sandbox for AI as a Medical Device (AIaMD) — a collaborative environment (with the NHS, DHSC and UK Approved Bodies) to test real-world AI products, surface regulatory gaps and inform forthcoming AIaMD guidance. It is not a route to market, but a mechanism to build evidence for future UK AI-in-healthcare policy. Now funded through 2029 and moving from short-term pilots into a sustained testing programme.",
          scores: { impact: 4, rigor: 3, foresight: 4 },
          topics: ["regulatory", "gcp", "harmonization"],
          history: [
            { date: "2026-10-06", type: "update", note: "Call for applications to Phase 3 opened alongside the government's response to the National Commission, with testing themes taken directly from the Commission's recommendations — closing the loop from sandbox evidence to policy and back into the next testing cohort." },
            { date: "2026-06-09", type: "update", note: "Phase 2 formally completed and its programme report published alongside a suite of simulation-workshop summaries. Phase 3 runs from April 2026 with priorities to be shaped by the National Commission's recommendations." },
            { date: "2026-05", type: "update", note: "Phase 2 completed with 7 innovators across 3 regulatory challenges (managing evolving AI, regulating AI diagnostics, post-market surveillance); phase 3 underway." },
            { date: "2026-04-08", type: "update", note: "DHSC confirmed multi-year funding — GBP 1.2 million per year for 2026-2029 (GBP 3.6 million over three years) — letting the programme scale beyond annual financial cycles into longer-term evaluation models." },
            { date: "2025-03", type: "update", note: "Pilot phase (4 products: Philips, AutoMedica, OncoFlow, Newton's Tree) closed; learnings feeding the National Commission into the Regulation of AI in Healthcare." },
            { date: "2024-05-09", type: "publish", note: "AI Airlock launched as a key part of MHRA's strategic approach to AI, responding to the 2023 government white paper." }
          ]
        },
        {
          id: "mhra-ai-airlock-report",
          title: "AI Airlock Sandbox Pilot Programme Report",
          url: "https://www.gov.uk/government/publications/ai-airlock-sandbox-pilot-programme-report",
          type: "Programme Report",
          status: "final",
          publishedAt: "2025-10",
          updatedAt: "2025-10",
          summary: "Outcomes from the AI Airlock pilot (Apr 2024–Mar 2025). Provides recommendations on Predetermined Change Control Plans (PCCPs), synthetic-data validation, transparency/explainability for large language models and enhanced post-market surveillance; findings feed the UK's forthcoming AI-in-healthcare regulatory framework (expected 2026).",
          scores: { impact: 3, rigor: 4, foresight: 4 },
          topics: ["regulatory", "data-mgmt"],
          history: [
            { date: "2025-10", type: "publish", note: "Pilot programme report published with case studies and cross-cutting recommendations to inform future MHRA guidance and the National AI Commission." }
          ]
        },
        {
          id: "mhra-ai-airlock-phase2-report",
          title: "AI Airlock Sandbox Phase 2 Programme Report",
          url: "https://www.gov.uk/government/publications/ai-airlock-sandbox-phase-2-programme-report",
          type: "Programme Report",
          status: "final",
          publishedAt: "2026-06-09",
          updatedAt: "2026-07-27",
          summary: "Findings from AI Airlock Phase 2 (April 2025 - March 2026), which stress-tested three regulatory challenges: managing intended purpose over a product's lifecycle and validating generative-AI medical devices; safe lifecycle management through predetermined change control plans (PCCPs) and post-market surveillance; and strengthening performance evaluation for AI-powered in vitro diagnostics. Recommendations: issue clear PCCP guidance, update software qualification and intended-purpose guidance for AI, create specific performance-evaluation guidance for AI-powered IVDs, and explore ecosystem-wide governance. Published with a suite of multi-stakeholder simulation-workshop reports.",
          scores: { impact: 4, rigor: 4, foresight: 4 },
          topics: ["regulatory", "gcp", "genai", "data-mgmt"],
          history: [
            { date: "2026-07-27", type: "update", note: "Report revised to amend the engagement route into the MHRA set out in recommendation 20 — the practical instruction for how developers approach the agency on the Phase 2 findings." },
            { date: "2026-07-17", type: "update", note: "The seven Phase 2 innovator case study reports (160 pages, authored by the innovators themselves) were added to the publication page, opening up the underlying evidence behind the programme recommendations." },
            { date: "2026-06-09", type: "publish", note: "Report published on completion of Phase 2. Its evidence feeds directly into the National Commission into the Regulation of AI in Healthcare and will shape Phase 3 priorities and future UK and international AI medical-device guidance." }
          ]
        },
        {
          id: "mhra-national-ai-commission-evidence",
          title: "National Commission into the Regulation of AI in Healthcare — Research, Engagement and Call for Evidence Findings",
          url: "https://www.gov.uk/government/publications/national-commission-into-the-regulation-of-ai-in-healthcare-research-engagement-and-call-for-evidence-findings",
          type: "Evidence Report",
          status: "final",
          publishedAt: "2026-06-11",
          updatedAt: "2026-09-10",
          summary: "Two reports forming the evidence base for the UK's forthcoming AI-in-healthcare regulatory framework: a research and engagement report and a summary of the Call for Evidence (760 respondents), drawing on public polling, surveys, deliberative research, an open call, a public Ask Me Anything session and insights from the AI Airlock. Ten key findings were identified. These are explicitly not the recommendations — the National Commission's final recommendations are due in late summer 2026, after which MHRA will consider implementation alongside the 10-Year Health Plan for England and the Life Sciences Sector Plan.",
          scores: { impact: 4, rigor: 4, foresight: 4 },
          topics: ["regulatory", "gcp", "harmonization"],
          history: [
            { date: "2026-09-10", type: "update", note: "The evidence phase is closed: the Commission published its final recommendations (tracked as a separate entry), which build on these findings. This evidence base is now the reference for why each recommendation was made." },
            { date: "2026-06-11", type: "publish", note: "Both reports published by MHRA; described as one of the most comprehensive evidence bases to date on how AI is perceived, used and governed across the UK health system." },
            { date: "2026-02-02", type: "consultation", note: "Call for Evidence closed after roughly six weeks (launched 19 December 2025), attracting 760 responses from individuals and institutions." },
            { date: "2025-09-26", type: "publish", note: "MHRA launched the National Commission into the Regulation of AI in Healthcare as an independent, non-statutory advisory body, with monthly core-group meetings and recommendations due in 2026." }
          ]
        },
        {
          id: "mhra-national-ai-commission-recommendations",
          title: "National Commission into the Regulation of AI in Healthcare: Recommendations for a Future Regulatory Framework",
          url: "https://www.gov.uk/government/publications/national-commission-into-the-regulation-of-ai-in-healthcare-recommendations-for-a-future-regulatory-framework/national-commission-into-the-regulation-of-ai-in-healthcare-recommendations-for-a-future-regulatory-framework",
          type: "Commission Report",
          status: "final",
          publishedAt: "2026-09-10",
          updatedAt: "2026-10-06",
          summary: "The independent Commission's final report, after a year-long UK-wide programme involving more than 12,000 people. Central conclusion: regulation and assurance of AI in healthcare must become more proportionate, lifecycle-based and system-wide. Its 44 recommendations are grouped under three pillars: proportionate lifecycle regulation (clearer qualification and classification of AI-enabled devices, risk-tailored oversight, flexible mechanisms for rapid iteration, stronger use of real-world evidence, staged authorisations and sandboxes); system-wide responsibility for the safe management of AI once deployed; and trust, transparency and predictability for patients and innovators. The scope is AI-enabled medical devices and their use in care rather than AI used to run drug trials, but it sets the UK's direction on lifecycle evidence, change control and post-market monitoring, which sponsors deploying AI tools in UK studies will meet.",
          scores: { impact: 5, rigor: 4, foresight: 5 },
          topics: ["regulatory", "gcp", "harmonization"],
          history: [
            { date: "2026-10-06", type: "update", note: "Government response accepted all 44 recommendations. First commitments: MHRA to issue draft guidance by December 2026 on managing changes to AI-enabled devices as they adapt; consultation on qualifying and classifying AI-enabled devices starting in 2027; exploration of staged authorisation pathways; and a full implementation roadmap with timelines and owners by Spring 2027. AI Airlock Phase 3 opened for applications the same day." },
            { date: "2026-09-10", type: "publish", note: "Final recommendations published with an Easy Read version and a Welsh translation of the executive summary; a cross-government response was promised separately." }
          ]
        }
      ]
    },
    {
      id: "pmda",
      name: "PMDA — Pharmaceuticals and Medical Devices Agency (Japan)",
      short: "PMDA",
      logoText: "PMDA",
      brandColor: "#00669e",
      domain: "pmda.go.jp",
      category: "regulator",
      intro: "Japan's regulatory agency for pharmaceuticals and medical devices (working with the MHLW); advances principles-based expectations for AI/ML — emphasizing transparency, data quality and reproducibility — and data-driven, efficient clinical trials.",
      url: "https://www.pmda.go.jp/english/",
      documents: [
        {
          id: "pmda-ai-samd-report",
          title: "Report on AI-based Software as a Medical Device (SaMD)",
          url: "https://www.pmda.go.jp/files/000266099.pdf",
          type: "Science Board Report",
          status: "final",
          publishedAt: "2023-08-28",
          updatedAt: "2023-08-28",
          summary: "PMDA Science Board report setting out points-to-consider for evaluating machine-learning-based SaMD — proper development-process design, scientific and rational performance evaluation, and issues such as bias in machine learning, reuse of test data in post-market learning, and clinical information databases.",
          scores: { impact: 3, rigor: 4, foresight: 4 },
          topics: ["regulatory", "data-mgmt"],
          history: [
            { date: "2023-08-28", type: "publish", note: "Report released in Japanese and English; intended to help developers design the development process properly and perform scientific, rational performance evaluations for AI-based SaMD." }
          ]
        },
        {
          id: "pmda-clinical-trial-ecosystem",
          title: "Clinical Trial Ecosystem Introduction Promotion Project",
          url: "https://www.pmda.go.jp/files/000276746.pdf",
          type: "Initiative",
          status: "final",
          publishedAt: "2024",
          updatedAt: "2026-08",
          summary: "PMDA/MHLW initiative (started 2024, led by medical institutions) to improve clinical-trial efficiency — reducing cost and procedural burden and shortening trial start-up without compromising quality — alongside an ongoing revision of the GCP ministerial ordinance. Supports more digital, data-driven and streamlined trial conduct in Japan. Findings from the project are being fed directly into the draft GCP ordinance revision implementing ICH E6(R3).",
          scores: { impact: 3, rigor: 2, foresight: 3 },
          topics: ["rd-productivity", "recruitment", "gcp", "harmonization"],
          history: [
            { date: "2026-08", type: "update", note: "ICH E6(R3) enters phased force in Japan: new clinical trials must comply with priority provisions from August 2026, with full compliance required for all trials by August 2028 — letting ongoing studies complete under E6(R2)." },
            { date: "2026-06-11", type: "update", note: "PMDA Reliability Assurance briefing 'Clinical Trial Ecosystem x Regulatory Reform Update' held online, covering the GCP ordinance revision, Single IRB, ICH E6(R3) and the FY2026 project plan. Results of the project are shared with MHLW and used in drafting the GCP ordinance amendment." },
            { date: "2024", type: "publish", note: "Project launched with medical institutions; first-year work identified key issues (regulatory framework, procedures, costs) to be addressed, including through the GCP ordinance revision." }
          ]
        },
        {
          id: "pmda-electronic-data-ms",
          title: "New Drug Review with Electronic Study Data (Modeling & Simulation)",
          url: "https://www.pmda.go.jp/english/review-services/reviews/0002.html",
          type: "Review Framework",
          status: "final",
          publishedAt: "2023-10-01",
          updatedAt: "2024-04-08",
          summary: "PMDA's electronic study-data framework promoting data-based quantitative approaches (modeling & simulation, M&S) in review decision-making. Accumulated electronic study data and advanced analysis are used to strengthen evidence-based reviews, reduce sponsor workload and support development of new guidelines.",
          scores: { impact: 3, rigor: 3, foresight: 3 },
          topics: ["data-mgmt", "in-silico"],
          history: [
            { date: "2024-04-08", type: "update", note: "Technical Conformance Guide on Electronic Study Data Submissions updated." },
            { date: "2023-10-01", type: "publish", note: "From this application date, PMDA simplified the electronic study data explanation requirements (Forms A/B) for new drug applications." }
          ]
        },
        {
          id: "pmda-ai-guiding-principles-project-team",
          title: "Project Team for Consideration of Guiding Principles for AI Utilization",
          url: "https://www.pmda.go.jp/english/0006.html",
          type: "Project Team",
          status: "consultation",
          publishedAt: "2026-06-08",
          updatedAt: "2026-06-08",
          summary: "PMDA established a cross-office project team to develop guiding principles for the use of AI in medical products — Japan's first structured move toward horizontal AI expectations spanning drugs and devices, rather than the device-specific SaMD guidance issued to date. Listed under PMDA's 'Projects Across Multi-Offices'. Output documents are still pending, so this is a signal of direction rather than a set of requirements.",
          scores: { impact: 4, rigor: 2, foresight: 5 },
          topics: ["regulatory", "gcp", "harmonization"],
          history: [
            { date: "2026-06-08", type: "publish", note: "Project team announced on PMDA's What's New page and added to the Projects Across Multi-Offices listing; follows the January 2026 joint FDA-EMA principles and signals Japanese alignment with the emerging international direction." }
          ]
        },
        {
          id: "pmda-genai-samd-review-points",
          title: "Review Points for Software Medical Devices Using Generative AI (Draft)",
          url: "https://www.pmda.go.jp/review-services/drug-reviews/about-reviews/devices/0058.html",
          type: "Draft Review Points",
          status: "consultation",
          publishedAt: "2026-09-18",
          updatedAt: "2026-09-18",
          summary: "PMDA's first draft review framework for medical devices built on generative AI (LLMs and vision-language models that produce varied responses from free-text or voice input), issued while Japan has no review experience with such products. Its premise is that output uncertainty and variability make the conventional model — proving safety and effectiveness through pre-market evaluation alone — hard to apply, so assessment pairs pre-market review with mandatory post-market management. Pre-market, it looks at clinical usefulness, product performance at a given time and condition, stability and reproducibility across times and conditions, and confirmation that harmful outputs do not occur, with property-based testing (large volumes of auto-generated inputs to find counter-examples and statistically bound the range where required properties hold) and expert evaluation as core methods, plus a view on the place and limits of benchmark tests. Post-market, it expects periodic reporting on performance, adverse events and hallucinations, and human-factors-informed design and operation. It also addresses reliance on external foundation models, cloud services, APIs and retrieval-augmented generation. Device-focused, but the clearest regulator statement yet on how to evidence a generative-AI system whose outputs drift.",
          scores: { impact: 4, rigor: 4, foresight: 5 },
          topics: ["regulatory", "genai", "data-mgmt"],
          history: [
            { date: "2026-09-18", type: "consultation", note: "Draft (document dated 14 September 2026) published by PMDA's Review Center and opened for public comment until 17 March 2027 — a six-month window, longer than the other SaMD review-point drafts released on 1 July 2026." }
          ]
        }
      ]
    },
    {
      id: "iqvia",
      name: "IQVIA",
      short: "IQVIA",
      logoText: "IQV",
      brandColor: "#00857c",
      domain: "iqvia.com",
      category: "cro",
      intro: "A global clinical research and health-data company publishing applied white papers on AI in clinical trials.",
      url: "https://www.iqvia.com/library",
      documents: [
        {
          id: "iqvia-ai-drug-development",
          title: "Artificial Intelligence in Drug Development: Navigating Emerging Regulatory Expectations and Enhancing Clinical Trials",
          url: "https://www.iqvia.com/library/white-papers/artificial-intelligence-in-drug-development",
          type: "White Paper",
          status: "final",
          publishedAt: "2024",
          updatedAt: "2024",
          summary: "By Patrick Brady. Reviews regulatory expectations and practical adoption of AI/ML in clinical trials across participant selection/stratification, dose optimization, site selection, data management and endpoint assessment, with emphasis on compliance and risk management.",
          scores: { impact: 4, rigor: 4, foresight: 4 },
          topics: ["regulatory", "recruitment", "site-selection", "data-mgmt", "protocol-design"],
          history: [
            { date: "2024", type: "publish", note: "White paper published; mapped AI/ML use cases across the trial lifecycle and outlined regulatory considerations for sponsors (exact date to be verified)." }
          ]
        },
        {
          id: "iqvia-optimizing-genai-clinops",
          title: "Optimizing Generative AI in Clinical Operations through Focus, Restraint, and Maximized Validation",
          url: "https://www.iqvia.com/library/white-papers/optimizing-generative-ai-in-clinical-operations-through-focus-restraint-and-maximized-validation",
          type: "White Paper",
          status: "final",
          publishedAt: "2024",
          updatedAt: "2024",
          summary: "Takes a clear-eyed view of the benefits and risks of generative AI in clinical operations and proposes a focused framework (focus, restraint, maximized validation) for responsible deployment.",
          scores: { impact: 3, rigor: 3, foresight: 4 },
          topics: ["genai", "doc-authoring"],
          history: [
            { date: "2024", type: "publish", note: "White paper published; proposed a responsible-deployment framework for generative AI in clinical operations (exact date to be verified)." }
          ]
        },
        {
          id: "iqvia-promising-new-developments-ai",
          title: "Promising New Developments in Artificial Intelligence: Innovating with Generative and Agentic AI to Drive Efficiency and Quality in Clinical Trials",
          url: "https://www.iqvia.com/library/white-papers/promising-new-developments-in-artificial-intelligence",
          type: "White Paper",
          status: "final",
          publishedAt: "2025",
          updatedAt: "2026",
          summary: "By Jonas Renström and Laurence Lin. Part of a four-part series; presents generative and agentic AI use cases in clinical trials, such as scientific Q&A chatbots, data-review tools and monitoring platforms, and notes the IQVIA–NVIDIA collaboration.",
          scores: { impact: 3, rigor: 3, foresight: 5 },
          topics: ["genai", "agentic", "data-mgmt"],
          history: [
            { date: "2026", type: "update", note: "Series continued with part 2, 'Innovating with Confidence and Focus', which shifts the emphasis from use-case discovery to predictability in trial design, planning and delivery — reducing costly amendments and delays (exact date to be verified)." },
            { date: "2025", type: "publish", note: "White paper published (part 1 of a 4-part series); described a Phase III protocol Q&A chatbot and agentic automation use cases (exact date to be verified)." }
          ]
        },
        {
          id: "iqvia-agentic-ai-real-impact",
          title: "From AI Pilots to Real Impact: Transforming Life Sciences Workflows with Agentic AI",
          url: "https://www.iqvia.com/blogs/2026/05/from-ai-pilots-to-real-impact",
          type: "Blog / Point of View",
          status: "final",
          publishedAt: "2026-05",
          updatedAt: "2026-05",
          summary: "IQVIA's argument that the value of AI in clinical research now depends on moving past isolated pilots into orchestrated, embedded agents. Announces IQVIA.ai, launched at NVIDIA GTC 2026 — a unified agentic platform providing one secure access point to deploy, manage and scale AI agents across the lifecycle, combining a conversational interface with an extensible agent catalog. IQVIA states it will build and deploy hundreds of agents and is embedding agentic systems into its own trial delivery across design, start-up, conduct and close-out.",
          scores: { impact: 4, rigor: 3, foresight: 5 },
          topics: ["agentic", "genai", "scaling-roi", "data-mgmt"],
          history: [
            { date: "2026-05", type: "publish", note: "Published following the IQVIA.ai launch at NVIDIA GTC 2026; notes that as agent counts grow, orchestration and system design — not individual model quality — become the binding constraint, supported by continued IQVIA-NVIDIA collaboration on infrastructure, performance and validation." }
          ]
        },
        {
          id: "iqvia-tmf-agentification",
          title: "Reshaping Clinical Trial Workflows: Agentification of TMFs",
          url: "https://www.iqvia.com/library/insight-brief/reshaping-clinical-trial-workflows-agentification-of-tmfs",
          type: "Insight Brief",
          status: "final",
          publishedAt: "2026-05-13",
          updatedAt: "2026-05-13",
          summary: "How agentic AI plus 'experts-in-the-loop' turns the Trial Master File from a manual, resource-intensive repository into an insight-generating asset — automating document ingestion, classification, quality control and compliance monitoring while preserving regulatory oversight and inspection readiness. Claimed effects: fewer errors, better TMF recency, and faster study start-up and site activation.",
          scores: { impact: 3, rigor: 3, foresight: 4 },
          topics: ["agentic", "doc-authoring", "data-mgmt", "gcp"],
          history: [
            { date: "2026-05-13", type: "publish", note: "Insight brief published; describes an open-architecture approach that integrates with sponsor environments rather than requiring migration." }
          ]
        },
        {
          id: "iqvia-unified-data-ecosystem",
          title: "Simpler, Faster and More Robust: Emergence of the Unified Cross-Functional Data Ecosystem",
          url: "https://www.iqvia.com/library/white-papers/simpler-faster-and-more-robust",
          type: "White Paper",
          status: "final",
          publishedAt: "2026",
          updatedAt: "2026",
          summary: "Makes the case that generative and agentic AI only pay off on top of a unified, cross-functional clinical data ecosystem. Covers embedding AI directly into data-management tools, digitized protocols, centralized standards repositories and continuous data refreshes as the means to break functional silos and give sponsors greater transparency, speed, quality and control over endpoints. Exact publication date to be verified.",
          scores: { impact: 3, rigor: 3, foresight: 4 },
          topics: ["data-mgmt", "agentic", "genai", "protocol-design", "scaling-roi"],
          history: [
            { date: "2026", type: "publish", note: "White paper published; positions standardized, continuously refreshed data as the precondition for AI-driven risk management and sponsor oversight (exact date to be verified)." }
          ]
        },
        {
          id: "iqvia-predictive-clinical-development",
          title: "IQVIA Predictive Clinical Development — AI-Powered, Agentic Approach to Clinical Development",
          url: "https://www.iqvia.com/newsroom/2026/09/iqvia-predictive-clinical-development-provides-sponsors-with-significant-efficiencies",
          type: "Press Release",
          status: "final",
          publishedAt: "2026-09-03",
          updatedAt: "2026-09-03",
          summary: "IQVIA's launch of an AI-powered approach to clinical development that it says can bring therapies to patients up to two years faster by removing avoidable delays across the lifecycle. Claimed results: 33% faster study start-up; 1.7 times more patients recruited from AI-prioritised and Prime & Partner sites, with 42% higher enrollment rates; 50% faster data cleaning; and more than 45% less time between trial phases. It combines IQVIA's proprietary data, regulatory expertise and Healthcare-grade AI with technology from Anthropic, AWS, Databricks, Microsoft, NVIDIA, Palantir and Snowflake, orchestrated into agentic workflows. A commercial announcement: the figures are vendor-reported and not independently validated, but they show a large CRO now selling agent orchestration across the whole trial rather than point tools.",
          scores: { impact: 4, rigor: 2, foresight: 4 },
          topics: ["agentic", "site-selection", "recruitment", "data-mgmt", "rd-productivity", "scaling-roi"],
          history: [
            { date: "2026-09-03", type: "publish", note: "Announced by IQVIA (Research Triangle Park, NC); framed by Richard Staub, president of Research and Development Solutions, as making development faster, more predictable and of higher quality." }
          ]
        },
        {
          id: "iqvia-life-science-models",
          title: "IQVIA Life Science Models — Purpose-Built Models for Clinical Outcome Prediction",
          url: "https://www.iqvia.com/newsroom/2026/10/iqvia-launches-iqvia-life-science-models-to-help-life-sciences-companies",
          type: "Press Release",
          status: "final",
          publishedAt: "2026-10-07",
          updatedAt: "2026-10-07",
          summary: "At TechIQ 2026 IQVIA launched IQVIA Life Science Models — a suite of purpose-built models combining proprietary expert content, domain knowledge and regulatory/compliance/privacy frameworks, built with NVIDIA Nemotron and AWS infrastructure. Capabilities highlighted for clinical development include study simulation and protocol optimisation (endpoints, eligibility, dose, sample size), digital twins and synthetic controls, and feeding trial predictions into real-world planning. IQVIA reports that in initial evaluation across 50 trials and 270 endpoints, 85% of predictions were on target or clinically close — vendor-reported, not independently validated. Extends the September Predictive Clinical Development launch by productising the underlying models sponsors can use to 'run the trial before running the trial.'",
          scores: { impact: 4, rigor: 2, foresight: 4 },
          topics: ["agentic", "in-silico", "protocol-design", "rd-productivity", "scaling-roi"],
          history: [
            { date: "2026-10-07", type: "publish", note: "Announced at TechIQ 2026; Pete Groves (EVP, AI & Technology Solutions) quoted on anticipating outcomes and increasing trial success." }
          ]
        }
      ]
    },
    {
      id: "cluepoints",
      name: "CluePoints",
      short: "CluePoints",
      logoText: "CLP",
      brandColor: "#e5007d",
      domain: "cluepoints.com",
      category: "cro",
      intro: "A Belgian-US clinical trial software company in risk-based quality management and central statistical monitoring. Most of its published output concerns classical statistics rather than AI, so it is represented here narrowly: only where it applies machine learning or NLP to trial data oversight, or where a regulator has tested those analytics directly.",
      url: "https://cluepoints.com/resources/insights/research-thoughts/",
      documents: [
        {
          id: "cluepoints-centralized-monitoring-explainer",
          title: "Centralized Monitoring in Clinical Trials: Everything You Should Know",
          url: "https://cluepoints.com/centralized-monitoring-in-clinical-trials-everything-you-should-know/",
          type: "Blog / Point of View",
          status: "final",
          publishedAt: "2024-04-16",
          updatedAt: "2024-04-16",
          summary: "Retained here for two AI-specific findings inside an otherwise statistical explainer. First, a machine-learning result CluePoints ran on its own process: NLP and deep learning applied retrospectively to risk-signal free text found 40% of signals inadequately documented, falling to 30% after the algorithm was deployed — a 25% relative improvement, and a rare published figure on AI auditing the quality of human oversight work rather than the trial data itself. Second, it records that FDA has tested CluePoints' SMART software under a Cooperative Research and Development Agreement, running advanced analytics over minimally processed SDTM data to flag anomalous sites — a regulator putting these analytics through its own hands. Read the rest with the distinction in view: the three pillars it describes — statistical data monitoring, key risk indicators and quality tolerance limits, with a Data Inconsistency Score threshold of 1.3 — are classical statistics, not AI, and CluePoints does not claim otherwise. It also cites the third-party TransCelerate analysis of more than 1,100 trials finding only 3.7% of EDC data is corrected after initial site entry and just 1.1% as a result of source data verification, still the strongest published argument against 100% SDV. Every figure except the TransCelerate ones is CluePoints' own, and the piece closes on a contact-us prompt.",
          scores: { impact: 3, rigor: 3, foresight: 3 },
          topics: ["data-mgmt", "gcp", "regulatory"],
          history: [
            { date: "2024-04-16", type: "publish", note: "Published as a referenced long-form blog with five numbered citations to ICH E6(R2), the two de Viron TIRS papers, the TransCelerate SDV evaluation and Steve Young's December 2023 Applied Clinical Trials piece on using machine learning and NLP to improve central monitoring documentation." }
          ]
        }
      ]
    },
    {
      id: "zs",
      name: "ZS Associates",
      short: "ZS",
      logoText: "ZS",
      brandColor: "#c8102e",
      domain: "zs.com",
      category: "consultancy",
      intro: "A management consulting and analytics firm focused on commercial and clinical AI in life sciences.",
      url: "https://www.zs.com/insights",
      documents: [
        {
          id: "zs-ai-clinical-development-6-investments",
          title: "AI in Clinical Development: 6 Investments Leaders Need to Make Now",
          url: "https://www.zs.com/insights/ai-in-clinical-development-6-investments-pharma-zs",
          type: "Article",
          status: "final",
          publishedAt: "2024",
          updatedAt: "2026",
          summary: "Frames clinical development as a system of decisions and recommends six AI investments: scale AI document authoring, persona-based protocol simulation, predictive trial/portfolio performance, clinical next-best-action, AI-guided data submission, and in silico modeling.",
          scores: { impact: 4, rigor: 3, foresight: 5 },
          topics: ["genai", "doc-authoring", "protocol-design", "site-selection", "in-silico", "data-mgmt", "agentic"],
          history: [
            { date: "2026", type: "update", note: "Reframed around orchestration and agentic AI (now also titled 'AI is transforming clinical development and trial design'): the six investments are presented as one connected system in which AI continuously senses, predicts and guides action from protocol design through submission. Protocol design is recast as multi-agent simulation, where clinical, statistical, regulatory and patient-perspective agents simultaneously critique endpoints, eligibility criteria and feasibility (exact date to be verified)." },
            { date: "2024", type: "publish", note: "Article published; laid out six priority AI investments for clinical development leaders (exact date to be verified)." }
          ]
        },
        {
          id: "zs-future-clinical-development-disruption",
          title: "The Future of Clinical Development: Opportunities for Disruption",
          url: "https://medium.com/zs-associates/the-future-of-clinical-development-opportunities-for-disruption-3711733ec9b5",
          type: "Article",
          status: "final",
          publishedAt: "2024-04-08",
          updatedAt: "2024-04-08",
          summary: "By Sowmyanarayan Srinivasan. From protocol design to database lock, examines where generative AI can transform clinical development — document generation, standards mapping, anomaly detection and statistical analysis.",
          scores: { impact: 3, rigor: 3, foresight: 4 },
          topics: ["genai", "doc-authoring", "data-mgmt"],
          history: [
            { date: "2024-04-08", type: "publish", note: "Article published; deep-dived into disruption opportunities across the clinical value chain and the role of generative AI." }
          ]
        },
        {
          id: "zs-in-silico-true-value",
          title: "Reimagining Clinical Trials with In Silico and AI-driven Methods",
          url: "https://www.zs.com/insights/true-value-potential-in-silico-clinical-development",
          type: "Article",
          status: "final",
          publishedAt: "2026",
          updatedAt: "2026",
          summary: "The most concrete quantification yet of the in silico opportunity: ZS investigations and meta-analyses estimate that digital twins, trial-design simulation and broader model-informed drug development could eventually cut clinical trial development costs by as much as 60% and shorten cycle times by up to 40% as models mature and regulatory comfort grows. Covers digital twins shrinking control arms, AI-assisted recruitment, protocol optimization and site selection, and references ZS's Trials.AI platform. Exact publication date to be verified.",
          scores: { impact: 4, rigor: 4, foresight: 5 },
          topics: ["in-silico", "protocol-design", "recruitment", "site-selection", "rd-productivity"],
          history: [
            { date: "2026", type: "publish", note: "Article published; argues the 'what' of in silico development is now settled by multimodal data, agentic AI, digital twins and growing regulatory acceptance of non-traditional evidence — the open questions are the 'how' and 'how much' (exact date to be verified)." }
          ]
        },
        {
          id: "zs-future-drug-development-digital-twins",
          title: "AI, Digital Twins and Data: The Future of Drug Development",
          url: "https://www.zs.com/insights/future-of-drug-development-ai-digital-twins-data",
          type: "Article",
          status: "final",
          publishedAt: "2026",
          updatedAt: "2026",
          summary: "ZS's forward view of an AI-powered clinical development model. Two concepts anchor it: 'R&D Mission Control', a real-time command centre where specialized agents optimize pipeline strategy, resource allocation and risk management instead of fragmented reactive firefighting; and the 'In Silico Slingshot', an agent-of-agents model in which each agent advocates for one core trial-design priority and virtual patients simulate outcomes to align the protocol across scientific, operational and regulatory needs. Frames the shift from episodic trials to continuous, connected journeys. Exact publication date to be verified.",
          scores: { impact: 3, rigor: 3, foresight: 5 },
          topics: ["agentic", "in-silico", "protocol-design", "data-mgmt"],
          history: [
            { date: "2026", type: "publish", note: "Article published; argues agentic AI and LLMs make it feasible not only to automate labour-intensive processes but to attack problems previously considered intractable in trial design (exact date to be verified)." }
          ]
        },
        {
          id: "zs-drug-development-structural-shifts",
          title: "Drug Development: Structural Shifts Reshaping R&D",
          url: "https://www.zs.com/insights/drug-development-transformation-industry-trends-pharma-r-and-d",
          type: "Article",
          status: "final",
          publishedAt: "2026",
          updatedAt: "2026",
          summary: "Findings from six ZS R&D Leaders Exchange roundtables in 2026 with leaders from more than 20 biopharma companies across regulatory, technology, clinical innovation, clinical operations and biostatistics. Core diagnosis: R&D has become more technologically capable but not more connected — AI programmes worth more than USD 180 million a year and clinical activities shortened by up to four months exist, yet development costs and timelines barely move because gains stay isolated inside an operating model built for a simpler era. Five observations: science is outpacing the operating model; operations are straining under scientific complexity; AI is moving beyond pilots but scaling remains hard; leverage moves upstream, so in silico methods and digital twins should test population, endpoint, dose, feasibility and patient-burden assumptions before a protocol is fixed; and mission-control oversight with connected data improves development economics. Recommends simplifying workflows before automating them, embedding governance, and scaling AI through one coordinated transformation portfolio. Exact publication date to be verified.",
          scores: { impact: 3, rigor: 3, foresight: 4 },
          topics: ["scaling-roi", "in-silico", "protocol-design", "rd-productivity", "agentic"],
          history: [
            { date: "2026", type: "publish", note: "Article published; cites the joint EMA-FDA good AI practice principles and FDA's real-time clinical trials initiative as evidence that regulators are now enabling, not just tolerating, AI in development (exact date to be verified)." }
          ]
        }
      ]
    },
    {
      id: "mckinsey",
      name: "McKinsey & Company",
      short: "McKinsey",
      logoText: "McK",
      brandColor: "#051c2c",
      domain: "mckinsey.com",
      category: "consultancy",
      intro: "A global management consultancy; its QuantumBlack AI arm quantifies AI's value across clinical development.",
      url: "https://www.mckinsey.com/industries/life-sciences/our-insights",
      documents: [
        {
          id: "mck-ai-power-clinical-development",
          title: "How Artificial Intelligence Can Power Clinical Development",
          url: "https://www.mckinsey.com/industries/life-sciences/our-insights/how-artificial-intelligence-can-power-clinical-development",
          type: "Article",
          status: "final",
          publishedAt: "2023-11-22",
          updatedAt: "2023-11-22",
          summary: "Estimates generative AI could create $13–25B of annual value in clinical development; argues advances in scientific AI make it time to design more precise, efficient trials with higher success rates.",
          scores: { impact: 5, rigor: 4, foresight: 5 },
          topics: ["rd-productivity", "protocol-design"],
          history: [
            { date: "2023-11-22", type: "publish", note: "Article published; quantified the $13–25B value opportunity and outlined how AI can improve trial precision and success rates." }
          ]
        },
        {
          id: "mck-peak-operational-performance",
          title: "Unlocking Peak Operational Performance in Clinical Development with Artificial Intelligence",
          url: "https://www.mckinsey.com/industries/life-sciences/our-insights/unlocking-peak-operational-performance-in-clinical-development-with-artificial-intelligence",
          type: "Article",
          status: "final",
          publishedAt: "2024",
          updatedAt: "2024",
          summary: "Presents three lighthouse use cases where AI/ML plus generative AI drive operational performance: optimal site selection, 10–20% enrollment uplift and auto-drafting of trial documents; on average ~6 months of timeline compression per asset.",
          scores: { impact: 4, rigor: 4, foresight: 4 },
          topics: ["site-selection", "recruitment", "doc-authoring", "rd-productivity"],
          history: [
            { date: "2024", type: "publish", note: "Article published; reported up to 50% process-cost reduction on auto-drafting and 12+ months of acceleration via optimized site selection (exact date to be verified)." }
          ]
        },
        {
          id: "mck-merck-clinical-authoring",
          title: "With Gen AI, Merck and McKinsey Transform Clinical Authoring",
          url: "https://www.mckinsey.com/about-us/new-at-mckinsey-blog/with-gen-ai-merck-and-mckinsey-transform-clinical-authoring",
          type: "Case Study / Blog",
          status: "final",
          publishedAt: "2024",
          updatedAt: "2024",
          summary: "McKinsey (QuantumBlack) and Merck co-developed a clinical study report (CSR) authoring platform, cutting CSR first-draft time from 2–3 weeks to 3–4 days while improving accuracy across 14 required CSR sections.",
          scores: { impact: 4, rigor: 4, foresight: 4 },
          topics: ["doc-authoring", "genai"],
          history: [
            { date: "2024", type: "publish", note: "Blog published; detailed a gen-AI CSR authoring platform generating a high-quality first draft in ~5 minutes for high-volume therapeutic areas (exact date to be verified)." }
          ]
        },
        {
          id: "mck-agentic-ai-life-sciences",
          title: "Reimagining Life Science Enterprises with Agentic AI",
          url: "https://www.mckinsey.com/industries/life-sciences/our-insights/reimagining-life-science-enterprises-with-agentic-ai",
          type: "Article",
          status: "final",
          publishedAt: "2025",
          updatedAt: "2026-01",
          summary: "Explores how agentic AI reshapes life-science enterprises; expects a 35–45% productivity boost in clinical development over five years, illustrated by multi-agent collaboration in trial design (benchmarking, literature-explorer, optimizer and document-generation agents).",
          scores: { impact: 4, rigor: 3, foresight: 5 },
          topics: ["agentic", "protocol-design", "doc-authoring", "scaling-roi"],
          history: [
            { date: "2026-01", type: "update", note: "Featured in the January 2026 issue of McKinsey on Life Sciences with sharper numbers: 75-85% of pharma workflows contain tasks that agents can automate or augment, potentially freeing 25-40% of enterprise capacity, and compressing regulatory filing timelines from months to weeks could unlock roughly USD 180 million in NPV for a priority asset. Also names the paradox — close to 80% of companies are experimenting with gen AI while about 80% report no tangible bottom-line benefit — and prescribes a platform-driven approach integrated with existing systems." },
            { date: "2025", type: "publish", note: "Article published; described human-supervised multi-agent trial design enabling ~50% faster design with 25% fewer amendments (exact date to be verified)." }
          ]
        },
        {
          id: "mck-linear-gates-to-learning-loops",
          title: "From Linear Gates to Learning Loops: Rewiring Biopharma R&D with AI",
          url: "https://www.mckinsey.com/industries/life-sciences/our-insights/from-linear-gates-to-learning-loops-rewiring-biopharma-r-and-d-with-ai",
          type: "Report",
          status: "final",
          publishedAt: "2026-07",
          updatedAt: "2026-07",
          summary: "McKinsey's most pointed argument to date: applying AI to today's stage-gate R&D operating model makes individual steps faster but never compounds learning. The proposed alternative is a closed-loop model organized around five connected decision points — understanding patients and disease biology, identifying and validating targets, discovering and optimizing candidates, designing and executing trials, and maximizing the impact of approved therapies — where every pivotal decision generates data that informs the next and refines the one before it. For clinical development specifically, the loop combines predictive models for patient selection and trial design, integration of trial and real-world data, and agentic systems to orchestrate operations, including models that predict control-arm performance and screen draft submissions against prior agency feedback.",
          scores: { impact: 5, rigor: 4, foresight: 5 },
          topics: ["agentic", "protocol-design", "data-mgmt", "rd-productivity", "scaling-roi", "in-silico"],
          history: [
            { date: "2026-07", type: "publish", note: "Report published. Its central warning is organizational rather than technical: the change required to close R&D decision loops is routinely underestimated, and leaders must redesign workflows so that AI informs decisions rather than merely augmenting them. Recommends building a blueprint across all five decision points, then sequencing early wins against it." }
          ]
        },
        {
          id: "mck-ai-drug-discovery-what-matters-most",
          title: "AI Drug Discovery: Focusing on What Matters Most",
          url: "https://www.mckinsey.com/industries/life-sciences/our-insights/ai-drug-discovery-focusing-on-what-matters-most",
          type: "Article",
          status: "final",
          publishedAt: "2026-09-21",
          updatedAt: "2026-09-21",
          summary: "By Alex Devereson, Erika Stanzl and Guang Yang, with Alex Peluffo, Alex Zhao, Mai Wang and Xin Wang. Maps AI maturity across the research value chain and argues investment has piled into molecule design — the stage with the most structured data and fastest assay feedback — while the binding constraint is identifying and validating the right disease mechanism. Evidence: 14 of the 15 largest pharma AI deals since 2023 sit in hit-to-lead; 2025 partnerships carried about USD 29.5 billion in headline value but only about USD 600 million upfront, and under 1% of milestone value from 2023-2024 deals had been paid by June 2026; AI drug-discovery funding reached USD 8.4 billion in 2025, roughly double 2023. Nine selected AI-enabled programmes reached preclinical or first-in-human milestones 15-80% faster than large-pharma medians, though the sample favours successful, well-publicised programmes. For clinical development, the point is that roughly 25% of Phase II/III failures originate in preclinical translation; McKinsey urges investing in preclinical-to-clinical data linkage and in generating proprietary perturbation and clinical data, warning that jumping from target ID straight to generative chemistry accelerates assets toward predictable downstream failure. Exact URL to be verified (mckinsey.com could not be reached from the reconciliation environment).",
          scores: { impact: 4, rigor: 4, foresight: 4 },
          topics: ["drug-discovery-success", "rd-productivity", "scaling-roi", "data-mgmt"],
          history: [
            { date: "2026-09-21", type: "publish", note: "Article published in McKinsey's Life Sciences insights; widely discussed for its contrast between faster discovery timelines and unchanged clinical attrition, a theme the authors reiterated in investor coverage in early October 2026." }
          ]
        }
      ]
    },
    {
      id: "bcg",
      name: "Boston Consulting Group (BCG)",
      short: "BCG",
      logoText: "BCG",
      brandColor: "#177b57",
      domain: "bcg.com",
      category: "consultancy",
      intro: "A global strategy consultancy analyzing generative-AI value and the clinical performance of AI-discovered drugs.",
      url: "https://www.bcg.com/industries/biopharmaceuticals",
      documents: [
        {
          id: "bcg-biopharma-path-genai",
          title: "Biopharma's Path to Value with Generative AI",
          url: "https://www.bcg.com/publications/2023/biopharma-path-to-value-with-generative-ai",
          type: "Article",
          status: "final",
          publishedAt: "2023",
          updatedAt: "2023",
          summary: "Catalogs 130+ generative-AI use cases across the biopharma value chain; in clinical development, gen AI can cut medical-writing time by up to 30% and improve trial design and performance via simulation.",
          scores: { impact: 4, rigor: 3, foresight: 5 },
          topics: ["genai", "doc-authoring", "protocol-design", "rd-productivity"],
          history: [
            { date: "2023", type: "publish", note: "Article published; catalogued 130+ gen-AI use cases and quantified up to 30% medical-writing time reduction (exact date to be verified)." }
          ]
        },
        {
          id: "bcg-ai-discovered-drugs-success",
          title: "How Successful Are AI-Discovered Drugs in Clinical Trials?",
          url: "https://www.bcg.com/publications/2024/how-successful-are-ai-discovered-drugs-in-clinical-trials",
          type: "Research Article",
          status: "final",
          publishedAt: "2024-06-06",
          updatedAt: "2026-05",
          summary: "First analysis of AI-native biotech pipelines: AI-discovered molecules show an 80–90% Phase I success rate (vs. ~60% historic average) and ~40% in Phase II (limited sample). BCG has continued tracking the cohort since, and 2026 is the first year in which a meaningful number of these molecules reach Phase III.",
          scores: { impact: 5, rigor: 5, foresight: 4 },
          topics: ["drug-discovery-success", "rd-productivity"],
          history: [
            { date: "2026-05", type: "update", note: "Tracking update reported via third-party coverage of BCG's ongoing analysis (to be verified against a BCG publication): more than 75 AI-designed molecules are now in active human trials, roughly 24 in Phase II and at least three at Phase III or pivotal design. Phase I success holds at 80-90% while Phase II stays near the industry-normal 40%, so end-to-end probability of reaching market roughly doubles — from about 5-10% to 9-18%. The sober reading BCG itself stresses: the gains are banked in the cheapest stage, since a Phase I study averages ~USD 4 million against ~USD 13 million for Phase II and USD 20 million or far more for Phase III." },
            { date: "2024-06-06", type: "publish", note: "Article published (also in Drug Discovery Today); analyzed 75 AI-generated candidates since 2015 and reported 80–90% Phase I success with caveats on sample size and AI-native scope." }
          ]
        }
      ]
    },
    {
      id: "deloitte",
      name: "Deloitte",
      short: "Deloitte",
      logoText: "DEL",
      brandColor: "#86bc25",
      domain: "deloitte.com",
      category: "consultancy",
      intro: "A global professional-services firm reporting on AI-enabled pharma R&D productivity and returns.",
      url: "https://www.deloitte.com/us/en/industries/life-sciences-health-care.html",
      documents: [
        {
          id: "deloitte-genai-clinical-trials",
          title: "Generative AI in Clinical Trials: Revolutionizing Drug Development",
          url: "https://www.deloitte.com/us/en/industries/life-sciences-health-care/articles/ai-revolutionizing-drug-research-development.html",
          type: "Article",
          status: "final",
          publishedAt: "2024",
          updatedAt: "2024",
          summary: "Describes generative AI across trial stages: accelerating study start-up, automating document generation and regulatory submissions, and boosting patient engagement/retention to cut cycle time and cost.",
          scores: { impact: 3, rigor: 3, foresight: 4 },
          topics: ["genai", "doc-authoring", "recruitment", "rd-productivity"],
          history: [
            { date: "2024", type: "publish", note: "Article published; highlighted gen-AI use cases such as automated study start-up documents and personalized patient outreach (exact date to be verified)." }
          ]
        },
        {
          id: "deloitte-convergence-ai-human-rd",
          title: "The Convergence of AI Technologies and Human Expertise in Pharma R&D",
          url: "https://www.deloitte.com/us/en/Industries/life-sciences-health-care/research/the-convergence-of-ai-technologies-and-human-expertise-in-pharma-r-and-d.html",
          type: "Research Report",
          status: "final",
          publishedAt: "2024",
          updatedAt: "2024",
          summary: "Analyzes how AI plus human expertise accelerates pharma R&D: hybrid trials, data-driven optimization, DCT value, and higher Phase I success rates for AI-discovered drugs (21 of 24 successful as of Dec 2023).",
          scores: { impact: 4, rigor: 4, foresight: 4 },
          topics: ["rd-productivity", "digital-endpoints", "drug-discovery-success"],
          history: [
            { date: "2024", type: "publish", note: "Research report published; cited 80–90% Phase I success for AI-discovered molecules and DCT value uplift for sponsors (exact date to be verified)." }
          ]
        },
        {
          id: "deloitte-measuring-return-2024",
          title: "Measuring the Return from Pharmaceutical Innovation 2024: Unleash AI's Potential",
          url: "https://www.deloitte.com/us/en/industries/life-sciences-health-care/research/measuring-the-return-from-pharmaceutical-innovation.html",
          type: "Annual Report",
          status: "final",
          publishedAt: "2024",
          updatedAt: "2024",
          summary: "14th edition of Deloitte's 'return from pharmaceutical innovation' series, themed on unleashing AI to improve R&D productivity, including compressed study timelines and a revitalized clinical trial experience.",
          scores: { impact: 4, rigor: 4, foresight: 4 },
          topics: ["rd-productivity"],
          history: [
            { date: "2024", type: "publish", note: "Annual report published; analyzed biopharma R&D returns with AI as the central lever for productivity (exact date to be verified)." }
          ]
        },
        {
          id: "deloitte-measuring-return-2026",
          title: "Navigating the GLP-1 Boom: Measuring the Return from Pharmaceutical Innovation (16th Edition)",
          url: "https://www.deloitte.com/global/en/industries/life-sciences-health-care/perspectives/navigating-the-glp-boom.html",
          type: "Annual Report",
          status: "final",
          publishedAt: "2026-05-04",
          updatedAt: "2026-05-04",
          summary: "The 16th edition of Deloitte's R&D productivity series, and the most sobering read on AI's return so far. Projected IRR on late-stage pipelines rose for a third consecutive year to 7.0% in 2025 (from 5.9% in 2024), but the recovery is concentrated: GLP-1 assets account for ~38% of projected commercial inflows and excluding that class IRR falls to 2.9%. For the first time in 16 years obesity displaced oncology as the largest contributor to late-stage pipeline value. On AI, Deloitte's verdict is blunt — R&D costs continue to rise and the promise that AI would significantly cut development time and cost has not been realized at scale, largely because adoption has been pilot-driven and function-by-function. Their prescription: move from isolated projects to end-to-end operational integration and demand measurable productivity returns.",
          scores: { impact: 5, rigor: 5, foresight: 4 },
          topics: ["rd-productivity", "scaling-roi"],
          history: [
            { date: "2026-05-04", type: "publish", note: "Report published (Deloitte US and Deloitte UK collaboration, tracking the top 20 companies by 2020 R&D spend). Median IRR stayed roughly flat (3.8% in 2024, 4.x% in 2025) while the mean was lifted by a handful of mega-value assets — the reason Deloitte frames the industry as being at an inflection point with concentration risk rather than in a broad productivity recovery." }
          ]
        }
      ]
    },
    {
      id: "accenture",
      name: "Accenture",
      short: "Accenture",
      logoText: "ACN",
      brandColor: "#a100ff",
      domain: "accenture.com",
      category: "consultancy",
      intro: "A global technology and consulting firm advising on reinventing life-sciences R&D with generative AI.",
      url: "https://www.accenture.com/us-en/industries/life-sciences-index",
      documents: [
        {
          id: "accenture-reinventing-life-sciences-genai",
          title: "Reinventing Life Sciences in the Age of Generative AI",
          url: "https://www.accenture.com/us-en/insights/life-sciences/reinventing-life-sciences-age-generative-ai",
          type: "Report",
          status: "final",
          publishedAt: "2024-08-30",
          updatedAt: "2024-08-30",
          summary: "Lays out five must-do actions to reinvent life sciences with generative AI; notes protocol optimization and better patient selection can save ~1.5 years during the clinical trial period.",
          scores: { impact: 4, rigor: 4, foresight: 4 },
          topics: ["genai", "protocol-design", "recruitment", "rd-productivity"],
          history: [
            { date: "2024-08-30", type: "publish", note: "Report published; drew on 1,000+ gen-AI pilots and CEO research to define five reinvention imperatives, with clinical-trial time savings quantified." }
          ]
        },
        {
          id: "accenture-reinventing-rd-age-of-ai",
          title: "Unparalleled Possibilities: Biopharmaceutical R&D Reinvented (Reinventing R&D in the Age of AI)",
          url: "https://www.accenture.com/content/dam/accenture/final/accenture-com/document-2/Reinventing-RandD-In-The-Age-Of-AI-Report.pdf",
          type: "Report",
          status: "final",
          publishedAt: "2024",
          updatedAt: "2024",
          summary: "Examines how AI/generative AI and next-gen computing reinvent biopharma R&D — data fabrics, synthetic data and multimodal (voice/video/text) analysis of lab and clinical trial data.",
          scores: { impact: 3, rigor: 3, foresight: 4 },
          topics: ["genai", "data-mgmt", "rd-productivity"],
          history: [
            { date: "2024", type: "publish", note: "Report published; positioned technology-enabled outcomes as the top biopharma CEO priority and detailed data-fabric and synthetic-data strategies (exact date to be verified)." }
          ]
        },
        {
          id: "accenture-ryght-ai-investment",
          title: "Accenture Invests in Ryght AI to Transform Clinical Research with Agentic AI",
          url: "https://newsroom.accenture.com/news/2025/accenture-invests-in-ryght-ai-to-help-life-sciences-companies-transform-clinical-research-with-agentic-ai",
          type: "Strategic Investment",
          status: "final",
          publishedAt: "2025-12-11",
          updatedAt: "2025-12-11",
          summary: "Accenture Ventures invested in Ryght AI to combine agentic AI with enterprise technology across the three steps Accenture calls the most crucial in drug development: trial feasibility, site selection and patient recruitment. Ryght's platform is built on 'AI Site Twins' — dynamic digital replicas of clinical research sites worldwide, incorporating historical performance, patient demographics, regulatory considerations and real-time operational data — used to improve enrollment forecasting and streamline site activation. A useful marker of how consultancy AI advice is turning into deployed capability rather than a framework.",
          scores: { impact: 3, rigor: 3, foresight: 4 },
          topics: ["agentic", "site-selection", "recruitment", "digital-endpoints"],
          history: [
            { date: "2025-12-11", type: "publish", note: "Investment announced. Accenture's global life sciences lead framed generative and agentic AI as transforming the foundation of clinical research; the collaboration targets feasibility, site selection and recruitment specifically rather than general-purpose AI adoption." }
          ]
        },
        {
          id: "accenture-2026-outlook",
          title: "2025 Highlights, Powering the Path to 2026 — Life Sciences Outlook",
          url: "https://www.accenture.com/content/dam/accenture/final/accenture-com/document-4/2025-Highlights-Powering-The-Path-To-2026-Transcript.pdf",
          type: "Outlook / Discussion",
          status: "final",
          publishedAt: "2026",
          updatedAt: "2026",
          summary: "Accenture's life sciences leadership look back at 2025 and forward to 2026, marking the transition from generative AI going mainstream to the rise of agentic AI, with AI and agents moving 'from augmentation to a foundation for reinvention' across R&D, supply chain and operations. Includes a blunt reality check: only about one in five companies have scaled AI successfully and fewer still see significant returns, with the winners treating data and platforms as core infrastructure rather than side projects. Exact publication date to be verified.",
          scores: { impact: 3, rigor: 2, foresight: 4 },
          topics: ["agentic", "genai", "scaling-roi", "rd-productivity"],
          history: [
            { date: "2026", type: "publish", note: "Published as a transcript of Accenture's life sciences year-ahead discussion; also flags a wave of clinical development readouts and launches in advanced modalities (cell and gene therapy, mRNA, ADCs) for the coming year (exact date to be verified)." }
          ]
        }
      ]
    },
    {
      id: "transcelerate",
      name: "TransCelerate BioPharma",
      short: "TransCelerate",
      logoText: "TC",
      brandColor: "#4a9e5c",
      domain: "transceleratebiopharmainc.com",
      category: "consortium",
      intro: "A non-profit consortium of biopharmaceutical companies developing collaborative, industry-wide solutions to modernize clinical trials and pharmacovigilance, including the responsible use of AI/ML.",
      url: "https://www.transceleratebiopharmainc.com",
      documents: [
        {
          id: "tc-fda-aiml-public-comment",
          title: "Industry Response to the FDA on Using AI & ML in the Development of Drug and Biological Products",
          url: "https://www.transceleratebiopharmainc.com/assets/intelligent-automation-opportunities-pharmacovigilance-solutions/",
          type: "Public Comment",
          status: "final",
          publishedAt: "2023",
          updatedAt: "2023",
          summary: "TransCelerate's industry response to the FDA's 2023 call for public comments on AI/ML in drug development, aiming to help shape a workable regulatory landscape and bridge technical innovation with Health Authority expectations.",
          scores: { impact: 3, rigor: 3, foresight: 3 },
          topics: ["regulatory", "gcp"],
          history: [
            { date: "2023", type: "publish", note: "Submitted industry comments to the FDA on AI/ML use in drug development, contributing a cross-company perspective to the emerging regulatory framework." }
          ]
        },
        {
          id: "tc-digital-data-flow",
          title: "Digital Data Flow (DDF) Initiative — Digitalizing Clinical Protocol Information",
          url: "https://www.transceleratebiopharmainc.com/scope-summit-2024-modernizing-and-personalizing-clinical-trials/",
          type: "Initiative",
          status: "final",
          publishedAt: "2024",
          updatedAt: "2026-06",
          summary: "Initiative to move protocol creation beyond a document-based paradigm toward a digital, machine-readable protocol with automated data flow and interoperability between systems — a foundation for AI-assisted study build and authoring. Built on the Unified Study Definitions Model (USDM), developed with CDISC, and aimed at the roughly four-month lag between protocol approval and study start-up.",
          scores: { impact: 4, rigor: 3, foresight: 4 },
          topics: ["doc-authoring", "data-mgmt", "protocol-design", "harmonization"],
          history: [
            { date: "2026-06", type: "update", note: "At the DIA 2026 Global Annual Meeting TransCelerate ran a workshop on using AI together with USDM to attack start-up and protocol-development inefficiencies, and a session on how ICH M11, AI and digital transformation are reshaping regulatory science. TransCelerate leaders describe digital protocols as being 'at an inflection point', and the 2026 priority is explicitly enabling digital protocols for regulatory use. TransCelerate also received a DIA Global Inspire Award." },
            { date: "2024", type: "publish", note: "Presented at SCOPE Summit 2024; advanced the digital-protocol paradigm enabling automated data flow and pharma-to-healthcare interoperability (exact date to be verified)." }
          ]
        },
        {
          id: "tc-redesigning-trials-ai",
          title: "Redesigning Clinical Trials Using Artificial Intelligence",
          url: "https://www.transceleratebiopharmainc.com/redesigning-clinical-trials-using-artificial-intelligence/",
          type: "Article",
          status: "final",
          publishedAt: "2025",
          updatedAt: "2025",
          summary: "By Rob DiCicco. Argues that AI adoption in trials is cautious and shaped by trust and governance concerns, but is methodically reshaping how trials are designed, executed and scaled to reduce patient burden, improve data quality and accelerate development.",
          scores: { impact: 3, rigor: 3, foresight: 4 },
          topics: ["protocol-design", "recruitment", "data-mgmt"],
          history: [
            { date: "2025", type: "publish", note: "Article published (featured in Drug Discovery News); framed AI's realistic role and governance considerations in clinical trials (exact date to be verified)." }
          ]
        },
        {
          id: "tc-ai-ml-pharmacovigilance",
          title: "Intelligent Automation Opportunities in Pharmacovigilance (AI/ML Validation & Industry Perspective)",
          url: "https://www.transceleratebiopharmainc.com/assets/intelligent-automation-opportunities-pharmacovigilance-solutions/",
          type: "Report",
          status: "final",
          publishedAt: "2023",
          updatedAt: "2023",
          summary: "Body of work on applying and validating AI/ML in pharmacovigilance (e.g. the individual case safety report process), including risk-based validation case studies and frameworks developed for co-learning with Health Authorities.",
          scores: { impact: 3, rigor: 4, foresight: 3 },
          topics: ["gcp", "regulatory", "data-mgmt"],
          history: [
            { date: "2023", type: "publish", note: "Published AI-based validation case study themes and an updated industry perspective on AI/ML in pharmacovigilance (initiative later marked complete in April 2025)." }
          ]
        },
        {
          id: "tc-tufts-data-collection-burden",
          title: "Tufts CSDD / TransCelerate Research: Nearly 30% of Clinical Trial Data Does Not Inform Key Decisions",
          url: "https://link.springer.com/article/10.1007/s43441-025-00899-4",
          type: "Research",
          status: "final",
          publishedAt: "2025-12-29",
          updatedAt: "2025-12-29",
          summary: "Peer-reviewed study by the Tufts Center for the Study of Drug Development with 15 TransCelerate sponsor companies, published in Therapeutic Innovation & Regulatory Science, analysing 105 Phase II/III protocols. Nearly one-third of procedures and their associated datapoints do not directly support primary or key secondary endpoints, and as much as 30% of participant and site burden comes from those non-core or non-essential procedures — even as Phase III protocols now average 5.9 million datapoints, up 11% annually since 2020. 74% of non-core data still reaches the Clinical Study Report, so volume alone is a poor proxy for value. A pointed counterweight to the assumption that AI's value lies in processing ever more data: the more immediate gain may be collecting less.",
          scores: { impact: 4, rigor: 4, foresight: 4 },
          topics: ["data-mgmt", "protocol-design", "recruitment", "scaling-roi"],
          history: [
            { date: "2025-12-29", type: "publish", note: "Peer-reviewed version of record published in Therapeutic Innovation & Regulatory Science (accepted 10 November 2025), subsequently used by TransCelerate to argue that the biggest near-term gains in clinical R&D will come from redesigning what is collected and why, rather than from new technology alone." },
            { date: "2025-09-15", type: "publish", note: "TransCelerate announced the headline findings while the study was still a preprint pending journal acceptance, which is why some secondary coverage dates this work to September 2025." }
          ]
        },
        {
          id: "tc-annual-report-2025",
          title: "2025 Annual Report — The Power of Forward",
          url: "https://www.transceleratebiopharmainc.com/2025-annual-report/",
          type: "Annual Report",
          status: "final",
          publishedAt: "2026-02-19",
          updatedAt: "2026-02-19",
          summary: "TransCelerate's 2025 annual report (18 member companies), reviewing how industry challenges were translated into practical solutions and setting the forward agenda. Notable for clinical-trial AI: with FDA CDER, TransCelerate published a public summary of a joint tabletop exercise on applying pragmatic trial elements in practice plus a sponsor resource guide, under its Embedded Pragmatic Trials initiative. Stated 2026 and beyond priorities are enabling digital protocols for regulatory use, using electronic health records to make trial participation a seamless extension of care, and expanding collaborative forums for shared experimentation.",
          scores: { impact: 3, rigor: 3, foresight: 4 },
          topics: ["harmonization", "doc-authoring", "digital-endpoints", "recruitment", "protocol-design"],
          history: [
            { date: "2026-06", type: "update", note: "At DIA 2026 the executive sponsor of Embedded Pragmatic Trials reframed FDA's continuous-review expectations around real-time evidence generation, arguing regulators are now demanding quality by design rather than downstream data cleanup." },
            { date: "2026-02-19", type: "publish", note: "Annual report released, setting digital protocols for regulatory use and EHR-enabled trial participation as the consortium's forward priorities." }
          ]
        }
      ]
    },
    {
      id: "market-research",
      name: "Grand View Research / Research and Markets / Fortune Business Insights",
      short: "Market Research",
      logoText: "GVR",
      brandColor: "#6b6485",
      domain: "researchandmarkets.com",
      category: "research",
      intro: "Market-research publishers sizing and forecasting the AI-in-clinical-trials market. Read them side by side: their 2026 estimates differ by more than 2x because each defines the market differently, so treat the growth direction as the signal and the absolute numbers as scope-dependent.",
      url: "https://www.researchandmarkets.com",
      documents: [
        {
          id: "gvr-ai-based-clinical-trials-solution",
          title: "AI-based Clinical Trials Solution Provider Market Size, Share & Trends Analysis Report (Grand View Research)",
          url: "https://www.researchandmarkets.com/reports/5390518/ai-based-clinical-trials-solution-provider",
          type: "Market Report",
          status: "final",
          publishedAt: "2024-09",
          updatedAt: "2024-09",
          summary: "Grand View Research: the AI-based clinical trials solution provider market is projected to reach $7.8B by 2030 at ~22.1% CAGR (from ~$1.95B in 2023 and ~$2.37B in 2024). The narrowest of the three definitions tracked here — it sizes solution providers rather than total AI spend in trials, which is why its numbers sit far below the broader market reports. North America was the largest market in 2023, Asia Pacific the fastest growing.",
          scores: { impact: 3, rigor: 4, foresight: 3 },
          topics: ["market"],
          history: [
            { date: "2024-09", type: "publish", note: "Report published (118 pages, 26 companies, forecast 2024–2030); segmented by therapeutic application, phase, end-use and region with oncology as a leading area. Figures re-verified against the publisher listing in August 2026 — still the current edition." }
          ]
        },
        {
          id: "rm-ai-in-clinical-trials-market",
          title: "Artificial Intelligence (AI) in Clinical Trials Market (Research and Markets)",
          url: "https://www.researchandmarkets.com/reports/6182027/artificial-intelligence-ai-in-clinical-trials",
          type: "Market Report",
          status: "final",
          publishedAt: "2025-10",
          updatedAt: "2025-10",
          summary: "Research and Markets: market ~$2B in 2024, projected to reach $6.5B by 2030 at ~22.6% CAGR. Segmented by component, phase, deployment mode, therapeutic area and end user.",
          scores: { impact: 3, rigor: 4, foresight: 3 },
          topics: ["market"],
          history: [
            { date: "2025-10", type: "publish", note: "Report published (forecast 2025–2030); 153 pages, 15 companies profiled, covering global regions." }
          ]
        },
        {
          id: "rm-ai-in-clinical-trials-market-2026",
          title: "AI in Clinical Trials Market Report 2026 (Research and Markets)",
          url: "https://www.researchandmarkets.com/reports/5939458/ai-in-clinical-trials-market-report",
          type: "Market Report",
          status: "final",
          publishedAt: "2026-02",
          updatedAt: "2026-02",
          summary: "Research and Markets 2026 report (250 pages, 23 companies profiled): the market grew from $9.16B in 2025 to $13.08B in 2026 (42.8% CAGR) and is projected to reach $54.71B by 2030 at ~43% CAGR — a markedly broader scope and far higher estimate than the Grand View provider-market view. Forecast-period growth is attributed to decentralized trials, real-world evidence adoption, precision medicine, rising regulatory acceptance of AI tools and advances in healthcare analytics; named trends are AI-driven recruitment, predictive outcome modeling, automated data analysis, remote monitoring integration and adaptive trial design.",
          scores: { impact: 3, rigor: 3, foresight: 3 },
          topics: ["market", "recruitment", "digital-endpoints"],
          history: [
            { date: "2026-02", type: "publish", note: "Report published (forecast 2026–2030); figures verified against the publisher listing — 2025 base $9.16B, 2026 estimate $13.08B, 2030 forecast $54.71B." }
          ]
        },
        {
          id: "fbi-ai-clinical-trials-market-2034",
          title: "AI in Clinical Trials Market, 2026-2034 (Fortune Business Insights)",
          url: "https://www.fortunebusinessinsights.com/ai-in-clinical-trials-market-114081",
          type: "Market Report",
          status: "final",
          publishedAt: "2026",
          updatedAt: "2026-07-20",
          summary: "A third independent sizing that lands between the other two: $3.8B in 2025 and $5.5B in 2026, forecast to reach $77.30B by 2034 at a 39.14% CAGR. North America held 52.26% share in 2025 ($1.98B, rising to $2.87B in 2026, with the US alone at $2.64B), and software/platforms are set to hold 59.9% of the offering split. Segmented by offering (software/platforms vs. services), technology (machine learning, NLP), application (patient recruitment and retention, trial design and protocol optimization, data collection and management, predictive analytics and outcome modeling), specialty and end user (pharma companies, CROs). Useful as a reality check on the divergence between market models — three publishers put the 2026 market at roughly $5.5B, $13.1B and (on a narrower provider definition) under $3B.",
          scores: { impact: 3, rigor: 3, foresight: 3 },
          topics: ["market", "recruitment", "protocol-design", "data-mgmt"],
          history: [
            { date: "2026-07-20", type: "update", note: "Publisher listing re-verified and the edition date pinned down: last updated 20 July 2026, study period 2021-2034, estimated year 2026. Regional and offering detail confirmed — North America $1.98B in 2025 and $2.87B in 2026, the US at $2.64B in 2026, and software/platforms at 59.9% of the offering split." },
            { date: "2026", type: "publish", note: "Report published with a 2026-2034 forecast period and 2021-2024 historical period." }
          ]
        },
        {
          id: "rm-ai-in-clinical-trials-market-2040",
          title: "AI in Clinical Trials Market, till 2040 (Research and Markets)",
          url: "https://www.researchandmarkets.com/reports/5852457/ai-in-clinical-trials-market-till",
          type: "Market Report",
          status: "final",
          publishedAt: "2026-09-25",
          updatedAt: "2026-09-25",
          summary: "Research and Markets listing added 25 September 2026 (report ID 5852457): projects the global AI-in-clinical-trials market from USD 2.09 billion in 2026 to USD 18.62 billion by 2040 at a 17.0% CAGR. Segments by trial phase, therapeutic area, end user and geography; includes use-case vignettes (e.g. sponsor–CRO and health-system partnerships). Sits far below the February 2026 Business Research Company edition's 2030 forecast ($54.71B) but extends the horizon — another reminder that market definitions and scopes diverge sharply across publishers.",
          scores: { impact: 2, rigor: 3, foresight: 3 },
          topics: ["market"],
          history: [
            { date: "2026-09-25", type: "publish", note: "Announced via GlobeNewswire and added to ResearchAndMarkets.com; 2040 forecast horizon distinguishes it from the hub's February 2026 report (2030 endpoint)." }
          ]
        }
      ]
    },
    {
      id: "academia",
      name: "Academic & Independent Research",
      short: "Academia",
      logoText: "ACA",
      brandColor: "#3949ab",
      domain: "nature.com",
      category: "academia",
      intro: "Peer-reviewed literature and analyses from independent research institutes, kept separate here because their evidence standards and incentives differ from regulator, CRO, vendor and consultancy output.",
      url: "https://www.nature.com/nrclinonc",
      documents: [
        {
          id: "eclinm-ai-trials-evidence-gaps",
          title: "Artificial Intelligence in Clinical Trials — State of the Evidence, Gaps, and Next Steps",
          url: "https://doi.org/10.1016/j.eclinm.2026.104196",
          type: "Peer-Reviewed Review",
          status: "final",
          publishedAt: "2026-09-12",
          updatedAt: "2026-09-12",
          summary: "By Antonis A. Armoundas, Constantine Tarabanis and Joseph Loscalzo (eClinicalMedicine, DOI 10.1016/j.eclinm.2026.104196). Defines two non-equivalent roles for AI in trials: AI-as-intervention (the model output is part of the assigned intervention and needs prospective evaluation with prespecified estimands and protocol-level oversight) versus AI-for-trial-operations (judged on workflow accuracy, decision impact, transportability and safety, with stricter change control when endpoints or inference are affected). Reviews evidence across safety, efficacy, operational risk prediction, network medicine, digital health technologies, retrieval-augmented generation and agentic workflows, aligned to ICH E6(R3), ICH E9(R1) and emerging structured-protocol standards. Complements the Nature Reviews oncology piece with a cross-therapeutic governance frame and explicit mapping to FDA-EMA good AI practice and the EU AI Act / EMA reflection paper where regulatory impact extends beyond conventional reporting guidance.",
          scores: { impact: 4, rigor: 5, foresight: 5 },
          topics: ["regulatory", "gcp", "agentic", "genai", "protocol-design", "data-mgmt", "harmonization"],
          history: [
            { date: "2026-09-12", type: "publish", note: "Published online after acceptance 25 August 2026; open access under CC BY-NC-ND 4.0." }
          ]
        },
        {
          id: "nrco-ai-augmentation-oncology-trials",
          title: "AI-based augmentation of oncology clinical trials (Nature Reviews Clinical Oncology)",
          url: "https://www.nature.com/articles/s41571-026-01189-0",
          type: "Peer-Reviewed Review",
          status: "final",
          publishedAt: "2026-08-07",
          updatedAt: "2026-08-07",
          summary: "A peer-reviewed review of AI across the whole oncology trial lifecycle — pre-trial design, trial conduct, and post-trial inference and generalization — and the clearest evidence line drawn so far between what AI can do now and what it cannot. Its central finding is a maturity split. The most immediate and evidence-supported role is augmenting operational workflows under human oversight: identifying candidate patients for enrollment, eligibility assessment, data extraction, and trial monitoring, including remote patient and safety monitoring and monitoring of AI model performance itself — already implemented at select cancer centres. Applications intended to substitute for evidence generation — synthetic control arms, trial outcome simulations and digital twins — remain earlier in development, with limited prospective validation and unresolved methodological, validation and regulatory challenges. Cross-cutting constraints named are equity, data quality and drift, transparency and regulatory oversight, and the authors argue that realizing the potential requires rigorous prospective validation plus coordination among clinicians, trialists, regulators, industry and patients. Useful in this hub as an independent counterweight to vendor and consultancy claims. DOI 10.1038/s41571-026-01189-0.",
          scores: { impact: 4, rigor: 5, foresight: 4 },
          topics: ["recruitment", "data-mgmt", "in-silico", "protocol-design", "gcp", "regulatory"],
          history: [
            { date: "2026-08-07", type: "publish", note: "Version of record published after acceptance on 16 July 2026, by an international author group spanning academic cancer centres (Villa, Eadie, Synnott, Romanò, Piffoux, Wong, Scheinerman, Tan, de Braud, Koopman et al.). The review's contribution is the separation it enforces: operational augmentation is presented as evidence-supported and already deployed, while evidence-replacing applications are presented as not yet prospectively validated." }
          ]
        },
        {
          id: "tufts-medable-monitoring-agent-enpv",
          title: "Tufts CSDD / Medable Analysis: Economic Value of an AI Clinical Monitoring Agent",
          url: "https://www.medable.com/newsroom/new-tufts-csdd-analysis-finds-ai-agents-can-deliver-up-to-21-million-in-net-financial-value-per-drug-development-program-and-up-to-82x-roi",
          type: "Research Analysis",
          status: "final",
          publishedAt: "2026-08-12",
          updatedAt: "2026-08-12",
          summary: "Tufts CSDD applied the expected net present value (eNPV) framework to Medable's Clinical Monitoring Agent, modeled on a benchmarked oncology development program: eNPV gains of roughly $7.5M for a phase 2 trial, $11.3M for combined phase 2 and phase 3 development and $21M for a phase 3 trial; an estimated ROI of 64x for phase 2 and 82x for phase 3; and direct operating cost reductions in on-site monitoring of about $4.4M per phase 2 study and $5.6M per phase 3 study. It is one of the few quantified answers to what an AI agent is actually worth per program, and it sits in deliberate tension with Deloitte's 16th-edition conclusion that AI's promised R&D cost and time savings have not materialized at scale. Read it with the sourcing in view: Tufts CSDD supplied the benchmark data and the eNPV method, but Medable — the vendor selling the agent — supplied the operational inputs, including time savings and agent cost, so this is not a fully independent estimate. Announced by press release; Tufts and Medable said a detailed peer-reviewed paper would follow later in 2026.",
          scores: { impact: 4, rigor: 3, foresight: 4 },
          topics: ["agentic", "scaling-roi", "rd-productivity", "data-mgmt"],
          history: [
            { date: "2026-08-12", type: "publish", note: "Findings announced via Business Wire and Medable's newsroom. Tufts CSDD's executive director describes it as the first time eNPV modeling based on actual use and benchmark data has been applied to an agentic AI deployment in drug development. The release also claims roughly 18 weeks of development acceleration — enrollment shortened by 109–119 days and closeout by about two weeks — plus off-site monitoring efficiencies of $0.6M (phase 2) and $1.7M (phase 3) excluded from the eNPV figures, and portfolio-level projections of up to $226M incremental eNPV for a sponsor with 20 active indications. None of it is peer reviewed yet." }
          ]
        }
      ]
    }
  ]
};
