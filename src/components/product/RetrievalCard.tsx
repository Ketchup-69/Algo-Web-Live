"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { retrievalCard as data } from "@/content/product/governance";
import { AgentPill } from "./AgentPill";
import { Icon } from "./Icon";
import { Stage } from "./Stage";

/** Same width as the approval card, so the governance visuals swap at one scale. */
const WIDTH = 460;

/**
 * Grounded, permissioned retrieval. Not in the brand file: drawn by the site
 * in its language (see docs/product-visuals). An answer whose every claim
 * carries a numbered citation, the records those numbers point to, and one
 * record the asking role may not see. Pointing at a citation lights its
 * record, and the other way round — that link is the whole claim.
 */
export function RetrievalCard({ maxScale = 1.4, className }: { maxScale?: number; className?: string }) {
  const [lit, setLit] = useState<number | null>(null);
  const hooks = (n: number) => ({
    onPointerEnter: () => setLit(n),
    onPointerLeave: () => setLit(null),
    onFocus: () => setLit(n),
    onBlur: () => setLit(null),
  });

  return (
    <Stage width={WIDTH} maxScale={maxScale} label={data.alt} interactive className={className}>
      <div className="mb-[calc(var(--u)*6.5)] pl-[calc(var(--u)*152.4)]">
        <AgentPill>{data.pill}</AgentPill>
      </div>

      <div data-ptr="" className="card flex flex-col p-[calc(var(--u)*22-1px)]">
        <div className="flex items-center justify-between">
          <span className="font-data fs-u-10 font-bold text-ui-label">{data.roleLabel}</span>
          <span className="rounded-u-3 bg-ui-value/6 px-6 py-2 font-data fs-u-8 font-medium text-ui-value">{data.role}</span>
        </div>

        <p className="mt-16 fs-u-14 font-semibold tracking-[-0.025em] text-fg">{data.question}</p>
        <p className="mt-8 fs-u-10 leading-[1.55] font-semibold tracking-[-0.02em] text-ui-value/70">
          {data.answer.map((part, i) =>
            "cite" in part ? (
              <button
                key={i}
                type="button"
                {...hooks(part.cite)}
                className={cn(
                  "mx-2 inline-flex h-12 min-w-12 items-center justify-center rounded-u-3 px-3 align-middle font-data fs-u-8 font-bold transition-colors duration-150",
                  lit === part.cite ? "bg-ui-ai text-ui-on-ai" : "bg-ui-code-soft text-ui-code",
                )}
              >
                {part.cite}
              </button>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </p>

        <div className="h-16 border-b-[0.5px] border-ui-rule" />

        <span className="mt-12 font-data fs-u-10 font-bold text-ui-label">{data.sourcesLabel}</span>
        <div className="mt-6 flex flex-col">
          {data.sources.map((source, i) => {
            const n = i + 1;
            return (
              <button
                key={source.title}
                type="button"
                {...hooks(n)}
                className={cn(
                  "-mx-6 flex h-28 items-center justify-between rounded-u-4 px-6 text-left transition-colors duration-150",
                  lit === n && "bg-ui-ai/8",
                )}
              >
                <span className="flex items-center gap-8">
                  <span className="flex size-12 items-center justify-center rounded-u-3 bg-ui-code-soft font-data fs-u-8 font-bold text-ui-code">
                    {n}
                  </span>
                  <span
                    className={cn(
                      "fs-u-10 leading-[1.2] font-semibold tracking-[-0.03em] transition-colors duration-150",
                      lit === n ? "text-fg" : "text-ui-quiet",
                    )}
                  >
                    {source.title}
                  </span>
                </span>
                <span className="font-data fs-u-8 font-medium text-ui-value">{source.detail}</span>
              </button>
            );
          })}

          {/* The record this role may not see: present, named, and closed. */}
          <div className="flex h-28 items-center justify-between opacity-60">
            <span className="flex items-center gap-8">
              <Icon name="lock" className="size-12 text-ui-label" />
              <span className="fs-u-10 leading-[1.2] font-semibold tracking-[-0.03em] text-ui-quiet">{data.locked.title}</span>
            </span>
            <span className="rounded-u-3 bg-ui-value/6 px-6 py-2 font-data fs-u-8 font-medium text-ui-label">{data.locked.tag}</span>
          </div>
        </div>
      </div>
    </Stage>
  );
}
