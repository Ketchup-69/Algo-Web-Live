import { cn } from "@/lib/cn";
import { collections as data } from "@/content/product/dashboard";
import { AgentNote, Chip, dash } from "./Dash";
import { Stage } from "./Stage";

/** Drawn at 720 wide (stacked: 340) in the product dashboard's language; the
    dashboard has no receivables screen, so this one is the site's. */
const WIDTH = 720;
const STACKED = 340;
const GRID =
  "grid grid-cols-[calc(var(--u)*150)_calc(var(--u)*88)_calc(var(--u)*60)_calc(var(--u)*160)_minmax(0,1fr)] items-center gap-x-14";

/**
 * A collections worklist ranked by approved criteria. The top account is open:
 * the agent has prepared its follow-up, which waits for the account owner.
 * Static: a picture of the moment a person decides.
 */
export function CollectionsList({ className }: { className?: string }) {
  const focus = data.focus;
  return (
    <>
      <Stage width={WIDTH} maxScale={1.2} label={data.alt} className={cn("hidden sm:block", className)}>
        <div className="card overflow-hidden">
          <div className="px-22 pt-18 pb-14">
            <div className={dash.title}>{data.title}</div>
            <div className={cn(dash.label, "mt-3")}>{data.rule}</div>
          </div>
          <div className={cn(dash.head, GRID, "px-22")}>
            {data.columns.map((column, index) => (
              <span key={column} className={index === 1 ? "justify-self-end" : undefined}>
                {column}
              </span>
            ))}
          </div>

          <div className={cn(dash.rowTint, "mx-8 mt-8 mb-4 pt-12 pb-14")}>
            <div className={cn(GRID, "px-14")}>
              <div>
                <div className={dash.strong}>{focus.name}</div>
                <div className={dash.sub}>{focus.owner}</div>
              </div>
              <span className={cn(dash.value, "justify-self-end")}>{focus.open}</span>
              <span className="font-data fs-u-12 font-medium text-ui-value">{focus.oldest}</span>
              <div className="flex flex-col items-start">
                <Chip chip={focus.chip} />
                <span className={cn(dash.sub, "font-data")}>{focus.detail}</span>
              </div>
              <div>
                <Chip chip={focus.next} />
              </div>
            </div>
            <div className="mx-14 mt-12 flex items-center gap-12">
              <AgentNote className="flex-1">{focus.note}</AgentNote>
              <span className={cn(dash.button, dash.primary)}>{focus.button}</span>
            </div>
          </div>

          <div className={dash.crop}>
            {data.rows.map((row) => (
              <div key={row.name} className={cn(GRID, "border-t border-border px-22 py-11 first:border-t-0")}>
                <div>
                  <div className={dash.strong}>{row.name}</div>
                  <div className={dash.sub}>{row.owner}</div>
                </div>
                <span className={cn(dash.value, "justify-self-end")}>{row.open}</span>
                <span className="font-data fs-u-12 font-medium text-ui-value">{row.oldest}</span>
                <div className="flex flex-col items-start">
                  <Chip chip={row.chip} />
                  <span className={cn(dash.sub, "font-data")}>{row.detail}</span>
                </div>
                <span className="fs-u-12 font-medium text-ui-value">{row.next}</span>
              </div>
            ))}
          </div>
        </div>
      </Stage>

      <Stage width={STACKED} label={data.altStacked} className={cn("sm:hidden", className)}>
        <div className="card overflow-hidden">
          <div className="px-16 pt-16 pb-10">
            <div className={dash.title}>{data.title}</div>
          </div>
          <div className={cn(dash.rowTint, "mx-8 p-12")}>
            <div className="flex items-baseline justify-between gap-10">
              <span className={dash.strong}>{focus.name}</span>
              <span className={dash.value}>
                <span className={dash.currency}>{data.currency}</span>
                {focus.open}
              </span>
            </div>
            <div className={dash.sub}>{focus.stacked}</div>
            <div className="mt-10 flex flex-wrap gap-6">
              <Chip chip={focus.chip} />
              <Chip chip={focus.next} />
            </div>
            <AgentNote className="mt-12">{focus.note}</AgentNote>
            <span className={cn(dash.button, dash.primary, "mt-10 flex w-full")}>{focus.button}</span>
          </div>
          <div className={dash.crop}>
            {data.rows.slice(0, 2).map((row) => (
              <div key={row.name} className="border-t border-border px-16 py-12 first:border-t-0">
                <div className="flex items-baseline justify-between gap-10">
                  <span className={dash.strong}>{row.name}</span>
                  <span className={dash.value}>{row.open}</span>
                </div>
                <div className={dash.sub}>{row.stacked}</div>
                <Chip chip={row.chip} className="mt-8" />
              </div>
            ))}
          </div>
        </div>
      </Stage>
    </>
  );
}
