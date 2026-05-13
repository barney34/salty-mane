export type StylistLevel = "senior" | "mid-senior" | "mid";

export interface Stylist {
  id: string;
  name: string;
  level: StylistLevel;
  title: string;
  bio: string;
  specialties: string[];
  tags: StylistTag[];
  extensionCertified: boolean;
  colorCorrectionEligible: boolean;
  maxComplexPerDay: number;
  maxTotalSlotsPerDay: number;
  instagram?: string;
  headshot?: string;
}

export type StylistTag =
  | "blonde"
  | "balayage"
  | "highlights"
  | "extensions"
  | "color-correction"
  | "cuts"
  | "blowouts"
  | "repair"
  | "tones"
  | "keratin";

export interface StylistLoad {
  stylistId: string;
  date: string;
  bookedComplex: number;
  bookedTotal: number;
}

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  startingPrice: number;
  priceNote?: string;
  durationMin: number;
  durationMax: number;
  requiresConsultation?: boolean;
  requiresExtensionCert?: boolean;
}

export type ServiceCategory =
  | "cuts"
  | "color"
  | "extensions"
  | "treatments"
  | "styling";

export type QuizAnswerValue =
  | "color_complex"
  | "highlights"
  | "cut"
  | "extensions"
  | "repair"
  | "maintenance"
  | "fine"
  | "medium"
  | "thick"
  | "curly"
  | "virgin"
  | "already_blonde"
  | "dark_to_light"
  | "previously_colored"
  | "correction_needed"
  | "ext_length"
  | "ext_volume"
  | "ext_both"
  | "no_ext"
  | "budget_low"
  | "budget_mid"
  | "budget_high"
  | "budget_premium"
  | "time_short"
  | "time_medium"
  | "time_long"
  | "time_flex";

export interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  answers: QuizAnswer[];
}

export interface QuizAnswer {
  value: QuizAnswerValue;
  label: string;
  description?: string;
  icon?: string;
}

export interface QuizAnswers {
  goal?: QuizAnswerValue;
  hairType?: QuizAnswerValue;
  colorHistory?: QuizAnswerValue;
  extensions?: QuizAnswerValue;
  budget?: QuizAnswerValue;
  time?: QuizAnswerValue;
}

export interface StylistMatch {
  stylist: Stylist;
  score: number;
  recommendedService: string;
  estimatedDuration: { min: number; max: number };
  estimatedCost: { min: number; max: number };
  loadWarning?: string;
}

export interface QuizResult {
  primary: StylistMatch;
  alternate?: StylistMatch;
}
