"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { auditTrailCard as data } from "@/content/product/governance";
import { AgentPill } from "./AgentPill";
import { Stage } from "./Stage";

const WIDTH = 460;

type Kind = (typeof data.events)[number]["kind"];
type Filter = (typeof data.filters)[number]["id"];

/** The approval is the one a person made, so it is the one in colour. */
const TAG: Record<Kind, string> = {
  input: "bg-ui-value/6 text-ui-label",
  decision: "bg-ui-ai text-ui-on-ai",
  approval: "bg-ui-approved text-ui-on-good",
  output: "bg-ui-value/6 text-ui-label",
};

/**
 * The audit trail. Not in the brand file: drawn by the site in its language.
 * One invoice's history in the copy's own four words — input, decision,
 * approval, output — filterable by kind. Filtering dims rather than
 * removes, so the card never changes size and the sequence stays legible.
 */
export function AuditTrailCard({ maxScale = 1.4, className }: { maxScale?: number; className?: string }) {
  const [filter, setFilter] = useState<Filter>("all");

  return (
    <Stage width={WIDTH} maxScale={maxScale} label={data.alt} interactive className={className}>
      <div className="mb-[calc(var(--u)*6.5)] pl-[calc(var(--u)*152.4)]">
        <AgentPill>{data.pill}</AgentPill>
      </div>

      <div data-ptr="" className="card flex flex-col p-[calc(var(--u)*22-1px)]">
        <div className="flex items-center justify-between">
          <span className="font-data fs-u-10 font-bold text-ui-label">{data.title}</span>
          <span className="font-data fs-u-10 font-bold text-ui-label">{data.reference}</span>
        </div>

        <div className="mt-12 flex gap-2">
          {data.filters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                "ui-press flex h-22 items-center rounded-u-6 px-8 fs-u-10 font-semibold tracking-[-0.025em] transition-colors duration-150",
                filter === item.id ? "bg-ui-value/6 text-fg" : "text-ui-quiet",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-col">
          {data.events.map((event) => (
            <div
              key={event.time}
              className={cn(
                "flex h-30 items-center gap-10 border-b-[0.5px] border-ui-rule/60 transition-opacity duration-200 ease-(--ease-out) last:border-b-0",
                filter !== "all" && filter !== event.kind && "opacity-25",
              )}
            >
              <span className="w-44 shrink-0 font-data fs-u-8 font-medium text-ui-label tabular-nums">{event.time}</span>
              <span className={cn("flex w-52 shrink-0 justify-center rounded-u-3 py-2 font-data fs-u-7 font-bold", TAG[event.kind])}>
                {event.tag}
              </span>
              <span className="min-w-px flex-1 fs-u-10 font-semibold tracking-[-0.025em] whitespace-nowrap text-fg">{event.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex h-30 items-center justify-between rounded-u-6 bg-ui-total-tint px-10 whitespace-nowrap">
          <span className="font-data fs-u-8 font-bold text-ui-label">{data.footerLabel}</span>
          <span className="font-data fs-u-8 font-bold text-ui-value">{data.footerValue}</span>
        </div>
      </div>
    </Stage>
  );
}
