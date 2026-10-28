import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/**
 * The brand lockup: the mark from the official logo pack, then the name.
 *
 * The mark is the pack's own drawing (Algomotive_Mark.svg), with its gradient
 * and dots taken from the palette tokens rather than restated as hex. The
 * name is live text in the site face, not the pack's outlines: the pack sets
 * it as unoutlined text in a system font, which renders differently on every
 * device, and the company rule is one typeface for everything. Its colour
 * follows `--logo-name`, navy on light grounds and white on navy, which is how
 * the pack's dark and light wordmarks differ.
 *
 * `withSubline` adds the pack's second line ("AI Platform") for places with
 * room for it, like the footer. The header leaves it off: at header size it
 * would be too small to read.
 *
 * `gradientId` must be unique on the page, because the mark's gradient is
 * referenced by id and the lockup appears more than once (header, menu,
 * footer).
 */
export function Logo({
  className,
  withSubline = false,
  gradientId = "logo-gradient",
}: {
  className?: string;
  withSubline?: boolean;
  gradientId?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg aria-hidden="true" viewBox="4 4 124 124" className={cn("shrink-0", withSubline ? "size-11" : "size-8")}>
        <defs>
          <linearGradient id={gradientId} x1="8" y1="116" x2="118" y2="8" gradientUnits="userSpaceOnUse">
            <stop offset="0" style={{ stopColor: "var(--algo-green)" }} />
            <stop offset="0.48" style={{ stopColor: "var(--algo-cyan)" }} />
            <stop offset="1" style={{ stopColor: "var(--algo-violet)" }} />
          </linearGradient>
        </defs>
        <g transform="translate(4 4)">
          <path d="M60 8 116 106H92L78.5 82H41.5L28 106H4L60 8Zm0 43L50 69h20L60 51Z" fill={`url(#${gradientId})`} />
          <circle cx="60" cy="33" r="4" style={{ fill: "var(--algo-cyan)" }} />
          <circle cx="28" cy="106" r="4" style={{ fill: "var(--algo-green)" }} />
          <circle cx="92" cy="106" r="4" style={{ fill: "var(--algo-violet)" }} />
          <circle cx="60" cy="69" r="6" style={{ fill: "var(--algo-white)" }} />
        </g>
      </svg>
      <span className="flex flex-col">
        <span className="font-display text-[1.3125rem] leading-none font-extrabold tracking-[-0.02em] text-(--logo-name)">
          {site.name}
        </span>
        {withSubline ? (
          <span className="mt-1.5 font-display text-[0.6875rem] leading-none font-extrabold tracking-[0.28em] text-(--logo-sub) uppercase">
            {site.logoSubline}
          </span>
        ) : null}
      </span>
    </span>
  );
}
