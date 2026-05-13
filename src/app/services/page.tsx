import { getServicesByCategory, formatDuration } from "@/lib/services";
import type { Service } from "@/types";
import { Clock, DollarSign, AlertCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Pricing | The Salty Mane Hair Co.",
  description:
    "Full service menu with pricing and time estimates. Color, cuts, extensions, and treatments in Alpharetta, GA.",
};

const CATEGORIES: { key: Service["category"]; label: string; desc: string }[] = [
  { key: "cuts", label: "Cuts & Styling", desc: "Precision cuts and styling services" },
  { key: "color", label: "Color Services", desc: "From gloss to full balayage transformation" },
  { key: "extensions", label: "Extensions", desc: "Hand-tied and tape-in by certified specialists" },
  { key: "treatments", label: "Treatments", desc: "Keratin, Olaplex, and restorative care" },
  { key: "styling", label: "Blowouts & Events", desc: "Styling and special occasion services" },
];

function ServiceRow({ service }: { service: Service }) {
  return (
    <div className="flex items-start justify-between gap-4 py-4 border-b border-[#C9A96E]/15 last:border-0">
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-medium text-[#1A1A2E] text-sm">{service.name}</p>
          {service.requiresConsultation && (
            <span className="text-xs bg-[#4A7FA5]/15 text-[#4A7FA5] px-2 py-0.5 rounded-full font-medium">
              Consultation Required
            </span>
          )}
          {service.requiresExtensionCert && (
            <span className="text-xs bg-[#7A9E87]/15 text-[#7A9E87] px-2 py-0.5 rounded-full font-medium">
              Certified Stylists Only
            </span>
          )}
        </div>
        {service.priceNote && (
          <p className="text-xs text-[#8B7355] mt-0.5">{service.priceNote}</p>
        )}
      </div>
      <div className="shrink-0 text-right space-y-0.5">
        <div className="flex items-center gap-1 justify-end text-[#1A1A2E] text-sm font-semibold">
          <DollarSign size={13} className="text-[#C9A96E]" aria-hidden="true" />
          {service.startingPrice === 0 ? "Free" : `${service.startingPrice}+`}
        </div>
        <div className="flex items-center gap-1 justify-end text-xs text-[#8B7355]">
          <Clock size={11} aria-hidden="true" />
          {formatDuration(service.durationMin, service.durationMax)}
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-14">
        <p className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest mb-2">
          Alpharetta, GA
        </p>
        <h1 className="font-serif text-5xl font-bold text-[#1A1A2E] mb-4">
          Services & Pricing
        </h1>
        <p className="text-[#8B7355] text-lg max-w-xl mx-auto leading-relaxed">
          All prices are starting rates — final pricing confirmed during your
          appointment or consultation.
        </p>
      </div>

      <div className="bg-[#F0EBE3] border border-[#C9A96E]/20 rounded-2xl p-5 mb-12 flex gap-3">
        <AlertCircle size={18} className="text-[#C9A96E] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-sm text-[#8B7355] space-y-1">
          <p>
            <strong className="text-[#1A1A2E]">Cancellation policy:</strong> 24-hour notice required.
            Color appointments: $100 fee. No-shows: $200 fee.
          </p>
          <p>
            <strong className="text-[#1A1A2E]">Extensions:</strong> All extension appointments require a
            consultation first. Hair cost is separate from labor.
          </p>
          <p>
            <strong className="text-[#1A1A2E]">Children:</strong> Not permitted in the salon.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        {CATEGORIES.map(({ key, label, desc }) => {
          const services = getServicesByCategory(key);
          if (!services.length) return null;
          return (
            <section key={key} aria-labelledby={`cat-${key}`}>
              <div className="mb-4 pb-3 border-b-2 border-[#C9A96E]/30">
                <h2 id={`cat-${key}`} className="font-serif text-2xl font-bold text-[#1A1A2E]">
                  {label}
                </h2>
                <p className="text-sm text-[#8B7355] mt-0.5">{desc}</p>
              </div>
              <div>
                {services.map((s) => (
                  <ServiceRow key={s.id} service={s} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-16 bg-[#1A1A2E] text-[#FAF7F2] rounded-2xl p-8 text-center">
        <h2 className="font-serif text-2xl font-bold mb-3">
          Not sure what to book?
        </h2>
        <p className="text-[#FAF7F2]/70 mb-6 text-sm">
          Take our 2-minute stylist quiz and we&apos;ll recommend the right service
          and stylist for your hair goals — with a price and time estimate.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/quiz"
            className="bg-[#C9A96E] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#8B7355] transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 focus:ring-offset-[#1A1A2E]"
          >
            Take the Quiz
          </Link>
          <a
            href="sms:6786486010"
            className="border-2 border-[#FAF7F2]/30 text-[#FAF7F2] font-semibold px-8 py-3 rounded-full hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors text-sm"
          >
            Text to Book
          </a>
        </div>
      </div>
    </div>
  );
}
