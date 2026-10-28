import { cn } from "@/lib/cn";
import { systemsWell as data } from "@/content/product/wells";
import { Icon } from "./Icon";
import { Well } from "./Well";

/**
 * How each row of tiles sits in the well, nearest first: where it starts, how
 * big its type is, and how far it has faded into the distance.
 */
const ROWS = [
  { top: 176, size: 15, gap: 12, className: "" },
  { top: 120, size: 12.5, gap: 10, className: "opacity-55" },
  { top: 72, size: 11, gap: 9, className: "opacity-30 blur-[calc(var(--u)*1.2)]" },
] as const;

/**
 * The third well: the systems the agent works with, as generic tiles in three
 * rows that thin out and blur as they recede, and the confirmation that the
 * entry landed. Categories only, never a vendor's name or mark (§2).
 */
export function SystemsWell({ maxScale, className }: { maxScale?: number; className?: string }) {
  return (
    <Well label={data.alt} maxScale={maxScale} className={className}>
      {ROWS.map((row, index) => (
        <div
          key={row.top}
          className={cn("absolute inset-x-0 flex justify-center", row.className)}
          style={{ top: `calc(var(--u) * ${row.top})`, gap: `calc(var(--u) * ${row.gap})` }}
        >
          {data.rows[index]?.map((name) => (
            <span
              key={name}
              className="rounded-u-8 border-[length:var(--u)] border-ui-card-line bg-ui-sheet font-bold whitespace-nowrap text-ui-slate"
              style={{
                fontSize: `calc(var(--u) * ${row.size})`,
                padding: `calc(var(--u) * ${row.size * 0.6}) calc(var(--u) * ${row.size})`,
              }}
            >
              {name}
            </span>
          ))}
        </div>
      ))}

      <div className="absolute top-[calc(var(--u)*275.02)] left-[calc(var(--u)*185.81)] flex h-[calc(var(--u)*29.317)] w-[calc(var(--u)*188.115)] items-center justify-center gap-[calc(var(--u)*12.215)] rounded-[calc(var(--u)*4.886)] border-[length:calc(var(--u)*0.611)] border-ui-pill-line bg-bg whitespace-nowrap">
        <Icon name="check" className="size-[calc(var(--u)*19)] text-ui-match" />
        <span className="text-[length:calc(var(--u)*14.658)] font-bold text-ui-slate">{data.posted}</span>
      </div>
    </Well>
  );
}
