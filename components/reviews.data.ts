export type ReviewImage = {
  src: string;
  alt: string;
};

export type Review = {
  headline: string;
  body: string;
  name: string;
  location: string;
  images?: ReviewImage[];
};

// How to add photos (SEO-friendly):
// 1) Place optimized images in `public/reviews/` with descriptive kebab-case filenames, e.g. `tv-mount-no-visible-cables.jpg`.
// 2) Add entries below with meaningful alt text describing the image content.
// 3) Prefer 3–4 images max per review. Keep dimensions reasonable for web (e.g. 1600px max width).

export const reviews: Review[] = [
  {
    headline: "Transitional kitchen cabinets installed and aligned",
    body:
      "White wood uppers and lowers installed with even reveals; marble counters protected and left spotless.",
    name: "Elena P.",
    location: "Encino",
    images: [
      { src: "/reviews/transitional-kitchen-white-wood-cabinets-marble-countertops.jpeg", alt: "Transitional kitchen with white wood cabinets and marble countertops" },
      { src: "/reviews/transitional-kitchen-white-wood-cabinets-marble-countertops_2.jpeg", alt: "Detail of transitional kitchen cabinets aligned over marble countertops" },
    ],
  },
  {
    headline: "Modern white kitchen island installed to level",
    body:
      "Black marble island set, leveled, and secured; doors adjusted for perfect gaps and soft-close feel.",
    name: "Jordan T.",
    location: "Burbank",
    images: [
      { src: "/reviews/modern-white-kitchen-black-marble-island-installation.jpeg", alt: "Modern white kitchen with black marble island after installation" },
      { src: "/reviews/modern-white-kitchen-black-marble-island-installation_2.jpeg", alt: "Close-up of black marble island seams and cabinet alignment" },
    ],
  },
  {
    headline: "Gray shaker cabinets — clean lines, even reveals",
    body:
      "Installed and tuned shaker doors for consistent spacing; hardware aligned to the millimeter.",
    name: "Devon R.",
    location: "Woodland Hills",
    images: [
      { src: "/reviews/modern-gray-kitchen-shaker-cabinets-handyman-installation.jpeg", alt: "Modern gray shaker kitchen cabinets installed with even reveals" },
    ],
  },
  {
    headline: "Floating bathroom vanity installed and plumbed",
    body:
      "Wall-hung vanity anchored to studs with concealed brackets; stone top set and caulked cleanly.",
    name: "Priya S.",
    location: "Studio City",
    images: [
      { src: "/reviews/modern-floating-bathroom-vanity-wood-stone-installation.jpeg", alt: "Modern floating bathroom vanity with wood finish and stone countertop" },
    ],
  },
  {
    headline: "Custom wood kitchen cabinets — built and installed",
    body:
      "Custom boxes and faces aligned, doors tuned, and soft-close hardware calibrated for a seamless look.",
    name: "Marina K.",
    location: "Sherman Oaks",
    images: [
      { src: "/reviews/custom-wood-kitchen-cabinets-handyman-installation.jpeg", alt: "Custom wood kitchen cabinets installed across full wall" },
      { src: "/reviews/custom-wood-kitchen-cabinets-handyman-installation_2.jpeg", alt: "Close-up of custom wood cabinet grain and handle alignment" },
    ],
  },
  {
    headline: "Walk-in closet with built-in shelving",
    body:
      "Designed and installed shelving, rods, and drawers; everything square, secure, and ready for daily use.",
    name: "Maya L.",
    location: "Silver Lake",
    images: [
      { src: "/reviews/custom-walk-in-closet-built-in-shelving-handyman-installation.jpeg", alt: "Custom walk-in closet with built-in shelving and hanging rods" },
    ],
  },
  {
    headline: "Laundry built-ins with brass hardware",
    body:
      "Cabinetry installed around appliances with vent and hose clearances; doors aligned and hardware centered.",
    name: "Elena P.",
    location: "Encino",
    images: [
      { src: "/reviews/custom-built-in-laundry-cabinets-white-brass-handles.jpeg", alt: "Custom built-in laundry cabinets in white with brass handles" },
      { src: "/reviews/custom-built-in-laundry-cabinets-white-brass-handles_2.jpeg", alt: "Detail of brass handles on white built-in laundry cabinets" },
    ],
  },
];


