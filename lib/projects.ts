export type ProjectCategory =
  | "Branding"
  | "Social Media"
  | "Video"
  | "Web Design"
  | "Photography";

export interface PageScreenshot {
  label: string;
  desktop: string;
  mobile?: string;
}

export interface SocialPost {
  src: string;
  type?: "post" | "reel" | "carousel";
  videoSrc?: string;
  instagramUrl?: string;
  slides?: string[];
}

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
  websiteUrl?: string;
  screenshots?: PageScreenshot[];
  techStack?: string[];
  features?: string[];
  instagramHandle?: string;
  socialPosts?: SocialPost[];
  overviewParagraphs?: string[];
  highlights?: string[];
  quote?: string;
  testimonial?: { quote: string; author: string; role?: string };
  comingSoon?: boolean;
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
      "Dare Advisors is a global boutique financial advisory firm built on a single conviction — that the right move, made with confidence, changes everything. Social Pulse built the brand from the ground up: a commanding visual identity with logo, color system, and guidelines that balance financial authority with bold approachability. We took that same conviction to Instagram, crafting educational investment posts, market insights, and office announcements for @dareadvisors_official — week after week, building a community of informed clients and engaged prospects. Then we gave it all a digital home at dareadvisors.com: a sleek, captivating website designed around the firm's defining belief. Sometimes you need to Dare take the risk.",
    coverImage: "/covers/dare-advisors.svg",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=90",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=90",
    ],
    tags: ["Brand Identity", "Web Design", "Social Media", "Instagram Content"],
    featured: true,
    accentColor: "#1B6B47",
    result: "Full digital presence built from zero",
    websiteUrl: "https://www.dareadvisors.com",
    screenshots: [
      { label: "Home", desktop: "/projects/dare-advisors/home-desktop.jpg", mobile: "/projects/dare-advisors/home-mobile.jpg" },
    ],
    techStack: ["GoDaddy", "Figma"],
    features: ["Financial advisory presence", "Brand identity showcase", "Mobile-first responsive", "SEO optimized"],
    instagramHandle: "dareadvisors_official",
    socialPosts: [
      { src: "/projects/dare-advisors/social/post-1.jpg",  type: "reel",     instagramUrl: "https://www.instagram.com/dareadvisors_official/reel/DMxwcUzsrnY/" },
      { src: "/projects/dare-advisors/social/post-2.jpg",  type: "reel",     instagramUrl: "https://www.instagram.com/dareadvisors_official/reel/DMfpU1PMxtG/" },
      { src: "/projects/dare-advisors/social/post-3.jpg",  type: "reel",     instagramUrl: "https://www.instagram.com/dareadvisors_official/reel/DMF7PKcMHTW/" },
      { src: "/projects/dare-advisors/social/post-4.jpg",  type: "reel",     instagramUrl: "https://www.instagram.com/dareadvisors_official/reel/DL5CjshMBxb/" },
      { src: "/projects/dare-advisors/social/post-5.jpg",  type: "reel",     instagramUrl: "https://www.instagram.com/dareadvisors_official/reel/DLz4Mp4MkrC/" },
      { src: "/projects/dare-advisors/social/post-6.jpg",  type: "carousel", instagramUrl: "https://www.instagram.com/dareadvisors_official/p/Ctvioe7spMV/", slides: ["/projects/dare-advisors/social/post-6-slide-4.jpg", "/projects/dare-advisors/social/post-6-slide-5.jpg", "/projects/dare-advisors/social/post-6-slide-6.jpg", "/projects/dare-advisors/social/post-6-slide-7.jpg", "/projects/dare-advisors/social/post-6-slide-8.jpg"] },
      { src: "/projects/dare-advisors/social/post-7.jpg",  type: "post",     instagramUrl: "https://www.instagram.com/dareadvisors_official/p/CtiwYP1LC1y/" },
      { src: "/projects/dare-advisors/social/post-8.jpg",  type: "carousel", instagramUrl: "https://www.instagram.com/dareadvisors_official/p/CtdoVjiLvEy/", slides: ["/projects/dare-advisors/social/post-8-slide-4.jpg", "/projects/dare-advisors/social/post-8-slide-5.jpg", "/projects/dare-advisors/social/post-8-slide-6.jpg", "/projects/dare-advisors/social/post-8-slide-7.jpg"] },
      { src: "/projects/dare-advisors/social/post-9.jpg",  type: "post",     instagramUrl: "https://www.instagram.com/dareadvisors_official/p/CtGfM1XLnPs/" },
      { src: "/projects/dare-advisors/social/post-10.jpg", type: "reel",     instagramUrl: "https://www.instagram.com/dareadvisors_official/reel/CtGb6o9uFVH/" },
      { src: "/projects/dare-advisors/social/post-11.jpg", type: "post",     instagramUrl: "https://www.instagram.com/dareadvisors_official/p/CtGV2AZt0Tz/" },
      { src: "/projects/dare-advisors/social/post-12.jpg", type: "post",     instagramUrl: "https://www.instagram.com/dareadvisors_official/p/CtBDswStgKo/" },
    ],
    overviewParagraphs: [
      "Dare Advisors is a global boutique financial advisory firm built on a single conviction — that the right move, made with confidence, changes everything.",
      "Social Pulse built the brand from the ground up: a commanding visual identity with logo, color system, and brand guidelines that balance financial authority with bold approachability.",
      "We took that same conviction to Instagram, crafting educational investment posts, market insights, and office announcements for @dareadvisors_official — week after week, building a community of informed clients and engaged prospects.",
      "Then we gave it all a digital home at dareadvisors.com: a sleek, captivating website designed to reflect the firm's character and ambition.",
    ],
    highlights: [
      "global boutique financial advisory firm",
      "from the ground up",
      "@dareadvisors_official",
      "dareadvisors.com",
    ],
    quote: "Sometimes you need to Dare take the risk.",
    testimonial: {
      quote: "Social Pulse understood our world from day one. They built a brand that commands respect in boardrooms and on Instagram alike — and the website they designed became the first thing we show every new client.",
      author: "Managing Partner, Dare Advisors",
    },
  },
  {
    slug: "kataleya",
    title: "Kataleya",
    client: "Kataleya",
    category: "Branding",
    year: "2023",
    location: "Beirut, Lebanon",
    description:
      "Brand strategy, marketing plan, and digital presence for Beirut's upscale Italian and French fashion boutique, founded in 2011 by Carla Hanna.",
    longDescription:
      "Kataleya is a Beirut-based upscale fashion destination offering over 40 Italian and French luxury brands since 2011, with a second location opened in 2015. Social Pulse developed a comprehensive brand portfolio covering market positioning, competitive analysis, a full visual identity refresh, and a digital marketing strategy targeting Dubai expansion. We produced the brand presentation deck, social media strategy, store layout direction, and ongoing content for their sophisticated Lebanese clientele.",
    coverImage: "/covers/Kataleya.svg",
    images: [
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=90",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=90",
    ],
    tags: ["Brand Strategy", "Visual Identity", "Marketing Plan", "Social Media"],
    featured: true,
    accentColor: "#C9A96E",
    result: "Dubai expansion strategy delivered",
    overviewParagraphs: [
      "Kataleya is Beirut's most refined fashion destination — home to over 40 Italian and French luxury brands since 2011, with a clientele that knows the difference between fashion and style.",
      "Social Pulse developed a full brand portfolio for Kataleya's next chapter: market positioning analysis, competitive benchmarking, a visual identity refresh, and a digital marketing strategy aimed squarely at Dubai expansion.",
      "From the brand presentation deck to social media strategy and store layout direction, every element was crafted to carry a legacy boutique into its boldest territory yet.",
    ],
    highlights: [
      "over 40 Italian and French luxury brands",
      "Dubai expansion",
      "visual identity refresh",
    ],
    quote: "Luxury is not a style — it's a standard.",
  },
  {
    slug: "medonations",
    title: "Medonations",
    client: "Medonations NGO",
    category: "Social Media",
    year: "2023",
    location: "Beirut, Lebanon",
    description:
      "Social media management for a Lebanese and French NGO delivering free medical aid to over 10,468 patients across Lebanon with 89 treatments and surgeries covered.",
    longDescription:
      "Medonations is a Lebanese and French NGO with a mission to provide medical aid and relief to those in need, bringing hope to communities across Lebanon and the globe. Social Pulse managed their full Instagram presence by creating educational medical content for World Health Day, disease explainers, and free clinic announcements, running the Solar Panel Backpack awareness campaign, and producing bilingual Arabic and English posts that connected donors and patients alike. Their account reflects both the urgency and the heart of the organization.",
    coverImage: "/covers/Medonations.svg",
    images: [
      "https://images.unsplash.com/photo-1631217868264-e6cfd3b8aff0?w=1200&q=90",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=90",
    ],
    tags: ["Social Media Management", "Content Creation", "NGO", "Bilingual"],
    featured: true,
    accentColor: "#00B4D8",
    result: "10,468 patients covered across Lebanon",
    overviewParagraphs: [
      "Medonations is a Lebanese and French NGO with a single purpose — to bring free medical aid to those who need it most, across Lebanon and beyond.",
      "Social Pulse managed their full Instagram presence with educational content for World Health Day, disease explainers, free clinic announcements, and the Solar Panel Backpack awareness campaign.",
      "We produced bilingual Arabic and English posts that connected donors with patients — giving a voice to an organization that has served over 10,468 people and counting.",
    ],
    highlights: [
      "Lebanese and French NGO",
      "free medical aid",
      "10,468 people",
      "bilingual Arabic and English",
    ],
    quote: "Because every life deserves a chance.",
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
      "Logo design, brand identity, and food catalog design for a Saudi Arabian food export company supplying products all around the world.",
    longDescription:
      "Gulf Central Company is a Riyadh-based food export business supplying products throughout the Kingdom of Saudi Arabia and globally with innovative food solutions. Social Pulse designed their complete brand identity including the logo and branding collateral, and produced The Food Book Catalog, a premium product catalog presentation that showcases their imported food solutions with cinematic photography and editorial layout.",
    coverImage: "/covers/Gulf Central Company.svg",
    images: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=90",
    ],
    tags: ["Logo Design", "Brand Identity", "Catalog Design", "Print"],
    featured: false,
    accentColor: "#E8B84B",
    result: "Premium catalog delivered for KSA market",
    overviewParagraphs: [
      "Gulf Central Company is a Riyadh-based food export business supplying markets across the Kingdom of Saudi Arabia and beyond with innovative food solutions.",
      "Social Pulse designed their complete brand identity — logo, color system, and branding collateral — built to project credibility in one of the world's most competitive food markets.",
      "Then we produced The Food Book Catalog: a premium editorial product presentation combining cinematic photography and a print-ready layout to showcase their imported food solutions in style.",
    ],
    highlights: [
      "Kingdom of Saudi Arabia",
      "complete brand identity",
      "The Food Book Catalog",
    ],
    quote: "The world's best tastes, brought to your market.",
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
      "Platters, Taste The Passion in Every Bite, is a luxury platter and grazing experience brand based in Riyadh. Social Pulse created the brand from scratch with a refined script logo, business cards, e-voucher design, gift voucher templates, delivery box product design, and a mobile app UI/UX mockup listed on both Google Play and App Store. Every touchpoint was designed to communicate craftsmanship, elegance, and passion for food.",
    coverImage: "/covers/Platters.svg",
    images: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=90",
    ],
    tags: ["Logo Design", "App Design", "Packaging", "Brand Identity"],
    featured: false,
    accentColor: "#D4A853",
    result: "Full brand and app launched in KSA",
    overviewParagraphs: [
      "Platters is a luxury platter and grazing experience brand in Riyadh — built on a single belief: that every bite should taste like passion.",
      "Social Pulse created the brand from the ground up: a refined script logo, premium business cards, e-voucher and gift voucher templates, luxury delivery box packaging, and a mobile app UI/UX now available on Google Play and the App Store.",
      "Every touchpoint was designed to communicate craftsmanship, elegance, and a love for extraordinary food presentation.",
    ],
    highlights: [
      "from the ground up",
      "Google Play and the App Store",
      "Riyadh",
    ],
    quote: "Taste The Passion in Every Bite.",
  },
  {
    slug: "gemz-dubai",
    title: "Gemz",
    client: "Gemz",
    category: "Social Media",
    year: "2023",
    location: "Dubai, UAE",
    description:
      "Social media content design and management for a luxury fine jewelry brand in Dubai offering diamonds, gemstones, and traditional and contemporary designs.",
    longDescription:
      "Gemz is a luxury online fine jewelry store based in Dubai, offering an extensive collection of traditional and contemporary diamond and gemstone pieces. Social Pulse managed their Instagram presence with editorial photography direction, mood-led content grids, and quote-driven posts, positioning Gemz as a destination for luxury jewelry discovery with the visual language of a high-end fashion house.",
    coverImage: "/covers/GemZ.svg",
    images: [
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=1200&q=90",
    ],
    tags: ["Social Media", "Content Design", "Luxury", "Instagram"],
    featured: false,
    accentColor: "#C9A96E",
    result: "Premium luxury feed established",
    overviewParagraphs: [
      "Gemz is a luxury fine jewelry brand based in Dubai — a digital destination for diamonds, gemstones, and the kind of pieces that outlast trends.",
      "Social Pulse managed their Instagram presence with editorial photography direction, mood-led content grids, and quote-driven posts that positioned Gemz as more than a store — a destination for luxury jewelry discovery.",
      "We gave their feed the visual language of a high-end fashion house: curated, confident, and impossible to scroll past.",
    ],
    highlights: [
      "luxury fine jewelry",
      "Dubai",
      "visual language of a high-end fashion house",
    ],
    quote: "Not just jewelry — worn forever.",
  },
  {
    slug: "emagine-uae",
    title: "eMagine UAE",
    client: "eMagine",
    category: "Video",
    year: "2023",
    location: "United Arab Emirates",
    description:
      "Instagram reels and social media management for a UAE e-mobility and EV charging solutions company powering the future.",
    longDescription:
      "eMagine is at the forefront of transformative e-mobility solutions in the UAE, contributing to the nation's vision of a sustainable green economy. Social Pulse produced and managed their Instagram reels including educational EV content, presenter-led explainers on topics like how fast you can charge an EV and overcoming range anxiety, and their new website launch announcement, positioning eMagine as the leading voice for EV education in the Arabic market.",
    coverImage: "/covers/Emagine - UAE.svg",
    images: [],
    tags: ["Video Reels", "Social Media", "Motion Graphics", "EV Tech"],
    featured: false,
    accentColor: "#3B9EE8",
    result: "EV education hub built on Instagram",
    overviewParagraphs: [
      "eMagine is at the forefront of transformative e-mobility solutions in the UAE — contributing to the nation's vision of a sustainable green economy.",
      "Social Pulse produced and managed their Instagram reels: presenter-led explainers on EV charging speeds, range anxiety, and the future of clean transportation, positioning eMagine as the leading Arabic voice for EV education.",
      "From new website launch announcements to bite-sized technical breakdowns, we turned complex technology into content people actually want to watch.",
    ],
    highlights: [
      "e-mobility solutions",
      "UAE",
      "EV education",
    ],
    quote: "The future is electric. Don't wait for it.",
  },
  {
    slug: "metle-metlik",
    title: "Metle Metlik",
    client: "Dr. Sandrine Atallah and Dr. Gael Bou Ghannam",
    category: "Web Design",
    year: "2023",
    location: "Beirut, Lebanon",
    description:
      "Website design and bilingual Arabic and English video reels for a women's reproductive health and sexual wellness platform in Lebanon.",
    longDescription:
      "Metle Metlik at metlemetlik.com is a safe space for women to learn about reproductive health, sexual wellness, and life cycle challenges, founded by Dr. Sandrine Atallah and Dr. Gael Bou Ghannam. Social Pulse designed the website covering Programs, Experts, and Blog sections, produced bilingual video reels on topics like infertility, Vaginismus, and breast cancer, and managed social content by combining medical authority with empathetic and accessible visual storytelling.",
    coverImage: "/covers/Metlé Metlik.svg",
    images: [
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&q=90",
    ],
    tags: ["Web Design", "Video Reels", "Healthcare", "Bilingual Arabic and English"],
    featured: false,
    accentColor: "#C084FC",
    result: "Women's health platform launched",
    websiteUrl: "https://metlemetlik.com",
    screenshots: [
      { label: "Home",    desktop: "/projects/metle-metlik/home-desktop.jpg",    mobile: "/projects/metle-metlik/home-mobile.jpg" },
      { label: "Experts", desktop: "/projects/metle-metlik/experts-desktop.jpg", mobile: "/projects/metle-metlik/experts-mobile.jpg" },
    ],
    techStack: ["WordPress", "Figma"],
    features: ["Bilingual Arabic & English", "Programs & experts directory", "Video reels integration", "Mobile-first responsive"],
    overviewParagraphs: [
      "Metle Metlik at metlemetlik.com is a safe space for women to learn about reproductive health, sexual wellness, and life cycle challenges — founded by Dr. Sandrine Atallah and Dr. Gael Bou Ghannam.",
      "Social Pulse designed the full website covering Programs, Experts, and Blog sections, and produced bilingual video reels on topics including infertility, Vaginismus, and breast cancer.",
      "We combined medical authority with empathetic visual storytelling — making the conversation around women's health in Lebanon not just available, but approachable.",
    ],
    highlights: [
      "metlemetlik.com",
      "Dr. Sandrine Atallah and Dr. Gael Bou Ghannam",
      "reproductive health",
      "bilingual",
    ],
    quote: "Your health. Your rules. Your conversation.",
  },
  {
    slug: "the-breast-clinic",
    title: "The Breast Clinic",
    client: "Dr. Chebl Azar",
    category: "Branding",
    year: "2024",
    location: "Beirut, Lebanon",
    description:
      "Full brand identity, mobile app, billboard advertising, and website design for The Breast Clinic, Where Health and Beauty Unite, led by Dr. Chebl Azar.",
    longDescription:
      "The Breast Clinic led by Dr. Chebl Azar in Beirut required a brand that walked the line between clinical trust and feminine warmth. Social Pulse designed the distinctive heart-shaped logo now available as a mobile app icon on iOS and Android, developed the full brand identity in pink and black, and produced outdoor billboard advertising with the brand's positioning: Live Life, Go Healthy and Happy. We also designed and developed the clinic's website at drcheblazar.com, creating a clean, trust-building online presence that presents his specialties, patient journey, and booking flow.",
    coverImage: "/covers/The breast Clinic.svg",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=90",
    ],
    tags: ["Logo Design", "App Design", "Outdoor Advertising", "Web Design", "Healthcare"],
    featured: false,
    accentColor: "#EC4899",
    result: "Full brand, app, and website launched",
    websiteUrl: "https://drcheblazar.com",
    screenshots: [
      { label: "Home", desktop: "/projects/the-breast-clinic/home-desktop.jpg", mobile: "/projects/the-breast-clinic/home-mobile.jpg" },
    ],
    techStack: ["WordPress", "Figma"],
    features: ["Clinic services overview", "Patient journey flow", "Mobile-first responsive", "SEO optimized"],
    instagramHandle: "drcheblazar",
    socialPosts: [
      { src: "/projects/the-breast-clinic/social/post-1.jpg",  type: "post",     instagramUrl: "https://www.instagram.com/p/C6gnmHAMiYY/" },
      { src: "/projects/the-breast-clinic/social/post-2.jpg",  type: "post",     instagramUrl: "https://www.instagram.com/p/C6wTg1_sceJ/" },
      { src: "/projects/the-breast-clinic/social/post-3.jpg",  type: "carousel", instagramUrl: "https://www.instagram.com/p/C60y2viMrcS/",  slides: ["/projects/the-breast-clinic/social/post-3-slide-3.jpg", "/projects/the-breast-clinic/social/post-3-slide-4.jpg", "/projects/the-breast-clinic/social/post-3-slide-5.jpg", "/projects/the-breast-clinic/social/post-3-slide-6.jpg"] },
      { src: "/projects/the-breast-clinic/social/post-4.jpg",  type: "carousel", instagramUrl: "https://www.instagram.com/p/C6_0PT3MhHv/",  slides: ["/projects/the-breast-clinic/social/post-4-slide-3.jpg", "/projects/the-breast-clinic/social/post-4-slide-4.jpg", "/projects/the-breast-clinic/social/post-4-slide-5.jpg"] },
      { src: "/projects/the-breast-clinic/social/post-5.jpg",  type: "carousel", instagramUrl: "https://www.instagram.com/p/C7GZC2UM4Ex/",  slides: ["/projects/the-breast-clinic/social/post-5-slide-3.jpg", "/projects/the-breast-clinic/social/post-5-slide-4.jpg", "/projects/the-breast-clinic/social/post-5-slide-5.jpg", "/projects/the-breast-clinic/social/post-5-slide-6.jpg", "/projects/the-breast-clinic/social/post-5-slide-7.jpg"] },
      { src: "/projects/the-breast-clinic/social/post-6.jpg",  type: "post",     instagramUrl: "https://www.instagram.com/p/C7R_E5Zs7Oe/" },
      { src: "/projects/the-breast-clinic/social/post-7.jpg",  type: "carousel", instagramUrl: "https://www.instagram.com/p/C7zPNQjMIeD/",  slides: ["/projects/the-breast-clinic/social/post-7-slide-3.jpg", "/projects/the-breast-clinic/social/post-7-slide-4.jpg", "/projects/the-breast-clinic/social/post-7-slide-5.jpg"] },
      { src: "/projects/the-breast-clinic/social/post-8.jpg",  type: "carousel", instagramUrl: "https://www.instagram.com/p/C8CM1ZIssKp/",  slides: ["/projects/the-breast-clinic/social/post-8-slide-3.jpg"] },
      { src: "/projects/the-breast-clinic/social/post-9.jpg",  type: "carousel", instagramUrl: "https://www.instagram.com/p/C8T8lT6M3aA/",  slides: ["/projects/the-breast-clinic/social/post-9-slide-3.jpg", "/projects/the-breast-clinic/social/post-9-slide-4.jpg", "/projects/the-breast-clinic/social/post-9-slide-5.jpg", "/projects/the-breast-clinic/social/post-9-slide-6.jpg", "/projects/the-breast-clinic/social/post-9-slide-7.jpg", "/projects/the-breast-clinic/social/post-9-slide-8.jpg"] },
      { src: "/projects/the-breast-clinic/social/post-12.jpg", type: "post",     instagramUrl: "https://www.instagram.com/p/C9SdPprslGI/" },
      { src: "/projects/the-breast-clinic/social/post-13.jpg", type: "reel",     instagramUrl: "https://www.instagram.com/reel/C9z7AonMP-H/" },
      { src: "/projects/the-breast-clinic/social/post-14.jpg", type: "reel",     instagramUrl: "https://www.instagram.com/reel/C8obqOCu0F-/" },
    ],
    overviewParagraphs: [
      "The Breast Clinic, led by Dr. Chebl Azar in Beirut, needed a brand that walked the line between clinical authority and feminine warmth — Where Health and Beauty Unite.",
      "Social Pulse designed the distinctive heart-shaped logo now available as a mobile app icon on iOS and Android, developed the full brand identity in pink and black, and produced outdoor billboard advertising with the positioning: Live Life, Go Healthy and Happy.",
      "We also built the clinic's digital home at drcheblazar.com — a clean, trust-building website presenting his specialties, patient journey, and booking flow.",
    ],
    highlights: [
      "Dr. Chebl Azar",
      "heart-shaped logo",
      "iOS and Android",
      "drcheblazar.com",
      "Live Life, Go Healthy and Happy",
    ],
    quote: "Where Health and Beauty Unite.",
  },
  {
    slug: "ddoesbusiness",
    title: "D Does Business",
    client: "Danielle Hatem",
    category: "Social Media",
    year: "2023",
    location: "Beirut, Lebanon",
    description:
      "Brand identity and Instagram content strategy for Lebanon's leading finance educator with nearly 50,000 followers and a feature in L'Orient Today.",
    longDescription:
      "D does Business, created by Danielle Hatem in 2017, is Lebanon's go-to source for making complex financial topics accessible, from stock market analysis to GCC economic updates. Featured in L'Orient Today under Finance Made Simple, the account grew significantly during Lebanon's 2019 economic crisis. Social Pulse created the brand identity and content system including data-driven investment posts, economic explainer reels, and the visual language that made the account instantly recognizable.",
    coverImage: "/covers/Ddoes Buisness.svg",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=90",
    ],
    tags: ["Brand Identity", "Content Strategy", "Finance", "Instagram Reels"],
    featured: false,
    accentColor: "#F59E0B",
    result: "Nearly 50,000 followers, featured in L'Orient Today",
    overviewParagraphs: [
      "D Does Business is Lebanon's go-to source for making complex financial topics accessible — from stock market analysis to GCC economic updates, created by Danielle Hatem in 2017.",
      "Social Pulse built the brand identity and content system that grew the account through Lebanon's most turbulent economic moments: data-driven investment posts, economic explainer reels, and a visual language that made the account instantly recognizable.",
      "Featured in L'Orient Today under Finance Made Simple, and growing toward 50,000 followers, @ddoesbusiness is proof that the right content strategy changes everything.",
    ],
    highlights: [
      "Danielle Hatem",
      "Lebanon's go-to source",
      "L'Orient Today",
      "50,000 followers",
    ],
    quote: "Finance is not complicated — it's just unexplained.",
  },
  {
    slug: "stretch-in",
    title: "Stretch'In",
    client: "Stretch'In",
    category: "Social Media",
    year: "2023",
    location: "Hazmieh, Beirut, Lebanon",
    description:
      "Logo design and Instagram management for a Beirut stretching and assisted wellness studio helping athletes and everyday clients feel the difference.",
    longDescription:
      "Stretch'In is a Beirut-based studio specializing in assisted stretching techniques tailored to each client's specific needs and goals, located at Utb One Center in Hazmieh. Social Pulse designed their fluid script logo, created the e-voucher and gift voucher system, produced the Valentine's Couple Package campaign, and managed ongoing Instagram content covering wellness benefits, skincare education with jade rollers, and studio lifestyle content at Stretchin.lb.",
    coverImage: "/covers/Stretch In.svg",
    images: [],
    tags: ["Logo Design", "Social Media", "Wellness", "Instagram"],
    featured: false,
    accentColor: "#60A5FA",
    result: "Full brand identity and social presence launched",
    overviewParagraphs: [
      "Stretch'In is a Beirut-based wellness studio specializing in assisted stretching — tailored to each client's specific needs and goals, located at Utb One Center in Hazmieh.",
      "Social Pulse designed their fluid script logo, created the e-voucher and gift voucher system, and produced the Valentine's Couple Package campaign that turned a wellness service into a shared experience.",
      "We managed ongoing Instagram content at Stretchin.lb covering the science of stretching, skincare education with jade rollers, and studio lifestyle content that made every post feel like an invitation to move better.",
    ],
    highlights: [
      "assisted stretching",
      "Hazmieh",
      "Valentine's Couple Package",
      "Stretchin.lb",
    ],
    quote: "Feel the difference. Move better.",
  },
  {
    slug: "mehe-lebanon",
    title: "MEHE Lebanon",
    client: "Ministry of Education and Higher Education",
    category: "Social Media",
    year: "2023",
    location: "Beirut, Lebanon",
    description:
      "Social media management and publication design for Lebanon's Ministry of Education and Higher Education covering campaigns, awareness posts, and official announcements.",
    longDescription:
      "The Ministry of Education and Higher Education in Lebanon oversees the country's educational system from primary to higher education levels. Social Pulse managed their Instagram account at Mehe_lebanon, producing bilingual Arabic and English content including the 16 Days Against Violence campaign, Back to School posts, Eid and seasonal greetings, and official ministry announcements. We also designed a hardcover ministry publication with a clean geometric layout reflecting the institution's credibility and reach.",
    coverImage: "/covers/MEHE Lebanon.svg",
    images: [],
    tags: ["Social Media", "Government", "Bilingual Content", "Publication Design"],
    featured: false,
    accentColor: "#16A34A",
    result: "Official government social presence managed",
    overviewParagraphs: [
      "The Ministry of Education and Higher Education in Lebanon oversees the country's educational system from primary to higher education — and needed a digital voice to match its institutional reach.",
      "Social Pulse managed their Instagram account at Mehe_lebanon with bilingual Arabic and English content: the 16 Days Against Violence campaign, Back to School posts, Eid and seasonal greetings, and official ministry announcements.",
      "We also designed a hardcover ministry publication — a clean geometric layout built to reflect the institution's credibility, authority, and national mission.",
    ],
    highlights: [
      "Ministry of Education",
      "Mehe_lebanon",
      "16 Days Against Violence",
      "bilingual Arabic and English",
    ],
    quote: "Education is not a privilege — it's a foundation.",
  },
  {
    slug: "michelle-tueini",
    title: "Michelle Tueini",
    client: "Michelle Tueini",
    category: "Video",
    year: "2023",
    location: "Lebanon",
    description:
      "Instagram reels production for Lebanese journalist Michelle Tueini, host of Beit El Sha'er on Al Jadeed TV and An-Nahar.",
    longDescription:
      "Michelle Tueini is a prominent Lebanese journalist and TV host known for her show Beit El Sha'er broadcast on both Al Jadeed TV and An-Nahar. Social Pulse produced her Instagram reels covering political analysis, interview teasers with public figures including George Khabbaz, current affairs explainers like the UN 1947 Proposal, and cultural commentary pieces, creating content that extended her television influence into the digital space.",
    coverImage: "/covers/Michelle Tueini.svg",
    images: [],
    tags: ["Video Reels", "Media", "Journalism", "Instagram"],
    featured: false,
    accentColor: "#64748B",
    result: "TV presence extended to digital reels",
    overviewParagraphs: [
      "Michelle Tueini is a prominent Lebanese journalist and TV host — known for Beit El Sha'er, broadcast on both Al Jadeed TV and An-Nahar.",
      "Social Pulse produced her Instagram reels covering political analysis, interview teasers with public figures including George Khabbaz, current affairs explainers like the UN 1947 Proposal, and cultural commentary pieces.",
      "We extended her television influence into the digital space — creating short-form content that brings her journalism to a new generation of Lebanese audiences.",
    ],
    highlights: [
      "Beit El Sha'er",
      "Al Jadeed TV and An-Nahar",
      "George Khabbaz",
    ],
    quote: "Every story deserves to be told right.",
  },
  {
    slug: "singureni-manor",
    title: "Singureni Manor",
    client: "Singureni Manor",
    category: "Branding",
    year: "2023",
    location: "Moldova",
    description:
      "Logo design and Instagram management for a luxury eco-hotel complex offering authentic nature experiences with horses and animals.",
    longDescription:
      "Singureni Manor is a luxury hotel complex offering a unique and heartfelt experience in nature, emphasizing authentic connections with horses and animals. Social Pulse designed the prestigious gold and red crest logo with equestrian motifs, and managed their Instagram at singureni.manor, producing content that captured the outdoor dining experience in the forest, seasonal landscapes, curated dessert plating, and the serene interiors of the manor.",
    coverImage: "/covers/Singureni Manor.svg",
    images: [],
    tags: ["Logo Design", "Social Media", "Luxury Hospitality", "Eco Tourism"],
    featured: false,
    accentColor: "#B8952A",
    result: "Luxury brand identity and social presence established",
    overviewParagraphs: [
      "Singureni Manor is a luxury hotel complex in Moldova offering a heartfelt experience in nature — built around authentic connections with horses, animals, and the land.",
      "Social Pulse designed the prestigious gold and red crest logo with equestrian motifs, then managed their Instagram at singureni.manor with content that captured outdoor forest dining, seasonal landscapes, curated dessert plating, and the serene interiors of the manor.",
      "Every post was crafted to make you feel like you were already there.",
    ],
    highlights: [
      "Moldova",
      "gold and red crest logo",
      "singureni.manor",
    ],
    quote: "Where luxury comes naturally.",
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
      "The Lavender Project is an eco-friendly lodge built in 2022 in Kfarmishki, West Beqaa, a 55 square meter space for up to 5 guests, built entirely from eco-friendly materials with a full view of Mount Hermon and its own lavender field. Social Pulse created the nature-inspired logo and managed their Instagram at lavenderprojectlb, capturing the village roads, seasonal landscapes, local Mouneh produce, and the serene experience of the Kfarmishki village.",
    coverImage: "/covers/Lavender Project.svg",
    images: [],
    tags: ["Logo Design", "Social Media", "Tourism", "Lebanon"],
    featured: false,
    accentColor: "#8B5CF6",
    result: "Eco-lodge brand and social launched",
    overviewParagraphs: [
      "The Lavender Project is an eco-friendly mountain lodge in Kfarmishki, West Beqaa — 55 square meters of thoughtfully built space for up to 5 guests, with a full view of Mount Hermon and its own lavender field.",
      "Social Pulse created the nature-inspired logo and managed their Instagram at lavenderprojectlb, capturing village roads, seasonal landscapes, local Mouneh produce, and the quiet magic of life in the Kfarmishki village.",
      "We told the story of a place that earns its own escape.",
    ],
    highlights: [
      "Kfarmishki, West Beqaa",
      "Mount Hermon",
      "lavenderprojectlb",
      "eco-friendly",
    ],
    quote: "Some places don't need a reason to visit twice.",
  },
  {
    slug: "healing-makers",
    title: "Healing Makers",
    client: "Healing Makers",
    category: "Branding",
    year: "2023",
    location: "Beirut, Lebanon",
    description:
      "Logo creation, brand identity, and billboard advertising for a cause-driven apparel brand whose entire profits fund free medical support in Lebanon.",
    longDescription:
      "Healing Makers is a brand of self-designed apparel whose entire profit goes toward providing free medical support for families in Lebanon through the Medonations NGO. Social Pulse designed the elegant script logo, created the brand system, and produced large-format billboard advertising with the campaign tagline Unite in Style, Create Change, encouraging Lebanese cloth production and factory employment while building a movement for positive community impact.",
    coverImage: "/covers/Healing Makers.svg",
    images: [],
    tags: ["Logo Design", "Billboard Advertising", "Social Cause", "Apparel"],
    featured: false,
    accentColor: "#EF4444",
    result: "Cause brand launched, profits to Medonations NGO",
    overviewParagraphs: [
      "Healing Makers is a cause-driven apparel brand with a direct purpose — every profit goes toward providing free medical support for families in Lebanon through the Medonations NGO.",
      "Social Pulse designed the elegant script logo, built the brand system, and produced large-format billboard advertising with the campaign tagline Unite in Style, Create Change.",
      "More than a clothing brand — a movement that turns what you wear into how you care.",
    ],
    highlights: [
      "Medonations NGO",
      "Unite in Style, Create Change",
      "free medical support",
    ],
    quote: "Style that heals. Fashion that gives.",
  },
  {
    slug: "bordon-lebanon",
    title: "Bordon Lebanon",
    client: "Bordon Lebanon",
    category: "Social Media",
    year: "2025",
    location: "Lebanon",
    description:
      "Social media management and content creation for Bordon Lebanon.",
    longDescription:
      "Bordon Lebanon is a Lebanese brand with a growing digital community. Social Pulse managed their social media presence, creating engaging content that reflects the brand's identity and connects with their target audience across Instagram and other platforms.",
    coverImage: "/covers/Bordon Lebanon.svg",
    images: [],
    tags: ["Social Media", "Content Creation", "Instagram", "Lebanon"],
    featured: false,
    accentColor: "#F59E0B",
    overviewParagraphs: [
      "Bordon Lebanon is a Lebanese brand with a growing digital community and a clear identity to express.",
      "Social Pulse managed their social media presence with engaging content that reflects the brand's character and connects authentically with their audience across Instagram.",
    ],
    highlights: [
      "Bordon Lebanon",
      "digital community",
    ],
    quote: "Built in Lebanon. Shared with the world.",
  },
  {
    slug: "saladitos-lebanon",
    title: "Saladitos Lebanon",
    client: "Saladitos Lebanon",
    category: "Social Media",
    year: "2025",
    location: "Lebanon",
    description:
      "Social media management and content creation for Saladitos Lebanon.",
    longDescription:
      "Saladitos Lebanon is a Lebanese food brand offering fresh and vibrant options to a health-conscious audience. Social Pulse managed their social media presence with appetizing visual content, product highlights, and community-driven posts that grew their following and drove customer engagement.",
    coverImage: "/covers/Saladitos Lebanon.svg",
    images: [],
    tags: ["Social Media", "Content Creation", "Food", "Instagram"],
    featured: false,
    accentColor: "#22C55E",
    overviewParagraphs: [
      "Saladitos Lebanon is a Lebanese food brand bringing fresh, vibrant options to a health-conscious audience that knows what it wants.",
      "Social Pulse managed their social media with appetizing visual content, product highlights, and community-driven posts that grew their following and drove real customer engagement.",
    ],
    highlights: [
      "fresh, vibrant options",
      "health-conscious",
    ],
    quote: "Fresh is not a trend — it's a choice.",
  },
  {
    slug: "esa-business-school",
    title: "ESA Business School",
    client: "ESA Business School",
    category: "Social Media",
    year: "2024",
    location: "Beirut, Lebanon",
    description:
      "Social media management and content creation for ESA Business School, one of Lebanon's leading business schools.",
    longDescription:
      "ESA Business School is one of Lebanon's most prestigious business schools, training the next generation of business leaders. Social Pulse managed their social media presence with content covering academic programs, student life, faculty highlights, and institutional announcements, positioning ESA as the leading business education destination in Lebanon.",
    coverImage: "/covers/ESA Business School.svg",
    images: [],
    tags: ["Social Media", "Education", "Content Creation", "Instagram"],
    featured: false,
    accentColor: "#3B82F6",
    overviewParagraphs: [
      "ESA Business School is one of Lebanon's most prestigious institutions — training the next generation of business leaders since its founding.",
      "Social Pulse managed their social media presence with content covering academic programs, student life, faculty highlights, and institutional announcements, positioning ESA as the leading business education destination in Lebanon.",
    ],
    highlights: [
      "ESA Business School",
      "next generation of business leaders",
      "Lebanon",
    ],
    quote: "The future of business starts here.",
  },

  // ─── WEB DESIGN ──────────────────────────────────────────────────────────────
  {
    slug: "nicholas-tawil",
    title: "Nicholas Tawil",
    client: "Nicholas Tawil",
    category: "Web Design",
    year: "2024",
    location: "Lebanon",
    description:
      "Personal brand website design and development for Nicholas Tawil at nicholastawil.com.",
    longDescription:
      "Nicholas Tawil is a Lebanese creative professional with a distinct personal brand. Social Pulse designed and developed his personal website at nicholastawil.com, crafting a polished and expressive digital identity that showcases his work, story, and expertise. The site combines refined typography, smooth transitions, and a curated portfolio layout to position Nicholas as a credible and memorable name in his field.",
    coverImage: "/covers/Nicholas Tawil.svg",
    images: [],
    tags: ["Web Design", "Web Development", "Personal Brand", "Portfolio"],
    featured: false,
    accentColor: "#6366F1",
    result: "Live at nicholastawil.com",
    websiteUrl: "https://nicholastawil.com",
    screenshots: [
      { label: "Home",  desktop: "/projects/nicholas-tawil/home-desktop.jpg",  mobile: "/projects/nicholas-tawil/home-mobile.jpg" },
      { label: "About", desktop: "/projects/nicholas-tawil/about-desktop.jpg", mobile: "/projects/nicholas-tawil/about-mobile.jpg" },
    ],
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion", "Figma"],
    features: ["Personal brand showcase", "Smooth page animations", "Portfolio & case studies", "Mobile-first responsive", "SEO optimized"],
    instagramHandle: "nicholastawil",
    socialPosts: [
      { src: "/projects/nicholas-tawil/social/post-1.jpg" },
      { src: "/projects/nicholas-tawil/social/post-2.jpg" },
      { src: "/projects/nicholas-tawil/social/post-3.jpg" },
      { src: "/projects/nicholas-tawil/social/post-4.jpg" },
      { src: "/projects/nicholas-tawil/social/post-5.jpg" },
      { src: "/projects/nicholas-tawil/social/post-6.jpg" },
      { src: "/projects/nicholas-tawil/social/post-7.jpg" },
      { src: "/projects/nicholas-tawil/social/post-8.jpg" },
      { src: "/projects/nicholas-tawil/social/post-9.jpg" },
      { src: "/projects/nicholas-tawil/social/post-10.jpg" },
      { src: "/projects/nicholas-tawil/social/post-11.jpg" },
      { src: "/projects/nicholas-tawil/social/post-12.jpg" },
    ],
    overviewParagraphs: [
      "Nicholas Tawil is a Lebanese creative professional with a distinct voice and a personal brand that deserved a digital home to match.",
      "Social Pulse designed and developed his personal website at nicholastawil.com — a polished and expressive identity built from refined typography, smooth transitions, and a curated portfolio layout.",
      "The result positions Nicholas as a credible and memorable name in his field, from the first click to the last scroll.",
    ],
    highlights: [
      "nicholastawil.com",
      "refined typography",
      "curated portfolio",
    ],
    quote: "Your name is your brand. Own it.",
  },
  {
    slug: "tiffany-saade",
    title: "Tiffany Saade",
    client: "Tiffany Saade",
    category: "Web Design",
    year: "2024",
    location: "Lebanon",
    description:
      "Personal brand website design and development for Tiffany Saade at tiffanysaade.com.",
    longDescription:
      "Tiffany Saade is a Lebanese creative professional with a strong personal brand presence. Social Pulse designed and developed her personal website at tiffanysaade.com, creating a refined and expressive digital home that reflects her identity, work, and voice. The site combines editorial typography, smooth interactions, and a curated portfolio layout to establish her as a standout personal brand in her field.",
    coverImage: "/covers/Tiffany Saade.svg",
    images: [],
    tags: ["Web Design", "Web Development", "Personal Brand", "Portfolio"],
    featured: false,
    accentColor: "#F472B6",
    result: "Live at tiffanysaade.com",
    websiteUrl: "https://tiffanysaade.com",
    screenshots: [
      { label: "Home", desktop: "/projects/tiffany-saade/home-desktop.jpg", mobile: "/projects/tiffany-saade/home-mobile.jpg" },
    ],
    techStack: ["WordPress", "Figma"],
    features: ["Personal brand presence", "Portfolio showcase", "Mobile-first responsive", "SEO optimized"],
    overviewParagraphs: [
      "Tiffany Saade is a Lebanese creative with a strong personal brand presence and a story worth telling well.",
      "Social Pulse designed and developed her personal website at tiffanysaade.com — a refined, expressive digital home built around editorial typography, smooth interactions, and a curated portfolio layout.",
      "Every detail was chosen to establish her as a standout personal brand — confident, distinctive, and unmistakably hers.",
    ],
    highlights: [
      "tiffanysaade.com",
      "editorial typography",
      "standout personal brand",
    ],
    quote: "Be the brand they remember.",
  },
  {
    slug: "the-drop-lane",
    title: "The Drop Lane",
    client: "The Drop Lane",
    category: "Web Design",
    year: "2024",
    location: "Lebanon",
    description:
      "E-commerce website design and development for The Drop Lane, a streetwear and lifestyle brand, at thedroplane.com.",
    longDescription:
      "The Drop Lane is a Lebanese streetwear and lifestyle brand built around exclusive drops and bold visual culture. Social Pulse designed and developed their e-commerce website at thedroplane.com, creating a high-energy shopping experience with product catalog pages, drop countdown mechanics, and a dark editorial aesthetic that speaks directly to their youth-driven audience.",
    coverImage: "/covers/The Drop Lane.svg",
    images: [],
    tags: ["Web Design", "E-commerce", "Streetwear", "Web Development"],
    featured: false,
    accentColor: "#F97316",
    result: "Live at thedroplane.com",
    websiteUrl: "https://thedroplane.com",
    screenshots: [
      { label: "Home", desktop: "/projects/the-drop-lane/home-desktop.jpg", mobile: "/projects/the-drop-lane/home-mobile.jpg" },
      { label: "Shop", desktop: "/projects/the-drop-lane/shop-desktop.jpg", mobile: "/projects/the-drop-lane/shop-mobile.jpg" },
    ],
    techStack: ["WordPress", "WooCommerce", "Figma"],
    features: ["E-commerce product catalog", "Exclusive drop pages", "Checkout & payments", "Dark editorial design", "Mobile-first responsive"],
    overviewParagraphs: [
      "The Drop Lane is a Lebanese streetwear and lifestyle brand built around exclusive drops, bold visual culture, and a community that lives for the next release.",
      "Social Pulse designed and developed their e-commerce website at thedroplane.com — a high-energy shopping experience with a full product catalog, drop countdown mechanics, and a dark editorial aesthetic.",
      "The site was built to speak directly to their youth-driven audience: fast, bold, and impossible to ignore.",
    ],
    highlights: [
      "exclusive drops",
      "thedroplane.com",
      "dark editorial aesthetic",
    ],
    quote: "Every drop is a statement.",
  },
  {
    slug: "heg-construction",
    title: "HEG Construction",
    client: "HEG Construction",
    category: "Web Design",
    year: "2024",
    location: "Lebanon",
    description:
      "Corporate website design and development for HEG Construction, a Lebanese construction and contracting firm, at hegconstruction.com.",
    longDescription:
      "HEG Construction is a Lebanese construction and contracting company delivering residential, commercial, and infrastructure projects across Lebanon. Social Pulse designed and developed their corporate website at hegconstruction.com, presenting their portfolio of completed projects, services, and company profile in a structured and professional layout that builds credibility with developers, investors, and property owners.",
    coverImage: "/covers/HEG Construction.svg",
    images: [],
    tags: ["Web Design", "Web Development", "Construction", "Corporate"],
    featured: false,
    accentColor: "#A78BFA",
    result: "Live at hegconstruction.com",
    websiteUrl: "https://hegconstruction.com",
    screenshots: [
      { label: "Home", desktop: "/projects/heg-construction/home-desktop.jpg", mobile: "/projects/heg-construction/home-mobile.jpg" },
    ],
    techStack: ["WordPress", "Figma"],
    features: ["Project portfolio gallery", "Services overview", "Company credibility layout", "Mobile-first responsive", "SEO optimized"],
    overviewParagraphs: [
      "HEG Construction is a Lebanese construction and contracting company delivering residential, commercial, and infrastructure projects across Lebanon.",
      "Social Pulse designed and developed their corporate website at hegconstruction.com — a structured, professional layout presenting their portfolio of completed projects, service offerings, and company profile.",
      "Built to command credibility with developers, investors, and property owners from the first impression.",
    ],
    highlights: [
      "hegconstruction.com",
      "portfolio of completed projects",
      "developers, investors, and property owners",
    ],
    quote: "Built to last. Designed to impress.",
  },
  {
    slug: "dr-amany-sabbagh",
    title: "Dr. Amany Sabbagh",
    client: "Dr. Amany Sabbagh",
    category: "Web Design",
    year: "2024",
    location: "Lebanon",
    description:
      "Medical website design and development for Dr. Amany Sabbagh at dramanysabbagh.com.",
    longDescription:
      "Dr. Amany Sabbagh is a Lebanese medical specialist with a practice focused on patient care and clinical excellence. Social Pulse designed and developed her professional website at dramanysabbagh.com, building a reassuring and authoritative digital presence. The site presents her specializations, clinic information, and patient resources in a clean, accessible layout designed to convert visitors into appointments.",
    coverImage: "/covers/Amany Sabbagh.svg",
    images: [],
    tags: ["Web Design", "Web Development", "Medical", "Healthcare"],
    featured: false,
    accentColor: "#06B6D4",
    result: "Live at dramanysabbagh.com",
    websiteUrl: "https://dramanysabbagh.com",
    screenshots: [
      { label: "Home", desktop: "/projects/dr-amany-sabbagh/home-desktop.jpg", mobile: "/projects/dr-amany-sabbagh/home-mobile.jpg" },
    ],
    techStack: ["WordPress", "Figma"],
    features: ["Medical professional profile", "Specializations overview", "Appointment booking flow", "Mobile-first responsive", "SEO structured data"],
    overviewParagraphs: [
      "Dr. Amany Sabbagh is a Lebanese medical specialist with a practice built on clinical excellence and patient-centered care.",
      "Social Pulse designed and developed her professional website at dramanysabbagh.com — a reassuring, authoritative digital presence presenting her specializations, clinic information, and patient resources.",
      "Clean, accessible, and built to convert first-time visitors into confident appointments.",
    ],
    highlights: [
      "dramanysabbagh.com",
      "clinical excellence",
      "patient-centered care",
    ],
    quote: "Your health is our commitment.",
  },
  {
    slug: "it-signal",
    title: "IT Signal",
    client: "IT Signal",
    category: "Web Design",
    year: "2024",
    location: "Lebanon",
    description:
      "Website design and development for IT Signal, a Lebanese IT services and technology solutions provider, at itsignal.org.",
    longDescription:
      "IT Signal is a Lebanese technology company specializing in IT infrastructure, networking, and digital solutions for businesses. Social Pulse designed and developed their corporate website at itsignal.org with a structured services architecture, case study sections, and a modern tech-forward visual identity. The site was built for clarity and lead generation, presenting complex technical offerings in an accessible and credible layout.",
    coverImage: "/covers/IT Signal.svg",
    images: [],
    tags: ["Web Design", "Web Development", "IT Services", "Corporate"],
    featured: false,
    accentColor: "#29ABE2",
    result: "Live at itsignal.org",
    websiteUrl: "https://itsignal.org",
    screenshots: [
      { label: "Home", desktop: "/projects/it-signal/home-desktop.jpg", mobile: "/projects/it-signal/home-mobile.jpg" },
    ],
    techStack: ["WordPress", "Figma"],
    features: ["IT services architecture", "Case studies section", "Lead generation layout", "Mobile-first responsive", "SEO optimized"],
    overviewParagraphs: [
      "IT Signal is a Lebanese technology company specializing in IT infrastructure, networking, and digital solutions for businesses.",
      "Social Pulse designed and developed their corporate website at itsignal.org — a structured services architecture with case study sections and a modern tech-forward visual identity built for clarity and lead generation.",
      "Complex technical offerings, presented in a language that every business owner can trust.",
    ],
    highlights: [
      "itsignal.org",
      "IT infrastructure",
      "lead generation",
    ],
    quote: "Technology that works as hard as you do.",
  },
  {
    slug: "forearms-security",
    title: "Forearms Security",
    client: "Forearms Security",
    category: "Web Design",
    year: "2026",
    location: "Lebanon",
    description:
      "Website design and development for Forearms Security, a professional security services company.",
    longDescription:
      "Forearms Security is a professional security services provider delivering protection solutions for businesses and individuals. Social Pulse designed and developed their corporate website, creating a strong, authoritative digital presence that communicates their expertise, service offerings, and commitment to safety through a clean and credible layout.",
    coverImage: "/covers/Forarms Security.svg",
    images: [],
    tags: ["Web Design", "Web Development", "Security", "Corporate"],
    featured: false,
    accentColor: "#F5A500",
    websiteUrl: "https://forearmssecurity.com",
    screenshots: [
      { label: "Home", desktop: "/projects/forearms-security/home-desktop.jpg", mobile: "/projects/forearms-security/home-mobile.jpg" },
    ],
    techStack: ["WordPress", "Figma"],
    features: ["Security services overview", "Company credibility layout", "Contact & inquiry flow", "Mobile-first responsive", "SEO optimized"],
    overviewParagraphs: [
      "Forearms Security is a professional security services provider delivering protection solutions for businesses and individuals who refuse to compromise on safety.",
      "Social Pulse designed and developed their corporate website at forearmssecurity.com — a strong, authoritative digital presence that communicates expertise, service offerings, and an uncompromising commitment to protection.",
    ],
    highlights: [
      "forearmssecurity.com",
      "protection solutions",
      "uncompromising commitment",
    ],
    quote: "Protection you don't have to think about.",
  },
  {
    slug: "imtihan",
    title: "Imtihan",
    client: "Imtihan",
    category: "Web Design",
    year: "2026",
    location: "Lebanon",
    description:
      "Website design and development for Imtihan, a Lebanese digital platform.",
    longDescription:
      "Imtihan is a Lebanese digital platform built to serve its audience with a clean, modern, and fast web experience. Social Pulse designed and developed their website at imtihan.live using Next.js, delivering a performance-first build with smooth interactions, mobile responsiveness, and a scalable architecture.",
    coverImage: "/covers/Imtihan.svg",
    images: [],
    tags: ["Web Design", "Web Development", "Next.js"],
    featured: false,
    accentColor: "#2D6A4F",
    websiteUrl: "https://imtihan.live",
    screenshots: [
      { label: "Home", desktop: "/projects/imtihan/home-desktop.jpg", mobile: "/projects/imtihan/home-mobile.jpg" },
    ],
    techStack: ["Next.js", "Tailwind CSS", "Figma"],
    features: ["Performance-first build", "Smooth interactions", "Mobile-first responsive", "SEO optimized", "Scalable architecture"],
    overviewParagraphs: [
      "Imtihan is a Lebanese digital platform built to serve its audience with a clean, modern, and fast web experience.",
      "Social Pulse designed and developed their website at imtihan.live using Next.js — a performance-first build with smooth interactions, mobile responsiveness, and a scalable architecture built for growth.",
    ],
    highlights: [
      "imtihan.live",
      "Next.js",
      "performance-first",
    ],
    quote: "Knowledge, delivered.",
  },
  // ─── COMING SOON (no case study yet) ────────────────────────────────────────
  {
    slug: "objeti",
    title: "OBJETI",
    client: "OBJETI",
    category: "Social Media",
    year: "2024",
    location: "Lebanon",
    description: "Social media management for OBJETI.",
    longDescription: "Social media management for OBJETI.",
    coverImage: "",
    images: [],
    tags: ["Social Media"],
    featured: false,
    accentColor: "#A78BFA",
    comingSoon: true,
  },
  {
    slug: "skybond-travel",
    title: "SkyBond Travel",
    client: "SkyBond Travel",
    category: "Social Media",
    year: "2024",
    location: "Lebanon",
    description: "Social media management for SkyBond Travel.",
    longDescription: "Social media management for SkyBond Travel.",
    coverImage: "",
    images: [],
    tags: ["Social Media"],
    featured: false,
    accentColor: "#38BDF8",
    comingSoon: true,
  },
  {
    slug: "curaloop",
    title: "Curaloop",
    client: "Curaloop",
    category: "Social Media",
    year: "2024",
    location: "Global",
    description: "Social media management for Curaloop.",
    longDescription: "Social media management for Curaloop.",
    coverImage: "",
    images: [],
    tags: ["Social Media"],
    featured: false,
    accentColor: "#06B6D4",
    comingSoon: true,
  },
  {
    slug: "international-maritime-academy",
    title: "International Maritime Academy",
    client: "International Maritime Academy",
    category: "Social Media",
    year: "2024",
    location: "Lebanon",
    description: "Social media management for International Maritime Academy.",
    longDescription: "Social media management for International Maritime Academy.",
    coverImage: "",
    images: [],
    tags: ["Social Media"],
    featured: false,
    accentColor: "#1D4ED8",
    comingSoon: true,
  },
  {
    slug: "overseas-travel",
    title: "Overseas Travel",
    client: "Overseas Travel",
    category: "Social Media",
    year: "2024",
    location: "Lebanon",
    description: "Social media management for Overseas Travel.",
    longDescription: "Social media management for Overseas Travel.",
    coverImage: "",
    images: [],
    tags: ["Social Media"],
    featured: false,
    accentColor: "#F59E0B",
    comingSoon: true,
  },
  {
    slug: "dr-joseph-ghanimeh",
    title: "Dr. Joseph Ghanimeh",
    client: "Dr. Joseph Ghanimeh",
    category: "Social Media",
    year: "2024",
    location: "Lebanon",
    description: "Social media management for Dr. Joseph Ghanimeh.",
    longDescription: "Social media management for Dr. Joseph Ghanimeh.",
    coverImage: "",
    images: [],
    tags: ["Social Media"],
    featured: false,
    accentColor: "#34D399",
    comingSoon: true,
  },
  {
    slug: "celine",
    title: "Céline",
    client: "Céline",
    category: "Social Media",
    year: "2024",
    location: "Lebanon",
    description: "Social media management for Céline.",
    longDescription: "Social media management for Céline.",
    coverImage: "",
    images: [],
    tags: ["Social Media"],
    featured: false,
    accentColor: "#F472B6",
    comingSoon: true,
  },
  {
    slug: "dr-rita-sammour",
    title: "Dr. Rita Sammour",
    client: "Dr. Rita Sammour",
    category: "Social Media",
    year: "2024",
    location: "Lebanon",
    description: "Social media management for Dr. Rita Sammour.",
    longDescription: "Social media management for Dr. Rita Sammour.",
    coverImage: "",
    images: [],
    tags: ["Social Media"],
    featured: false,
    accentColor: "#FB7185",
    comingSoon: true,
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
