"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { invoiceChecks as data } from "@/content/product/dashboard";
import { AgentNote, CheckMark, Chip, dash } from "./Dash";
import { Stage } from "./Stage";

/** Drawn at 640 wide (stacked: 340), after the product dashboard's approval detail. */
const WIDTH = 640;
const STACKED = 340;

type Decision = keyof typeof data.outcomes;
const ORDER = ["back", "reject", "approve"] as const satisfies readonly Decision[];

/**
 * One invoice ready for a decision: what the agent checked, the one thing it
 * could not clear and why, and the three things a person can do. Each control
 * is a toggle, so a second press undoes it; only the words change.
 */
export function InvoiceChecks({ className }: { className?: string }) {
  const [decision, setDecision] = useState<Decision | null>(null);
  const state = decision ? data.outcomes[decision] : data.idle;

  const header = (stacked: boolean, chip: typeof state.chip) => (
    <>
      <div className={cn(dash.label, "font-data")}>{data.reference}</div>
      <div className={cn("mt-4 font-semibold tracking-[-0.025em] text-ui-value", stacked ? "fs-u-17" : "fs-u-20")}>
        {data.supplier}
      </div>
      {stacked ? (
        <div className="mt-8 flex items-baseline justify-between">
          <span className="font-data fs-u-21 font-bold tracking-[-0.03em] text-ui-value">
            <span className={dash.currency}>{data.currency}</span>
            {data.amount}
          </span>
          <span className={dash.label}>{data.due}</span>
        </div>
      ) : null}
      <span key={chip[1]} className="ui-swap mt-10">
        <Chip chip={chip} />
      </span>
    </>
  );

  const checks = (stacked: boolean) => (
    <ul className="mt-10 overflow-hidden rounded-u-10 border border-border">
      {data.checks.map((check) => (
        <li
          key={check.label}
          className={cn(
            "flex gap-10 border-t border-border px-14 py-8 fs-u-12.5 tracking-[-0.01em] text-ui-value first:border-t-0",
            stacked ? "items-start" : "min-h-40 items-center",
            check.flagged ? "bg-ui-row-tint font-semibold" : "font-medium",
          )}
        >
          <CheckMark flagged={check.flagged} />
          <span className={stacked ? "" : "contents"}>
            <span>{check.label}</span>
            <span
              className={cn(
                "font-data fs-u-11.5 whitespace-nowrap",
                stacked ? "mt-2 block" : "ml-auto",
                check.flagged ? "font-semibold text-ui-value" : "text-ui-quiet",
              )}
            >
              {check.value}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );

  const note = (
    <AgentNote className="mt-14">
      <b className="font-bold">{data.noteLead}</b> {data.note}
    </AgentNote>
  );

  return (
    <>
      <Stage width={WIDTH} maxScale={1.25} label={data.alt} interactive className={cn("hidden sm:block", className)}>
        <div className="card px-26 pt-24 pb-22">
          <div className="flex items-start justify-between gap-16">
            <div>{header(false, state.chip)}</div>
            <div className="text-right">
              <div className={dash.label}>{data.amountLabel}</div>
              <div className="my-[calc(var(--u)*3)] font-data fs-u-26 font-bold tracking-[-0.03em] text-ui-value">
                <span className={dash.currency}>{data.currency}</span>
                {data.amount}
              </div>
              <div className={dash.label}>{data.due}</div>
            </div>
          </div>
          <div className="mt-22 fs-u-13.5 font-semibold tracking-[-0.015em] text-ui-value">{data.checksTitle}</div>
          {checks(false)}
          {note}
          <div className="mt-18 flex items-center justify-between gap-12 border-t border-border pt-16">
            <span key={state.text} className="ui-swap fs-u-11.5 font-medium text-ui-quiet" aria-live="polite">
              {state.text}
            </span>
            <div className="flex gap-8">
              {ORDER.map((name) => (
                <button
                  key={name}
                  type="button"
                  aria-pressed={decision === name}
                  data-dimmed={decision !== null && decision !== name ? "" : undefined}
                  onClick={() => setDecision((current) => (current === name ? null : name))}
                  className={cn(dash.button, "ui-press ui-decision", name === "approve" ? dash.primary : dash.quiet)}
                >
                  {data.actions[name]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Stage>

      {/* Phones: one column, its opening state, a picture. */}
      <Stage width={STACKED} label={data.altStacked} className={cn("sm:hidden", className)}>
        <div className="card px-16 pt-18 pb-16">
          {header(true, data.idle.chip)}
          <div className="mt-22 fs-u-13.5 font-semibold tracking-[-0.015em] text-ui-value">{data.checksTitle}</div>
          {checks(true)}
          {note}
          <div className="mt-14 grid grid-cols-2 gap-8">
            <span className={cn(dash.button, dash.primary, "col-span-2")}>{data.actions.approve}</span>
            <span className={cn(dash.button, dash.quiet)}>{data.actions.back}</span>
            <span className={cn(dash.button, dash.quiet)}>{data.actions.reject}</span>
          </div>
        </div>
      </Stage>
    </>
  );
}
