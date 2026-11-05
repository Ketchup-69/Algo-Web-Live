"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type PipelineStep = { title: string; body?: string; icon: ReactNode; marker: string };

/** How long each step is shown before the next, while nobody is choosing. */
const DWELL = 1300;
/** After a visitor picks a step, it stays there this long, then the tour carries on. */
const HOLD = 15000;

/**
 * A real sequence as an animated track: each step a node on a line that
 * fills as a pulse travels from one to the next; the step it has reached
 * lights up and its words show in the panel below. Every step is a button:
 * pick one to read it (the tour pauses for a while, then carries on).
 *
 * All the words are in the DOM from the start: the panel stacks every step
 * in one grid cell and shows one at a time. Runs only on screen; under
 * reduced motion it never advances on its own.
 */
export function PipelineClient({ steps, label }: { steps: PipelineStep[]; label?: string }) {
  const [active, setActive] = useState(0);
  // Bumped on every pick, so a second pick restarts the hold.
  const [held, setHeld] = useState(0);
  const [holding, setHolding] = useState(false);
  const [awake, setAwake] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const n = steps.length;

  useEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let onScreen = false;
    const update = () => setAwake(onScreen && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = Boolean(entry?.isIntersecting);
      update();
    }, { threshold: 0.35 });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (!awake) return;
    const timer = window.setTimeout(() => {
      setHolding(false);
      setActive((i) => (i + 1) % n);
    }, holding ? HOLD : DWELL);
    return () => window.clearTimeout(timer);
  }, [awake, active, held, holding, n]);

  const progress = n > 1 ? active / (n - 1) : 0;

  return (
    <div ref={root} className="pipeline bp-zone" style={{ "--p": progress, "--n": n } as CSSProperties}>
      {/* The track: a row from 1024px, a column below. */}
      <div className="relative">
        <span aria-hidden="true" className="pl-track" />
        <span aria-hidden="true" className="pl-fill" />
        <span aria-hidden="true" className="pl-pulse-rail">
          <i className="pl-pulse" />
        </span>
        <ol aria-label={label} className="pl-nodes relative">
          {steps.map((step, index) => (
            <li key={step.title} className="pl-node" data-state={index < active ? "done" : index === active ? "active" : "todo"}>
              <button
                type="button"
                aria-pressed={index === active}
                onClick={() => {
                  setActive(index);
                  setHolding(true);
                  setHeld((h) => h + 1);
                }}
                className="group flex w-full items-center gap-3 rounded-control text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring lg:flex-col lg:items-center lg:gap-3 lg:text-center"
              >
                <span className="pl-dot relative flex size-12 shrink-0 items-center justify-center rounded-full border bg-surface text-fg">
                  {step.icon}
                </span>
                <span className="flex min-w-0 flex-col lg:items-center">
                  <span className="font-data text-xs font-semibold text-fg-muted">{step.marker}</span>
                  <span className="pl-title text-sm leading-snug font-semibold text-balance text-fg">{step.title}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {steps.some((step) => step.body) ? (
        <div className="site-card mt-8 grid overflow-hidden p-6 sm:p-8">
          <span aria-hidden="true" className="hairline-brand absolute inset-x-6 top-0" />
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="pl-panel col-start-1 row-start-1 flex gap-5"
              data-on={index === active}
              aria-hidden={index !== active}
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-tile-navy text-tile-on-navy">{step.icon}</span>
              <div>
                <p className="font-data text-sm font-semibold text-fg-muted">
                  {step.marker} / {String(n).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold text-fg">{step.title}</h3>
                {step.body ? <p className="mt-2 max-w-[68ch] text-base text-fg-muted">{step.body}</p> : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
