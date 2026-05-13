#
# Smoke test PowerShell pour blogSite
# Usage : .\smoke-test.ps1
#

$ErrorActionPreference = "Continue"
$pass = 0
$fail = 0
$results = @()

function Test-Step {
    param($name, $command)
    Write-Host "  Test : $name ... " -NoNewline
    try {
        $result = & $command
        if ($LASTEXITCODE -eq 0 -or $result) {
            Write-Host "OK" -ForegroundColor Green
            $script:pass++
            $script:results += "[OK]   $name"
            return $true
        } else {
            Write-Host "FAIL" -ForegroundColor Red
            $script:fail++
            $script:results += "[FAIL] $name"
            return $false
        }
    } catch {
        Write-Host "ERROR : $_" -ForegroundColor Red
        $script:fail++
        $script:results += "[ERR]  $name : $_"
        return $false
    }
}

Write-Host ""
Write-Host "=========================================="
Write-Host " Smoke test blogSite"
Write-Host "=========================================="
Write-Host ""

# 1. Verifier Docker
Write-Host "1. Pre-requis"
Test-Step "docker installe" { docker --version > $null 2>&1; $LASTEXITCODE -eq 0 }
Test-Step "docker-compose installe" { docker-compose --version > $null 2>&1; $LASTEXITCODE -eq 0 }

# 2. Verifier les fichiers du projet
Write-Host ""
Write-Host "2. Fichiers projet"
Test-Step "docker-compose.yml present" { Test-Path "docker-compose.yml" }
Test-Step ".env present (sinon le creer)" { Test-Path ".env" }
Test-Step "backend/pom.xml present" { Test-Path "backend/pom.xml" }
Test-Step "backend/Dockerfile present" { Test-Path "backend/Dockerfile" }
Test-Step "frontend/package.json present" { Test-Path "frontend/package.json" }
Test-Step "frontend/Dockerfile present" { Test-Path "frontend/Dockerfile" }

# 3. Verifier les conteneurs
Write-Host ""
Write-Host "3. Conteneurs Docker"
$psOutput = docker-compose ps 2>&1 | Out-String
Test-Step "blogsite-mysql en cours" { $psOutput -match "blogsite-mysql.*Up" }
Test-Step "blogsite-backend en cours" { $psOutput -match "blogsite-backend.*Up" }
Test-Step "blogsite-frontend en cours" { $psOutput -match "blogsite-frontend.*Up" }

# 4. Verifier les endpoints
Write-Host ""
Write-Host "4. Endpoints HTTP"

Test-Step "Backend ping (8080/api/v1/ping)" {
    try {
        $r = Invoke-WebRequest -Uri "http://localhost:8080/api/v1/ping" -UseBasicParsing -TimeoutSec 5
        $r.StatusCode -eq 200
    } catch { $false }
}

Test-Step "Backend regions (8080/api/v1/regions)" {
    try {
        $r = Invoke-WebRequest -Uri "http://localhost:8080/api/v1/regions" -UseBasicParsing -TimeoutSec 5
        $json = $r.Content | ConvertFrom-Json
        $json.Length -eq 10
    } catch { $false }
}

Test-Step "Backend Swagger UI (8080/swagger-ui.html)" {
    try {
        $r = Invoke-WebRequest -Uri "http://localhost:8080/swagger-ui.html" -UseBasicParsing -TimeoutSec 5
        $r.StatusCode -eq 200 -or $r.StatusCode -eq 302
    } catch { $false }
}

Test-Step "Frontend (4200)" {
    try {
        $r = Invoke-WebRequest -Uri "http://localhost:4200/" -UseBasicParsing -TimeoutSec 5
        $r.StatusCode -eq 200 -and $r.Content -match "blogSite"
    } catch { $false }
}

# 5. Test fonctionnel : login admin
Write-Host ""
Write-Host "5. Test fonctionnel"
Test-Step "Login admin par defaut" {
    try {
        $body = @{
            identifier = "admin@blogsite.cm"
            password = "Admin@123"
        } | ConvertTo-Json
        $r = Invoke-WebRequest -Uri "http://localhost:8080/api/v1/auth/login" `
            -Method Post -Body $body -ContentType "application/json" `
            -UseBasicParsing -TimeoutSec 5
        $json = $r.Content | ConvertFrom-Json
        $json.accessToken -ne $null
    } catch { $false }
}

# Synthese
Write-Host ""
Write-Host "=========================================="
Write-Host " Resultats : $pass OK, $fail FAIL"
Write-Host "=========================================="
foreach ($r in $results) { Write-Host "  $r" }
Write-Host ""

if ($fail -eq 0) {
    Write-Host "Tous les tests passent. La stack est operationnelle." -ForegroundColor Green
    exit 0
} else {
    Write-Host "Des tests ont echoue." -ForegroundColor Yellow
    Write-Host "  - Verifier que la stack est demarree : docker-compose ps"
    Write-Host "  - Patientez 60s apres docker-compose up (demarrage MySQL + backend)"
    Write-Host "  - Voir les logs : docker-compose logs -f"
    exit 1
}
