import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/** The five squares of the agent mark, as [left, top, colour] in design px. */
const DOTS = [
  [3.54, 7.29, "bg-dot-2"],
  [3.54, 4.2, "bg-dot-3"],
  [3.54, 1.1, "bg-dot-4"],
  [0.45, 4.2, "bg-dot-1"],
  [6.63, 4.2, "bg-dot-5"],
] as const;

/** The five-square mark. Sized in the surrounding unit, so it scales with whatever pill holds it. */
export function AgentMark({ live = false }: { live?: boolean }) {
  return (
    <span className={cn("relative size-[calc(var(--u)*9.7)] shrink-0", live && "ui-thinking")}>
        {DOTS.map(([left, top, colour]) => (
          <span
            key={`${left}-${top}`}
            className={cn("absolute size-[calc(var(--u)*2.2)]", colour)}
            style={{ left: `calc(var(--u) * ${left})`, top: `calc(var(--u) * ${top})`, "--i": DOTS.findIndex((d) => d[0] === left && d[1] === top) } as CSSProperties}
          />
        ))}
    </span>
  );
}

/**
 * The agent speaking: a paper pill with the five-square mark and one line of
 * what the agent is doing. Measurements are the brand file's, inside a Stage.
 */
export function AgentPill({
  children,
  size = 13.25,
  live = false,
  className,
}: {
  children: string;
  /** The agent is working: the mark's squares take turns (still under reduced motion). */
  live?: boolean;
  /** The label's type size in design px. Everything else keeps its proportion to it. */
  size?: number;
  className?: string;
}) {
  return (
    <div
      // The pill is drawn at several sizes in the brand file, always in the
      // same proportions, so it is one drawing scaled by its label size.
      style={
        {
          "--u": `calc(100cqw / var(--stage-width) * ${size / 13.25})`,
          // Restated so Tailwind's spacing follows the pill's unit, not the stage's.
          "--spacing": "var(--u)",
        } as CSSProperties
      }
      className={cn(
        "inline-flex items-center gap-7 rounded-u-7 bg-bg p-[calc(var(--u)*10.6)] whitespace-nowrap",
        "shadow-[calc(var(--u)*2)_calc(var(--u)*2)_calc(var(--u)*8)_0_rgb(0_0_0/0.25)]",
        className,
      )}
    >
      <AgentMark live={live} />
      <span className="text-ui-pill fs-u-13.25 font-semibold tracking-[-0.05em]">{children}</span>
    </div>
  );
}
