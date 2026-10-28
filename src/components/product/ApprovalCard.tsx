"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { approvalCard as data } from "@/content/product/approval";
import { AgentPill } from "./AgentPill";
import { Icon } from "./Icon";
import { Stage } from "./Stage";

/** Drawn at 460 wide in the brand file (node 1:17365). */
const WIDTH = 460;

const quietButton =
  "ui-press ui-decision ui-quiet-control flex h-30 items-center rounded-u-10 bg-surface px-16 fs-u-12 font-semibold tracking-[-0.05em] text-fg shadow-[0_calc(var(--u)*4)_calc(var(--u)*12)_calc(var(--u)*-6)_rgb(0_0_0/0.05),inset_0_0_calc(var(--u)*2)_0_rgb(10_14_26/0.12)]";

/**
 * The approval card, measurement for measurement from the brand file: what
 * the agent found, the evidence it gathered, and the three things a person
 * can do about it. The pill sits above the card's top edge, as drawn.
 */
type Decision = keyof typeof data.outcomes;

export function ApprovalCard({ maxScale = 1.4, className }: { maxScale?: number; className?: string }) {
  // The card works: each control is a toggle, so a second press undoes it.
  // Nothing moves but the words — the status line and what the agent says —
  // because the point being made is that a person's decision is what changes
  // the record.
  const [decision, setDecision] = useState<Decision | null>(null);
  const outcome = decision ? data.outcomes[decision] : null;
  const decide = (next: Decision) => setDecision((current) => (current === next ? null : next));

  const control = (name: Decision) => ({
    type: "button" as const,
    "aria-pressed": decision === name,
    onClick: () => decide(name),
    // The two not chosen step back rather than vanish: the choice stays legible.
    "data-dimmed": decision !== null && decision !== name ? "" : undefined,
  });

  return (
    <Stage width={WIDTH} maxScale={maxScale} label={data.alt} interactive className={className}>
      {/* 152px in from the card's left edge, 6.5px clear of its top. */}
      <div className="mb-[calc(var(--u)*6.5)] pl-[calc(var(--u)*152.4)]" aria-live="polite">
        <AgentPill live={decision === "query"}>{outcome ? outcome.pill : data.pill}</AgentPill>
      </div>

      {/* 22px of padding measured from the frame edge, as the drawing does:
          the hairline sits inside it rather than adding to it. */}
      <div data-ptr="" className="card flex flex-col p-[calc(var(--u)*22-1px)]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-8">
            <span
              className={cn(
                "flex size-16 items-center justify-center rounded-u-8 transition-colors duration-200",
                decision === "approve" ? "bg-ui-approved" : "bg-ui-flag",
              )}
            >
              <Icon name={decision === "approve" ? "check" : "priority_high"} className="size-12 text-bg" />
            </span>
            <span
              key={decision ?? "idle"}
              className={cn("ui-swap fs-u-14 font-semibold", decision === "approve" ? "text-ui-match" : "text-ui-flag")}
            >
              {outcome ? outcome.status : data.status}
            </span>
          </div>
          <span className="font-mono fs-u-10 font-bold text-ui-label">{data.reference}</span>
        </div>

        <div className="mt-26 flex h-50 flex-col gap-2 fs-u-10">
          <span className="font-mono font-bold text-ui-label">{data.summaryLabel}</span>
          <p className="leading-[1.2] font-semibold tracking-[-0.05em] text-fg">
            {data.summary.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        <div className="h-20 border-b-[0.5px] border-ui-rule" />

        <div className="flex flex-col">
          {data.evidence.map((row) => (
            <div key={row.label} className="flex h-26 items-center justify-between">
              <span className="fs-u-10 leading-[1.2] font-semibold tracking-[-0.05em] text-ui-quiet">
                {row.label}
              </span>
              <span
                className={cn(
                  "font-mono fs-u-8 font-medium",
                  row.flagged ? "rounded-u-3 bg-ui-flag-soft px-6 py-2 text-ui-flag" : "text-ui-value",
                )}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <div className="h-12 border-t-[0.5px] border-ui-rule" />

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <button {...control("approve")} className="ui-press ui-decision flex h-30 items-center rounded-u-10 bg-accent px-16 fs-u-12 font-semibold tracking-[-0.05em] text-surface shadow-[0_calc(var(--u)*6)_calc(var(--u)*16)_calc(var(--u)*-6)_rgb(0_0_0/0.1),inset_calc(var(--u)*-1)_calc(var(--u)*-1)_calc(var(--u)*2)_0_rgb(0_0_0/0.15),inset_var(--u)_var(--u)_calc(var(--u)*2)_0_rgb(255_255_255/0.2)]">
              {data.actions.approve}
            </button>
            <button {...control("reject")} className={quietButton}>
              {data.actions.reject}
            </button>
          </div>
          <button {...control("query")} className={quietButton}>
            {data.actions.query}
          </button>
        </div>
        {/* The drawing has a 12px spacer here that its 330px frame clips; the
            card ends at the action row's padding, as it does on the page. */}
      </div>
    </Stage>
  );
}
