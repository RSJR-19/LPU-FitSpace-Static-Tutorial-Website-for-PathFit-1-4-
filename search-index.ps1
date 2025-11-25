# This script scans all .html files in the project, extracts the <title> and a snippet from the <body>, and outputs a JSON file.

$searchIndex = @()

# Get all HTML files recursively, excluding those in 1.OPEN_ME_PLEASE
Get-ChildItem -Path . -Filter *.html -Recurse | Where-Object {
    # Exclude files where the path contains '1.OPEN_ME_PLEASE'
    $_.FullName -notmatch [regex]::Escape("1.OPEN_ME_PLEASE")
} | ForEach-Object {
    $filePath = $_.FullName
    $relativePath = $_.FullName.Replace((Get-Location).Path + '\', '').Replace('\', '/')
    $content = Get-Content $filePath -Raw

    # Skip if content is null or empty
    if ([string]::IsNullOrWhiteSpace($content)) { return }

    # Extract <title>
    $titleMatch = [regex]::Match($content, '<title>(.*?)</title>', 'IgnoreCase')
    $title = if ($titleMatch.Success) { $titleMatch.Groups[1].Value } else { $_.Name }

    # Extract snippet from <body>
    $bodyMatch = [regex]::Match($content, '<body.*?>(.*?)</body>', 'Singleline,IgnoreCase')
    $body = if ($bodyMatch.Success) { $bodyMatch.Groups[1].Value } else { "" }
    $snippet = $body -replace '<.*?>', '' # Remove HTML tags
    $snippet = $snippet -replace '\r\n|\n|\r', ' ' # Remove newlines
    $snippet = $snippet -replace '\s+', ' ' # Collapse multiple spaces
    $snippet = $snippet.Trim()
    $snippet = $snippet.Substring(0, [Math]::Min(120, $snippet.Length))

    $searchIndex += @{
        title = $title
        path = $relativePath
        snippet = $snippet
    }
}

# Convert to JSON and save
$searchIndex | ConvertTo-Json -Depth 3 | Set-Content -Encoding UTF8 .\search-index.json
Write-Host "search-index.json generated."