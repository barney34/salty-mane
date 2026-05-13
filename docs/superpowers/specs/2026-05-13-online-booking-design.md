# Online Booking Demo — Design Spec
**Date:** 2026-05-13
**Status:** Approved

## Overview

A demo online booking flow at `/book`. Single-page step wizard with mock data — nothing is saved or sent. Fully interactive: users complete the full flow and see a confirmation screen.

## Flow

```
Step 1: Select Service
Step 2: Select Stylist  (filtered by service requirements)
Step 3: Pick Date & Time  (calendar + time slot grid)
Step 4: Confirm  (summary → success state)
```

## Architecture

**New files:**
- `src/app/book/page.tsx` — client component, owns all step state
- `src/lib/mockCalendar.ts` — seeded mock availability helpers

**Existing files used:**
- `src/lib/services.ts` — service catalog
- `src/lib/stylists.ts` — stylist roster + certification flags
- `src/lib/scheduling.ts` — `getLoadScore()`, `isFullyBooked()`
- `src/lib/booking.ts` — `BOOK_SMS_GENERAL` for fallback CTA
- `src/lib/business.ts` — phone number constant

**Navigation:** Add "Book" link to `src/components/Navigation.tsx`.

## Step 1 — Service Selection

- Pull services from `src/lib/services.ts`
- Group by category: Cuts & Styling, Color, Extensions
- Each service is a selectable card: name, starting price, estimated time
- Extensions shows inline note: "Consultation required — we'll confirm details after booking"
- One service must be selected to enable Continue

## Step 2 — Stylist Selection

Filtering rules (from `src/lib/stylists.ts`):
- Color Correction → `colorCorrectionEligible: true` only (Laci)
- Extensions services → `extensionCertified: true` only (Laci, Erica)
- All other services → all stylists

Sort order: ascending load score (least booked first) via `getLoadScore()`.

Availability badge per stylist:
- **Available** — load score < 0.5
- **Limited** — load score 0.5–0.79
- **Fully Booked** — load score ≥ 1.0 (shown greyed, unselectable)

Card content: name, title, specialties list.

## Step 3 — Date & Time

**Calendar:**
- 30-day window from today
- Sundays disabled (salon closed)
- Some days marked fully booked using a seeded function: `isDateFullyBooked(stylistId, dateStr)` in `src/lib/mockCalendar.ts` — uses a simple hash of stylistId + date to deterministically block ~20% of weekdays
- Selected day highlighted in brand color

**Time slots:**
- 9:00am–5:00pm in 30-min increments (16 slots)
- Slot availability via `isSlotAvailable(stylistId, dateStr, slotIndex)` in `src/lib/mockCalendar.ts` — blocks ~30% of slots deterministically
- Available: selectable card; Unavailable: greyed out
- Both day and slot required to enable Continue

## Step 4 — Confirm & Success

**Summary card:**
- Service name + starting price
- Stylist name + title
- Date (formatted: "Friday, May 15") + time (formatted: "10:30 AM")

**On "Confirm Booking" click:** transition in-place to success state:
- Checkmark icon
- "You're booked!" heading
- Same summary repeated
- Body copy: "We'll reach out to confirm your appointment. Questions? Text us at 678-648-6010" — phone links to `BOOK_SMS_GENERAL`
- "Book Another Appointment" button resets state to step 1

## Progress Bar

Four labeled steps across the top of the page. Current step highlighted; completed steps shown as done. Clicking completed steps navigates back (forward navigation only via Continue button).

## Out of Scope

- No backend, database, or real booking storage
- No authentication
- No email/SMS sent on confirmation
- No real-time availability (all mock/seeded)
