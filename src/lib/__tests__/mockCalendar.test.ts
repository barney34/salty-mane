import { describe, it, expect } from "vitest";
import { isDateFullyBooked, isSlotAvailable, TIME_SLOTS } from "../mockCalendar";

describe("isDateFullyBooked", () => {
  it("returns a boolean for any stylistId + dateStr", () => {
    expect(typeof isDateFullyBooked("laci", "2026-05-14")).toBe("boolean");
  });

  it("is deterministic — same inputs always return the same result", () => {
    const a = isDateFullyBooked("grace", "2026-06-01");
    const b = isDateFullyBooked("grace", "2026-06-01");
    expect(a).toBe(b);
  });

  it("varies by stylist — different stylists produce different booked-day patterns", () => {
    const results = ["laci", "grace", "erica", "reese", "anna", "sara", "jolie"].map(
      (id) => isDateFullyBooked(id, "2026-05-20")
    );
    const allSame = results.every((r) => r === results[0]);
    expect(allSame).toBe(false);
  });

  it("blocks roughly 20% of days across a 30-day sample", () => {
    const dates = Array.from({ length: 30 }, (_, i) =>
      `2026-05-${String(i + 1).padStart(2, "0")}`
    );
    const blocked = dates.filter((d) => isDateFullyBooked("laci", d)).length;
    expect(blocked).toBeGreaterThanOrEqual(2);
    expect(blocked).toBeLessThanOrEqual(12);
  });
});

describe("isSlotAvailable", () => {
  it("returns a boolean", () => {
    expect(typeof isSlotAvailable("laci", "2026-05-14", 0)).toBe("boolean");
  });

  it("is deterministic", () => {
    const a = isSlotAvailable("erica", "2026-05-15", 5);
    const b = isSlotAvailable("erica", "2026-05-15", 5);
    expect(a).toBe(b);
  });

  it("makes roughly 70% of slots available across all 16 slots", () => {
    const available = Array.from({ length: 16 }, (_, i) =>
      isSlotAvailable("grace", "2026-05-14", i)
    ).filter(Boolean).length;
    expect(available).toBeGreaterThanOrEqual(7);
    expect(available).toBeLessThanOrEqual(14);
  });
});

describe("TIME_SLOTS", () => {
  it("has 16 entries from 9:00 AM to 4:30 PM", () => {
    expect(TIME_SLOTS).toHaveLength(16);
    expect(TIME_SLOTS[0]).toBe("9:00 AM");
    expect(TIME_SLOTS[15]).toBe("4:30 PM");
  });
});
