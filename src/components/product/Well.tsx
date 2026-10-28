import type { ReactNode } from "react";
import { Stage } from "./Stage";

/** Each well is drawn 560 × 400 in the brand file (node 1:16357, print scale). */
const WIDTH = 560;

/**
 * The tile the three small product visuals sit in: a ground that falls from
 * paper to grey, clipping whatever floats inside it. Children are placed in
 * the drawing's own pixels, measured from the tile's top-left corner.
 */
export function Well({
  label,
  maxScale = 1,
  interactive,
  className,
  children,
}: {
  label: string;
  maxScale?: number;
  /** The well holds real controls (see Stage). */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Stage width={WIDTH} maxScale={maxScale} label={label} interactive={interactive} className={className}>
      <div className="bg-well relative h-400 overflow-clip rounded-u-16 shadow-[0_calc(var(--u)*20)_calc(var(--u)*60)_calc(var(--u)*-12)_rgb(0_0_0/0.06),0_var(--u)_calc(var(--u)*3)_0_rgb(0_0_0/0.03)]">
        {children}
      </div>
    </Stage>
  );
}
