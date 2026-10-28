"use client";

import { useSyncExternalStore, type CSSProperties, type ReactNode } from "react";

/** Below this width a visual's controls fall under the 24px tap-target floor (WCAG 2.5.8). */
const WIDE = "(min-width: 640px)";

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(WIDE);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const isWide = () => window.matchMedia(WIDE).matches;
/** The static HTML carries the interactive version; a phone switches once it hydrates. */
const serverIsWide = () => true;

/**
 * The stage of a visual with real controls. From 640px it is a labelled group
 * the reader can operate. Narrower, the drawing is scaled until its buttons
 * are a few pixels tall, so it becomes one picture like any other visual: an
 * image to assistive tech, and its contents inert (no focus, no taps), shown
 * in their opening state.
 */
export function InteractiveFrame({
  label,
  className,
  style,
  children,
}: {
  label: string;
  className: string;
  style: CSSProperties;
  children: ReactNode;
}) {
  const wide = useSyncExternalStore(subscribe, isWide, serverIsWide);
  return (
    <div role={wide ? "group" : "img"} aria-label={label} data-theme="light" className={className} style={style}>
      {/* `contents` keeps the stage's own box as every child's positioning parent. */}
      <div className="contents" inert={!wide}>
        {children}
      </div>
    </div>
  );
}
