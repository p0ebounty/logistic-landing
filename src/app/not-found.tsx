import Link from "next/link"

import { typeRole } from "@/components/site/primitives"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="surface-ink grid min-h-dvh place-items-center">
      <div className="shell py-24">
        <p className="font-heading font-semibold text-sodium">Error 404</p>
        <h1 className={`${typeRole.display} mt-4`}>Page not found</h1>
        <p className="mt-6 max-w-[46ch] type-lead text-muted-foreground">
          This address does not exist. Everything about MagnaQore Logistic is on the main page.
        </p>
        <Button asChild size="xl" className="mt-9">
          <Link href="/">Open the main page</Link>
        </Button>
      </div>
    </main>
  )
}
