
const check = `<svg viewBox="0 0 16 16"><path d="m4.5 8.2 2.3 2.3 4.7-5"/></svg>`;
const icon = (d: string) => `<svg class="ui-icon" viewBox="0 0 16 16">${d}</svg>`;
const wa = `<img class="ui-brand" src="/assets/icons/whatsapp.svg" alt="" width="14" height="14">`;

/* ---------------------------------------------------------------- window: the shared inbox */
export const inboxWindow = `
<div class="ui ui-panel ui-win" data-ui="window" data-open="Open" data-work="Assigned" data-done="Resolved">
  <div class="ui-win__bar">
    <span class="ui-dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="ui-win__crumb">${wa}Inbox <i>/</i> <b>Open</b></span>
    <span class="ui-spacer"></span>
    <span class="ui-win__search" aria-hidden="true">${icon('<circle cx="7" cy="7" r="4.5"/><path d="m10.5 10.5 3 3"/>')}<span class="ui-win__ph">Search</span><span class="ui-kbd">/</span></span>
  </div>
  <div class="ui-win__body">
    <nav class="ui-win__side" aria-hidden="true">
      <span class="ui-win__nav is-on">${icon('<path d="M2.5 9h3l1 1.5h3l1-1.5h3"/><path d="M2.5 9 4 3.5h8L13.5 9v3.5h-11z"/>')}Open<em>24</em></span>
      <span class="ui-win__nav">${icon('<circle cx="8" cy="6" r="2.5"/><path d="M3.5 13.5c.6-2.3 2.4-3.5 4.5-3.5s3.9 1.2 4.5 3.5"/>')}Mine<em>6</em></span>
      <span class="ui-win__nav">${icon('<path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h7"/>')}Unread<em>3</em></span>
      <span class="ui-win__nav">${icon('<path d="m3.5 8.4 2.8 2.8 6.2-6.4"/>')}Resolved</span>
      <span class="ui-win__label">Teams</span>
      <span class="ui-win__nav"><span class="ui-win__hash">#</span>Sales</span>
      <span class="ui-win__nav"><span class="ui-win__hash">#</span>Support</span>
    </nav>
    <div class="ui-win__main">
      <div class="ui-win__cols" aria-hidden="true"><span>Customer</span><span>Conversation</span><span>Owner</span><span>Age</span></div>
      <ul class="ui-win__rows">
        <li class="ui-win__row" data-row><span class="ui-avatar" data-tone="1">PN</span><span class="ui-win__who">Priya Nair</span><span class="ui-win__sub">Site visit, Saturday</span><span class="ui-win__st" data-st>Open</span><span class="ui-win__age">2m</span></li>
        <li class="ui-win__row" data-row><span class="ui-avatar" data-tone="3">RK</span><span class="ui-win__who">Rahul Kulkarni</span><span class="ui-win__sub">Brochure, 2BHK</span><span class="ui-win__st" data-st>Open</span><span class="ui-win__age">6m</span></li>
        <li class="ui-win__row" data-row><span class="ui-avatar" data-tone="4">FS</span><span class="ui-win__who">Fatima Shaikh</span><span class="ui-win__sub">Order 2219, delivery</span><span class="ui-win__st" data-st>Open</span><span class="ui-win__age">11m</span></li>
      </ul>
    </div>
  </div>
</div>`;

/* ---------------------------------------------------------------- notify: ownership */
export const ownershipNotify = `
<div class="ui ui-notify" data-ui="notify">
  <ul class="ui-notify__list" data-notify-list>
    <li class="ui-note"><span class="ui-avatar ui-note__av" data-tone="2">MS</span><span class="ui-note__text"><span class="ui-note__title">Meera assigned you a chat<time>now</time></span><span class="ui-note__body">Priya Nair, site visit in Baner</span></span><span class="ui-btn ui-btn--sm ui-note__btn">Open</span></li>
    <li class="ui-note"><span class="ui-avatar ui-note__av" data-tone="5">AK</span><span class="ui-note__text"><span class="ui-note__title">Arjun mentioned you<time>4m</time></span><span class="ui-note__body">Private note: share the floor plan</span></span></li>
    <li class="ui-note"><span class="ui-note__ico">${icon('<circle cx="8" cy="8" r="5.5"/><path d="M8 5v3l2 1.5"/>')}</span><span class="ui-note__text"><span class="ui-note__title">Response timer, 12 min<time>12m</time></span><span class="ui-note__body">Rahul Kulkarni is waiting for a reply</span></span></li>
  </ul>
</div>`;

/* ---------------------------------------------------------------- checklist: a campaign's checks */
export const campaignChecklist = `
<div class="ui ui-panel ui-checks" data-ui="checklist">
  <div class="ui-checks__head">
    <div class="ui-title">Campaign: Diwali offer</div>
    <span class="ui-spacer"></span>
    <div class="ui-meta" data-checks-count>3 of 5</div>
  </div>
  <div class="ui-checks__bar"><i data-checks-bar style="--k:0.6"></i></div>
  <ul class="ui-checks__list">
    <li class="ui-check is-done"><span class="ui-check__box">${check}</span><span class="ui-check__label">Template approved by Meta</span></li>
    <li class="ui-check is-done"><span class="ui-check__box">${check}</span><span class="ui-check__label">Import 4,812 contacts from Excel</span></li>
    <li class="ui-check is-done"><span class="ui-check__box">${check}</span><span class="ui-check__label">Review 37 row errors</span></li>
    <li class="ui-check"><span class="ui-check__box">${check}</span><span class="ui-check__label">Check eligibility and cost estimate</span></li>
    <li class="ui-check"><span class="ui-check__box">${check}</span><span class="ui-check__label">Launch and track delivery</span></li>
  </ul>
</div>`;

/* ---------------------------------------------------------------- doc: a template in the studio */
export const templateDoc = `
<div class="ui ui-doc" data-ui="doc">
  <article class="ui-doc__page">
    <div class="ui-doc__label">Template: order_update · Utility · English</div>
    <div class="ui-doc__title">Your order is on its way</div>
    <div class="ui-doc__text">Hi <mark class="ui-doc__mark is-on">Priya</mark>, your order <mark class="ui-doc__mark" data-kind="Variable" data-msg="Filled from the order number column at send time." data-where="Second variable, order number">2219</mark> has been packed and leaves our store today.</div>
    <div class="ui-doc__text">Track it with the button below, or reply here and our team will help.</div>
    <div class="ui-doc__text">Buttons: Track order · Talk to us</div>
  </article>
  <aside class="ui-doc__note ui-panel is-on" aria-live="polite">
    <div class="ui-doc__kind"><span class="ui-doc__dot"></span><span data-doc-kind>Variable</span></div>
    <div class="ui-doc__msg" data-doc-msg>Filled from the customer name column at send time.</div>
    <div class="ui-doc__where" data-doc-where>First variable · Approved by Meta</div>
  </aside>
</div>`;

/* ---------------------------------------------------------------- stat: a campaign's delivery */
export const campaignStat = `
<div class="ui ui-panel ui-stat" data-ui="stat" data-from="88" data-to="96" data-suffix="%">
  <div class="ui-stat__head">
    <div class="ui-stat__top">
      <span class="ui-stat__label">Delivered, Diwali offer</span>
      <span class="ui-stat__range">4,812 recipients</span>
    </div>
    <div class="ui-stat__line">
      <span class="ui-stat__num" data-stat-num>96%</span>
      <span class="ui-stat__sub">read by 3,140 so far</span>
    </div>
  </div>
  <div class="ui-stat__chart">
    <svg class="ui-stat__svg" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
      <path class="ui-stat__grid" d="M0 30.5H400M0 60.5H400M0 90.5H400"/>
      <path class="ui-stat__cover" fill-rule="evenodd" d=""/>
      <g class="ui-stat__bars"><rect rx="3" x="0.00" y="88" width="21.14" height="32"/><rect rx="3" x="29.14" y="70" width="21.14" height="50"/><rect rx="3" x="58.29" y="52" width="21.14" height="68"/><rect rx="3" x="87.43" y="40" width="21.14" height="80"/><rect rx="3" x="116.57" y="33" width="21.14" height="87"/><rect rx="3" x="145.71" y="27" width="21.14" height="93"/><rect rx="3" x="174.86" y="24" width="21.14" height="96"/><rect rx="3" x="204.00" y="21" width="21.14" height="99"/><rect rx="3" x="233.14" y="19" width="21.14" height="101"/><rect rx="3" x="262.29" y="18" width="21.14" height="102"/><rect rx="3" x="291.43" y="17" width="21.14" height="103"/><rect rx="3" x="320.57" y="16" width="21.14" height="104"/><rect rx="3" x="349.71" y="16" width="21.14" height="104"/><rect rx="3" x="378.86" y="15" width="21.14" height="105"/></g>
    </svg>
    <div class="ui-stat__axis" aria-hidden="true"><span>09:00</span><span>12:00</span><span>Now</span></div>
  </div>
</div>`;

/* ---------------------------------------------------------------- chat: a WhatsApp enquiry */
export const enquiryChat = `
<div class="ui ui-panel ui-chat" data-ui="chat">
  <div class="ui-head">
    <span class="ui-avatar" data-tone="1" aria-hidden="true">PN</span>
    <div class="ui-title">Priya Nair</div>
    <span class="ui-chat__online">WhatsApp</span>
    <span class="ui-spacer"></span>
  </div>
  <div class="ui-chat__body">
    <div class="ui-chat__day">Today, 10:42</div>
    <div class="ui-msg ui-msg--me" data-chat-q>
      <span class="ui-msg__text">Is the 3BHK in Baner still available? Can we visit on Saturday?</span>
    </div>
    <div class="ui-msg ui-msg--bot" data-chat-a>
      <span class="ui-avatar ui-msg__av" data-tone="2" aria-hidden="true">MS</span>
      <span class="ui-msg__col">
        <span class="ui-chat__answer">Yes, it is. I have noted <b>Saturday at 11:00</b> for your site visit. Arjun will meet you there.</span>
        <span class="ui-chat__srcs">
          <span class="ui-chat__src">${icon('<circle cx="8" cy="6" r="2.5"/><path d="M3.5 13.5c.6-2.3 2.4-3.5 4.5-3.5s3.9 1.2 4.5 3.5"/>')}Assigned to Meera</span>
          <span class="ui-chat__src">${icon('<path d="m3.5 8.4 2.8 2.8 6.2-6.4"/>')}Read</span>
        </span>
      </span>
    </div>
  </div>
  <div class="ui-chat__input">
    <span class="ui-chat__ph">Reply or add a private note</span>
    <span class="ui-chat__send" aria-hidden="true"><svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 13V3.5M3.8 7.5 8 3.3l4.2 4.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
  </div>
</div>`;

/* ---------------------------------------------------------------- toggles: role permissions */
export const roleToggles = `
<div class="ui ui-panel ui-toggles" data-ui="toggles">
  <div class="ui-head">
    <svg class="ui-icon ui-toggles__ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.8 13 4v3.6c0 3-2.1 5.4-5 6.6-2.9-1.2-5-3.6-5-6.6V4z"/><path d="m5.8 8 1.6 1.6 3-3.2"/></svg>
    <div class="ui-title">Role: Sales agent</div>
    <span class="ui-spacer"></span>
    <div class="ui-meta" data-tg-count>3 of 5 on</div>
  </div>
  <ul class="ui-toggles__list">
    <li class="ui-tg"><span class="ui-tg__text"><span class="ui-tg__label">Reply to assigned chats</span><span class="ui-tg__sub">Sales workspace only</span></span><button class="ui-switch is-on" type="button" role="switch" aria-checked="true" aria-label="Reply to assigned chats" tabindex="-1"><i></i></button></li>
    <li class="ui-tg"><span class="ui-tg__text"><span class="ui-tg__label">Send approved templates</span><span class="ui-tg__sub">From the inbox</span></span><button class="ui-switch is-on" type="button" role="switch" aria-checked="true" aria-label="Send approved templates" tabindex="-1"><i></i></button></li>
    <li class="ui-tg"><span class="ui-tg__text"><span class="ui-tg__label">Launch campaigns</span><span class="ui-tg__sub">Managers only</span></span><button class="ui-switch" type="button" role="switch" aria-checked="false" aria-label="Launch campaigns" tabindex="-1"><i></i></button></li>
    <li class="ui-tg"><span class="ui-tg__text"><span class="ui-tg__label">See all conversations</span><span class="ui-tg__sub">Off: assigned chats only</span></span><button class="ui-switch" type="button" role="switch" aria-checked="false" aria-label="See all conversations" tabindex="-1"><i></i></button></li>
    <li class="ui-tg"><span class="ui-tg__text"><span class="ui-tg__label">Add private notes</span><span class="ui-tg__sub">Visible to the team</span></span><button class="ui-switch is-on" type="button" role="switch" aria-checked="true" aria-label="Add private notes" tabindex="-1"><i></i></button></li>
  </ul>
</div>`;

/* ---------------------------------------------------------------- integrations: the setup */
export const setupApps = `
<div class="ui ui-panel ui-apps" data-ui="integrations">
  <div class="ui-head">
    <div class="ui-title">Workspace setup</div>
    <span class="ui-spacer"></span>
    <div class="ui-meta" data-apps-count>3 of 4 done</div>
  </div>
  <ul class="ui-apps__list">
    <li class="ui-app is-on">
      <span class="ui-logo ui-logo--sm"><img src="/assets/icons/whatsapp.svg" alt=""></span>
      <span class="ui-app__text"><span class="ui-app__name">WhatsApp Business</span><span class="ui-app__sub">Connected by Embedded Signup</span></span>
      <span class="ui-app__state"><span class="ui-chip ui-app__on">Connected</span><button class="ui-btn ui-btn--ghost ui-btn--sm ui-app__connect" type="button" tabindex="-1"><span class="ui-spin ui-app__spin" aria-hidden="true"></span><span>Connect</span></button></span>
    </li>
    <li class="ui-app is-on">
      <span class="ui-logo ui-logo--sm"><img src="/assets/icons/meta.svg" alt=""></span>
      <span class="ui-app__text"><span class="ui-app__name">Meta templates</span><span class="ui-app__sub">3 approved, synced</span></span>
      <span class="ui-app__state"><span class="ui-chip ui-app__on">Synced</span><button class="ui-btn ui-btn--ghost ui-btn--sm ui-app__connect" type="button" tabindex="-1"><span class="ui-spin ui-app__spin" aria-hidden="true"></span><span>Sync</span></button></span>
    </li>
    <li class="ui-app is-on">
      <span class="ui-logo ui-logo--sm"><img src="/assets/icons/ui-users.svg" alt=""></span>
      <span class="ui-app__text"><span class="ui-app__name">Team</span><span class="ui-app__sub">6 people invited, 2 roles</span></span>
      <span class="ui-app__state"><span class="ui-chip ui-app__on">Invited</span><button class="ui-btn ui-btn--ghost ui-btn--sm ui-app__connect" type="button" tabindex="-1"><span class="ui-spin ui-app__spin" aria-hidden="true"></span><span>Invite</span></button></span>
    </li>
    <li class="ui-app" data-apps-target>
      <span class="ui-logo ui-logo--sm"><img src="/assets/icons/xlsx.svg" alt=""></span>
      <span class="ui-app__text"><span class="ui-app__name">First campaign</span><span class="ui-app__sub">Import an Excel audience</span></span>
      <span class="ui-app__state"><span class="ui-chip ui-app__on">Ready</span><button class="ui-btn ui-btn--ghost ui-btn--sm ui-app__connect" type="button" tabindex="-1"><span class="ui-spin ui-app__spin" aria-hidden="true"></span><span>Start</span></button></span>
    </li>
  </ul>
</div>`;

/* ---------------------------------------------------------------- page-CSS pieces (no kit fragment fits) */
/** AI chat summary beside a conversation (page CSS .cv-ai in src/kit/page.css). */
export const aiSummary = `
<div class="ui ui-panel cv-ai">
  <div class="ui-head"><div class="ui-title">AI summary</div><span class="ui-spacer"></span><span class="ui-meta">Vikram Rao · 41 messages</span></div>
  <p class="cv-ai__text">Asking about the MBA fee structure and the instalment option. Shared his marks on Monday and wants a counselling call this week.</p>
  <dl class="cv-ai__facts">
    <div><dt>Intent</dt><dd>Admission enquiry</dd></div>
    <div><dt>Sentiment</dt><dd>Positive</dd></div>
    <div><dt>Details</dt><dd>MBA, 2027 intake</dd></div>
  </dl>
  <div class="cv-ai__acts"><span>Request fresh analysis</span><span>Reply as agent</span></div>
</div>`;

/** An audit trail of actions (page CSS .cv-log). */
export const auditLog = `
<div class="ui ui-panel cv-log">
  <div class="ui-head"><div class="ui-title">Activity</div><span class="ui-spacer"></span><span class="ui-meta">Sales workspace</span></div>
  <ul>
    <li><b>Meera</b> assigned Priya Nair to <b>Arjun</b><time>10:44</time></li>
    <li><b>Arjun</b> added a private note<time>10:46</time></li>
    <li>Template <b>order_update</b> approved by Meta<time>11:02</time></li>
    <li><b>Ravi</b> paused campaign Diwali offer<time>11:20</time></li>
    <li>Message to Rahul Kulkarni read<time>11:21</time></li>
    <li><b>Ravi</b> changed the role of <b>Sana</b><time>11:35</time></li>
  </ul>
</div>`;
