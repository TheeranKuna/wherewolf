# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page, **pre-launch teaser/waitlist landing site** for *Wherewolf* — a mobile social-deduction game ("a game of deception, ritual and the long night"). It is plain static HTML/CSS/JS with **no build system, no package manager, no framework, and no backend**. The current page is internally labeled "Direction A — The Summoning."

## Running / developing

There is nothing to build, lint, or test. Open `index.html` directly in a browser, or serve the folder statically so the relative font/image paths and `fetch`-free assets load cleanly, e.g.:

```bash
python -m http.server 8000   # then open http://localhost:8000
```

Edit a file and refresh — that is the entire dev loop.

## Architecture

**Load order is load-bearing.** `index.html` pulls scripts in a fixed sequence and behaviors assume prior globals exist:

1. `roles.js` — pure data layer. Defines `window.WW_FACTIONS` (the 4 factions) and `window.WW_ROLES` (27 roles), plus `window.WW_ASSET` path helpers. No DOM, no side effects.
2. `common.js` — shared behaviors used by every "direction": sticky-nav scroll state, `.reveal` scroll-in via `IntersectionObserver`, and `window.WW.factionColor(key)`.
3. `teaser.js` — teaser-specific behaviors, depends on the two above: waitlist capture, share row, ember particles, and the deck marquee builder.

**Data is the single source of truth.** The factions grid (`#factions-grid`) and the deck marquee (`.deck-track[data-marquee]`) are **built at runtime** by reading `WW_FACTIONS` / `WW_ROLES`. The marquee respects an explicit `data-order="id,id,..."` attribute and duplicates its track once for a seamless `-50%` CSS loop. So:
- **To add/change a role:** edit `roles.js` *and* drop a matching `cards/<id>.jpg` (the `id` field maps directly to the filename via `WW_ASSET.card`). Do not hand-edit role markup in `index.html` — there is none to edit.
- The faction counts shown on the page (e.g. the "5 Werewolves · 3 Vampires · …" footer line) are currently **hardcoded in `index.html`** while the grid tiles read `count` from `WW_FACTIONS`. Keep both in sync when role counts change.

**CSS cascade is a deliberate three-layer system** (later layers override earlier):
1. `colors_and_type.css` — design tokens only: `@font-face` declarations and the `:root { --ww-* }` variables (palette, type, spacing, radii, shadows). Everything else references these tokens; avoid hardcoding colors/sizes.
2. `site.css` — `@import`s the tokens, then adds web-scale base/layout: reset, nav, footer, store badges, Material Symbols.
3. `teaser.css` — teaser components layered on top: waitlist pill, share row, ember atmosphere, deck cards.
4. Page-specific "Direction A" styles live in an inline `<style>` block inside `index.html` (hero, sections, finale).

**Provenance:** The web tokens and role data are ports of a companion Flutter app — `colors_and_type.css` is derived from `lib/theme/app_theme.dart` and `roles.js` from `lib/models/role_data.dart`. Those Dart sources are **not in this repo**. Note `WW_ASSET.cardFull` / `WW_ASSET.badge` point at `../assets/roles/...` (the Flutter app's assets) and are unused by this site, which only uses `WW_ASSET.card` → `cards/<id>.jpg`.

## Things to know before changing behavior

- **The waitlist and share actions are mocked, client-side only.** Submitting the form just validates the email with a regex and sets `localStorage['ww_waitlist']`, then flips the `.waitlist.done` state — there is no network call or storage. Share buttons open intent URLs or copy hardcoded links (`https://wherewolf.app`, `https://discord.gg/wherewolf`). Wiring a real backend means adding the fetch in `teaser.js`'s submit handler.
- There are **two waitlist forms** (hero `#join` and finale) and **two store-badge rows**; both run through the same `.waitlist` / `.share` class hooks, so changes apply to both at once.
- Fonts: **Cinzel** = display (`--ww-font-display`), **Inter** = body, **FiraCode** = mono. Material Symbols is loaded from Google Fonts CDN (the only external dependency).
