"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { purchaseRequests as data } from "@/content/product/dashboard";
import { AgentNote, Chip, StepBar, dash } from "./Dash";
import { Icon } from "./Icon";
import { Stage } from "./Stage";

/** Drawn at 560 wide (stacked: 340), after the product dashboard's purchase-request list. */
const WIDTH = 560;
const STACKED = 340;
const GRID = "grid grid-cols-[minmax(0,1fr)_calc(var(--u)*178)_calc(var(--u)*92)] items-center gap-x-14";

/**
 * Purchase requests on their way to purchase orders. The first is open: the
 * agent has read its workbook and paused for the requester. Pressing Check
 * workbook hands it back to the agent (cyan, a person has it; violet, the
 * agent has it); pressing again takes that back.
 */
export function PurchaseRequests({ className }: { className?: string }) {
  const [checked, setChecked] = useState(false);
  const focus = data.focus;
  const state = checked ? focus.checked : focus.idle;

  return (
    <>
      <Stage width={WIDTH} maxScale={1.15} label={data.alt} interactive className={cn("hidden sm:block", className)}>
        <div className="card overflow-hidden">
          <div className="flex items-baseline justify-between px-20 pt-17 pb-13">
            <span className={dash.title}>{data.title}</span>
            <span className={dash.label}>{data.period}</span>
          </div>
          <div className={cn(dash.head, GRID, "px-20")}>
            <span>{data.columns[0]}</span>
            <span>{data.columns[1]}</span>
            <span className="justify-self-end">{data.columns[2]}</span>
          </div>

          <div className={cn(dash.rowTint, "mx-8 mt-8 mb-4 px-12 pt-12 pb-14")}>
            <div className={GRID}>
              <div>
                <div className={cn(dash.strong, "font-data")}>{focus.id}</div>
                <div className={dash.sub}>{focus.description}</div>
              </div>
              <div className="flex flex-col items-start">
                <span key={state.chip[1]} className="ui-swap">
                  <Chip chip={state.chip} />
                </span>
                <span key={state.step} className={cn(dash.sub, "ui-swap font-data")}>
                  {state.step}
                </span>
              </div>
              <span className={cn(dash.value, "justify-self-end")}>{focus.value}</span>
            </div>
            <ol className="mt-16 grid grid-cols-6 gap-5">
              {data.steps.map((step, index) => {
                const s = state.steps[index] ?? "todo";
                return (
                  <li key={step}>
                    <StepBar state={s} />
                    <span
                      className={cn(
                        "mt-6 block fs-u-10.5 leading-[1.25] tracking-[-0.005em]",
                        s === "wait" || s === "ai" ? "font-semibold text-ui-value" : "font-medium text-ui-quiet",
                      )}
                    >
                      {step}
                    </span>
                  </li>
                );
              })}
            </ol>
            <div className="mt-14 flex items-center gap-12" aria-live="polite">
              <AgentNote className="flex-1">
                <span key={state.note} className="ui-swap">
                  {state.note}
                </span>
              </AgentNote>
              <button
                type="button"
                aria-pressed={checked}
                onClick={() => setChecked((current) => !current)}
                className={cn(dash.button, "ui-press min-w-124", checked ? dash.quiet : dash.primary)}
              >
                {checked ? <Icon name="check" className="size-14" /> : null}
                {state.button}
              </button>
            </div>
          </div>

          <ul className={dash.crop}>
            {data.rows.map((row) => (
              <li key={row.id} className={cn(GRID, "border-t border-border px-20 py-11 first:border-t-0")}>
                <div>
                  <div className={cn(dash.strong, "font-data")}>{row.id}</div>
                  <div className={dash.sub}>{row.description}</div>
                </div>
                <div className="flex flex-col items-start">
                  <Chip chip={row.chip} />
                  <span className={cn(dash.sub, "font-data")}>{row.detail}</span>
                </div>
                <span className={cn(dash.value, "justify-self-end")}>{row.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </Stage>

      {/* Phones: one column, its opening state, a picture. */}
      <Stage width={STACKED} label={data.altStacked} className={cn("sm:hidden", className)}>
        <div className="card overflow-hidden">
          <div className="px-16 pt-16 pb-10">
            <span className={dash.title}>{data.title}</span>
          </div>
          <div className={cn(dash.rowTint, "mx-8 p-12")}>
            <div className="flex items-baseline justify-between gap-10">
              <span className={cn(dash.strong, "font-data")}>{focus.id}</span>
              <span className={dash.value}>
                <span className={dash.currency}>{data.currency}</span>
                {focus.value}
              </span>
            </div>
            <div className={dash.sub}>{focus.description}</div>
            <div className="mt-12 flex items-center gap-8">
              <Chip chip={focus.idle.chip} />
              <span className={cn(dash.sub, "mt-0")}>{focus.idle.stackedStep}</span>
            </div>
            <div className="mt-14 grid grid-cols-6 gap-4">
              {focus.idle.steps.map((s, index) => (
                <StepBar key={index} state={s} />
              ))}
            </div>
            <AgentNote className="mt-12">{focus.idle.note}</AgentNote>
            <span className={cn(dash.button, dash.primary, "mt-10 flex w-full")}>{focus.idle.button}</span>
          </div>
          <div className={dash.crop}>
            {data.rows.slice(0, 2).map((row) => (
              <div key={row.id} className="border-t border-border px-16 py-12 first:border-t-0">
                <div className="flex items-baseline justify-between gap-10">
                  <span className={cn(dash.strong, "font-data")}>{row.id}</span>
                  <span className={dash.value}>{row.value}</span>
                </div>
                <div className={dash.sub}>{row.description}</div>
                <Chip chip={row.chip} className="mt-8" />
              </div>
            ))}
          </div>
        </div>
      </Stage>
    </>
  );
}
