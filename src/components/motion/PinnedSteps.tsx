"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * One pair on screen at a time, advanced by ordinary scrolling.
 *
 * The section is a tall track with a viewport-high panel stuck inside it.
 * Nothing about the scroll is touched — no snapping, no hijacked speed (§5) —
 * the page simply has further to travel, and how far it has travelled decides
 * which `[data-step]` is showing. Invisible sentinels mark where each step
 * begins; an IntersectionObserver watching the middle of the viewport says
 * which one is current, so there is no scroll listener at all.
 *
 * This component only writes state: `data-state` (before / active / after)
 * on each step, and `inert` on the visuals that are not showing so their
 * controls leave the tab order. The layout and every transition are CSS
 * (`.steps` in globals.css), switched on by `html.js`, a wide screen and no
 * reduced-motion preference — so without JavaScript, on a phone, or with
 * motion reduced, the same markup is simply four pairs one after another,
 * and all the copy is in the static HTML either way.
 */
export function PinnedSteps({
  labels,
  navLabel,
  children,
}: {
  /** One per step, in order: the names on the progress marks. */
  labels: readonly string[];
  navLabel: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const pinned = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const steps = Array.from(element.querySelectorAll<HTMLElement>("[data-step]"));
    const sentinels = Array.from(element.querySelectorAll<HTMLElement>("[data-sentinel]"));
    const marks = Array.from(element.querySelectorAll<HTMLElement>("[data-mark]"));

    const show = (active: number) => {
      steps.forEach((step, index) => {
        step.dataset.state = index === active ? "active" : index < active ? "before" : "after";
        step.querySelector<HTMLElement>("[data-step-visual]")?.toggleAttribute("inert", pinned.matches && index !== active);
      });
      marks.forEach((mark, index) => mark.setAttribute("aria-current", index === active ? "step" : "false"));
    };

    let observer: IntersectionObserver | undefined;
    const arm = () => {
      observer?.disconnect();
      if (!pinned.matches) {
        // Stacked: everything is on the page and everything is reachable.
        steps.forEach((step) => step.querySelector("[data-step-visual]")?.removeAttribute("inert"));
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) show(sentinels.indexOf(entry.target as HTMLElement));
          }
        },
        // A line across the middle of the viewport.
        { rootMargin: "-50% 0px -50% 0px" },
      );
      sentinels.forEach((sentinel) => observer?.observe(sentinel));
    };

    arm();
    pinned.addEventListener("change", arm);
    return () => {
      observer?.disconnect();
      pinned.removeEventListener("change", arm);
    };
  }, []);

  const go = (index: number) => {
    const sentinel = root.current?.querySelectorAll<HTMLElement>("[data-sentinel]")[index];
    if (!sentinel) return;
    // Land a little past the boundary so the step is unambiguously current.
    const top = sentinel.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2 + 8;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div ref={root} className="steps" style={{ "--steps": labels.length } as CSSProperties}>
      {labels.map((label, index) => (
        <span key={label} data-sentinel="" aria-hidden="true" style={{ "--i": index } as CSSProperties} />
      ))}
      <div className="steps-pin">
        {children}
        <nav aria-label={navLabel} className="steps-nav">
          {labels.map((label, index) => (
            <button
              key={label}
              type="button"
              data-mark=""
              aria-current={index === 0 ? "step" : "false"}
              aria-label={label}
              onClick={() => go(index)}
            />
          ))}
        </nav>
      </div>
    </div>
  );
}
