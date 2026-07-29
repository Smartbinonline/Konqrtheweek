# Downloads a fresh KONQR (PocketBase) backup into your OneDrive folder.
# OneDrive then versions it automatically. Register as a daily scheduled task
# (see SETUP_SERVER.md) or run by hand any time.
#
# Usage:
#   .\Fetch-KonqrBackup.ps1 -Server "https://your-name.duckdns.org" `
#       -Email "you@example.com" -Password "YOUR-ADMIN-PASSWORD" `
#       -Dest "$env:OneDrive\KONQR-Backups"
param(
  [Parameter(Mandatory)] [string]$Server,
  [Parameter(Mandatory)] [string]$Email,
  [Parameter(Mandatory)] [string]$Password,
  [string]$Dest = "$env:OneDrive\KONQR-Backups"
)
$ErrorActionPreference = "Stop"
$Server = $Server.TrimEnd("/")
New-Item -ItemType Directory -Force -Path $Dest | Out-Null

# 1. superuser (admin) login
$auth = Invoke-RestMethod -Method Post -Uri "$Server/api/collections/_superusers/auth-with-password" `
  -ContentType "application/json" -Body (@{ identity = $Email; password = $Password } | ConvertTo-Json)
$token = $auth.token
$h = @{ Authorization = $token }

# 2. create a fresh server-side backup zip
$name = "onedrive-{0}.zip" -f (Get-Date -Format "yyyyMMdd-HHmm")
Invoke-RestMethod -Method Post -Uri "$Server/api/backups" -Headers $h `
  -ContentType "application/json" -Body (@{ name = $name } | ConvertTo-Json) | Out-Null

# 3. get a file token and download it
$ft = (Invoke-RestMethod -Method Post -Uri "$Server/api/files/token" -Headers $h).token
$out = Join-Path $Dest "konqr-data.zip"   # fixed name -> OneDrive keeps version history
Invoke-WebRequest -Uri "$Server/api/backups/$name`?token=$ft" -OutFile $out

# 4. tidy old server-side copies (keep newest 5 made by this script)
$list = Invoke-RestMethod -Uri "$Server/api/backups" -Headers $h
$old = $list | Where-Object { $_.key -like "onedrive-*" } | Sort-Object modified -Descending | Select-Object -Skip 5
foreach ($b in $old) {
  Invoke-RestMethod -Method Delete -Uri "$Server/api/backups/$($b.key)" -Headers $h | Out-Null
}
Write-Host "Backup saved to $out"
