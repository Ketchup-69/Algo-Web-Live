import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/**
 * A status badge: a brand colour as the fill, its own label on top.
 *
 * Two rules are baked in rather than documented and hoped for.
 *
 * First, the label always sits ON the fill, never beside it as coloured text.
 * The brand green and violet measure 2.65 and 3.27 as text on white — far
 * under AA. As fills carrying a navy label they are 6.99 and 5.66, and the
 * navy "needs attention" badge carries white at 18.5.
 *
 * Second, there is no dot-only variant. A dot alone conveys its meaning
 * purely by colour, which fails WCAG 1.4.1 no matter how the contrast works
 * out. Every status carries a word.
 *
 * The border gives the badge an edge on a light ground where a pale fill is
 * close to the page.
 */
const tones = {
  /** Approved, matched, done. */
  success: "bg-success text-on-success border-success",
  /** Needs a person: an exception, a hold, a variance. */
  attention: "bg-attention text-on-attention border-attention",
  /** Something the agent did. */
  ai: "bg-ai text-on-ai border-ai",
  /** Pending, unknown, idle. */
  neutral: "bg-surface text-fg border-border-strong",
} as const;

export type StatusTone = keyof typeof tones;

type StatusProps = {
  tone?: StatusTone;
} & Omit<ComponentPropsWithoutRef<"span">, "color">;

export function Status({
  tone = "neutral",
  className,
  children,
  ...props
}: StatusProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border",
        "px-2.5 py-0.5 text-sm font-medium whitespace-nowrap",
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
