# Agentic Architecture Roadmap — The Salty Mane

## Vision
Transform this site into an AI-powered salon experience:
- Quiz agent recommends stylists with real-time availability
- Booking agent handles scheduling end-to-end
- Content agent syncs Instagram posts automatically
- Review agent monitors reputation and flags issues

---

## Phase 1 — Static Foundation (Current)
**Goal**: Ship a beautiful, functional site with static data.

### Deliverables
- [x] Next.js App Router site
- [x] Stylist profiles and service catalog
- [x] Quiz with scoring + load balancing (simulated)
- [x] Services page with pricing
- [x] Contact / booking CTA
- [x] MD documentation system

### Data Layer
- Stylists: hardcoded in `src/lib/stylists.ts`
- Services: hardcoded in `src/lib/services.ts`
- Quiz logic: pure functions in `src/lib/quiz.ts`
- Load data: seeded mock in `src/lib/scheduling.ts`

---

## Phase 2 — Live Data Integration
**Goal**: Connect to real booking system and Instagram.

### Tasks
- [ ] Integrate booking platform API (Vagaro recommended — they already use it)
- [ ] Pull real appointment counts for load balancing
- [ ] Instagram Basic Display API for gallery feed
- [ ] Contact form → email notification (SendGrid or Resend)
- [ ] Admin dashboard to update stylist availability/vacation mode

### New Files Needed
```
src/app/api/
  booking/route.ts      # Proxy to booking platform
  instagram/route.ts    # Instagram feed cache
  contact/route.ts      # Contact form handler
src/lib/
  vagaro.ts             # Booking API client
  instagram.ts          # IG API client
```

---

## Phase 3 — AI-Powered Matching
**Goal**: Replace static quiz with LLM-powered consultation.

### Concept
- Chat-style consultation ("Tell me about your hair goals...")
- Claude API (claude-sonnet-4-6) processes free-form input
- Returns structured `StylistMatch` + `ServiceRecommendation`
- Supports photo upload (client shows current hair)

### Tasks
- [ ] Build `/api/consult` endpoint using Anthropic SDK
- [ ] Design system prompt encoding all stylist specialties
- [ ] Structured output schema for match result
- [ ] Photo analysis: extract current hair color/condition
- [ ] Confidence scoring with human fallback (call us)

### Prompt Architecture
```
system: You are a hair consultation expert for The Salty Mane salon in
        Alpharetta, GA. You match clients to stylists based on their goals.
        [STYLIST_PROFILES]
        [LOAD_BALANCING_RULES]
        Output ONLY valid JSON matching StylistMatchResult schema.

user: [client's free-form description + optional photo]
```

---

## Phase 4 — Full Agentic Booking
**Goal**: End-to-end booking without phone call.

### Concept
- Agent confirms stylist match
- Agent checks live availability slots
- Agent confirms client details (name, phone, service)
- Agent creates appointment in booking system
- Agent sends confirmation SMS/email

### Tasks
- [ ] Tool: `getAvailableSlots(stylistId, date, duration)`
- [ ] Tool: `createAppointment(stylistId, clientInfo, service, slot)`
- [ ] Tool: `sendConfirmation(clientPhone, appointmentDetails)`
- [ ] Human-in-the-loop: stylist reviews before confirm (Phase 4a)
- [ ] Full auto: instant booking (Phase 4b, requires trust build)

---

## Phase 5 — Content & Reputation Agent
**Goal**: Keep site fresh and monitor brand health automatically.

### Tasks
- [ ] Instagram sync agent: pulls latest posts, updates gallery
- [ ] Review monitoring: Yelp/Google alerts → Slack notification
- [ ] Automated response drafts for negative reviews
- [ ] Monthly analytics report: quiz completions, stylist match distribution

---

## Agent Communication Patterns

### Quiz → Booking handoff
```
QuizResult {
  recommendedStylist: StylistId
  alternateStylist: StylistId
  recommendedService: ServiceId
  estimatedDuration: number  // minutes
  estimatedCost: { min: number, max: number }
  bookingUrl: string
  loadWarning?: string  // "In high demand"
}
```

### Load Balancing Updates
- Real-time: webhook from booking system on new appointment
- Cache: Redis with 5-min TTL for load scores
- Fallback: daily reset at midnight

---

## Tech Decisions Log

| Decision | Choice | Reason |
|----------|--------|--------|
| Framework | Next.js App Router | SSR + ISR for fast load |
| AI API | Anthropic Claude | Best for conversational UX |
| Booking | Vagaro (Phase 2) | Matches existing salon workflow |
| Instagram | IG Basic Display API | Official, stable |
| DB (Phase 2) | Supabase | Postgres + real-time + auth |
| Deploy | Vercel | Next.js native |
| Monitoring | Sentry | Error tracking |
