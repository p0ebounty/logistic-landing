import { CellValue } from "@/components/site/primitives"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { MatrixRow } from "@/content/landing"
import { cn } from "@/lib/utils"

type Column = { id: string; term: string; calls: string; recommended?: boolean; inHouse?: boolean }
type Group = { title?: string; rows: MatrixRow[] }

/** Package comparison: a full table with a header that follows the reader from lg, one package at a time in tabs below. */
export function PlanMatrix({
  caption,
  rowHeader,
  columns,
  groups,
  recommendedLabel = "Recommended",
  surfaceClassName = "bg-background",
}: {
  caption: string
  rowHeader: string
  columns: readonly Column[]
  groups: readonly Group[]
  recommendedLabel?: string
  surfaceClassName?: string
}) {
  const recommendedIndex = columns.findIndex((column) => column.recommended)
  const defaultTab = columns[Math.max(recommendedIndex, 0)].id

  return (
    <>
      <table className="hidden w-full border-collapse text-[0.95rem] lg:table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th
              scope="col"
              className={cn(
                "sticky top-(--header-offset) z-10 w-[24%] border-b border-asphalt py-4 pr-4 text-left align-bottom font-medium text-graphite transition-[top] duration-700 ease-expo",
                surfaceClassName
              )}
            >
              {rowHeader}
            </th>
            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className={cn(
                  "sticky top-(--header-offset) z-10 border-b border-asphalt px-4 py-4 text-left align-bottom transition-[top] duration-700 ease-expo",
                  surfaceClassName,
                  column.recommended && "shadow-[inset_0_3px_0_var(--color-sodium)]"
                )}
              >
                {column.recommended ? (
                  <Badge className="mb-2 bg-sodium text-asphalt">{recommendedLabel}</Badge>
                ) : null}
                <span className="flex items-center gap-2 font-heading text-lg leading-tight font-bold stretch-112">
                  {column.inHouse ? <span aria-hidden className="h-0.5 w-4 bg-stop" /> : null}
                  {column.term}
                </span>
                <span className="block text-sm font-medium text-graphite">{column.calls}</span>
              </th>
            ))}
          </tr>
        </thead>
        {groups.map((group, groupIndex) => (
          <tbody key={group.title ?? groupIndex}>
            {group.title ? (
              <tr>
                <th
                  scope="colgroup"
                  colSpan={columns.length + 1}
                  className="pt-12 pb-3 text-left font-heading type-title font-semibold stretch-112"
                >
                  {group.title}
                </th>
              </tr>
            ) : null}
            {group.rows.map((row) => (
              <tr key={row.label} className="border-b border-border transition-colors hover:bg-foreground/[0.03]">
                <th scope="row" className={cn("py-3.5 pr-4 text-left align-top font-medium", row.emphasis && "font-bold")}>
                  {row.label}
                  {row.note ? <span className="mt-1 block text-sm font-normal text-sodium-deep">{row.note}</span> : null}
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={index}
                    className={cn(
                      "px-4 py-3.5 align-top",
                      index === recommendedIndex && "bg-sodium/10",
                      columns[index]?.inHouse && typeof value === "string" && "text-stop",
                      row.emphasis && "font-heading text-lg font-bold"
                    )}
                  >
                    <CellValue cell={value} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>

      <Tabs defaultValue={defaultTab} className="lg:hidden">
        <TabsList
          aria-label="Choose a package"
          className="grid w-full grid-cols-2 gap-1 rounded-2xl p-1 group-data-horizontal/tabs:h-auto"
        >
          {columns.map((column) => (
            <TabsTrigger
              key={column.id}
              value={column.id}
              className="h-auto flex-col items-start gap-0 rounded-xl px-3 py-2 text-left whitespace-normal"
            >
              <span className="font-semibold">{column.term}</span>
              <span className="text-xs text-muted-foreground">{column.calls}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {columns.map((column, columnIndex) => (
          <TabsContent key={column.id} value={column.id} forceMount className="mt-3 text-base data-[state=inactive]:hidden">
            {column.recommended ? <Badge className="bg-sodium text-asphalt">{recommendedLabel}</Badge> : null}
            {groups.map((group, groupIndex) => (
              <div key={group.title ?? groupIndex} className="mt-6">
                {group.title ? <p className="font-heading text-lg font-semibold stretch-112">{group.title}</p> : null}
                <dl className="mt-2 divide-y divide-border border-y border-border">
                  {group.rows.map((row) => (
                    <div key={row.label} className="flex items-start justify-between gap-4 py-3">
                      <dt className={cn("text-[0.95rem]", row.emphasis && "font-bold")}>
                        {row.label}
                        {row.note ? <span className="mt-0.5 block text-sm text-sodium-deep">{row.note}</span> : null}
                      </dt>
                      <dd
                        className={cn(
                          "max-w-[55%] text-right",
                          column.inHouse && typeof row.values[columnIndex] === "string" && "text-stop",
                          row.emphasis && "font-heading text-lg font-bold"
                        )}
                      >
                        <CellValue cell={row.values[columnIndex]} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}
