export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  stylist?: string;
  source: string;
}

// Real reviews sourced from Google and public review platforms.
// Quotes are reproduced verbatim. Reviewer names used as published.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote: "Laci is the absolute best!!! I have been going to her for several years and always leave beyond satisfied.",
    author: "Danikka B.",
    stylist: "Laci",
    source: "Google",
  },
  {
    id: "2",
    quote: "Laci Mane, the incredible owner, explained that it would be a process for me to restore my hair and I trusted her.",
    author: "Carly H.",
    stylist: "Laci",
    source: "Google",
  },
  {
    id: "3",
    quote: "Grace always does an incredible job with the cut and color and adapting to customer's needs.",
    author: "Melissa K.",
    stylist: "Grace",
    source: "Google",
  },
  {
    id: "4",
    quote: "As always Anna did a fabulous job!! I feel like my self again!",
    author: "Amelia B.",
    stylist: "Anna",
    source: "Google",
  },
  {
    id: "5",
    quote: "Reese is always awesome! I get my hair done by Reese — be sure to ask for her if you want to book!!",
    author: "Verified Client",
    stylist: "Reese",
    source: "Google",
  },
  {
    id: "6",
    quote: "The tone, application, and lived in color is perfect every time.",
    author: "Minlief",
    source: "Google",
  },
];
