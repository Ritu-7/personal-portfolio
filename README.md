# Ritika's Portfolio — Premium 2026 Edition

A modern, full-stack personal portfolio built with React, Vite, Tailwind CSS, Framer Motion, and Supabase.

## Features

### Frontend
- **Modern glassmorphism UI** with a professional cyan/violet gradient palette
- **Dark / Light mode** with system preference detection and persistence
- **Framer Motion animations** — scroll reveals, staggered entrances, animated counters, page transitions
- **Fully responsive** — mobile, tablet, and desktop breakpoints
- **Accessibility (WCAG)** — semantic HTML, ARIA labels, focus-visible rings, keyboard navigation
- **SEO optimized** — meta tags, Open Graph, Twitter cards, JSON-LD structured data, sitemap, robots.txt
- **Code splitting** — admin route and vendor chunks lazy-loaded

### Sections
1. **Hero** — animated typing roles, CTAs, social icons, resume download, profile image with floating animation
2. **About** — career objective, interests, technologies, animated stat counters
3. **Skills** — categorized cards (Frontend, Backend, Database, AI/ML, Tools) with animated progress bars
4. **Experience** — interactive alternating timeline with achievements and tags
5. **Projects** — searchable, filterable cards with detailed modal, tech badges, GitHub & demo links
6. **Certifications** — certificate cards with organization, date, credential ID, verify link
7. **Achievements** — coding profiles (LeetCode, GFG, GitHub, HackerRank) and awards
8. **Contact** — validated form wired to Supabase, contact info, social links
9. **Footer** — quick links, socials, copyright, scroll-to-top button

### Backend (Supabase)
- **Contact API** — form submissions stored in `contacts` table
- **Admin Authentication** — Supabase email/password auth with JWT sessions
- **Content Management** — CRUD for projects, skills, experience, certifications
- **Analytics** — tracks portfolio visits, contact requests, resume downloads
- **Admin Dashboard** — visit `#admin` to sign in and view stats, recent messages, and content tables
- **Row Level Security** — public read for published content, admin-only writes

## Tech Stack
- React 18 + Vite 5
- Tailwind CSS 3
- Framer Motion 11
- Supabase (Postgres + Auth)
- React Icons

## Getting Started

The dev server runs automatically. To build for production:

```bash
npm install
npm run build
npm run preview
```

## Admin Access

Navigate to `/#admin` to access the admin dashboard. On first visit, sign up with an email and password (Supabase auth). Once authenticated, you can view dashboard statistics, recent messages, and manage content via the Supabase dashboard.

## Project Structure
```
├── index.html              # Entry HTML with SEO meta + JSON-LD
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── resume.txt          # Replace with actual resume PDF
├── src/
│   ├── main.jsx
│   ├── App.jsx             # Hash-based routing (portfolio / #admin)
│   ├── index.css           # Tailwind + design system
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   ├── SupabaseContext.jsx
│   │   └── AuthContext.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Section.jsx
│   │   ├── Background.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── TypingText.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Certifications.jsx
│   │   ├── Achievements.jsx
│   │   └── Contact.jsx
│   ├── admin/
│   │   ├── AdminLogin.jsx
│   │   └── AdminDashboard.jsx
│   └── data/
│       └── portfolio.js    # All portfolio content
└── portfolio ritika/       # Original static site (preserved)
```

## Database Schema (Supabase)
- `contacts` — contact form submissions
- `projects` — portfolio projects
- `skills` — skill groups with items
- `experience` — career timeline
- `certifications` — certificates
- `analytics` — visit/download tracking

All tables have RLS enabled: public read for published content, public insert for contacts/analytics, admin (authenticated) full CRUD.

---
Built with React, Tailwind & Framer Motion.
