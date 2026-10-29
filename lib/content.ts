export const SITE_URL = "https://tieropdigital.com";
export const EMAIL = "tieropdigital.com@gmail.com";
export const INSTAGRAM_URL = "https://www.instagram.com/tieropdigital/";
export type Project = { slug: string; name: string; label: string; url: string; image?: string; color: string; overview?: string; };
export const projects: Project[] = [
  { slug: "r-racer", name: "R Racer Ltd", label: "AUTOMOTIVE", url: "https://rracerltd.com", image: "r-racer", color: "#ed453a", overview: "An automotive website introducing R Racer Ltd and its vehicle buying and rental experiences." },
  { slug: "pearl-lemon-properties", name: "Pearl Lemon Properties", label: "PROPERTY", url: "https://pearllemonproperties.com/", image: "pearl-lemon", color: "#f2cf13", overview: "A property sourcing website presenting investment services and a direct inquiry experience." },
  { slug: "solds", name: "Solds", label: "PROPERTY", url: "https://solds.co.uk/", image: "solds", color: "#f33b3c", overview: "A property website presenting a house-selling service in Scotland, with clear paths to request an offer." },
  { slug: "thoes", name: "THOES", label: "PROPERTY", url: "https://thoes.webflow.io/", image: "thoes", color: "#ff734b", overview: "A Dutch-language website introducing THOES and its property selling and insurance journeys." },
  { slug: "rahat-medical", name: "Rahat Abdul Ghaffar Medical Complex", label: "HEALTHCARE", url: "https://rahatabdulghaffarmc.com/", image: "rahat-medical", color: "#ff8b23", overview: "A hospital website introducing the medical complex, its departments and appointment information." },
  { slug: "custom-mini-buckets", name: "Custom Mini Buckets", label: "LIVE PROJECT", url: "https://customminibuckets.com", color: "#00dbc8" },
  { slug: "reurbano", name: "Reurbano", label: "LIVE PROJECT", url: "https://reurbano.mx/", color: "#00dbc8" },
  { slug: "yush", name: "Yush", label: "LIVE PROJECT", url: "https://yush-new-project.webflow.io/", color: "#00dbc8" },
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
  { title: "Web applications", category: "Development", icon: "app", description: "Custom dashboards, portals and digital products that turn your idea into an intuitive, responsive experience.", tags: ["Custom web apps", "UI & UX", "Responsive"] },
  { title: "Shopify", category: "Development", icon: "shop", description: "Brand-led online stores, custom themes and thoughtful product journeys, from first click to checkout.", tags: ["E-commerce", "Custom themes", "Store setup"] },
  { title: "Webflow", category: "Development", icon: "web", description: "Distinctive marketing websites with flexible CMS content, refined interactions and room for your brand to grow.", tags: ["Webflow CMS", "Landing pages", "Interactions"] },
  { title: "Full-stack development", category: "Development", icon: "code", description: "Your interface, business logic and data, built together as one cohesive product with dependable foundations.", tags: ["Frontend", "Backend", "API integration"] },
  { title: "MERN stack", category: "Development", icon: "layers", description: "Complete applications using MongoDB, Express, React and Node.js, shaped around your product and users.", tags: ["MongoDB", "Express", "React", "Node.js"] },
  { title: "Supabase web apps", category: "Development", icon: "database", description: "Launch connected products with a PostgreSQL database, authentication, storage and real-time experiences.", tags: ["Supabase", "Authentication", "Real-time data"] },
  { title: "AI automation", category: "AI & automation", icon: "automation", description: "Practical AI assistants and connected workflows that reduce repetitive tasks and keep your business moving.", tags: ["AI workflows", "Integrations", "Assistants"] },
  { title: "Graphic design", category: "Creative", icon: "design", description: "Visual identities, social graphics and marketing assets that give your brand a consistent, distinctive voice.", tags: ["Brand identity", "Social media", "Marketing design"] },
  { title: "Video editing", category: "Creative", icon: "video", description: "Well-paced edits, clear storytelling and considered finishing for your brand, campaigns and social channels.", tags: ["Reels & shorts", "Brand films", "Post-production"] },
  { title: "AI videos", category: "Creative", icon: "spark", description: "Bring fresh visual concepts to life with AI-generated video, creative direction and a polished final edit.", tags: ["AI-generated video", "Concepts", "Social content"] },
  { title: "Upwork optimization", category: "Growth", icon: "growth", description: "A clearer professional profile, stronger portfolio presentation and proposal guidance that express what you offer.", tags: ["Profile review", "Portfolio", "Proposal strategy"] },
] as const;
export const process = [
  { title: "Understand", description: "Start with the right questions. Your business, your audience and what the experience needs to achieve." },
  { title: "Explore", description: "Find a distinct direction through structure, visual exploration and a clear creative idea." },
  { title: "Create", description: "Bring design and development together, refining the details with your feedback along the way." },
  { title: "Refine", description: "Test on real screens, polish the interactions and prepare the experience for launch." },
];
