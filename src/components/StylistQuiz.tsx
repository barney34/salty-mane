"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { QUIZ_QUESTIONS, matchStylist } from "@/lib/quiz";
import type { QuizAnswers, QuizAnswerValue, QuizResult } from "@/types";
import { QuizResultView } from "./QuizResult";

export function StylistQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [result, setResult] = useState<QuizResult | null>(null);

  const question = QUIZ_QUESTIONS[step];
  const total = QUIZ_QUESTIONS.length;
  const progress = ((step) / total) * 100;

  const keyMap: (keyof QuizAnswers)[] = [
    "goal",
    "hairType",
    "colorHistory",
    "extensions",
    "budget",
    "time",
  ];

  function handleAnswer(value: QuizAnswerValue) {
    const key = keyMap[step];
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < total - 1) {
      setStep(step + 1);
    } else {
      setResult(matchStylist(updated));
    }
  }

  function handleBack() {
    if (step > 0) setStep(step - 1);
  }

  function handleRetake() {
    setStep(0);
    setAnswers({});
    setResult(null);
  }

  if (result) {
    return <QuizResultView result={result} onRetake={handleRetake} />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-[#8B7355] font-medium uppercase tracking-widest">
            Question {step + 1} of {total}
          </span>
          <span className="text-xs text-[#8B7355]">
            {Math.round(((step + 1) / total) * 100)}% complete
          </span>
        </div>
        <div
          className="h-1 bg-[#C9A96E]/20 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-[#C9A96E] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A2E] mb-2">
          {question.question}
        </h2>
        {question.subtitle && (
          <p className="text-[#8B7355] text-sm">{question.subtitle}</p>
        )}
      </div>

      {/* Answers */}
      <ul className="space-y-3" role="list">
        {question.answers.map((answer) => {
          const currentKey = keyMap[step];
          const isSelected = answers[currentKey] === answer.value;
          return (
            <li key={answer.value}>
              <button
                onClick={() => handleAnswer(answer.value)}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 ${
                  isSelected
                    ? "border-[#C9A96E] bg-[#C9A96E] text-white"
                    : "border-[#C9A96E]/25 bg-[#F0EBE3] text-[#1A1A2E] hover:border-[#C9A96E] hover:bg-[#C9A96E]/10"
                }`}
                aria-pressed={isSelected}
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
                      <p
                        className={`text-xs mt-0.5 ${
                          isSelected ? "text-white/75" : "text-[#8B7355]"
                        }`}
                      >
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

      {/* Back button */}
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
