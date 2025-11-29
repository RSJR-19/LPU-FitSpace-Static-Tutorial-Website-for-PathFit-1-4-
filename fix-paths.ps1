# PowerShell script to convert all relative paths to root-relative paths
# Usage: powershell -ExecutionPolicy Bypass -File fix-paths.ps1

$projectRoot = Get-Location
Write-Host "🔧 Converting paths in LPU-FitSpace project..." -ForegroundColor Cyan
Write-Host "📂 Project root: $projectRoot" -ForegroundColor Gray

# Define replacements to apply
$replacements = @(
    # Remove <base> tags (they break GitHub Pages)
    @{ Pattern = '<base href="[^"]*">\s*'; Replacement = '' },
    
    # Fix relative asset paths to root-relative
    @{ Pattern = 'src="\.\.\/assets\/'; Replacement = 'src="/assets/' },
    @{ Pattern = 'href="\.\.\/assets\/'; Replacement = 'href="/assets/' },
    @{ Pattern = 'src="\.\./assets/'; Replacement = 'src="/assets/' },
    @{ Pattern = 'href="\.\./assets/'; Replacement = 'href="/assets/' },
    
    # Fix pathfit1 links
    @{ Pattern = 'href="\.\.\/pathfit1\/'; Replacement = 'href="/pathfit1/' },
    @{ Pattern = 'href="\.\./pathfit1/'; Replacement = 'href="/pathfit1/' },
    
    # Fix pathfit2 links
    @{ Pattern = 'href="\.\.\/pathfit2\/'; Replacement = 'href="/pathfit2/' },
    @{ Pattern = 'href="\.\./pathfit2/'; Replacement = 'href="/pathfit2/' },
    @{ Pattern = 'src="\.\.\/pathfit2\/'; Replacement = 'src="/pathfit2/' },
    @{ Pattern = 'src="\.\./pathfit2/'; Replacement = 'src="/pathfit2/' },
    
    # Fix pathfit3 links
    @{ Pattern = 'href="\.\.\/pathfit3\/'; Replacement = 'href="/pathfit3/' },
    @{ Pattern = 'href="\.\./pathfit3/'; Replacement = 'href="/pathfit3/' },
    @{ Pattern = 'src="\.\.\/pathfit3\/'; Replacement = 'src="/pathfit3/' },
    @{ Pattern = 'src="\.\./pathfit3/'; Replacement = 'src="/pathfit3/' },
    
    # Fix module-level CSS/JS (from pathfitX subdirectories)
    @{ Pattern = 'src="js\/'; Replacement = 'src="/pathfit1/js/' },  # Special handling needed per folder
    @{ Pattern = 'href="css\/'; Replacement = 'href="/pathfit1/css/' }  # Special handling needed per folder
)

# Get all HTML files in pathfit1, pathfit2, pathfit3
$htmlFiles = @()
$htmlFiles += Get-ChildItem -Path "pathfit1" -Filter "*.html" -Recurse
$htmlFiles += Get-ChildItem -Path "pathfit2" -Filter "*.html" -Recurse
$htmlFiles += Get-ChildItem -Path "pathfit3" -Filter "*.html" -Recurse

Write-Host "📄 Found $($htmlFiles.Count) HTML files to process" -ForegroundColor Yellow

foreach ($file in $htmlFiles) {
    $filePath = $file.FullName
    $relativePath = Resolve-Path $filePath -Relative
    
    try {
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8
        $originalContent = $content
        
        # Apply replacements
        foreach ($replacement in $replacements) {
            $content = $content -replace $replacement.Pattern, $replacement.Replacement
        }
        
        # Special handling for module-level paths based on file location
        if ($filePath -like "*pathfit1*") {
            # Replace js/ with /pathfit1/js/ and css/ with /pathfit1/css/
            $content = $content -replace 'src="js/', 'src="/pathfit1/js/'
            $content = $content -replace 'href="css/', 'href="/pathfit1/css/'
        }
        elseif ($filePath -like "*pathfit2*") {
            $content = $content -replace 'src="js/', 'src="/pathfit2/js/'
            $content = $content -replace 'href="css/', 'href="/pathfit2/css/'
        }
        elseif ($filePath -like "*pathfit3*") {
            $content = $content -replace 'src="js/', 'src="/pathfit3/js/'
            $content = $content -replace 'href="css/', 'href="/pathfit3/css/'
        }
        
        # Only write if content changed
        if ($content -ne $originalContent) {
            Set-Content -Path $filePath -Value $content -Encoding UTF8
            Write-Host "✅ $relativePath" -ForegroundColor Green
        }
        else {
            Write-Host "⏭️  $relativePath (no changes)" -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "❌ $relativePath - Error: $_" -ForegroundColor Red
    }
}

Write-Host "`n✨ Conversion complete!" -ForegroundColor Cyan
Write-Host "🧪 Next: Test with Live Server and check DevTools (F12) for 404 errors" -ForegroundColor Yellow
