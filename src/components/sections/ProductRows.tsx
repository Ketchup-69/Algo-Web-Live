import { Link, Text } from "@/components/ui";
import type { ProductSummary } from "@/content/home";

/**
 * The product line-up as rows on hairlines: name and category on the left,
 * what it does in the middle, the way in on the right. A list to scan, not a
 * wall of cards.
 */
export function ProductRows({ items }: { items: ProductSummary[] }) {
  return (
    <ul className="border-b border-border">
      {items.map((item) => (
        <li
          key={item.name}
          id={item.id}
          className="grid scroll-mt-24 gap-x-10 gap-y-3 border-t border-border py-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)_minmax(0,3fr)] lg:items-baseline"
        >
          <div>
            <h3 className="font-display text-2xl font-bold text-fg">{item.name}</h3>
            <p className="mt-1 text-sm text-fg-muted">{item.category}</p>
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-fg">{item.tagline}</p>
            <Text tone="muted" measure={false} className="mt-2 max-w-[56ch]">
              {item.body}
            </Text>
          </div>
          <Link href={item.link.href} className="text-base font-semibold lg:justify-self-end">
            {item.link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
