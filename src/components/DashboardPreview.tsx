import {
  AtSign,
  ChevronDown,
  Clock3,
  FileText,
  GitBranch,
  Inbox,
  Megaphone,
  Paperclip,
  Search,
  SendHorizontal,
  SquareStack,
} from "lucide-react";
import { Avatar, Chip, PreviewFrame, cx } from "./ui/primitives";

/** Illustrative CONVY dashboard (hero). All data is demo data. */
const modules = [
  { icon: Inbox, label: "Inbox", active: true, count: "8" },
  { icon: FileText, label: "Templates" },
  { icon: Megaphone, label: "Campaigns" },
  { icon: SquareStack, label: "Flows" },
  { icon: GitBranch, label: "Journeys" },
];

const conversations = [
  { name: "Priya Sharma", text: "That works. Thank you!", time: "now", tone: 0, owner: "AK", active: true, status: "Open" },
  { name: "Rohan Mehta", text: "Is the 2BHK still available?", time: "6m", tone: 1, owner: null, unread: 2, status: "New" },
  { name: "Fatima Khan", text: "Please share the brochure.", time: "21m", tone: 2, owner: "AS", status: "Open" },
  { name: "Daniel Joseph", text: "Received, thanks.", time: "1h", tone: 3, owner: "AK", status: "Resolved" },
  { name: "Neha Iyer", text: "Can we move it to Sunday?", time: "2h", tone: 1, owner: "AS", unread: 1, status: "Open" },
];

export function DashboardPreview({ className }: { className?: string }) {
  return (
    <PreviewFrame
      className={className}
      chrome={false}
      label="Illustrative preview of the CONVY workspace with demo data: shared inbox, a customer conversation with Priya Sharma, assignment information and a private note."
    >
      {/* Workspace header */}
      <div className="flex h-12 items-center gap-3 border-b border-line bg-surface px-3 text-[12px]">
        <span className="grid size-6 place-items-center rounded-md bg-accent text-[11px] font-semibold text-on-accent">C</span>
        <span className="font-medium text-fg">CONVY</span>
        <span className="text-line">/</span>
        <span className="inline-flex items-center gap-1 text-muted">
          Sales workspace <ChevronDown className="size-3" />
        </span>
        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {modules.map(({ icon: I, label, active }) => (
            <span
              key={label}
              className={cx(
                "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5",
                active ? "bg-elevated text-fg" : "text-subtle",
              )}
            >
              <I className="size-3.5" strokeWidth={1.5} />
              {label}
            </span>
          ))}
        </nav>
        <span className="ml-auto"><Avatar initials="AK" tone={0} size="sm" /></span>
      </div>

      <div className="grid h-[460px] grid-cols-1 grid-rows-[minmax(0,1fr)] text-[12px] sm:grid-cols-[250px_1fr]">
        {/* Conversation sidebar */}
        <aside className="hidden min-w-0 flex-col border-r border-line bg-[#181a29] sm:flex">
          <div className="space-y-3 p-3">
            <div className="flex items-center gap-2 rounded-md border border-line bg-card px-2.5 py-1.5 text-subtle">
              <Search className="size-3.5" />
              Search contacts
            </div>
            <div className="flex gap-1 rounded-md bg-card p-0.5 text-[11px]">
              <span className="flex-1 rounded bg-elevated py-1 text-center font-medium text-fg">All</span>
              <span className="flex-1 py-1 text-center text-subtle">Unread</span>
              <span className="flex-1 py-1 text-center text-subtle">Mine</span>
            </div>
          </div>
          <ul className="min-h-0 flex-1 overflow-hidden">
            {conversations.map((c) => (
              <li
                key={c.name}
                className={cx(
                  "relative flex h-[60px] items-center gap-3 border-t border-white/[0.04] px-3",
                  c.active && "bg-elevated/70 before:absolute before:inset-y-0 before:left-0 before:w-[2px] before:bg-accent",
                )}
              >
                <Avatar initials={c.name.split(" ").map((p) => p[0]).join("")} tone={c.tone} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className={cx("truncate", c.unread ? "font-medium text-fg" : "font-medium text-fg/90")}>{c.name}</span>
                    <span className="shrink-0 text-[10px] text-subtle">{c.time}</span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2">
                    <p className="min-w-0 flex-1 truncate text-subtle">{c.text}</p>
                    {c.unread && (
                      <span className="grid size-4 shrink-0 place-items-center rounded-full bg-accent text-[9px] font-semibold text-on-accent">{c.unread}</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* Customer chat */}
        <section className="flex min-w-0 flex-col">
          <header className="flex h-[60px] items-center gap-3 border-b border-line px-4">
            <Avatar initials="PS" tone={0} />
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[13px] font-medium text-fg">Priya Sharma</div>
              <div className="truncate text-[11px] text-subtle">WhatsApp · Site-visit enquiry</div>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <Chip tone="teal">Open</Chip>
              <span className="hidden items-center gap-1.5 rounded-md border border-line py-0.5 pl-0.5 pr-2 text-[11px] text-muted lg:inline-flex">
                <Avatar initials="AK" tone={0} size="sm" />
                Assigned to Arjun K.
              </span>
            </div>
          </header>

          <div className="bg-dots flex min-h-0 flex-1 flex-col gap-2.5 overflow-hidden bg-page/60 px-4 py-4">
            <span className="self-center rounded-full border border-line bg-card px-2 py-0.5 text-[10px] text-subtle">Today</span>
            <Bubble side="in" time="10:12">Can I book a site visit this Saturday?</Bubble>
            <Bubble side="out" time="10:14">Absolutely, Priya. Would 11 am work for you?</Bubble>
            <Bubble side="in" time="10:15">That works. Thank you!</Bubble>
            <div className="mt-1 rounded-lg border border-dashed border-[#5a4c2c] bg-[#2a2519] px-3 py-2 text-[#e8d7aa]">
              <div className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-[#c9a95e]">Private note · @Asha</div>
              Please confirm the visit details.
            </div>
            <div className="flex items-center gap-1.5 self-center text-[11px] text-subtle">
              <Clock3 className="size-3" /> Assigned to Arjun K. · response timer running
            </div>
          </div>

          <footer className="border-t border-line px-3 py-2.5">
            <div className="mb-2 flex gap-3 text-[11px]">
              <span className="font-medium text-fg">Reply</span>
              <span className="text-subtle">Private note</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-md border border-line bg-card px-2.5 py-1.5 text-subtle">Write a reply…</div>
              <Paperclip className="size-3.5 text-subtle" />
              <AtSign className="size-3.5 text-subtle" />
              <span className="hidden items-center gap-1 rounded-md border border-line px-2 py-1 text-[11px] text-muted sm:inline-flex">
                <FileText className="size-3" /> Template
              </span>
              <span className="grid size-7 place-items-center rounded-md bg-accent text-on-accent">
                <SendHorizontal className="size-3.5" />
              </span>
            </div>
          </footer>
        </section>
      </div>
    </PreviewFrame>
  );
}

function Bubble({ side, time, children }: { side: "in" | "out"; time: string; children: string }) {
  return (
    <div
      className={cx(
        "max-w-[80%] rounded-xl px-3 py-2 leading-snug",
        side === "in" ? "self-start rounded-tl-sm border border-line bg-card text-fg" : "self-end rounded-tr-sm bg-[#1d4a42] text-[#e9fbf6]",
      )}
    >
      {children}
      <span className={cx("ml-2 inline-block translate-y-0.5 text-[10px]", side === "in" ? "text-subtle" : "text-[#8fd3c4]")}>{time}</span>
    </div>
  );
}
