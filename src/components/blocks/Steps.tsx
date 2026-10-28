import { cn } from "@/lib/cn";
import { Text } from "@/components/ui";
import type { Item } from "@/content/types";
import { Points } from "./ItemGrid";

const columnClasses = {
  1: "",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

const marker = (item: Item, index: number) => item.marker ?? String(index + 1).padStart(2, "0");

/**
 * A real sequence: workflow stages, weeks, layers, the order controls apply
 * in. The one place numbered markers are allowed (§4); anything without an
 * order belongs in ItemGrid.
 */
export function Steps({
  items,
  columns = 3,
  layout = "grid",
  className,
}: {
  items: Item[];
  columns?: keyof typeof columnClasses;
  /** `rows`: one step per line, its marker in a column of its own. For long steps. */
  layout?: "grid" | "rows";
  className?: string;
}) {
  if (layout === "rows") {
    return (
      <ol className={cn("flex flex-col", className)}>
        {items.map((item, index) => (
          <li
            key={item.title}
            className="grid gap-x-10 gap-y-3 border-t border-border-strong py-8 md:grid-cols-[minmax(0,3fr)_minmax(0,7fr)]"
          >
            <span className="font-data text-sm font-semibold text-fg-muted">{marker(item, index)}</span>
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
    <ol className={cn("grid gap-x-10 gap-y-12", columnClasses[columns], className)}>
      {items.map((item, index) => (
        <li key={item.title} className="border-t border-border-strong pt-5">
          <span className="font-data text-sm font-semibold text-fg-muted">{marker(item, index)}</span>
          <h3 className="mt-3 font-display text-xl font-semibold text-balance text-fg">{item.title}</h3>
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
 * run of numbered stops, read left to right and wrapping.
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
      <ol className={cn("grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3", label && "mt-5")}>
        {items.map((item, index) => (
          <li key={item.title} className="flex items-baseline gap-4 border-t border-border py-3.5">
            <span className="font-data w-6 shrink-0 text-sm font-semibold text-fg-muted">{marker(item, index)}</span>
            <span className="text-base font-medium text-fg">{item.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
