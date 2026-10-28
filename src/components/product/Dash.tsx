import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ChipData, ChipKind, StepState } from "@/content/product/dashboard";
import { AgentMark } from "./AgentPill";
import { Icon } from "./Icon";

/**
 * The parts of the product dashboard's own language, shared by the four
 * dashboard visuals (purchase requests, invoice checks, collections, cash
 * timing). Written in design pixels inside a Stage, like every visual. The
 * agent speaks through the five-square mark, never a sparkle.
 */

const CHIP: Record<ChipKind, string> = {
  flag: "bg-ui-flag text-ui-on-flag",
  wait: "bg-ui-wait-soft",
  ai: "bg-ui-ai-soft",
  good: "bg-ui-amount-soft",
  quiet: "shadow-[inset_0_0_0_1px_var(--ui-rule)]",
};

/** A status: a tint (or the navy fill) carrying its words, at 11.5px. */
export function Chip({ chip, className }: { chip: ChipData; className?: string }) {
  const [kind, text] = chip;
  return (
    <span
      className={cn(
        "inline-flex h-22 items-center gap-5 rounded-u-6 px-8 fs-u-11.5 font-semibold tracking-[-0.01em] whitespace-nowrap text-ui-value",
        CHIP[kind],
        className,
      )}
    >
      {kind === "flag" ? <Icon name="priority_high" className="size-12" /> : null}
      {kind === "good" ? <Icon name="check" className="size-12" /> : null}
      {kind === "wait" ? <span className="size-6 rounded-full bg-ui-action" /> : null}
      {kind === "ai" ? <AgentMark /> : null}
      <span>{text}</span>
    </span>
  );
}

/** What the agent says about the item: a violet whisper with the mark. */
export function AgentNote({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-9 rounded-u-9 bg-ui-ai-soft px-12 py-10 fs-u-12 leading-[1.45] font-medium tracking-[-0.005em] text-ui-value",
        className,
      )}
    >
      <span className="mt-3 flex">
        <AgentMark />
      </span>
      <span>{children}</span>
    </div>
  );
}

/** A check that passed (green whisper, navy tick) or one that needs a person (navy). */
export function CheckMark({ flagged }: { flagged: boolean }) {
  return (
    <span
      className={cn(
        "flex size-20 shrink-0 items-center justify-center rounded-full",
        flagged ? "bg-ui-flag text-ui-on-flag" : "bg-ui-amount-soft text-ui-value",
      )}
    >
      <Icon name={flagged ? "priority_high" : "check"} className="size-13" />
    </span>
  );
}

const STEP: Record<StepState, string> = {
  done: "bg-ui-approved",
  wait: "bg-ui-action",
  ai: "bg-ui-ai",
  todo: "bg-ui-step-todo",
};

/** One 4px bar of a progress row. */
export function StepBar({ state }: { state: StepState }) {
  return <b className={cn("block h-4 rounded-u-2", STEP[state])} />;
}

export const dash = {
  title: "fs-u-15 font-semibold tracking-[-0.02em] text-ui-value",
  label: "fs-u-11.5 font-medium tracking-[-0.005em] text-ui-quiet",
  strong: "fs-u-13 font-semibold tracking-[-0.01em] text-ui-value",
  sub: "mt-3 fs-u-11.5 leading-[1.3] font-medium tracking-[-0.005em] text-ui-quiet",
  value: "font-data fs-u-13 font-semibold text-ui-value",
  currency: "mr-4 text-[0.62em] font-semibold tracking-normal text-ui-quiet",
  head: "grid h-30 items-center border-y border-border bg-bg-subtle fs-u-11 font-medium text-ui-quiet",
  rowTint: "rounded-u-10 bg-ui-row-tint",
  /** Cropping implies more: the last rows fade out. */
  crop: "[mask-image:linear-gradient(to_bottom,black_62%,transparent)]",
  button:
    "inline-flex h-32 items-center justify-center gap-6 rounded-u-9 px-14 fs-u-12.5 font-semibold tracking-[-0.02em] whitespace-nowrap",
  primary:
    "bg-ui-action text-ui-on-action shadow-[0_calc(var(--u)*6)_calc(var(--u)*16)_calc(var(--u)*-6)_rgb(0_0_0/0.1),inset_calc(var(--u)*-1)_calc(var(--u)*-1)_calc(var(--u)*2)_0_rgb(0_0_0/0.15),inset_var(--u)_var(--u)_calc(var(--u)*2)_0_rgb(255_255_255/0.2)]",
  quiet:
    "ui-quiet-control bg-surface text-fg shadow-[0_calc(var(--u)*4)_calc(var(--u)*12)_calc(var(--u)*-6)_rgb(0_0_0/0.05),inset_0_0_calc(var(--u)*2)_0_rgb(3_21_34/0.2)]",
} as const;
