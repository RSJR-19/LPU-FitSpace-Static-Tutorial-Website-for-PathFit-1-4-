# generate-project-structure.ps1
# Generates a project_structure.md file with a tree diagram and file statistics
param(
    [string]$RootPath = ".",
    [string]$OutputFile = "project_structure.md",
    [string[]]$ExcludeFolders = @(".git", "node_modules", ".vscode", ".idea", "1.OPEN_ME_PLEASE"),
    [int]$MaxDepth = 10
)

# Initialize statistics hashtable
$script:stats = @{
    '.html'         = 0
    '.css'          = 0
    '.js'           = 0
    '.json'         = 0
    '.md'           = 0
    '.ps1'          = 0
    '.pdf'          = 0
    '.png'          = 0
    '.jpg'          = 0
    '.jpeg'         = 0
    '.svg'          = 0
    '.gif'          = 0
    '.webm'         = 0
    '.mp4'          = 0
    '.txt'          = 0
    'other'         = 0
    'total_files'   = 0
    'total_folders' = 0
}

function Get-TreeStructure {
    param(
        [string]$Path,
        [string]$Prefix = "",
        [int]$CurrentDepth = 0,
        [bool]$IsLast = $true
    )

    if ($CurrentDepth -ge $MaxDepth) {
        return
    }

    $items = Get-ChildItem -Path $Path -Force | Where-Object {
        $_.Name -notin $ExcludeFolders
    } | Sort-Object { $_.PSIsContainer }, Name

    $itemCount = $items.Count
    $currentIndex = 0

    foreach ($item in $items) {
        $currentIndex++
        $isLastItem = ($currentIndex -eq $itemCount)

        # Determine the tree characters - FIXED
        if ($isLastItem) {
            $branch = [char]0x2514 + [char]0x2500 + [char]0x2500 + " "
            $extension = "    "
        }
        else {
            $branch = [char]0x251C + [char]0x2500 + [char]0x2500 + " "
            $extension = [char]0x2502 + "   "
        }

        # Add trailing slash for directories
        $displayName = $item.Name
        if ($item.PSIsContainer) {
            $displayName += "/"
            $script:stats['total_folders']++
        }
        else {
            # Count file by extension
            $ext = $item.Extension.ToLower()
            $script:stats['total_files']++

            if ($script:stats.ContainsKey($ext)) {
                $script:stats[$ext]++
            }
            else {
                $script:stats['other']++
            }
        }

        # Output current item
        $output = "$Prefix$branch$displayName"
        $script:treeLines += $output

        # Recurse into directories
        if ($item.PSIsContainer) {
            $newPrefix = $Prefix + $extension
            Get-TreeStructure -Path $item.FullName -Prefix $newPrefix -CurrentDepth ($CurrentDepth + 1) -IsLast $isLastItem
        }
    }
}

function Format-Statistics {
    $output = @()
    $output += ""
    $output += "## Project Statistics"
    $output += ""
    $output += "### File Counts by Type"
    $output += ""

    # Web files
    if ($script:stats['.html'] -gt 0 -or $script:stats['.css'] -gt 0 -or $script:stats['.js'] -gt 0) {
        $output += "**Web Files:**"
        if ($script:stats['.html'] -gt 0) { $output += "- HTML files: $($script:stats['.html'])" }
        if ($script:stats['.css'] -gt 0) { $output += "- CSS files: $($script:stats['.css'])" }
        if ($script:stats['.js'] -gt 0) { $output += "- JavaScript files: $($script:stats['.js'])" }
        $output += ""
    }

    # Data files
    if ($script:stats['.json'] -gt 0) {
        $output += "**Data Files:**"
        $output += "- JSON files: $($script:stats['.json'])"
        $output += ""
    }

    # Documentation
    if ($script:stats['.md'] -gt 0 -or $script:stats['.txt'] -gt 0 -or $script:stats['.pdf'] -gt 0) {
        $output += "**Documentation:**"
        if ($script:stats['.md'] -gt 0) { $output += "- Markdown files: $($script:stats['.md'])" }
        if ($script:stats['.txt'] -gt 0) { $output += "- Text files: $($script:stats['.txt'])" }
        if ($script:stats['.pdf'] -gt 0) { $output += "- PDF files: $($script:stats['.pdf'])" }
        $output += ""
    }

    # Images
    $imageCount = $script:stats['.png'] + $script:stats['.jpg'] + $script:stats['.jpeg'] + $script:stats['.svg'] + $script:stats['.gif']
    if ($imageCount -gt 0) {
        $output += "**Images:**"
        if ($script:stats['.png'] -gt 0) { $output += "- PNG files: $($script:stats['.png'])" }
        if ($script:stats['.jpg'] -gt 0) { $output += "- JPG files: $($script:stats['.jpg'])" }
        if ($script:stats['.jpeg'] -gt 0) { $output += "- JPEG files: $($script:stats['.jpeg'])" }
        if ($script:stats['.svg'] -gt 0) { $output += "- SVG files: $($script:stats['.svg'])" }
        if ($script:stats['.gif'] -gt 0) { $output += "- GIF files: $($script:stats['.gif'])" }
        $output += "- **Total images: $imageCount**"
        $output += ""
    }

    # Videos
    $videoCount = $script:stats['.webm'] + $script:stats['.mp4']
    if ($videoCount -gt 0) {
        $output += "**Videos:**"
        if ($script:stats['.webm'] -gt 0) { $output += "- WEBM files: $($script:stats['.webm'])" }
        if ($script:stats['.mp4'] -gt 0) { $output += "- MP4 files: $($script:stats['.mp4'])" }
        $output += "- **Total videos: $videoCount**"
        $output += ""
    }

    # Scripts
    if ($script:stats['.ps1'] -gt 0) {
        $output += "**Scripts:**"
        $output += "- PowerShell scripts: $($script:stats['.ps1'])"
        $output += ""
    }

    # Other files
    if ($script:stats['other'] -gt 0) {
        $output += "**Other Files:**"
        $output += "- Other file types: $($script:stats['other'])"
        $output += ""
    }

    # Totals
    $output += "### Summary"
    $output += ""
    $output += "- **Total Files:** $($script:stats['total_files'])"
    $output += "- **Total Folders:** $($script:stats['total_folders'])"
    $output += "- **Total Items:** $($script:stats['total_files'] + $script:stats['total_folders'])"

    return $output
}

# Main script execution
Write-Host "Generating project structure..." -ForegroundColor Cyan

# Initialize the tree lines array
$script:treeLines = @()

# Get the root folder name
$rootFolder = Split-Path -Leaf (Resolve-Path $RootPath)

# Add markdown header
$script:treeLines += "# Project Structure"
$script:treeLines += ""
$script:treeLines += "## Directory Tree"
$script:treeLines += ""
$script:treeLines += "``````"
$script:treeLines += $rootFolder

# Generate the tree structure
Get-TreeStructure -Path $RootPath

# Add closing backticks
$script:treeLines += "``````"

# Add statistics
$script:treeLines += Format-Statistics

# Write to file
$script:treeLines | Out-File -FilePath $OutputFile -Encoding UTF8

Write-Host "✓ Project structure saved to: $OutputFile" -ForegroundColor Green
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host ("  HTML files: {0}" -f $script:stats['.html']) -ForegroundColor Gray
Write-Host ("  CSS files: {0}" -f $script:stats['.css']) -ForegroundColor Gray
Write-Host ("  JavaScript files: {0}" -f $script:stats['.js']) -ForegroundColor Gray
$imageSummary = $script:stats['.png'] + $script:stats['.jpg'] + $script:stats['.jpeg'] + $script:stats['.svg'] + $script:stats['.gif']
Write-Host ("  Images: {0}" -f $imageSummary) -ForegroundColor Gray
Write-Host ("  Total files: {0}" -f $script:stats['total_files']) -ForegroundColor Gray
Write-Host ("  Total folders: {0}" -f $script:stats['total_folders']) -ForegroundColor Gray