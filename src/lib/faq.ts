import { SALON_ADDRESS } from "@/lib/business";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "booking",
    question: "How do I book an appointment?",
    answer: "Text or call us at 678-648-6010 to schedule. We don't have online booking at this time — a quick text is the fastest way to get on the books. Not sure who to book with? Take our Stylist Match Quiz and we'll tell you exactly who to ask for.",
  },
  {
    id: "how-far-advance",
    question: "How far in advance should I book?",
    answer: "We recommend booking 2–4 weeks in advance for color services and extensions, especially with senior stylists. Last-minute appointments do open up — text us and we'll let you know what's available.",
  },
  {
    id: "cancellation",
    question: "What is your cancellation policy?",
    answer: "We require 24 hours notice to cancel or reschedule any appointment. For color appointments cancelled with less than 24 hours notice, a $100 fee applies. No-shows are charged a $200 fee. We understand life happens — just reach out as early as possible.",
  },
  {
    id: "refunds",
    question: "Do you offer refunds?",
    answer: "We do not offer refunds on services or products. However, if you're not fully happy with your result, we offer complimentary small adjustments within 7 days of your appointment. Please reach out right away so we can make it right.",
  },
  {
    id: "extensions-consult",
    question: "Do I need a consultation before getting extensions?",
    answer: "Yes — a consultation is required before every extension appointment, no exceptions. This lets us assess your hair health, discuss the right extension method for you, and give you an accurate cost and time estimate. Consultations are free and take about 20–30 minutes.",
  },
  {
    id: "extension-types",
    question: "What types of extensions do you offer?",
    answer: "We specialize in hand-tied weft extensions and tape-in extensions, both installed by our certified extension stylists. Hand-tied extensions offer the most natural movement and are ideal for adding both length and volume. Tape-ins are great for volume and a faster install. We'll recommend the right method for your hair during your consultation.",
  },
  {
    id: "children",
    question: "Can I bring my children to my appointment?",
    answer: "We love families, but we ask that children not accompany you to your appointment. Our salon environment is designed to be a relaxing, focused experience for every client, and we want to give you our full attention.",
  },
  {
    id: "first-visit",
    question: "What should I expect on my first visit?",
    answer: "Arrive with clean, dry hair so your stylist can see your natural texture and color. Bring reference photos — the more specific the better. Your stylist will do a thorough consultation before touching your hair. Plan for your appointment to run the full estimated time; we never rush results.",
  },
  {
    id: "parking",
    question: "Where are you located and is parking free?",
    answer: `We're at ${SALON_ADDRESS.street}, ${SALON_ADDRESS.city}, ${SALON_ADDRESS.state} ${SALON_ADDRESS.zip} — ${SALON_ADDRESS.directions}. Free parking is available directly in front of the suite. We're just off GA-400 at Windward Parkway.`,
  },
  {
    id: "guarantee",
    question: "Is there a guarantee on extension services?",
    answer: "There is no guarantee on extensions under any circumstance. Hair extensions are a service that depends heavily on aftercare, lifestyle, and factors outside our control. We'll give you thorough aftercare instructions at your appointment and are always available to answer questions.",
  },
];
