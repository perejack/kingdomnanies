# Download external images locally

# Create assets directory
$assetsDir = "public\assets"
if (-not (Test-Path $assetsDir)) {
    New-Item -ItemType Directory -Path $assetsDir -Force
    Write-Host "Created directory: $assetsDir"
}

# Download images
Write-Host "Downloading images..."

try {
    Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80" -OutFile "public\assets\kenya-hero-image.jpg"
    Write-Host "Downloaded: kenya-hero-image.jpg"
} catch {
    Write-Host "Failed: kenya-hero-image.jpg"
}

try {
    Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=800&q=80" -OutFile "public\assets\caregiver-image.jpg"
    Write-Host "Downloaded: caregiver-image.jpg"
} catch {
    Write-Host "Failed: caregiver-image.jpg"
}

try {
    Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80" -OutFile "public\assets\housekeeper-image.jpg"
    Write-Host "Downloaded: housekeeper-image.jpg"
} catch {
    Write-Host "Failed: housekeeper-image.jpg"
}

try {
    Invoke-WebRequest -Uri "https://images.unsplash.com/photo-1587556930799-e988e5968d19?w=800&q=80" -OutFile "public\assets\nanny-image.jpg"
    Write-Host "Downloaded: nanny-image.jpg"
} catch {
    Write-Host "Failed: nanny-image.jpg"
}

try {
    Invoke-WebRequest -Uri "https://namati.org/wp-content/uploads/2023/03/ProfilePicturePhoto-Wanjiku-Mwangi.jpg" -OutFile "public\assets\testimonial-1.jpg"
    Write-Host "Downloaded: testimonial-1.jpg"
} catch {
    Write-Host "Failed: testimonial-1.jpg"
}

try {
    Invoke-WebRequest -Uri "https://www.afritech.xyz/uploads/1/2/0/0/120003203/akinyi-headshot-cropped_1_orig.jpg" -OutFile "public\assets\testimonial-2.jpg"
    Write-Host "Downloaded: testimonial-2.jpg"
} catch {
    Write-Host "Failed: testimonial-2.jpg"
}

try {
    Invoke-WebRequest -Uri "https://static.wixstatic.com/media/f66537_2cc9e23c5d7a49bda01da08bd46c4d84~mv2.png/v1/fill/w_376,h_376,al_c/CLARA%20MUTHONI%20NJERU.png" -OutFile "public\assets\testimonial-3.png"
    Write-Host "Downloaded: testimonial-3.png"
} catch {
    Write-Host "Failed: testimonial-3.png"
}

Write-Host "Download complete!"
