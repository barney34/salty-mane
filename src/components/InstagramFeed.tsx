"use client";

// Real salon photos sourced from Yahoo Local / Google Maps public listings.
// Instagram feed integration: see docs/AGENTIC.md Phase 2 for Graph API plan.

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

// Real photos from the salon's public business listings (Yahoo Local / Google Maps)
const SALON_PHOTOS = [
  { id: "1",  src: "https://s.yimg.com/bj/c5ab/c5ab76df63ab796c16f935ae09e1e6b5.jpg",  alt: "The Salty Mane salon — hair color work" },
  { id: "2",  src: "https://s.yimg.com/bj/ca2a/ca2a2f2fc8591f87447d4efa75081af7.jpg",  alt: "The Salty Mane — color transformation" },
  { id: "3",  src: "https://s.yimg.com/bj/7d72/7d72b652bdb45a7d590a72e6bfe18a4b.jpg",  alt: "The Salty Mane — styling session" },
  { id: "4",  src: "https://s.yimg.com/bj/e1b0/e1b0a6d84dfe843765eb7a4e18d0c7a6.jpg",  alt: "The Salty Mane — hair results" },
  { id: "5",  src: "https://s.yimg.com/bj/a05a/a05acc5fabfcab7374e700a5aeea007d.jpg",  alt: "The Salty Mane — balayage work" },
  { id: "6",  src: "https://s.yimg.com/bj/13cf/13cff0983885dcd7b8cc0a036d58199b.jpg",  alt: "The Salty Mane — salon interior" },
  { id: "7",  src: "https://s.yimg.com/bj/2789/278995842d124fe524d457c4677737c8.jpg",  alt: "The Salty Mane — highlights" },
  { id: "8",  src: "https://s.yimg.com/bj/1518/15184e16793c48566da3b24df56d1488.jpg",  alt: "The Salty Mane — extensions" },
  { id: "9",  src: "https://s.yimg.com/bj/dc7e/dc7e89a10618a2482284656cc00cd334.jpg",  alt: "The Salty Mane — color results" },
  { id: "10", src: "https://s.yimg.com/bj/7ad4/7ad43fa6a71b6ff8c66e3455a424ec25.jpg",  alt: "The Salty Mane — finished look" },
  { id: "11", src: "https://lh5.googleusercontent.com/p/AF1QipMmm9Ifhclz85YUnQi3BbaqmzeiKkKyAM8ZCAGS=s1024", alt: "The Salty Mane — salon space" },
];

interface InstagramFeedProps {
  primaryHandle?: string;
}

export function InstagramFeed({ primaryHandle = "the.salty.mane" }: InstagramFeedProps) {
  return (
    <section className="py-20 px-6 bg-[#FAF7F2]" aria-labelledby="gallery-heading">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest mb-2">
              Our Work
            </p>
            <h2 id="gallery-heading" className="font-serif text-4xl font-bold text-[#1A1A2E]">
              From the Chair
            </h2>
            <p className="text-[#8B7355] mt-2 text-sm">
              Real results from The Salty Mane — follow us for daily transformations.
            </p>
          </div>
          <a
            href={`https://instagram.com/${primaryHandle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-2 bg-[#1A1A2E] text-[#FAF7F2] font-semibold px-6 py-3 rounded-full hover:bg-[#C9A96E] transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2"
          >
            <IgIcon className="w-4 h-4" />
            @{primaryHandle}
          </a>
        </div>

        {/* Photo grid — horizontal scroll on mobile, masonry-style grid on desktop */}
        <div
          className="flex gap-3 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 lg:grid-cols-4 snap-x snap-mandatory sm:snap-none"
          role="list"
          aria-label="Salon photo gallery"
        >
          {SALON_PHOTOS.map((photo, i) => (
            <a
              key={photo.id}
              href={`https://instagram.com/${primaryHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              className={`group relative shrink-0 w-56 sm:w-auto overflow-hidden rounded-xl bg-[#C9A96E]/10 snap-start focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 ${
                // First photo spans 2 cols on lg for visual variety
                i === 0 ? "aspect-square lg:col-span-2 lg:row-span-2" : "aspect-square"
              }`}
              aria-label={`${photo.alt} — view on Instagram`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading={i < 4 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-[#1A1A2E]/50 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <IgIcon className="w-8 h-8 text-white" />
              </div>
            </a>
          ))}
        </div>

        {/* Individual stylist accounts */}
        <div className="border-t border-[#C9A96E]/20 pt-8 mt-8">
          <p className="text-xs text-center text-[#8B7355] uppercase tracking-widest font-semibold mb-4">
            Also Follow Our Stylists
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { handle: "ericaa.mane", name: "Erica" },
              { handle: "reese.mane", name: "Reese" },
              { handle: "salty.hair.co", name: "Salty Hair Co." },
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
