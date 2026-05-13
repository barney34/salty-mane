"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/faq";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="bg-[#F0EBE3] rounded-2xl border border-[#C9A96E]/20 overflow-hidden"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#C9A96E]/10 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#C9A96E]"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
            >
              <span className="font-semibold text-[#1A1A2E] text-sm leading-snug pr-2">
                {item.question}
              </span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-[#C9A96E] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div
                id={`faq-answer-${item.id}`}
                className="px-6 pb-5 text-sm text-[#8B7355] leading-relaxed border-t border-[#C9A96E]/15 pt-4"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
