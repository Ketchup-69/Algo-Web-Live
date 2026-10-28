"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { dataTiersCard as data } from "@/content/product/governance";
import { AgentPill } from "./AgentPill";
import { Stage } from "./Stage";

const WIDTH = 460;
/** Row height plus the gap beneath it, in design px: how far the selection travels per row. */
const PITCH = 56;

/**
 * Data residency and model tiering. Not in the brand file: drawn by the site
 * in its language. Three classes of data, each routed to a different place to
 * be processed; the selection travels to the class you point at.
 *
 * PLACEHOLDER: the routes are the owner's to confirm (see the content file).
 */
export function DataTiersCard({ maxScale = 1.4, className }: { maxScale?: number; className?: string }) {
  const [selected, setSelected] = useState<number>(data.initial);

  return (
    <Stage width={WIDTH} maxScale={maxScale} label={data.alt} interactive className={className}>
      <div className="mb-[calc(var(--u)*6.5)] pl-[calc(var(--u)*152.4)]">
        <AgentPill>{data.pill}</AgentPill>
      </div>

      <div data-ptr="" className="card flex flex-col p-[calc(var(--u)*22-1px)]">
        <div className="flex items-center justify-between px-12">
          <span className="font-data fs-u-10 font-bold text-ui-label">{data.classLabel}</span>
          <span className="font-data fs-u-10 font-bold text-ui-label">{data.routeLabel}</span>
        </div>

        <div className="relative mt-10 flex flex-col gap-4" onPointerLeave={() => setSelected(data.initial)}>
          <span
            aria-hidden="true"
            className="ui-selection absolute top-0 right-0 left-0 h-52 rounded-u-8 bg-ui-code/8"
            style={{ transform: `translateY(calc(var(--u) * ${PITCH * selected}))` }}
          />
          {data.rows.map((row, index) => {
            const on = index === selected;
            return (
              <button
                key={row.name}
                type="button"
                aria-pressed={on}
                onClick={() => setSelected(index)}
                onPointerEnter={() => setSelected(index)}
                onFocus={() => setSelected(index)}
                className="ui-press relative flex h-52 items-center justify-between px-12 text-left"
              >
                <span className="flex flex-col gap-3">
                  <span className={cn("font-data fs-u-8 font-bold transition-colors duration-150", on ? "text-ui-code" : "text-ui-label")}>
                    {row.name}
                  </span>
                  <span className="fs-u-11 leading-[1.2] font-semibold tracking-[-0.03em] text-fg">{row.examples}</span>
                </span>
                <span
                  className={cn(
                    "fs-u-11 font-semibold tracking-[-0.025em] whitespace-nowrap transition-colors duration-150",
                    on ? "text-ui-code" : "text-ui-quiet",
                  )}
                >
                  {row.route}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Stage>
  );
}
