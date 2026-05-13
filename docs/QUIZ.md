# Stylist Quiz — Logic & Design

## Purpose
Match clients to the best-fit stylist based on their hair goals, needs, and service complexity.
Prevents overloading any single stylist while ensuring the right skill level handles each client.

---

## Quiz Flow

**6 questions → weighted score → matched stylist (top 1–2)**

After match, show:
- Stylist name + specialty blurb
- Recommended services
- Estimated price range
- Estimated time in chair
- CTA to book (text/call)

---

## Questions

### Q1: What's your primary goal today?
*Maps to service category*

| Option | Value | Tag |
|--------|-------|-----|
| Color transformation (big change) | `color_complex` | HIGH_COLOR |
| Highlights or balayage | `highlights` | COLOR |
| Cut & style | `cut` | CUT |
| Add length or volume with extensions | `extensions` | EXTENSION |
| Repair damaged or over-processed hair | `repair` | REPAIR |
| Just a tone, gloss, or maintenance | `maintenance` | MAINTENANCE |

### Q2: What best describes your hair?
*Affects service difficulty and time estimates*

| Option | Value | Tag |
|--------|-------|-----|
| Fine / thin | `fine` | — |
| Medium thickness | `medium` | — |
| Thick / coarse | `thick` | +30 min estimate |
| Curly or wavy | `curly` | +30 min estimate |

### Q3: What's your current color situation?
*Critical for routing to correct skill level*

| Option | Value | Tag |
|--------|-------|-----|
| Natural / virgin hair (no color) | `virgin` | — |
| Currently blonde or highlighted | `already_blonde` | — |
| Dark hair wanting to go lighter | `dark_to_light` | SENIOR_ONLY |
| Previously colored (not blonde) | `previously_colored` | — |
| Have old color / box dye / color melt issue | `correction_needed` | CORRECTION |

### Q4: Are you interested in extensions?
*Hard-gates to extension-certified stylists*

| Option | Value | Tag |
|--------|-------|-----|
| Yes — I want more length | `ext_length` | EXTENSION |
| Yes — I want more volume | `ext_volume` | EXTENSION |
| Yes — both length and volume | `ext_both` | EXTENSION |
| No / not sure yet | `no_ext` | — |

### Q5: What's your budget for this visit?
*Soft filter; used for recommendation messaging*

| Option | Value | Tag |
|--------|-------|-----|
| Under $150 | `budget_low` | — |
| $150–$300 | `budget_mid` | — |
| $300–$600 | `budget_high` | — |
| $600+ (extensions or major color) | `budget_premium` | — |

### Q6: How much time do you have?
*Confirms appointment feasibility*

| Option | Value | Tag |
|--------|-------|-----|
| 1–2 hours | `time_short` | — |
| 2–3 hours | `time_medium` | — |
| 3–5 hours | `time_long` | — |
| Full day / no rush | `time_flex` | — |

---

## Matching Algorithm

### Hard Rules (must be satisfied first)
```
EXTENSION tag → eligible: [Laci, Olivia] only
CORRECTION tag → eligible: [Laci] only
SENIOR_ONLY (dark→light) → eligible: [Laci, Olivia] only
```

### Soft Scoring (among eligible stylists)
Each stylist gets a score 0–100:

```
Base score: 50
+ 20 if specialty matches primary goal
+ 15 if load < 50% capacity
+ 10 if load < 25% capacity
- 15 if load > 75% capacity
- 25 if load = 100% (fully booked)
+ 10 if budget_premium and stylist is Senior
- 10 if budget_low and stylist is Senior (suggest mid-tier)
+ 5 if new client + stylist has "good communicator" flag
```

**Return top 1 stylist + 1 alternate** (in case primary is unavailable).

### Tiebreaker
Least-loaded stylist wins ties.

---

## Load Balancing Integration
Before returning result, check real-time load from scheduling module:
- If top match is at 100% → move to next eligible
- If all eligible at 100% → show "Call to discuss availability" message
- Show "in high demand" badge if stylist > 75% booked

---

## Result Display
```
┌─────────────────────────────────┐
│ We think you'll love [STYLIST]  │
│ [headshot] [specialty tagline]  │
│                                 │
│ Recommended service:            │
│   Full Balayage + Toner         │
│                                 │
│ Estimated time: 3–4 hours       │
│ Estimated cost: $230–$280       │
│                                 │
│ [Book with [STYLIST]]           │
│ [See alternate: [STYLIST 2]]    │
└─────────────────────────────────┘
```
