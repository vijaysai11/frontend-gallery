# Bharat Yatra Hub — Multi-Destination Travel Website

Premium cinematic travel website with **3 destination packages**:
- 🏔️ **Manali** (3N 4D) — Deluxe / Super Deluxe / Luxury
- 🌸 **Kashmir** (4N 5D) — Paradise Escape
- ⛰️ **Shimla + Manali** (6N 7D) — Deluxe / Super Deluxe / Luxury

Pure HTML + CSS + JS. No frameworks, no build step.

---

## Folder Structure

```
himalayan-journeys/
├── index.html              ← Complete website
├── css/
│   └── style.css           ← All styles (mobile-first)
├── js/
│   └── main.js             ← All interactions
├── images/                 ← Download images here (see Step 1)
│   ├── hero-manali.jpg
│   ├── hero-kashmir.jpg
│   ├── hero-shimla.jpg
│   ├── para-valley.jpg
│   └── para-snow.jpg
├── download-images.sh      ← Image downloader (Mac/Linux)
└── README.md
```

---

## Quick Start

### Step 1 — Download Images

**Mac / Linux** — open Terminal in the folder:
```bash
bash download-images.sh
```

**Windows PowerShell** — paste this block:
```powershell
New-Item -ItemType Directory -Force -Path "images"
Invoke-WebRequest "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920&q=85" -OutFile "images\hero-manali.jpg"
Invoke-WebRequest "https://images.unsplash.com/photo-1619837374869-d1d6e78a5e4e?w=1920&q=85" -OutFile "images\hero-kashmir.jpg"
Invoke-WebRequest "https://images.unsplash.com/photo-1540202403-b7abd6747a18?w=1920&q=85" -OutFile "images\hero-shimla.jpg"
Invoke-WebRequest "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?w=1920&q=80" -OutFile "images\para-valley.jpg"
Invoke-WebRequest "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80" -OutFile "images\para-snow.jpg"
```

> **Own photos?** Replace any file with your own — just use the same filename.

### Step 2 — Open

Double-click `index.html` → opens in browser. Done.
No server, no npm, no installation needed.

---

## What's Inside

### Sections
| Section | What it does |
|---|---|
| Hero | Full-screen cinematic hero with auto-cycling background (Manali → Kashmir → Shimla) |
| Destinations | 3 destination cards — click to jump to that package |
| Packages | Tabbed view — switch between Manali / Kashmir / Shimla+Manali packages |
| Itinerary | Day-by-day tabs for all 3 destinations |
| Inclusions | Tab-switched inclusions + exclusions + payment policy |
| Booking | Full enquiry form with traveller counter |
| Footer | Links, tagline, legal note |

### Features
- ✅ Custom magnetic cursor (desktop)
- ✅ Mobile hamburger menu with slide-in overlay
- ✅ Scroll-reveal animations on all elements
- ✅ Tabbed destination switching (packages, itinerary, inclusions)
- ✅ Hero auto-cycles between 3 destination backgrounds every 5s
- ✅ Quick-book modal (triggered from package cards)
- ✅ Booking form with traveller counter + success state
- ✅ Toast notification on booking
- ✅ Parallax dividers
- ✅ Package card tilt on desktop hover
- ✅ Fully responsive — mobile, tablet, desktop

---

## Customization

### Change prices
Search in `index.html` for `₹5,500`, `₹5,999`, `₹7,000`, `₹9,000`, `₹10,500`, `₹12,500` and replace.

### Change company name
Find `Bharat Yatra Hub` in `index.html` (appears in nav, footer, and `<title>`).

### Connect booking to WhatsApp / email
In `js/main.js`, find `window.submitModal` and `window.submitBooking`:
```js
// WhatsApp example
const msg = encodeURIComponent(`Booking: ${dest} · ${tier} · ${name} · ${phone}`);
window.open(`https://wa.me/91XXXXXXXXXX?text=${msg}`, '_blank');

// Email example
window.location.href = `mailto:you@domain.com?subject=Booking Request&body=${msg}`;
```

### Add your own destination images
Replace files in `images/` with your own photos using the same filenames.

### Change gold accent color
In `css/style.css`, find `#c9a96e` and replace with your brand color. It appears ~40 times.

### Add a new destination package
1. Add a new `.dest-card` in the Destinations section
2. Add a new `.pkg-panel` with id `panel-yourname`
3. Add a new tab button calling `switchDest('yourname', this)`
4. Do the same for itinerary (`itin-yourname`) and inclusions (`inc-yourname`)

---

## Hosting (Free)

**Netlify (easiest):**
1. Go to [netlify.com](https://netlify.com) — sign up free
2. Drag the `himalayan-journeys/` folder onto the deploy zone
3. Your site is live with a public HTTPS URL in ~30 seconds

**GitHub Pages:**
1. Push the folder to a GitHub repo
2. Settings → Pages → Deploy from branch → main
3. Live in ~2 minutes

---

## Browser Support

| Browser | Version |
|---|---|
| Chrome / Edge | 90+ |
| Firefox | 88+ |
| Safari (iOS) | 14+ |
| Samsung Internet | 14+ |

---

*All Unsplash images are free for commercial use under the Unsplash License.*
*Replace with your own photography when going live.*
