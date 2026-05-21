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
      "Dare Advisors is a global boutique financial advisory firm dedicated to helping individuals and businesses achieve their financial goals. Social Pulse built the complete brand from the ground up including logo, identity system, and brand guidelines. We then created their ongoing Instagram content covering educational posts, investment insights, and office announcements, and designed their website at dareadvisors.com with a sleek and captivating look that matched their bold positioning: Sometimes you need to Dare take the risk.",
    coverImage:
      "/covers/dare-advisors.svg",
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
      "Brand strategy, marketing plan, and digital presence for Beirut's upscale Italian and French fashion boutique, founded in 2011 by Carla Hanna.",
    longDescription:
      "Kataleya is a Beirut-based upscale fashion destination offering over 40 Italian and French luxury brands since 2011, with a second location opened in 2015. Social Pulse developed a comprehensive brand portfolio covering market positioning, competitive analysis, a full visual identity refresh, and a digital marketing strategy targeting Dubai expansion. We produced the brand presentation deck, social media strategy, store layout direction, and ongoing content for their sophisticated Lebanese clientele.",
    coverImage:
      "/covers/Kataleya.svg",
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
      "Social media management for a Lebanese and French NGO delivering free medical aid to over 10,468 patients across Lebanon with 89 treatments and surgeries covered.",
    longDescription:
      "Medonations is a Lebanese and French NGO with a mission to provide medical aid and relief to those in need, bringing hope to communities across Lebanon and the globe. Social Pulse managed their full Instagram presence by creating educational medical content for World Health Day, disease explainers, and free clinic announcements, running the Solar Panel Backpack awareness campaign, and producing bilingual Arabic and English posts that connected donors and patients alike. Their account reflects both the urgency and the heart of the organization.",
    coverImage:
      "/covers/Medonations.svg",
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
      "Logo design, brand identity, and food catalog design for a Saudi Arabian food export company supplying products all around the world.",
    longDescription:
      "Gulf Central Company is a Riyadh-based food export business supplying products throughout the Kingdom of Saudi Arabia and globally with innovative food solutions. Social Pulse designed their complete brand identity including the logo and branding collateral, and produced The Food Book Catalog, a premium product catalog presentation that showcases their imported food solutions with cinematic photography and editorial layout.",
    coverImage:
      "/covers/Gulf Central Company.svg",
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
      "Platters, Taste The Passion in Every Bite, is a luxury platter and grazing experience brand based in Riyadh. Social Pulse created the brand from scratch with a refined script logo, business cards, e-voucher design, gift voucher templates, delivery box product design, and a mobile app UI/UX mockup listed on both Google Play and App Store. Every touchpoint was designed to communicate craftsmanship, elegance, and passion for food.",
    coverImage:
      "/covers/Platters.svg",
    images: [
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=90",
    ],
    tags: ["Logo Design", "App Design", "Packaging", "Brand Identity"],
    featured: false,
    accentColor: "#D4A853",
    result: "Full brand and app launched in KSA",
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
    coverImage:
      "/covers/GemZ.svg",
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
      "Instagram reels and social media management for a UAE e-mobility and EV charging solutions company powering the future.",
    longDescription:
      "eMagine is at the forefront of transformative e-mobility solutions in the UAE, contributing to the nation's vision of a sustainable green economy. Social Pulse produced and managed their Instagram reels including educational EV content, presenter-led explainers on topics like how fast you can charge an EV and overcoming range anxiety, and their new website launch announcement, positioning eMagine as the leading voice for EV education in the Arabic market.",
    coverImage:
      "/covers/Emagine - UAE.svg",
    images: [],
    tags: ["Video Reels", "Social Media", "Motion Graphics", "EV Tech"],
    featured: false,
    accentColor: "#3B9EE8",
    result: "EV education hub built on Instagram",
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
    coverImage:
      "/covers/Metlé Metlik.svg",
    images: [
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&q=90",
    ],
    tags: ["Web Design", "Video Reels", "Healthcare", "Bilingual Arabic and English"],
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
      "Logo design, mobile app mockup, and billboard advertising for The Breast Clinic, Where Health and Beauty Unite, led by Dr. Chebl Azar.",
    longDescription:
      "The Breast Clinic led by Dr. Chebl Azar in Beirut required a brand that walked the line between clinical trust and feminine warmth. Social Pulse designed the distinctive heart-shaped logo now available as a mobile app icon on iOS and Android, developed the full brand identity in pink and black, and produced outdoor billboard advertising with the brand's positioning: Live Life, Go Healthy and Happy.",
    coverImage:
      "/covers/The breast Clinic.svg",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=90",
    ],
    tags: ["Logo Design", "App Design", "Outdoor Advertising", "Healthcare"],
    featured: false,
    accentColor: "#EC4899",
    result: "Full brand and app icon launched",
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
    coverImage:
      "/covers/Ddoes Buisness.svg",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=90",
    ],
    tags: ["Brand Identity", "Content Strategy", "Finance", "Instagram Reels"],
    featured: false,
    accentColor: "#F59E0B",
    result: "Nearly 50,000 followers, featured in L'Orient Today",
  },
  {
    slug: "prairie-trading",
    title: "Prairie Trading Service",
    client: "Prairie Trading Service Inc.",
    category: "Branding",
    year: "2022",
    location: "Riyadh, Saudi Arabia",
    description:
      "Logo development with three options, packaging design, and brand identity for a US food export and labeling company operating in Saudi Arabia.",
    longDescription:
      "Prairie Trading Service Inc., US Foods Worldwide, is a niche food export and labeling specialist serving the food and beverage industry with premium imported ingredients. Social Pulse delivered three logo concept directions ranging from bold typographic to illustrated, and designed the full brand packaging system including eye-catching product packaging featuring the brand's Illinois state identity and American flag imagery.",
    coverImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=90",
    images: [],
    tags: ["Logo Design", "Packaging Design", "Brand Identity", "Food and Beverage"],
    featured: false,
    accentColor: "#C0392B",
    result: "Three logo concepts and full packaging system delivered",
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
    coverImage:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=90",
    images: [],
    tags: ["Logo Design", "Social Media", "Wellness", "Instagram"],
    featured: false,
    accentColor: "#60A5FA",
    result: "Full brand identity and social presence launched",
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
    coverImage:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=90",
    images: [],
    tags: ["Social Media", "Government", "Bilingual Content", "Publication Design"],
    featured: false,
    accentColor: "#16A34A",
    result: "Official government social presence managed",
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
    coverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=90",
    images: [],
    tags: ["Video Reels", "Media", "Journalism", "Instagram"],
    featured: false,
    accentColor: "#64748B",
    result: "TV presence extended to digital reels",
  },
  {
    slug: "cirrus-shield",
    title: "Cirrus Shield",
    client: "Cirrus Shield",
    category: "Social Media",
    year: "2023",
    location: "Paris, France",
    description:
      "Social media management in French for a Paris-based cloud CRM and low-code platform company serving training organizations across Europe.",
    longDescription:
      "Cirrus Shield is a leading provider of cloud-based CRM and low-code platform solutions based in Paris, helping businesses streamline operations and maximize their potential. Social Pulse created and managed their French-language Instagram content including educational posts on Qualiopi certification compliance, animated explainers on complaint management for training organizations, and campaign content like the four effective methods to save admin time series for their account at Cirrus.shield.",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=90",
    images: [],
    tags: ["Social Media", "French Content", "SaaS", "B2B"],
    featured: false,
    accentColor: "#3B82F6",
    result: "French B2B social media presence built",
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
    coverImage:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=90",
    images: [],
    tags: ["Logo Design", "Social Media", "Luxury Hospitality", "Eco Tourism"],
    featured: false,
    accentColor: "#B8952A",
    result: "Luxury brand identity and social presence established",
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
    coverImage:
      "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=1200&q=90",
    images: [],
    tags: ["Logo Design", "Social Media", "Tourism", "Lebanon"],
    featured: false,
    accentColor: "#8B5CF6",
    result: "Eco-lodge brand and social launched",
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
    coverImage:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=90",
    images: [],
    tags: ["Logo Design", "Billboard Advertising", "Social Cause", "Apparel"],
    featured: false,
    accentColor: "#EF4444",
    result: "Cause brand launched, profits to Medonations NGO",
  },

  // ─── WEB DESIGN ──────────────────────────────────────────────────────────────
  {
    slug: "dr-chebl-azar",
    title: "Dr. Chebl Azar",
    client: "Dr. Chebl Azar",
    category: "Web Design",
    year: "2024",
    location: "Beirut, Lebanon",
    description:
      "Full website design and development for Dr. Chebl Azar, aesthetic and reconstructive plastic surgeon in Beirut, at drcheblazar.com.",
    longDescription:
      "Dr. Chebl Azar is a leading plastic, aesthetic, and reconstructive surgeon based in Beirut. Social Pulse designed and developed his personal website at drcheblazar.com, building a clean and trust-focused online presence that communicates his expertise, procedures, and patient journey. The site features a full services overview, gallery section, and a mobile-first responsive design that reflects the precision and elegance of his practice.",
    coverImage:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=90",
    images: [],
    tags: ["Web Design", "Web Development", "Medical", "Plastic Surgery"],
    featured: false,
    accentColor: "#0EA5E9",
    result: "Live at drcheblazar.com",
  },
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
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=90",
    images: [],
    tags: ["Web Design", "Web Development", "Personal Brand", "Portfolio"],
    featured: false,
    accentColor: "#6366F1",
    result: "Live at nicholastawil.com",
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
    coverImage:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=90",
    images: [],
    tags: ["Web Design", "Web Development", "Personal Brand", "Portfolio"],
    featured: false,
    accentColor: "#F472B6",
    result: "Live at tiffanysaade.com",
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
    coverImage:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=90",
    images: [],
    tags: ["Web Design", "E-commerce", "Streetwear", "Web Development"],
    featured: false,
    accentColor: "#F97316",
    result: "Live at thedroplane.com",
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
    coverImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=90",
    images: [],
    tags: ["Web Design", "Web Development", "Construction", "Corporate"],
    featured: false,
    accentColor: "#A78BFA",
    result: "Live at hegconstruction.com",
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
    coverImage:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&q=90",
    images: [],
    tags: ["Web Design", "Web Development", "Medical", "Healthcare"],
    featured: false,
    accentColor: "#06B6D4",
    result: "Live at dramanysabbagh.com",
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
    coverImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=90",
    images: [],
    tags: ["Web Design", "Web Development", "IT Services", "Corporate"],
    featured: false,
    accentColor: "#10B981",
    result: "Live at itsignal.org",
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
