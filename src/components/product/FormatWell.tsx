"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { formatWell as data } from "@/content/product/wells";
import { Icon, type IconName as MaterialName } from "./Icon";
import { Well } from "./Well";


/** The row icons' paths, as exported from the brand file (21 × 21, 1.75 stroke). */
/** Row icon → Material Symbol (Sharp). */
const ICONS = {
  scan: "document_scanner",
  pdf: "picture_as_pdf",
  jpg: "image",
  email: "mail",
  portal: "language",
} as const satisfies Record<string, MaterialName>;

/**
 * The first well: a format menu with Scan chosen (node 1:16360). The menu is
 * taller than the space left for it, so the well's bottom edge cuts through
 * the last row, as drawn.
 */
export function FormatWell({ maxScale, className }: { maxScale?: number; className?: string }) {
  const drawn = Math.max(0, data.rows.findIndex((row) => row.selected));
  const [selected, setSelected] = useState(drawn);

  return (
    <Well label={data.alt} maxScale={maxScale} interactive className={className}>
      {/* Padding is measured from the card's outer edge in the drawing, so the
          1.167px hairline is taken out of it here. */}
      <div className="absolute top-75 right-46 left-47 flex h-325 flex-col gap-[calc(var(--u)*2.333)] overflow-clip rounded-t-[calc(var(--u)*14)] border-[length:calc(var(--u)*1.167)] border-ui-card-line/60 bg-bg px-[calc(var(--u)*10.5)] py-[calc(var(--u)*17.5)] shadow-[0_calc(var(--u)*1.167)_calc(var(--u)*3.5)_0_rgb(0_0_0/0.04),0_calc(var(--u)*4.667)_calc(var(--u)*23.333)_0_rgb(0_0_0/0.08)]">
        <div className="flex h-[calc(var(--u)*44.333)] shrink-0 items-center justify-between px-21">
          <span className="text-[length:calc(var(--u)*23.333)] font-semibold tracking-[-0.025em] text-ui-slate">{data.title}</span>
          <Icon name="expand_less" className="size-[calc(var(--u)*22)] text-ui-faint" />
        </div>

        {/* The rows work like the list they depict: the selection is one bar
            that travels to whichever row is pointed at, focused or pressed.
            It starts where the drawing has it. */}
        <div className="relative flex flex-col gap-[calc(var(--u)*2.333)]" onPointerLeave={() => setSelected(drawn)}>
          <span
            aria-hidden="true"
            // The highlight stops 14.333px short of the rows, as drawn.
            className="ui-selection absolute top-0 left-0 h-[calc(var(--u)*51.333)] w-[calc(var(--u)*429.333)] rounded-[calc(var(--u)*9.333)] bg-ui-select/8"
            style={{ transform: `translateY(calc(var(--u) * ${53.666 * selected}))` }}
          />
          {data.rows.map((row, index) => {
            const on = index === selected;
            return (
              <button
                key={row.label}
                type="button"
                aria-pressed={on}
                onClick={() => setSelected(index)}
                onPointerEnter={() => setSelected(index)}
                onFocus={() => setSelected(index)}
                className="ui-press relative flex h-[calc(var(--u)*51.333)] w-full shrink-0 items-center gap-[calc(var(--u)*16.333)] px-21 text-left"
              >
                <Icon name={ICONS[row.icon]} className={cn("size-24 transition-colors duration-150", on ? "text-ui-select" : "text-ui-faint")} />
                <span
                  className={cn(
                    "fs-u-21 font-medium tracking-[-0.025em] transition-colors duration-150",
                    on ? "text-ui-select" : "text-ui-meta",
                  )}
                >
                  {row.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </Well>
  );
}
