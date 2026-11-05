import { cn } from "@/lib/cn";
import { iconFor } from "@/lib/icon-for";
import { FeatureIcon, type IconTone } from "@/components/ui/FeatureIcon";

/**
 * Short phrases with no order and no body: the exceptions a product surfaces,
 * the measures it is judged on, principles. Each carries an icon.
 *
 *   rule    ruled, in columns. The quiet default.
 *   checks  one card, rows divided by hairlines, as the dashboard lists what
 *           the AI checked. For lists a person acts on, such as exceptions.
 *   chips   soft tiles that wrap. For short labels such as measures.
 */
export function TermList({
  label,
  items,
  variant = "rule",
  tone = "cyan",
  className,
}: {
  label?: string;
  items: readonly string[];
  variant?: "rule" | "checks" | "chips";
  tone?: IconTone;
  className?: string;
}) {
  const heading = label ? <h3 className="font-display text-base font-semibold text-fg">{label}</h3> : null;

  if (variant === "checks") {
    return (
      <div className={className}>
        {heading}
        <ul
          data-reveal="cards"
          className={cn(
            "site-card grid grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-3",
            "[&>li]:border-b [&>li]:border-border sm:[&>li]:border-r",
            label && "mt-5",
          )}
        >
          {items.map((item) => (
            <li key={item} className="-mr-px -mb-px flex items-center gap-3.5 px-5 py-4 text-base font-medium text-fg">
              <FeatureIcon name={iconFor(item)} tone={tone} size="sm" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (variant === "chips") {
    return (
      <div className={className}>
        {heading}
        <ul data-reveal="cards" className={cn("flex flex-wrap gap-2.5", label && "mt-5")}>
          {items.map((item) => (
            <li
              key={item}
              className="site-card lift inline-flex items-center gap-2.5 rounded-full py-2 pr-4 pl-2 text-sm font-medium text-fg"
            >
              <FeatureIcon name={iconFor(item)} tone={tone} size="sm" className="rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={className}>
      {heading}
      <ul data-reveal="cards" className={cn("grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3", label && "mt-5")}>
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3.5 border-t border-border py-3.5 text-base text-fg">
            <FeatureIcon name={iconFor(item)} tone={tone} bare className="size-5 text-fg-muted" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
