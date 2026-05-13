import { SALON_PHONE } from "@/lib/business";

export const BOOK_TEL = `tel:${SALON_PHONE}`;

// Base SMS link — used internally by other exports; import BOOK_SMS_GENERAL for CTAs
const BOOK_SMS = `sms:${SALON_PHONE}`;

// Pre-filled generic booking text — use for all "Book Now" / "Text to Book" CTAs
export const BOOK_SMS_GENERAL = `${BOOK_SMS}?body=${encodeURIComponent("Hi! I'd like to book an appointment at The Salty Mane.")}`;

export function buildSmsLink(stylistName: string, serviceName: string): string {
  const body = encodeURIComponent(
    `Hi! I'd like to book with ${stylistName} for ${serviceName}.`
  );
  return `${BOOK_SMS}?body=${body}`;
}
