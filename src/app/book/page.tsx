"use client";

import { useState } from "react";
import type { Service, Stylist } from "@/types";
import type { ServiceCategory } from "@/types";
import { SERVICES, formatDuration } from "@/lib/services";

type Step = 1 | 2 | 3 | 4;

const STEP_LABELS: Record<Step, string> = {
  1: "Service",
  2: "Stylist",
  3: "Date & Time",
  4: "Confirm",
};

const SERVICE_GROUPS: { label: string; categories: ServiceCategory[] }[] = [
  { label: "Cuts & Styling", categories: ["cuts", "styling"] },
  { label: "Color", categories: ["color"] },
  { label: "Extensions", categories: ["extensions"] },
  { label: "Treatments", categories: ["treatments"] },
];

function ServiceStep({
  selected,
  onSelect,
  onContinue,
}: {
  selected: Service | null;
  onSelect: (s: Service) => void;
  onContinue: () => void;
}) {
  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-[#1A1A2E] mb-6">
        What service are you looking for?
      </h2>
      <div className="space-y-6">
        {SERVICE_GROUPS.map(({ label, categories }) => {
          const services = SERVICES.filter((s) => categories.includes(s.category));
          return (
            <div key={label}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#8B7355] mb-3">
                {label}
              </h3>
              <div className="space-y-2">
                {services.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => onSelect(svc)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 ${
                      selected?.id === svc.id
                        ? "border-[#C9A96E] bg-[#C9A96E]/10 shadow-sm"
                        : "border-[#C9A96E]/20 bg-[#F0EBE3] hover:border-[#C9A96E]/60 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-[#1A1A2E] text-sm">{svc.name}</p>
                        {svc.priceNote && (
                          <p className="text-xs text-[#8B7355] mt-0.5">{svc.priceNote}</p>
                        )}
                        {svc.requiresConsultation && (
                          <p className="text-xs text-[#D4846A] mt-1">
                            Consultation required — we&apos;ll confirm details after booking
                          </p>
                        )}
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-[#1A1A2E]">
                          {svc.startingPrice === 0 ? "Free" : `from $${svc.startingPrice}`}
                        </p>
                        <p className="text-xs text-[#8B7355] mt-0.5">
                          {formatDuration(svc.durationMin, svc.durationMax)}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          disabled={!selected}
          onClick={onContinue}
          className="bg-[#C9A96E] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#8B7355] transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function ProgressBar({ currentStep }: { currentStep: Step }) {
  const steps = [1, 2, 3, 4] as Step[];
  return (
    <div className="flex items-center" role="list" aria-label="Booking steps">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center flex-1 last:flex-none" role="listitem">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                s < currentStep
                  ? "bg-[#C9A96E] text-white"
                  : s === currentStep
                  ? "bg-[#1A1A2E] text-white"
                  : "bg-[#F0EBE3] text-[#8B7355]"
              }`}
              aria-current={s === currentStep ? "step" : undefined}
            >
              {s < currentStep ? "✓" : s}
            </div>
            <span className="text-xs mt-1 text-[#8B7355] hidden sm:block">
              {STEP_LABELS[s]}
            </span>
          </div>
          {i < 3 && (
            <div
              className={`flex-1 h-0.5 mx-2 mb-4 ${
                s < currentStep ? "bg-[#C9A96E]" : "bg-[#F0EBE3]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function BookPage() {
  const [step, setStep] = useState<Step>(1);
  const [confirmed, setConfirmed] = useState(false);
  const [service, setService] = useState<Service | null>(null);
  const [stylist, setStylist] = useState<Stylist | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [slotIndex, setSlotIndex] = useState<number | null>(null);

  void stylist;
  void date;
  void slotIndex;
  void confirmed;

  function reset() {
    setStep(1);
    setConfirmed(false);
    setService(null);
    setStylist(null);
    setDate(null);
    setSlotIndex(null);
  }

  void reset;

  return (
    <main className="min-h-screen bg-[#FAF7F2] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-3xl font-bold text-[#1A1A2E] mb-2 text-center">
          Book an Appointment
        </h1>
        <p className="text-[#8B7355] text-center mb-10 text-sm">
          Select your service, choose a stylist, and pick a time.
        </p>

        <ProgressBar currentStep={step} />

        <div className="mt-10">
          {step === 1 && (
            <ServiceStep
              selected={service}
              onSelect={setService}
              onContinue={() => {
                setStep(2);
                setStylist(null);
                setDate(null);
                setSlotIndex(null);
              }}
            />
          )}
          {step === 2 && (
            <div>
              <p className="text-center text-[#8B7355]">Step 2 — Stylist</p>
              <div className="flex gap-3 mt-4 justify-center">
                <button
                  className="border border-[#1A1A2E] text-[#1A1A2E] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#1A1A2E] hover:text-white transition-colors"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  className="bg-[#C9A96E] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8B7355] transition-colors"
                  onClick={() => setStep(3)}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <p className="text-center text-[#8B7355]">Step 3 — Date & Time</p>
              <div className="flex gap-3 mt-4 justify-center">
                <button
                  className="border border-[#1A1A2E] text-[#1A1A2E] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#1A1A2E] hover:text-white transition-colors"
                  onClick={() => setStep(2)}
                >
                  Back
                </button>
                <button
                  className="bg-[#C9A96E] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8B7355] transition-colors"
                  onClick={() => setStep(4)}
                >
                  Continue
                </button>
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <p className="text-center text-[#8B7355]">Step 4 — Confirm</p>
              <div className="flex gap-3 mt-4 justify-center">
                <button
                  className="border border-[#1A1A2E] text-[#1A1A2E] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#1A1A2E] hover:text-white transition-colors"
                  onClick={() => setStep(3)}
                >
                  Back
                </button>
                <button
                  className="bg-[#C9A96E] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#8B7355] transition-colors"
                  onClick={() => setConfirmed(true)}
                >
                  Confirm Booking
                </button>
              </div>
              {confirmed && (
                <div className="mt-6 text-center">
                  <p className="text-[#7A9E87] font-semibold">You&apos;re booked!</p>
                  <button className="mt-4 text-[#C9A96E] underline text-sm" onClick={reset}>
                    Book Another
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
