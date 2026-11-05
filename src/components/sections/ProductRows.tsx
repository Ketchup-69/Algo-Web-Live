import NextLink from "next/link";
import { cn } from "@/lib/cn";
import { FeatureIcon, type FeatureIconName } from "@/components/ui/FeatureIcon";
import type { ProductSummary } from "@/content/home";

/** Each agent's glyph, by name. */
const ICONS: Record<string, FeatureIconName> = {
  AlgoPay: "payments",
  AlgoPO: "inventory_2",
  AlgoCash: "account_balance_wallet",
  "AlgoCapital AI": "query_stats",
  "Custom AI Solutions": "build",
};
const TONES = ["navy", "cyan", "violet", "green", "cyan"] as const;

/**
 * The AI agents as cards. The first (AlgoPay, owner decision 5 Nov 2026)
 * takes two columns; the whole card is the link, so it lifts as one.
 */
export function ProductRows({ items }: { items: ProductSummary[] }) {
  return (
    <ul data-reveal="cards" className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {items.map((item, index) => (
        <li
          key={item.name}
          id={item.id}
          className={cn("site-card lift group relative flex scroll-mt-24 flex-col p-6 sm:p-7", index === 0 && "sm:col-span-2")}
        >
          <div className="flex items-center gap-4">
            <FeatureIcon name={ICONS[item.name] ?? "psychology"} tone={TONES[index % TONES.length]} size="lg" />
            <div>
              <h3 className="font-display text-2xl font-bold text-fg">{item.name}</h3>
              <p className="text-sm text-fg-muted">{item.category}</p>
            </div>
          </div>
          <p className="mt-6 font-display text-lg font-semibold text-fg">{item.tagline}</p>
          <p className="mt-2 max-w-[56ch] text-base text-fg-muted">{item.body}</p>
          <NextLink
            href={item.link.href}
            className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-fg underline decoration-border-strong underline-offset-4 after:absolute after:inset-0 after:rounded-[inherit] group-hover:decoration-fg focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring"
          >
            {item.link.label}
          </NextLink>
        </li>
      ))}
    </ul>
  );
}
