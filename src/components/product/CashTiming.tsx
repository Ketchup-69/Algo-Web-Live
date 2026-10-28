import { cn } from "@/lib/cn";
import { cashTiming as data } from "@/content/product/dashboard";
import { AgentNote, Chip, dash } from "./Dash";
import { Stage } from "./Stage";

/** Drawn at 640 wide (stacked: 340) in the product dashboard's language; the
    dashboard has no cash screen, so this one is the site's. */
const WIDTH = 640;
const STACKED = 340;
const GRID = "grid grid-cols-[minmax(0,1fr)_calc(var(--u)*118)_calc(var(--u)*118)_calc(var(--u)*118)] items-center gap-x-14";

/**
 * Five weeks of expected customer receipts against approved supplier
 * payments. One week is flagged: receipts arriving later than their terms
 * open a timing gap, and the agent has prepared the decision for the finance
 * lead. Static: plain amounts on one sample business, no trend.
 */
export function CashTiming({ className }: { className?: string }) {
  return (
    <>
      <Stage width={WIDTH} maxScale={1.25} label={data.alt} className={cn("hidden sm:block", className)}>
        <div className="card overflow-hidden">
          <div className="px-22 pt-18 pb-14">
            <div className={dash.title}>{data.title}</div>
            <div className={cn(dash.label, "mt-3")}>{data.rule}</div>
          </div>
          <div className={cn(dash.head, GRID, "px-22")}>
            {data.columns.map((column, index) => (
              <span key={column} className={index > 0 ? "justify-self-end" : undefined}>
                {column}
              </span>
            ))}
          </div>
          <div className="pb-8">
            {data.weeks.map((week) =>
              week.flagged ? (
                <div key={week.week} className={cn(dash.rowTint, "mx-8 my-4 pt-11 pb-12")}>
                  <div className={cn(GRID, "px-14")}>
                    <div className="flex items-center gap-8">
                      <span className={cn(dash.strong, "font-data")}>{week.week}</span>
                      <Chip chip={data.flag} />
                    </div>
                    <span className={cn(dash.value, "justify-self-end font-medium")}>{week.receipts}</span>
                    <span className={cn(dash.value, "justify-self-end font-medium")}>{week.payments}</span>
                    <span className={cn(dash.value, "justify-self-end")}>{week.net}</span>
                  </div>
                  <div className="mx-14 mt-12 flex items-center gap-12">
                    <AgentNote className="flex-1">{data.note}</AgentNote>
                    <span className={cn(dash.button, dash.primary)}>{data.button}</span>
                  </div>
                </div>
              ) : (
                <div key={week.week} className={cn(GRID, "h-40 border-t border-border px-22 first:border-t-0")}>
                  <span className={cn(dash.strong, "font-data")}>{week.week}</span>
                  <span className={cn(dash.value, "justify-self-end font-medium")}>{week.receipts}</span>
                  <span className={cn(dash.value, "justify-self-end font-medium")}>{week.payments}</span>
                  <span className={cn(dash.value, "justify-self-end")}>{week.net}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </Stage>

      <Stage width={STACKED} label={data.altStacked} className={cn("sm:hidden", className)}>
        <div className="card overflow-hidden pb-8">
          <div className="px-16 pt-16 pb-12">
            <div className={dash.title}>{data.title}</div>
            <div className={cn(dash.label, "mt-3")}>{data.rule}</div>
          </div>
          <div className={cn(dash.head, "grid-cols-[minmax(0,1fr)_auto] px-16")}>
            <span>{data.columns[0]}</span>
            <span>{data.columns[3]}</span>
          </div>
          {data.weeks.map((week) =>
            week.flagged ? (
              <div key={week.week} className={cn(dash.rowTint, "mx-8 my-4 p-12")}>
                <div className="flex items-center justify-between gap-8">
                  <div className="flex items-center gap-8">
                    <span className={cn(dash.strong, "font-data")}>{week.week}</span>
                    <Chip chip={data.flag} />
                  </div>
                  <span className={dash.value}>{week.net}</span>
                </div>
                <AgentNote className="mt-12">{data.note}</AgentNote>
              </div>
            ) : (
              <div key={week.week} className="flex h-36 items-center justify-between border-t border-border px-16 first:border-t-0">
                <span className={cn(dash.strong, "font-data")}>{week.week}</span>
                <span className={dash.value}>{week.net}</span>
              </div>
            ),
          )}
        </div>
      </Stage>
    </>
  );
}
