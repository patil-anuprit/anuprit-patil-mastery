# AGENTS.md — Board Mastery Architecture Guide

## Project Overview

Board Mastery is a **pure static site** — no build step, no framework, no npm dependencies at runtime. It's 5 HTML pages + 1 CSS file + 1 JS file. Deployed as-is on Netlify.

## Directory Structure

```
/
├── index.html          # Home page
├── planner.html        # Study Planner (full task manager)
├── notes.html          # Notes Hub (5 subjects, searchable)
├── quiz.html           # Quiz Zone (MCQ quizzes, scoring)
├── about.html          # About page + badges + contact
├── css/
│   └── style.css       # Complete design system (~900 lines)
├── js/
│   └── main.js         # Shared utilities (~200 lines)
├── netlify.toml        # Netlify config (publish = ".")
├── package.json        # Minimal (no dependencies)
└── README.md
```

## CSS Architecture (`css/style.css`)

- **CSS Variables** — All colors, shadows, spacing in `:root` and `[data-theme="dark"]`
- **No preprocessors** — Pure CSS3
- **Component-based** naming: `.btn`, `.card`, `.modal`, `.toast`, `.badge`, `.tab-btn`, etc.
- **Responsive** — Mobile-first using `@media (max-width: 768px/1024px/480px)`
- **Dark mode** — `[data-theme="dark"]` attribute on `<html>`, toggled by JS, persisted to `localStorage`

## JavaScript Architecture (`js/main.js`)

Shared utilities loaded on every page:

- `Theme` — dark/light mode with localStorage
- `Toast` — notification system
- `Streak` — study streak management with date comparison
- `initLoader()` — page load animation
- `initNavbar()` — active links, scroll shadow, hamburger menu, theme toggle
- `initScrollReveal()` — IntersectionObserver for `.reveal` elements
- `initCounters()` — animated number counters for `[data-count]`
- `initModals()` / `openModal()` / `closeModal()` — modal system
- `initCountdown()` — real-time countdown timer
- `initQuoteRotator()` — auto-rotating quotes
- `getBoardReadiness()` — composite score from tasks + quiz history + streak
- `QUOTES` array — 10 motivational quotes

## Per-Page JavaScript (inline `<script>` blocks)

Each page has its own inline script for page-specific logic:

- **planner.html** — Full CRUD task manager, goals, week grid, filters, sorting
- **notes.html** — Subject selector, search/filter across NOTES_DATA object
- **quiz.html** — Quiz state machine, MCQ rendering, scoring, history
- **about.html** — Badge system (15 badges), dashboard stats, contact form

## Data Storage (localStorage)

| Key | Description |
|-----|-------------|
| `bm_theme` | `'light'` or `'dark'` |
| `bm_tasks` | Array of task objects `{id, title, subject, priority, due, notes, completed}` |
| `bm_goals` | Daily goals array `{id, text, done}` |
| `bm_weekly_goals` | Weekly goals array |
| `bm_streak` | Number (integer) |
| `bm_streak_date` | Date string for streak calculation |
| `bm_quiz_history` | Array of `{subject, icon, score, total, date}` |
| `bm_badges` | Array of unlocked badge IDs |
| `bm_contact_messages` | Array of contact form submissions |

## Adding Content

**New quiz questions** — Add to `QUIZ_DATA` object in `quiz.html`. Each question: `{q, options: [], answer: index, explanation}`.

**New notes** — Add to `NOTES_DATA` object in `notes.html`. Structure: subject → sections[] → notes[]. Each note: `{title, type: 'formula'|'definition', content, tag}`.

**New achievement badges** — Add to `BADGES` array in `about.html`. Each: `{id, icon, name, desc, check: () => boolean}`.

## Design System

Brand colors:
- Primary: `#4f46e5` (indigo)
- Accent: `#f59e0b` (amber)
- Success: `#10b981` (emerald)
- Danger: `#ef4444` (red)

Gradients:
- `--grad-primary`: indigo → purple
- `--grad-hero`: dark navy (page headers and hero)
- `--grad-accent`: amber → red

Typography:
- Body: Inter (Google Fonts)
- Hero titles: Playfair Display (Google Fonts)

## Coding Conventions

- No TypeScript, no JSX, no build tools
- All styling via CSS classes, no inline styles except dynamic values
- `localStorage` as single source of truth for all user data
- Functions named `render*()` for UI updates, `save*()` for persistence
- Inline `<script>` at bottom of each HTML file for page logic
- `js/main.js` for shared, reusable utilities only
