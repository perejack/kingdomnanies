# PowerShell script to download external images locally
# This helps avoid Google Ads Compromised site issues from hotlinked images

# Create assets directory if it doesn't exist
$assetsDir = "public\assets"
if (-not (Test-Path $assetsDir)) {
    New-Item -ItemType Directory -Path $assetsDir -Force
    Write-Host "Created directory: $assetsDir" -ForegroundColor Green
}

# Define images to download
$images = @(
    @{
        Url = "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80"
        Output = "public\assets\kenya-hero-image.jpg"
        Description = "Kenya Hero Image"
    },
    @{
        Url = "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=800&q=80"
        Output = "public\assets\caregiver-image.jpg"
        Description = "Caregiver Image"
    },
    @{
        Url = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
        Output = "public\assets\housekeeper-image.jpg"
        Description = "Housekeeper Image"
    },
    @{
        Url = "https://images.unsplash.com/photo-1587556930799-e988e5968d19?w=800&q=80"
        Output = "public\assets\nanny-image.jpg"
        Description = "Nanny Image"
    },
    @{
        Url = "https://namati.org/wp-content/uploads/2023/03/ProfilePicturePhoto-Wanjiku-Mwangi.jpg"
        Output = "public\assets\testimonial-1.jpg"
        Description = "Testimonial 1 - Grace Wanjiku"
    },
    @{
        Url = "https://www.afritech.xyz/uploads/1/2/0/0/120003203/akinyi-headshot-cropped_1_orig.jpg"
        Output = "public\assets\testimonial-2.jpg"
        Description = "Testimonial 2 - Mary Akinyi"
    },
    @{
        Url = "https://static.wixstatic.com/media/f66537_2cc9e23c5d7a49bda01da08bd46c4d84~mv2.png/v1/fill/w_376,h_376,al_c/CLARA%20MUTHONI%20NJERU.png"
        Output = "public\assets\testimonial-3.png"
        Description = "Testimonial 3 - Jane Muthoni"
    }
)

# Download each image
Write-Host "`nDownloading images..." -ForegroundColor Cyan
Write-Host "==========================================`n" -ForegroundColor Cyan

$successCount = 0
$failCount = 0

foreach ($image in $images) {
    try {
        Write-Host "Downloading: $($image.Description)..." -ForegroundColor Yellow
        Invoke-WebRequest -Uri $image.Url -OutFile $image.Output -ErrorAction Stop
        Write-Host "  ✓ Success: $($image.Output)" -ForegroundColor Green
        $successCount++
    }
    catch {
        Write-Host "  ✗ Failed: $($image.Description)" -ForegroundColor Red
        Write-Host "    Error: $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
    Start-Sleep -Milliseconds 500
}

Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "Download Summary:" -ForegroundColor Cyan
Write-Host "  Success: $successCount" -ForegroundColor Green
Write-Host "  Failed: $failCount" -ForegroundColor Red
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "  1. Update src/pages/Index.tsx to use local images" -ForegroundColor White
Write-Host "  2. Remove external image URLs from the code" -ForegroundColor White
Write-Host "  3. Test the site to ensure images load correctly" -ForegroundColor White
Write-Host "  4. Redeploy and request Google Ads review" -ForegroundColor White
