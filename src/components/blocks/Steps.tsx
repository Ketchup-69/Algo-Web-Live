import { cn } from "@/lib/cn";
import { iconFor } from "@/lib/icon-for";
import { Text } from "@/components/ui";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import type { Item } from "@/content/types";
import { Points } from "./ItemGrid";

const columnClasses = {
  1: "",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

const marker = (item: Item, index: number) => item.marker ?? String(index + 1).padStart(2, "0");

/** A numbered marker counts in as its step arrives; a named one ("Week 1") does not. */
const Marker = ({ item, index, className }: { item: Item; index: number; className?: string }) => (
  <span
    data-count={item.marker ? undefined : index + 1}
    className={cn("font-data text-sm font-semibold text-fg-muted tabular-nums", className)}
  >
    {marker(item, index)}
  </span>
);

/**
 * A real sequence: workflow stages, weeks, layers, the order controls apply
 * in. The one place numbered markers are allowed (§4); anything without an
 * order belongs in ItemGrid.
 *
 *   grid   cards in reading order, a gradient rail drawn across each top as
 *          it arrives, the number counting in.
 *   rows   one step per line, its marker in a column of its own. For long steps.
 */
export function Steps({
  items,
  columns = 3,
  layout = "grid",
  className,
}: {
  items: Item[];
  columns?: keyof typeof columnClasses;
  layout?: "grid" | "rows";
  className?: string;
}) {
  if (layout === "rows") {
    return (
      <ol data-reveal="sequence" className={cn("flex flex-col", className)}>
        {items.map((item, index) => (
          <li
            key={item.title}
            data-reveal-item=""
            className="relative grid gap-x-10 gap-y-4 py-8 md:grid-cols-[minmax(0,3fr)_minmax(0,7fr)]"
          >
            <span aria-hidden="true" data-rail="" className="hairline-brand absolute inset-x-0 top-0 opacity-70" />
            <div className="flex items-center gap-4">
              <FeatureIcon name={item.icon ?? iconFor(item.title, item.body)} tone="navy" />
              <Marker item={item} index={index} />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-balance text-fg">{item.title}</h3>
              {item.body ? (
                <Text tone="muted" className="mt-3 max-w-[62ch]">
                  {item.body}
                </Text>
              ) : null}
              {item.points?.length ? <Points points={item.points} /> : null}
            </div>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol data-reveal="sequence" className={cn("grid gap-4 sm:gap-5", columnClasses[columns], className)}>
      {items.map((item, index) => (
        <li key={item.title} data-reveal-item="" className="site-card lift p-6">
          <span aria-hidden="true" data-rail="" className="hairline-brand absolute inset-x-5 -top-px" />
          <div className="flex items-center justify-between gap-3">
            <FeatureIcon name={item.icon ?? iconFor(item.title, item.body)} tone={index === items.length - 1 ? "green" : "cyan"} />
            <Marker item={item} index={index} />
          </div>
          <h3 className={cn("mt-5 font-display font-semibold text-balance text-fg", item.body ? "text-xl" : "text-lg leading-snug")}>
            {item.title}
          </h3>
          {item.body ? (
            <Text tone="muted" measure={false} className="mt-3">
              {item.body}
            </Text>
          ) : null}
          {item.points?.length ? <Points points={item.points} /> : null}
        </li>
      ))}
    </ol>
  );
}

/**
 * A sequence of short names with no bodies — a trace, a lifecycle. Set as a
 * run of numbered stops joined by a line, read left to right and wrapping.
 */
export function Trace({
  label,
  items,
  className,
}: {
  label?: string;
  items: Item[];
  className?: string;
}) {
  return (
    <div className={className}>
      {label ? <h3 className="font-display text-base font-semibold text-fg">{label}</h3> : null}
      <ol data-reveal="sequence" className={cn("grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3", label && "mt-5")}>
        {items.map((item, index) => (
          <li key={item.title} data-reveal-item="" className="relative flex items-center gap-3.5 py-3">
            <span aria-hidden="true" data-rail="" className="absolute inset-x-0 top-0 h-px bg-border" />
            <FeatureIcon name={item.icon ?? iconFor(item.title)} tone={index % 2 ? "violet" : "cyan"} size="sm" />
            <Marker item={item} index={index} className="w-6 shrink-0" />
            <span className="text-base font-medium text-fg">{item.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
