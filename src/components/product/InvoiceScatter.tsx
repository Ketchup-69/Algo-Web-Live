"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { invoiceScatter as data } from "@/content/product/scatter";
import { AgentMark } from "./AgentPill";
import { Icon } from "./Icon";
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
              <span className="font-mono" style={{ fontSize: u(size.amount) }}>
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

const printed = "font-medium tracking-[-0.05em] text-ui-doc-ink";
const figure = "font-mono text-[length:calc(var(--u)*22.634)] leading-[calc(var(--u)*29)]";

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
const FRONT = { left: 232, top: 289, width: 630, height: 360 };

type Invoice = (typeof data.cycle)[number];
type Line = Invoice["lines"][number];

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

const TONE = {
  code: { sub: "text-ui-code", tag: "bg-ui-match-soft text-ui-match" },
  flag: { sub: "text-ui-variance", tag: "bg-ui-variance-soft text-ui-variance" },
} as const;

/**
 * What a line gains once the agent has dealt with it: a tint behind it, a
 * tick (or a warning) before it, and its GL code (or the reason) in one
 * column beside the amounts. Laid over the printed row and only ever faded,
 * so the invoice underneath never moves except for the label stepping aside.
 * Both tints are 40 tall and 2.5 apart whatever the row's own height.
 */
function ResolvedRow({ line, inset }: { line: Line; inset: string }) {
  return (
    <>
      <span className={cn("hero-b absolute -inset-x-14 rounded-u-8", inset, line.flag ? "bg-ui-variance-soft" : "bg-ui-code-soft")} />
      <Icon
        name={line.flag ? "error" : "check_circle"}
        className={cn("hero-b absolute top-1/2 left-0 size-26 -translate-y-1/2", line.flag ? "text-ui-variance" : "text-ui-code")}
      />
      <span
        className={cn(
          "hero-b absolute top-1/2 right-175 flex -translate-y-1/2 items-center gap-6 font-mono fs-u-15 font-semibold whitespace-nowrap",
          line.flag ? "text-ui-variance" : "text-ui-code",
        )}
      >
        {/* A reason is not a destination, so it carries no arrow. */}
        {line.flag ? null : <Icon name="arrow_forward" className="size-16" />}
        {line.code}
      </span>
    </>
  );
}

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
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
  const tone = TONE[invoice.tone];
  const [first, second] = invoice.lines;

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
              text={{ name: waiting.supplier, label: data.ghostLabel, amount: waiting.total.amount }}
            />
          );
        })}

        <div
          className="hero-card absolute top-289 left-232 flex h-360 w-630 flex-col gap-16 rounded-u-4 bg-bg px-32 py-24 shadow-[0_calc(var(--u)*38)_calc(var(--u)*90)_0_rgb(0_0_0/0.7),0_calc(var(--u)*4)_calc(var(--u)*16)_0_rgb(0_0_0/0.08)]"
          style={{ "--from": from } as CSSProperties}
        >
          <div className="relative flex flex-col">
            <span className={cn(printed, "text-[length:calc(var(--u)*30.178)] leading-[calc(var(--u)*37)]")}>
              {invoice.supplier}
            </span>
            <span className="relative font-mono text-[length:calc(var(--u)*16.975)] leading-[calc(var(--u)*22)] font-medium">
              <span className="hero-a block">
                <span className="text-ui-faint opacity-45">{invoice.date}</span>
              </span>
              <span className={cn("hero-b absolute top-0 left-0 font-bold whitespace-nowrap", tone.sub)}>{invoice.sub}</span>
            </span>
            <span className="absolute top-6 right-2 font-mono text-[length:calc(var(--u)*20.748)] leading-[calc(var(--u)*27)] font-semibold text-ui-value">
              {invoice.number}
            </span>
          </div>

          <div className="flex gap-8 fs-u-15 leading-[calc(var(--u)*20)] whitespace-nowrap">
            {invoice.meta.map((field, fieldIndex) => (
              <div key={field.label} className={cn("flex flex-col gap-4", fieldIndex === 0 && "w-149")}>
                <span className="text-ui-faint opacity-55">{field.label}</span>
                <span className="font-mono font-semibold text-ui-value">{field.value}</span>
              </div>
            ))}
          </div>

          {/* The rule is drawn inside a zero-height line: it takes no room. */}
          <div className="-mt-1 h-1 shrink-0 bg-border" />

          <div className="flex flex-col gap-8 whitespace-nowrap">
            <div className="relative flex items-center justify-between">
              {first ? <ResolvedRow line={first} inset="inset-y-[calc(var(--u)*2.5)]" /> : null}
              <span className={cn(printed, "hero-shift relative fs-u-20 leading-[calc(var(--u)*24)]")}>{first?.label}</span>
              <span data-select="" className="relative flex h-45 w-155 items-center justify-center rounded-u-4">
                <span className="hero-a absolute inset-0 rounded-u-4 bg-ui-select/8" />
                {/* A 2.83px stroke inside the box, dashed 7.54 on, 5.66 off. */}
                <svg viewBox="0 0 155 45" fill="none" className="hero-a absolute inset-0 size-full" aria-hidden="true">
                  <rect
                    x="1.4146"
                    y="1.4146"
                    width="152.1708"
                    height="42.1708"
                    rx="2.5854"
                    strokeWidth="2.8292"
                    strokeDasharray="7.5446 5.6584"
                    className="stroke-ui-select"
                  />
                </svg>
                <span className={cn(figure, "relative font-semibold text-ui-select")}>{first?.amount}</span>
              </span>
            </div>

            <div className="flex flex-col gap-32">
              <div className="hero-late relative flex items-center justify-between">
                {second ? <ResolvedRow line={second} inset="-inset-y-8" /> : null}
                <span className={cn(printed, "hero-shift relative fs-u-20 leading-[calc(var(--u)*24)]")}>{second?.label}</span>
                <span className={cn(figure, "relative text-ui-value opacity-45")}>{second?.amount}</span>
              </div>
              <div className="flex items-center justify-between pt-8">
                <span className="flex items-center gap-16">
                  <span className={cn(printed, "text-[length:calc(var(--u)*30.178)] leading-[calc(var(--u)*37)]")}>
                    {invoice.total.label}
                  </span>
                  <span className={cn("hero-b hero-late rounded-u-6 px-10 py-4 font-mono fs-u-14 font-bold", tone.tag)}>
                    {invoice.tag}
                  </span>
                </span>
                <span className="font-mono text-[length:calc(var(--u)*26.406)] leading-[calc(var(--u)*34)] font-semibold text-ui-value">
                  {invoice.total.amount}
                </span>
              </div>
            </div>
          </div>

          <div
            data-scan=""
            className="absolute top-303 left-0 h-9 w-630 rounded-[calc(var(--u)*11.03)] border-[length:var(--u)] border-ui-scan bg-ui-scan/60 shadow-[0_0_calc(var(--u)*71.693)_calc(var(--u)*5.515)_var(--algo-ui-scan)]"
          />
        </div>

        {/* What the agent is saying. Centred under the card, as drawn. The
            shadow is a drop-shadow on this wrapper because the pill beneath
            is clipped to its current line, and a box-shadow would be clipped
            with it; this one follows the shape that is left. */}
        <div
          data-pill=""
          className="hero-pill absolute top-682 left-[calc(var(--u)*547)] -translate-x-1/2"
          style={{ "--u": "calc(100cqw / var(--stage-width) * 2.2642)", "--spacing": "var(--u)" } as CSSProperties}
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
                <span className="text-ui-pill fs-u-13.25 font-semibold tracking-[-0.05em]">{line}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
}
