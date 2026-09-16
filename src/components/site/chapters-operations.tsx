import challengeCalls from "@/assets/images/challenge-calls.webp"
import challengeLeads from "@/assets/images/challenge-leads.webp"
import challengeTenders from "@/assets/images/challenge-tenders.webp"
import productCall from "@/assets/images/product-call.webp"
import productContacts from "@/assets/images/product-contacts.webp"
import productTasks from "@/assets/images/product-tasks.webp"
import { Chapter, ChapterStep, ProblemBlock, ResultsBlock, SystemBlock, type Screen } from "@/components/site/chapter"
import { MarkerList, typeRole } from "@/components/site/primitives"
import { communication, leadManagement, tenders } from "@/content/landing"

const contactsScreen: Screen = {
  image: productContacts,
  alt: "Contacts in MagnaQore Logistic: every lead with its stage, rating and manager",
  caption: "Contacts: every lead with its stage, automatic rating and assigned manager",
}

const callScreen: Screen = {
  image: productCall,
  alt: "A call in MagnaQore Logistic: recording, transcript, what we know about the client and the call summary",
  caption: "Every call is recorded, transcribed, rated and summarized for the manager",
}

const tasksScreen: Screen = {
  image: productTasks,
  alt: "Tasks in MagnaQore Logistic: callbacks, chat hand-offs and tender deadlines across all contacts",
  caption: tenders.screenshotCaption,
}

export function LeadsChapter() {
  return (
    <Chapter id={leadManagement.id} title={leadManagement.title} photo={challengeLeads} screens={[contactsScreen]}>
      <ProblemBlock>
        {leadManagement.problem.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </ProblemBlock>
      <ChapterStep screen={contactsScreen}>
        <SystemBlock title="Solution" items={leadManagement.solution} />
      </ChapterStep>
      <ResultsBlock title={leadManagement.resultsTitle} items={leadManagement.results} />
    </Chapter>
  )
}

export function CallsChapter() {
  return (
    <Chapter id={communication.id} title={communication.title} photo={challengeCalls} screens={[callScreen]}>
      <ProblemBlock>
        <p>{communication.problem}</p>
        <p className="font-semibold">{communication.limitsIntro}</p>
        <MarkerList tone="stop" items={communication.limits} />
        <p>{communication.limitsOutro}</p>
      </ProblemBlock>

      <ChapterStep screen={callScreen}>
        <div>
          <h3 className="flex gap-3 font-heading text-base font-semibold text-go">
            <span aria-hidden className="mt-[calc(0.5lh-1px)] h-0.5 w-6 shrink-0 bg-go" />
            {communication.stepsTitle}
          </h3>
          <ol className="mt-6 border-b border-border">
            {communication.steps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[3.25rem_1fr] gap-x-3 border-t border-border py-5">
                <span className="font-heading text-[1.75rem] leading-none font-bold text-sodium-deep stretch-75">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-heading text-lg leading-snug font-semibold">{step.title}</p>
                  <p className="mt-1 text-graphite">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </ChapterStep>

      <div className="surface-ink rounded-[1.5rem] p-7 md:p-10">
        <h3 className={typeRole.title}>{communication.resultTitle}</h3>
        <p className="mt-3 type-lead">{communication.resultLead}</p>
        <p className="mt-8 text-muted-foreground">{communication.mathIntro}</p>
        <dl className="mt-6 grid grid-cols-2 gap-6">
          {communication.math.map((item) => (
            <div key={item.unit} className="flex flex-col border-t border-border pt-5">
              <dt className="order-2 mt-3 leading-snug font-semibold">{item.unit}</dt>
              <dd className="order-1 font-heading text-[clamp(3.5rem,2.4rem+3.2vw,6rem)] leading-[0.84] font-[780] text-stop-bright stretch-75">
                {item.value}
              </dd>
              <dd className="order-3 text-muted-foreground">{item.note}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 font-heading text-lg leading-snug font-semibold text-go-bright">{communication.resultOutro}</p>
      </div>
    </Chapter>
  )
}

function withFieldName(item: string) {
  const field = "tender_window"
  if (!item.includes(field)) return item
  const [before, after] = item.split(field)
  return (
    <>
      {before}
      <code className="rounded-md bg-background px-1.5 py-0.5 font-mono text-[0.88em] text-go">{field}</code>
      {after}
    </>
  )
}

export function TendersChapter() {
  return (
    <Chapter id={tenders.id} title={tenders.title} photo={challengeTenders} screens={[tasksScreen]}>
      <ProblemBlock>
        {tenders.problem.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </ProblemBlock>
      <ChapterStep screen={tasksScreen}>
        <SystemBlock title={tenders.systemTitle} items={tenders.system.map(withFieldName)} />
      </ChapterStep>
      <ResultsBlock title={tenders.resultsTitle} items={tenders.results} />
    </Chapter>
  )
}
