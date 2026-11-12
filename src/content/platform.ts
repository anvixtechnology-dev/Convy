/**
 * CONVY — Platform page content.
 *
 * Source of truth: "CONVY — PLATFORM PAGE · Complete Website Content".
 * Copy here is verbatim from that document. Do not reword it in components;
 * edit it here only when the approved content changes.
 */

export const hero = {
  eyebrow: "The CONVY Platform",
  titleLead: "Every customer conversation.",
  titleAccent: "One connected workspace.",
  lead: "Bring your WhatsApp conversations, team collaboration, customer outreach, and supported automation workflows together in one place.",
  body: "CONVY gives your business a shared workspace to manage enquiries, coordinate teams, prepare campaigns, and understand customer conversations.",
  primaryCta: "Explore the Platform",
  secondaryCta: "Request a Walkthrough",
  highlights: [
    "Official WhatsApp Business API",
    "Shared Team Inbox",
    "Controlled Campaigns",
    "Workflow Automation",
  ],
};

export const intro = {
  eyebrow: "One platform. Connected operations.",
  title: "Your communication is connected. Your team should be too.",
  paragraphs: [
    "Customer conversations often involve different people, responsibilities, and follow-up activities.",
    "CONVY brings these activities into a shared workspace, helping your business maintain visibility and coordination throughout the customer communication process.",
  ],
  closing:
    "From the first enquiry to the next business action, your team can work with shared context instead of scattered conversations.",
  benefits: [
    { title: "One shared workspace", body: "Bring customer conversations and team activities together." },
    { title: "Clear ownership", body: "Assign conversations, manage responsibilities, and collaborate using internal notes and mentions." },
    { title: "Controlled outreach", body: "Prepare approved WhatsApp templates, organize audiences, and follow campaign delivery." },
    { title: "Connected workflows", body: "Build supported workflows using conditions, delays, event waits, WhatsApp Flows, and configured CRM actions." },
  ],
};

export const process = {
  eyebrow: "From message to next step",
  title: "A connected process for customer communication.",
  description: "CONVY helps your team organize customer interactions through four essential stages.",
  steps: [
    {
      number: "01",
      name: "Connect",
      tagline: "Bring customer communication together.",
      body: "Connect your business through the official WhatsApp Business API and bring customer messages and approved campaigns into the same workspace.",
    },
    {
      number: "02",
      name: "Collaborate",
      tagline: "Give every conversation clear ownership.",
      body: "Assign conversations to team members, add private notes, mention colleagues, and keep your team aligned on customer requirements.",
    },
    {
      number: "03",
      name: "Guide",
      tagline: "Create a structured customer journey.",
      body: "Use supported workflow steps, conditions, delays, event waits, WhatsApp Flows, and configured CRM connections to organize repeatable customer processes.",
    },
    {
      number: "04",
      name: "Understand",
      tagline: "Get the context behind conversations.",
      body: "Follow campaign delivery and recipient outcomes. When AI is enabled, conversation summaries and operational insights help agents understand customer interactions before responding.",
    },
  ],
};

export type ModuleId =
  | "inbox"
  | "templates"
  | "campaigns"
  | "users"
  | "ai"
  | "flows"
  | "catalogs"
  | "wallet"
  | "workflows";

/**
 * `availability` drives the qualifier shown next to a module.
 * It mirrors Section 12 (Feature Availability Note) — it does not add claims.
 */
export type Availability = "standard" | "ai-enabled" | "preview" | "configured";

export const workspace = {
  eyebrow: "Inside the CONVY platform",
  title: "Everything your team needs to stay connected.",
  description:
    "CONVY brings together the tools businesses use to manage customer communication and coordinate everyday work.",
  modules: {
    inbox: {
      name: "Shared Inbox",
      body: "Manage customer conversations through one shared inbox with assignments, private notes, @mentions, response timers, and conversation status tracking.",
      availability: "standard",
    },
    templates: {
      name: "Template Studio",
      body: "Create, edit, preview, and synchronize WhatsApp templates with Meta. Personalize supported variables and monitor approval status.",
      availability: "standard",
    },
    campaigns: {
      name: "Campaign Management",
      body: "Import customer lists, map audience fields, review recipient eligibility, preview campaigns, and track delivery outcomes.",
      availability: "standard",
    },
    users: {
      name: "Users & Roles",
      body: "Invite team members, assign roles, and manage access to your organization and workspaces.",
      availability: "standard",
    },
    ai: {
      name: "AI Chat Summaries",
      body: "Help agents understand long customer conversations through AI-generated summaries and operational labels when the AI service is enabled.",
      availability: "ai-enabled",
    },
    flows: {
      name: "WhatsApp Flows",
      body: "Create and manage WhatsApp Flow JSON, validate configurations, preview flows, publish versions, and review customer submissions.",
      availability: "preview",
    },
    catalogs: {
      name: "Product Catalogs",
      body: "Organize product catalogs and items, synchronize catalog data with Meta, and inspect synchronization history.",
      availability: "preview",
    },
    wallet: {
      name: "Messaging Wallet",
      body: "View wallet balances, reserved funds, transaction history, usage, and cost estimates. Top-ups depend on payment availability.",
      availability: "preview",
    },
    workflows: {
      name: "Workflow Automation",
      body: "Design and manage visual workflows with supported triggers, conditions, delays, event waits, WhatsApp Flow actions, and configured CRM connections.",
      availability: "configured",
    },
  } satisfies Record<ModuleId, { name: string; body: string; availability: Availability }>,
};

export const teams = {
  eyebrow: "Built for team collaboration",
  title: "One business. One shared customer experience.",
  lead: "Your customers see one business. Your team should work like one.",
  body: "CONVY gives your sales, support, marketing, and operations teams a shared environment to manage customer conversations.",
  groups: [
    { name: "Sales", body: "Keep enquiries, customer context, and follow-ups organized." },
    { name: "Support", body: "Manage incoming questions, assignments, and responses." },
    { name: "Marketing", body: "Prepare approved templates and organize controlled campaigns." },
    { name: "Operations", body: "Coordinate customer processes through supported workflows and configured connections." },
  ],
};

export const automation = {
  eyebrow: "From enquiry to follow-through",
  title: "Give repeatable customer work a clear path.",
  paragraphs: [
    "Every customer interaction may require a different next step. CONVY helps businesses structure supported processes through a visual workflow builder.",
    "Create workflow drafts, validate configurations, publish versions, and organize customer processes using available workflow actions.",
  ],
  elementsLabel: "Supported workflow elements:",
  elements: [
    "Triggers",
    "Conditions",
    "Delays",
    "Event waits",
    "WhatsApp Flows",
    "Configured CRM actions through HTTPS connections",
  ],
  journeyLabel: "Example journey:",
  journey: ["Trigger", "Condition", "WhatsApp Flow", "Wait for response", "CRM action"],
  note: "Workflow execution depends on configured triggers, connections, and supported actions.",
};

export const ai = {
  eyebrow: "AI · When enabled",
  title: "Understand the conversation before the next reply.",
  paragraphs: [
    "Long customer conversations can make handovers difficult.",
    "CONVY AI Chat Summaries help agents understand previous interactions by presenting conversation summaries and available operational context.",
  ],
  capabilitiesLabel: "Capabilities when enabled:",
  capabilities: [
    "Conversation summaries.",
    "Operational labels.",
    "Customer intent.",
    "Sentiment analysis when returned by analysis.",
    "Extracted customer details when available.",
    "Option to request fresh analysis.",
  ],
  responsibility:
    "AI helps agents understand the conversation. Agents remain responsible for reviewing insights and writing customer responses.",
};

export const industries = {
  eyebrow: "One platform. Different business needs.",
  title: "A shared workspace for growing teams.",
  description: "CONVY supports businesses whose customers already enquire, buy, or request assistance through WhatsApp.",
  items: [
    {
      id: "real-estate",
      name: "Real Estate",
      body: "Keep property enquiries, site-visit conversations, and sales follow-ups together.",
      journey: ["Enquiry", "Conversation", "Site Visit"],
    },
    {
      id: "retail",
      name: "Retail & Commerce",
      body: "Handle product questions and order conversations, then reach customers with relevant campaigns.",
      journey: ["Discovery", "Product Question", "Purchase Support"],
    },
    {
      id: "appointments",
      name: "Appointments & Services",
      body: "Coordinate booking enquiries and capture structured details through WhatsApp Flows.",
      journey: ["Enquiry", "Details", "Booking"],
    },
    {
      id: "education",
      name: "Education",
      body: "Help admissions teams respond to enquiries and share approved programme updates.",
      journey: ["Interest", "Counselling", "Admissions Follow-up"],
    },
    {
      id: "agencies",
      name: "Agencies & Multi-brand Teams",
      body: "Organize client operations in separate workspaces with controlled team access.",
      journey: ["Separate Workspaces", "Shared Operational Clarity"],
    },
  ],
};

export const foundations = {
  eyebrow: "Control your customer workspace",
  title: "Built around the foundations businesses need.",
  description: "CONVY combines official business connectivity, workspace access controls, and operational visibility.",
  items: [
    {
      name: "Official Business Connection",
      body: "Connect through Meta's WhatsApp Business API and Embedded Signup. Campaigns use approved templates and eligibility checks.",
    },
    {
      name: "Access With Clear Boundaries",
      body: "Organization and workspace scoping, user roles, and permissions help control who can access customer work.",
    },
    {
      name: "A Record of Important Actions",
      body: "Audit capabilities and message delivery tracking help teams understand what happened and who took action.",
    },
  ],
};

export const gettingStarted = {
  eyebrow: "Your journey with CONVY",
  title: "A clear path to your first conversation.",
  steps: [
    { number: "01", name: "Set Up Your Workspace", body: "Create your organization and invite the people who work with your customers." },
    { number: "02", name: "Connect WhatsApp", body: "Connect your business through official WhatsApp Embedded Signup." },
    { number: "03", name: "Start the Conversation", body: "Reply from the inbox, assign ownership, and prepare approved templates." },
    {
      number: "04",
      name: "Grow Your Operation",
      body: "Launch a reviewed campaign, configure supported workflows, and enable AI summaries for your team. Explore preview modules as access is enabled.",
    },
  ],
};

export const finalCta = {
  eyebrow: "We connect. We convert.",
  title: "Your next customer conversation deserves a better workspace.",
  lead: "Bring your team together on CONVY. Start with WhatsApp, and grow from there.",
  primaryCta: "Get Started",
  secondaryCta: "Request a Walkthrough",
  support:
    "Your WhatsApp inbox, templates, campaigns, and team in one workspace. Configure supported workflows and enable AI chat summaries as your customer operations grow.",
};

export const availability = {
  ai: "AI summaries require an enabled AI service.",
  workflows: "Workflow execution requires configured triggers, connections, and supported actions.",
  previewModules:
    "WhatsApp Flows, product catalogs, and messaging wallet modules have preview or account-dependent availability.",
  plan: "Feature access depends on the plan and account setup.",
};

export const availabilityNote = [
  availability.ai,
  availability.workflows,
  availability.previewModules,
  availability.plan,
].join(" ");
