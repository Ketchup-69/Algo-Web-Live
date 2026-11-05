import { cn } from "@/lib/cn";
import { iconFor } from "@/lib/icon-for";
import { Text } from "@/components/ui";
import { FeatureIcon, toneAt } from "@/components/ui/FeatureIcon";
import type { Item } from "@/content/types";

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * Parallel features or principles: no order, no numbers. Three treatments, so
 * a page of them never reads as the same rounded card over and over (§4):
 *
 *   rule    under a hairline, icon beside the title. The quiet default.
 *   cards   separate dashboard cards that lift on hover.
 *   panel   one card holding the set, divided by hairlines, like a
 *           dashboard table.
 *
 * Every item carries an icon: its own `icon`, or one picked from its words.
 */
export function ItemGrid({
  items,
  columns = 3,
  variant = "rule",
  className,
}: {
  items: Item[];
  columns?: keyof typeof columnClasses;
  variant?: "rule" | "cards" | "panel";
  className?: string;
}) {
  if (variant === "panel") {
    return (
      <ul
        data-reveal="cards"
        className={cn(
          "site-card grid overflow-hidden",
          columnClasses[columns],
          "[&>li]:border-border [&>li]:border-b sm:[&>li]:border-r",
          className,
        )}
      >
        {items.map((item, index) => (
          <li key={item.title} className="-mr-px -mb-px p-6 sm:p-7">
            <FeatureIcon name={item.icon ?? iconFor(item.title, item.body)} tone={toneAt(index)} />
            <h3 className="mt-5 font-display text-lg font-semibold text-fg">{item.title}</h3>
            {item.body ? (
              <Text tone="muted" measure={false} className="mt-2">
                {item.body}
              </Text>
            ) : null}
            {item.points?.length ? <Points points={item.points} /> : null}
          </li>
        ))}
      </ul>
    );
  }

  if (variant === "cards") {
    return (
      <ul data-reveal="cards" className={cn("grid gap-4 sm:gap-5", columnClasses[columns], className)}>
        {items.map((item, index) => (
          <li key={item.title} className="site-card lift p-6 sm:p-7">
            <FeatureIcon name={item.icon ?? iconFor(item.title, item.body)} tone={toneAt(index)} />
            <h3 className="mt-5 font-display text-lg font-semibold text-fg">{item.title}</h3>
            {item.body ? (
              <Text tone="muted" measure={false} className="mt-2">
                {item.body}
              </Text>
            ) : null}
            {item.points?.length ? <Points points={item.points} /> : null}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul data-reveal="cards" className={cn("grid gap-x-10 gap-y-10", columnClasses[columns], className)}>
      {items.map((item, index) => (
        <li key={item.title} className="relative pt-6">
          <span aria-hidden="true" data-rail="" className="absolute inset-x-0 top-0 h-px bg-border" />
          <div className="flex items-start gap-4">
            <FeatureIcon name={item.icon ?? iconFor(item.title, item.body)} tone={toneAt(index)} size="sm" className="mt-0.5" />
            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold text-fg">{item.title}</h3>
              {item.body ? (
                <Text tone="muted" measure={false} className="mt-2">
                  {item.body}
                </Text>
              ) : null}
              {item.points?.length ? <Points points={item.points} /> : null}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * The short supporting phrases under an item, one per line, each led by a
 * small tick in a soft brand tint (owner decision, 5 Nov 2026: no dashes).
 */
export function Points({ points, className }: { points: string[]; className?: string }) {
  return (
    <ul className={cn("mt-4 flex flex-col gap-2 text-sm text-fg-muted", className)}>
      {points.map((point) => (
        <li key={point} className="flex items-start gap-2.5">
          <span
            aria-hidden="true"
            className="mt-[0.15em] flex size-[1.125rem] shrink-0 items-center justify-center rounded-full bg-tile-cyan text-fg"
          >
            <svg viewBox="0 -960 960 960" fill="currentColor" className="size-3">
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          </span>
          {point}
        </li>
      ))}
    </ul>
  );
}
