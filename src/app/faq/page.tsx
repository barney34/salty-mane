import type { Metadata } from "next";
import Link from "next/link";
import { FAQ_ITEMS } from "@/lib/faq";
import { FaqAccordion } from "@/components/FaqAccordion";
import { BOOK_SMS } from "@/lib/booking";

export const metadata: Metadata = {
  title: "FAQ | The Salty Mane Hair Co.",
  description:
    "Answers to common questions about booking, cancellation policy, extensions, and what to expect at The Salty Mane in Alpharetta, GA.",
};

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <p className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest mb-2">
          Got Questions?
        </p>
        <h1 className="font-serif text-5xl font-bold text-[#1A1A2E] mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-[#8B7355] text-lg leading-relaxed max-w-xl mx-auto">
          Everything you need to know before your appointment.
        </p>
      </div>

      <FaqAccordion items={FAQ_ITEMS} />

      <div className="mt-16 bg-[#1A1A2E] rounded-2xl p-8 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#FAF7F2] mb-3">
          Still have questions?
        </h2>
        <p className="text-[#FAF7F2]/70 text-sm mb-6">
          We&apos;re happy to help. Text us and we&apos;ll get back to you quickly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={BOOK_SMS}
            className="bg-[#C9A96E] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#8B7355] transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 focus:ring-offset-[#1A1A2E]"
          >
            Text Us
          </a>
          <Link
            href="/quiz"
            className="border-2 border-[#FAF7F2]/30 text-[#FAF7F2] font-semibold px-8 py-3 rounded-full hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors text-sm"
          >
            Find My Stylist →
          </Link>
        </div>
      </div>
    </div>
  );
}
