# Wherewolf — Pre-Launch Teaser Site

A single-page **teaser / waitlist landing site** for *Wherewolf*, a mobile social-deduction game — "a game of deception, ritual and the long night." The current layout is internally labeled **Direction A — The Summoning**.

It is plain static **HTML / CSS / JS**: no build system, no package manager, no framework, and no backend (waitlist signups POST directly to a hosted Kit form).

## Quick start

There is nothing to build, lint, or test. Either open `index.html` directly in a browser, or — preferred, so relative font/image paths resolve cleanly — serve the folder statically:

```bash
python -m http.server 8000   # then open http://localhost:8000
```

Edit a file and refresh. That's the whole dev loop.

## Project layout

```
index.html            Markup + inline "Direction A" page styles (hero, sections, finale)
roles.js              Data layer — WW_FACTIONS (4), WW_ROLES (27), WW_ASSET path helpers
common.js             Shared behaviors — sticky nav, scroll reveals, WW.factionColor()
teaser.js             Teaser behaviors — waitlist capture, share row, embers, deck marquee
colors_and_type.css   Design tokens — @font-face + :root --ww-* variables
site.css              Base/layout — reset, nav, footer, store badges, Material Symbols
teaser.css            Teaser components — waitlist pill, share row, embers, deck cards
cards/<id>.jpg        One role-card image per role id
fonts/                Cinzel (display), Inter (body), FiraCode (mono)
hero.jpg              Hero background art
```

## How it works

**Load order is load-bearing.** `index.html` loads scripts in a fixed sequence and each one assumes the previous globals exist:

1. **`roles.js`** — pure data, no DOM, no side effects. Sets `window.WW_FACTIONS`, `window.WW_ROLES`, `window.WW_ASSET`.
2. **`common.js`** — shared behaviors; exposes `window.WW.factionColor(key)`.
3. **`teaser.js`** — teaser behaviors; depends on the two above.

**Data is the single source of truth.** The factions grid (`#factions-grid`) and the deck marquee (`.deck-track[data-marquee]`) are **built at runtime** from `WW_FACTIONS` / `WW_ROLES`. The marquee honors an explicit `data-order="id,id,…"` attribute and duplicates its track for a seamless `-50%` CSS loop.

**CSS is a deliberate three-layer cascade** (later layers override earlier): tokens (`colors_and_type.css`) → base/layout (`site.css`) → teaser components (`teaser.css`) → page-specific styles in the inline `<style>` block in `index.html`. Reference the `--ww-*` tokens instead of hardcoding colors/sizes.

## Common changes

- **Add or change a role:** edit `roles.js` **and** drop a matching `cards/<id>.jpg` (the role `id` maps directly to the filename via `WW_ASSET.card`). There is no role markup in `index.html` to edit — it's all generated.
- **Faction counts:** the grid tiles read `count` from `WW_FACTIONS`, but the footer summary line (e.g. "5 Werewolves · 3 Vampires · …") is **hardcoded in `index.html`**. Keep both in sync.

## Waitlist & sharing

- **The waitlist is live via Kit (ConvertKit).** Both forms (hero `#join` and the finale) POST `email_address` to the public form endpoint in the `KIT_FORM_ENDPOINT` constant at the top of `teaser.js`. Kit returns **HTTP 200 even on failure**, so the handler branches on the JSON `status` field (`'failed'` = error), not `res.ok`.
- **Double opt-in is enabled in Kit** — subscribers must confirm via email before they're on the list, which is why the success seal says "check your inbox." Turn off double opt-in in the Kit form settings to make signup instant.
- `localStorage['ww_waitlist']` is only a "don't ask twice" flag that re-shows the success seal for returning visitors.
- **Share actions are client-side only** — buttons open intent URLs or copy hardcoded links (`https://wherewolf.app`, `https://discord.gg/wherewolf`) defined in `teaser.js`.

## Fonts & dependencies

Self-hosted from `fonts/`: **Cinzel** (display, `--ww-font-display`), **Inter** (body), **FiraCode** (mono). The only external dependency is **Material Symbols**, loaded from the Google Fonts CDN.

## Provenance

The web tokens and role data are ports of a companion Flutter app: `colors_and_type.css` derives from `lib/theme/app_theme.dart` and `roles.js` from `lib/models/role_data.dart`. Those Dart sources are **not in this repo**. The `WW_ASSET.cardFull` / `WW_ASSET.badge` helpers point at the Flutter app's assets (`../assets/roles/…`) and are **unused** here — this site only uses `WW_ASSET.card` → `cards/<id>.jpg`.
