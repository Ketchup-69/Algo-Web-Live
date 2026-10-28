import { cn } from "@/lib/cn";

/**
 * Short phrases with no order and no body: the exceptions a product surfaces,
 * the measures it is judged on, principles. Ruled, in columns.
 */
export function TermList({
  label,
  items,
  className,
}: {
  label?: string;
  items: readonly string[];
  className?: string;
}) {
  return (
    <div className={className}>
      {label ? <h3 className="font-display text-base font-semibold text-fg">{label}</h3> : null}
      <ul className={cn("grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3", label && "mt-5")}>
        {items.map((item) => (
          <li key={item} className="border-t border-border py-3.5 text-base text-fg">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
