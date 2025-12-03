# This script scans all .html files in the project, extracts the <title> and the first <p> inside <section class="content-section">, and outputs a JSON file.
$searchIndex = @()

# Get all HTML files recursively, excluding those in 1.OPEN_ME_PLEASE
Get-ChildItem -Path . -Filter *.html -Recurse | Where-Object {
    $_.FullName -notmatch [regex]::Escape("1.OPEN_ME_PLEASE")
} | ForEach-Object {
    $filePath = $_.FullName
    $relativePath = $_.FullName.Replace((Get-Location).Path + '\', '').Replace('\', '/')

    try {
        $content = Get-Content $filePath -Raw -ErrorAction Stop
    } catch {
        Write-Warning "Failed to read file: $filePath"
        return
    }

    # Skip if content is null or empty
    if ([string]::IsNullOrWhiteSpace($content)) { return }

    # Extract <title>
    $titleMatch = [regex]::Match($content, '<title>(.*?)</title>', 'Singleline,IgnoreCase')
    $title = if ($titleMatch.Success) { $titleMatch.Groups[1].Value.Trim() } else { $_.Name }

    # Extract first <p> inside <section class="content-section">
    $sectionMatch = [regex]::Match($content, '<section class="content-section"[^>]*>(.*?)</section>', 'Singleline,IgnoreCase')
    $snippet = "No description available"
    if ($sectionMatch.Success) {
        $sectionContent = $sectionMatch.Groups[1].Value
        $pMatch = [regex]::Match($sectionContent, '<p[^>]*>(.*?)</p>', 'Singleline,IgnoreCase')
        if ($pMatch.Success) {
            $snippet = $pMatch.Groups[1].Value
            # Remove HTML tags and clean up whitespace
            $snippet = $snippet -replace '<[^>]+>', ''
            $snippet = $snippet -replace '\s+', ' '
            $snippet = $snippet.Trim()
            $snippet = $snippet.Substring(0, [Math]::Min(150, $snippet.Length))
        }
    }

    # Add to search index
    $searchIndex += [PSCustomObject]@{
        Title  = $title
        Snippet = $snippet
        Path   = $relativePath
    }
}

# Sort the search index by title
$searchIndex = $searchIndex | Sort-Object Title

# Output to JSON file
$searchIndex | ConvertTo-Json -Depth 10 | Set-Content -Path 'search-index.json' -Encoding UTF8
Write-Host "search-index.json generated with $($searchIndex.Count) entries."
