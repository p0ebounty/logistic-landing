import challengeCalls from "@/assets/images/challenge-calls.webp"
import challengeLeads from "@/assets/images/challenge-leads.webp"
import challengeTenders from "@/assets/images/challenge-tenders.webp"
import productCall from "@/assets/images/product-call.webp"
import productContacts from "@/assets/images/product-contacts.webp"
import productTasks from "@/assets/images/product-tasks.webp"
import { Chapter, ProblemBlock, ResultsBlock, SystemBlock } from "@/components/site/chapter"
import { MarkerList, typeRole } from "@/components/site/primitives"
import { ProductShot } from "@/components/site/product-shot"
import { communication, leadManagement, tenders } from "@/content/landing"
import { cn } from "@/lib/utils"

export function LeadsChapter() {
  return (
    <Chapter id={leadManagement.id} title={leadManagement.title} image={challengeLeads}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <ProblemBlock className="lg:col-span-6">
          {leadManagement.problem.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </ProblemBlock>
        <SystemBlock title="Solution" items={leadManagement.solution} className="self-start lg:col-span-6" />
      </div>
      <ProductShot
        image={productContacts}
        alt="Contacts in MagnaQore Logistic: every lead with its stage, rating and manager"
        caption="Contacts: every lead with its stage, automatic rating and assigned manager"
      />
      <ResultsBlock title={leadManagement.resultsTitle} items={leadManagement.results} />
    </Chapter>
  )
}

export function CallsChapter() {
  return (
    <Chapter id={communication.id} title={communication.title} image={challengeCalls} imageSide="left" tone="warm">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <ProblemBlock className="lg:col-span-5">
          <p>{communication.problem}</p>
          <p className="font-semibold">{communication.limitsIntro}</p>
          <MarkerList tone="stop" items={communication.limits} />
          <p>{communication.limitsOutro}</p>
        </ProblemBlock>

        <div className="lg:col-span-7">
          <h3 className="flex items-center gap-3 font-heading text-base font-semibold text-route">
            <span aria-hidden className="size-3 rounded-[2px] bg-route" />
            {communication.stepsTitle}
          </h3>
          <ol className="mt-6 flex flex-col">
            {communication.steps.map((step, index) => (
              <li key={step.title} className="relative grid grid-cols-[3rem_1fr] gap-x-4 pb-7 last:pb-0">
                {index < communication.steps.length - 1 ? (
                  <span aria-hidden className="absolute top-12 bottom-0 left-6 w-px -translate-x-1/2 bg-route/35" />
                ) : null}
                <span className="grid size-12 place-items-center rounded-full border-2 border-route bg-background font-heading text-sm font-bold text-route tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="pt-2.5">
                  <p className="font-heading text-lg leading-snug font-semibold">{step.title}</p>
                  <p className="mt-1 text-muted-foreground">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <ProductShot
        image={productCall}
        alt="A call in MagnaQore Logistic: recording, transcript, what we know about the client and the call summary"
        caption="Every call is recorded, transcribed, rated and summarized for the manager"
      />

      <div className="grid gap-10 rounded-xl bg-background p-6 ring-1 ring-border md:p-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h3 className={typeRole.title}>{communication.resultTitle}</h3>
          <p className="mt-3 type-lead">{communication.resultLead}</p>
        </div>
        <div className="lg:col-span-7">
          <p className="text-muted-foreground">{communication.mathIntro}</p>
          <dl className="mt-6 grid grid-cols-2 gap-6">
            {communication.math.map((item) => (
              <div key={item.unit} className="flex flex-col gap-1.5 border-t-2 border-stop pt-4">
                <dt className="order-2 font-semibold">{item.unit}</dt>
                <dd className={cn(typeRole.figure, "order-1 text-stop")}>{item.value}</dd>
                <dd className="order-3 text-muted-foreground">{item.note}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 font-heading text-lg leading-snug font-semibold text-route">{communication.resultOutro}</p>
        </div>
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
      <code className="rounded bg-route/10 px-1.5 py-0.5 font-mono text-[0.9em] text-route">{field}</code>
      {after}
    </>
  )
}

export function TendersChapter() {
  return (
    <Chapter id={tenders.id} title={tenders.title} image={challengeTenders}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <ProblemBlock className="lg:col-span-6">
          {tenders.problem.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </ProblemBlock>
        <SystemBlock
          title={tenders.systemTitle}
          items={tenders.system.map(withFieldName)}
          className="self-start lg:col-span-6"
        />
      </div>
      <ProductShot
        image={productTasks}
        alt="Tasks in MagnaQore Logistic: callbacks, chat hand-offs and tender deadlines across all contacts"
        caption={tenders.screenshotCaption}
      />
      <ResultsBlock title={tenders.resultsTitle} items={tenders.results} />
    </Chapter>
  )
}
