# Stylist Profiles — The Salty Mane

> Source of truth for stylist data. Update here first; `src/lib/stylists.ts` imports from this logic.

## Stylists

### Laci — Owner & Senior Colorist
- **Instagram**: @the.salty.mane
- **Level**: Senior / Owner
- **Specialties**: Blonde transformations, corrective color, hand-tied extensions, hair health restoration
- **Extension certified**: Yes (hand-tied, tape-in, weft)
- **Color correction**: Yes (exclusive for complex corrections)
- **Strengths**: Dramatic transformations, going platinum/blonde from dark, multi-session color correction, health-forward approach
- **Ideal client**: Major color changes, brunette → blonde, damaged hair needing restoration, extension clients wanting full transformation
- **Booking priority**: High-complexity services; protect capacity for extensions and corrections
- **Max complex appts/day**: 2

### Olivia — Blonde & Color Specialist
- **Level**: Senior Stylist
- **Specialties**: Blonde specialist, balayage, highlights, hair health restoration, cuts
- **Extension certified**: Yes (hand-tied, tape-in)
- **Color correction**: Limited (lightening corrections only)
- **Strengths**: Lived-in blonde, dimensional highlights, balayage, restoring over-processed hair
- **Ideal client**: Blonde maintenance, balayage clients, highlight refreshes, extension clients
- **Max complex appts/day**: 3

### Grace — Color & Cut Artist
- **Level**: Mid-Senior Stylist
- **Specialties**: Cuts, lived-in color, highlights, tones, glosses, balayage
- **Extension certified**: No
- **Color correction**: No
- **Strengths**: Precision cuts, natural-looking lived-in color, adaptable to client vision, great communicator
- **Ideal client**: Clients wanting a fresh cut + color combo, highlight maintenance, natural-looking color, first-time salon clients
- **Max complex appts/day**: 3

### Anna — Style & Color Generalist
- **Level**: Mid Stylist
- **Specialties**: Cuts, color retouches, partial highlights, glosses, blowouts
- **Extension certified**: No
- **Color correction**: No
- **Strengths**: Overall quality, making clients feel confident, color application, tones
- **Ideal client**: Regular maintenance clients, color retouches, haircuts, blowouts
- **Max complex appts/day**: 3

### Sara — Styling Specialist
- **Level**: Mid Stylist
- **Specialties**: Cuts, blowouts, color maintenance, glosses
- **Extension certified**: No
- **Color correction**: No
- **Strengths**: Styling, blowouts, event styling, maintaining existing color
- **Ideal client**: Maintenance clients, blowout regulars, clients wanting cuts and style refreshes
- **Max complex appts/day**: 3

---

## Matching Rules (summary — full logic in QUIZ.md and LOAD_BALANCING.md)

| Need | Eligible Stylists |
|------|------------------|
| Extensions (any type) | Laci, Olivia |
| Color correction | Laci only |
| Going blonde from dark | Laci, Olivia |
| Balayage / highlights | Laci, Olivia, Grace |
| Cuts + color combo | Grace, Anna, Olivia |
| Cuts only | Grace, Anna, Sara |
| Blowout / styling | Sara, Anna |
| Gloss / tone only | Anna, Sara, Grace |
| New client, any service | Round-robin among eligible |

---

## Future Additions
- Add headshot image path per stylist
- Add booking URL per stylist (when integrated with booking system)
- Track running appointment counts for live load balancing
