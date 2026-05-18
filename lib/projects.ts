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
    slug: "retail-brand-identity",
    title: "Retail Brand Identity & Social",
    client: "Fashion & Lifestyle Boutique",
    category: "Social Media",
    year: "2024",
    description:
      "Full content strategy rebuild for a Beirut retail brand — turning a static feed with 0.8% engagement into a growth engine.",
    longDescription:
      "This retail client came to us with daily posting but no strategy — resulting in 0.8% engagement and zero qualified inquiries. We rebuilt their content pillars from scratch: defined a clear brand voice, developed a visual content system, and introduced a monthly content calendar built around their audience's behavior. The result was a feed that felt intentional, scroll-stopping, and consistently on-brand. Within months, engagement climbed to 4.2% and qualified DMs started flowing in daily.",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=90",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=90",
    ],
    tags: ["Content Strategy", "Instagram Management", "Visual Identity"],
    featured: true,
    accentColor: "#A78BFA",
    result: "0.8% → 4.2% engagement rate",
  },
  {
    slug: "aesthetic-clinic-beirut",
    title: "Aesthetic Clinic — Digital Presence",
    client: "Aesthetic Medicine Clinic, Beirut",
    category: "Social Media",
    year: "2024",
    description:
      "Transforming a clinical, impersonal Instagram into a patient-first brand that drove a 140% increase in appointment bookings.",
    longDescription:
      "Medical and aesthetic practices face a unique challenge: they need to build trust while remaining aspirational. This Beirut clinic's Instagram felt cold and clinical, failing to connect with potential patients. We introduced patient story formats, behind-the-scenes content, and educational reels that built genuine authority and warmth. Combined with targeted paid social campaigns, the results were dramatic — a 140% increase in appointment bookings in just 60 days, driven entirely through Instagram. This is part of our 12+ healthcare client track record.",
    coverImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1631217868264-e6cfd3b8aff0?w=1200&q=90",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=90",
    ],
    tags: ["Healthcare Social Media", "Reels", "Paid Social", "Community Management"],
    featured: true,
    accentColor: "#EC4899",
    result: "+140% appointment bookings in 60 days",
  },
  {
    slug: "restaurant-rebrand",
    title: "Restaurant Brand Rebuild",
    client: "Beirut Restaurant Group",
    category: "Branding",
    year: "2024",
    description:
      "Complete brand rebuild — logo, color palette, and social strategy — delivering 40% higher engagement and a steady reservation flow.",
    longDescription:
      "The restaurant had an inconsistent brand identity and a scattered social presence that wasn't converting. We started from the ground up: a refreshed logo, a cohesive color and typography system, and a content strategy that captured the energy and quality of the dining experience. With a unified look across all touchpoints and a content calendar designed to drive reservations, the results came quickly — 40% higher engagement and a measurable increase in walk-in and online bookings.",
    coverImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=90",
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=90",
    ],
    tags: ["Brand Identity", "Social Strategy", "Photography", "Reels"],
    featured: true,
    accentColor: "#F59E0B",
    result: "+40% engagement, steady reservation flow",
  },
  {
    slug: "financial-advisory-web",
    title: "Financial Advisory — Web & Brand",
    client: "Financial Services Group",
    category: "Web Design",
    year: "2024",
    description:
      "Modern website and brand positioning for a financial advisory firm targeting high-net-worth clients across Lebanon and the GCC.",
    longDescription:
      "This financial advisory firm needed a digital presence that communicated trust, precision, and sophistication to clients across Lebanon, Saudi Arabia, and the UAE. We designed and built a fully responsive website with custom scroll animations, integrated lead capture, and a CMS that allows the team to manage content independently. The brand identity refresh gave the firm a presence that matched their expertise in the market.",
    coverImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=90",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=90",
    ],
    tags: ["Web Design", "Development", "Brand Identity", "UX/UI"],
    featured: false,
    accentColor: "#0EA5E9",
    result: "4.2× increase in qualified leads",
  },
  {
    slug: "education-platform-launch",
    title: "Education Platform — Brand Launch",
    client: "Online Education Platform",
    category: "Branding",
    year: "2025",
    description:
      "Complete brand creation for a MENA-focused online education platform — from naming to full digital rollout.",
    longDescription:
      "From concept to launch, we built this education platform's brand entirely from scratch — name development, visual identity, website, and social media presence. The goal was a brand that felt modern, credible, and approachable to Arabic-speaking learners across the MENA region. The launch campaign across Instagram and TikTok drove immediate traction.",
    coverImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=90",
    ],
    tags: ["Brand Strategy", "Identity Design", "Social Media Launch", "Web"],
    featured: false,
    accentColor: "#10B981",
    result: "5,000 enrolled students at launch",
  },
  {
    slug: "event-photography-coverage",
    title: "Fashion Event — Live Coverage",
    client: "Beirut Fashion Event",
    category: "Photography",
    year: "2025",
    description:
      "Real-time social media coverage and photography for a premier Beirut fashion event, reaching 2.4M+ total impressions.",
    longDescription:
      "Social Pulse served as the exclusive social media partner for this major Beirut fashion event — delivering real-time Instagram Stories, Reels, and photo content across event days. Our team coordinated backstage access, runway coverage, and post-event highlight packages that extended the event's reach far beyond the venue and maintained momentum for weeks after.",
    coverImage:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=90",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=90",
    ],
    tags: ["Event Photography", "Live Social Media", "Reels", "Coverage"],
    featured: false,
    accentColor: "#F97316",
    result: "2.4M impressions across event days",
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
