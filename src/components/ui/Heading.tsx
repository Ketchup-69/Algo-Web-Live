import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Heading level and visual size are separate props on purpose.
 *
 * Document structure has to stay honest — one h1 per page, no skipped levels
 * (§8) — but the biggest type on a page is not always its h1, and a section's
 * h2 is not always the same size as the next one's. Coupling the two forces a
 * choice between correct semantics and correct typography. This decouples them:
 * `level` is for the accessibility tree, `size` is for the eye.
 *
 * There is deliberately no eyebrow prop, slot, or variant. A tracked-out
 * ALL-CAPS label above every heading is the first anti-pattern CLAUDE.md §4
 * lists, and the cheapest way not to ship it is to make it un-buildable here.
 */
const sizes = {
  xs: "text-sm font-semibold",
  sm: "text-lg font-semibold",
  md: "text-xl font-semibold",
  lg: "text-2xl font-semibold",
  xl: "text-3xl font-bold",
  "2xl": "text-4xl font-bold",
  "3xl": "text-5xl font-bold",
  "4xl": "text-6xl font-bold",
  display: "text-7xl font-bold",
} as const;

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = keyof typeof sizes;

/** Sensible default so `size` only has to be passed when overriding. */
const defaultSizeForLevel: Record<HeadingLevel, HeadingSize> = {
  1: "2xl",
  2: "xl",
  3: "lg",
  4: "md",
  5: "sm",
  6: "xs",
};

type HeadingProps = {
  level: HeadingLevel;
  size?: HeadingSize;
  /** Constrain to a readable measure — useful for long section intros. */
  measure?: boolean;
  /**
   * The brand headline gradient. Display sizes only: its lightest stop clears
   * the large-text floor and not the body one. It replaces `text-fg` rather
   * than joining it — both set `color`, and stylesheet order, not class order,
   * would pick the winner.
   */
  gradient?: boolean;
  /**
   * The brand's two-line headline: a smaller lead line in the text colour
   * over the main line (the children) in the headline gradient. Still one
   * heading, read as one sentence. Emphasis is the whole line and its size,
   * never one word (§4).
   */
  lead?: string;
} & Omit<ComponentPropsWithoutRef<"h2">, "color">;

export function Heading({
  level,
  size,
  measure = false,
  gradient = false,
  lead,
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag
      // The pointer tracker writes the cursor position here; the gradient
      // line inherits it.
      data-ptr={gradient || lead ? "" : undefined}
      className={cn(
        "font-display",
        gradient && !lead ? "text-grad-brand" : "text-fg",
        sizes[size ?? defaultSizeForLevel[level]],
        measure && "measure",
        className,
      )}
      {...props}
    >
      {lead ? (
        <>
          {/* Tracking is restated because an em-based value inherits as a
              computed length, which would be far too tight at this size. */}
          <span className="mb-[0.18em] block text-[0.6em] tracking-[-0.025em]">{lead}</span>{" "}
          <span className="text-grad-brand block">{children}</span>
        </>
      ) : (
        children
      )}
    </Tag>
  );
}
