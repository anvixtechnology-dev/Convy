export type ModuleKey =
  | "inbox"
  | "templates"
  | "campaigns"
  | "users"
  | "ai"
  | "flows"
  | "catalogs"
  | "wallet"
  | "workflows";

/** Anchor ids on the Product page, one per module. */
export const moduleAnchor: Record<ModuleKey, string> = {
  inbox: "inbox",
  templates: "templates",
  campaigns: "campaigns",
  users: "users-roles",
  ai: "ai-chat-summaries",
  flows: "whatsapp-flows",
  catalogs: "catalogs",
  wallet: "messaging-wallet",
  workflows: "workflow-automation",
};
