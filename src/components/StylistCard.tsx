import type { Stylist } from "@/types";
import { Check } from "lucide-react";

interface StylistCardProps {
  stylist: Stylist;
  loadScore?: number;
}

const LEVEL_LABEL: Record<Stylist["level"], string> = {
  senior: "Senior Stylist",
  "mid-senior": "Mid-Senior Stylist",
  mid: "Stylist",
};

export function StylistCard({ stylist, loadScore = 0 }: StylistCardProps) {
  const inHighDemand = loadScore > 0.75;
  const fullyBooked = loadScore >= 1.0;

  return (
    <article className="bg-[#F0EBE3] rounded-2xl p-6 border border-[#C9A96E]/20 hover:shadow-md transition-shadow flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-serif text-xl font-bold text-[#1A1A2E]">
            {stylist.name}
          </h3>
          <p className="text-sm text-[#8B7355] font-medium mt-0.5">
            {stylist.title}
          </p>
        </div>
        {fullyBooked ? (
          <span className="shrink-0 text-xs bg-[#1A1A2E] text-[#FAF7F2] px-3 py-1 rounded-full font-medium">
            Fully Booked
          </span>
        ) : inHighDemand ? (
          <span className="shrink-0 text-xs bg-[#D4846A] text-white px-3 py-1 rounded-full font-medium">
            In Demand
          </span>
        ) : null}
      </div>

      <p className="text-sm text-[#8B7355] leading-relaxed">{stylist.bio}</p>

      <div>
        <p className="text-xs font-semibold text-[#1A1A2E] uppercase tracking-widest mb-2">
          Specialties
        </p>
        <ul className="flex flex-wrap gap-2">
          {stylist.specialties.map((s) => (
            <li
              key={s}
              className="text-xs bg-[#C9A96E]/15 text-[#8B7355] px-3 py-1 rounded-full font-medium border border-[#C9A96E]/30"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      {stylist.extensionCertified && (
        <div className="flex items-center gap-2 text-xs text-[#7A9E87] font-medium">
          <Check size={14} aria-hidden="true" />
          <span>Extension Certified</span>
        </div>
      )}

      {!fullyBooked && (
        <a
          href="sms:6786486010"
          className="mt-auto block text-center bg-[#1A1A2E] text-[#FAF7F2] text-sm font-medium py-3 rounded-full hover:bg-[#C9A96E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
        >
          Book with {stylist.name}
        </a>
      )}
    </article>
  );
}
