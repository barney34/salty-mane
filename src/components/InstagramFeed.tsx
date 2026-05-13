import Image from "next/image";
import { IgIcon } from "./IgIcon";

// Photos committed to /public/gallery/ — no external CDN dependency.
// Phase 2: replace with real Instagram Graph API feed (see docs/AGENTIC.md).
const SALON_PHOTOS = [
  { id: "01", src: "/gallery/01.jpg", alt: "The Salty Mane — hair color work" },
  { id: "02", src: "/gallery/02.jpg", alt: "The Salty Mane — color transformation" },
  { id: "03", src: "/gallery/03.jpg", alt: "The Salty Mane — styling session" },
  { id: "04", src: "/gallery/04.jpg", alt: "The Salty Mane — hair results" },
  { id: "05", src: "/gallery/05.jpg", alt: "The Salty Mane — balayage work" },
  { id: "06", src: "/gallery/06.jpg", alt: "The Salty Mane — salon interior" },
  { id: "07", src: "/gallery/07.jpg", alt: "The Salty Mane — highlights" },
  { id: "08", src: "/gallery/08.jpg", alt: "The Salty Mane — extensions" },
  { id: "09", src: "/gallery/09.jpg", alt: "The Salty Mane — color results" },
  { id: "10", src: "/gallery/10.jpg", alt: "The Salty Mane — finished look" },
  { id: "11", src: "/gallery/11.jpg", alt: "The Salty Mane — salon space" },
];

const STYLIST_HANDLES = [
  { handle: "ericaa.mane", name: "Erica" },
  { handle: "reese.mane", name: "Reese" },
  { handle: "salty.hair.co", name: "Salty Hair Co." },
];

interface InstagramFeedProps {
  primaryHandle?: string;
}

export function InstagramFeed({ primaryHandle = "the.salty.mane" }: InstagramFeedProps) {
  return (
    <section className="py-20 px-6 bg-[#FAF7F2]" aria-labelledby="gallery-heading">
      <div className="max-w-6xl mx-auto">
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

        {/* Grid: 3-col on sm, 4-col on lg. Featured first photo is larger on lg. */}
        <div
          className="grid grid-cols-3 lg:grid-cols-4 gap-3"
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
              className={`group relative overflow-hidden rounded-xl bg-[#C9A96E]/10 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 ${
                i === 0 ? "col-span-2 row-span-2" : ""
              }`}
              style={{ aspectRatio: i === 0 ? "1 / 1" : "1 / 1" }}
              aria-label={`${photo.alt} — view on Instagram`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes={
                  i === 0
                    ? "(max-width: 640px) 66vw, (max-width: 1024px) 66vw, 50vw"
                    : "(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 25vw"
                }
                priority={i < 2}
              />
              <div className="absolute inset-0 bg-[#1A1A2E]/50 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <IgIcon className="w-8 h-8 text-white" />
              </div>
            </a>
          ))}
        </div>

        <div className="border-t border-[#C9A96E]/20 pt-8 mt-8">
          <p className="text-xs text-center text-[#8B7355] uppercase tracking-widest font-semibold mb-4">
            Also Follow Our Stylists
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {STYLIST_HANDLES.map(({ handle, name }) => (
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
