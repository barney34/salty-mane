# The Salty Mane Hair Co. — Web App

## Project Overview
Enhanced website for The Salty Mane Hair Co. salon in Alpharetta, GA.
- **Repo**: https://github.com/barney34/salty-mane
- **Deploy**: GitHub → Render (auto-deploys on push to main)
- **Live site**: https://thesaltymane.com/
- **Location**: 5530 Windward Parkway STE#1260, Alpharetta, GA 30004
- **Phone/Text**: +16786486010 (display: 678-648-6010)
- **Email**: bookings@thesaltymane.com
- **Instagram**: @the.salty.mane | @salty.hair.co

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library (15 tests)

## Project Structure
```
src/
  app/           # Next.js App Router pages (/, /services, /quiz, /faq)
  components/    # Reusable UI components
  lib/           # Business logic (stylists, quiz, scheduling, booking, faq, testimonials)
  types/         # Shared TypeScript types
docs/            # Agentic planning docs (source of truth)
public/gallery/  # 11 real salon photos (01.jpg–11.jpg)
```

## Key Docs (read before touching business logic)
- `docs/STYLISTS.md` — stylist profiles, specialties, capacity rules
- `docs/SERVICES.md` — service catalog with pricing and time estimates
- `docs/QUIZ.md` — quiz questions, scoring logic, matching algorithm
- `docs/LOAD_BALANCING.md` — booking distribution rules
- `docs/DESIGN.md` — brand colors, typography, UI patterns
- `docs/AGENTIC.md` — agentic architecture roadmap

## Commands
```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run test      # Run Vitest tests
npm run lint      # ESLint
```

## Current Stylists
- **Laci** (owner) — blonde, corrections, extensions certified
- **Grace** — cuts, lived-in color, highlights
- **Erica** (@ericaa.mane) — blonde, balayage, extensions certified
- **Reese** (@reese.mane) — color, cuts, highlights
- **Anna** — color retouches, partial highlights, cuts
- **Sara** — styling, blowouts, cuts
- **Jolie** — dimensional color, textured cuts, tones
- **Olivia left the salon** — do not add back

## Load Balancing Rules
- Max 3 complex appointments per stylist per day
- Extensions/color correction → certified stylists only (Laci, Erica)
- Round-robin for new clients among qualified stylists
- See `docs/LOAD_BALANCING.md` for full rules

## To Add Stylist Headshots
1. Drop photo in `/public/stylists/<name>.jpg`
2. Uncomment `headshot:` line in `src/lib/stylists.ts`

## Conventions
- No comments unless WHY is non-obvious
- Strict TypeScript — no `any`
- Mobile-first responsive design
- WCAG 2.1 AA accessibility
- Phone links always use E.164 format (+16786486010)
- All business constants live in `src/lib/business.ts`
