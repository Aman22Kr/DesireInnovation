# DesireInnovation

A multi-page demo website for a fictional design and innovation studio, built as a static single-page app.

**Stack:** Vite · React · JavaScript (JSX) · Tailwind CSS v4 · React Router (hash routing) · Lucide React · Framer Motion

> **Status:** the source was written without network access, so it has **not yet been installed, built or tested**. Follow "Verify locally" below before deploying. Dependency versions in `package.json` were chosen by hand and `package-lock.json` has not been generated yet; `npm install` will create it.

## What this site is

DesireInnovation is an original demo site, not a real business. It is a practice build showing a complete studio website: Home, About, Services (with detail pages), Work (with detail pages), Journal (with article pages), FAQ, Contact, Search, Saved, Project basket, Settings and a 404 page. The design is its own: warm paper tones, a terracotta accent, Fraunces and Inter type, hard borders and offset shadows. It is not a copy of any other website.

All projects, clients, prices, team members and reviews are **fictional sample data** (`src/data/index.js`).

## Features

- Global search overlay (press `/`) with live results, recent searches, and a full results page with type filters and sorting. Query parameters are kept in the URL.
- Category filters and sorting on Services and Work; filter and search on Journal and FAQ.
- Favourites, recently viewed items, project basket, theme, animation settings, search history and contact-form drafts persisted in `localStorage`.
- Animation controls (speed: slow, normal, fast, off; intensity: subtle, medium, strong). Default is **normal speed, strong intensity**. `prefers-reduced-motion` is always respected.
- Blank square placeholders where video or YouTube thumbnails would go.
- A small placeholder ad strip at the bottom of every page (no ad network connected).
- Placeholder artwork generated as inline SVG, so no image can break. Replace it with real photos by editing the `image` fields in `src/data/index.js`.

## Quick settings

Edit `src/config.js` for the brand name, tagline, contact details, default animation settings and ad strip toggle. Replace the content in `src/data/index.js` to reuse the project for another site.

## Run locally

```bash
npm install
npm run dev
```

## Verify locally

```bash
npm run build
npm run preview
```

Then check: every route, refreshing on a detail page, search and filters, that favourites and the basket survive a refresh, and the layout at desktop, tablet and phone widths.

To test with an absolute repository base path:

```bash
VITE_BASE=/your-repo-name/ npm run build
npm run preview
```

## Deploy to GitHub Pages (GitHub Actions)

Deployment uses the workflow in `.github/workflows/deploy.yml`. No `gh-pages` package is used.

1. Create a repository under your GitHub account (for example `Aman22kr/desireinnovation`).
2. Push the project:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Aman22kr/desireinnovation.git
git push -u origin main
```

3. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
4. The workflow runs on every push to `main` (or run it manually from the **Actions** tab). Your site appears at `https://aman22kr.github.io/desireinnovation/`.

The workflow needs the permissions it already declares (`contents: read`, `pages: write`, `id-token: write`). If your organisation restricts workflow permissions, allow them under **Settings → Actions → General**.

### Why the routes work on GitHub Pages

The app uses hash routing (`/#/portfolio`). GitHub Pages cannot rewrite URLs on the server, but a hash route always loads `index.html`, so direct links and page refreshes work. The default Vite base is `./` (relative), so CSS, JavaScript and assets resolve under any repository name. Set `VITE_BASE` only if you want an absolute base.

## Demo limitations

- **localStorage is per browser and per device.** Saved data does not sync across devices and is not a user account. Clearing browser data removes it. You can clear it from **Settings**.
- The contact form and project basket are demos. They save entries in your browser only; **nothing is sent to a server**, no payment is taken and no booking is made.
- No passwords, authentication secrets or payment details are stored.
- Prices, reviews, clients and results are fictional.
- The ad strip is a placeholder only.
- Fonts (Fraunces, Inter) load from Google Fonts; offline, the site falls back to Georgia and system sans-serif.

## Project structure

```
src/
  App.jsx, main.jsx, index.css, config.js
  components/   Layout, Header, Footer, SearchOverlay, AdStrip, Reveal, ui
  context/      AppContext (localStorage-backed app state)
  data/         Mock content and search catalogue
  hooks/        useLocalStorage, usePageTitle
  pages/        One file per route
  utils/        storage, motion, search, placeholder artwork
```
