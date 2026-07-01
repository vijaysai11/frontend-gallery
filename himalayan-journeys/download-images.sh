#!/bin/bash
# ================================================
# Bharat Yatra Hub — Image Downloader
# Run once after extracting the zip
# Usage: bash download-images.sh
# ================================================

echo "Downloading images for Bharat Yatra Hub..."
mkdir -p images

# ── Hero backgrounds ──────────────────────────────────────
curl -L "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=85" \
  -o images/hero-manali.jpg && echo "✓ hero-manali.jpg"

curl -L "https://images.unsplash.com/photo-1619837374869-d1d6e78a5e4e?w=1920&q=85" \
  -o images/hero-kashmir.jpg && echo "✓ hero-kashmir.jpg"

curl -L "https://images.unsplash.com/photo-1540202403-b7abd6747a18?w=1920&q=85" \
  -o images/hero-shimla.jpg && echo "✓ hero-shimla.jpg"

# ── Parallax dividers ──────────────────────────────────────
curl -L "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=1920&q=80" \
  -o images/para-valley.jpg && echo "✓ para-valley.jpg"

curl -L "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80" \
  -o images/para-snow.jpg && echo "✓ para-snow.jpg"

echo ""
echo "All 5 images downloaded successfully!"
echo "Open index.html in your browser to preview the site."
