Write-Host "Starting Git Repository Fix..." -ForegroundColor Cyan

# 1. Remove client/node_modules from Git index
if (Test-Path "client/node_modules") {
    Write-Host "Found client/node_modules. Removing from Git tracking..." -ForegroundColor Yellow
    git rm -r --cached client/node_modules
} else {
    Write-Host "client/node_modules not found locally, checking git index..."
    git rm -r --cached client/node_modules 2>$null
}

# 2. Ensure .gitignore is correct
$gitignoreContent = Get-Content client/.gitignore -Raw
if ($gitignoreContent -notmatch "node_modules") {
    Write-Host "Adding node_modules to client/.gitignore..." -ForegroundColor Yellow
    Add-Content -Path client/.gitignore -Value "`nnode_modules/"
}

# 3. Stage changes
Write-Host "Staging changes..." -ForegroundColor Cyan
git add .

# 4. Commit
Write-Host "Committing changes..." -ForegroundColor Cyan
git commit -m "Fix: Force remove node_modules from git tracking"

Write-Host "`n==========================================" -ForegroundColor Green
Write-Host "Fix applied successfully!" -ForegroundColor Green
Write-Host "Please run the following command in your terminal now:" -ForegroundColor White
Write-Host "git push" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Green
