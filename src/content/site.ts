/**
 * CONVY — website content (brief: "CONVY – Complete SaaS Website Frontend").
 * Copy is verbatim. Components read from here and never reword it.
 */
import type { ModuleKey } from "./types";

export const brand = {
  name: "CONVY",
  tagline: "WE CONNECT | WE CONVERT",
  positioning: "CUSTOMER CONVERSATIONS. BUSINESS GROWTH.",
};

export const nav = [
  { label: "Product", to: "/product" },
  { label: "Platform", to: "/platform" },
  { label: "Solutions", to: "/solutions" },
  { label: "Security", to: "/security" },
  { label: "Pricing", to: "/pricing" },
  { label: "FAQ", to: "/faq" },
];

/* ---------------- 01 Hero ---------------- */
export const hero = {
  eyebrow: "CUSTOMER CONVERSATIONS. BUSINESS GROWTH.",
  titleLine1: "Your WhatsApp.",
  titleLine2: "One connected team.",
  description:
    "Turn WhatsApp enquiries into coordinated customer work. Bring your inbox, team, templates, and campaigns together—with supported workflows and AI chat summaries when enabled.",
  primaryCta: "Open Convy",
  secondaryCta: "Explore the platform",
  highlights: ["Official WhatsApp Business API", "Shared team inbox", "Controlled campaigns"],
  demoPrompt: "Want a guided look?",
  demoLink: "Book a demo.",
  previewLabel: "Illustrative preview · demo data.",
};

/* ---------------- 02 Benefits ---------------- */
export const benefits = {
  eyebrow: "LESS SCATTERED. MORE CONNECTED.",
  titleLine1: "Your customers see one business.",
  titleLine2: "Your team should work like one.",
  items: [
    {
      title: "Keep conversations together.",
      body: "Move customer work off scattered personal phones and into a shared business inbox.",
    },
    {
      title: "Make ownership visible.",
      body: "Know who is handling each customer, with assignments, notes, and response timers.",
    },
    {
      title: "Give outreach a clear process.",
      body: "Prepare approved messages, check the audience, and follow delivery from one campaign workspace.",
    },
  ],
};

/* ---------------- 03 Process ---------------- */
export const process = {
  eyebrow: "FROM MESSAGE TO NEXT STEP",
  title: "Customer work, connected.",
  description: "Give your team a shared way to engage, respond, and follow through.",
  steps: [
    { number: "01", name: "Connect", body: "Bring customer messages and approved campaigns into the same workspace." },
    { number: "02", name: "Collaborate", body: "Assign ownership, leave notes, and keep your team aligned on every conversation." },
    {
      number: "03",
      name: "Guide",
      body: "Build supported workflows with conditions, delays, event waits, WhatsApp Flows, and configured CRM actions.",
    },
    {
      number: "04",
      name: "Understand",
      body: "Follow campaign delivery and recipient outcomes. Enable AI summaries to help agents understand the conversation.",
    },
  ],
};

/* ---------------- 04 Product workspace ---------------- */
export const workspace = {
  eyebrow: "THE CONVY WORKSPACE",
  titleLine1: "More than messages.",
  titleLine2: "A connected way to work.",
  description:
    "Reply as a team, prepare approved templates, run campaigns, and build supported workflows. Add AI conversation context when enabled.",
  availabilityNote:
    "Choose the capabilities your operation needs. AI summaries require an enabled AI service. Workflow execution requires configured triggers, connections, and supported actions. Preview modules depend on your plan and account setup. Broader analytics and leadership dashboards remain on the roadmap.",
};

export type Feature = {
  key: ModuleKey;
  number: string;
  nav: string; // product navigation label
  status?: string;
  title: string;
  description: string;
  features: string[];
};

export const features: Feature[] = [
  {
    key: "inbox",
    number: "01",
    nav: "Shared inbox",
    title: "A shared inbox. Clear ownership.",
    description:
      "Handle enquiries and support requests together, with clear ownership and context for the next response.",
    features: [
      "Search and filter by ownership, unread state, and conversation status.",
      "Track sent, delivered, and read message updates.",
      "Hand over full history or visibility from assignment onward.",
      "Private notes, @mentions, response timers, resolve, and archive.",
    ],
  },
  {
    key: "templates",
    number: "02",
    nav: "Template studio",
    title: "Prepare once. Personalize for the customer.",
    description:
      "Create reusable WhatsApp messages for updates and outreach, then send approved templates from the inbox or campaigns.",
    features: [
      "Create, edit, preview, and sync with Meta.",
      "Set category, language, supported message sections, and buttons.",
      "Personalize supported variables and add media headers.",
      "Follow approval status before sending.",
    ],
  },
  {
    key: "campaigns",
    number: "03",
    nav: "Campaigns",
    title: "Turn your customer list into a controlled campaign.",
    description:
      "Prepare your audience, personalize an approved template, review eligibility, and follow recipient outcomes.",
    features: [
      "CSV / Excel import with row-error review.",
      "Map audience fields to template variables.",
      "Review eligibility, recipient previews, and cost estimates.",
      "Launch, pause, resume, cancel, and track delivery.",
    ],
  },
  {
    key: "users",
    number: "04",
    nav: "Users & roles",
    title: "The right access for every role.",
    description: "Bring your team into a workspace that belongs to your business.",
    features: [
      "Invite users and assign roles.",
      "Control access with role permissions.",
      "Manage workspaces and plan-based limits.",
    ],
  },
  {
    key: "ai",
    number: "05",
    nav: "AI chat summaries",
    status: "AI · WHEN ENABLED",
    title: "Understand the chat before the next reply.",
    description:
      "AI summaries help agents get context without reading every message again. Available when AI is enabled for your environment.",
    features: [
      "Conversation summaries and operational labels.",
      "Intent, sentiment, and extracted details when returned by analysis.",
      "Request a fresh analysis when enabled.",
      "Agents review insights and write the customer response.",
    ],
  },
  {
    key: "flows",
    number: "06",
    nav: "WhatsApp Flows",
    status: "PREVIEW",
    title: "Collect details inside WhatsApp.",
    description: "Use WhatsApp Flows for structured customer forms and responses.",
    features: [
      "Author Flow JSON, validate, preview, and publish.",
      "Manage Flow versions and configurations.",
      "Review sessions and submitted details.",
    ],
  },
  {
    key: "catalogs",
    number: "07",
    nav: "Product catalogs",
    status: "PREVIEW",
    title: "Keep product details organised.",
    description: "Manage product catalogs and their connection to Meta.",
    features: [
      "Create catalogs and manage product items.",
      "Synchronize catalog data with Meta.",
      "Inspect sync history and retry failed items.",
    ],
  },
  {
    key: "wallet",
    number: "08",
    nav: "Messaging wallet",
    status: "PREVIEW",
    title: "Know where messaging spend goes.",
    description: "See your messaging wallet and usage alongside your subscription.",
    features: [
      "Balance, reserved funds, and transaction history.",
      "Usage, subscription details, and cost estimates.",
      "Wallet top-ups where payments are enabled.",
    ],
  },
  {
    key: "workflows",
    number: "09",
    nav: "Workflow automation",
    status: "CONFIGURED WORKFLOWS",
    title: "Give repeatable customer work a clear path.",
    description: "Design visual, event-driven workflows with supported steps and configured connections.",
    features: [
      "Create drafts, validate, publish, and manage versions.",
      "Branch on conditions, add delays, and wait for events.",
      "Send WhatsApp Flows and continue from submitted responses.",
      "Call supported CRM actions through configured HTTPS connections.",
    ],
  },
];

/* ---------------- 05 Customer journeys ---------------- */
export const journeys = {
  eyebrow: "FROM ENQUIRY TO FOLLOW-THROUGH",
  title: "What does connected work look like?",
  description:
    "Four ways to keep communication consistent, customer context visible, and the next step clear.",
  items: [
    {
      key: "templates" as ModuleKey,
      number: "01",
      label: "TEMPLATES",
      title: "A consistent message. A personal conversation.",
      body: "An order update and a new offer need different messages. Prepare templates with the right category and language, preview the content, and track Meta approval. Personalize supported variables when you send, so a reusable message still carries the customer's details.",
      process: ["Prepare", "Preview", "Meta approval", "Personalize", "Send"],
      link: "Explore templates",
    },
    {
      key: "campaigns" as ModuleKey,
      number: "02",
      label: "CAMPAIGNS",
      title: "Reach an audience with a process you can follow.",
      body: "Choose an approved template, import your customer list, and map audience fields to message variables. Review import errors, eligibility, recipient previews, and cost estimates before launch. Then monitor delivery and recipient outcomes, with controls to pause, resume, or cancel.",
      process: ["Import", "Map", "Check", "Preview", "Launch", "Track"],
      link: "Explore campaigns",
    },
    {
      key: "ai" as ModuleKey,
      number: "03",
      label: "AI CHAT SUMMARIES",
      title: "Help the next agent get up to speed.",
      body: "A long conversation should not make a handover harder. When enabled, AI analysis provides a summary and operational context alongside the chat. Agents review available insights and can request a fresh analysis. Your team makes the decision and writes the customer response.",
      process: ["Conversation", "Analysis", "Summary", "Agent review"],
      link: "Explore AI chat summaries",
    },
    {
      key: "workflows" as ModuleKey,
      number: "04",
      label: "WORKFLOW AUTOMATION",
      title: "Connect an event to the next useful action.",
      body: "Design a visual journey, validate it, and publish a version. Supported steps let you check conditions, add delays, wait for events, send a WhatsApp Flow, or call a configured CRM connection. Start with a focused process such as collecting service details and continuing after a form submission.",
      process: ["Trigger", "Condition", "Flow", "Wait for response", "CRM action"],
      link: "Explore workflow automation",
    },
  ],
};

/* ---------------- 06 Industries ---------------- */
export const industries = {
  eyebrow: "BUILT AROUND YOUR BUSINESS",
  titleLine1: "Different industries.",
  titleLine2: "The same need to connect.",
  description:
    "For growing businesses whose customers already enquire, buy, or ask for help on WhatsApp. Example uses below illustrate how teams can organise their work.",
  items: [
    {
      id: "real-estate",
      name: "Real Estate",
      body: "Keep property enquiries, site-visit conversations, and sales follow-ups together.",
      path: "Enquiry → conversation → site visit",
    },
    {
      id: "retail",
      name: "Retail & commerce",
      body: "Handle product questions and order conversations, then reach customers with relevant campaigns.",
      path: "Discovery → product question → purchase support",
    },
    {
      id: "appointments",
      name: "Appointments & services",
      body: "Coordinate booking enquiries and capture structured details through Flows in preview.",
      path: "Enquiry → details → booking",
    },
    {
      id: "education",
      name: "Education",
      body: "Help admissions teams respond to enquiries and share approved programme updates.",
      path: "Interest → counselling → admissions follow-up",
    },
    {
      id: "agencies",
      name: "Agencies & multi-brand teams",
      body: "Organise client work in separate workspaces with controlled team access.",
      path: "Separate workspaces. Shared operational clarity.",
    },
  ],
};

/* ---------------- 07 Getting started ---------------- */
export const gettingStarted = {
  eyebrow: "GETTING STARTED",
  title: "A clear path to your first conversation.",
  steps: [
    { number: "01", name: "Set up your workspace.", body: "Create your organisation and invite the people who work with your customers." },
    { number: "02", name: "Connect WhatsApp.", body: "Connect your business through official WhatsApp Embedded Signup." },
    { number: "03", name: "Start the conversation.", body: "Reply from the inbox, assign ownership, and prepare approved templates." },
    {
      number: "04",
      name: "Grow your operation.",
      body: "Launch a reviewed campaign, configure supported workflows, and enable AI summaries for your team. Explore preview modules as access is enabled.",
    },
  ],
};

/* ---------------- 08 Security ---------------- */
export const security = {
  eyebrow: "BUILT ON BUSINESS FOUNDATIONS",
  title: "Control your customer workspace.",
  description: "Clear access, official connectivity, and operational visibility.",
  items: [
    {
      name: "Official business connection",
      body: "Connect through Meta's WhatsApp Business API and Embedded Signup. Campaigns use approved templates and eligibility checks.",
    },
    {
      name: "Access with clear boundaries",
      body: "Organisation and workspace scoping, user roles, and permissions help control who can access customer work.",
    },
    {
      name: "A record of important actions",
      body: "Audit capabilities and message delivery tracking help teams understand what happened and who took action.",
    },
  ],
  note: "Convy does not currently claim third-party security certifications.",
};

/* ---------------- 11 Final CTA ---------------- */
export const finalCta = {
  eyebrow: "WE CONNECT. WE CONVERT.",
  title: "Your next customer conversation deserves a better workspace.",
  description: "Bring your team together on Convy. Start with WhatsApp, and grow from there.",
  support:
    "Your WhatsApp inbox, templates, campaigns, and team in one workspace. Configure supported workflows and enable AI chat summaries as your customer operations grow.",
  primaryCta: "Open Convy",
  secondaryCta: "Book a demo",
};

/* ---------------- Footer ---------------- */
export const footer = {
  description:
    "Your WhatsApp inbox, templates, campaigns, and team in one workspace. Configure supported workflows and enable AI chat summaries as your customer operations grow.",
  copyright: "© 2026 Convy Technologies. All rights reserved.",
};
