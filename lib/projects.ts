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
  location: string;
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
  // ─── FEATURED ───────────────────────────────────────────────────────────────
  {
    slug: "dare-advisors",
    title: "Dare Advisors",
    client: "Dare Advisors",
    category: "Branding",
    year: "2023",
    location: "Beirut, Lebanon",
    description:
      "Full brand identity, social media management, and website design for a boutique global financial advisory firm in Beirut.",
    longDescription:
      "Dare Advisors is a global boutique financial advisory firm dedicated to helping individuals and businesses achieve their financial goals. Social Pulse built the complete brand from the ground up — logo, identity system, and brand guidelines — then created their ongoing Instagram content (educational posts, investment insights, office announcements) and designed their website at dareadvisors.com with a sleek, captivating aesthetic that matched their bold positioning: 'Sometimes you need to Dare take the risk.'",
    coverImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=90",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=90",
    ],
    tags: ["Brand Identity", "Web Design", "Social Media", "Instagram Content"],
    featured: true,
    accentColor: "#1B6B47",
    result: "Full digital presence built from zero",
  },
  {
    slug: "kataleya",
    title: "Kataleya",
    client: "Kataleya",
    category: "Branding",
    year: "2023",
    location: "Beirut, Lebanon",
    description:
      "Brand strategy, marketing plan, and digital presence for Beirut's upscale Italian-French fashion boutique, founded in 2011 by Carla Hanna.",
    longDescription:
      "Kataleya is a Beirut-based upscale fashion destination offering 40+ Italian and French luxury brands since 2011, with a second location opened in 2015. Social Pulse developed a comprehensive brand portfolio — from market positioning and competitive analysis to a full visual identity refresh and digital marketing strategy targeting Dubai expansion. We produced the brand presentation deck, social media strategy, store layout direction, and ongoing content for their sophisticated Lebanese clientele.",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=90",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=90",
    ],
    tags: ["Brand Strategy", "Visual Identity", "Marketing Plan", "Social Media"],
    featured: true,
    accentColor: "#C9A96E",
    result: "Dubai expansion strategy delivered",
  },
  {
    slug: "medonations",
    title: "Medonations",
    client: "Medonations NGO",
    category: "Social Media",
    year: "2023",
    location: "Beirut, Lebanon",
    description:
      "Social media management for a Lebanese-French NGO delivering free medical aid to 10,468 patients across Lebanon with 89 treatments and surgeries covered.",
    longDescription:
      "Medonations is a Lebanese and French NGO with a mission to provide medical aid and relief to those in need, bringing hope to communities across Lebanon and the globe. Social Pulse managed their full Instagram presence — creating educational medical content (World Health Day, disease explainers, free clinic announcements), running the Solar Panel Backpack awareness campaign, and producing bilingual Arabic/English posts that connected donors and patients alike. Their account (@Medonations) reflects both the urgency and the heart of the organization.",
    coverImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1631217868264-e6cfd3b8aff0?w=1200&q=90",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=90",
    ],
    tags: ["Social Media Management", "Content Creation", "NGO", "Bilingual"],
    featured: true,
    accentColor: "#00B4D8",
    result: "10,468 patients covered across Lebanon",
  },

  // ─── GRID ────────────────────────────────────────────────────────────────────
  {
    slug: "gulf-central-company",
    title: "Gulf Central Company",
    client: "Gulf Central Company",
    category: "Branding",
    year: "2022",
    location: "Riyadh, Saudi Arabia",
    description:
      "Logo design, brand identity, and food catalog design for a Saudi Arabian food export company — 'Innovative Food Solutions.'",
    longDescription:
      "Gulf Central Company is a Riyadh-based food export business supplying products throughout the Kingdom of Saudi Arabia and globally. Social Pulse designed their complete brand identity including logo, branding collateral, and produced 'The Food Book Catalog' — a premium product catalog presentation that showcases their imported food solutions with cinematic photography and editorial layout.",
    coverImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=90",
    ],
    tags: ["Logo Design", "Brand Identity", "Catalog Design", "Print"],
    featured: false,
    accentColor: "#E8B84B",
    result: "Premium catalog delivered for KSA market",
  },
  {
    slug: "platters",
    title: "Platters",
    client: "Platters",
    category: "Branding",
    year: "2023",
    location: "Riyadh, Saudi Arabia",
    description:
      "Complete brand creation, mobile app design, business cards, and luxury packaging for a Riyadh-based gourmet platter delivery brand.",
    longDescription:
      "Platters — 'Taste The Passion in Every Bite' — is a luxury platter and grazing experience brand based in Riyadh. Social Pulse created the brand from scratch: a refined script logo, business cards, e-voucher design, gift voucher templates, delivery box product design, and a mobile app UI/UX mockup (listed on both Google Play and App Store). Every touchpoint was designed to communicate craftsmanship, elegance, and passion for food.",
    coverImage:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=90",
    ],
    tags: ["Logo Design", "App Design", "Packaging", "Brand Identity"],
    featured: false,
    accentColor: "#D4A853",
    result: "Full brand + app launched in KSA",
  },
  {
    slug: "gemz-dubai",
    title: "Gemz",
    client: "Gemz",
    category: "Social Media",
    year: "2023",
    location: "Dubai, UAE",
    description:
      "Social media content design and management for a luxury fine jewelry brand in Dubai — diamonds, gemstones, traditional and contemporary designs.",
    longDescription:
      "Gemz is a luxury online fine jewelry store based in Dubai, offering an extensive collection of traditional and contemporary diamond and gemstone pieces. Social Pulse managed their Instagram presence with editorial photography direction, mood-led content grids, and quote-driven posts — positioning Gemz as a destination for luxury jewelry discovery with the visual language of a high-end fashion house.",
    coverImage:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1200&q=90",
    ],
    tags: ["Social Media", "Content Design", "Luxury", "Instagram"],
    featured: false,
    accentColor: "#C9A96E",
    result: "Premium luxury feed established",
  },
  {
    slug: "emagine-uae",
    title: "eMagine UAE",
    client: "eMagine",
    category: "Video",
    year: "2023",
    location: "United Arab Emirates",
    description:
      "Instagram reels and social media management for a UAE e-mobility and EV charging solutions company — 'Powering the Future.'",
    longDescription:
      "eMagine is at the forefront of transformative e-mobility solutions in the UAE, contributing to the nation's vision of a sustainable green economy. Social Pulse produced and managed their Instagram reels — educational EV content, presenter-led explainers ('How Fast Can You Charge an EV?', 'Overcoming Range Anxiety'), and their new website launch announcement — positioning eMagine as the leading voice for EV education in the Arabic market.",
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=90",
    ],
    tags: ["Video Reels", "Social Media", "Motion Graphics", "EV / Tech"],
    featured: false,
    accentColor: "#3B9EE8",
    result: "EV education hub built on Instagram",
  },
  {
    slug: "metle-metlik",
    title: "Metle Metlik",
    client: "Dr. Sandrine Atallah & Dr. Gael Bou Ghannam",
    category: "Web Design",
    year: "2023",
    location: "Beirut, Lebanon",
    description:
      "Website design and bilingual Arabic/English video reels for a women's reproductive health and sexual wellness platform.",
    longDescription:
      "Metle Metlik (metlemetlik.com) is a safe space for women to learn about reproductive health, sexual wellness, and life cycle challenges — founded by Dr. Sandrine Atallah and Dr. Gael Bou Ghannam. Social Pulse designed the website (Programs, Experts, Blog sections), produced bilingual video reels covering topics like infertility, Vaginismus, and breast cancer, and managed social content — combining medical authority with empathetic, accessible visual storytelling.",
    coverImage:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&q=90",
    ],
    tags: ["Web Design", "Video Reels", "Healthcare", "Bilingual Arabic/English"],
    featured: false,
    accentColor: "#C084FC",
    result: "Women's health platform launched",
  },
  {
    slug: "the-breast-clinic",
    title: "The Breast Clinic",
    client: "Dr. Chebl Azar",
    category: "Branding",
    year: "2024",
    location: "Beirut, Lebanon",
    description:
      "Logo design, mobile app mockup, and billboard advertising for The Breast Clinic — 'Where Health & Beauty Unite.'",
    longDescription:
      "The Breast Clinic, led by Dr. Chebl Azar in Beirut, required a brand that walked the line between clinical trust and feminine warmth. Social Pulse designed the distinctive heart-shaped logo (now available as a mobile app icon on iOS/Android), developed the full brand identity in pink and black, and produced outdoor billboard advertising with the brand's positioning: 'Live Life... Go Healthy and Happy!'",
    coverImage:
      "https://images.unsplash.com/photo-1631217868264-e6cfd3b8aff0?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=90",
    ],
    tags: ["Logo Design", "App Design", "Outdoor Advertising", "Healthcare"],
    featured: false,
    accentColor: "#EC4899",
    result: "Full brand + app icon launched",
  },
  {
    slug: "ddoesbusiness",
    title: "D Does Business",
    client: "Danielle Hatem",
    category: "Social Media",
    year: "2023",
    location: "Beirut, Lebanon",
    description:
      "Brand identity and Instagram content strategy for Lebanon's leading finance educator — nearly 50,000 followers and featured in L'Orient Today.",
    longDescription:
      "D does Business, created by Danielle Hatem in 2017, is Lebanon's go-to source for making complex financial topics accessible — from stock market analysis to GCC economic updates. Featured in L'Orient Today ('Finance Made Simple'), the account grew significantly during Lebanon's 2019 economic crisis. Social Pulse created the brand identity and content system: data-driven investment posts, economic explainer reels, and the visual language that made @ddoesbusiness instantly recognizable.",
    coverImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=90",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=90",
    ],
    tags: ["Brand Identity", "Content Strategy", "Finance", "Instagram Reels"],
    featured: false,
    accentColor: "#F59E0B",
    result: "~50,000 followers, featured in L'Orient Today",
  },
  {
    slug: "prairie-trading",
    title: "Prairie Trading Service",
    client: "Prairie Trading Service Inc.",
    category: "Branding",
    year: "2022",
    location: "Riyadh, Saudi Arabia",
    description:
      "Logo development (3 options), packaging design, and brand identity for a US food export and labeling company operating in Saudi Arabia.",
    longDescription:
      "Prairie Trading Service Inc. — US Foods Worldwide — is a niche food export and labeling specialist serving the food and beverage industry with premium imported ingredients. Social Pulse delivered three logo concept directions ranging from bold typographic to illustrated, and designed the full brand packaging system — including eye-catching product packaging featuring the brand's Illinois-state identity and American flag imagery.",
    coverImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=90",
    images: [],
    tags: ["Logo Design", "Packaging Design", "Brand Identity", "Food & Beverage"],
    featured: false,
    accentColor: "#C0392B",
    result: "3 logo concepts + full packaging system",
  },
  {
    slug: "lavender-project",
    title: "Lavender Project",
    client: "Lavender Project",
    category: "Social Media",
    year: "2023",
    location: "Kfarmishki, West Beqaa, Lebanon",
    description:
      "Logo design and Instagram management for an eco-friendly mountain bungalow overlooking Mount Hermon and a lavender field in West Beqaa.",
    longDescription:
      "The Lavender Project is an eco-friendly lodge built in 2022 in Kfarmishki, West Beqaa — a 55 sqm space for up to 5 guests, built entirely from eco-friendly materials, with a full view of Mount Hermon and its own lavender field. Social Pulse created the nature-inspired logo and managed their Instagram (@lavenderprojectlb), capturing the village, landscape, local Mouneh produce, and the serene experience of the Kfarmishki village.",
    coverImage:
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1200&q=90",
    images: [],
    tags: ["Logo Design", "Social Media", "Tourism", "Lebanon"],
    featured: false,
    accentColor: "#8B5CF6",
    result: "Eco-lodge brand and social launched",
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
