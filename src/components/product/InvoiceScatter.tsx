"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { invoiceScatter as data } from "@/content/product/scatter";
import { AgentMark } from "./AgentPill";
import { CheckMark, Chip, dash } from "./Dash";
import { Stage } from "./Stage";

/** Drawn at 1094 × 1056 in the brand file (node 1:16223), print scale. */
const WIDTH = 1094;

const u = (n: number) => `calc(var(--u) * ${n})`;

/** A ghost card is a stack of these, top to bottom. */
type Block = "amount" | "rule" | "spacer" | { bars: readonly number[]; h?: number; gap?: number };

/** The three sizes the ghost cards are drawn at. */
const SIZES = {
  large: { pad: 30.178, gap: 22.634, radius: 4, title: 22.634, bar: 11.317, label: 10, amount: 11 },
  medium: { pad: 37, gap: 27.75, radius: 4.904, title: 18.391, bar: 9.809, label: 9.809, amount: 11.035 },
  small: { pad: 30.178, gap: 22.634, radius: 4, title: 15, bar: 8, label: 8, amount: 9 },
} as const;

const shadow = (x: number, y: number, blur: number, alpha: number, k = 1) =>
  `${u(x)} ${u(y)} ${u(blur)} 0 rgb(0 0 0 / ${alpha}), 0 ${u(4 * k)} ${u(16 * k)} 0 rgb(0 0 0 / 0.08)`;
const SHADOW = shadow(11.317, 15.089, 37.723, 0.094);

type GhostId = "castell" | "lakeside" | "ashby" | "bramwell" | "fernhill" | "summit" | "redwood";

type Ghost = {
  id: GhostId;
  /** Top-left of the unrotated card; it turns about its centre, as drawn. */
  left: number;
  top: number;
  width: number;
  height: number;
  rotate: number;
  /** Layer blur radius as the brand file states it. */
  blur: number;
  depth: 1 | 2 | 3;
  size: keyof typeof SIZES;
  clip: boolean;
  shadow: string;
  blocks: readonly Block[];
};

const GHOSTS: readonly Ghost[] = [
  {
    id: "castell",
    left: -67.505,
    top: 433.12,
    width: 471.535,
    height: 282.921,
    rotate: 6,
    blur: 0,
    depth: 1,
    size: "large",
    clip: false,
    shadow: SHADOW,
    blocks: [{ bars: [301.782, 207.475] }, "spacer", "amount", { bars: [245.198, 180] }],
  },
  {
    id: "lakeside",
    left: 521.586,
    top: -16.949,
    width: 351.324,
    height: 184.769,
    rotate: -1,
    blur: 6,
    depth: 3,
    size: "medium",
    clip: true,
    shadow: shadow(13.875, 18.5, 46.251, 0.094, 1.226),
    blocks: [{ bars: [302.838, 176.553] }, "amount", { bars: [201.074, 194.944] }],
  },
  {
    id: "ashby",
    left: 903.266,
    top: 609.239,
    width: 294,
    height: 151,
    rotate: -11.699,
    blur: 5,
    depth: 3,
    size: "small",
    clip: true,
    shadow: SHADOW,
    blocks: [{ bars: [211, 159] }, "amount", { bars: [166, 128] }],
  },
  {
    id: "bramwell",
    left: -26.878,
    top: 1.18,
    width: 490.396,
    height: 301.782,
    rotate: 5.095,
    blur: 0,
    depth: 1,
    size: "large",
    // Not clipped in the drawing, so its last bar hangs below the card there too.
    clip: false,
    shadow: SHADOW,
    blocks: [{ bars: [180] }, "spacer", { bars: [169.752, 264.059, 220, 190] }, "amount", "rule", { bars: [140] }],
  },
  {
    id: "fernhill",
    left: 731.879,
    top: 179.12,
    width: 471.535,
    height: 301.782,
    rotate: -1.5,
    blur: 1,
    depth: 2,
    size: "large",
    clip: false,
    shadow: shadow(7.545, 11.317, 30.178, 0.082),
    blocks: ["rule", { bars: [226.337, 282.921, 150.891] }, "amount", { bars: [120, 90], h: 8, gap: 6 }],
  },
  {
    id: "summit",
    left: 135.581,
    top: 790.005,
    width: 325,
    height: 196,
    rotate: 5.455,
    blur: 5,
    depth: 3,
    size: "small",
    clip: true,
    shadow: SHADOW,
    blocks: [{ bars: [186, 136] }, "amount", { bars: [146, 110] }],
  },
  {
    id: "redwood",
    left: 782.29,
    top: 837.84,
    width: 349,
    height: 194,
    rotate: -5,
    blur: 1,
    depth: 2,
    size: "small",
    clip: true,
    shadow: SHADOW,
    blocks: [{ bars: [213, 144] }, "amount", { bars: [182, 140] }],
  },
];

type GhostText = { name: string; label: string; amount: string };

/**
 * A background card. `look` is the card as it was drawn (its size and its
 * bars); `slot` is where in the pile it currently sits. The two are the same
 * for every card at rest, which is the drawing exactly. When the pile moves
 * up, a card keeps its look and takes the next slot: the outer box carries
 * that placement as ONE transform (translate, turn, scale), so moving is
 * compositor work, and the inner box keeps the drawn card plus everything
 * else that animates it — the entrance tween and the pointer lean — so the
 * three never fight over a property.
 */
function GhostCard({
  look,
  slot,
  text,
  away = false,
  joined = false,
  wait = 0,
}: {
  look: Ghost;
  slot: Ghost;
  text: GhostText;
  away?: boolean;
  /** It was not in the pile at the start: it slides in from beyond the frame. */
  joined?: boolean;
  /** Milliseconds this card holds back before it moves, so the queue ripples. */
  wait?: number;
}) {
  const size = SIZES[look.size];
  const place = `translate(${u(slot.left + slot.width / 2 - (look.left + look.width / 2))}, ${u(
    slot.top + slot.height / 2 - (look.top + look.height / 2),
  )}) rotate(${slot.rotate}deg) scale(${(slot.width / look.width).toFixed(4)})`;
  return (
    <div
      className={cn("ghost-slot absolute", joined && "ghost-joined")}
      style={
        {
          left: u(look.left),
          top: u(look.top),
          width: u(look.width),
          height: u(look.height),
          "--place": place,
          "--wait": `${wait}ms`,
          // Lifted out of the pile: its invoice is the one in front.
          opacity: away ? 0 : 1,
        } as CSSProperties
      }
    >
    <div
      data-ghost=""
      data-ptr=""
      data-depth={slot.depth}
      // The whole group of ghosts is drawn at 70%.
      className={cn("flex size-full flex-col bg-ui-sheet font-medium text-ui-value opacity-70", look.clip && "overflow-hidden")}
      style={{
        padding: u(size.pad),
        gap: u(size.gap),
        borderRadius: u(size.radius),
        boxShadow: look.shadow,
        // A layer blur's radius in the brand file is twice CSS's standard deviation.
        filter: slot.blur ? `blur(${u(slot.blur / 2)})` : undefined,
      }}
    >
      <span className="shrink-0 opacity-55" style={{ fontSize: u(size.title) }}>
        {text.name}
      </span>
      {look.blocks.map((block, index) => {
        if (block === "spacer") return <span key={index} className="h-[calc(var(--u)*22.63)] shrink-0" />;
        if (block === "rule") return <span key={index} className="h-1 shrink-0 bg-border" />;
        if (block === "amount")
          return (
            <span key={index} className="flex shrink-0 items-center justify-between whitespace-nowrap opacity-30">
              <span style={{ fontSize: u(size.label) }}>{text.label}</span>
              <span className="font-data" style={{ fontSize: u(size.amount) }}>
                {text.amount}
              </span>
            </span>
          );
        const h = block.h ?? size.bar;
        return (
          <span key={index} className="flex shrink-0 flex-col" style={{ gap: u(block.gap ?? h) }}>
            {block.bars.map((width) => (
              <span key={width} className="bg-border" style={{ width: u(width), height: u(h), borderRadius: u(h / 2) }} />
            ))}
          </span>
        );
      })}
    </div>
    </div>
  );
}

const printed = "tracking-[-0.025em] text-ui-doc-ink";
const L = data.labels;

/**
 * The hero's invoice scatter, measurement for measurement from the brand
 * file: a dotted ground, seven ghost invoices at three depths, and the one
 * the agent is reading in front, with the pill beneath it. Static; the hooks
 * for motion are `data-ghost` / `data-depth`, `data-scan`, `data-select` and
 * `data-pill`. The ghosts reach past the frame on both sides, as drawn, so
 * whatever holds this decides whether that overflow shows.
 */
const ghost = (id: GhostId): Ghost => {
  const found = GHOSTS.find((item) => item.id === id);
  if (!found) throw new Error(`No ghost card drawn as "${id}"`);
  return found;
};

/** The three far, blurred cards. They stay where they are. */
const FAR = (["lakeside", "ashby", "summit"] as const).map(ghost);

/**
 * The four near cards are a queue. RING is its places, from the one a card
 * is pulled forward from (left of the front card) back to the one a new card
 * joins at (bottom right, nearest the edge it slides in from). LOOKS is the
 * four drawn cards in the same order, so at the start every card is in its
 * own place: the drawing.
 */
const RING = (["castell", "bramwell", "fernhill", "redwood"] as const).map(ghost);
const PULL = RING[0] as Ghost;

/** How many invoices take turns (the first is the drawing and never returns). */
const TURNS = data.cycle.length - 1;
/** The invoice with serial number `serial`, counting from 1, round and round. */
const turn = (serial: number) => data.cycle[((serial - 1) % TURNS) + 1] as Invoice;

/** The front card's box in the drawing, and its centre. */
const FRONT = { left: 150, top: 200, width: 640, height: 500 };

type Invoice = (typeof data.cycle)[number];

/**
 * rest     the drawing, still. Where it starts, and where it stays with
 *          motion reduced.
 * read     the band sweeps the invoice; the agent says what it is doing.
 * resolve  what it read becomes structure; the agent says what it found.
 * exit     the finished invoice leaves. Nothing else happens until it has.
 * pre      the next invoice is placed, unseen, exactly over its background card.
 * enter    it comes forward out of that card to the front.
 */
type Phase = "rest" | "read" | "resolve" | "exit" | "pre" | "enter";
const NEXT: Record<Phase, { to: Phase; after: number }> = {
  rest: { to: "read", after: 1900 },
  read: { to: "resolve", after: 2900 },
  resolve: { to: "exit", after: 3400 },
  exit: { to: "pre", after: 620 },
  pre: { to: "enter", after: 60 },
  enter: { to: "read", after: 1250 },
};

/**
 * The hero: invoices worked through one at a time, for ever.
 *
 * Measurement for measurement from the brand file for the first invoice at
 * rest; the cycle, the resolved state and the other invoices are the site's,
 * built from the same parts. A finished invoice leaves BEFORE the next comes
 * forward, and the next comes out of the background card that carries its
 * name. That card leaves the pile for good: the others each move up a place
 * and a new card slides in at the back, so the pile is a queue that never
 * runs out.
 *
 * One small state machine drives `data-phase`; every visual change is CSS
 * keyed off it (motion.css), transform and opacity only. It waits while the
 * hero is off screen or the tab is hidden, and never starts under reduced
 * motion. The ghosts reach past the frame on both sides, as drawn, so
 * whatever holds this decides whether that overflow shows.
 */
export function InvoiceScatter({ maxScale = 0.62, className }: { maxScale?: number; className?: string }) {
  // How many invoices have been pulled forward so far. 0 is the drawing.
  const [pulls, setPulls] = useState(0);
  const [phase, setPhase] = useState<Phase>("rest");
  const [awake, setAwake] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  const invoice: Invoice = pulls === 0 ? data.cycle[0] : turn(pulls);
  // The pile still shows the old arrangement while the next invoice is being
  // set down, unseen, over the card it is about to come out of.
  const moved = phase === "pre" ? pulls - 1 : pulls;

  // Run only while it can be seen.
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    // Reduced motion: no cycle, just the first invoice as read and checked.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Syncing with the visitor's motion setting, an external system.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("resolve");
      return;
    }
    let onScreen = false;
    const update = () => setAwake(onScreen && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = Boolean(entry?.isIntersecting);
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (!awake) return;
    const step = NEXT[phase];
    const timer = window.setTimeout(() => {
      // The invoice changes while nothing is showing: between exit and pre.
      if (phase === "exit") setPulls((current) => current + 1);
      setPhase(step.to);
    }, step.after);
    return () => window.clearTimeout(timer);
  }, [awake, phase]);

  // The pill is as wide as its longer line; the shorter one is shown by
  // closing the pill in from both ends. As fractions of the pill's width they
  // hold at any scale, so they are measured once per invoice.
  const pill = useRef<HTMLDivElement>(null);
  const [cuts, setCuts] = useState<readonly [number, number]>([0, 0]);
  useLayoutEffect(() => {
    const measure = () => {
      const body = pill.current;
      if (!body) return;
      const lines = Array.from(body.querySelectorAll<HTMLElement>("[data-line]"));
      const widths = lines.map((line) => line.getBoundingClientRect().width);
      const full = body.getBoundingClientRect().width;
      const widest = Math.max(...widths);
      if (!full || widths.length < 2) return;
      setCuts([((widest - (widths[0] ?? 0)) / 2 / full) * 100, ((widest - (widths[1] ?? 0)) / 2 / full) * 100]);
    };
    measure();
    void document.fonts?.ready.then(measure);
  }, [pulls]);

  const resolved = phase === "resolve" || phase === "exit";
  const cut = resolved ? cuts[1] : cuts[0];

  // Where the card has to sit to lie exactly over its background card: that
  // card's centre, its width, its turn.
  const from = `translate(${u(PULL.left + PULL.width / 2 - (FRONT.left + FRONT.width / 2))}, ${u(
    PULL.top + PULL.height / 2 - (FRONT.top + FRONT.height / 2),
  )}) rotate(${PULL.rotate}deg) scale(${(PULL.width / FRONT.width).toFixed(4)})`;

  return (
    <Stage width={WIDTH} maxScale={maxScale} label={data.alt} className={className}>
      <div ref={root} data-phase={phase} className="hero-cycle relative aspect-[1094/1056]">
        {/* The ground sits 11px right of and 11px above the scatter's frame. */}
        <div className="scatter-ground -top-11 left-11 h-1056 w-1095" />

        {FAR.map((card) => (
          <GhostCard key={card.id} look={card} slot={card} text={data.ghosts[card.id as keyof typeof data.ghosts]} />
        ))}

        {/* The queue. A card with serial number n waits in place n − moved
            (1 is the place it will be pulled from). At 0 it has just been
            pulled: it fades where it was while its invoice comes forward, and
            is gone by the next move. A new serial mounts at the last place
            and slides in from beyond the frame. Keyed by serial, so a card
            that changes place is the same element moving, not a swap. */}
        {Array.from({ length: RING.length + 1 }, (_, place) => {
          const serial = moved + place;
          if (serial < 1) return null;
          const slot = RING[Math.max(place, 1) - 1] as Ghost;
          const look = RING[(serial - 1) % RING.length] as Ghost;
          const waiting = turn(serial);
          return (
            <GhostCard
              key={serial}
              look={look}
              slot={slot}
              away={place === 0}
              joined={serial > RING.length}
              // The pulled card goes at once; each one behind it a beat later.
              wait={place === 0 ? 0 : 140 + (place - 1) * 90}
              text={{ name: waiting.supplier, label: data.ghostLabel, amount: `${data.labels.currency} ${waiting.total}` }}
            />
          );
        })}

        <div
          className="hero-card absolute top-200 left-150 flex h-500 w-640 flex-col rounded-u-6 bg-bg px-30 pt-26 pb-24 text-ui-doc-ink shadow-[0_calc(var(--u)*38)_calc(var(--u)*90)_0_rgb(0_0_0/0.55),0_calc(var(--u)*4)_calc(var(--u)*16)_0_rgb(0_0_0/0.08)]"
          style={{ "--from": from } as CSSProperties}
        >
          {/* Head: the document's title and the supplier on the left, its number on the right. */}
          <div className="relative flex items-start justify-between gap-16">
            <div className="flex flex-col">
              <span className={cn(printed, "fs-u-28 leading-[calc(var(--u)*34)] font-semibold")}>{L.title}</span>
              <span className={cn(printed, "mt-8 fs-u-16 font-semibold")}>{invoice.supplier}</span>
              <span className="mt-3 font-data fs-u-12 font-medium text-ui-quiet">
                {L.trn} {invoice.trn}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="fs-u-11.5 font-medium text-ui-quiet">{L.invoiceNo}</span>
              <span className="mt-3 font-data fs-u-17 font-semibold text-ui-value">{invoice.number}</span>
              <span className="relative mt-10 h-22">
                <span className="hero-b absolute top-0 right-0">
                  <Chip chip={[invoice.tone === "flag" ? "flag" : "ai", invoice.chip]} />
                </span>
              </span>
            </div>
          </div>

          {/* Who it is addressed to, and the references the checks run against. */}
          <div className="mt-18 grid grid-cols-[1.1fr_1fr] gap-20 border-t border-border pt-16">
            <div className="flex flex-col">
              <span className="fs-u-11.5 font-medium text-ui-quiet">{L.billTo}</span>
              <span className="mt-4 fs-u-13.5 font-semibold text-ui-value">{data.billTo.name}</span>
              <span className="mt-2 fs-u-12 font-medium text-ui-quiet">{data.billTo.place}</span>
              <span className="mt-2 font-data fs-u-12 font-medium text-ui-quiet">
                {L.trn} {data.billTo.trn}
              </span>
            </div>
            <dl className="grid grid-cols-2 gap-x-16 gap-y-10">
              {(
                [
                  [L.invoiceDate, invoice.date],
                  [L.dueDate, invoice.due],
                  [L.lpo, invoice.lpo],
                  [L.grn, invoice.grn],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="flex flex-col">
                  <dt className="fs-u-11.5 font-medium text-ui-quiet">{label}</dt>
                  <dd className="mt-3 font-data fs-u-13 font-semibold whitespace-nowrap text-ui-value">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The lines. */}
          <div className="mt-18">
            <div className="grid h-28 grid-cols-[minmax(0,1fr)_calc(var(--u)*44)_calc(var(--u)*92)_calc(var(--u)*104)] items-center rounded-u-6 bg-bg-subtle px-12 fs-u-11 font-semibold text-ui-quiet">
              <span>{L.description}</span>
              <span className="text-right">{L.qty}</span>
              <span className="text-right">{L.unit}</span>
              <span className="text-right">{L.amount}</span>
            </div>
            {invoice.lines.map((line, index) => (
              <div
                key={`${invoice.number}-${index}`}
                className="grid h-34 grid-cols-[minmax(0,1fr)_calc(var(--u)*44)_calc(var(--u)*92)_calc(var(--u)*104)] items-center border-b border-border px-12 fs-u-13 text-ui-value"
              >
                <span className="truncate font-medium">{line.description}</span>
                <span className="text-right font-data">{line.qty}</span>
                <span className="text-right font-data">{line.unit}</span>
                <span className="text-right font-data font-semibold">{line.amount}</span>
              </div>
            ))}
          </div>

          {/* Subtotal, VAT and the total, right-aligned under the amounts. */}
          <dl className="mt-16 ml-auto flex w-300 flex-col gap-6 pr-12 fs-u-13 text-ui-value">
            <div className="flex justify-between">
              <dt className="font-medium text-ui-quiet">{L.subtotal}</dt>
              <dd className="font-data font-semibold">{invoice.subtotal}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="font-medium text-ui-quiet">{L.vat}</dt>
              <dd className="font-data font-semibold">{invoice.vat}</dd>
            </div>
            <div className="mt-2 flex items-baseline justify-between border-t border-border pt-10">
              <dt className="fs-u-15 font-semibold">{L.total}</dt>
              <dd className="font-data fs-u-22 font-bold tracking-[-0.02em]">
                <span className={dash.currency}>{L.currency}</span>
                {invoice.total}
              </dd>
            </div>
          </dl>

          <div
            data-scan=""
            className="absolute top-450 left-0 h-9 w-640 rounded-[calc(var(--u)*11.03)] border-[length:var(--u)] border-ui-scan bg-ui-scan/60 shadow-[0_0_calc(var(--u)*71.693)_calc(var(--u)*5.515)_var(--algo-ui-scan)]"
          />
        </div>

        {/* What the AI checked: the dashboard's own card and wording, laid
            over the invoice's empty lower left once it has been read, so it
            covers none of the printed figures. */}
        <div className="hero-checks card absolute top-560 left-40 w-400 px-18 pt-16 pb-14">
          <div className="fs-u-13.5 font-semibold tracking-[-0.015em] text-ui-value">{L.checksTitle}</div>
          <ul className="mt-10 overflow-hidden rounded-u-10 border border-border">
            {invoice.checks.map((check, index) => (
              <li
                key={`${invoice.number}-${check.label}`}
                style={{ "--i": index } as CSSProperties}
                className={cn(
                  "hero-check flex min-h-38 items-center gap-10 border-t border-border px-12 py-7 fs-u-12 tracking-[-0.01em] text-ui-value first:border-t-0",
                  check.flagged ? "bg-ui-row-tint font-semibold" : "font-medium",
                )}
              >
                <CheckMark flagged={check.flagged} />
                <span className="min-w-0 flex-1 leading-[1.3]">{check.label}</span>
                <span
                  className={cn(
                    "font-data fs-u-11 whitespace-nowrap",
                    check.flagged ? "font-semibold text-ui-value" : "text-ui-quiet",
                  )}
                >
                  {check.value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* What the agent is saying. Centred under the card, as drawn. The
            shadow is a drop-shadow on this wrapper because the pill beneath
            is clipped to its current line, and a box-shadow would be clipped
            with it; this one follows the shape that is left. */}
        <div
          data-pill=""
          className="hero-pill absolute -translate-x-1/2"
          style={
            {
              // Placed in the stage's own unit; the pill's type and padding
              // run on its larger unit, set beside it.
              top: "calc(100cqw / var(--stage-width) * 776)",
              left: "calc(100cqw / var(--stage-width) * 700)",
              "--u": "calc(100cqw / var(--stage-width) * 2.2642)",
              "--spacing": "var(--u)",
            } as CSSProperties
          }
        >
          <div
            ref={pill}
            className="hero-pill-body grid rounded-u-7 bg-bg p-[calc(var(--u)*10.6)] whitespace-nowrap"
            style={{ "--cut": `${cut.toFixed(3)}%` } as CSSProperties}
          >
            {[invoice.thinking, invoice.resolved].map((line, lineIndex) => (
              <span
                key={lineIndex}
                data-line=""
                data-on={(lineIndex === 1) === resolved}
                className="hero-line col-start-1 row-start-1 flex items-center gap-7 justify-self-center"
              >
                <AgentMark live={lineIndex === 0} />
                <span className="text-ui-pill fs-u-13.25 font-semibold tracking-[-0.03em]">{line}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
}
