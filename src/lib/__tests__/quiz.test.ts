import { describe, it, expect } from "vitest";
import { matchStylist } from "../quiz";
import type { QuizAnswers } from "@/types";

describe("matchStylist — hard eligibility rules", () => {
  it("routes color correction exclusively to Laci", () => {
    const answers: QuizAnswers = {
      goal: "color_complex",
      colorHistory: "correction_needed",
      extensions: "no_ext",
      budget: "budget_high",
      time: "time_long",
    };
    const result = matchStylist(answers);
    expect(result.primary.stylist.id).toBe("laci");
    if (result.alternate) {
      expect(result.alternate.stylist.colorCorrectionEligible).toBe(true);
    }
  });

  it("never routes a mid-level stylist to color correction", () => {
    const answers: QuizAnswers = {
      goal: "color_complex",
      colorHistory: "correction_needed",
      extensions: "no_ext",
      budget: "budget_high",
      time: "time_long",
    };
    const result = matchStylist(answers);
    expect(result.primary.stylist.level).not.toBe("mid");
    if (result.alternate) {
      expect(result.alternate.stylist.level).not.toBe("mid");
    }
  });

  it("only routes extension clients to extension-certified stylists", () => {
    const answers: QuizAnswers = {
      goal: "extensions",
      extensions: "ext_both",
      colorHistory: "already_blonde",
      budget: "budget_premium",
      time: "time_long",
    };
    const result = matchStylist(answers);
    expect(result.primary.stylist.extensionCertified).toBe(true);
    if (result.alternate) {
      expect(result.alternate.stylist.extensionCertified).toBe(true);
    }
  });

  it("returns primary and alternate as distinct stylists", () => {
    const answers: QuizAnswers = {
      goal: "highlights",
      colorHistory: "already_blonde",
      extensions: "no_ext",
      budget: "budget_mid",
      time: "time_medium",
    };
    const result = matchStylist(answers);
    if (result.alternate) {
      expect(result.primary.stylist.id).not.toBe(result.alternate.stylist.id);
    }
  });

  it("handles empty answers without throwing", () => {
    expect(() => matchStylist({})).not.toThrow();
  });

  it("returns a load warning string when stylist is in high demand", () => {
    const answers: QuizAnswers = {
      goal: "color_complex",
      colorHistory: "correction_needed",
      extensions: "no_ext",
      budget: "budget_premium",
      time: "time_long",
    };
    const result = matchStylist(answers);
    // Laci has loadScore ~0.89 in mock data (2 complex / 2 max = 1.0 complex, 3 total / 4 max = 0.75)
    // complexRatio=1.0, totalRatio=0.75 → 0.6 + 0.3 = 0.9 → in high demand or fully booked
    expect(result.primary.loadWarning).toBeDefined();
  });
});

describe("matchStylist — service estimates", () => {
  it("returns extension estimate for extension goal", () => {
    const answers: QuizAnswers = {
      goal: "extensions",
      extensions: "ext_length",
      colorHistory: "already_blonde",
      budget: "budget_premium",
      time: "time_flex",
    };
    const result = matchStylist(answers);
    expect(result.primary.recommendedService).toContain("Extension");
    expect(result.primary.estimatedCost.min).toBeGreaterThanOrEqual(450);
  });

  it("adds time bonus for thick/curly hair", () => {
    const base: QuizAnswers = {
      goal: "highlights",
      colorHistory: "already_blonde",
      extensions: "no_ext",
      budget: "budget_mid",
      time: "time_long",
    };
    const thick: QuizAnswers = { ...base, hairType: "thick" };
    const medium: QuizAnswers = { ...base, hairType: "medium" };

    const resultThick = matchStylist(thick);
    const resultMedium = matchStylist(medium);
    expect(resultThick.primary.estimatedDuration.min).toBeGreaterThan(
      resultMedium.primary.estimatedDuration.min
    );
  });

  it("returns a lower cost estimate for maintenance vs full balayage", () => {
    const maintenance = matchStylist({ goal: "maintenance", extensions: "no_ext" });
    const balayage = matchStylist({ goal: "highlights", extensions: "no_ext", budget: "budget_high" });
    expect(maintenance.primary.estimatedCost.max).toBeLessThan(balayage.primary.estimatedCost.max);
  });
});
