import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The frame a product visual is built in.
 *
 * `width` is the width the visual was drawn at in the brand file, in pixels.
 * Everything inside is then written in those same pixels (see `.stage` in
 * globals.css): the stage measures itself and scales the unit, so the visual
 * keeps the drawing's proportions from a phone to `maxScale` times its drawn
 * size, where it stops growing.
 *
 * Always light, in both page themes — the drawings exist in light only.
 *
 * It is one image to assistive tech, described by `label` (or a labelled
 * group, when `interactive`). The text inside is
 * sample data, not page copy, and reading forty fragments of a mock invoice
 * aloud helps nobody; it stays in the DOM all the same.
 */
export function Stage({
  width,
  maxScale = 1,
  label,
  interactive = false,
  className,
  children,
}: {
  width: number;
  maxScale?: number;
  label: string;
  /**
   * Set when the visual contains real controls. An image hides its children
   * from assistive tech, buttons included, so an interactive visual is a
   * labelled group instead.
   */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("w-full [container-type:inline-size]", className)}
      style={{ maxWidth: `${(width * maxScale) / 16}rem` }}
    >
      <div
        role={interactive ? "group" : "img"}
        aria-label={label}
        data-theme="light"
        className="stage relative"
        style={{ "--stage-width": width, "--u": "calc(100cqw / var(--stage-width))" } as CSSProperties}
      >
        {children}
      </div>
    </div>
  );
}
