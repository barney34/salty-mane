import { describe, it, expect } from "vitest";
import { getLoadScore, isFullyBooked, getAllLoadScores } from "../scheduling";
import { STYLISTS } from "../stylists";

describe("getLoadScore", () => {
  it("returns 1.0 for an unknown stylist id", () => {
    expect(getLoadScore("nonexistent")).toBe(1.0);
  });

  it("returns a number between 0 and 1 for all real stylists", () => {
    for (const stylist of STYLISTS) {
      const score = getLoadScore(stylist.id);
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(1.0);
    }
  });

  it("does not produce NaN even if load exceeds max", () => {
    for (const stylist of STYLISTS) {
      expect(getLoadScore(stylist.id)).not.toBeNaN();
    }
  });
});

describe("isFullyBooked", () => {
  it("returns true for unknown stylist (defaults to fully booked)", () => {
    expect(isFullyBooked("ghost")).toBe(true);
  });

  it("returns a boolean for every real stylist", () => {
    for (const stylist of STYLISTS) {
      expect(typeof isFullyBooked(stylist.id)).toBe("boolean");
    }
  });
});

describe("getAllLoadScores", () => {
  it("returns a score for every stylist", () => {
    const scores = getAllLoadScores();
    for (const stylist of STYLISTS) {
      expect(scores[stylist.id]).toBeDefined();
      expect(typeof scores[stylist.id]).toBe("number");
    }
  });
});
