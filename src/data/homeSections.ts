export type DecorItem =
  | { kind: "tape" | "stamp" | "doodle" | "star"; x: string; y: string; w: string; r?: string; o?: number }
  | { kind: "image"; src: string; alt?: string; x: string; y: string; w: string; r?: string; o?: number };

export type HomeSection =
  | {
      id: "hero";
      type: "hero";
      paperTone?: "warm" | "cool" | "neutral";
      headline: string;
      subhead?: string;
      portraitSrc: string;
      decor?: DecorItem[];
      decorDensity?: "none" | "light" | "normal" | "heavy";
    }
  | {
      id: string;
      type: "cardGrid";
      titleTokens: string[];
      subtitle?: string;
      cards: { title: string; imgSrc: string; blurb?: string; href?: string }[];
      decor?: DecorItem[];
      decorDensity?: "none" | "light" | "normal" | "heavy";
    };

export const homeSections: HomeSection[] = [
  {
    id: "hero",
    type: "hero",
    paperTone: "warm",
    headline: "Welcome.\nI’m happy you’re here.",
    subhead: "A living little corner of the internet—part zine wall, part studio desk.",
    portraitSrc: "/decor/your-cutout.png",
    decorDensity: "normal",
    decor: [
      { kind: "tape", x: "16%", y: "16%", w: "clamp(70px, 8vw, 120px)", r: "-8deg", o: 0.95 },
      { kind: "stamp", x: "92%", y: "18%", w: "clamp(56px, 6vw, 92px)", r: "10deg", o: 0.85 },
      { kind: "doodle", x: "84%", y: "74%", w: "clamp(70px, 7vw, 120px)", r: "-6deg", o: 0.7 },
      { kind: "star", x: "76%", y: "24%", w: "clamp(34px, 4vw, 62px)", r: "14deg", o: 0.85 },
    ],
  },
  {
    id: "explore",
    type: "cardGrid",
    titleTokens: ["Things", "To", "Explore"],
    subtitle: "Six doors. Each one a different kind of rabbit hole.",
    decorDensity: "light",
    cards: [
      { title: "Writing", imgSrc: "/decor/img-writing.jpg", blurb: "Essays, notes, weird thoughts.", href: "/writing" },
      { title: "Let’s Connect", imgSrc: "/decor/img-connect.jpg", blurb: "Collab, book, or say hey.", href: "/connect" },
      { title: "Photography", imgSrc: "/decor/img-photo.jpg", blurb: "Street, concerts, portraits.", href: "/photos" },
      { title: "Experimental Creativity", imgSrc: "/decor/img-experimental.jpg", blurb: "Collage + creative tests.", href: "/experiments" },
      { title: "Comedy", imgSrc: "/decor/img-comedy.jpg", blurb: "Clips, shows, bits.", href: "/comedy" },
      { title: "Projects", imgSrc: "/decor/img-projects.jpg", blurb: "Builds, prototypes, ideas.", href: "/projects" },
    ],
    decor: [
      { kind: "image", src: "/decor/sticker-ufo.png", x: "6%", y: "34%", w: "clamp(56px, 7vw, 110px)", r: "-10deg", o: 0.95 },
      { kind: "tape", x: "94%", y: "64%", w: "clamp(70px, 8vw, 120px)", r: "8deg", o: 0.8 },
    ],
  },
];