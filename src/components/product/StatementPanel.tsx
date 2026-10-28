"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { statementPanel as data } from "@/content/product/statement";
import { AgentPill } from "./AgentPill";
import { Icon } from "./Icon";
import { Stage } from "./Stage";

/** Drawn at 732 × 522 in the brand file (node 1:17563). */
const WIDTH = 732;

/** The action menu exists only in the print-scale drawing (node 1:16843 inside
    the 1874-wide 1:16733), so it is written in print pixels and its unit is
    scaled down to the web drawing, the way AgentPill scales itself. */
const PRINT_SCALE = WIDTH / 1874;

/** The matched lines, as [reference, description, middle, amount] bar widths. */
const GHOST_ROWS = [
  [129.03, 192.93, 87.86, 73.87],
  [132.18, 213.26, 100.22, 76.55],
  [126.86, 219.32, 88.69, 77.04],
  [134.58, 188.21, 104.65, 76.94],
  [134.57, 218, 99.36, 72.57],
  [126.6, 200.37, 104.65, 82.08],
  [119.44, 193.76, 99.53, 76.57],
  [122.18, 212.8, 89.02, 74.46],
  [132.97, 233.2, 105.09, 81.69],
  [134.19, 186.93, 103.67, 82.49],
  [127.43, 217.15, 97.56, 76.76],
  [136.69, 223.94, 96.05, 77.88],
  [144.79, 186.27, 104.83, 74.69],
] as const;
const TICK_OPACITY = [0.35, 0.35, 0.35, 0.25, 0.25, 0.25, 0.15, 0.15, 0.15, 0.08, 0.08, 0.08, 0.08] as const;
const BAR_LEFT = ["left-24", "left-176", "left-410", "right-0"] as const;

const MENU_ICONS = {
  query: "chat_bubble",
  credit: "receipt_long",
  accept: "check",
  hold: "pause",
} as const;

/**
 * The supplier-statement reconciliation panel, measurement for measurement
 * from the brand file: the lines the agent cleared on its own, the four it
 * could not, and the menu of things a person can do about the first.
 */
/** Menu geometry, in the print-scale drawing's pixels (the menu's own unit). */
const MENU_TOP = 983;
const MENU_HEIGHT = 264;
const ROWS_TOP = 937;
const ROW_PITCH = 87.04;

export function StatementPanel({ maxScale = 1.4, className }: { maxScale?: number; className?: string }) {
  // Every exception has the menu. Pressing a row opens it on that row (the
  // first is open to begin with, as drawn); picking an action deals with that
  // exception — its tag takes the action's result, the row steps back, the
  // counts move — and pressing a dealt-with row takes it back.
  const [open, setOpen] = useState<number | null>(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [done, setDone] = useState<Readonly<Record<number, string>>>({});
  const doneCount = Object.keys(done).length;
  const target = open === null ? null : data.exceptions[open];

  const press = (index: number) => {
    setHovered(null);
    if (done[index]) {
      setDone((current) => Object.fromEntries(Object.entries(current).filter(([key]) => Number(key) !== index)));
      setOpen(index);
      return;
    }
    setOpen((current) => (current === index ? null : index));
  };
  const pick = (result: string) => {
    if (open === null) return;
    setDone((current) => ({ ...current, [open]: result }));
    setOpen(null);
  };

  // The menu hangs below the first two rows, as drawn, and stands on the last
  // two so it never leaves the panel. In the menu's own print-scale pixels.
  const last = open ?? 0;
  const up = last >= 2;
  const menuTop = up ? ROWS_TOP + (last + 1) * ROW_PITCH - MENU_HEIGHT : MENU_TOP + last * ROW_PITCH;

  return (
    <Stage width={WIDTH} maxScale={maxScale} label={data.alt} interactive className={className}>
      <div
        data-ptr=""
        className="card relative h-522 [--card-radius:calc(var(--u)*16)] [--card-shadow:0_calc(var(--u)*20)_calc(var(--u)*30)_0_rgb(0_0_0/0.06),0_var(--u)_calc(var(--u)*1.5)_0_rgb(0_0_0/0.03)]"
      >
        {/* The drawing measures from the frame edge, hairline included. */}
        <div className="absolute -inset-px">
          <div className="absolute top-20 right-20 left-20 h-36">
            <div className="flex items-center justify-between whitespace-nowrap">
              <div>
                <p className="fs-u-8 font-medium text-ui-meta">{data.period}</p>
                <p className="fs-u-22 font-bold tracking-[-0.025em] text-ui-slate">{data.supplier}</p>
              </div>
              <div className="flex items-center gap-8 font-data fs-u-10">
                <span className="font-medium text-ui-label">{data.lineCount}</span>
                <span className="font-bold text-ui-value">{data.total}</span>
              </div>
            </div>
          </div>

          <div className="absolute top-84 right-20 left-20 h-272">
            <div className="flex h-18 items-center justify-between whitespace-nowrap">
              <span className="font-data fs-u-12 font-bold text-ui-label">{data.matchedLabel}</span>
              <span className="flex items-center gap-4">
                <span className="size-4 rounded-full bg-ui-approved" />
                <span className="font-data fs-u-9 font-medium text-ui-cleared">{data.clearedTemplate.replace("{n}", String(data.clearedCount + doneCount))}</span>
              </span>
            </div>

            <div className="absolute inset-x-0 top-30 h-242 overflow-clip">
              {GHOST_ROWS.map((bars, row) => (
                <div key={row} className="relative mb-5 h-14">
                  <span
                    className="absolute top-[calc(var(--u)*2.5)] left-6 fs-u-9 font-bold text-ui-cleared"
                    style={{ opacity: TICK_OPACITY[row] }}
                  >
                    {data.tick}
                  </span>
                  {bars.map((width, column) => (
                    <span
                      key={column}
                      className={cn("absolute top-[calc(var(--u)*3.5)] h-7 rounded-u-3 bg-border", BAR_LEFT[column])}
                      style={{ width: `calc(var(--u) * ${width})` }}
                    />
                  ))}
                </div>
              ))}
              <div className="absolute inset-x-0 top-98 h-141 bg-linear-to-b from-surface/0 to-surface to-[37.5%]" />
              <div className="absolute inset-x-0 top-[calc(var(--u)*144.68)] flex justify-center">
                <AgentPill size={12.902} className="bg-ui-sheet">
                  {data.pill}
                </AgentPill>
              </div>
            </div>
          </div>

          <div className="absolute top-320 right-20 left-20 flex h-26 flex-col items-center justify-center">
            <div className="flex h-16 flex-col items-center gap-2">
              <span
                key={doneCount}
                aria-live="polite"
                className="ui-swap font-data fs-u-9 font-bold tracking-[0.1333em] whitespace-nowrap text-ui-warn-badge"
              >
                {doneCount === data.exceptions.length
                  ? data.exceptionsNone
                  : data.exceptionsTemplate.replace("{n}", String(data.exceptions.length - doneCount))}
              </span>
              <span className="h-2 w-32 shrink-0 rounded-u-1 bg-ui-warn-rule" />
            </div>
          </div>

          <div className="absolute top-366 right-20 left-20 flex flex-col">
            {data.exceptions.map((row, index) => (
              <button
                key={row.document}
                type="button"
                aria-expanded={open === index}
                onClick={() => press(index)}
                className={cn(
                  "ui-hit flex h-34 w-full items-center pr-8 pl-4 text-left",
                  index < data.exceptions.length - 1 && "border-b border-border",
                  open === index && "bg-ui-warn-badge/4",
                  done[index] && "opacity-50",
                )}
              >
                <span
                  className={cn(
                    "flex size-14 shrink-0 items-center justify-center rounded-u-7 transition-colors duration-200",
                    done[index] ? "bg-ui-approved text-ui-on-good" : "bg-ui-warn-badge text-ui-on-flag",
                  )}
                >
                  <Icon name={done[index] ? "check" : "priority_high"} className="size-10" />
                </span>
                <div className="flex min-w-px flex-1 items-center justify-between pl-8">
                  <span className="w-120 shrink-0 font-data fs-u-11 font-medium text-ui-value">{row.document}</span>
                  <span className="min-w-px flex-1 fs-u-12 font-semibold tracking-[-0.025em] text-ui-value/60">
                    {row.reason}
                  </span>
                  <span
                    key={done[index] ?? row.tag}
                    className={cn(
                      "ui-swap shrink-0 rounded-u-3 px-7 py-3 font-data fs-u-9 font-bold whitespace-nowrap",
                      done[index]
                        ? "bg-ui-approved text-ui-on-good"
                        : row.tone === "variance"
                          ? "bg-ui-warn-badge/10 text-ui-warn-badge"
                          : "bg-ui-value/6 text-ui-label",
                    )}
                  >
                    {done[index] ?? row.tag}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* 1271 in from the print frame's left edge and 46 below the top of
              its exception rows, which sit at 366 web px = 937 print px here.
              The hairline is an inside outline: drawn strokes take no room. */}
          <div
            style={
              {
                "--u": `calc(100cqw / var(--stage-width) * ${PRINT_SCALE})`,
                "--spacing": "var(--u)",
                // Where it sits is one transform, so moving between rows is
                // compositor work; `--at` is read by `.ui-menu` in motion.css.
                "--at": `translateY(calc(var(--u) * ${menuTop.toFixed(2)}))`,
              } as CSSProperties
            }
            data-open={open !== null}
            data-up={up}
            onPointerLeave={() => setHovered(null)}
            className="ui-menu absolute top-0 left-1271 flex w-[calc(var(--u)*349.84)] flex-col overflow-clip rounded-[calc(var(--u)*12.957)] [outline:calc(var(--u)*1.62)_solid_var(--border)] [outline-offset:calc(var(--u)*-1.62)] bg-bg py-[calc(var(--u)*9.718)] shadow-[0_calc(var(--u)*19.436)_calc(var(--u)*45.35)_0_rgb(3_21_34/0.14)]"
          >
            <div className="flex h-[calc(var(--u)*35.632)] items-center px-[calc(var(--u)*16.196)]">
              <span className="font-data [font-size:calc(var(--u)*13.767)] font-medium text-ui-label">{target ? `${target.document} · ${target.tag}` : data.menu.heading}</span>
            </div>
            <div className="h-[calc(var(--u)*14.577)] px-[calc(var(--u)*12.957)] py-[calc(var(--u)*6.479)]">
              <div className="h-[calc(var(--u)*1.62)] bg-border" />
            </div>
            {data.menu.items.map((item, itemIndex) => {
              // The drawn highlight sits on the first item; it follows the
              // pointer or the keyboard once either arrives.
              const active = hovered === null ? item.active : hovered === itemIndex;
              return (
              <button
                key={item.label}
                type="button"
                tabIndex={open === null ? -1 : 0}
                onClick={() => pick(item.result)}
                onPointerEnter={() => setHovered(itemIndex)}
                onFocus={() => setHovered(itemIndex)}
                onBlur={() => setHovered(null)}
                className={cn(
                  "ui-press flex h-[calc(var(--u)*48.589)] w-full items-center gap-[calc(var(--u)*16.196)] rounded-[calc(var(--u)*8.098)] pl-[calc(var(--u)*16.196)] text-left transition-colors duration-150",
                  active && "bg-ui-value/4",
                )}
              >
                <Icon name={MENU_ICONS[item.icon]} className={cn("size-[calc(var(--u)*24)]", active ? "text-ui-value" : "text-ui-rule")} />
                <span
                  className={cn(
                    "[font-size:calc(var(--u)*19.436)] font-medium tracking-[-0.025em] whitespace-nowrap",
                    active ? "text-ui-value" : "text-ui-label",
                  )}
                >
                  {item.label}
                </span>
              </button>
              );
            })}
          </div>
        </div>
      </div>
    </Stage>
  );
}
