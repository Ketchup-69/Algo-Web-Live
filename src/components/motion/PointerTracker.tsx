"use client";

import { useEffect, useRef } from "react";

/**
 * Feeds the pointer to the gradients.
 *
 * Renders nothing. It listens on its parent element — the page's <main> —
 * and, once per frame, writes `--px` / `--py` onto every `[data-ptr]` inside it: the pointer's
 * position as a 0–1 fraction of THAT element's own box. What happens next is
 * CSS — a wash drifting toward the cursor, a headline's bright point, the
 * light on a card's edge all read the same two numbers.
 *
 * The variables go on the targets, not on the section. A custom property
 * inherits, so setting it on the section would restyle every descendant on
 * every frame; setting it on three or four targets restyles three or four.
 *
 * Nothing runs without a fine, hovering pointer, or under reduced motion: on
 * touch the washes keep their own slow CSS drift, and with motion reduced
 * everything is simply still. Leaving the section removes the variables, so
 * each gradient eases back to its resting place.
 */
export function PointerTracker() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current?.parentElement;
    if (!root) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    // Queried per frame rather than cached: the line splitter rebuilds
    // headings on resize, and a cached node list would go stale.
    const targets = () => root.querySelectorAll<HTMLElement>("[data-ptr]");

    const write = () => {
      frame = 0;
      for (const target of targets()) {
        const box = target.getBoundingClientRect();
        if (!box.width || !box.height) continue;
        // Off screen: leave it where it was. A wash three sections away has
        // no business chasing a cursor it cannot be seen beside.
        if (box.bottom < 0 || box.top > window.innerHeight) continue;
        target.style.setProperty("--px", ((x - box.left) / box.width).toFixed(3));
        target.style.setProperty("--py", ((y - box.top) / box.height).toFixed(3));
      }
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(write);
    };

    const onLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      for (const target of targets()) {
        target.style.removeProperty("--px");
        target.style.removeProperty("--py");
      }
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <span ref={ref} hidden />;
}
