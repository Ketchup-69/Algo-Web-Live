import { cn } from "@/lib/cn";
import { FeatureIcon, toneAt, type FeatureIconName } from "@/components/ui/FeatureIcon";
import type { SystemCategory } from "@/content/platform";

const ICONS: Record<string, FeatureIconName> = {
  ERP: "account_tree",
  Finance: "account_balance",
  Procurement: "inventory_2",
  CRM: "groups",
  Payments: "payments",
  Documents: "description",
  Data: "database",
  Communication: "mail",
  Cloud: "cloud_sync",
  "Custom APIs": "api",
};

/**
 * The system categories as tiles: generic names only, never a vendor's name
 * or mark (§2). Each has its icon and a quiet "connected" light that pulses
 * in turn, so the grid reads as live connections, not a table.
 */
export function SystemTiles({ items }: { items: SystemCategory[] }) {
  return (
    <ul data-reveal="cards" className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      {items.map((item, index) => (
        <li key={item.short} className="site-card lift flex items-center gap-3 p-4 pr-6 sm:p-5 sm:pr-7">
          <FeatureIcon name={ICONS[item.short] ?? "hub"} tone={toneAt(index)} />
          <span className="min-w-0 flex-1 font-display text-[0.9375rem] font-semibold break-words text-fg">{item.short}</span>
          <span
            aria-hidden="true"
            className={cn("sys-live absolute top-3 right-3 size-2 rounded-full bg-[var(--algo-green)]")}
            style={{ animationDelay: `${index * 0.35}s` }}
          />
        </li>
      ))}
    </ul>
  );
}
