import Link from "next/link";
import { Scissors, Star, Shield, MapPin, Phone, Clock } from "lucide-react";
import { STYLISTS } from "@/lib/stylists";
import { getAllLoadScores } from "@/lib/scheduling";
import { StylistCard } from "@/components/StylistCard";
import {
  SALON_PHONE,
  SALON_PHONE_DISPLAY,
  SALON_EMAIL,
  SALON_ADDRESS,
  SALON_HOURS,
  SALON_INSTAGRAM_MAIN,
} from "@/lib/business";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Testimonials } from "@/components/Testimonials";
import { BOOK_SMS_GENERAL } from "@/lib/booking";

const TRUST_BADGES = [
  { icon: Star, title: "4.5★ Rated", desc: "366+ reviews from clients who drive hours to see us" },
  { icon: Scissors, title: "Color & Extension Specialists", desc: "Blonde transformations, balayage, hand-tied extensions" },
  { icon: Shield, title: "Hair-Health First", desc: "We only do what's right for your hair — no shortcuts" },
];

export default function HomePage() {
  const loadScores = getAllLoadScores();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#1A1A2E] text-[#FAF7F2] py-28 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(ellipse at 70% 50%, #C9A96E 0%, transparent 60%)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-3xl mx-auto text-center">
          <p className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest mb-4">
            Alpharetta, GA · Est. 2017
          </p>
          <h1 className="font-serif text-5xl sm:text-6xl font-bold leading-tight mb-6">
            Hair that moves
            <br />
            <span className="text-[#C9A96E]">with your life.</span>
          </h1>
          <p className="text-[#FAF7F2]/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Salty Mane is Alpharetta&apos;s destination for expert color, precision
            cuts, and hand-tied extensions — all with a commitment to your
            hair&apos;s long-term health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="bg-[#C9A96E] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#8B7355] transition-colors text-base focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 focus:ring-offset-[#1A1A2E]"
            >
              Find My Stylist ✨
            </Link>
            <a
              href={BOOK_SMS_GENERAL}
              className="border-2 border-[#FAF7F2]/30 text-[#FAF7F2] font-semibold px-8 py-4 rounded-full hover:border-[#C9A96E] hover:text-[#C9A96E] transition-colors text-base focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 focus:ring-offset-[#1A1A2E]"
            >
              Book Now
            </a>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-16 px-6 bg-[#F0EBE3]" aria-label="Why Salty Mane">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8">
          {TRUST_BADGES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4 items-start">
              <div className="shrink-0 w-10 h-10 bg-[#C9A96E]/15 rounded-xl flex items-center justify-center">
                <Icon size={20} className="text-[#C9A96E]" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-semibold text-[#1A1A2E] text-sm">{title}</h2>
                <p className="text-sm text-[#8B7355] mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest mb-3">
            Not sure who to book?
          </p>
          <h2 className="font-serif text-4xl font-bold text-[#1A1A2E] mb-4">
            Take the Stylist Match Quiz
          </h2>
          <p className="text-[#8B7355] text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            6 quick questions. We&apos;ll match you with the right stylist for your
            hair goals — whether you&apos;re going blonde, adding extensions, or just
            need a great cut.
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-[#1A1A2E] text-[#FAF7F2] font-semibold px-10 py-4 rounded-full hover:bg-[#C9A96E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1A2E] focus:ring-offset-2"
          >
            Start the Quiz →
          </Link>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 px-6 bg-[#FAF7F2]" aria-labelledby="team-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest mb-2">
              Our Team
            </p>
            <h2 id="team-heading" className="font-serif text-4xl font-bold text-[#1A1A2E]">
              Meet Your Stylists
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STYLISTS.map((stylist) => (
              <StylistCard
                key={stylist.id}
                stylist={stylist}
                loadScore={loadScores[stylist.id]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Instagram feed */}
      <InstagramFeed primaryHandle={SALON_INSTAGRAM_MAIN} />

      {/* Testimonials */}
      <Testimonials />

      {/* Services teaser */}
      <section className="py-20 px-6 bg-[#1A1A2E] text-[#FAF7F2]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest mb-2">
              What We Do
            </p>
            <h2 className="font-serif text-4xl font-bold">Our Services</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { name: "Color & Balayage", desc: "From subtle highlights to full transformations", from: "$110" },
              { name: "Haircuts", desc: "Precision cuts designed to grow out beautifully", from: "$75" },
              { name: "Extensions", desc: "Hand-tied and tape-in by certified specialists", from: "$250" },
              { name: "Treatments", desc: "Keratin, Olaplex, deep conditioning", from: "$40" },
            ].map(({ name, desc, from }) => (
              <div key={name} className="bg-[#FAF7F2]/5 border border-[#FAF7F2]/10 rounded-2xl p-6 hover:border-[#C9A96E]/50 transition-colors">
                <h3 className="font-serif text-xl font-bold mb-2">{name}</h3>
                <p className="text-sm text-[#FAF7F2]/60 leading-relaxed mb-4">{desc}</p>
                <p className="text-[#C9A96E] text-sm font-semibold">From {from}</p>
              </div>
            ))}
          </div>
          <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/services"
              className="inline-block border-2 border-[#C9A96E] text-[#C9A96E] font-semibold px-8 py-3 rounded-full hover:bg-[#C9A96E] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 focus:ring-offset-[#1A1A2E]"
            >
              View Full Menu & Pricing
            </Link>
            <Link
              href="/faq"
              className="text-[#FAF7F2]/60 hover:text-[#C9A96E] font-medium text-sm flex items-center justify-center transition-colors"
            >
              Got questions? See our FAQ →
            </Link>
          </div>
        </div>
      </section>

      {/* Location + Hours */}
      <section className="py-20 px-6" aria-labelledby="location-heading">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[#C9A96E] text-sm font-semibold uppercase tracking-widest mb-2">
              Find Us
            </p>
            <h2 id="location-heading" className="font-serif text-4xl font-bold text-[#1A1A2E] mb-6">
              Visit the Salon
            </h2>
            <ul className="space-y-4 text-[#8B7355]">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#C9A96E] mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  {SALON_ADDRESS.street}<br />
                  {SALON_ADDRESS.city}, {SALON_ADDRESS.state} {SALON_ADDRESS.zip}<br />
                  <span className="text-sm text-[#8B7355]/70">{SALON_ADDRESS.directions}</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#C9A96E] shrink-0" aria-hidden="true" />
                <a href={`tel:${SALON_PHONE}`} className="hover:text-[#C9A96E] transition-colors">
                  {SALON_PHONE_DISPLAY} (call or text)
                </a>
              </li>
            </ul>
            <div className="mt-8 flex gap-4">
              <a
                href={BOOK_SMS_GENERAL}
                className="bg-[#C9A96E] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#8B7355] transition-colors text-sm"
              >
                Text to Book
              </a>
              <a
                href={`mailto:${SALON_EMAIL}`}
                className="border-2 border-[#1A1A2E] text-[#1A1A2E] font-semibold px-6 py-3 rounded-full hover:bg-[#1A1A2E] hover:text-[#FAF7F2] transition-colors text-sm"
              >
                Email Us
              </a>
            </div>
          </div>

          <div className="bg-[#F0EBE3] rounded-2xl p-6 border border-[#C9A96E]/20">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-[#C9A96E]" aria-hidden="true" />
              <h3 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-widest">
                Hours
              </h3>
            </div>
            <ul className="space-y-2 text-sm">
              {SALON_HOURS.map(({ day, hours }) => (
                <li key={day} className="flex justify-between">
                  <span className="text-[#8B7355] font-medium">{day}</span>
                  <span className={hours === "Closed" ? "text-[#8B7355]/50" : "text-[#1A1A2E]"}>
                    {hours}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-[#8B7355]/70 border-t border-[#C9A96E]/20 pt-4">
              24-hour cancellation notice required. $100 fee for color
              cancellations with less notice.
            </p>
          </div>
        </div>

        {/* Map embed — OpenStreetMap (free, no API key, works on all hosts) */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-[#C9A96E]/20">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=-84.2961%2C34.0734%2C-84.2921%2C34.0774&layer=mapnik&marker=34.0754%2C-84.2941"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            title="The Salty Mane location map"
          />
        </div>
        <div className="mt-3 text-right">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=5530+Windward+Pkwy+STE+1260+Alpharetta+GA+30004"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#8B7355] hover:text-[#C9A96E] transition-colors underline underline-offset-2"
          >
            Get directions in Google Maps →
          </a>
        </div>
      </section>
    </>
  );
}
