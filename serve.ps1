# Minimal static file server for local preview of hs-site.
param(
  [int]$Port = 8123,
  [string]$Root = (Join-Path $PSScriptRoot 'hs-site')
)

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $Root at http://localhost:$Port/"

$types = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'
  '.svg'  = 'image/svg+xml'
  '.png'  = 'image/png'
  '.json' = 'application/json; charset=utf-8'
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $rel = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath).TrimStart('/')
  if ([string]::IsNullOrWhiteSpace($rel)) { $rel = 'index.html' }
  $path = Join-Path $Root $rel

  if (Test-Path -LiteralPath $path -PathType Leaf) {
    $ext = [System.IO.Path]::GetExtension($path).ToLowerInvariant()
    $ctx.Response.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' }
    $bytes = [System.IO.File]::ReadAllBytes($path)
    $ctx.Response.ContentLength64 = $bytes.Length
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $ctx.Response.StatusCode = 404
    $msg = [System.Text.Encoding]::UTF8.GetBytes("404 $rel")
    $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
  }
  $ctx.Response.OutputStream.Close()
}
