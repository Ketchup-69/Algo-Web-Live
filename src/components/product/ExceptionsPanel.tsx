"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { exceptionsPanel as data } from "@/content/product/verification";
import { Icon } from "./Icon";
import { Stage } from "./Stage";

/** Drawn at 378 × 258 in the brand file (node 1:17818). */
const WIDTH = 378;

/**
 * What the agent held back from a payment run: three exceptions, the first
 * one picked out, and the total they add up to.
 */
export function ExceptionsPanel({ maxScale = 1.4, className }: { maxScale?: number; className?: string }) {
  // Each line can be released to the payment run and taken back. The total is
  // the sum of what is still held, so the footer is always true.
  const [released, setReleased] = useState<ReadonlySet<string>>(new Set());
  const toggle = (kind: string) =>
    setReleased((current) => {
      const next = new Set(current);
      if (!next.delete(kind)) next.add(kind);
      return next;
    });
  const held = data.rows.reduce((sum, row) => (released.has(row.kind) ? sum : sum + row.value), 0);
  const paid = data.rows.reduce((sum, row) => (released.has(row.kind) ? sum + row.value : sum), 0);
  const money = (value: number) => `${data.currency} ${value.toLocaleString("en-US")}`;
  // Second state: the run has been sent. The lines lock, the footer says what
  // happened, and the only thing left to do is go back and edit it.
  const [submitted, setSubmitted] = useState(false);

  return (
    <Stage width={WIDTH} maxScale={maxScale} label={data.alt} interactive className={className}>
      {/* 14px of padding measured from the frame edge; the hairline sits inside
          it. The frame is 4px taller than its contents, as drawn. */}
      <div className="flex flex-col gap-16 overflow-clip rounded-u-10 border-[0.5px] border-border bg-surface p-[calc(var(--u)*14-0.5px)] shadow-[0_calc(var(--u)*20)_calc(var(--u)*60)_calc(var(--u)*-12)_rgb(0_0_0/0.06),0_var(--u)_calc(var(--u)*3)_0_rgb(0_0_0/0.03)]">
        <div className="flex flex-col gap-12">
          {data.rows.map((row) => (
            <button
              key={row.kind}
              type="button"
              aria-pressed={released.has(row.kind)}
              disabled={submitted}
              onClick={() => toggle(row.kind)}
              className={cn(
                "ui-hit ui-press flex h-52 w-full items-center rounded-u-4 px-4 text-left",
                row.highlighted && !released.has(row.kind) && "bg-ui-row-tint",
                released.has(row.kind) && "opacity-45",
              )}
            >
              <span
                className={cn(
                  "flex size-18 shrink-0 items-center justify-center rounded-u-9 transition-colors duration-200",
                  released.has(row.kind) ? "bg-ui-approved text-ui-on-good" : "bg-ui-warn-badge text-ui-on-flag",
                )}
              >
                <Icon name={released.has(row.kind) ? "check" : "priority_high"} className="size-12" />
              </span>
              <div className="flex h-full min-w-px flex-1 items-center pl-10">
                <div className="flex min-w-px flex-1 flex-col items-start justify-center gap-1 whitespace-nowrap">
                  <span key={String(released.has(row.kind))} className="ui-swap font-data fs-u-8 font-bold text-ui-label">
                    {released.has(row.kind) ? data.releasedLabel : row.kind}
                  </span>
                  <span className="fs-u-12 leading-[1.2] font-bold tracking-[-0.03em] text-fg">{row.title}</span>
                  <span className="fs-u-10 font-medium tracking-[-0.025em] text-ui-meta">{row.source}</span>
                </div>
                <span className="w-72 shrink-0 text-right font-data fs-u-10.5 font-medium whitespace-nowrap text-ui-value">
                  {row.amount}
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="flex h-30 shrink-0 items-center justify-between rounded-u-6 bg-ui-total-tint px-10 py-7 whitespace-nowrap">
          <span key={String(submitted)} className="ui-swap font-data fs-u-8 font-bold text-ui-label">
            {submitted ? data.submittedLabel : data.totalLabel}
          </span>
          <span key={held} className="ui-swap font-data fs-u-13 font-semibold text-ui-value tabular-nums" aria-live="polite">
            {money(held)}
          </span>
        </div>

        {/* The step the drawing stops short of: send the run, see what it did. */}
        <div className="flex min-h-30 items-center justify-between gap-12">
          <span key={String(submitted)} className="ui-swap min-w-px flex-1 fs-u-10 leading-[1.3] font-medium tracking-[-0.025em] text-ui-meta" aria-live="polite">
            {submitted
              ? held > 0
                ? data.submittedNote.replace("{paid}", money(paid)).replace("{held}", money(held))
                : data.noneHeld
              : null}
          </span>
          <button
            type="button"
            onClick={() => setSubmitted((value) => !value)}
            className={cn(
              "ui-press flex h-30 shrink-0 items-center rounded-u-10 px-16 fs-u-12 font-semibold tracking-[-0.03em] whitespace-nowrap transition-colors duration-200",
              submitted ? "ui-quiet-control bg-surface text-fg shadow-[inset_0_0_calc(var(--u)*2)_0_rgb(3_21_34/0.2)]" : "bg-ui-action text-ui-on-action",
            )}
          >
            {submitted ? data.edit : data.submit}
          </button>
        </div>
      </div>
    </Stage>
  );
}
