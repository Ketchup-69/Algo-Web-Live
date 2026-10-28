import { Link, Text } from "@/components/ui";
import type { Related } from "@/content/types";

/** Where to go next from this page: three onward paths, each with its reason. */
export function RelatedLinks({ items }: { items: Related[] }) {
  return (
    <ul className="grid gap-x-10 gap-y-10 md:grid-cols-3">
      {items.map((item) => (
        <li key={item.title} className="flex flex-col border-t border-border pt-6">
          <h3 className="font-display text-lg font-semibold text-fg">{item.title}</h3>
          <Text tone="muted" measure={false} className="mt-2.5 flex-1">
            {item.body}
          </Text>
          <Link href={item.link.href} className="mt-5 self-start text-base font-semibold">
            {item.link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
