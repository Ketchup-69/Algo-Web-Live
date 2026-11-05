"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sets `data-awake` on its wrapper while it is on screen and the tab is
 * visible, so CSS-driven drawings inside run only then
 * (`[data-awake="false"] … { animation-play-state: paused }`). Holds no
 * content of its own: children stay server-rendered.
 */
export function Awake({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let onScreen = false;
    const update = () => {
      element.dataset.awake = String(onScreen && document.visibilityState === "visible");
    };
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = Boolean(entry?.isIntersecting);
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <div ref={ref} data-awake="false" className={className}>
      {children}
    </div>
  );
}
