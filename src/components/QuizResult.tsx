import type { QuizResult, StylistMatch } from "@/types";
import { Clock, DollarSign, AlertTriangle, Star } from "lucide-react";

interface QuizResultProps {
  result: QuizResult;
  onRetake: () => void;
}

function formatDuration(min: number, max: number): string {
  const fmt = (m: number) =>
    m >= 60
      ? `${Math.floor(m / 60)}hr${m % 60 > 0 ? ` ${m % 60}min` : ""}`
      : `${m}min`;
  return min === max ? fmt(min) : `${fmt(min)} – ${fmt(max)}`;
}

function MatchCard({
  match,
  isPrimary,
}: {
  match: StylistMatch;
  isPrimary: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-6 border ${
        isPrimary
          ? "bg-[#1A1A2E] text-[#FAF7F2] border-[#C9A96E]"
          : "bg-[#F0EBE3] text-[#1A1A2E] border-[#C9A96E]/20"
      }`}
    >
      {isPrimary && (
        <div className="flex items-center gap-2 mb-4">
          <Star size={14} className="text-[#C9A96E]" fill="currentColor" aria-hidden="true" />
          <span className="text-xs font-semibold text-[#C9A96E] uppercase tracking-widest">
            Best Match
          </span>
        </div>
      )}

      <div className="mb-4">
        <h2 className={`font-serif text-2xl font-bold ${isPrimary ? "text-[#FAF7F2]" : "text-[#1A1A2E]"}`}>
          {match.stylist.name}
        </h2>
        <p className={`text-sm mt-1 ${isPrimary ? "text-[#C9A96E]" : "text-[#8B7355]"}`}>
          {match.stylist.title}
        </p>
      </div>

      <p className={`text-sm leading-relaxed mb-5 ${isPrimary ? "text-[#FAF7F2]/80" : "text-[#8B7355]"}`}>
        {match.stylist.bio}
      </p>

      <div className="space-y-3 mb-5">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${isPrimary ? "text-[#C9A96E]" : "text-[#8B7355]"}`}>
            Recommended Service
          </p>
          <p className={`text-sm font-medium ${isPrimary ? "text-[#FAF7F2]" : "text-[#1A1A2E]"}`}>
            {match.recommendedService}
          </p>
        </div>

        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Clock size={14} className={isPrimary ? "text-[#C9A96E]" : "text-[#8B7355]"} aria-hidden="true" />
            <div>
              <p className={`text-xs ${isPrimary ? "text-[#FAF7F2]/60" : "text-[#8B7355]/70"}`}>Est. Time</p>
              <p className={`text-sm font-medium ${isPrimary ? "text-[#FAF7F2]" : "text-[#1A1A2E]"}`}>
                {formatDuration(match.estimatedDuration.min, match.estimatedDuration.max)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign size={14} className={isPrimary ? "text-[#C9A96E]" : "text-[#8B7355]"} aria-hidden="true" />
            <div>
              <p className={`text-xs ${isPrimary ? "text-[#FAF7F2]/60" : "text-[#8B7355]/70"}`}>Est. Cost</p>
              <p className={`text-sm font-medium ${isPrimary ? "text-[#FAF7F2]" : "text-[#1A1A2E]"}`}>
                ${match.estimatedCost.min}–${match.estimatedCost.max}
              </p>
            </div>
          </div>
        </div>
      </div>

      {match.loadWarning && (
        <div className="flex items-start gap-2 mb-4 text-xs text-[#D4846A] bg-[#D4846A]/10 rounded-lg p-3">
          <AlertTriangle size={13} className="shrink-0 mt-0.5" aria-hidden="true" />
          <span>{match.loadWarning}</span>
        </div>
      )}

      <a
        href="sms:6786486010"
        className={`block text-center text-sm font-medium py-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 ${
          isPrimary
            ? "bg-[#C9A96E] text-white hover:bg-[#8B7355]"
            : "bg-[#1A1A2E] text-[#FAF7F2] hover:bg-[#C9A96E]"
        }`}
      >
        Book with {match.stylist.name}
      </a>
    </div>
  );
}

export function QuizResultView({ result, onRetake }: QuizResultProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-sm text-[#8B7355] uppercase tracking-widest font-semibold mb-2">
          Your Match
        </p>
        <h1 className="font-serif text-3xl font-bold text-[#1A1A2E]">
          We found your perfect stylist
        </h1>
        <p className="text-[#8B7355] mt-3">
          Based on your hair goals, here&apos;s who we recommend — and a great
          backup option.
        </p>
      </div>

      <div className="space-y-4">
        <MatchCard match={result.primary} isPrimary />
        {result.alternate && (
          <div>
            <p className="text-xs text-center text-[#8B7355] uppercase tracking-widest font-semibold my-4">
              Also a Great Fit
            </p>
            <MatchCard match={result.alternate} isPrimary={false} />
          </div>
        )}
      </div>

      <div className="mt-8 text-center space-y-4">
        <p className="text-sm text-[#8B7355]">
          Questions? Call or text us at{" "}
          <a href="tel:6786486010" className="text-[#C9A96E] font-medium underline underline-offset-2">
            678-648-6010
          </a>
        </p>
        <button
          onClick={onRetake}
          className="text-sm text-[#8B7355] underline underline-offset-4 hover:text-[#1A1A2E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] rounded"
        >
          Retake the quiz
        </button>
      </div>
    </div>
  );
}
