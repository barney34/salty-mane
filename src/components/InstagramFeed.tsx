"use client";

// Instagram feed — Phase 2: connect Meta Graph API (see docs/AGENTIC.md).
// The Basic Display API was shut down Dec 2024. Graph API is free but requires
// Meta app review (~4–6 weeks). Until then, this section links to the real profile.

function IgIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      className={className ?? "w-7 h-7"} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const HANDLES = [
  { handle: "the.salty.mane", label: "Salon work & transformations" },
  { handle: "salty.hair.co", label: "Color & extension inspiration" },
];

interface InstagramFeedProps {
  primaryHandle?: string;
}

export function InstagramFeed({ primaryHandle = "the.salty.mane" }: InstagramFeedProps) {
  void primaryHandle; // reserved for Phase 2 API call

  return (
    <section className="py-20 px-6 bg-[#FAF7F2]" aria-labelledby="instagram-heading">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest mb-2">
            Follow Our Work
          </p>
          <h2 id="instagram-heading" className="font-serif text-4xl font-bold text-[#1A1A2E] mb-4">
            See It on Instagram
          </h2>
          <p className="text-[#8B7355] max-w-lg mx-auto text-base leading-relaxed">
            Our stylists post their best transformations daily — before & afters,
            extension installs, and color work you&apos;ll want to screenshot.
          </p>
        </div>

        {/* Profile cards */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
          {HANDLES.map(({ handle, label }) => (
            <a
              key={handle}
              href={`https://instagram.com/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-[#1A1A2E] text-[#FAF7F2] rounded-2xl px-7 py-5 hover:bg-[#C9A96E] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
            >
              <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#D4846A] flex items-center justify-center group-hover:from-white/20 group-hover:to-white/10 transition-all">
                <IgIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="font-semibold text-sm">@{handle}</p>
                <p className="text-xs text-[#FAF7F2]/60 group-hover:text-white/70 mt-0.5">{label}</p>
              </div>
              <svg className="ml-auto w-4 h-4 text-[#FAF7F2]/40 group-hover:text-white/60" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ))}
        </div>

        {/* Individual stylist Instagram links */}
        <div className="border-t border-[#C9A96E]/20 pt-8">
          <p className="text-xs text-center text-[#8B7355] uppercase tracking-widest font-semibold mb-4">
            Follow Individual Stylists
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { handle: "ericaa.mane", name: "Erica" },
              { handle: "reese.mane", name: "Reese" },
            ].map(({ handle, name }) => (
              <a
                key={handle}
                href={`https://instagram.com/${handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#8B7355] border border-[#C9A96E]/30 rounded-full px-4 py-2 hover:border-[#C9A96E] hover:text-[#1A1A2E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
              >
                <IgIcon className="w-3.5 h-3.5" />
                {name} · @{handle}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
