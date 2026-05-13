export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  stylist: string;
  service: string;
  stars: 5;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote: "I drove over an hour through Atlanta traffic and would do it again in a heartbeat. Laci took my damaged, over-processed hair and turned it into something I actually love. She didn't just do what I asked — she told me what my hair needed and delivered both.",
    author: "Jennifer M.",
    stylist: "Laci",
    service: "Color Correction",
    stars: 5,
  },
  {
    id: "2",
    quote: "Grace has this rare ability to listen to everything you say and translate it perfectly. I've tried describing what I want at so many salons and always left disappointed. Not here. She nailed the lived-in color on the first try and the cut grows out beautifully.",
    author: "Ashley T.",
    stylist: "Grace",
    service: "Lived-In Color & Cut",
    stars: 5,
  },
  {
    id: "3",
    quote: "Erica is the only person I trust with my extensions. She's meticulous, knowledgeable, and somehow makes four hours in the chair feel relaxing. My hair looks so natural that even my friends can't tell I have them.",
    author: "Madison R.",
    stylist: "Erica",
    service: "Hand-Tied Extensions",
    stars: 5,
  },
  {
    id: "4",
    quote: "Anna is an artist. I came in with a vague idea and a few saved photos and she just got it immediately. The color application is so precise and the tones are exactly what I wanted. I've already referred three of my coworkers.",
    author: "Lauren K.",
    stylist: "Anna",
    service: "Partial Highlights & Gloss",
    stars: 5,
  },
  {
    id: "5",
    quote: "Reese has such a great energy and an incredible eye for detail. She's the first stylist who really considered my natural texture instead of fighting it. My hair has never felt this healthy or looked this good.",
    author: "Brittany S.",
    stylist: "Reese",
    service: "Balayage & Cut",
    stars: 5,
  },
  {
    id: "6",
    quote: "Jolie understood my hair better than I did. She took one look, asked a few smart questions, and proposed something I never would have thought to ask for — a dimensional brunette with the most subtle warmth. I get compliments constantly.",
    author: "Caroline W.",
    stylist: "Jolie",
    service: "Dimensional Color",
    stars: 5,
  },
];
