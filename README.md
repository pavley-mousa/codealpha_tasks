# Pavley Mousa Portfolio

A responsive personal portfolio built with semantic HTML, CSS, and vanilla JavaScript.

## Features

- Responsive desktop, tablet, and mobile layout
- **Arabic / English** language switch with full RTL support
- **Full portfolio control panel** stored in localStorage
- Editable site identity, subtitle, logo, accent color, Hero, About, Contact, email, location, social links, theme, and footer
- **Skills manager** — add, edit, delete, and reorder skills in both languages
- **Projects manager** — add, edit, delete, reorder, feature/unfeature projects, edit tech stacks, URLs, icons, labels, and notes in both languages
- **Training manager** — add, edit, delete, and reorder training/certification/community entries in both languages
- Draft changes stay inside the settings panel until **Save changes**
- Reset restores the complete default portfolio content and settings
- Dark / light theme
- Accessible mobile navigation with Escape support
- Active section highlighting while scrolling
- Scroll progress indicator
- Responsive reveal animations with reduced-motion support
- Clipboard email action with browser fallback
- Back-to-top control
- SEO and Open Graph metadata that follow the selected language
- Custom SVG favicon

## Featured projects

- **Bevo Stickers** — https://github.com/pavley-mousa/Bevo-stickers
- **Music Player** — https://github.com/pavley-mousa/codealpha_tasks_Music_Player
- **Image Gallery** — https://github.com/pavley-mousa/codealpha_tasks_image_gallery
- **Interactive Calculator** — portfolio practice project

## How content control works

Open the **gear icon** in the top navigation.

General settings control the site identity and page-level text. The Content Manager then lets you switch between **Skills**, **Projects**, and **Training** and manage each item with **Add, Edit, Delete, Move Up, and Move Down**.

All data is stored in the visitor's browser with `localStorage`. This is a client-side portfolio control system, not a secure server-side admin dashboard.

## Tech stack

HTML5  
CSS3  
Vanilla JavaScript  
Font Awesome  
Google Fonts

## Run locally

Open `index.html` in a browser, or serve the folder with a static web server such as VS Code Live Server.

## Syntax check

```bash
npm test
```

The test script runs Node's built-in JavaScript syntax checker. No npm dependencies are required.

## Project structure

- `index.html` — page structure, portfolio sections, and settings UI
- `style.css` — responsive visual system and content-manager styling
- `script.js` — bilingual content, persistence, CRUD/reordering, navigation, theme, scrolling UI, and clipboard logic
- `favicon.svg` — custom favicon
- `404.html` — fallback page
- `package.json` — syntax-check script
