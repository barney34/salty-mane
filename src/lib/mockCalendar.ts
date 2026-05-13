function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function isDateFullyBooked(stylistId: string, dateStr: string): boolean {
  return hash(stylistId + dateStr) % 5 === 0;
}

export function isSlotAvailable(stylistId: string, dateStr: string, slotIndex: number): boolean {
  return hash(stylistId + dateStr + String(slotIndex)) % 10 >= 3;
}

export const TIME_SLOTS = [
  "9:00 AM",  "9:30 AM",  "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM",  "1:30 PM",  "2:00 PM",  "2:30 PM",
  "3:00 PM",  "3:30 PM",  "4:00 PM",  "4:30 PM",
];
