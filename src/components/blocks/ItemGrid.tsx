import { cn } from "@/lib/cn";
import { Text } from "@/components/ui";
import type { Item } from "@/content/types";

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

/**
 * Parallel features or principles: no order, no numbers. Each sits under a
 * hairline rather than in a card, so a page of them reads as one surface
 * (§4: not every section an identical rounded card).
 */
export function ItemGrid({
  items,
  columns = 3,
  className,
}: {
  items: Item[];
  columns?: keyof typeof columnClasses;
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-x-10 gap-y-10", columnClasses[columns], className)}>
      {items.map((item) => (
        <li key={item.title} className="border-t border-border pt-6">
          <h3 className="font-display text-lg font-semibold text-fg">{item.title}</h3>
          {item.body ? (
            <Text tone="muted" measure={false} className="mt-2.5">
              {item.body}
            </Text>
          ) : null}
          {item.points?.length ? <Points points={item.points} /> : null}
        </li>
      ))}
    </ul>
  );
}

/** The short supporting phrases under an item: quiet, one per line. */
export function Points({ points, className }: { points: string[]; className?: string }) {
  return (
    <ul className={cn("mt-4 flex flex-col gap-1.5 text-sm text-fg-muted", className)}>
      {points.map((point) => (
        <li key={point} className="flex gap-2.5">
          <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-border-strong" />
          {point}
        </li>
      ))}
    </ul>
  );
}
