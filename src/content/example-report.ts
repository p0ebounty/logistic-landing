// Example report: a real estate company's AI lead-generation campaign, 5 weeks.
// Figures come from the report previously published as a claude.ai artifact; the client name is left out.

export const EXAMPLE_REPORT_PATH = "/example-report"

export const reportMeta = {
  title: "Lead generation report",
  client: "Real estate company",
  period: "September 10 – October 13, 2024 (5 weeks)",
  headline: [
    { value: "$156,228", label: "Total savings vs traditional approach" },
    { value: "744%", label: "ROI" },
    { value: "20,000", label: "Leads parsed" },
    { value: "$21k", label: "Invested" },
  ],
}

export const reportSections = [
  { id: "summary", label: "Summary" },
  { id: "segments", label: "Segments" },
  { id: "resources", label: "Resources" },
  { id: "ai-vs-human", label: "AI vs human" },
] as const

export const summary = {
  kpis: [
    { value: "10,060", label: "Total database", note: "Leads in system" },
    { value: "4,853", label: "Processed", note: "77% completion" },
    { value: "383", label: "Qualified leads", note: "8% conversion" },
    { value: "24", label: "Hot leads", note: "0.5% ready to buy" },
  ],
  budget: {
    title: "Advertising budget savings",
    basis: "Based on 20,000 leads parsed (10,000 currently in processing)",
    ai: { label: "AI parsing cost", value: "$1,600", formula: "$0.08 per lead × 20,000" },
    traditional: { label: "Traditional ad cost", value: "$140,000", formula: "$7 per lead × 20,000" },
    saved: { label: "Budget saved", value: "$138,400" },
    ratios: [
      { value: "98%", label: "Budget saved" },
      { value: "87×", label: "Cheaper" },
    ],
    note: "Lead parsing cost ($1,600) is included in subscription costs. Total of 20,000 leads parsed, with 10,000 currently being processed through the campaign.",
  },
  funnel: {
    title: "Conversion funnel",
    steps: [
      { label: "Total contacts", value: 6253 },
      { label: "Processed", value: 4853 },
      { label: "Interested (8%)", value: 383 },
      { label: "Hot leads (0.5%)", value: 24 },
    ],
    categories: [
      { value: "340", label: "Category F", note: "Interested" },
      { value: "22", label: "Category C", note: "Warm" },
      { value: "21", label: "Category A", note: "Hot" },
    ],
  },
  channels: {
    title: "Contact channels",
    items: [
      { value: "6,253", label: "Phone numbers", note: "1,400 pending calls" },
      { value: "3,807", label: "Email addresses", note: "38% coverage" },
      { value: "10,060", label: "LinkedIn profiles", note: "100% coverage" },
    ],
  },
  outreach: {
    title: "Outreach progress",
    items: [
      { label: "Messages sent", value: "3,445" },
      { label: "In progress", value: "4,060" },
      { label: "Pending calls", value: "1,400" },
    ],
  },
  efficiency: {
    title: "Cost efficiency",
    ai: { label: "AI parsing cost", value: "$0.08", note: "per lead (20,000 parsed)" },
    traditional: { label: "Traditional ads cost", value: "$7.00", note: "per lead" },
    outcomes: [
      { value: "98% budget saved", note: "87× cheaper than ads" },
      { value: "$138,400 saved", note: "on 20,000 leads acquisition" },
    ],
  },
}

export const segments = {
  title: "Segment performance analysis",
  lead: "Detailed breakdown by target segment",
  columns: ["Segment", "Contacts", "Interested", "Interest %", "Cat A", "A %", "Cat C", "C %", "Cat F", "F %"],
  rows: [
    ["Qatari Investors", 1300, 183, "14.1%", 8, "0.6%", 8, "0.6%", 167, "12.8%"],
    ["Qatari Families", 112, 11, "9.8%", 1, "0.9%", 1, "0.9%", 9, "8.0%"],
    ["Long-term Expats 30k+", 168, 2, "1.2%", 0, "0.0%", 0, "0.0%", 2, "1.2%"],
    ["Expats 15-30k QAR", 62, 3, "4.8%", 0, "0.0%", 0, "0.0%", 3, "4.8%"],
    ["Medical Sector", 30, 0, "0.0%", 0, "0.0%", 0, "0.0%", 0, "0.0%"],
    ["Energy Sector", 622, 40, "6.4%", 5, "0.8%", 1, "0.2%", 34, "5.5%"],
    ["Aviation Sector", 589, 15, "2.5%", 1, "0.2%", 0, "0.0%", 14, "2.4%"],
    ["Small Landlords", 400, 3, "0.8%", 0, "0.0%", 0, "0.0%", 3, "0.8%"],
    ["Portfolio Landlords", 521, 7, "1.3%", 0, "0.0%", 0, "0.0%", 7, "1.3%"],
    ["Young Professionals", 22, 4, "18.2%", 0, "0.0%", 0, "0.0%", 4, "18.2%"],
    ["HNW Expats (Finance)", 350, 57, "16.3%", 4, "1.1%", 1, "0.3%", 52, "14.9%"],
    ["German Investors", 486, 0, "0.0%", 0, "0.0%", 0, "0.0%", 0, "0.0%"],
    ["UK Muslim Families", 448, 9, "2.0%", 0, "0.0%", 0, "0.0%", 9, "2.0%"],
    ["African HNWIs", 649, 39, "6.0%", 2, "0.3%", 3, "0.5%", 34, "5.2%"],
    ["Afro-diaspora UK/EU", 494, 4, "0.8%", 0, "0.0%", 0, "0.0%", 4, "0.8%"],
  ] as [string, number, number, string, number, string, number, string, number, string][],
  top: {
    title: "Top performing segments",
    items: [
      ["HNW Expats (Finance)", "16.3%"],
      ["Qatari Investors", "14.1%"],
      ["Qatari Families", "9.8%"],
      ["Energy Sector", "6.4%"],
      ["African HNWIs", "6.0%"],
    ],
  },
  low: {
    title: "Low response segments",
    items: [
      ["German Investors", "0.0%"],
      ["Small Landlords", "0.8%"],
      ["Afro-diaspora UK/EU", "0.8%"],
    ],
    note: "German Investors show 0% interest — recommend deprioritizing this segment.",
  },
  inProgress: {
    title: "Segments currently in progress",
    lead: "The following segments are being processed and data will be updated soon:",
    items: [
      "Families with school-age children",
      "Regional investors (Saudi, Emirati, Kuwaiti/Omani)",
      "Turkish wealthy buyers",
      "Canadian Muslim families",
      "US HNWIs & professionals",
    ],
  },
}

export const resources = {
  title: "Resource requirements: 10,000 leads / 5 weeks",
  basis: "Labor cost calculated at $9/hour for standard roles, $18–20/hour for specialized roles",
  hours: [
    { value: "3,012", label: "Manual labor hours", note: "Team of 6 people" },
    { value: "782", label: "AI-assisted hours", note: "74% reduction" },
    { value: "2,230", label: "Time saved", note: "Hours saved" },
  ],
  speed: {
    title: "Speed comparison (actual timeline)",
    manual: { value: "20+ weeks", label: "Manual team timeline", note: "Team of 6 people working full-time. Manual messaging requires 20+ weeks.", weeks: 20 },
    ai: { value: "5 weeks", label: "AI system timeline", note: "Sept 10 – Oct 13 (actual period)", weeks: 5 },
    factor: "4×+ faster",
    tasksTitle: "AI task breakdown",
    tasks: [
      ["Content creation (all texts)", "2 weeks"],
      ["Calling campaign", "5 weeks"],
      ["Outreach (LinkedIn, Email, WA)", "Parallel"],
      ["Remaining in process", "1,400 leads"],
    ],
    note: "Manual sending of 10,060+ messages across LinkedIn, Email, and WhatsApp would realistically require 20+ weeks, not 10 weeks.",
  },
  execution: {
    title: "Campaign execution team (organic outreach)",
    columns: ["Role", "Key tasks", "Manual hours", "Hourly rate", "Manual cost (5 weeks)"],
    rows: [
      ["Content Marketing Manager", "Create 300 LinkedIn texts (10 per segment × 30), 90 PDFs (3 per segment), 60 email texts, 90 WhatsApp texts", "620", "$9", "$5,580"],
      ["Email Marketing Specialist", "Email design, template creation, sequence setup for 30 segments", "110", "$9", "$990"],
      ["LinkedIn Outreach Specialist", "Manual sending of 10,060 LinkedIn messages, setup automation", "380", "$9", "$3,420"],
      ["WhatsApp Campaign Manager", "Manual sending of 6,253 WhatsApp messages", "156", "$9", "$1,404"],
      ["Call Center Operators", "28,139 call attempts (avg 4.5 per contact), 4,853 successful calls × 5 min each", "1,342", "$9", "$12,078"],
      ["CRM Data Manager", "Data entry, notes, lead scoring for 4,853 processed contacts", "404", "$9", "$3,636"],
      ["Service subscriptions (5 weeks)", "—", "—", "—", "$2,000"],
    ],
    total: ["Subtotal: campaign execution", "", "3,012", "—", "$29,108"],
  },
  advertising: {
    title: "Alternative: paid advertising team (20,000 leads)",
    lead: "Required team if using traditional Meta & Google Ads instead of AI parsing",
    columns: ["Role", "Key tasks", "Hours", "Hourly rate", "Cost (5 weeks)"],
    rows: [
      ["PPC/Media Buyer Specialist", "Audience research, Meta & Google Ads setup, campaign management and optimization (4-6 weeks)", "280", "$20", "$5,600"],
      ["Creative Designer", "Ad creative design, A/B test variations, landing page design", "140", "$18", "$2,520"],
      ["Ad spend (Meta + Google)", "—", "—", "$7/lead", "$140,000"],
    ],
    total: ["Total: traditional advertising approach", "", "420", "—", "$148,120"],
    note: "To acquire 20,000 leads through paid ads would cost $148,120 (specialists: $8,120 + ad spend: $140,000), compared to AI parsing at just $1,600.",
  },
  comparison: {
    title: "Complete cost comparison",
    traditional: {
      title: "Traditional approach (full manual)",
      rows: [
        ["Campaign team (6 people)", "$29,108"],
        ["Advertising team (2 people)", "$8,120"],
        ["Ad spend (20,000 leads)", "$140,000"],
      ],
      total: ["Total manual", "$177,228"],
    },
    ai: {
      title: "AI automation approach",
      rows: [
        ["AI system development", "$18,000"],
        ["Subscriptions (5 weeks)", "$3,000"],
        ["Lead parsing included", "$1,600"],
      ],
      total: ["Total AI", "$21,000"],
    },
    savings: { label: "Total savings", note: "Traditional vs AI approach", value: "$156,228", roi: "744% ROI" },
  },
}

export const aiVsHumanReport = {
  title: "AI vs human performance",
  lead: "Real-world comparison from the UK prospects campaign",
  human: {
    title: "Human team approach",
    subtitle: "The company's own agents",
    stats: [
      { label: "Leads processed", value: "20", note: "out of 556 UK prospects" },
      { label: "Time spent", value: "2 days" },
      { label: "Qualified leads found", value: "0", note: "50% couldn't reach prospects" },
      { label: "Coverage rate", value: "3.6%" },
    ],
  },
  ai: {
    title: "AI system approach",
    subtitle: "Automated processing",
    stats: [
      { label: "Leads processed", value: "556", note: "All UK prospects" },
      { label: "Time spent", value: "Same period" },
      { label: "Qualified leads found", value: "9", note: "Category F (interested in 6–12 months)" },
      { label: "Coverage rate", value: "100%" },
    ],
  },
  differences: {
    title: "Critical differences",
    items: [
      { title: "Reach rate", text: "Human team reached only 50% of prospects due to time zones and availability. AI system attempts 10 times per contact with optimal timing." },
      { title: "Data quality", text: "AI captures and categorizes every interaction systematically. Manual notes were inconsistent and incomplete." },
      { title: "Efficiency", text: "AI processed 27.8× more leads in the same timeframe while maintaining quality and finding opportunities humans missed." },
    ],
  },
  metrics: {
    title: "Performance metrics comparison",
    rows: [
      { label: "Leads processed", human: 20, ai: 556, format: "count" },
      { label: "Qualified leads", human: 0, ai: 9, format: "count" },
      { label: "Coverage", human: 3.6, ai: 100, format: "percent" },
    ],
  },
  takeaway: {
    title: "Key takeaway",
    text: "The UK prospects case study demonstrates that AI automation doesn't just save time and money — it fundamentally improves lead discovery quality. While the human team found zero interested prospects in their sample, the AI system successfully identified 9 qualified leads from the complete dataset.",
    stats: [
      { value: "27.8×", label: "More leads processed" },
      { value: "100%", label: "Database coverage" },
      { value: "∞", label: "ROI vs 0 results" },
    ],
  },
}
