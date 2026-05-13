"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { QUIZ_QUESTIONS, matchStylist } from "@/lib/quiz";
import type { QuizAnswers, QuizAnswerValue, QuizResult } from "@/types";
import { QuizResultView } from "./QuizResult";

export function StylistQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const question = QUIZ_QUESTIONS[step];
  const total = QUIZ_QUESTIONS.length;
  const progressPct = Math.round(((step + 1) / total) * 100);

  // Move focus to question heading on step change so keyboard/SR users know content changed
  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  function handleAnswer(value: QuizAnswerValue) {
    if (!question) return;
    const updated = { ...answers, [question.id]: value };
    setAnswers(updated);

    if (step < total - 1) {
      setStep((s) => s + 1);
    } else {
      setResult(matchStylist(updated));
    }
  }

  function handleBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  function handleRetake() {
    setStep(0);
    setAnswers({});
    setResult(null);
  }

  if (result) {
    return <QuizResultView result={result} onRetake={handleRetake} />;
  }

  if (!question) return null;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#8B7355] font-medium uppercase tracking-widest">
            Question {step + 1} of {total}
          </span>
          <span className="text-xs text-[#8B7355]">{progressPct}% complete</span>
        </div>
        <div
          className="h-1 bg-[#C9A96E]/20 rounded-full overflow-hidden"
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-[#C9A96E] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question — tabIndex={-1} allows programmatic focus without tab stop */}
      <div className="mb-8">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-2 focus:outline-none"
        >
          {question.question}
        </h2>
        {question.subtitle && (
          <p className="text-[#8B7355] text-sm">{question.subtitle}</p>
        )}
      </div>

      {/* Answers — role="group" with heading provides context; buttons don't use aria-pressed
          since selection advances immediately (no persistent toggle state) */}
      <ul className="space-y-3" role="list">
        {question.answers.map((answer) => {
          const isSelected = answers[question.id] === answer.value;
          return (
            <li key={answer.value}>
              <button
                onClick={() => handleAnswer(answer.value)}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 ${
                  isSelected
                    ? "border-[#C9A96E] bg-[#C9A96E] text-white"
                    : "border-[#C9A96E]/25 bg-[#F0EBE3] text-[#1A1A2E] hover:border-[#C9A96E] hover:bg-[#C9A96E]/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  {answer.icon && (
                    <span className="text-xl w-8 text-center shrink-0" aria-hidden="true">
                      {answer.icon}
                    </span>
                  )}
                  <div>
                    <p className="font-semibold text-sm">{answer.label}</p>
                    {answer.description && (
                      <p className={`text-xs mt-0.5 ${isSelected ? "text-white/75" : "text-[#8B7355]"}`}>
                        {answer.description}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {step > 0 && (
        <button
          onClick={handleBack}
          className="mt-6 flex items-center gap-1.5 text-sm text-[#8B7355] hover:text-[#1A1A2E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] rounded"
        >
          <ChevronLeft size={16} aria-hidden="true" />
          Back
        </button>
      )}
    </div>
  );
}
