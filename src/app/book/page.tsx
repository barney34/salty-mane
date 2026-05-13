"use client";

import { useState } from "react";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import type { Service, Stylist, ServiceCategory } from "@/types";
import { isDateFullyBooked, isSlotAvailable, TIME_SLOTS } from "@/lib/mockCalendar";
import { SERVICES, formatDuration } from "@/lib/services";
import { STYLISTS } from "@/lib/stylists";
import { getLoadScore } from "@/lib/scheduling";
import { BOOK_SMS_GENERAL } from "@/lib/booking";
import { SALON_PHONE_DISPLAY } from "@/lib/business";

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

function toDateStr(d: Date): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(d);
}

function todayStr(): string {
  return toDateStr(new Date());
}

function addDays(dateStr: string, n: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return toDateStr(new Date(y, m - 1, d + n));
}

function formatDateDisplay(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function getEligibleStylists(svc: Service): Stylist[] {
  let eligible = STYLISTS;
  if (svc.requiresExtensionCert) {
    eligible = eligible.filter((s) => s.extensionCertified);
  } else if (svc.id === "color-correction") {
    eligible = eligible.filter((s) => s.colorCorrectionEligible);
  }
  return [...eligible].sort((a, b) => getLoadScore(a.id) - getLoadScore(b.id));
}

function getAvailabilityBadge(score: number): { label: string; color: string } {
  if (score >= 1.0) return { label: "Fully Booked", color: "text-[#C0392B]" };
  if (score >= 0.5) return { label: "Limited", color: "text-[#D4846A]" };
  return { label: "Available", color: "text-[#7A9E87]" };
}

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
                    type="button"
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
          type="button"
          onClick={onContinue}
          className="bg-[#C9A96E] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#8B7355] transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function StylistStep({
  service,
  selected,
  onSelect,
  onContinue,
  onBack,
}: {
  service: Service;
  selected: Stylist | null;
  onSelect: (s: Stylist) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  const stylists = getEligibleStylists(service);

  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-[#1A1A2E] mb-1">
        Choose your stylist
      </h2>
      <p className="text-sm text-[#8B7355] mb-6">
        Showing stylists available for{" "}
        <span className="font-medium text-[#1A1A2E]">{service.name}</span>
      </p>

      <div className="space-y-3">
        {stylists.map((st) => {
          const score = getLoadScore(st.id);
          const badge = getAvailabilityBadge(score);
          const fullyBooked = score >= 1.0;
          return (
            <button
              key={st.id}
              type="button"
              disabled={fullyBooked}
              onClick={() => onSelect(st)}
              className={`w-full text-left p-4 rounded-2xl border transition-all focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 ${
                fullyBooked
                  ? "border-[#C9A96E]/10 bg-[#F0EBE3]/50 opacity-50 cursor-not-allowed"
                  : selected?.id === st.id
                  ? "border-[#C9A96E] bg-[#C9A96E]/10 shadow-sm"
                  : "border-[#C9A96E]/20 bg-[#F0EBE3] hover:border-[#C9A96E]/60 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[#1A1A2E]">{st.name}</p>
                  <p className="text-xs text-[#8B7355] mt-0.5">{st.title}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {st.specialties.slice(0, 3).map((sp) => (
                      <span
                        key={sp}
                        className="text-xs bg-[#FAF7F2] border border-[#C9A96E]/30 text-[#8B7355] px-2 py-0.5 rounded-full"
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
                <span className={`text-xs font-medium shrink-0 mt-1 ${badge.color}`}>
                  {badge.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="border-2 border-[#1A1A2E] text-[#1A1A2E] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#1A1A2E] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A2E] focus:ring-offset-2"
        >
          Back
        </button>
        <button
          disabled={!selected}
          type="button"
          onClick={onContinue}
          className="bg-[#C9A96E] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#8B7355] transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

const DAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function DateTimeStep({
  stylist,
  date,
  slotIndex,
  onDateSelect,
  onSlotSelect,
  onContinue,
  onBack,
}: {
  stylist: Stylist;
  date: string | null;
  slotIndex: number | null;
  onDateSelect: (d: string) => void;
  onSlotSelect: (i: number) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  const today = todayStr();
  const maxDate = addDays(today, 30);
  const todayYear = parseInt(today.slice(0, 4));
  const todayMonthIndex = parseInt(today.slice(5, 7)) - 1;

  const [viewYear, setViewYear] = useState(todayYear);
  const [viewMonth, setViewMonth] = useState(todayMonthIndex);

  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startPad = firstOfMonth.getDay();
  const monthLabel = firstOfMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const canGoPrev =
    viewYear > todayYear ||
    (viewYear === todayYear && viewMonth > todayMonthIndex);

  const nextMonthStr =
    viewMonth === 11
      ? `${viewYear + 1}-01-01`
      : `${viewYear}-${String(viewMonth + 2).padStart(2, "0")}-01`;
  const canGoNext = nextMonthStr <= maxDate;

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-[#1A1A2E] mb-6">
        Pick a date &amp; time
      </h2>

      <div className="bg-[#F0EBE3] rounded-2xl p-5 border border-[#C9A96E]/20">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={prevMonth}
            disabled={!canGoPrev}
            className="p-1.5 rounded-full hover:bg-[#C9A96E]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} className="text-[#1A1A2E]" />
          </button>
          <span className="font-semibold text-[#1A1A2E] text-sm">{monthLabel}</span>
          <button
            type="button"
            onClick={nextMonth}
            disabled={!canGoNext}
            className="p-1.5 rounded-full hover:bg-[#C9A96E]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
            aria-label="Next month"
          >
            <ChevronRight size={18} className="text-[#1A1A2E]" />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-2">
          {DAY_HEADERS.map((h) => (
            <div
              key={h}
              className="text-center text-xs font-semibold text-[#8B7355] py-1"
            >
              {h}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startPad }).map((_, i) => (
            <div key={`pad-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const ds = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
            const isSunday = new Date(viewYear, viewMonth, dayNum).getDay() === 0;
            const isPast = ds < today;
            const isBeyond = ds > maxDate;
            const isFullyBooked = isDateFullyBooked(stylist.id, ds);
            const disabled = isSunday || isPast || isBeyond || isFullyBooked;
            const isSelected = ds === date;

            return (
              <button
                type="button"
                key={ds}
                disabled={disabled}
                onClick={() => onDateSelect(ds)}
                className={`aspect-square rounded-full text-sm font-medium transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#C9A96E] ${
                  isSelected
                    ? "bg-[#C9A96E] text-white"
                    : disabled
                    ? "text-[#8B7355]/30 cursor-not-allowed"
                    : "text-[#1A1A2E] hover:bg-[#C9A96E]/20"
                }`}
                aria-label={ds}
                aria-pressed={isSelected}
              >
                {dayNum}
              </button>
            );
          })}
        </div>
      </div>

      {date && (
        <div className="mt-6">
          <p className="text-sm font-semibold text-[#1A1A2E] mb-3">
            Available times — {formatDateDisplay(date)}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.map((slot, i) => {
              const available = isSlotAvailable(stylist.id, date, i);
              const isSelected = slotIndex === i;
              return (
                <button
                  type="button"
                  key={slot}
                  disabled={!available}
                  onClick={() => onSlotSelect(i)}
                  className={`py-2.5 rounded-xl text-xs font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] ${
                    isSelected
                      ? "bg-[#C9A96E] text-white border-[#C9A96E]"
                      : available
                      ? "bg-[#F0EBE3] border-[#C9A96E]/30 text-[#1A1A2E] hover:border-[#C9A96E]"
                      : "bg-[#F0EBE3]/50 border-[#C9A96E]/10 text-[#8B7355]/40 cursor-not-allowed"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="border-2 border-[#1A1A2E] text-[#1A1A2E] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#1A1A2E] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A2E] focus:ring-offset-2"
        >
          Back
        </button>
        <button
          disabled={!date || slotIndex === null}
          type="button"
          onClick={onContinue}
          className="bg-[#C9A96E] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#8B7355] transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function ConfirmStep({
  service,
  stylist,
  date,
  slotIndex,
  confirmed,
  onConfirm,
  onReset,
  onBack,
}: {
  service: Service;
  stylist: Stylist;
  date: string;
  slotIndex: number;
  confirmed: boolean;
  onConfirm: () => void;
  onReset: () => void;
  onBack: () => void;
}) {
  const formattedDate = formatDateDisplay(date);
  const formattedTime = TIME_SLOTS[slotIndex];

  if (confirmed) {
    return (
      <div className="text-center py-8">
        <CheckCircle
          size={56}
          className="text-[#7A9E87] mx-auto mb-4"
          strokeWidth={1.5}
        />
        <h2 className="font-serif text-2xl font-bold text-[#1A1A2E] mb-2">
          You&apos;re booked!
        </h2>
        <div className="bg-[#F0EBE3] rounded-2xl border border-[#C9A96E]/20 p-6 mt-6 text-left max-w-sm mx-auto">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="text-xs uppercase tracking-widest text-[#8B7355] mb-0.5">
                Service
              </dt>
              <dd className="font-medium text-[#1A1A2E]">
                {service.name}
                <span className="text-[#8B7355] font-normal ml-2">
                  {service.startingPrice === 0 ? "Free" : `from $${service.startingPrice}`}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-[#8B7355] mb-0.5">
                Stylist
              </dt>
              <dd className="font-medium text-[#1A1A2E]">
                {stylist.name}
                <span className="text-[#8B7355] font-normal ml-2">
                  — {stylist.title}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-widest text-[#8B7355] mb-0.5">
                Date &amp; Time
              </dt>
              <dd className="font-medium text-[#1A1A2E]">
                {formattedDate} at {formattedTime}
              </dd>
            </div>
          </dl>
        </div>
        <p className="text-sm text-[#8B7355] mt-6 max-w-xs mx-auto">
          We&apos;ll reach out to confirm your appointment. Questions?{" "}
          <a
            href={BOOK_SMS_GENERAL}
            className="text-[#C9A96E] underline underline-offset-2"
          >
            Text us at {SALON_PHONE_DISPLAY}
          </a>
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-6 text-sm text-[#8B7355] underline underline-offset-2 hover:text-[#1A1A2E] transition-colors"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-serif text-xl font-bold text-[#1A1A2E] mb-6">
        Confirm your booking
      </h2>
      <div className="bg-[#F0EBE3] rounded-2xl border border-[#C9A96E]/20 p-6">
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-widest text-[#8B7355] mb-0.5">
              Service
            </dt>
            <dd className="font-medium text-[#1A1A2E]">
              {service.name}
              <span className="text-[#8B7355] font-normal ml-2">
                {service.startingPrice === 0 ? "Free" : `from $${service.startingPrice}`}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-[#8B7355] mb-0.5">
              Stylist
            </dt>
            <dd className="font-medium text-[#1A1A2E]">
              {stylist.name}
              <span className="text-[#8B7355] font-normal ml-2">
                — {stylist.title}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-[#8B7355] mb-0.5">
              Date &amp; Time
            </dt>
            <dd className="font-medium text-[#1A1A2E]">
              {formattedDate} at {formattedTime}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="border-2 border-[#1A1A2E] text-[#1A1A2E] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#1A1A2E] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A2E] focus:ring-offset-2"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="bg-[#C9A96E] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#8B7355] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
        >
          Confirm Booking
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

  function reset() {
    setStep(1);
    setConfirmed(false);
    setService(null);
    setStylist(null);
    setDate(null);
    setSlotIndex(null);
  }

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
            <StylistStep
              service={service!}
              selected={stylist}
              onSelect={setStylist}
              onContinue={() => {
                setStep(3);
                setDate(null);
                setSlotIndex(null);
              }}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <DateTimeStep
              stylist={stylist!}
              date={date}
              slotIndex={slotIndex}
              onDateSelect={(d) => {
                setDate(d);
                setSlotIndex(null);
              }}
              onSlotSelect={setSlotIndex}
              onContinue={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <ConfirmStep
              service={service!}
              stylist={stylist!}
              date={date!}
              slotIndex={slotIndex!}
              confirmed={confirmed}
              onConfirm={() => setConfirmed(true)}
              onReset={reset}
              onBack={() => setStep(3)}
            />
          )}
        </div>
      </div>
    </main>
  );
}
