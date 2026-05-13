import Image from "next/image";

function IgIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "w-7 h-7"}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// PLACEHOLDER DATA — replace image URLs with real Instagram CDN URLs once
// Meta Graph API access is approved (see docs/AGENTIC.md Phase 2).
// Each post: { id, src, alt, caption }
const PLACEHOLDER_POSTS = [
  {
    id: "1",
    src: "https://picsum.photos/seed/salty-1/600/600",
    alt: "Balayage transformation — warm golden tones on brunette hair",
    caption: "Sun-kissed and effortless ☀️ #balayage #saltymane",
  },
  {
    id: "2",
    src: "https://picsum.photos/seed/salty-2/600/600",
    alt: "Blonde highlights with dimensional color",
    caption: "Going lighter, feeling lighter ✨ #blonde #highlights",
  },
  {
    id: "3",
    src: "https://picsum.photos/seed/salty-3/600/600",
    alt: "Hand-tied extensions before and after",
    caption: "Length goals achieved 💫 #extensions #handtied",
  },
  {
    id: "4",
    src: "https://picsum.photos/seed/salty-4/600/600",
    alt: "Fresh haircut with blowout styling",
    caption: "A great cut changes everything ✂️ #haircut #saltymane",
  },
  {
    id: "5",
    src: "https://picsum.photos/seed/salty-5/600/600",
    alt: "Color correction results — from brassiness to cool blonde",
    caption: "Corrected and glowing 🌿 #colorcorrection #healthyhair",
  },
  {
    id: "6",
    src: "https://picsum.photos/seed/salty-6/600/600",
    alt: "Lived-in color with dimensional brunette tones",
    caption: "Lived-in color that moves with you 〰️ #livedincolor",
  },
];

interface InstagramFeedProps {
  handle?: string;
}

export function InstagramFeed({ handle = "the.salty.mane" }: InstagramFeedProps) {
  return (
    <section className="py-20 px-6 bg-[#FAF7F2]" aria-labelledby="instagram-heading">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest mb-1">
              Follow Our Work
            </p>
            <h2 id="instagram-heading" className="font-serif text-3xl font-bold text-[#1A1A2E] flex items-center gap-3">
              <IgIcon className="text-[#C9A96E]" />
              @{handle}
            </h2>
          </div>
          <a
            href={`https://instagram.com/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 border-2 border-[#1A1A2E] text-[#1A1A2E] font-semibold px-6 py-3 rounded-full hover:bg-[#1A1A2E] hover:text-[#FAF7F2] transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#1A1A2E] focus:ring-offset-2"
          >
            <IgIcon className="w-4 h-4" aria-hidden="true" />
            Follow on Instagram
          </a>
        </div>

        {/* Scrollable feed — horizontal scroll on mobile, grid on desktop */}
        <div
          className="flex gap-3 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 lg:grid-cols-6 snap-x snap-mandatory sm:snap-none"
          role="list"
          aria-label="Instagram posts"
        >
          {PLACEHOLDER_POSTS.map((post) => (
            <a
              key={post.id}
              href={`https://instagram.com/${handle}`}
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              className="group relative shrink-0 w-56 sm:w-auto aspect-square rounded-xl overflow-hidden bg-[#C9A96E]/10 snap-start focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
              aria-label={post.alt}
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 224px, (max-width: 1024px) 33vw, 16vw"
              />
              {/* Caption overlay on hover */}
              <div className="absolute inset-0 bg-[#1A1A2E]/70 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 flex items-end p-3">
                <p className="text-[#FAF7F2] text-xs leading-snug line-clamp-2">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* API status note — visible only in dev, hidden in production */}
        {process.env.NODE_ENV === "development" && (
          <p className="mt-6 text-center text-xs text-[#8B7355]/60 border border-dashed border-[#C9A96E]/30 rounded-lg p-3">
            📌 Dev note: These are placeholder images. Real Instagram photos require Meta Graph API
            approval (~4–6 weeks). See <code>docs/AGENTIC.md</code> Phase 2 for integration plan.
          </p>
        )}
      </div>
    </section>
  );
}
