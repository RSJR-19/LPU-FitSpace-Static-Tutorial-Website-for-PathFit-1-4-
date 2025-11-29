# Verification script - Check all paths are properly converted
# This script validates that no broken relative paths remain

Write-Host "[*] Verifying path conversions..." -ForegroundColor Cyan

$projectRoot = Get-Location
$issuesFound = $false
$filesChecked = 0
$problemFiles = @()

# Find all HTML files in pathfit directories
$files = Get-ChildItem -Path "pathfit1", "pathfit2", "pathfit3", "assets" -Filter "*.html" -Recurse -ErrorAction SilentlyContinue

Write-Host "[*] Checking $($files.Count) HTML files for path issues..."
Write-Host ""

foreach ($file in $files) {
    $filesChecked++
    $relPath = $file.FullName -replace [regex]::Escape((Get-Location).Path + "\"), ""
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Check for problematic patterns
    $patterns = @(
        @{ Pattern = 'href="\.\./\.\./\.\./'; Issue = 'Triple relative path found (../)' },
        @{ Pattern = 'src="\.\./\.\./\.\./'; Issue = 'Triple relative src path found (../)' },
        @{ Pattern = '<base href="'; Issue = 'Base href tag still present' },
        @{ Pattern = 'href="assets/'; Issue = 'Local relative path (should be /assets/)' },
        @{ Pattern = 'src="assets/'; Issue = 'Local relative src (should be /assets/)' }
    )
    
    $fileHasIssues = $false
    
    foreach ($check in $patterns) {
        if ($content -match $check.Pattern) {
            if (-not $fileHasIssues) {
                Write-Host "[!] $relPath" -ForegroundColor Yellow
                $fileHasIssues = $true
            }
            Write-Host "    - $($check.Issue)" -ForegroundColor Yellow
            $problemFiles += $relPath
            $issuesFound = $true
        }
    }
    
    # Check for correct patterns
    $correctPatterns = @(
        'href="/pathfit',
        'href="/assets/',
        'href="/home_page.html',
        'src="/pathfit',
        'src="/assets/',
        'href="/pathfit.*\.html'
    )
    
    $hasCorrectPaths = $false
    foreach ($pattern in $correctPatterns) {
        if ($content -match $pattern) {
            $hasCorrectPaths = $true
            break
        }
    }
    
    if ($hasCorrectPaths -and -not $fileHasIssues) {
        Write-Host "[OK] $relPath" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "[*] Files checked: $filesChecked"

if ($issuesFound) {
    Write-Host "[ER] Found issues in $($problemFiles.Count) files:" -ForegroundColor Red
    foreach ($file in $problemFiles | Select-Object -Unique) {
        Write-Host "  - $file"
    }
} else {
    Write-Host "[OK] No path issues found! All conversions appear successful." -ForegroundColor Green
}

Write-Host ""
Write-Host "[INFO] Summary:"
Write-Host "  - All ../assets paths should be /assets"
Write-Host "  - All ../pathfit* paths should be /pathfit*"
Write-Host "  - All ../home_page.html should be /home_page.html"
Write-Host "  - No <base href> tags should exist"
Write-Host "  - No triple ../ paths should exist"
