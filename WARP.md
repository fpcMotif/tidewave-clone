# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a React + TypeScript clone of the Tidewave AI website, built with Vite. The project is designed to showcase a coding agent platform for full-stack web development. It was originally created for AI Studio deployment.

**Key characteristics:**
- Single-page application with hash-based routing (no React Router)
- Tailwind CSS loaded via CDN (configured in index.html)
- Uses OKLCH color system for theming
- No backend server required

## Development Commands

### Setup
```bash
npm install
```

Before running, ensure you have a `.env.local` file with:
```
GEMINI_API_KEY=your_api_key_here
```

### Development
```bash
npm run dev
```
Starts Vite dev server on port 3000 (configured in vite.config.ts)

### Build
```bash
npm run build
```
Creates production build in `dist/` directory

### Preview
```bash
npm run preview
```
Preview production build locally

## Architecture

### Routing
- **Manual hash-based routing** implemented in `App.tsx`
- No React Router dependency
- Routes are handled via `window.location.hash`
- Supported routes:
  - `#/` → HomePage
  - `#/install` → InstallPage

### File Structure
```
├── App.tsx                  # Main app component with routing logic
├── index.tsx                # React entry point
├── index.html               # HTML template with Tailwind CDN + custom styles
├── components/
│   ├── Header.tsx          # Sticky header with mobile drawer navigation
│   ├── Footer.tsx          # Footer with company info and links
│   └── icons.tsx           # RemixIcon React components
├── pages/
│   ├── HomePage.tsx        # Landing page with features, videos, FAQ
│   └── InstallPage.tsx     # Installation guide page
└── vite.config.ts          # Vite config with env var injection
```

### Styling System
- **Tailwind CSS** via CDN (not installed as dependency)
- Custom OKLCH color tokens defined in index.html:
  - `--background`, `--foreground`
  - `--card`, `--card-foreground`
  - `--primary`, `--primary-foreground`, `--secondary`
  - `--muted`, `--muted-foreground`
  - `--border`
- Custom utility classes: `.bg-hero`, `.bg-grainy`, `.animated-text-gradient`
- Tailwind config extended inline via `<script>` tag in index.html

### Components

**Header.tsx**
- Sticky navigation with scroll behavior
- Desktop center-aligned nav links
- Mobile drawer menu
- Handles scroll state for UI transitions

**Footer.tsx**
- Static footer with company info
- External links to documentation, Discord, GitHub
- Legal links (Terms, Privacy)

**VideoPlayer Pattern**
- Custom component using IntersectionObserver
- Auto-plays videos when 50% visible
- Pauses and resets when out of view
- Used in HomePage features section

### Environment Variables
- `GEMINI_API_KEY` injected at build time via vite.config.ts
- Available as `process.env.GEMINI_API_KEY` in code
- Must be set in `.env.local` (not tracked in git)

### Page Transitions
Both pages accept `isStarting` prop for initial load animations. This creates a fade-in/scale effect on first render.

## Development Notes

### Adding New Routes
1. Add route case in `App.tsx` `renderPage()` switch
2. Create page component in `pages/` directory
3. Update Header.tsx navLinks if needed

### Styling Changes
- Global styles and color tokens → edit `index.html` `<style>` tag
- Tailwind configuration → edit `index.html` `<script>` with `tailwind.config`
- Component styles → use Tailwind utility classes inline

### Asset URLs
External assets are hosted on tidewave.ai CDN. If replacing assets, update URLs in components or move to local public directory and update Vite config.

### TypeScript Configuration
- Target: ES2022
- Module: ESNext with bundler resolution
- Path alias: `@/*` maps to project root
- JSX: react-jsx (no React import needed)
- `noEmit: true` (Vite handles transpilation)

### No Test Framework
This project does not include testing infrastructure. If adding tests, configure Jest or Vitest first.

### No Linting/Formatting
No ESLint or Prettier configuration present. Code style follows standard TypeScript/React conventions.
