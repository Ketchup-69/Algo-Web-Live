"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { verificationCards as data } from "@/content/product/verification";
import { Icon } from "./Icon";
import { Stage } from "./Stage";

/** Drawn at 1440 × 640 in the brand file (node 1:17712). */
const WIDTH = 1440;
/** One 570-wide card plus 40 of air either side. */
const STACKED_WIDTH = 650;

/** Widths of the three placeholder bars in a ghost card's body, in design px. */
const GHOST_BARS = ["w-110", "w-85", "w-95"] as const;

type Card = (typeof data.cards)[number];

/**
 * A neighbouring card, half off the frame: the left one is all bars, the
 * right one has the start of a title, as drawn.
 */
function GhostCard({ title, className }: { title?: string; className?: string }) {
  return (
    <div className={cn("absolute top-110 flex w-260 flex-col gap-8", className)}>
      <div className="flex h-64 items-center gap-10 rounded-u-12 bg-ui-ghost-pill py-14 pr-24 pl-20">
        <span className="size-36 shrink-0 rounded-u-18 bg-ui-ghost-mark" />
        <div className={cn("flex flex-col items-start", title ? "gap-4" : "gap-6")}>
          {title ? (
            <span className="fs-u-14 font-semibold whitespace-nowrap text-ui-ghost-text">{title}</span>
          ) : (
            <span className="h-13 w-70 rounded-u-4 bg-ui-ghost-mark" />
          )}
          <span className="h-9 w-50 rounded-u-4 bg-ui-ghost-sub" />
        </div>
      </div>
      <div className="flex flex-col gap-20 rounded-u-16 bg-ui-ghost-body px-20 py-24">
        {GHOST_BARS.map((width) => (
          <div key={width} className="flex items-center gap-10">
            <span className="size-18 shrink-0 rounded-u-9 bg-ui-ghost-dot" />
            <span className={cn("h-11 rounded-u-4 bg-ui-ghost-bar", width)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function VerificationCard({ card }: { card: Card }) {
  // A person can accept the variance. That is the one thing to do here, and
  // doing it is what turns a flagged invoice into a cleared one.
  const [accepted, setAccepted] = useState(false);
  const flagged = card.tone === "flagged" && !accepted;
  return (
    <div className="flex w-570 shrink-0 flex-col gap-8">
      {/* The drawing spaces the supplier with a fixed gap (167 / 160) that
          lands its right edge 3–5px short of the 28px padding; the names here
          are different lengths, so it is set against the padding instead. */}
      <div className="flex items-center justify-between rounded-u-16 bg-bg py-16 pr-28 pl-20 whitespace-nowrap">
        <div className="flex items-center gap-16">
          {/* The brand file's own glyph sits outside its clip frame and never
              renders; these are the site's icon set. */}
          <span
            className={cn(
              "flex size-44 shrink-0 items-center justify-center rounded-u-22 transition-colors duration-200",
              flagged ? "bg-ui-flag text-ui-on-flag" : "bg-ui-approved text-ui-on-good",
            )}
          >
            <Icon name={flagged ? "priority_high" : "check"} className="size-26" />
          </span>
          <span key={String(accepted)} className="ui-swap fs-u-20 font-bold tracking-[-0.025em] text-ui-title">
            {accepted ? data.accepted.status : card.status}
          </span>
        </div>
        <span
          className={cn(
            "fs-u-16 font-bold tracking-[-0.025em]",
            "transition-colors duration-200",
            flagged ? "text-ui-flag-quiet" : "text-ui-approved-quiet",
          )}
        >
          {card.supplier}
        </span>
      </div>

      <div className="flex flex-col rounded-u-16 bg-ui-sheet p-28 shadow-[0_calc(var(--u)*8)_calc(var(--u)*12)_0_rgb(0_0_0/0.2)]">
        {card.rows.map((row, index) => {
          const open = row.variance && !accepted;
          const Row = row.variance ? "button" : "div";
          return (
          <Row
            key={row.label}
            {...(row.variance
              ? { type: "button" as const, "aria-pressed": accepted, onClick: () => setAccepted((value) => !value) }
              : {})}
            className={cn(
              "relative flex w-full items-center justify-between text-left",
              row.variance && "ui-press",
              index > 0 && "pt-16",
              index < card.rows.length - 1 && "pb-16",
            )}
          >
            <span className="flex items-center gap-12">
              <span
                className={cn(
                  "flex size-22 shrink-0 items-center justify-center rounded-u-11 transition-colors duration-200",
                  open ? "bg-ui-flag text-ui-on-flag" : "bg-ui-approved text-ui-on-good",
                )}
              >
                <Icon name={open ? "priority_high" : "check"} className="size-14" />
              </span>
              <span className="fs-u-14 font-medium whitespace-nowrap text-ui-row-text">{row.label}</span>
            </span>
            <span
              key={String(open)}
              className={cn(
                "ui-swap rounded-u-6 px-10 py-4 fs-u-11 font-bold tracking-[0.0455em] whitespace-nowrap",
                open ? "bg-ui-flag text-ui-on-flag" : "bg-ui-approved text-ui-on-good",
              )}
            >
              {row.variance && accepted ? data.accepted.tag : row.tag}
            </span>
            {/* A 1px rule on the row's bottom edge, taking no height, as drawn. */}
            {index < card.rows.length - 1 && <span className="absolute inset-x-0 bottom-0 h-1 bg-ui-hairline" />}
          </Row>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Two document checks side by side, one cleared and one flagged, with the
 * neighbouring cards ghosted off either edge. The ground is transparent: the
 * brand file's dark canvas is not part of the drawing.
 */
export function VerificationCards({
  maxScale = 1,
  ghosts = true,
  stacked = false,
  className,
}: {
  maxScale?: number;
  /** The neighbouring cards were drawn for a dark canvas; leave them off on a light ground. */
  ghosts?: boolean;
  /**
   * One card above the other, for narrow screens. The side-by-side drawing
   * is 1440 wide, and scaled to a phone its 14px type would be under 4px.
   */
  stacked?: boolean;
  className?: string;
}) {
  if (stacked) {
    return (
      <Stage width={STACKED_WIDTH} maxScale={maxScale} label={data.alt} interactive className={className}>
        <div className="flex flex-col items-center gap-24 py-40">
          {data.cards.map((card) => (
            <VerificationCard key={card.tone} card={card} />
          ))}
        </div>
      </Stage>
    );
  }

  return (
    <Stage width={WIDTH} maxScale={maxScale} label={data.alt} interactive className={className}>
      <div className="relative flex aspect-[1440/640] items-center justify-center gap-24 overflow-hidden">
        {ghosts ? (
          <>
            <GhostCard className="left-[calc(var(--u)*-130)]" />
            <GhostCard title={data.ghostTitle} className="left-1310" />
          </>
        ) : null}
        {data.cards.map((card) => (
          <VerificationCard key={card.tone} card={card} />
        ))}
      </div>
    </Stage>
  );
}
