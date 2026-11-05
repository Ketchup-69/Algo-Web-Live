import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * The agent mark (owner design, 5 Nov 2026): the same small pixel squares as
 * before, now filling a disc instead of a plus, coloured along the logo's
 * gradient (green at the lower left, cyan through the middle, violet at the
 * upper right), with a bold navy "AI" on top, outlined and shadowed so it
 * stands out. The pixels ripple in a wave and the outline shifts between
 * white and cyan. Drawn on a 7 × 7 grid of 10-unit cells.
 */
const CELLS: { x: number; y: number; tone: 1 | 2 | 3 | 4 | 5 }[] = [];
for (let y = 0; y < 7; y++) {
  for (let x = 0; x < 7; x++) {
    if ((x - 3) ** 2 + (y - 3) ** 2 > 3.4 ** 2) continue;
    const t = (x + (6 - y)) / 12;
    CELLS.push({ x, y, tone: (Math.round(t * 4) + 1) as 1 | 2 | 3 | 4 | 5 });
  }
}
const FILL = {
  1: "fill-dot-1",
  2: "fill-dot-2",
  3: "fill-dot-3",
  4: "fill-dot-4",
  5: "fill-dot-5",
} as const;

/**
 * The mark at `size` design pixels across, in the surrounding unit. `live`
 * is kept for callers: the mark is always alive unless motion is reduced.
 */
export function AiMark({ size = 16, className }: { size?: number; live?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 70 70"
      aria-hidden="true"
      className={cn("ai-mark shrink-0 overflow-visible", className)}
      style={{ width: `calc(var(--u, 1px) * ${size})`, height: `calc(var(--u, 1px) * ${size})` } as CSSProperties}
    >
      {CELLS.map(({ x, y, tone }) => (
        <rect
          key={`${x}-${y}`}
          x={x * 10 + 1}
          y={y * 10 + 1}
          width="8"
          height="8"
          rx="1"
          className={cn("ai-px", FILL[tone])}
          style={{ "--d": `${(x + y) * 90}ms` } as CSSProperties}
        />
      ))}
      {/* "AI" on top: navy, outlined in white (the outline shifts to cyan and
          back) with a soft shadow, so it stands off the pixels. */}
      <text x="35" y="46" textAnchor="middle" className="ai-txt ai-txt-shadow">
        AI
      </text>
      <text x="35" y="46" textAnchor="middle" className="ai-txt ai-txt-a">
        AI
      </text>
      <text x="35" y="46" textAnchor="middle" className="ai-txt ai-txt-b">
        AI
      </text>
    </svg>
  );
}

/** The mark at its small size: in chips, notes and pills. */
export function AgentMark({ live = false, size = 20 }: { live?: boolean; size?: number }) {
  return <AiMark live={live} size={size} />;
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

/** The mark at a larger size: the console, the hubs, the flow and the AlgoPay pill. */
export function AgentOrb({ live = false, size = 30 }: { live?: boolean; label?: string; size?: number }) {
  return <AiMark live={live} size={size} />;
}
