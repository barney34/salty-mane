# Design System — The Salty Mane

## Brand Identity
Coastal luxury. Effortless, sun-kissed, elevated.
Think warm sand, salt air, ocean depth — not cold/clinical.

---

## Color Palette

### Primary
- `salty-sand`: `#C9A96E` — warm golden sand (CTAs, accents)
- `salty-deep`: `#1A1A2E` — deep navy/midnight (headers, primary text)
- `salty-ocean`: `#4A7FA5` — muted coastal blue (links, accents)

### Neutral
- `salty-cream`: `#FAF7F2` — warm off-white (backgrounds)
- `salty-driftwood`: `#8B7355` — warm brown/driftwood (secondary text)
- `salty-shell`: `#F0EBE3` — light shell (card backgrounds)

### Semantic
- `salty-coral`: `#D4846A` — warm coral (hover, badges)
- `salty-sage`: `#7A9E87` — muted sage (success states)
- `salty-error`: `#C0392B` — error states

---

## Typography

### Fonts (Google Fonts)
- **Display / Hero**: `Playfair Display` — serif, elegant, editorial
- **Body / UI**: `Inter` — clean, modern, readable
- **Accent / Labels**: `Cormorant Garamond` — refined serif for price/detail text

### Scale (Tailwind extended)
- `text-display`: 4rem / 64px — hero headlines
- `text-hero`: 3rem / 48px — section headlines
- `text-title`: 2rem / 32px — card titles
- `text-body`: 1rem / 16px — body copy
- `text-small`: 0.875rem / 14px — captions, labels

---

## Spacing
Use Tailwind defaults (4px base unit). Generous white space — luxury feel.
Section padding: `py-20` to `py-28` for major sections.

---

## Components

### Buttons
- Primary: `bg-salty-sand text-white hover:bg-salty-driftwood` — rounded-full, px-8 py-3
- Secondary: `border-2 border-salty-deep text-salty-deep hover:bg-salty-deep hover:text-white`
- Ghost: `text-salty-sand underline-offset-4 hover:underline`

### Cards
- Background: `bg-salty-shell`
- Border: `border border-salty-sand/20`
- Shadow: `shadow-sm hover:shadow-md transition-shadow`
- Radius: `rounded-2xl`

### Quiz UI
- Progress bar: thin, `bg-salty-sand`, animated fill
- Question cards: full-width, centered, max-w-2xl
- Answer options: large tap targets (min-h-14), border style, selected = `bg-salty-sand text-white`
- Mobile-first: all quiz interactions work thumb-only

---

## Layout

### Navigation
- Sticky top, blur backdrop
- Logo left, nav links center, "Book Now" CTA right
- Mobile: hamburger → slide-in drawer

### Hero
- Full-viewport height on desktop, 80vh mobile
- Overlaid text on atmospheric photo (beach/salon)
- CTA: "Find Your Stylist" (→ quiz) + "Book Now" (→ contact)

### Sections
1. Hero
2. Why Salty Mane (3-col trust badges)
3. Our Stylists (cards with specialty tags)
4. Services (accordion or card grid)
5. Stylist Quiz CTA banner
6. Gallery (Instagram feed grid — static for now)
7. Location / Contact / Hours
8. Footer

---

## Accessibility
- All interactive elements: min 44×44px tap target
- Color contrast: WCAG AA minimum (4.5:1 text, 3:1 UI)
- Focus rings: visible `ring-2 ring-salty-sand ring-offset-2`
- Quiz: fully keyboard navigable
- Images: descriptive alt text always
- Reduced motion: `prefers-reduced-motion` respected on animations

---

## Motion
Subtle only. `transition-all duration-200 ease-in-out` for interactive states.
No auto-playing video or jarring animations.
Hero image: static or subtle parallax (CSS only, no JS scroll handlers).
