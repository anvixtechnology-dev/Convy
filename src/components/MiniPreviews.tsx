/**
 * Small illustrative product UIs (demo data) used beside journeys,
 * feature cards and the Platform page. All render through PreviewFrame.
 */
import type { ComponentType, SVGProps } from "react";
import {
  CheckCircle2,
  Clock3,
  Database,
  FileInput,
  FileUp,
  GitBranch,
  Hourglass,
  Lock,
  RefreshCw,
  ScrollText,
  Zap,
} from "lucide-react";
import { Avatar, Chip, PreviewFrame, cx } from "./ui/primitives";
import type { ModuleKey } from "../content/types";

type Icon = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;

const Label = ({ children }: { children: string }) => (
  <div className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-subtle">{children}</div>
);

/* Users & roles ------------------------------------------------------ */
export function UsersMini() {
  const people = [
    { i: "AK", n: "Arjun Kumar", e: "arjun@example.com", r: "Admin", w: "All workspaces", tone: 0 },
    { i: "AS", n: "Asha Singh", e: "asha@example.com", r: "Agent", w: "Sales", tone: 1 },
    { i: "RN", n: "Ravi Nair", e: "ravi@example.com", r: "Agent", w: "Sales, Support", tone: 2 },
    { i: "MD", n: "Meera Das", e: "meera@example.com", r: "Marketing", w: "Sales", tone: 3, invited: true },
  ];
  return (
    <PreviewFrame label="Illustrative team member list with roles and workspace access (demo data).">
      <div className="text-[12px]">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="font-medium text-fg">Members</span>
          <span className="text-subtle">4</span>
          <span className="ml-auto rounded-md bg-elevated px-2.5 py-1 text-[11px] text-fg">Invite user</span>
        </div>
        {people.map((p) => (
          <div key={p.n} className="flex h-14 items-center gap-3 border-b border-white/[0.04] px-4 last:border-0">
            <Avatar initials={p.i} tone={p.tone} />
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate font-medium text-fg">{p.n}</div>
              <div className="truncate text-[11px] text-subtle">{p.e}</div>
            </div>
            <span className="hidden w-28 truncate text-[11px] text-subtle sm:block">{p.w}</span>
            <span className="w-20 text-right text-[11px] text-muted">{p.invited ? "Invited" : p.r}</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

/* Template editor ---------------------------------------------------- */
export function TemplateMini() {
  return (
    <PreviewFrame label="Illustrative template editor with variables, preview and Meta approval status (demo data).">
      <div className="grid text-[12px] sm:grid-cols-[1.1fr_1fr]">
        <div className="space-y-3 border-b border-line p-4 sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate font-mono text-[12px] text-fg">order_update</span>
            <Chip tone="teal"><CheckCircle2 className="size-3" /> Approved</Chip>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <Field k="Category" v="Utility" />
            <Field k="Language" v="English" />
          </div>
          <div>
            <Label>Body</Label>
            <div className="rounded-md border border-line bg-page/50 p-2.5 leading-relaxed text-muted">
              Hi <Var>{"{{1}}"}</Var>, your order <Var>{"{{2}}"}</Var> is on its way and should arrive by <Var>{"{{3}}"}</Var>.
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-subtle">
            <RefreshCw className="size-3" /> Synced with Meta
          </div>
        </div>
        <div className="bg-dots flex items-center justify-center bg-page/60 p-5">
          <div className="w-full max-w-[220px] rounded-xl rounded-tl-sm border border-line bg-card p-3 leading-snug text-fg">
            Hi Priya, your order #4821 is on its way and should arrive by Friday.
            <div className="mt-1 text-right text-[10px] text-subtle">Preview</div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
const Var = ({ children }: { children: string }) => (
  <span className="rounded bg-accent-soft px-1 font-mono text-[11px] text-accent">{children}</span>
);
const Field = ({ k, v }: { k: string; v: string }) => (
  <div className="rounded-md border border-line px-2 py-1.5">
    <div className="text-[10px] text-subtle">{k}</div>
    <div className="font-medium text-fg">{v}</div>
  </div>
);

/* Campaign audience -------------------------------------------------- */
export function CampaignMini() {
  return (
    <PreviewFrame label="Illustrative campaign audience review: import, field mapping, eligibility and cost estimate (demo data).">
      <div className="text-[12px]">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="font-medium text-fg">Weekend offer</span>
          <Chip tone="outline">Draft</Chip>
          <span className="ml-auto hidden gap-3 text-[11px] text-subtle sm:flex">
            <span>Template</span>
            <span className="font-medium text-fg">Audience</span>
            <span>Review</span>
          </span>
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-center gap-2 rounded-md border border-line px-3 py-2">
            <FileUp className="size-3.5 text-subtle" />
            <span className="truncate font-medium text-fg">customers_october.xlsx</span>
            <span className="ml-auto shrink-0 text-subtle">1,248 rows · 6 errors</span>
          </div>
          <div>
            <Label>Map audience fields</Label>
            <div className="divide-y divide-line-soft rounded-md border border-line">
              {[
                ["phone", "WhatsApp number"],
                ["first_name", "{{1}}"],
                ["order_id", "{{2}}"],
              ].map(([a, b]) => (
                <div key={a} className="flex items-center gap-2 px-3 py-1.5">
                  <span className="font-mono text-[11px] text-muted">{a}</span>
                  <span className="text-subtle">→</span>
                  <span className="text-fg">{b}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1.5 flex justify-between text-[10px] font-medium uppercase tracking-wider text-subtle">
              <span>Eligibility</span>
              <span>Est. cost shown before launch</span>
            </div>
            <div className="flex h-1.5 overflow-hidden rounded-full bg-elevated">
              <span className="w-[89%] bg-accent" />
              <span className="w-[7%] bg-[#c9a95e]" />
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-subtle">
              <span>Eligible 1,112</span>
              <span>Needs review 87</span>
              <span>Excluded 49</span>
            </div>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}

/* AI summary --------------------------------------------------------- */
export function AISummaryMini({ detailed = false }: { detailed?: boolean }) {
  return (
    <PreviewFrame
      chrome={false}
      label="Illustrative AI chat summary for agent review: summary, intent, sentiment and labels (demo data)."
    >
      <div className="text-[12px]">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <ScrollText className="size-3.5 text-muted" strokeWidth={1.5} />
          <span className="font-medium text-fg">Conversation summary</span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-md border border-line px-2 py-1 text-[11px] text-muted">
            <RefreshCw className="size-3" /> Fresh analysis
          </span>
        </div>
        <div className="space-y-3.5 p-4">
          <p className="text-[13px] leading-relaxed text-fg">
            Customer wants a site visit this Saturday at 11 am and has confirmed the time. Visit details still need confirmation by the team.
          </p>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
            <Fact k="Intent" v="Book site visit" />
            <Fact k="Sentiment" v={<span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-accent-2" />Positive</span>} />
            <Fact k="Labels" v={<span className="flex flex-wrap gap-1"><Chip>Site visit</Chip><Chip>Follow-up</Chip></span>} />
            <Fact k="Analysed" v="2 min ago" />
          </dl>
          {detailed && (
            <div>
              <Label>Extracted details</Label>
              <div className="divide-y divide-line-soft rounded-lg border border-line">
                {[
                  ["Preferred day", "Saturday"],
                  ["Preferred time", "11 am"],
                ].map(([a, b]) => (
                  <div key={a} className="flex justify-between px-3 py-1.5">
                    <span className="text-subtle">{a}</span>
                    <span className="font-medium text-fg">{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center gap-1.5 rounded-md bg-elevated/60 px-2.5 py-2 text-[11px] text-subtle">
            <Lock className="size-3" /> For agents · review before replying
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
const Fact = ({ k, v }: { k: string; v: React.ReactNode }) => (
  <div className="bg-card px-3 py-2">
    <dt className="text-[11px] text-subtle">{k}</dt>
    <dd className="mt-0.5 font-medium text-fg">{v}</dd>
  </div>
);

/* Workflow ----------------------------------------------------------- */
const flowNodes: Array<{ icon: Icon; type: string; title: string; selected?: boolean }> = [
  { icon: Zap, type: "Trigger", title: "Inbound message" },
  { icon: GitBranch, type: "Condition", title: "Asks for a service booking" },
  { icon: FileInput, type: "Flow", title: "Send “Service details” Flow" },
  { icon: Hourglass, type: "Wait for response", title: "Flow submission received" },
  { icon: Database, type: "CRM action", title: "Configured HTTPS connection", selected: true },
];

export function WorkflowMini() {
  return (
    <PreviewFrame label="Illustrative workflow: Trigger, Condition, Flow, Wait for response, CRM action (demo data)." bodyClassName="bg-dots bg-page/60">
      <div className="flex items-center gap-2 border-b border-line bg-card px-4 py-2.5 text-[12px]">
        <span className="font-medium text-fg">Service details</span>
        <Chip tone="outline">Draft · v2</Chip>
        <span className="ml-auto inline-flex items-center gap-1 text-[11px] text-accent"><CheckCircle2 className="size-3" /> Valid</span>
      </div>
      <ol className="mx-auto flex max-w-[340px] flex-col px-4 py-6 text-[12px]">
        {flowNodes.map((n, i) => (
          <li key={n.type} className="flex flex-col items-center">
            <div className={cx("flex w-full items-center gap-3 rounded-lg border bg-card px-3 py-2", n.selected ? "border-accent/60" : "border-line")}>
              <span className={cx("grid size-7 shrink-0 place-items-center rounded-md", n.selected ? "bg-accent text-on-accent" : "bg-elevated text-accent")}>
                <n.icon className="size-3.5" strokeWidth={1.5} />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[10px] font-medium uppercase tracking-wider text-subtle">{n.type}</span>
                <span className="block truncate font-medium text-fg">{n.title}</span>
              </span>
            </div>
            {i < flowNodes.length - 1 && <span className="h-4 w-px bg-line" />}
          </li>
        ))}
      </ol>
    </PreviewFrame>
  );
}

/* Shared inbox (compact list) --------------------------------------- */
export function InboxMini() {
  const rows = [
    { n: "Priya Sharma", s: "Open", t: "Reply in 12m", o: "AK", d: "Read" },
    { n: "Rohan Mehta", s: "New", t: "Waiting 4m", o: null, d: "Delivered" },
    { n: "Fatima Khan", s: "Open", t: "Reply in 38m", o: "AS", d: "Read" },
    { n: "Daniel Joseph", s: "Resolved", t: "Closed", o: "AK", d: "Sent" },
  ];
  const tone = { Open: "teal", New: "outline", Resolved: "neutral" } as const;
  return (
    <PreviewFrame label="Illustrative shared inbox with status, owners, response timers and message status (demo data).">
      <div className="text-[12px]">
        <div className="grid grid-cols-[1.4fr_0.8fr_1fr_0.6fr] gap-3 border-b border-line bg-surface px-4 py-2 text-[10px] font-medium uppercase tracking-wider text-subtle">
          <span>Customer</span>
          <span>Status</span>
          <span>Timer</span>
          <span className="text-right">Owner</span>
        </div>
        {rows.map((r) => (
          <div key={r.n} className="grid grid-cols-[1.4fr_0.8fr_1fr_0.6fr] items-center gap-3 border-b border-line-soft px-4 py-2.5 last:border-0">
            <span className="min-w-0">
              <span className="block truncate font-medium text-fg">{r.n}</span>
              <span className="block text-[10px] text-subtle">{r.d}</span>
            </span>
            <span><Chip tone={tone[r.s as keyof typeof tone]}>{r.s}</Chip></span>
            <span className="inline-flex items-center gap-1 truncate text-subtle"><Clock3 className="size-3 shrink-0" />{r.t}</span>
            <span className="flex justify-end">{r.o ? <Avatar initials={r.o} tone={r.o === "AK" ? 0 : 1} size="sm" /> : <span className="text-subtle">—</span>}</span>
          </div>
        ))}
      </div>
    </PreviewFrame>
  );
}

export const miniPreviewFor: Partial<Record<ModuleKey, () => React.ReactNode>> = {
  inbox: () => <InboxMini />,
  templates: () => <TemplateMini />,
  campaigns: () => <CampaignMini />,
  ai: () => <AISummaryMini />,
  workflows: () => <WorkflowMini />,
};
