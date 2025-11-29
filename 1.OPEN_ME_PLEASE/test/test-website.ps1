# LPU-FitSpace Website Quality Assurance Test Suite
# No dependencies - just reports issues clearly

$projectRoot = Get-Location
$outputFile = "website_test_report.txt"
$reportDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

if (Test-Path $outputFile) { Remove-Item $outputFile -Force }

$stats = @{
    HTMLFiles = 0; CSSFiles = 0; JSFiles = 0
    BrokenPaths = 0; HTMLErrors = 0; CSSErrors = 0; JSErrors = 0
    PathWarnings = 0; ImageMissingAlt = 0; DuplicateIDs = 0; TotalIssues = 0
}

function Write-Report {
    param ([string]$message, [string]$color = "White")
    Write-Host $message -ForegroundColor $color
    Add-Content -Path $outputFile -Value $message
}

function Get-RelativePath {
    param ([string]$filePath)
    return $filePath -replace [regex]::Escape($projectRoot), "."
}

function Check-BrokenPaths {
    param ([string]$filePath)
    $relativePath = Get-RelativePath $filePath
    try {
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8
        $matches = [regex]::Matches($content, '(href|src)="([^"]*)"')
        foreach ($match in $matches) {
            $pathValue = $match.Groups[2].Value
            if ($pathValue -match "^https?://") { continue }
            if ($pathValue -match "^data:") { continue }
            if ($pathValue -match "^#") { continue }
            if ($pathValue -eq "") { continue }
            
            # Remove anchor from path (e.g., page.html#section -> page.html)
            $pathWithoutAnchor = $pathValue -replace '#.*$', ''
            if ($pathWithoutAnchor -eq "") { continue }
            
            $fullPath = $null
            if ($pathWithoutAnchor -match "^/") {
                $fullPath = Join-Path $projectRoot ($pathWithoutAnchor.TrimStart("/"))
            } elseif ($pathWithoutAnchor -match "^\./") {
                $fullPath = Join-Path (Split-Path $filePath) ($pathWithoutAnchor.Substring(2))
            } elseif ($pathWithoutAnchor -match "^\.\./") {
                $fullPath = Join-Path (Split-Path $filePath) $pathWithoutAnchor
            } else {
                $fullPath = Join-Path (Split-Path $filePath) $pathWithoutAnchor
            }
            
            $fullPath = [System.IO.Path]::GetFullPath($fullPath)
            if (-not (Test-Path -Path $fullPath -PathType Leaf)) {
                # Only report if it's not a dynamic path or template variable
                if ($pathWithoutAnchor -notmatch '\$\{' -and $pathWithoutAnchor -notmatch '\}\}') {
                    Write-Report "  [ERR] BROKEN PATH: $relativePath" -color "Red"
                    Write-Report "        Referenced: $pathValue" -color "Red"
                    $stats.BrokenPaths++
                }
            }
        }
    } catch {
        Write-Report "  [WARN] Could not check: $relativePath" -color "Yellow"
    }
}

function Check-PathCompliance {
    param ([string]$filePath)
    $relativePath = Get-RelativePath $filePath
    try {
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8
        $relativePatterns = @(
            '(href|src)="\.\./assets/',
            '(href|src)="\.\./pathfit',
            '(href|src)="\.\./home_page\.html'
        )
        foreach ($pattern in $relativePatterns) {
            if ($content -match $pattern) {
                Write-Report "  [WARN] RELATIVE PATH: $relativePath" -color "Yellow"
                $stats.PathWarnings++
                break
            }
        }
        if ($content -match '<base\s+href=') {
            Write-Report "  [ERR] BASE HREF FOUND: $relativePath" -color "Red"
            $stats.HTMLErrors++
        }
    } catch {
        # Silent
    }
}

function Check-HTML-Syntax {
    param ([string]$filePath)
    $relativePath = Get-RelativePath $filePath
    try {
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8
        $tags = [regex]::Matches($content, '<(/?)([a-zA-Z][a-zA-Z0-9\-]*)[^>]*>')
        $stack = New-Object System.Collections.Stack
        $voidElements = @("img", "br", "hr", "meta", "link", "input", "source", "track")
        
        foreach ($tag in $tags) {
            $isClosing = $tag.Groups[1].Value -eq "/"
            $tagName = $tag.Groups[2].Value.ToLower()
            if (-not $isClosing) {
                if ($tagName -notin $voidElements) { $stack.Push($tagName) }
            } else {
                if ($stack.Count -gt 0 -and $stack.Peek() -eq $tagName) {
                    $stack.Pop()
                } elseif ($tagName -notin @("html", "body")) {
                    # Note possible unclosed tag
                }
            }
        }
    } catch { }
}

function Check-HTML-Attributes {
    param ([string]$filePath)
    $relativePath = Get-RelativePath $filePath
    try {
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8
        $imgTags = [regex]::Matches($content, '<img\s+[^>]*>')
        $missingAlt = 0
        foreach ($img in $imgTags) {
            $imgTag = $img.Value
            if ($imgTag -notmatch 'alt\s*=') { $missingAlt++ }
        }
        if ($missingAlt -gt 0) {
            Write-Report "  [WARN] MISSING ALT: $relativePath ($missingAlt images)" -color "Yellow"
            $stats.ImageMissingAlt += $missingAlt
        }
    } catch { }
}

function Check-CSS-Syntax {
    param ([string]$filePath)
    $relativePath = Get-RelativePath $filePath
    try {
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8
        $content = $content -replace '/\*[\s\S]*?\*/', ''
        $braces = [regex]::Matches($content, '[{}]')
        $stack = 0
        foreach ($brace in $braces) {
            if ($brace.Value -eq "{") { $stack++ }
            else {
                $stack--
                if ($stack -lt 0) {
                    Write-Report "  [ERR] CSS UNMATCHED: $relativePath" -color "Red"
                    $stats.CSSErrors++
                    $stack = 0
                }
            }
        }
        if ($stack -gt 0) {
            Write-Report "  [ERR] CSS UNCLOSED: $relativePath" -color "Red"
            $stats.CSSErrors++
        }
    } catch { }
}

function Check-JS-Syntax {
    param ([string]$filePath)
    $relativePath = Get-RelativePath $filePath
    try {
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8
        $content = $content -replace '//.*?$', ''
        $content = $content -replace '/\*[\s\S]*?\*/', ''
        $tokens = [regex]::Matches($content, '[{}()\[\]]')
        $stack = New-Object System.Collections.Stack
        foreach ($token in $tokens) {
            $char = $token.Value
            if ($char -in @("{", "(", "[")) {
                $stack.Push($char)
            } else {
                if ($stack.Count -eq 0) {
                    Write-Report "  [WARN] JS UNMATCHED: $relativePath" -color "Yellow"
                    $stats.JSErrors++
                } else {
                    $last = $stack.Peek()
                    $isValid = ($last -eq "{" -and $char -eq "}") -or ($last -eq "(" -and $char -eq ")") -or ($last -eq "[" -and $char -eq "]")
                    if ($isValid) { $stack.Pop() }
                }
            }
        }
    } catch { }
}

# Main Execution
Write-Report ""
Write-Report "=====================================================================" -color "Cyan"
Write-Report "LPU-FitSpace Website Quality Assurance Test" -color "Cyan"
Write-Report "=====================================================================" -color "Cyan"
Write-Report ""
Write-Report "Project Root: $projectRoot" -color "Cyan"
Write-Report "Report Date: $reportDate" -color "Cyan"
Write-Report ""

$htmlFiles = @(Get-ChildItem -Path $projectRoot -Recurse -Filter "*.html" -File -ErrorAction SilentlyContinue)
$cssFiles = @(Get-ChildItem -Path $projectRoot -Recurse -Filter "*.css" -File -ErrorAction SilentlyContinue)
$jsFiles = @(Get-ChildItem -Path $projectRoot -Recurse -Filter "*.js" -File -ErrorAction SilentlyContinue)

$stats.HTMLFiles = $htmlFiles.Count
$stats.CSSFiles = $cssFiles.Count
$stats.JSFiles = $jsFiles.Count

Write-Report "Files Found:"
Write-Report "  HTML: $($stats.HTMLFiles) | CSS: $($stats.CSSFiles) | JS: $($stats.JSFiles)"
Write-Report ""
Write-Report "=====================================================================" -color "Cyan"
Write-Report ""

Write-Report "CHECKING HTML FILES ($($stats.HTMLFiles))..." -color "Cyan"
foreach ($file in $htmlFiles) {
    $relativePath = Get-RelativePath $file.FullName
    Write-Report "  $relativePath" -color "Gray"
    Check-BrokenPaths -filePath $file.FullName
    Check-PathCompliance -filePath $file.FullName
    Check-HTML-Syntax -filePath $file.FullName
    Check-HTML-Attributes -filePath $file.FullName
}

Write-Report ""
Write-Report "CHECKING CSS FILES ($($stats.CSSFiles))..." -color "Cyan"
foreach ($file in $cssFiles) {
    $relativePath = Get-RelativePath $file.FullName
    Write-Report "  $relativePath" -color "Gray"
    Check-CSS-Syntax -filePath $file.FullName
}

Write-Report ""
Write-Report "CHECKING JS FILES ($($stats.JSFiles))..." -color "Cyan"
foreach ($file in $jsFiles) {
    $relativePath = Get-RelativePath $file.FullName
    Write-Report "  $relativePath" -color "Gray"
    Check-JS-Syntax -filePath $file.FullName
}

Write-Report ""
Write-Report "=====================================================================" -color "Cyan"
Write-Report ""
Write-Report "RESULTS:" -color "Cyan"
Write-Report ""
Write-Report "  Broken Paths: $($stats.BrokenPaths)"
Write-Report "  HTML Errors: $($stats.HTMLErrors)"
Write-Report "  CSS Errors: $($stats.CSSErrors)"
Write-Report "  Path Warnings: $($stats.PathWarnings)"
Write-Report "  Missing Alt Text: $($stats.ImageMissingAlt)"
Write-Report ""

$totalErrors = $stats.BrokenPaths + $stats.HTMLErrors + $stats.CSSErrors
if ($totalErrors -eq 0) {
    Write-Report "SUCCESS: All critical checks passed!" -color "Green"
} else {
    Write-Report "ACTION REQUIRED: $totalErrors error(s) found" -color "Red"
}

Write-Report ""
Write-Report "=====================================================================" -color "Cyan"
Write-Report ""
Write-Report "Report saved to: $outputFile"
Write-Report ""
