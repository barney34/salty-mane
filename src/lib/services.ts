import type { Service } from "@/types";

export const SERVICES: Service[] = [
  // Cuts & Styling
  { id: "womens-cut", name: "Women's Haircut", category: "cuts", startingPrice: 75, priceNote: "includes shampoo & blowdry", durationMin: 45, durationMax: 60 },
  { id: "mens-cut", name: "Men's Haircut", category: "cuts", startingPrice: 55, durationMin: 30, durationMax: 45 },
  { id: "bang-trim", name: "Bang Trim", category: "cuts", startingPrice: 20, priceNote: "existing clients only", durationMin: 15, durationMax: 15 },
  { id: "blowout", name: "Shampoo & Blowout", category: "styling", startingPrice: 60, durationMin: 45, durationMax: 60 },
  { id: "event-styling", name: "Event / Occasion Styling", category: "styling", startingPrice: 85, priceNote: "updo, waves, etc.", durationMin: 60, durationMax: 90 },

  // Color
  { id: "color-retouch", name: "Color Retouch (Roots)", category: "color", startingPrice: 110, durationMin: 90, durationMax: 120 },
  { id: "gloss-toner", name: "Gloss / Toner", category: "color", startingPrice: 45, priceNote: "add-on or standalone", durationMin: 30, durationMax: 45 },
  { id: "partial-highlights", name: "Partial Highlights", category: "color", startingPrice: 145, durationMin: 120, durationMax: 150 },
  { id: "full-highlights", name: "Full Highlights", category: "color", startingPrice: 185, durationMin: 150, durationMax: 180 },
  { id: "face-frame-balayage", name: "Face-Frame Balayage", category: "color", startingPrice: 120, durationMin: 90, durationMax: 120 },
  { id: "full-balayage", name: "Full Balayage", category: "color", startingPrice: 230, priceNote: "includes toner", durationMin: 180, durationMax: 240 },
  { id: "lived-in-color", name: "Lived-In / Dimensional Color", category: "color", startingPrice: 250, durationMin: 180, durationMax: 240 },
  { id: "bleach-tone", name: "Bleach & Tone", category: "color", startingPrice: 175, durationMin: 150, durationMax: 210 },
  { id: "color-correction", name: "Color Correction", category: "color", startingPrice: 350, priceNote: "consultation required", durationMin: 240, durationMax: 360, requiresConsultation: true },
  { id: "deep-conditioning", name: "Deep Conditioning Treatment", category: "treatments", startingPrice: 40, priceNote: "add-on", durationMin: 20, durationMax: 20 },

  // Extensions
  { id: "ext-consultation", name: "Extension Consultation", category: "extensions", startingPrice: 0, durationMin: 20, durationMax: 30, requiresConsultation: true, requiresExtensionCert: true },
  { id: "hand-tied-install", name: "Hand-Tied Weft Install", category: "extensions", startingPrice: 450, priceNote: "hair cost $400–$900 additional", durationMin: 180, durationMax: 300, requiresConsultation: true, requiresExtensionCert: true },
  { id: "tape-in-install", name: "Tape-In Extensions Install", category: "extensions", startingPrice: 250, priceNote: "hair cost $200–$500 additional", durationMin: 90, durationMax: 150, requiresConsultation: true, requiresExtensionCert: true },
  { id: "ext-maintenance", name: "Extension Move-Up / Maintenance", category: "extensions", startingPrice: 200, durationMin: 90, durationMax: 120, requiresExtensionCert: true },
  { id: "ext-removal", name: "Extension Removal", category: "extensions", startingPrice: 100, durationMin: 45, durationMax: 45, requiresExtensionCert: true },

  // Treatments
  { id: "keratin", name: "Keratin Smoothing Treatment", category: "treatments", startingPrice: 275, priceNote: "lasts 3–5 months", durationMin: 180, durationMax: 240 },
  { id: "olaplex", name: "Olaplex Treatment", category: "treatments", startingPrice: 45, priceNote: "add-on to color service", durationMin: 20, durationMax: 20 },
  { id: "scalp-treatment", name: "Scalp Treatment", category: "treatments", startingPrice: 55, durationMin: 30, durationMax: 30 },
];

export function getServicesByCategory(category: Service["category"]) {
  return SERVICES.filter((s) => s.category === category);
}

export function formatDuration(min: number, max: number): string {
  const fmt = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}hr ${m % 60 > 0 ? `${m % 60}min` : ""}`.trim() : `${m}min`);
  return min === max ? fmt(min) : `${fmt(min)} – ${fmt(max)}`;
}
