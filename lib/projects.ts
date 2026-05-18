export type ProjectCategory =
  | "Branding"
  | "Social Media"
  | "Video"
  | "Web Design"
  | "Photography";

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: string;
  description: string;
  longDescription: string;
  coverImage: string;
  images: string[];
  tags: string[];
  featured: boolean;
  accentColor: string;
  result?: string;
}

export const projects: Project[] = [
  {
    slug: "gold-luxe-jewellery",
    title: "Gold Luxe Jewellery",
    client: "Gold Luxe",
    category: "Branding",
    year: "2024",
    description:
      "Complete brand identity and social media strategy for a luxury jewellery boutique in Beirut.",
    longDescription:
      "Gold Luxe approached Social Pulse to redefine their visual presence and build a cohesive identity that matched their premium positioning. We developed a refined brand system — from logo and typography to photography direction and social content templates — that elevated the boutique into a regional luxury name.",
    coverImage:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=90",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=1200&q=90",
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1200&q=90",
    ],
    tags: ["Brand Identity", "Social Strategy", "Photography Direction"],
    featured: true,
    accentColor: "#D4AF37",
    result: "320% increase in profile reach within 90 days",
  },
  {
    slug: "apex-financial-group",
    title: "Apex Financial Group",
    client: "Apex Financial",
    category: "Web Design",
    year: "2024",
    description:
      "Modern website and digital presence for a growing financial advisory firm targeting the GCC market.",
    longDescription:
      "Apex Financial needed a website that communicated trust, precision, and modernity to high-net-worth clients across the Gulf. We designed and built a fully responsive site with custom animations, integrated lead capture, and a content management system that the team can update independently.",
    coverImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=90",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=90",
    ],
    tags: ["Web Design", "Development", "UX/UI"],
    featured: true,
    accentColor: "#0EA5E9",
    result: "4.2x increase in qualified leads",
  },
  {
    slug: "dr-nadia-clinic",
    title: "Dr. Nadia Aesthetic Clinic",
    client: "Dr. Nadia Clinic",
    category: "Social Media",
    year: "2024",
    description:
      "Social media management and medical animation content for a leading aesthetic clinic.",
    longDescription:
      "Dr. Nadia's clinic required educational yet aspirational content that built authority without compromising on aesthetic quality. We produced a monthly content calendar including animated explainers, before-and-after reels, and strategic paid campaigns that positioned the clinic as the top choice in its category.",
    coverImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1631217868264-e6cfd3b8aff0?w=1200&q=90",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=90",
    ],
    tags: ["Social Media", "Motion Graphics", "Paid Ads"],
    featured: true,
    accentColor: "#EC4899",
    result: "18K new followers in 6 months",
  },
  {
    slug: "volta-restaurant",
    title: "Volta Restaurant",
    client: "Volta",
    category: "Video",
    year: "2025",
    description:
      "Cinematic brand video and ongoing reels production for a premium Beirut restaurant.",
    longDescription:
      "Volta's launch demanded content that captured the electricity of the dining experience. We produced a cinematic launch film, ongoing monthly reel packages, and coordinated photography shoots that made every dish and atmosphere moment scroll-stopping.",
    coverImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=90",
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=90",
    ],
    tags: ["Videography", "Reels", "Photography"],
    featured: false,
    accentColor: "#F59E0B",
    result: "1.2M views on launch reel",
  },
  {
    slug: "pulse-academy",
    title: "Pulse Academy",
    client: "Pulse Academy",
    category: "Branding",
    year: "2025",
    description:
      "Full brand creation for an online education platform targeting Arabic-speaking students.",
    longDescription:
      "From name development to complete brand system, we built Pulse Academy from the ground up — creating a brand that felt modern, approachable, and credible to the next generation of learners across the MENA region.",
    coverImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=90",
    ],
    tags: ["Brand Strategy", "Identity Design", "Web"],
    featured: false,
    accentColor: "#10B981",
    result: "Launched to 5,000 enrolled students in month one",
  },
  {
    slug: "moda-fashion-week",
    title: "MODA Fashion Week",
    client: "MODA Beirut",
    category: "Photography",
    year: "2025",
    description:
      "Event photography and live social coverage for Beirut's premier fashion event.",
    longDescription:
      "Social Pulse was the exclusive social media partner for MODA Beirut, delivering real-time coverage, backstage content, and post-event highlight packages that extended the event's reach far beyond the venue.",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=90",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=90",
    ],
    tags: ["Event Coverage", "Photography", "Live Social"],
    featured: false,
    accentColor: "#F97316",
    result: "2.4M total impressions across event days",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const categories: ProjectCategory[] = [
  "Branding",
  "Social Media",
  "Video",
  "Web Design",
  "Photography",
];
