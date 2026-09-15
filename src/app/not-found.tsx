import Link from "next/link"

import { typeRole } from "@/components/site/primitives"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="surface-ink grid min-h-dvh place-items-center">
      <div className="shell py-24">
        <p className="text-on-ink-muted">Error 404</p>
        <h1 className={typeRole.display}>Page not found</h1>
        <p className="mt-5 max-w-[46ch] type-lead text-on-ink-muted">
          This address does not exist. Everything about MagnaQore Logistic is on the main page.
        </p>
        <Button asChild size="xl" className="mt-9">
          <Link href="/">Open the main page</Link>
        </Button>
      </div>
    </main>
  )
}
