import { StylistQuiz } from "@/components/StylistQuiz";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Stylist | The Salty Mane Hair Co.",
  description:
    "Answer 6 quick questions and we'll match you with the perfect Salty Mane stylist for your hair goals.",
};

export default function QuizPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FAF7F2] py-12 px-6">
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <p className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest mb-2">
          Stylist Match Quiz
        </p>
        <h1 className="font-serif text-4xl font-bold text-[#1A1A2E]">
          Find Your Perfect Stylist
        </h1>
        <p className="text-[#8B7355] mt-3 text-lg">
          6 questions · 2 minutes · no wrong answers
        </p>
      </div>
      <StylistQuiz />
    </div>
  );
}
