import type { StylistLoad } from "@/types";
import { STYLISTS } from "./stylists";

// Eastern time date string — rolls over at midnight ET, not UTC midnight
function getTodayStr(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
}

// Seeded mock load for MVP — Phase 2 replaces with live booking API
const MOCK_LOADS: StylistLoad[] = [
  { stylistId: "laci", date: getTodayStr(), bookedComplex: 2, bookedTotal: 3 },
  { stylistId: "olivia", date: getTodayStr(), bookedComplex: 1, bookedTotal: 3 },
  { stylistId: "grace", date: getTodayStr(), bookedComplex: 2, bookedTotal: 4 },
  { stylistId: "anna", date: getTodayStr(), bookedComplex: 1, bookedTotal: 2 },
  { stylistId: "sara", date: getTodayStr(), bookedComplex: 0, bookedTotal: 1 },
];

function getLoad(stylistId: string): StylistLoad {
  const today = getTodayStr();
  return (
    MOCK_LOADS.find((l) => l.stylistId === stylistId && l.date === today) ?? {
      stylistId,
      date: today,
      bookedComplex: 0,
      bookedTotal: 0,
    }
  );
}

export function getLoadScore(stylistId: string): number {
  const stylist = STYLISTS.find((s) => s.id === stylistId);
  if (!stylist) return 1.0;

  const load = getLoad(stylistId);
  const complexRatio =
    stylist.maxComplexPerDay > 0 ? load.bookedComplex / stylist.maxComplexPerDay : 0;
  const totalRatio =
    stylist.maxTotalSlotsPerDay > 0 ? load.bookedTotal / stylist.maxTotalSlotsPerDay : 0;

  return complexRatio * 0.6 + totalRatio * 0.4;
}

export function getAllLoadScores(): Record<string, number> {
  return Object.fromEntries(STYLISTS.map((s) => [s.id, getLoadScore(s.id)]));
}

export function isFullyBooked(stylistId: string): boolean {
  return getLoadScore(stylistId) >= 1.0;
}
