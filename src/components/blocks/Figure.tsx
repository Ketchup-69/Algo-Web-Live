import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";

/**
 * A product illustration with what it shows and, always, that it is a sample
 * (§2: sample amounts are fine only if the illustration is clearly a sample).
 */
export function Figure({
  title,
  body,
  align = "start",
  children,
  className,
}: {
  title?: string;
  body?: string;
  /** `center` centres the caption only; the drawing keeps its own alignment. */
  align?: "start" | "center";
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("flex flex-col", className)}>
      {children}
      <figcaption className={cn("mt-6", align === "center" && "mx-auto text-center")}>
        {title ? <span className="block font-display text-lg font-semibold text-fg">{title}</span> : null}
        {body ? <span className="mt-2 block max-w-[52ch] text-base text-fg-muted">{body}</span> : null}
        <span className="mt-2 block text-sm text-fg-muted">{site.ui.sampleNote}</span>
      </figcaption>
    </figure>
  );
}
