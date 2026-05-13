import { TESTIMONIALS } from "@/lib/testimonials";

function StarRating() {
  return (
    <div className="flex gap-0.5 mb-3" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-[#C9A96E]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 px-6 bg-[#1A1A2E]" aria-labelledby="testimonials-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest mb-2">
            Client Love
          </p>
          <h2 id="testimonials-heading" className="font-serif text-4xl font-bold text-[#FAF7F2]">
            What Our Clients Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.id}
              className="bg-[#FAF7F2]/5 border border-[#FAF7F2]/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#C9A96E]/40 transition-colors"
            >
              <StarRating />
              <blockquote>
                <p className="font-serif italic text-[#FAF7F2]/85 text-sm leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-auto pt-4 border-t border-[#FAF7F2]/10">
                <p className="text-[#FAF7F2] text-sm font-semibold">{t.author}</p>
                <p className="text-[#C9A96E] text-xs mt-0.5">
                  {t.service} · with {t.stylist}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
