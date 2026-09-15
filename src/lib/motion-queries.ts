/** Motion runs only for people who have not asked for reduced motion; everyone else gets the final state. */
export const MOTION = "(prefers-reduced-motion: no-preference)"

/** Pinned and horizontal scenes need the room of a laptop screen; phones get the stacked layout. */
export const WIDE = "(min-width: 64rem)"
