export const SITE_URL = "https://tieropdigital.com";
export const EMAIL = "info@tieropdigital.com";
export const ALTERNATE_EMAIL = "tieropdigital.com@gmail.com";
export const WHATSAPP_NUMBER = "0312 7204408";
export const WHATSAPP_URL = "https://wa.me/923127204408";
export const INSTAGRAM_URL = "https://www.instagram.com/tieropdigital/";
export type Project = { slug: string; name: string; label: string; url: string; image?: string; color: string; overview?: string; };
export const projects: Project[] = [
  { slug: "r-racer", name: "R Racer Ltd", label: "AUTOMOTIVE", url: "https://rracerltd.com", image: "r-racer", color: "#ed453a", overview: "An automotive website introducing R Racer Ltd and its vehicle buying and rental experiences." },
  { slug: "pearl-lemon-properties", name: "Pearl Lemon Properties", label: "PROPERTY", url: "https://pearllemonproperties.com/", image: "pearl-lemon", color: "#f2cf13", overview: "A property sourcing website presenting investment services and a direct inquiry experience." },
  { slug: "solds", name: "Solds", label: "PROPERTY", url: "https://solds.co.uk/", image: "solds", color: "#f33b3c", overview: "A property website presenting a house-selling service in Scotland, with clear paths to request an offer." },
  { slug: "rahat-medical", name: "Rahat Abdul Ghaffar Medical Complex", label: "HEALTHCARE", url: "https://rahatabdulghaffarmc.com/", image: "rahat-medical", color: "#ff8b23", overview: "A hospital website introducing the medical complex, its departments and appointment information." },
];
export const services = [
  { number: "01", title: "Web applications", description: "From your first product to a complete business platform. Thoughtful interfaces, connected data and reliable development, built around the way you work.", tags: ["Full-stack development", "MERN stack", "Supabase web apps", "UI & UX design"] },
  { number: "02", title: "Shopify & e-commerce", description: "Distinctive Shopify stores with clear product journeys, responsive themes and a shopping experience that feels effortless.", tags: ["Shopify", "Custom storefronts", "Store optimization"] },
  { number: "03", title: "Webflow websites", description: "Expressive, responsive Webflow websites that give your brand a home and your team an easy way to keep it fresh.", tags: ["Webflow development", "CMS collections", "Responsive design"] },
  { number: "04", title: "AI automation", description: "Connect your tools and simplify repetitive work with practical AI workflows, integrations and assistants.", tags: ["AI workflows", "App integrations", "Business automation"] },
  { number: "05", title: "Design, video & AI content", description: "Visual work with a point of view. From brand graphics and social content to polished edits and AI-generated videos.", tags: ["Graphic design", "Video editing", "AI videos"] },
  { number: "06", title: "Upwork optimization", description: "Present your expertise with a clearer profile, a considered portfolio and focused proposals that communicate your value.", tags: ["Profile optimization", "Portfolio presentation", "Proposal strategy"] },
];
export const serviceCategories = ["All services", "Development", "AI & automation", "Creative", "Growth"] as const;
export type ServiceCategory = typeof serviceCategories[number];
export const serviceCatalog = [
  { title: "Websites & Webflow", category: "Development", icon: "web", description: "Business websites and editable Webflow sites that make your offer clear and your next inquiry easy.", tags: ["Web design", "Webflow CMS", "Landing pages"] },
  { title: "Shopify stores", category: "Development", icon: "shop", description: "Store design, Liquid customization and product pages built around how your customers shop.", tags: ["Shopify", "Theme customization", "E-commerce"] },
  { title: "Custom web apps", category: "Development", icon: "app", description: "Dashboards, portals and business tools with connected interfaces, APIs and data.", tags: ["Full-stack", "MERN", "Supabase"] },
  { title: "AI automation", category: "AI & automation", icon: "automation", description: "Connected workflows that handle repeat tasks and keep your team focused on the work that needs them.", tags: ["Workflows", "Integrations", "Business automation"] },
  { title: "AI chatbots", category: "AI & automation", icon: "chat", description: "Customer support assistants grounded in your business knowledge, with a clear handoff to your team.", tags: ["Support", "Knowledge bases", "Human handoff"] },
  { title: "LLM & RAG systems", category: "AI & automation", icon: "database", description: "AI tools that retrieve your documents and connect approved knowledge with useful business workflows.", tags: ["LLMs", "Retrieval", "Business knowledge"] },
  { title: "Brand & graphic design", category: "Creative", icon: "design", description: "Brand identities, campaign graphics and social content with a consistent visual direction.", tags: ["Brand identity", "Marketing design", "Social content"] },
  { title: "Video & AI content", category: "Creative", icon: "video", description: "Sharp edits, motion and AI video concepts for campaigns, brands and social channels.", tags: ["Video editing", "AI video", "Reels & shorts"] },
  { title: "SEO & digital growth", category: "Growth", icon: "growth", description: "Technical SEO, clearer service content and stronger Upwork profiles that help people find and understand your work.", tags: ["Technical SEO", "Content", "Upwork optimization"] },
] as const;
export const process = [
  { title: "Understand", description: "Start with the right questions. Your business, your audience and what the experience needs to achieve." },
  { title: "Explore", description: "Find a distinct direction through structure, visual exploration and a clear creative idea." },
  { title: "Create", description: "Bring design and development together, refining the details with your feedback along the way." },
  { title: "Refine", description: "Test on real screens, polish the interactions and prepare the experience for launch." },
];
