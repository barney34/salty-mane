export const BOOK_SMS = "sms:+16786486010";
export const BOOK_TEL = "tel:+16786486010";

export function buildSmsLink(stylistName: string, serviceName: string): string {
  const body = encodeURIComponent(
    `Hi! I'd like to book with ${stylistName} for ${serviceName}.`
  );
  return `sms:+16786486010?body=${body}`;
}
