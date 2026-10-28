import type { SystemCategory } from "@/content/platform";

/**
 * The system categories as a ruled grid of plain type: generic names, never a
 * vendor's name or mark (§2). The gap is the rule: the list's ground is the
 * hairline colour and each tile paints over it.
 */
export function SystemTiles({ items }: { items: SystemCategory[] }) {
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-5">
      {items.map((item) => (
        <li key={item.short} className="flex h-20 items-center justify-center bg-bg px-4 text-center sm:h-24">
          <span className="font-display text-base font-semibold text-fg">{item.short}</span>
        </li>
      ))}
    </ul>
  );
}
