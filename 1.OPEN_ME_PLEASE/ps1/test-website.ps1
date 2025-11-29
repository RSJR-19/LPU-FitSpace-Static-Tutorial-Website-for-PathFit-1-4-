# LPU-FitSpace Website Quality Assurance Test Suite
# No dependencies - just reports issues clearly
$projectRoot = Get-Location
$outputFile = "website_test_report.txt"
$reportDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
if (Test-Path $outputFile) { Remove-Item $outputFile -Force }
$stats = @{
    HTMLFiles = 0; CSSFiles = 0; JSFiles = 0
    BrokenPaths = 0; HTMLErrors = 0; CSSErrors = 0; JSErrors = 0
    PathWarnings = 0; DuplicateIDs = 0; TotalIssues = 0
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
        $content = Get-Content -Path $filePath -Encoding UTF8
        $lineNumber = 0
        foreach ($line in $content) {
            $lineNumber++
            $matches = [regex]::Matches($line, '(href|src)="([^"]*)"')
            foreach ($match in $matches) {
                $pathValue = $match.Groups[2].Value
                if ($pathValue -match "^https?://") { continue }
                if ($pathValue -match "^data:") { continue }
                if ($pathValue -match "^#") { continue }
                if ($pathValue -eq "") { continue }

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
                    if ($pathWithoutAnchor -notmatch '\$\{' -and $pathWithoutAnchor -notmatch '\}\}') {
                        Write-Report "  [ERR] BROKEN PATH: $relativePath (Line $lineNumber)" -color "Red"
                        Write-Report "        Referenced: $pathValue" -color "Red"
                        $stats.BrokenPaths++
                    }
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
        $content = Get-Content -Path $filePath -Encoding UTF8
        $lineNumber = 0
        foreach ($line in $content) {
            $lineNumber++
            $relativePatterns = @(
                '(href|src)="\.\./assets/',
                '(href|src)="\.\./pathfit',
                '(href|src)="\.\./home_page\.html'
            )
            foreach ($pattern in $relativePatterns) {
                if ($line -match $pattern) {
                    Write-Report "  [WARN] RELATIVE PATH: $relativePath (Line $lineNumber)" -color "Yellow"
                    $stats.PathWarnings++
                    break
                }
            }
            if ($line -match '<base\s+href=') {
                Write-Report "  [ERR] BASE HREF FOUND: $relativePath (Line $lineNumber)" -color "Red"
                $stats.HTMLErrors++
            }
        }
    } catch {
        # Silent
    }
}

function Check-HTML-Syntax {
    param ([string]$filePath)
    $relativePath = Get-RelativePath $filePath
    try {
        $content = Get-Content -Path $filePath -Encoding UTF8
        $lineNumber = 0
        $tags = New-Object System.Collections.Generic.List[object]
        foreach ($line in $content) {
            $lineNumber++
            $lineMatches = [regex]::Matches($line, '<(/?)([a-zA-Z][a-zA-Z0-9\-]*)[^>]*>')
            foreach ($match in $lineMatches) {
                $tags.Add(@{
                    LineNumber = $lineNumber
                    IsClosing = $match.Groups[1].Value -eq "/"
                    TagName = $match.Groups[2].Value.ToLower()
                })
            }
        }
        $stack = New-Object System.Collections.Stack
        $voidElements = @("img", "br", "hr", "meta", "link", "input", "source", "track")
        foreach ($tag in $tags) {
            if (-not $tag.IsClosing) {
                if ($tag.TagName -notin $voidElements) {
                    $stack.Push(@{
                        TagName = $tag.TagName
                        LineNumber = $tag.LineNumber
                    })
                }
            } else {
                if ($stack.Count -gt 0 -and $stack.Peek().TagName -eq $tag.TagName) {
                    $stack.Pop()
                } elseif ($tag.TagName -notin @("html", "body")) {
                    Write-Report "  [WARN] UNCLOSED TAG: $relativePath (Line $($stack.Peek().LineNumber)) - Expected closing tag for: $($stack.Peek().TagName)" -color "Yellow"
                    $stats.HTMLErrors++
                }
            }
        }
        if ($stack.Count -gt 0) {
            foreach ($unclosedTag in $stack) {
                Write-Report "  [ERR] UNCLOSED TAG: $relativePath (Line $($unclosedTag.LineNumber)) - Unclosed tag: $($unclosedTag.TagName)" -color "Red"
                $stats.HTMLErrors++
            }
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
        $lineNumber = 1
        $lines = $content -split "`n"
        foreach ($brace in $braces) {
            if ($brace.Index -ge $lines[0].Length) {
                $lineNumber = 1
                for ($i = 1; $i -lt $lines.Count; $i++) {
                    if ($brace.Index -lt ($lines[0..$i] -join "").Length) {
                        $lineNumber = $i + 1
                        break
                    }
                }
            }
            if ($brace.Value -eq "{") {
                $stack++
            } else {
                $stack--
                if ($stack -lt 0) {
                    Write-Report "  [ERR] CSS UNMATCHED: $relativePath (Line $lineNumber)" -color "Red"
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
        $lineNumber = 1
        $lines = $content -split "`n"
        foreach ($token in $tokens) {
            if ($token.Index -ge $lines[0].Length) {
                $lineNumber = 1
                for ($i = 1; $i -lt $lines.Count; $i++) {
                    if ($token.Index -lt ($lines[0..$i] -join "").Length) {
                        $lineNumber = $i + 1
                        break
                    }
                }
            }
            $char = $token.Value
            if ($char -in @("{", "(", "[")) {
                $stack.Push(@{
                    Char = $char
                    LineNumber = $lineNumber
                })
            } else {
                if ($stack.Count -eq 0) {
                    Write-Report "  [WARN] JS UNMATCHED: $relativePath (Line $lineNumber)" -color "Yellow"
                    $stats.JSErrors++
                } else {
                    $last = $stack.Peek()
                    $isValid = ($last.Char -eq "{" -and $char -eq "}") -or
                               ($last.Char -eq "(" -and $char -eq ")") -or
                               ($last.Char -eq "[" -and $char -eq "]")
                    if ($isValid) {
                        $stack.Pop()
                    } else {
                        Write-Report "  [WARN] JS MISMATCH: $relativePath (Line $lineNumber)" -color "Yellow"
                        $stats.JSErrors++
                    }
                }
            }
        }
    } catch { }
}

# Main Execution
Write-Report ""
Write-Report "=====================================================================" -color "Cyan"
Write-Report "LPU-FitSpace Path Test" -color "Cyan"
Write-Report "=====================================================================" -color "Cyan"
Write-Report ""
Write-Report "Project Root: $projectRoot" -color "Cyan"
Write-Report "Report Date: $reportDate" -color "Cyan"
Write-Report ""
$htmlFiles = @(Get-ChildItem -Path $projectRoot -Recurse -Filter "*.html" -File -ErrorAction SilentlyContinue |
               Where-Object { $_.FullName -notmatch '\\1\.OPEN_ME_PLEASE' })
$cssFiles = @(Get-ChildItem -Path $projectRoot -Recurse -Filter "*.css" -File -ErrorAction SilentlyContinue |
               Where-Object { $_.FullName -notmatch '\\1\.OPEN_ME_PLEASE' })
$jsFiles = @(Get-ChildItem -Path $projectRoot -Recurse -Filter "*.js" -File -ErrorAction SilentlyContinue |
              Where-Object { $_.FullName -notmatch '\\1\.OPEN_ME_PLEASE' })
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
