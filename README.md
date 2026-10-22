# FrameKatha — "Every Frame Tells a Story."

**FrameKatha** is a modern, high-performance creative studio website designed for visual storytelling, cinematic photography, digital art, color grading, poster design, high-CTR thumbnails, and 4K video editing.

---

## 🌟 Brand Identity & Concept

- **Brand Name:** FrameKatha
- **Tagline:** *"Every Frame Tells a Story."*
- **Founder & Creative Director:** Paras Aware
- **Aesthetic:** Dark, editorial, cinematic, emotionally engaging, and refined.
- **Audience:** Creators, brands, artists, filmmakers, and individuals looking for distinctive visual media.

---

## ⚡ Core Features & Structure

1. **Cinematic Hero (`/`)**
   - Full-screen composition with glowing ambient particle optics (`ThreeCanvas`).
   - FrameKatha wordmark and brand concept.
   - Primary CTA: *"Explore the Gallery"*.
   - Secondary CTA: *"Let's Create Something"*.
   - Responsive floating category tags that filter the gallery on click.

2. **The Katha Gallery (`/portfolio`)**
   - 6 Core Categories: Photography, Digital Art, Photo Editing, Poster Design, Thumbnail Design, Video Editing.
   - Fullscreen Lightbox viewer with keyboard controls (`ArrowLeft`, `ArrowRight`, `Escape`), touch-friendly gestures, aspect ratio preservation, and image captions.
   - Search by title, keyword, camera, or software tool.
   - Sort by latest, oldest, most viewed, or featured.

3. **Services & Pricing (`/services` and `/pricing`)**
   - Transparent starting prices:
     1. **Photography** — ₹700 (Starting rate)
     2. **Digital Art** — ₹600 (Starting rate)
     3. **Photo Editing** — ₹150 per photo
     4. **Poster Design** — ₹400 (Starting rate)
     5. **Thumbnail Design** — ₹50 (Starting rate)
     6. **Video Editing** — ₹150 per 5 minutes of video duration (Pricing basis)
   - High-resolution visual preview for each discipline.
   - Direct WhatsApp and Email consultation buttons (no forced checkout, no booking gates).

4. **FrameKatha Creative Lab**
   - Interactive Before & After color grading slider (`BeforeAfterSlider`) showing flat RAW vs graded master.
   - Cinematic Multi-Reel Showcase video player with automatic scroll autoplay and controls (`ShowcaseVideoSection`).

5. **The Creative Process**
   - 5-step collaborative workflow:
     1. *Discuss the Idea*
     2. *Understand the Creative Direction*
     3. *Produce or Edit the Visual Work*
     4. *Review the Result Together*
     5. *Deliver the Agreed Final Work*

6. **Direct Contact Channels (`/contact`)**
   - Direct WhatsApp message with prefilled brief.
   - Direct Email mailto link (`parasaware05@gmail.com`).
   - Social links: Instagram, GitHub, LinkedIn, YouTube.
   - Form submission with client-side validation and immediate feedback.

---

## 📁 Project Architecture & Key Files

```
framekatha/
├── index.html                     # HTML5 entry with Open Graph & SEO metadata
├── src/
│   ├── config/
│   │   └── site.ts               # SINGLE CENTRAL CONFIG: Contact, prices, services, process
│   ├── components/
│   │   ├── SiteNav.tsx           # Sticky responsive navigation & mobile drawer
│   │   ├── SiteLayout.tsx        # Ambient gradient background, FAB, back-to-top, footer
│   │   ├── ThreeCanvas.tsx       # Lightweight Three.js particle canvas
│   │   ├── BeforeAfterSlider.tsx # Interactive RAW vs Graded slider
│   │   ├── ShowcaseVideoSection.tsx # Scroll autoplay 4K multi-reel video stage
│   │   └── QRCodeModal.tsx       # Shareable QR code modal for mobile testing
│   ├── lib/
│   │   └── api.ts                # Client API & offline embedded project database
│   ├── routes/
│   │   ├── home.tsx              # Homepage
│   │   ├── portfolio.tsx         # Katha Gallery with Fullscreen Lightbox
│   │   ├── project-detail.tsx    # Individual project story and album view
│   │   ├── services.tsx          # 6 Services & exact starting prices
│   │   ├── pricing.tsx           # Route alias pointing to services
│   │   ├── about.tsx             # Brand philosophy, founder intro, tools & process
│   │   └── contact.tsx           # Direct WhatsApp, Email & validated inquiry form
│   ├── main.tsx                  # App entry & client routing
│   └── index.css                 # Tailwind CSS 4 & dark theme rules
└── public/
    ├── logo.png                  # FrameKatha brand emblem
    └── videos/                   # Local optimized 4K MP4 showcase reels
```

---

## 🛠️ How to Update Content

### 1. Update Contact Details, Prices & Services
Edit `src/config/site.ts`:
- Change `siteConfig.contact.email` or `siteConfig.contact.whatsappNumber`.
- Change any service price, description, or sample image in `siteConfig.services`.
- Change the 5-step process in `siteConfig.creativeProcess`.

### 2. Add or Modify Gallery Projects
Edit `DEFAULT_PROJECTS` in `src/lib/api.ts` or add new projects with:
- `title`, `slug`, `category`, `description`, `images`, `thumbnail`, `year`, `location`.

---

## 🚀 Build & Deployment

### Local Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

### Static Host Fallback (Surge / Netlify)
Ensure `dist/200.html` exists for client-side SPA routing:
```bash
Copy-Item "dist/index.html" -Destination "dist/200.html" -Force
```

### Deploy to Surge
```bash
npx surge dist framekatha-studio.surge.sh
```

---

© 2026 FrameKatha. Created with passion by **Paras Aware**.
