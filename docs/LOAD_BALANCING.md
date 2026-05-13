# Load Balancing — Booking Distribution Rules

## Problem
Without rules, clients will always book the most popular stylist (likely Laci),
burning her out and leaving other stylists underutilized. We need guardrails.

---

## Capacity Model

Each stylist has a **daily capacity** defined by service slots, not raw appointments:

| Stylist | Max Complex/day | Max Total Slots/day | Notes |
|---------|----------------|---------------------|-------|
| Laci | 2 | 4 | Owner; protect for high-value services |
| Olivia | 3 | 5 | Senior; available for extensions |
| Grace | 3 | 5 | |
| Anna | 3 | 6 | More maintenance/quick services |
| Sara | 3 | 6 | Faster services (cuts, blowouts) |

**Complex services** = any color + extensions + color correction + keratin.
**Simple services** = cuts, blowouts, tones/glosses only.

---

## Load Score Calculation

```
loadScore = (bookedComplexToday / maxComplexPerDay) * 0.6
           + (bookedTotalToday / maxTotalSlotsPerDay) * 0.4
```

- `loadScore = 0.0` → fully available
- `loadScore = 0.5` → half booked
- `loadScore = 1.0` → fully booked

---

## Distribution Rules (priority order)

### Rule 1: Hard eligibility first
Extensions → Laci or Olivia only
Color correction → Laci only
Dark-to-light major transformation → Laci or Olivia preferred

### Rule 2: Protect Laci's capacity
Do NOT auto-route simple services (cuts, glosses) to Laci.
Only route complex or high-stakes services to Laci.

### Rule 3: Fill from least-loaded
Among eligible stylists, sort by `loadScore` ascending.
Route to lowest score.

### Rule 4: Balance new clients
New clients (no stylist preference expressed) → round-robin across eligible.
Returning clients → honor stylist preference unless overbooked.

### Rule 5: "High demand" threshold
If `loadScore > 0.75` → display "In high demand" badge on quiz result.
If `loadScore = 1.0` → mark as unavailable; route to next eligible.

### Rule 6: Emergency fallback
If ALL eligible stylists are full → show:
> "Our team is in high demand right now! Call or text us at 678-648-6010
> and we'll find the perfect time for you."

---

## Data Model (MVP — in-memory/static)

For MVP, load is simulated with seeded data. Future: connect to booking system API.

```typescript
interface StylistLoad {
  stylistId: string;
  date: string; // YYYY-MM-DD
  bookedComplex: number;
  bookedTotal: number;
}
```

---

## Future: Real-Time Integration
- Connect to booking platform API (Vagaro / Booksy / Square Appointments)
- Webhook on new booking → update load scores
- Admin dashboard to override routing rules
- "Vacation mode" per stylist (removes from pool)
- Configurable per-day rules (e.g., Laci out Thursday)

---

## Anti-Gaming Rules
- Quiz result is a **recommendation**, not a guaranteed assignment
- Client can choose alternate stylist shown
- Booking confirmation happens via call/text (human-in-the-loop)
- Prevents quiz-gaming by bad actors flooding one stylist
