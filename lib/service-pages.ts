import type { ServiceCategory } from "./content";

export type ServicePage = {
  slug: string;
  title: string;
  category: Exclude<ServiceCategory, "All services">;
  icon: string;
  description: string;
  headline: string;
  introduction: string;
  keywords: string[];
  deliverables: { title: string; description: string }[];
  useCases: string[];
  approach: string;
  faqs: { question: string; answer: string }[];
  related: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "website-development", title: "Website & Webflow development", category: "Development", icon: "web",
    description: "Custom website design and Webflow development for businesses that need a distinctive, responsive website with clear content and simple inquiries.",
    headline: "A better first impression. A clearer next step.",
    introduction: "Your website should help the right people understand your business and act with confidence. We bring strategy, interface design and development together to create fast, accessible marketing websites. From a focused landing page to a Webflow CMS website, every page has a purpose and every interaction supports it.",
    keywords: ["website development services", "Webflow development", "responsive website design", "business website design"],
    deliverables: [
      { title: "Structure before screens", description: "A practical sitemap, audience journeys and content hierarchy that make your services easy to find. We agree on the main action for each page before choosing layouts." },
      { title: "A design that feels like you", description: "Responsive interfaces, considered typography and reusable sections built around your identity. Motion adds character while keeping navigation and reading comfortable." },
      { title: "A website your team can use", description: "Webflow CMS collections or a suitable custom stack, inquiry forms, metadata and a handover covering everyday updates. Scope includes the content types your team actually needs." },
      { title: "Careful launch preparation", description: "Keyboard checks, phone layouts, internal links and form states reviewed before release. We address unnecessary image weight and provide a clear list of launch requirements." },
    ],
    useCases: ["A service business replacing an outdated website", "A new brand introducing its first offer", "A content team that needs editable case studies", "A campaign that needs one focused landing page"],
    approach: "We begin with your current pages, audience and strongest offer. A shared page outline becomes a visual direction, then a working site. You review real content on real screens before launch, with clear ownership of the domain, hosting and CMS.",
    faqs: [
      { question: "Should we use Webflow or a custom website?", answer: "Webflow can suit editable marketing sites. A custom application is a better discussion when your site needs complex business rules, authenticated workflows or integrations. We recommend the approach after reviewing your requirements." },
      { question: "Can you redesign without losing existing URLs?", answer: "We inventory useful existing pages and plan redirects for changed addresses. Search performance still depends on the broader site and content, so migration decisions are made page by page." },
      { question: "Can we edit the content after launch?", answer: "Yes, where a CMS is part of the agreed scope. We define editable fields, permissions and a handover so routine changes do not require a redesign." },
    ], related: ["web-application-development", "seo-growth-services", "graphic-design-branding"],
  },
  {
    slug: "web-application-development", title: "Custom web applications", category: "Development", icon: "app",
    description: "Full-stack web application development with React, Next.js, MERN and Supabase for dashboards, customer portals and business tools.",
    headline: "Your workflow. Built into a better product.",
    introduction: "Spreadsheets and disconnected tools only take a growing operation so far. We design and build custom web applications around the work your users need to complete. Frontend interfaces, backend services and connected data come together as one product, with an agreed first release and a practical path for improvement.",
    keywords: ["custom web application development", "full-stack development", "MERN stack development", "Supabase development"],
    deliverables: [
      { title: "Product definition", description: "User roles, core screens, data relationships and acceptance criteria. We turn a broad idea into a manageable first version, separating essential workflows from later improvements." },
      { title: "Frontend and backend", description: "Responsive React or Next.js interfaces with backend APIs and validation. MERN is available where MongoDB, Express, React and Node.js fit the project; the stack follows the workload." },
      { title: "Connected data", description: "Database design, role-aware access and integrations. Supabase can support PostgreSQL, authentication and storage when it suits your requirements, with access rules designed alongside the interface." },
      { title: "A maintainable handover", description: "A source code handover, configuration notes and checks for important workflows. We document deployment requirements and agree how fixes, monitoring and later changes will be handled." },
    ],
    useCases: ["Customer and partner portals", "Internal operations dashboards", "Booking and approval workflows", "An MVP for a new software product"],
    approach: "We map one complete user journey first: who enters information, who can see it and what happens next. A small working flow lets your team validate assumptions early. Authentication, access rules and failure states are considered before expanding to the rest of the product.",
    faqs: [
      { question: "Do you work with existing applications?", answer: "Yes. We first review the repository, environment and current behavior. An existing product may need a focused repair or integration rather than a full rebuild." },
      { question: "Is MERN the right stack for every application?", answer: "No. Database needs, hosting, integrations and the team's maintenance capacity guide the choice. We can work with MERN, Next.js and Supabase without forcing every project into the same architecture." },
      { question: "Who owns the code?", answer: "Ownership and delivery are set out in the project agreement. We include a source handover in the proposed scope and identify any third-party licenses or services." },
    ], related: ["ai-automation", "llm-rag-development", "website-development"],
  },
  {
    slug: "shopify-development", title: "Shopify & e-commerce", category: "Development", icon: "shop",
    description: "Shopify store design, redesign, theme customization and e-commerce development focused on clear product journeys and confident shopping.",
    headline: "From a good product to a considered store.",
    introduction: "A strong store makes products easy to explore and the next step easy to understand. We create and refine Shopify experiences with clear collection structures, useful product pages and responsive theme sections. The work starts with your catalog, your customers and the questions that get in the way of a purchase.",
    keywords: ["Shopify store design", "Shopify theme customization", "Shopify redesign", "e-commerce development"],
    deliverables: [
      { title: "Store structure", description: "Collections, navigation and product information organized around how customers shop. We identify the variants, shipping details and purchase questions that need to appear before checkout." },
      { title: "Custom theme sections", description: "Reusable Shopify sections and Liquid customization that support your visual identity. Layouts stay usable across phones, tablets and desktop screens." },
      { title: "Useful integrations", description: "Selected app connections for reviews, inquiries or business workflows where needed. We review overlapping app functions so a simple requirement does not become unnecessary complexity." },
      { title: "Shopping journey review", description: "Checks for product options, cart behavior, contact paths and content consistency. Payment and shipping configuration is reviewed against the merchant's available providers and policies." },
    ],
    useCases: ["A first Shopify store", "A redesign of an existing storefront", "Figma designs that need custom theme sections", "A store with confusing product or collection navigation"],
    approach: "We review your products and current customer journey before designing the home, collection and product templates. Theme work is reviewed in a preview environment, with a launch plan for content, domain settings and existing URLs.",
    faqs: [
      { question: "Can you customize our current Shopify theme?", answer: "Yes, subject to the theme's structure and license. A targeted section or template update is often enough when the existing theme already supports your needs." },
      { question: "Are Shopify and app subscriptions included?", answer: "Platform, theme, domain and app charges are identified separately in the proposal. You can review the ongoing costs before approving the build." },
      { question: "Can you improve conversion?", answer: "We can address unclear information, distracting layouts and friction in the shopping journey. Sales outcomes depend on the offer, traffic, pricing and fulfillment as well as the website." },
    ], related: ["website-development", "graphic-design-branding", "seo-growth-services"],
  },
  {
    slug: "ai-automation", title: "AI & business automation", category: "AI & automation", icon: "automation",
    description: "AI automation services and business workflow integrations for lead handling, support routing, document processing and repetitive operations.",
    headline: "Less repetitive work. More room to move.",
    introduction: "Useful automation starts with a clear process. We connect the tools you already use and introduce AI where interpretation, drafting or classification can help. The result is a workflow with defined inputs, visible outcomes and a route back to a person when the unexpected happens.",
    keywords: ["AI automation services", "business process automation", "workflow automation", "API integration services"],
    deliverables: [
      { title: "A workflow worth automating", description: "A map of the current steps, owners, exceptions and repeated work. We choose a bounded starting point that can be checked against your existing process." },
      { title: "Connected tools", description: "API and webhook integrations between forms, internal tools and business systems. Each connection has agreed data fields, credentials handling and rules for duplicate events." },
      { title: "AI with a clear job", description: "Structured extraction, message classification or draft generation where appropriate. Validation and human review remain available for uncertain results and consequential actions." },
      { title: "Operational visibility", description: "Run history, failure notifications and retry rules appropriate to the workflow. A documented fallback helps your team continue when a connected service is unavailable." },
    ],
    useCases: ["Routing new inquiries to the right person", "Preparing internal summaries from approved documents", "Moving validated records between business systems", "Drafting replies for a team to review"],
    approach: "We record the manual process, choose one trigger and define what a successful run looks like. After testing common and failed inputs, we pilot the workflow with a small scope. Your team receives a clear explanation of ownership, review points and recurring service costs.",
    faqs: [
      { question: "Does every automation need AI?", answer: "No. Deterministic rules often handle straightforward copying, routing and calculations more reliably. AI is considered for the parts that involve unstructured information." },
      { question: "Can you connect our existing tools?", answer: "Where supported APIs, webhooks or approved integrations are available. We review access and limitations before promising a connection." },
      { question: "How do you handle mistakes?", answer: "We agree validation, review and exception rules before launch. Uncertain outputs can be held for a person rather than silently applied to your records." },
    ], related: ["ai-chatbot-development", "llm-rag-development", "web-application-development"],
  },
  {
    slug: "ai-chatbot-development", title: "AI chatbot development", category: "AI & automation", icon: "chat",
    description: "Custom AI chatbot development for website support, lead qualification and internal knowledge, using approved content and clear human handoff.",
    headline: "Helpful conversations. Connected to your business.",
    introduction: "Your customers should not have to search through a whole website for a simple answer. We build AI chatbots that help with a defined set of questions, draw on approved business information and guide people toward the right next step. A useful assistant also knows when to hand the conversation to your team.",
    keywords: ["AI chatbot development", "website chatbot development", "customer support chatbot", "custom AI assistant"],
    deliverables: [
      { title: "Conversation design", description: "A defined audience, top questions and intended outcomes. We write opening messages, clarification steps and handoff paths around real customer needs." },
      { title: "Approved business knowledge", description: "FAQs, service information and policies organized for retrieval. Content owners can review what the assistant uses and identify information that should stay private." },
      { title: "An integrated experience", description: "A responsive website chat interface and agreed connections for inquiries or internal tools. Actions such as creating a record have explicit inputs and server-side checks." },
      { title: "Evaluation before launch", description: "A set of realistic questions, including missing information and ambiguous requests. We review grounded answers, failure messages and escalation behavior before a pilot." },
    ],
    useCases: ["Answering common website questions", "Collecting a qualified project inquiry", "Helping employees find approved internal guidance", "Directing visitors to the right service page"],
    approach: "We begin with real questions and the source material that answers them. A small prototype is tested against a shared question set, then connected to your interface. Any tool access is limited to the actions your business has explicitly agreed.",
    faqs: [
      { question: "Can a chatbot answer from our own documents?", answer: "Yes, with an appropriate retrieval setup and access controls. The bot should explain when the available material does not support an answer." },
      { question: "Will the chatbot replace our support team?", answer: "The scope is to support specific tasks. Escalation remains available for complaints, unusual situations and requests beyond the assistant's approved knowledge or permissions." },
      { question: "Can it be added to an existing website?", answer: "Usually, subject to the site's platform and integration options. We review the current setup and agree the hosting and data flow first." },
    ], related: ["llm-rag-development", "ai-automation", "chatgpt-gemini-services"],
  },
  {
    slug: "llm-rag-development", title: "LLM & RAG development", category: "AI & automation", icon: "database",
    description: "LLM application development and retrieval-augmented generation for business knowledge assistants, document search and grounded AI workflows.",
    headline: "Your knowledge. Within easier reach.",
    introduction: "A general model does not automatically know your latest policies, product information or internal documents. We build LLM applications that retrieve relevant approved material and use it to support an answer. The work covers content preparation, access rules, source references and evaluation, as well as the interface people use every day.",
    keywords: ["LLM development services", "RAG development", "retrieval augmented generation", "AI knowledge base development"],
    deliverables: [
      { title: "Knowledge preparation", description: "A content inventory, document cleanup and a plan for updates. We identify duplicate, outdated and restricted information before it reaches the retrieval index." },
      { title: "Retrieval design", description: "Document chunking, embeddings and search suited to the material. Source metadata and permissions travel with the content so retrieval respects the user's access." },
      { title: "A grounded assistant", description: "Prompts, source references and a clear response when evidence is missing. Live business data is handled through appropriate integrations rather than treated as static document knowledge." },
      { title: "A useful evaluation set", description: "Representative questions and expected supporting material, including unanswerable requests. We examine retrieval relevance separately from answer quality to locate weaknesses." },
    ],
    useCases: ["Internal policy and procedure search", "Product documentation assistants", "Searching a collection of approved reports", "Supporting customer-facing teams with referenced answers"],
    approach: "We start with one audience and one well-defined collection of documents. A small evaluation set helps compare retrieval options before expanding the knowledge base. Model choice, hosting, privacy requirements and ongoing costs are agreed alongside the product scope.",
    faqs: [
      { question: "Is RAG the same as training a new model?", answer: "No. RAG retrieves relevant material at answer time. Fine-tuning changes model behavior through training. They solve different problems and can be considered separately." },
      { question: "Can this run with an open-source model?", answer: "Potentially. Hardware, latency, privacy and answer quality determine whether local or hosted inference fits. We assess those constraints before selecting a model." },
      { question: "Does RAG eliminate incorrect answers?", answer: "No. Retrieval and generation can both fail. Source references, evaluation, access controls and clear fallback behavior help make those limitations visible." },
    ], related: ["ai-chatbot-development", "ai-automation", "web-application-development"],
  },
  {
    slug: "chatgpt-gemini-services", title: "ChatGPT & Gemini access", category: "AI & automation", icon: "spark",
    description: "ChatGPT for PKR 1,000 for one month and Gemini for PKR 900 for 18 months on your own email. Contact Tierop Digital for package details and activation.",
    headline: "Your AI tools. On your own email.",
    introduction: "Get in touch with Tierop Digital for ChatGPT and Gemini access packages on your own email. Choose the package that suits your work, confirm the included plan and availability with our team, and receive guidance on the activation process. The available offers and durations are shown below.",
    keywords: ["ChatGPT Pakistan price", "ChatGPT monthly access", "Gemini 18 month package", "Gemini own email Pakistan"],
    deliverables: [
      { title: "ChatGPT · one month", description: "PKR 1,000 for one month. Contact us to confirm the included ChatGPT plan, features and activation arrangements before placing your order." },
      { title: "Gemini · 18 months", description: "PKR 900 for 18 months on your own email. Our team will confirm the available Gemini plan and activation requirements for your email." },
      { title: "Your email, clearly agreed", description: "We confirm the email to be used, the selected package and its duration before activation. Keep your package confirmation for any follow-up support." },
      { title: "A person to contact", description: "Ask our team about your package through WhatsApp or email. If your business needs a custom assistant or an automated workflow, we can scope that as a separate development project." },
    ],
    useCases: ["Everyday AI assistance for your work", "Writing, brainstorming and learning workflows", "Choosing between the available access packages", "Getting help with package activation"],
    approach: "Select ChatGPT or Gemini, contact our team and confirm the included plan, eligibility, activation method and package terms. ChatGPT is offered for one month at PKR 1,000; Gemini is offered for 18 months at PKR 900. Access is arranged on your own email.",
    faqs: [
      { question: "What is the ChatGPT price and duration?", answer: "The Tierop Digital ChatGPT package is PKR 1,000 for one month. Contact us to confirm the included plan and current availability." },
      { question: "What is the Gemini price and duration?", answer: "The Tierop Digital Gemini package is PKR 900 for 18 months on your own email. Confirm plan details and activation requirements with our team before ordering." },
      { question: "Which features are included?", answer: "The included plan, features, eligibility and activation details are confirmed by Tierop Digital before an order. Ask our team about the usage limits and features included with your selected package." },
      { question: "Is this a custom chatbot development package?", answer: "These are access packages. A website chatbot, API integration or custom business automation has its own agreed project scope and quotation." },
    ], related: ["ai-chatbot-development", "ai-automation", "llm-rag-development"],
  },
  {
    slug: "graphic-design-branding", title: "Graphic design & branding", category: "Creative", icon: "design",
    description: "Brand identity and graphic design services for visual systems, marketing campaigns, social media content and consistent digital communication.",
    headline: "A visual language people can recognize.",
    introduction: "A brand becomes clearer when its visual decisions work together. We create graphic design and identity systems that connect your message, audience and everyday touchpoints. From a focused campaign to a broader visual refresh, the goal is a consistent presence your team can confidently use.",
    keywords: ["graphic design services", "brand identity design", "social media design", "marketing design agency"],
    deliverables: [
      { title: "A considered direction", description: "A brief covering your audience, message and visual references. We agree what the work needs to communicate before developing the creative direction." },
      { title: "A connected identity", description: "Logo development or refinement, color, typography and layout rules within the agreed scope. The system needs to work at small sizes as well as in presentation formats." },
      { title: "Everyday brand assets", description: "Social graphics, campaign layouts and marketing materials adapted to the channels you use. Each format has a clear hierarchy and a readable next step." },
      { title: "Practical delivery", description: "Organized exports, agreed editable files and concise usage guidance. We identify font, photo and other asset licenses so your team understands what it can reuse." },
    ],
    useCases: ["A new business defining its visual identity", "A brand that needs more consistent social content", "A campaign launching a product or service", "A website project that needs supporting graphics"],
    approach: "We start with the message and the places your audience will see it. A shared visual direction guides the first concepts, followed by focused refinement and format adaptation. Delivery includes the agreed files and enough guidance to keep future work consistent.",
    faqs: [
      { question: "Can you work within an existing brand?", answer: "Yes. Share the current guidelines, logo files and examples. We can build campaign assets or improve consistency without replacing the identity." },
      { question: "Do you provide editable source files?", answer: "The proposal lists the editable formats and final exports included. Third-party licenses and any exclusions are agreed before work begins." },
      { question: "Can you design recurring social media content?", answer: "Yes. We can agree a format system and a defined batch of assets, with content, revision rounds and delivery cadence specified in the scope." },
    ], related: ["video-editing-ai-video", "website-development", "shopify-development"],
  },
  {
    slug: "video-editing-ai-video", title: "Video editing & AI video", category: "Creative", icon: "video",
    description: "Video editing, motion graphics and AI video production for brand stories, product demonstrations, social media campaigns and short-form content.",
    headline: "A sharper story. Frame by frame.",
    introduction: "Good video gives the viewer a reason to keep watching and a clear idea to take away. We bring editing, motion design and creative direction together for brand films, product content and social video. AI-generated visuals can support a concept where appropriate, with a consistent story and a careful final edit.",
    keywords: ["video editing services", "AI video production", "motion graphics services", "short-form video editing"],
    deliverables: [
      { title: "A clear creative brief", description: "An agreed audience, message, format and call to action. We review available footage and references so production decisions match the material and the intended channel." },
      { title: "An edit with purpose", description: "Footage selection, pacing, sound and visual continuity. The first cut focuses on the story before polishing transitions and finishing details." },
      { title: "Motion and generated visuals", description: "Titles, captions and motion graphics within scope. AI sequences are developed from approved references and reviewed for product accuracy and continuity before inclusion." },
      { title: "Delivery for the channel", description: "Exports in the agreed aspect ratios with legible text and suitable safe areas. Music, footage and generated material are reviewed for the intended usage requirements." },
    ],
    useCases: ["Product demonstrations and explainers", "Short-form social video and reels", "Brand announcements and campaign edits", "AI-assisted visual concepts and supporting sequences"],
    approach: "We agree a short script or edit outline before assembling the first cut. Feedback is gathered around message, pacing and accuracy, then the finishing pass handles sound, captions and exports. New versions have a defined purpose rather than simply adding more effects.",
    faqs: [
      { question: "Can you edit footage we already have?", answer: "Yes. We first review file quality, coverage and the story you want to tell. Any missing shots or limitations are discussed before the edit scope is agreed." },
      { question: "Can you create AI product videos?", answer: "We can develop AI-assisted sequences from approved references, then review visual consistency and product details. Some shots are better served by real product footage." },
      { question: "Are captions and multiple sizes included?", answer: "They can be included. The proposal specifies caption languages, aspect ratios, video lengths and the number of versions to be delivered." },
    ], related: ["graphic-design-branding", "shopify-development", "seo-growth-services"],
  },
  {
    slug: "seo-growth-services", title: "SEO & digital growth", category: "Growth", icon: "growth",
    description: "Technical SEO, service page content, website optimization and Upwork profile guidance to help people understand and discover your business.",
    headline: "Make your expertise easier to discover.",
    introduction: "Growth begins with a clear offer and a useful destination. We help businesses improve the structure, content and technical foundations of their websites. We also support professionals with Upwork profile and portfolio presentation. Each engagement starts with a defined audience and a realistic way to measure progress.",
    keywords: ["technical SEO services", "on-page SEO services", "SEO content strategy", "Upwork profile optimization"],
    deliverables: [
      { title: "A focused review", description: "An audit of page purpose, crawlability, internal links, metadata and content gaps. Recommendations are prioritized by the problem they solve and the work required." },
      { title: "Useful service content", description: "Pages that explain a specific offer, answer buying questions and link to supporting guides. Keywords follow the audience's language rather than being repeated without purpose." },
      { title: "Technical foundations", description: "Canonical URLs, sitemaps, structured data where appropriate and checks for broken paths. We separate indexability problems from content and relevance problems." },
      { title: "A clearer professional presence", description: "Upwork profile positioning, portfolio structure and proposal guidance where requested. The aim is to communicate relevant capability without inflated claims or copied proposals." },
    ],
    useCases: ["A service website with unclear page targeting", "A growing library of disconnected articles", "A redesign that needs URL and content planning", "A freelancer improving profile and portfolio presentation"],
    approach: "We establish what the website or profile should be found for, review the current material and agree a small set of changes. If analytics access is available, measurement focuses on relevant impressions, visits and qualified inquiries over time. Search positions and project wins are not guaranteed.",
    faqs: [
      { question: "Can you guarantee first place on Google?", answer: "No. Rankings depend on relevance, competition and many signals outside a single website change. We focus on useful content, accessible pages and measurable improvements." },
      { question: "Do more blog posts automatically mean better rankings?", answer: "No. Each article should answer a real question, add useful detail and connect to a relevant offer. A small helpful library can be more valuable than a large repetitive one." },
      { question: "Do you still offer Upwork optimization?", answer: "Yes. Profile, portfolio and proposal guidance remain available within this service, with a specific deliverable agreed before work begins." },
    ], related: ["website-development", "shopify-development", "graphic-design-branding"],
  },
];

export const aiAccessPackages = [
  { name: "ChatGPT", price: 1000, months: 1, duration: "1 month", label: "Your everyday AI companion" },
  { name: "Gemini", price: 900, months: 18, duration: "18 months", label: "More possibilities, on your email" },
] as const;

export function getService(slug: string) { return servicePages.find(service => service.slug === slug); }
