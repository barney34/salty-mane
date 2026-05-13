# The Salty Mane Hair Co. — Web App

## Project Overview
Enhanced website for The Salty Mane Hair Co. salon in Alpharetta, GA.
- **Live site**: https://thesaltymane.com/
- **Location**: 5530 Windward Parkway STE#1260, Alpharetta, GA 30004
- **Phone/Text**: 678-648-6010
- **Email**: bookings@thesaltymane.com
- **Instagram**: @the.salty.mane | @salty.hair.co
- **Facebook**: https://www.facebook.com/TheSaltyMane/

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library

## Project Structure
```
src/
  app/           # Next.js App Router pages
  components/    # Reusable UI components
  lib/           # Business logic (stylists, quiz, scheduling)
  types/         # Shared TypeScript types
docs/            # Agentic planning docs (source of truth)
```

## Key Docs (read these before touching business logic)
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
npm run test      # Run Jest tests
npm run lint      # ESLint
```

## Core Features
1. **Homepage** — Hero, services overview, gallery CTA, contact
2. **Stylist Quiz** — 6 questions → matched stylist recommendation with load balancing
3. **Services Page** — Full menu with pricing and time estimates
4. **Booking Flow** — Links to existing booking system (text/call)

## Load Balancing Rules
- Max 3 complex appointments per stylist per day
- Extensions/color correction → certified stylists only (Laci, Olivia)
- Round-robin for new clients among qualified stylists
- See `docs/LOAD_BALANCING.md` for full rules

## Conventions
- No comments unless WHY is non-obvious
- Strict TypeScript — no `any`
- Mobile-first responsive design
- WCAG 2.1 AA accessibility
