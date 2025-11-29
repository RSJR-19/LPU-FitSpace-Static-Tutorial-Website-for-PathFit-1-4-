# Fix nested pathfit3 subdirectory files (pf3_dance_act, pf3_sports_act, pf3_group_exercises)
# These files are nested one level deeper, so they have ../../assets instead of ../assets

Write-Host "[*] Converting nested pathfit3 subdirectory paths..." -ForegroundColor Cyan
Write-Host "[*] Project root: $(Get-Location)"

# Define replacement patterns for nested directories (which use ../../assets format)
$replacements = @(
    # Remove base href tags
    @{ Pattern = '<base href="[^"]*">\s*'; Replacement = '' },
    
    # Fix ../../assets paths (nested subdirectories only)
    @{ Pattern = 'src="\.\.\/\.\.\/assets\/'; Replacement = 'src="/assets/' },
    @{ Pattern = 'href="\.\.\/\.\.\/assets\/'; Replacement = 'href="/assets/' },
    
    # Fix ../../pathfit1 navigation links
    @{ Pattern = 'href="\.\.\/\.\.\/pathfit1\/'; Replacement = 'href="/pathfit1/' },
    
    # Fix ../pathfit2 navigation links (from pf3 subdirs)
    @{ Pattern = 'href="\.\.\/\.\.\/pathfit2\/'; Replacement = 'href="/pathfit2/' },
    
    # Fix ../pathfit3 links (accessing parent directory)
    @{ Pattern = 'href="\.\.\/pathfit3\/'; Replacement = 'href="/pathfit3/' },
    @{ Pattern = 'href="\.\.\/\.\.\/pathfit3\/'; Replacement = 'href="/pathfit3/' },
    
    # Fix script paths from nested dirs - js/pathfit3.js (relative from pf3_dance_act etc)
    @{ Pattern = 'src="\.\.\/js\/pathfit3\.js'; Replacement = 'src="/pathfit3/js/pathfit3.js' },
    
    # Fix ../../assets/js paths
    @{ Pattern = 'src="\.\.\/\.\.\/assets\/js\/'; Replacement = 'src="/assets/js/' },
    @{ Pattern = 'src="\.\.\/\.\.\/assets\/css\/'; Replacement = 'src="/assets/css/' }
)

# Find all HTML files in pathfit3 subdirectories (nested only)
$files = Get-ChildItem -Path "pathfit3" -Filter "*.html" -Recurse | 
         Where-Object { $_.FullName -like "*pf3_*" }

Write-Host "[*] Found $($files.Count) nested HTML files to process"

$successCount = 0
$skipCount = 0

foreach ($file in $files) {
    $relPath = $file.FullName -replace [regex]::Escape((Get-Location).Path + "\"), ""
    
    try {
        # Read file content
        $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
        $originalContent = $content
        
        # Apply replacements
        foreach ($replacement in $replacements) {
            $content = $content -replace $replacement.Pattern, $replacement.Replacement
        }
        
        # Check if changes were made
        if ($content -ne $originalContent) {
            # Write back to file
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
            Write-Host "[OK] $relPath"
            $successCount++
        } else {
            Write-Host "[--] $relPath (no changes)"
            $skipCount++
        }
    }
    catch {
        Write-Host "[ER] $relPath - Error: $_" -ForegroundColor Red
    }
}

Write-Host "`n[DONE] Nested path conversion complete!"
Write-Host "[OK] Modified: $successCount files"
Write-Host "[--] Unchanged: $skipCount files"
Write-Host "[TIP] Next: Test with Live Server and check DevTools (F12) for 404 errors"
