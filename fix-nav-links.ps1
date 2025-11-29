# Fix remaining relative navigation links to home_page.html
# These should be root-relative (/home_page.html) not ../home_page.html

Write-Host "[*] Converting remaining relative navigation links..." -ForegroundColor Cyan

$replacements = @(
    # Fix ../home_page.html links to root-relative
    @{ Pattern = 'href="\.\.\/home_page\.html'; Replacement = 'href="/home_page.html' }
)

# Find all lesson HTML files in pathfit directories
$files = Get-ChildItem -Path "pathfit1", "pathfit2", "pathfit3" -Filter "lesson*.html" -Recurse

Write-Host "[*] Found $($files.Count) lesson files to check"

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

Write-Host "`n[DONE] Navigation link conversion complete!"
Write-Host "[OK] Modified: $successCount files"
Write-Host "[--] Unchanged: $skipCount files"
Write-Host "[TIP] All paths should now be root-relative! Ready for testing."
