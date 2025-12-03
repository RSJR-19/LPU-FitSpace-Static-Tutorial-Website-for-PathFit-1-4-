# LPU-FitSpace Website Quality Assurance Test Suite
# Enhanced version with better error detection and organized reporting

param(
    [string]$ProjectRoot = (Get-Location),
    [string]$OutputFile = "website_test_report.txt",
    [string[]]$ExcludeFolders = @(".git", "node_modules", ".vscode", ".idea", "1.OPEN_ME_PLEASE")
)

$reportDate = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
if (Test-Path $OutputFile) { Remove-Item $OutputFile -Force }

# Initialize statistics and error collection
$stats = @{
    HTMLFiles = 0; CSSFiles = 0; JSFiles = 0
    BrokenPaths = 0; HTMLErrors = 0; CSSErrors = 0; JSErrors = 0
    PathWarnings = 0; TotalIssues = 0
}

$errorLog = @{
    Critical = @()
    Errors = @()
    Warnings = @()
}

function Write-Report {
    param ([string]$message, [string]$color = "White")
    Write-Host $message -ForegroundColor $color
    Add-Content -Path $OutputFile -Value $message
}

function Add-Issue {
    param (
        [string]$severity,  # "Critical", "Error", "Warning"
        [string]$file,
        [int]$line,
        [string]$type,
        [string]$message
    )
    
    $issue = @{
        File = $file
        Line = $line
        Type = $type
        Message = $message
    }
    
    switch ($severity) {
        "Critical" { $errorLog.Critical += $issue }
        "Error" { $errorLog.Errors += $issue }
        "Warning" { $errorLog.Warnings += $issue }
    }
}

function Get-RelativePath {
    param ([string]$filePath)
    return $filePath -replace [regex]::Escape($ProjectRoot), "."
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
                
                # Skip URLs, data URIs, anchors, and empty paths
                if ($pathValue -match "^https?://") { continue }
                if ($pathValue -match "^data:") { continue }
                if ($pathValue -match "^#") { continue }
                if ($pathValue -eq "") { continue }
                if ($pathValue -match "^mailto:") { continue }
                if ($pathValue -match "^tel:") { continue }
                
                $pathWithoutAnchor = $pathValue -replace '#.*$', ''
                if ($pathWithoutAnchor -eq "") { continue }
                
                # Skip template variables
                if ($pathWithoutAnchor -match '\$\{' -or $pathWithoutAnchor -match '\}\}') { continue }
                
                $fullPath = $null
                
                # Resolve path based on type
                if ($pathWithoutAnchor -match "^/") {
                    $fullPath = Join-Path $ProjectRoot ($pathWithoutAnchor.TrimStart("/"))
                } elseif ($pathWithoutAnchor -match "^\./") {
                    $fullPath = Join-Path (Split-Path $filePath) ($pathWithoutAnchor.Substring(2))
                } elseif ($pathWithoutAnchor -match "^\.\./") {
                    $fullPath = Join-Path (Split-Path $filePath) $pathWithoutAnchor
                } else {
                    $fullPath = Join-Path (Split-Path $filePath) $pathWithoutAnchor
                }
                
                $fullPath = [System.IO.Path]::GetFullPath($fullPath)
                
                if (-not (Test-Path -Path $fullPath -PathType Leaf)) {
                    Add-Issue -severity "Critical" -file $relativePath -line $lineNumber `
                        -type "BROKEN PATH" -message "Referenced: $pathValue"
                    $stats.BrokenPaths++
                }
            }
        }
    } catch {
        Add-Issue -severity "Warning" -file $relativePath -line 0 `
            -type "CHECK FAILED" -message "Could not validate paths in file"
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
            
            # Check for relative path patterns
            $relativePatterns = @(
                '(href|src)="\.\./assets/',
                '(href|src)="\.\./pathfit',
                '(href|src)="\.\./home_page\.html'
            )
            
            foreach ($pattern in $relativePatterns) {
                if ($line -match $pattern) {
                    Add-Issue -severity "Warning" -file $relativePath -line $lineNumber `
                        -type "RELATIVE PATH" -message "Consider using absolute paths from root"
                    $stats.PathWarnings++
                    break
                }
            }
            
            # Check for base href
            if ($line -match '<base\s+href=') {
                Add-Issue -severity "Error" -file $relativePath -line $lineNumber `
                    -type "BASE HREF" -message "Base href tag detected (may cause path issues)"
                $stats.HTMLErrors++
            }
        }
    } catch {
        # Silent failure
    }
}

function Check-HTML-Syntax {
    param ([string]$filePath)
    $relativePath = Get-RelativePath $filePath
    try {
        $content = Get-Content -Path $filePath -Encoding UTF8 -Raw
        
        # Remove comments, scripts, and styles to avoid false positives
        $content = $content -replace '<!--[\s\S]*?-->', ''
        $content = $content -replace '<script[^>]*>[\s\S]*?</script>', '<script></script>'
        $content = $content -replace '<style[^>]*>[\s\S]*?</style>', '<style></style>'
        
        $lines = $content -split "`n"
        $lineNumber = 0
        $tags = @()
        
        foreach ($line in $lines) {
            $lineNumber++
            $lineMatches = [regex]::Matches($line, '<(/?)([a-zA-Z][a-zA-Z0-9\-]*)[^>]*(/?)>')
            
            foreach ($match in $lineMatches) {
                $isClosing = $match.Groups[1].Value -eq "/"
                $isSelfClosing = $match.Groups[3].Value -eq "/"
                $tagName = $match.Groups[2].Value.ToLower()
                
                $tags += @{
                    LineNumber = $lineNumber
                    IsClosing = $isClosing
                    IsSelfClosing = $isSelfClosing
                    TagName = $tagName
                }
            }
        }
        
        $stack = New-Object System.Collections.Stack
        $voidElements = @("area", "base", "br", "col", "embed", "hr", "img", "input", 
                          "link", "meta", "param", "source", "track", "wbr")
        
        foreach ($tag in $tags) {
            if (-not $tag.IsClosing) {
                # Skip void elements and self-closing tags
                if ($tag.TagName -notin $voidElements -and -not $tag.IsSelfClosing) {
                    $stack.Push(@{
                        TagName = $tag.TagName
                        LineNumber = $tag.LineNumber
                    })
                }
            } else {
                if ($stack.Count -gt 0) {
                    $top = $stack.Peek()
                    if ($top.TagName -eq $tag.TagName) {
                        $stack.Pop()
                    } else {
                        # Mismatch - try to find matching tag in stack
                        $found = $false
                        $tempStack = @()
                        
                        while ($stack.Count -gt 0) {
                            $current = $stack.Pop()
                            if ($current.TagName -eq $tag.TagName) {
                                $found = $true
                                # Report all skipped tags as unclosed
                                foreach ($skipped in $tempStack) {
                                    Add-Issue -severity "Error" -file $relativePath -line $skipped.LineNumber `
                                        -type "UNCLOSED TAG" -message "Tag <$($skipped.TagName)> not properly closed"
                                    $stats.HTMLErrors++
                                }
                                break
                            } else {
                                $tempStack += $current
                            }
                        }
                        
                        if (-not $found) {
                            # Restore stack if no match found
                            $tempStack | ForEach-Object { $stack.Push($_) }
                        }
                    }
                }
            }
        }
        
        # Report any remaining unclosed tags
        if ($stack.Count -gt 0) {
            foreach ($unclosedTag in $stack) {
                Add-Issue -severity "Error" -file $relativePath -line $unclosedTag.LineNumber `
                    -type "UNCLOSED TAG" -message "Tag <$($unclosedTag.TagName)> never closed"
                $stats.HTMLErrors++
            }
        }
    } catch {
        Add-Issue -severity "Warning" -file $relativePath -line 0 `
            -type "PARSE ERROR" -message "Could not parse HTML structure"
    }
}

function Check-CSS-Syntax {
    param ([string]$filePath)
    $relativePath = Get-RelativePath $filePath
    try {
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8
        
        # Remove comments
        $content = $content -replace '/\*[\s\S]*?\*/', ''
        
        # Count braces
        $openBraces = ([regex]::Matches($content, '\{')).Count
        $closeBraces = ([regex]::Matches($content, '\}')).Count
        
        if ($openBraces -ne $closeBraces) {
            $diff = [Math]::Abs($openBraces - $closeBraces)
            if ($openBraces -gt $closeBraces) {
                Add-Issue -severity "Error" -file $relativePath -line 0 `
                    -type "CSS SYNTAX" -message "$diff unclosed brace(s) '{' found"
            } else {
                Add-Issue -severity "Error" -file $relativePath -line 0 `
                    -type "CSS SYNTAX" -message "$diff extra closing brace(s) '}' found"
            }
            $stats.CSSErrors++
        }
    } catch {
        Add-Issue -severity "Warning" -file $relativePath -line 0 `
            -type "PARSE ERROR" -message "Could not parse CSS"
    }
}

function Check-JS-Syntax {
    param ([string]$filePath)
    $relativePath = Get-RelativePath $filePath
    try {
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8
        
        # Remove comments
        $content = $content -replace '//.*?(\r?\n|$)', '$1'
        $content = $content -replace '/\*[\s\S]*?\*/', ''
        
        # Remove strings to avoid false positives
        $content = $content -replace '"([^"\\]|\\.)*"', '""'
        $content = $content -replace "'([^'\\]|\\.)*'", "''"
        $content = $content -replace '`([^`\\]|\\.)*`', '``'
        
        $stack = New-Object System.Collections.Stack
        $brackets = @{
            '{' = '}'; '(' = ')'; '[' = ']'
        }
        
        $chars = $content.ToCharArray()
        for ($i = 0; $i -lt $chars.Length; $i++) {
            $char = $chars[$i]
            
            if ($brackets.ContainsKey([string]$char)) {
                $stack.Push([string]$char)
            } elseif ($brackets.Values -contains [string]$char) {
                if ($stack.Count -eq 0) {
                    Add-Issue -severity "Warning" -file $relativePath -line 0 `
                        -type "JS SYNTAX" -message "Unmatched closing bracket '$char'"
                    $stats.JSErrors++
                } else {
                    $last = $stack.Pop()
                    if ($brackets[$last] -ne [string]$char) {
                        Add-Issue -severity "Warning" -file $relativePath -line 0 `
                            -type "JS SYNTAX" -message "Mismatched brackets: expected '$($brackets[$last])' but found '$char'"
                        $stats.JSErrors++
                    }
                }
            }
        }
        
        if ($stack.Count -gt 0) {
            Add-Issue -severity "Warning" -file $relativePath -line 0 `
                -type "JS SYNTAX" -message "$($stack.Count) unclosed bracket(s)"
            $stats.JSErrors++
        }
    } catch {
        Add-Issue -severity "Warning" -file $relativePath -line 0 `
            -type "PARSE ERROR" -message "Could not parse JavaScript"
    }
}

function Write-IssueReport {
    Write-Report ""
    Write-Report "=====================================================================" -color "Cyan"
    Write-Report "ISSUE SUMMARY" -color "Cyan"
    Write-Report "=====================================================================" -color "Cyan"
    Write-Report ""
    
    # Critical Issues
    if ($errorLog.Critical.Count -gt 0) {
        Write-Report "CRITICAL ISSUES ($($errorLog.Critical.Count)):" -color "Red"
        Write-Report ""
        foreach ($issue in ($errorLog.Critical | Sort-Object File, Line)) {
            Write-Report "  [$($issue.Type)] $($issue.File):$($issue.Line)" -color "Red"
            Write-Report "    $($issue.Message)" -color "Red"
        }
        Write-Report ""
    }
    
    # Errors
    if ($errorLog.Errors.Count -gt 0) {
        Write-Report "ERRORS ($($errorLog.Errors.Count)):" -color "Yellow"
        Write-Report ""
        foreach ($issue in ($errorLog.Errors | Sort-Object File, Line)) {
            Write-Report "  [$($issue.Type)] $($issue.File):$($issue.Line)" -color "Yellow"
            Write-Report "    $($issue.Message)" -color "Yellow"
        }
        Write-Report ""
    }
    
    # Warnings
    if ($errorLog.Warnings.Count -gt 0) {
        Write-Report "WARNINGS ($($errorLog.Warnings.Count)):" -color "DarkYellow"
        Write-Report ""
        foreach ($issue in ($errorLog.Warnings | Sort-Object File, Line)) {
            Write-Report "  [$($issue.Type)] $($issue.File):$($issue.Line)" -color "DarkYellow"
            Write-Report "    $($issue.Message)" -color "Gray"
        }
        Write-Report ""
    }
    
    # No issues
    if ($errorLog.Critical.Count -eq 0 -and $errorLog.Errors.Count -eq 0 -and $errorLog.Warnings.Count -eq 0) {
        Write-Report "  No issues found!" -color "Green"
        Write-Report ""
    }
}

# ========================================================================
# MAIN EXECUTION
# ========================================================================

Write-Report ""
Write-Report "=====================================================================" -color "Cyan"
Write-Report "LPU-FITSPACE WEBSITE QUALITY ASSURANCE TEST" -color "Cyan"
Write-Report "=====================================================================" -color "Cyan"
Write-Report ""
Write-Report "Project Root: $ProjectRoot" -color "Cyan"
Write-Report "Report Date: $reportDate" -color "Cyan"
Write-Report ""

# Discover files
Write-Host "Discovering files..." -ForegroundColor Cyan

$excludePattern = ($ExcludeFolders | ForEach-Object { [regex]::Escape($_) }) -join '|'

$htmlFiles = @(Get-ChildItem -Path $ProjectRoot -Recurse -Filter "*.html" -File -ErrorAction SilentlyContinue |
               Where-Object { $_.FullName -notmatch $excludePattern })
$cssFiles = @(Get-ChildItem -Path $ProjectRoot -Recurse -Filter "*.css" -File -ErrorAction SilentlyContinue |
               Where-Object { $_.FullName -notmatch $excludePattern })
$jsFiles = @(Get-ChildItem -Path $ProjectRoot -Recurse -Filter "*.js" -File -ErrorAction SilentlyContinue |
              Where-Object { $_.FullName -notmatch $excludePattern })

$stats.HTMLFiles = $htmlFiles.Count
$stats.CSSFiles = $cssFiles.Count
$stats.JSFiles = $jsFiles.Count

Write-Report "Files Discovered:"
Write-Report "  HTML: $($stats.HTMLFiles)"
Write-Report "  CSS:  $($stats.CSSFiles)"
Write-Report "  JS:   $($stats.JSFiles)"
Write-Report ""

# Process HTML files
Write-Report "=====================================================================" -color "Cyan"
Write-Report "CHECKING HTML FILES..." -color "Cyan"
Write-Report "=====================================================================" -color "Cyan"

$progress = 0
foreach ($file in $htmlFiles) {
    $progress++
    $percent = [math]::Round(($progress / $htmlFiles.Count) * 100)
    Write-Progress -Activity "Checking HTML Files" -Status "$progress of $($htmlFiles.Count)" -PercentComplete $percent
    
    Check-BrokenPaths -filePath $file.FullName
    Check-PathCompliance -filePath $file.FullName
    Check-HTML-Syntax -filePath $file.FullName
}
Write-Progress -Activity "Checking HTML Files" -Completed
Write-Report "  ✓ Completed" -color "Green"
Write-Report ""

# Process CSS files
Write-Report "=====================================================================" -color "Cyan"
Write-Report "CHECKING CSS FILES..." -color "Cyan"
Write-Report "=====================================================================" -color "Cyan"

$progress = 0
foreach ($file in $cssFiles) {
    $progress++
    $percent = [math]::Round(($progress / $cssFiles.Count) * 100)
    Write-Progress -Activity "Checking CSS Files" -Status "$progress of $($cssFiles.Count)" -PercentComplete $percent
    
    Check-CSS-Syntax -filePath $file.FullName
}
Write-Progress -Activity "Checking CSS Files" -Completed
Write-Report "  ✓ Completed" -color "Green"
Write-Report ""

# Process JS files
Write-Report "=====================================================================" -color "Cyan"
Write-Report "CHECKING JS FILES..." -color "Cyan"
Write-Report "=====================================================================" -color "Cyan"

$progress = 0
foreach ($file in $jsFiles) {
    $progress++
    $percent = [math]::Round(($progress / $jsFiles.Count) * 100)
    Write-Progress -Activity "Checking JS Files" -Status "$progress of $($jsFiles.Count)" -PercentComplete $percent
    
    Check-JS-Syntax -filePath $file.FullName
}
Write-Progress -Activity "Checking JS Files" -Completed
Write-Report "  ✓ Completed" -color "Green"
Write-Report ""

# Write organized issue report
Write-IssueReport

# Final summary
Write-Report "=====================================================================" -color "Cyan"
Write-Report "FINAL RESULTS" -color "Cyan"
Write-Report "=====================================================================" -color "Cyan"
Write-Report ""
Write-Report "Statistics:"
Write-Report "  Critical Issues: $($errorLog.Critical.Count)" -color $(if ($errorLog.Critical.Count -gt 0) { "Red" } else { "Gray" })
Write-Report "  Errors:          $($errorLog.Errors.Count)" -color $(if ($errorLog.Errors.Count -gt 0) { "Yellow" } else { "Gray" })
Write-Report "  Warnings:        $($errorLog.Warnings.Count)" -color $(if ($errorLog.Warnings.Count -gt 0) { "DarkYellow" } else { "Gray" })
Write-Report ""

$totalIssues = $errorLog.Critical.Count + $errorLog.Errors.Count + $errorLog.Warnings.Count

if ($totalIssues -eq 0) {
    Write-Report "✓ SUCCESS: All quality checks passed!" -color "Green"
} else {
    Write-Report "⚠ ACTION REQUIRED: $totalIssues issue(s) found" -color "Red"
    Write-Report ""
    Write-Report "Priority:" -color "Cyan"
    Write-Report "  1. Fix all CRITICAL issues (broken paths)" -color "Red"
    Write-Report "  2. Fix ERRORS (syntax issues)" -color "Yellow"
    Write-Report "  3. Review WARNINGS (code quality)" -color "DarkYellow"
}

Write-Report ""
Write-Report "=====================================================================" -color "Cyan"
Write-Report ""
Write-Report "Full report saved to: $OutputFile" -color "Cyan"
Write-Report ""