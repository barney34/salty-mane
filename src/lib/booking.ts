import { SALON_PHONE } from "@/lib/business";

export const BOOK_SMS = `sms:${SALON_PHONE}`;
export const BOOK_TEL = `tel:${SALON_PHONE}`;

export function buildSmsLink(stylistName: string, serviceName: string): string {
  const body = encodeURIComponent(
    `Hi! I'd like to book with ${stylistName} for ${serviceName}.`
  );
  return `${BOOK_SMS}?body=${body}`;
}
