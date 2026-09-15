// Every piece of copy on the landing. Wording follows the previous landing (docs/old-site-content.txt);
// the CPO requires that no information is dropped, so edit facts and numbers here with care.

export const SITE_URL = "https://logistic.magnaqore.io"
export const BOOKING_URL = "https://cal.com/ina-nistoras/magnaqore-logistic"
export const OVERVIEW_VIDEO_ID = "ptQGNL-XdFE"

export const BOOKING_LABEL = "Book your free strategy call now"

/** `true` = included, `false` = not included; the object form adds a note to the mark. */
export type Mark = boolean | { included: boolean; note: string }
export type Cell = string | Mark

export type TitledText = { title: string; text: string }

export const navigation = [
  { id: "challenges", label: "Challenges" },
  { id: "ai-vs-human", label: "AI vs human" },
  { id: "pricing", label: "Pricing" },
  { id: "packages", label: "Packages" },
  { id: "why-magnaqore", label: "Why MagnaQore" },
  { id: "pilot", label: "30-day pilot" },
] as const

/** Full outline for the mobile navigation sheet and the challenge index. */
export const outline = [
  { id: "overview", label: "Overview" },
  { id: "who-its-for", label: "Who it's for" },
  {
    id: "challenges",
    label: "Challenges",
    children: [
      { id: "leads", label: "Leads and priorities" },
      { id: "calls", label: "Calls and follow-ups" },
      { id: "tenders", label: "Tenders and deadlines" },
      { id: "crm", label: "Unified CRM" },
      { id: "analytics", label: "Analytics dashboards" },
    ],
  },
  { id: "ai-vs-human", label: "AI vs human" },
  { id: "pricing", label: "Pricing" },
  { id: "services", label: "Services" },
  { id: "packages", label: "Packages" },
  { id: "why-magnaqore", label: "Why MagnaQore" },
  { id: "pilot", label: "30-day pilot" },
]

export const hero = {
  title: "In 30 days, we build an AI sales department for your company",
  standfirst:
    "It processes 2,000 to 70,000 leads per month without a big team. 5 times faster, 4 times cheaper, with a guarantee of 0% lead loss.",
  secondaryAction: "Watch the overview",
  stats: [
    { value: "2K–70K", label: "Leads per month", note: "Processed without a big team" },
    { value: "5×", label: "Faster", note: "Data and deal processing" },
    { value: "4×", label: "Cheaper", note: "Reduction in sales department costs" },
    { value: "0%", label: "Lead loss", note: "Full guarantee of data preservation" },
  ],
}

export const overview = {
  thesis:
    "The only AI system that transforms logistical chaos into a manageable sales pipeline in 30 days.",
  videoTitle: "MagnaQore Logistic overview",
  principles: [
    { title: "Individual approach", text: "No templates. No generic chatbots." },
    {
      title: "Specialization",
      text: "Only a specialized system for US and Canadian logistics, built from scratch for real sales & operations workflows.",
    },
  ] satisfies TitledText[],
  facts: [
    { value: "≤30 days", text: "We build your AI sales department" },
    { value: "11 hours", text: "It processes 2,000 leads" },
    { value: "0%", text: "Lost inquiries" },
    { value: "0%", text: "Missed tenders" },
    { value: "100%", text: "Data transparency" },
  ],
  factsSentence:
    "We build your AI sales department in ≤30 days. It processes 2,000 leads in 11 hours, 0% lost inquiries, 0% missed tenders, 100% data transparency.",
  result: "Result: Close more deals without increasing your headcount!",
  resultNote: "Start transforming your sales department today and ensure continuous growth.",
}

export const audience = {
  title: "Who is this for?",
  intro: "Logistics companies that...",
  pains: [
    { title: "Are losing hot inquiries", text: "Leads slip through the cracks due to delayed responses." },
    { title: "Miss tender deadlines", text: "Important opportunities lost due to poor tracking." },
    { title: "Struggle with data chaos", text: "Information scattered across multiple systems and spreadsheets." },
    { title: "Have inconsistent follow-ups", text: "No systematic approach to nurturing prospects." },
    { title: "Don't see employees workload", text: "Uneven distribution: some are overloaded, others are idle." },
    { title: "Can't track sales performance", text: "No clear visibility into conversion rates and pipeline health." },
    { title: "Waste time on manual tasks", text: "Hours spent on data entry instead of selling." },
    { title: "Lack real-time insights", text: "Decisions made on outdated or incomplete information." },
  ] satisfies TitledText[],
  warning: {
    title: "Important:",
    text: "If any of this sounds like you — you are losing money daily!",
  },
}

export const challengesIntro = {
  title: "Key challenges in logistics and how we address them",
}

export const leadManagement = {
  id: "leads",
  title: "Lead, load, and priority management",
  problem: [
    "People physically can't process the entire flow of loads.",
    "While they are working with one client, an urgent load that brings instant profit might come in – but the manager won't see it.",
    "Result: a hot lead \"cools off,\" profit is lost, the company loses money where it could have earned it faster.",
    "This is a direct consequence of human error and a person's inability to work and monitor simultaneously.",
  ],
  solution: [
    "Each new client/load receives an automatic rating (volume, urgency, activity)",
    "The system instantly assigns it to the person with the lowest workload",
    "Distribution without emotions, fatigue, or overload",
    "Reassignment only manually (human control)",
  ],
  resultsTitle: "Result of lead management solution",
  results: [
    { title: "Eliminate human errors", text: "Priorities are set automatically, without subjective factors" },
    { title: "Company stops losing warm leads", text: "Every request is processed on time, no one cools off" },
    { title: "Department reacts faster than competitors", text: "Instant distribution provides a speed advantage" },
    { title: "Profit grows by timely handling of urgent requests", text: "High-margin orders are no longer lost" },
  ] satisfies TitledText[],
}

export const communication = {
  id: "calls",
  title: "Communication quality control and team time savings",
  problem:
    "While an employee or a manager tries to reach out or manually enter data, a hot lead cools down, a tender is lost, and the company loses money.",
  limitsIntro: "A person simply cannot physically:",
  limits: [
    "make calls on time",
    "track the activity of all leads",
    "conduct follow-ups",
    "work with hundreds of thousands of contacts simultaneously",
  ],
  limitsOutro: "And the company pays for work that does not generate sales.",
  stepsTitle: "What does the system do?",
  steps: [
    { title: "First call to client on the same day", text: "Instant reaction to a new request" },
    { title: "Follow-up every 24 hours", text: "No omissions or \"forgot/didn't have time\"" },
    { title: "Automated callbacks with priority consideration", text: "The system considers time zone and client importance" },
    { title: "Logging all conversations in CRM", text: "Complete communication history automatically" },
    { title: "Lead classification", text: "Assessment of volume, interest, activity" },
    { title: "Automatic downgrading of \"silent\" leads", text: "The system automatically identifies inactive clients" },
    { title: "Transferring hot leads to the human", text: "Only when they are truly ready to talk" },
  ] satisfies TitledText[],
  resultTitle: "Result",
  resultLead: "What used to take months of manual labor, AI now does without errors, without delays, without burnout.",
  mathIntro: "If a human processes 300 contacts per day, even at 1 minute per contact:",
  math: [
    { value: "5", unit: "hours of routine work", note: "daily" },
    { value: "130", unit: "hours per month", note: "that do not generate sales" },
  ],
  resultOutro: "Now, the AI system does all this automatically. And not just faster — incomparably faster.",
}

export const tenders = {
  id: "tenders",
  title: "Tenders and deadlines",
  problem: [
    "Tenders arrive constantly — but the team starts working on them too late. No one tracks the submission window.",
    "Materials are submitted at the last minute.",
    "Due to chaos, participation conversion drops → the company loses to competitors, even though it could have won.",
  ],
  systemTitle: "What does the system do?",
  system: [
    "Records the tender_window",
    "Creates a callback/reminder 7–10 days before submission",
    "Assigns a responsible employee in advance",
    "For other tasks, deadlines are set manually → the system shows Due/Overdue statuses",
  ],
  resultsTitle: "Tender management results",
  results: [
    { title: "Team prepares on time", text: "Timely reminders eliminate haste" },
    { title: "Participation in more tenders", text: "We don't miss opportunities due to oversight" },
    { title: "Increased percentage of won tenders", text: "Due to timely and high-quality response" },
    { title: "Increased funnel coverage", text: "More participation → more sales" },
  ] satisfies TitledText[],
  screenshotCaption: "Tasks across all contacts: callbacks, hand-offs and tender deadlines with due dates",
}

export const crm = {
  id: "crm",
  title: "Unified CRM architecture: Clients → Loads → Carriers",
  problem: [
    "Currently, humans copy information between tables and services. Data becomes outdated faster than it's updated.",
    "By the time an employee transfers data from one table to another → new data appears. Information transfer between departments is slow and manual.",
  ],
  flow: ["Clients", "Loads", "Carriers"],
  systemTitle: "What does the system do?",
  system: [
    "Unites Clients → Loads → Carriers into a single connected architecture",
    "Statuses and stages transition automatically",
    "Documents, cards, communication history all in one window",
  ],
  resultsTitle: "Result",
  results: [
    "Instant information transfer between departments",
    "Elimination of errors and duplication",
    "Abandonment of manual copying",
    "All employees have up-to-date information in real time",
  ],
  screenshotCaption: "A client card: next steps, calls, contact details and everything known about the client in one window",
}

export const analytics = {
  id: "analytics",
  title: "Analytics dashboards",
  lead: "Real-time visibility into all sales processes, staff performance, and lead conversion metrics",
  problem: [
    "The head of the sales department in logistics does not see in real time what is happening with leads, tenders, team workload, and SLA deadlines.",
    "Decisions are made based on \"yesterday's\" figures, not the current situation.",
  ],
  consequencesTitle: "Because of this:",
  consequences: [
    "people work unevenly — some are overloaded, others are idle",
    "hot leads are lost because no one noticed them in time",
    "reports are compiled manually and always arrive late",
  ],
  providesTitle: "What does the MagnaQore Logistic analytics system provide?",
  provides: [
    {
      title: "Unified strategic window",
      text: "The entire department, accessible through a single interface.",
      listIntro: "All key performance indicators are displayed in real-time:",
      items: [
        "Individual staff workload",
        "Urgent tenders and their deadlines",
        "Rating and value of each lead",
        "Current client statuses and activities",
      ],
    },
    {
      title: "Time savings and error elimination",
      listIntro: "The dashboard performs tasks that previously took hours of manual effort:",
      items: [
        "No need to manually compile reports",
        "No need to transfer data between spreadsheets",
        "No need to reconcile statuses across multiple systems",
      ],
      outro: "All analytics update automatically — without human errors.",
    },
  ],
  outcomeTitle: "Company outcome",
  outcome: [
    "Processing 2,000 contacts / 1 month",
    "Complete transparency of the sales process",
    "Instant identification of risks and bottlenecks",
    "Saving hours for management and the employees",
  ],
  reportLabel: "Example report for a real estate company on system performance over 1 month",
  reportAction: "Open the example report",
}

export const aiVsHuman = {
  title: "Comparison of AI sales department and human sales department speed",
  performance: {
    title: "Performance metrics comparison",
    caption: "AI vs Human",
    columns: ["Metric", "MagnaQore AI contact center", "Human department"],
    rows: [
      ["Time per 1 contact", "0.3456 min", "15 min"],
      ["Processing time for 2,000 contacts", "11.5 hours", "1,166.7 hours"],
      ["Database processing speed", "1 day", "30 days"],
      ["Real conversations (Real-talk >25 sec)", "392", "lower, high losses"],
      ["Missed leads", "0%", "25–40%"],
    ],
  },
  labor: {
    title: "Human sales department (labor costs)",
    caption: "Labor cost analysis: human resources",
    columns: ["Task", "Formula", "Hours"],
    rows: [
      ["Search for 2,000 target contacts", "20 min × 2,000", "666.7 hrs"],
      ["Call + data recording", "15 min × 2,000", "500 hrs"],
      ["Total man-hours", "—", "1,166.7 hrs / month"],
      ["Required employees", "1,166.7 hrs ÷ 176 hrs", "6.6 FTE → 7 staff"],
    ],
  },
  keyMetrics: {
    title: "Key metric comparison (AI vs human)",
    columns: ["Metric", "AI MagnaQore", "Human"],
    rows: [
      ["Call speed", "2,000 in 1 day", "2,000 in 30 days"],
      ["Time per contact", "0.3456 min", "15 min"],
      ["Actual dialogues", "392", "Lower, significant losses"],
      ["Staffing needs", "0", "7 staff"],
      ["Annual cost", "$62k", "$294k"],
      ["Lead loss", "0%", "25–40%"],
      ["Follow-up", "Auto every 24 hours", "Irregular"],
      ["CRM logging", "Automatic", "Manual, errors"],
    ],
  },
}

export const pricing = {
  title: "What it costs",
  agent: {
    title: "MagnaQore AI agent pricing (monthly)",
    columns: ["Period", "What's included", "Cost"],
    rows: [
      {
        period: "1–2 months",
        included: "AI agent development (includes 2,000 contact calls)",
        note: "Setup at a fixed price. Duration depends on project complexity.",
        cost: "$12,000",
      },
      { period: "3 months", included: "Development completion + 1 month support ($5k/month)", cost: "$17,000" },
      { period: "6 months", included: "$12k development + $20k (4 months support × $5k/month)", cost: "$32,000" },
      { period: "12 months", included: "$12k development + $50k (10 months support × $5k/month)", cost: "$62,000" },
      {
        period: "Development + 12 months support",
        included: "$12k development + $60k (12 months support × $5k/month)",
        cost: "$72,000",
      },
    ],
  },
  human: {
    title: "Cost of a human department",
    columns: ["Expense item", "Amount / month"],
    rows: [
      ["Salaries for 7 staff (US market)", "$18,000 – $28,000"],
      ["Software/CRM/Licenses", "$500 – $1,500"],
      ["Databases / Scripts", "$300 – $1,000"],
    ],
    total: ["Total / month", "$18,800 – $30,500"],
    average: ["Average actual cost", "$24,500 / month"],
  },
}

export const services = {
  title: "Additional services for instant results from AI sales department",
  items: [
    {
      title: "2000 potential leads monthly",
      lead: "Receive 2,000 targeted leads every month and launch a full lead-processing system without spending on databases or marketing.",
      details: ["We immediately provide a ready pool of 2,000 targeted contacts per month who have active loads."],
    },
    {
      title: "Employee training for the new system",
      lead: "We will train your team to work effectively with MagnaQore from day one — without chaos, delays, or staff resistance.",
      details: [
        "Even the strongest system will not yield results if the team doesn't understand how to use it.",
        "We integrate the team directly into the training process: video tutorials, ready-made guides, checklists, step-by-step instructions, and live chat support.",
      ],
    },
    {
      title: "Audit of internal company processes",
      lead: "The audit is conducted during system development and helps identify all growth points for the company — so that further automation yields results within the first few weeks.",
      details: [
        "Most logistics companies lose profit due to \"hidden\" bottlenecks in their processes.",
        "During development, we simultaneously conduct an audit: analyzing all current processes, identifying routine tasks, where leads are lost, where deadlines are missed, and which processes can be automated in 2-5 days.",
      ],
    },
    {
      title: "AI literacy training for employees",
      lead: "We will teach your team to use AI as a full-fledged assistant — so that sales grow faster, and employees accomplish 2–3 times more in the same amount of time.",
      details: [
        "A department that doesn't understand AI tools works slower than competitors.",
        "We train employees to: write effective prompts, delegate routine tasks to AI, check data quality, speed up work with documents, tenders, and brokers.",
      ],
    },
    {
      title: "Technical support with a personal specialist",
      lead: "Get a personal tech expert who supports your system daily.",
      details: [
        "The logistics business operates 24/7. A system error → lost cargo → lost client.",
        "A personal technical specialist: responds within 5–20 minutes during business hours, solves problems faster than any IT department, optimizes processing routes, and accelerates lead handling up to 3 times.",
      ],
    },
    {
      title: "Additional technical features (custom)",
      lead: "Adapt MagnaQore to your unique business without additional costs.",
      details: [
        "Every logistics company has its own unique characteristics that off-the-shelf CRMs and call centers don't account for.",
        "We create additional functions for your process: SLA tracking, automated confirmations, overdue task control.",
        "This transforms the system from a \"regular dialer\" into the operational brain of your entire logistics.",
      ],
    },
  ],
}

export const plans = [
  { id: "6-no-calls", term: "6 months", calls: "No calls" },
  { id: "6-calls", term: "6 months", calls: "With calls" },
  { id: "12-no-calls", term: "12 months", calls: "No calls" },
  { id: "12-calls", term: "12 months", calls: "With calls", recommended: true },
] as const

export type MatrixRow = { label: string; note?: string; values: Cell[]; emphasis?: boolean }
export type MatrixGroup = { title: string; rows: MatrixRow[] }

const all = (cell: Cell): Cell[] => [cell, cell, cell, cell]

export const bundles = {
  title: "Bundle packages with gifts",
  rowHeader: "Feature / element",
  recommendedLabel: "Recommended",
  groups: [
    {
      title: "What's in the package",
      rows: [
        { label: "Actual setup cost", values: ["$7,500", "$12,000", "$7,500", "$12,000"] },
        { label: "Setup (included free)", values: all(true) },
        { label: "Setup duration", values: ["1 month", "2 months", "1 month", "2 months"] },
        { label: "AI calling", values: [false, true, false, true] },
        { label: "24-hour follow-up", values: all(true) },
        { label: "Lead auto-rating", values: all(true) },
        { label: "Tender-window logic", values: [false, true, false, true] },
        { label: "CRM architecture", values: all(true) },
        { label: "Analytical dashboards", values: all(true) },
        {
          label: "Technical support (months)",
          values: [
            "6 months × $3,500 per month",
            "6 months × $5,000 per month",
            "12 months × $3,500 per month",
            "12 months × $5,000 per month",
          ],
        },
        { label: "Bonus technical support", values: [false, false, "$3,500", "$5,000"] },
        { label: "Personal technical specialist", values: all(true) },
        { label: "Custom features (additional logic if needed)", values: all(true) },
        { label: "Internal process audit", values: [false, false, "$10,000", "$10,000"] },
        { label: "Team training", values: all(true) },
        { label: "Course «Hybrid System: Human + AI»", values: all(true) },
        { label: "2000 leads monthly", values: all(true) },
      ],
    },
    {
      title: "What the package is worth",
      rows: [
        { label: "Total value (with gifts)", values: ["$48,500", "$62,000", "$100,500", "$125,000"], emphasis: true },
        { label: "Setup", values: ["$7,500", "$12,000", "$7,500", "$12,000"] },
        {
          label: "Monthly service fee",
          values: [
            "$21,000 (6 months × $3,500 per month)",
            "$30,000 (6 months × $5,000 per month)",
            "$42,000 (12 months × $3,500 per month)",
            "$60,000 (12 months × $5,000 per month)",
          ],
        },
        {
          label: "2000 leads monthly",
          values: [
            "$18,000 (6 months × $3,000 per month)",
            "$18,000 (6 months × $3,000 per month)",
            "$36,000 (12 months × $3,000 per month)",
            "$36,000 (12 months × $3,000 per month)",
          ],
        },
        { label: "Course «Hybrid System: Human + AI»", values: all("$1,000 (per person)") },
        { label: "Bonus technical support", values: [false, false, "$3,500", "$5,000"] },
        { label: "Internal process audit", values: [false, false, "$10,000", "$10,000"] },
        { label: "Sales team training", values: all("$500 (per person)") },
        {
          label: "Custom features (additional logic if needed)",
          note: "Gift for the first 100 clients, 10 spots left",
          values: all("$500 per feature development"),
        },
      ],
    },
    {
      title: "What you pay",
      rows: [
        { label: "Total client payment", values: ["$21,000", "$30,000", "$42,000", "$60,000"], emphasis: true },
        { label: "Savings", values: ["minus $27,500", "minus $32,000", "minus $58,500", "minus $65,000"] },
      ],
    },
  ] satisfies MatrixGroup[],
}

export const inHouseColumn = { id: "in-house", term: "In-house team", calls: "Salaried staff" }

const free = (text: string): Mark => ({ included: true, note: `${text} → free` })
const no = (note: string): Mark => ({ included: false, note })

export const versusInHouse = {
  title: "Comparison with human staff costs",
  rowHeader: "Item",
  rows: [
    {
      label: "System setup",
      values: [
        free("1 month = $7,500"),
        free("2 months = $12,000"),
        free("1 month = $7,500"),
        free("2 months = $12,000"),
        no("No — company pays salaries immediately"),
      ],
    },
    {
      label: "Free month of service",
      values: [false, false, { included: true, note: "1 month" }, { included: true, note: "1 month" }, false],
    },
    {
      label: "Monthly service",
      values: ["$3,500 / month", "$5,000 / month", "$3,500 / month", "$5,000 / month", "$20,000–$26,000 / month"],
    },
    {
      label: "AI calling included",
      values: [false, true, false, true, no("Expensive call centers + large staff")],
    },
    { label: "2000 leads monthly", values: [true, true, true, true, no("Pay separately for databases")] },
    { label: "Company process audit", values: [true, true, true, true, no("No")] },
    { label: "Additional tech features (custom)", values: [true, true, true, true, false] },
    { label: "Technical support + manager", values: [true, true, true, true, no("Requires a separate supervisor")] },
    { label: "Employee system training", values: [true, true, true, true, no("Paid separately")] },
    { label: "AI-upgrade program (training)", values: [true, true, true, true, no("No")] },
    {
      label: "Total package cost, 6 months",
      values: ["$21,000", "$30,000", "—", "—", "$60,000 – $156,000 for 6 months"],
      emphasis: true,
    },
    {
      label: "Total package cost, 12 months",
      values: ["—", "—", "$42,000", "$60,000", "$120,000 – $312,000 per year"],
      emphasis: true,
    },
    { label: "Real package value", values: ["$48,500", "$62,000", "$100,500", "$125,000", "—"] },
    { label: "Saved by taking the bundle", values: ["$27,500", "$32,000", "$58,500", "$65,000", "—"] },
    {
      label: "Savings compared to human costs",
      values: ["$39,000–$135,000", "$30,000–$126,000", "$78,000–$270,000", "$60,000–$252,000", "="],
      emphasis: true,
    },
  ] satisfies MatrixRow[],
}

export const whyMagnaQore = {
  title: "Why MagnaQore is better?",
  reasons: [
    {
      title: "Specialization",
      text: "We are the only AI team that works exclusively with North American logistics.",
    },
    { title: "Speed", text: "Full-fledged AI sales department in <30 days." },
    {
      title: "Industrial-scale automation",
      text: "While your competitors are limited by human capacity, our system processes up to 5,000 requests daily. Each client receives personalized follow-ups, timely reminders, and professional support — 24/7, no weekends, zero human errors.",
    },
    {
      title: "AI cost optimization: 35× cheaper",
      text: "Deep prompt optimization reduced AI costs by 35×.",
      exampleTitle: "Example at 18,000+ requests/day:",
      example: [
        ["Standard solution", "$428/month"],
        ["MagnaQore", "$47/month"],
        ["Your savings", "$381/month"],
      ],
      outro: "One request costs just $0.0026 instead of $0.024 — same quality, fraction of the price.",
    },
    {
      title: "Own infrastructure: save $5,000+/month",
      text: "We deploy on your dedicated servers, eliminating expensive cloud subscriptions.",
      exampleTitle: "Cost comparison at 10,000 calls/month:",
      example: [
        ["Cloud solutions", "~$6,000/month"],
        ["MagnaQore", "One-time setup only"],
        ["Monthly savings", "$5,000+"],
      ],
      outro: "You pay for the server (like photo storage), not per transaction.",
    },
    {
      title: "Documented results",
      list: [
        "80% reduction in missed deliveries",
        "35% decrease in workload",
        "4.5× faster request processing",
        "5× lead processing capacity (same team, same cost)",
      ],
    },
    { title: "Gen-Z team", text: "Fast, flexible, practical. We work hands-on, not with PowerPoints." },
  ],
  resultTitle: "Result:",
  result:
    "Professional setup pays for itself in month 1, then works 24/7 extracting profit from every contact — with no subscription fees and minimal AI costs.",
}

export const pilot = {
  title: "If you're still here, you know this is your problem.",
  tiredOfTitle: "You're tired of:",
  tiredOf: [
    "Losing deals because you followed up too late",
    "Watching competitors scale while your team drowns",
    "Paying for leads that die in your pipeline",
    "Missing tenders because nobody tracked the deadline",
    "Wondering which manager said what to which client",
  ],
  waiting: "And you know that waiting another quarter won't make this easier.",
  offerTitle: "Here's what we offer:",
  offer:
    "A 30-day pilot where you'll see this system working with your actual contacts, your actual leads, your actual sales process.",
  includedTitle: "What's included:",
  included: [
    {
      title: "Full system access for 30 days",
      items: [
        "Upload your contacts and launch campaigns immediately",
        "AI calls your leads while you monitor every conversation",
        "Email automation + contact search built-in",
        "Run your entire sales operation on one platform",
      ],
    },
    {
      title: "Expert onboarding sessions",
      items: [
        "We teach your team how to maximize the system",
        "Custom setup for your specific logistics workflows",
        "Weekly check-ins to optimize performance",
      ],
    },
    {
      title: "Hands-on support throughout",
      items: ["Direct access to our team", "Real, measurable results you can track daily"],
    },
  ],
  callTitle: "Book a free strategy call using the link below.",
  call: "We'll assess your current sales process, identify where you're losing the most money and opportunities, show you exactly where AI will create the fastest impact in the next 30–60 days, and discuss whether a pilot makes sense for your company.",
  closing: [
    "Your competitors who automated 6 months ago are already closing deals you don't even know existed.",
    "The question isn't whether AI works.",
    "The question is: How much longer can you afford to wait?",
  ],
  signoff: "In logistics, speed isn't just about trucks anymore. It's about decisions.",
}
