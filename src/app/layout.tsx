import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Salty Mane Hair Co. | Alpharetta, GA",
  description:
    "Alpharetta's premier hair salon specializing in color, cuts, and extensions. Located off Windward Pkwy. Text 678-648-6010 to book.",
  keywords: [
    "hair salon Alpharetta GA",
    "balayage Alpharetta",
    "hair extensions Alpharetta",
    "blonde specialist Georgia",
    "The Salty Mane",
  ],
  openGraph: {
    title: "The Salty Mane Hair Co.",
    description: "Color, cuts & extensions — Alpharetta, GA",
    url: "https://thesaltymane.com",
    siteName: "The Salty Mane Hair Co.",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-[#FAF7F2] text-[#1A1A2E] font-sans antialiased">
        <Navigation />
        <main>{children}</main>
        <footer className="bg-[#1A1A2E] text-[#FAF7F2]/70 py-12 px-6 mt-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-[#FAF7F2] text-lg font-bold mb-3">
                The Salty Mane Hair Co.
              </h3>
              <p className="text-sm leading-relaxed">
                5530 Windward Parkway STE #1260
                <br />
                Alpharetta, GA 30004
              </p>
              <p className="text-sm mt-2">
                <a href="tel:6786486010" className="hover:text-[#C9A96E] transition-colors">
                  678-648-6010
                </a>
              </p>
            </div>

            <div>
              <h3 className="text-[#FAF7F2] text-sm font-semibold uppercase tracking-widest mb-3">
                Hours
              </h3>
              <ul className="text-sm space-y-1">
                <li>Monday: 9am – 3pm</li>
                <li>Tuesday–Thursday: 9am – 7pm</li>
                <li>Friday: 9am – 6pm</li>
                <li>Saturday: 9am – 4pm</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#FAF7F2] text-sm font-semibold uppercase tracking-widest mb-3">
                Connect
              </h3>
              <ul className="text-sm space-y-2">
                <li>
                  <a
                    href="https://instagram.com/the.salty.mane"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C9A96E] transition-colors"
                  >
                    @the.salty.mane
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/salty.hair.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C9A96E] transition-colors"
                  >
                    @salty.hair.co
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com/TheSaltyMane"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C9A96E] transition-colors"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
              <div className="mt-4">
                <p className="text-xs text-[#FAF7F2]/40 mb-1">Book via text:</p>
                <a
                  href="sms:6786486010"
                  className="inline-block bg-[#C9A96E] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[#8B7355] transition-colors"
                >
                  Text to Book
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-[#FAF7F2]/10 text-xs text-[#FAF7F2]/30 text-center">
            © {new Date().getFullYear()} The Salty Mane Hair Co. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
