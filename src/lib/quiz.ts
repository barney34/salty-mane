import type {
  QuizAnswers,
  QuizQuestion,
  QuizResult,
  Stylist,
  StylistMatch,
} from "@/types";
import { STYLISTS } from "./stylists";
import { getLoadScore } from "./scheduling";

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "goal",
    question: "What's your primary goal for this visit?",
    subtitle: "We'll use this to find your perfect stylist match.",
    answers: [
      {
        value: "color_complex",
        label: "Major Color Change",
        description: "Going lighter, dramatic transformation",
        icon: "✨",
      },
      {
        value: "highlights",
        label: "Highlights or Balayage",
        description: "Sun-kissed, dimensional color",
        icon: "☀️",
      },
      {
        value: "cut",
        label: "Cut & Style",
        description: "Fresh shape, precision cut",
        icon: "✂️",
      },
      {
        value: "extensions",
        label: "Extensions",
        description: "More length, more volume",
        icon: "💫",
      },
      {
        value: "repair",
        label: "Hair Repair",
        description: "Restore damaged or over-processed hair",
        icon: "🌿",
      },
      {
        value: "maintenance",
        label: "Maintenance",
        description: "Tone, gloss, or regular upkeep",
        icon: "🔄",
      },
    ],
  },
  {
    id: "hairType",
    question: "What best describes your hair?",
    subtitle: "This helps us estimate your appointment time.",
    answers: [
      { value: "fine", label: "Fine / Thin", description: "Delicate, lightweight strands", icon: "🪶" },
      { value: "medium", label: "Medium Thickness", description: "Average density", icon: "〰️" },
      { value: "thick", label: "Thick / Coarse", description: "Dense, sturdy strands", icon: "〓" },
      { value: "curly", label: "Curly / Wavy", description: "Natural texture, waves or coils", icon: "🌀" },
    ],
  },
  {
    id: "colorHistory",
    question: "What's your current color situation?",
    subtitle: "This is the most important factor for stylist matching.",
    answers: [
      {
        value: "virgin",
        label: "Natural / Virgin Hair",
        description: "Never been colored",
        icon: "🌱",
      },
      {
        value: "already_blonde",
        label: "Already Blonde or Highlighted",
        description: "Maintaining lightened hair",
        icon: "💛",
      },
      {
        value: "dark_to_light",
        label: "Dark Going Lighter",
        description: "Brunette wanting to go blonde",
        icon: "⚡",
      },
      {
        value: "previously_colored",
        label: "Previously Colored",
        description: "Has color, not going lighter",
        icon: "🎨",
      },
      {
        value: "correction_needed",
        label: "Color Issue / Correction",
        description: "Box dye, uneven, or color gone wrong",
        icon: "🆘",
      },
    ],
  },
  {
    id: "extensions",
    question: "Are you interested in extensions?",
    answers: [
      {
        value: "ext_length",
        label: "Yes — More Length",
        description: "Grow past your shoulders faster",
        icon: "📏",
      },
      {
        value: "ext_volume",
        label: "Yes — More Volume",
        description: "Fuller, thicker-looking hair",
        icon: "💁",
      },
      {
        value: "ext_both",
        label: "Yes — Length & Volume",
        description: "The full transformation",
        icon: "🌟",
      },
      {
        value: "no_ext",
        label: "No / Not Sure",
        description: "Not looking for extensions right now",
        icon: "💆",
      },
    ],
  },
  {
    id: "budget",
    question: "What's your budget for this visit?",
    subtitle: "Helps us recommend the right services.",
    answers: [
      { value: "budget_low", label: "Under $150", description: "Cuts, glosses, maintenance", icon: "💚" },
      { value: "budget_mid", label: "$150–$300", description: "Highlights, color, cuts", icon: "💛" },
      { value: "budget_high", label: "$300–$600", description: "Balayage, major color", icon: "🧡" },
      { value: "budget_premium", label: "$600+", description: "Extensions or full transformation", icon: "💜" },
    ],
  },
  {
    id: "time",
    question: "How much time can you set aside?",
    subtitle: "Complex services need more chair time — we want to set expectations right.",
    answers: [
      { value: "time_short", label: "1–2 Hours", description: "Quick, in and out", icon: "⏰" },
      { value: "time_medium", label: "2–3 Hours", description: "Mid-length appointment", icon: "🕐" },
      { value: "time_long", label: "3–5 Hours", description: "Complex color or service", icon: "🕓" },
      { value: "time_flex", label: "No Rush", description: "Full day if needed", icon: "🌅" },
    ],
  },
];

interface ServiceEstimate {
  name: string;
  durationMin: number;
  durationMax: number;
  costMin: number;
  costMax: number;
}

function getServiceEstimate(answers: QuizAnswers): ServiceEstimate {
  const needsExtensions =
    answers.extensions && answers.extensions !== "no_ext";
  const isThickOrCurly =
    answers.hairType === "thick" || answers.hairType === "curly";
  const timeBonus = isThickOrCurly ? 30 : 0;

  if (needsExtensions) {
    return {
      name: "Extensions Consultation + Install",
      durationMin: 180 + timeBonus,
      durationMax: 300 + timeBonus,
      costMin: 450,
      costMax: 1800,
    };
  }

  if (answers.colorHistory === "correction_needed") {
    return {
      name: "Color Correction",
      durationMin: 240,
      durationMax: 360,
      costMin: 350,
      costMax: 600,
    };
  }

  if (answers.goal === "color_complex" || answers.colorHistory === "dark_to_light") {
    return {
      name: "Full Balayage or Bleach & Tone",
      durationMin: 150 + timeBonus,
      durationMax: 240 + timeBonus,
      costMin: 175,
      costMax: 280,
    };
  }

  if (answers.goal === "highlights") {
    if (answers.budget === "budget_mid" || answers.budget === "budget_low") {
      return {
        name: "Partial Highlights + Toner",
        durationMin: 120 + timeBonus,
        durationMax: 150 + timeBonus,
        costMin: 145,
        costMax: 195,
      };
    }
    return {
      name: "Full Balayage + Toner",
      durationMin: 150 + timeBonus,
      durationMax: 210 + timeBonus,
      costMin: 230,
      costMax: 280,
    };
  }

  if (answers.goal === "cut") {
    return {
      name: "Women's Haircut + Blowout",
      durationMin: 60,
      durationMax: 90,
      costMin: 75,
      costMax: 95,
    };
  }

  if (answers.goal === "repair") {
    return {
      name: "Color Retouch + Olaplex Treatment",
      durationMin: 120 + timeBonus,
      durationMax: 150 + timeBonus,
      costMin: 155,
      costMax: 200,
    };
  }

  return {
    name: "Gloss or Color Maintenance",
    durationMin: 60,
    durationMax: 90,
    costMin: 45,
    costMax: 110,
  };
}

function isEligible(stylist: Stylist, answers: QuizAnswers): boolean {
  const needsExtensions =
    answers.extensions && answers.extensions !== "no_ext";
  const needsCorrection = answers.colorHistory === "correction_needed";
  const darkToLight = answers.colorHistory === "dark_to_light";

  if (needsExtensions && !stylist.extensionCertified) return false;
  if (needsCorrection && !stylist.colorCorrectionEligible) return false;

  if (
    darkToLight &&
    answers.goal === "color_complex" &&
    stylist.level === "mid"
  ) {
    return false;
  }

  if (answers.goal === "maintenance" && stylist.level === "senior") {
    const loadScore = getLoadScore(stylist.id);
    if (loadScore > 0.5) return false;
  }

  return true;
}

function scoreStylist(stylist: Stylist, answers: QuizAnswers): number {
  let score = 50;
  const loadScore = getLoadScore(stylist.id);

  const goalTagMap: Record<string, string[]> = {
    color_complex: ["blonde", "color-correction", "balayage"],
    highlights: ["balayage", "highlights", "blonde"],
    cut: ["cuts"],
    extensions: ["extensions"],
    repair: ["repair", "blonde"],
    maintenance: ["tones", "blowouts"],
  };

  const relevantTags = answers.goal ? goalTagMap[answers.goal] ?? [] : [];
  const matchCount = relevantTags.filter((t) =>
    stylist.tags.includes(t as never)
  ).length;
  score += matchCount * 10;

  if (loadScore < 0.25) score += 25;
  else if (loadScore < 0.5) score += 15;
  else if (loadScore > 0.75) score -= 15;
  if (loadScore >= 1.0) score -= 50;

  if (
    answers.budget === "budget_premium" &&
    stylist.level === "senior"
  ) {
    score += 10;
  }
  if (answers.budget === "budget_low" && stylist.level === "senior") {
    score -= 10;
  }

  return Math.max(0, score);
}

export function matchStylist(answers: QuizAnswers): QuizResult {
  const today = new Date().toISOString().split("T")[0];
  void today;

  const eligible = STYLISTS.filter((s) => isEligible(s, answers));

  if (eligible.length === 0) {
    const fallback = STYLISTS[0];
    const estimate = getServiceEstimate(answers);
    return {
      primary: {
        stylist: fallback,
        score: 0,
        recommendedService: estimate.name,
        estimatedDuration: { min: estimate.durationMin, max: estimate.durationMax },
        estimatedCost: { min: estimate.costMin, max: estimate.costMax },
        loadWarning: "Please call us to discuss availability.",
      },
    };
  }

  const scored = eligible
    .map((s) => ({ stylist: s, score: scoreStylist(s, answers) }))
    .sort((a, b) => b.score - a.score);

  const estimate = getServiceEstimate(answers);

  const toMatch = (entry: { stylist: Stylist; score: number }): StylistMatch => {
    const loadScore = getLoadScore(entry.stylist.id);
    return {
      stylist: entry.stylist,
      score: entry.score,
      recommendedService: estimate.name,
      estimatedDuration: { min: estimate.durationMin, max: estimate.durationMax },
      estimatedCost: { min: estimate.costMin, max: estimate.costMax },
      loadWarning:
        loadScore >= 1.0
          ? "Currently fully booked — please call us."
          : loadScore > 0.75
          ? "In high demand — book soon!"
          : undefined,
    };
  };

  return {
    primary: toMatch(scored[0]),
    alternate: scored[1] ? toMatch(scored[1]) : undefined,
  };
}
