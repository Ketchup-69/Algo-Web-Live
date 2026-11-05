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
      <span className="text-ui-pill fs-u-13.25 font-semibold tracking-[-0.03em]">{children}</span>
    </div>
  );
}

/** The five dots of the mark, set around the orb at these angles (degrees from the top). */
const HALO = [
  [0, "bg-dot-1", 0],
  [72, "bg-dot-2", 1],
  [144, "bg-dot-3", 2],
  [216, "bg-dot-4", 3],
  [288, "bg-dot-5", 4],
] as const;

/**
 * The agent, larger: a circle with "AI" in it, ringed in the logo's gradient,
 * and the mark's five dots set around the ring. While `live`, the dots take
 * turns lighting up and the ring turns slowly, so the agent reads as
 * thinking. Sized in the surrounding unit (`size` design px across).
 */
export function AgentOrb({ live = false, label = "AI", size = 30 }: { live?: boolean; label?: string; size?: number }) {
  return (
    <span
      className={cn("agent-orb relative inline-flex shrink-0 items-center justify-center rounded-full", live && "agent-orb-live")}
      style={{ width: `calc(var(--u) * ${size})`, height: `calc(var(--u) * ${size})` } as CSSProperties}
    >
      <span aria-hidden="true" className="agent-orb-ring absolute inset-0 rounded-full" />
      <span className="absolute inset-[calc(var(--u)*2.2)] rounded-full bg-bg" />
      <span
        className="relative font-extrabold tracking-[-0.04em] text-ui-value"
        style={{ fontSize: `calc(var(--u) * ${size * 0.36})`, lineHeight: 1 }}
      >
        {label}
      </span>
      {HALO.map(([angle, colour, index]) => (
        <span
          key={angle}
          aria-hidden="true"
          className="absolute top-1/2 left-1/2"
          style={{ transform: `rotate(${angle}deg) translateY(calc(var(--u) * ${-size / 2}))` } as CSSProperties}
        >
          <span
            className={cn("agent-orb-dot block -translate-x-1/2 -translate-y-1/2 rounded-full", colour)}
            style={{ width: `calc(var(--u) * ${size * 0.17})`, height: `calc(var(--u) * ${size * 0.17})`, "--i": index } as CSSProperties}
          />
        </span>
      ))}
    </span>
  );
}
