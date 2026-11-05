"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { cn } from "@/lib/cn";
import { agentConsole as copy } from "@/content/product/flow";
import { invoiceScatter } from "@/content/product/scatter";
import { AgentMark, AgentOrb } from "./AgentPill";
import { CheckMark, Chip, dash } from "./Dash";
import { Icon } from "./Icon";
import { Stage } from "./Stage";

gsap.registerPlugin(MotionPathPlugin);

/** Drawn at 680 × 520 design pixels. */
const W = 680;
const H = 520;
const u = (n: number) => `calc(var(--u) * ${n})`;

/** The four invoices the console works through: two clean, one with a difference, one possible duplicate. */
const RUNS = [0, 1, 2, 6].map((index) => invoiceScatter.cycle[index]!);
type Invoice = (typeof RUNS)[number];
const flagged = (invoice: Invoice) => invoice.tone === "flag";

/**
 * pick       the next invoice in the inbox lights up
 * toReader   a pulse carries it to the reader
 * read       the agent reads: the page is scanned, fields come out one by one
 * toChecks   a pulse carries it to the checks
 * check      the four checks run, one after another
 * toOutcome  a pulse carries it on
 * decide     (a difference only) it waits for a person
 * approve    (a difference only) the person approves
 * post       posted to the ERP, the log fills in
 * done       the inbox row turns to posted; the next one starts
 */
const ORDER = ["pick", "toReader", "read", "toChecks", "check", "toOutcome", "decide", "approve", "post", "done"] as const;
type Phase = (typeof ORDER)[number];
const AFTER: Record<Phase, number> = {
  pick: 550,
  toReader: 750,
  read: 3000,
  toChecks: 700,
  check: 2300,
  toOutcome: 700,
  decide: 1900,
  approve: 900,
  post: 2000,
  done: 500,
};
const at = (phase: Phase) => ORDER.indexOf(phase);

const QUEUE = { x: 0, y: 0, w: 200, h: 280, head: 44, row: 59 };
const READER = { x: 236, y: 0, w: 444, h: 280 };
const CHECKS = { x: 0, y: 310, w: 320, h: 210 };
const OUTCOME = { x: 360, y: 310, w: 320, h: 210 };

const rowCentre = (index: number) => QUEUE.head + QUEUE.row * index + QUEUE.row / 2;
const PATHS = {
  toReader: (row: number) => `M200 ${rowCentre(row)} C220 ${rowCentre(row)} 216 140 236 140`,
  toChecks: "M330 280 C330 300 160 290 160 310",
  toOutcome: "M320 415 C340 415 340 415 360 415",
} as const;

type RowStatus = "queued" | "reading" | "checking" | "held" | "posted";
const STATUS_CHIP: Record<RowStatus, "quiet" | "ai" | "wait" | "flag" | "good"> = {
  queued: "quiet",
  reading: "ai",
  checking: "wait",
  held: "flag",
  posted: "good",
};

function rowStatus(index: number, run: number, phase: Phase): RowStatus {
  if (index < run) return "posted";
  if (index > run) return "queued";
  const p = at(phase);
  if (p <= at("read")) return "reading";
  if (p <= at("toOutcome")) return "checking";
  if (p <= at("approve")) return flagged(RUNS[run]!) ? "held" : "checking";
  return "posted";
}

/**
 * The home hero: the agent working through an inbox of invoices, live.
 *
 * Four cards in the product dashboard's language — the inbox, the reader,
 * the checks and the outcome — joined by connectors that a pulse travels
 * along. In the reader the agent's orb turns while it scans the page and
 * pulls each field out with a confidence bar; the checks run one after
 * another; a clean invoice is posted with its audit log, and the one with a
 * difference waits for a person, who approves it. Then the next invoice.
 *
 * A small state machine sets `data-phase`; the reveals are CSS transitions
 * keyed off it (lift.css, `cs-`), transform and opacity only, and the pulses
 * are GSAP motion paths. It waits while off screen or in a hidden tab. The
 * static HTML and the reduced-motion view are the first invoice, finished.
 */
export function AgentConsole({ className }: { className?: string }) {
  const [run, setRun] = useState(0);
  const [phase, setPhase] = useState<Phase>("post");
  const [thought, setThought] = useState(0);
  const [awake, setAwake] = useState(false);
  const [moving, setMoving] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const pulse = useRef<HTMLSpanElement>(null);

  const invoice = RUNS[run]!;
  const hasDecision = flagged(invoice);

  // Start only when it can be seen, and never under reduced motion.
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

  // The first time it wakes, it starts from the inbox rather than the finished drawing.
  useEffect(() => {
    if (!awake || moving) return;
    const timer = window.setTimeout(() => {
      setMoving(true);
      setRun(0);
      setPhase("pick");
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [awake, moving]);

  useEffect(() => {
    if (!awake || !moving) return;
    const timer = window.setTimeout(() => {
      if (phase === "done") {
        setRun((current) => (current + 1) % RUNS.length);
        setThought(0);
        setPhase("pick");
        return;
      }
      let next = ORDER[at(phase) + 1] as Phase;
      // A clean invoice goes straight from the checks to posted.
      if (next === "decide" && !hasDecision) next = "post";
      setPhase(next);
    }, AFTER[phase]);
    return () => window.clearTimeout(timer);
  }, [awake, moving, phase, hasDecision]);

  // What the agent says while it reads changes every few hundred ms.
  useEffect(() => {
    if (phase !== "read" || !awake) return;
    const timer = window.setInterval(() => setThought((n) => Math.min(n + 1, copy.thoughts.length - 1)), 720);
    return () => window.clearInterval(timer);
  }, [phase, awake]);

  // The pulse along each connector.
  useEffect(() => {
    const dot = pulse.current;
    const svg = root.current?.querySelector("svg");
    if (!dot || !svg || !moving) return;
    const key = phase === "toReader" ? "toReader" : phase === "toChecks" ? "toChecks" : phase === "toOutcome" ? "toOutcome" : null;
    if (!key) return;
    const path = svg.querySelector<SVGPathElement>(`[data-route="${key}"]`);
    if (!path) return;
    const tween = gsap.fromTo(
      dot,
      { opacity: 1 },
      {
        duration: AFTER[phase] / 1000,
        ease: "power1.inOut",
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
        onComplete: () => void gsap.set(dot, { opacity: 0 }),
      },
    );
    return () => {
      tween.kill();
    };
  }, [phase, moving]);

  const p = at(phase);
  const read = p >= at("read");
  const checked = p >= at("check");
  const outcome = p >= at("toOutcome");
  const posted = p >= at("post");
  const deciding = hasDecision && outcome && !posted;
  const approving = phase === "approve";
  const minute = 41 + run;

  const fields: [string, string][] = [
    [copy.fields.supplier, invoice.supplier],
    [copy.fields.trn, invoice.trn],
    [copy.fields.number, invoice.number],
    [copy.fields.date, invoice.date],
    [copy.fields.lines, `${invoice.lines.length} ${copy.linesWord}`],
    [copy.fields.vat, invoice.vat],
    [copy.fields.total, `AED ${invoice.total}`],
  ];

  const log: string[] = hasDecision
    ? [copy.log.read, copy.log.held, copy.log.approved, copy.log.posted]
    : [copy.log.read, copy.log.matched, copy.log.passed, copy.log.posted];

  const route = (name: keyof typeof PATHS) => (name === "toReader" ? PATHS.toReader(run) : PATHS[name]);
  const lit = (name: "toReader" | "toChecks" | "toOutcome") => p >= at(name);

  return (
    <Stage width={W} maxScale={0.96} label={copy.alt} className={className}>
      <div
        ref={root}
        data-phase={phase}
        data-read={read}
        data-checked={checked}
        data-posted={posted}
        className="console relative"
        style={{ height: u(H) }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="console-trail" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2={H}>
              <stop offset="0%" stopColor="var(--algo-green)" />
              <stop offset="50%" stopColor="var(--algo-cyan)" />
              <stop offset="100%" stopColor="var(--algo-violet)" />
            </linearGradient>
          </defs>
          {(["toReader", "toChecks", "toOutcome"] as const).map((name) => (
            <g key={name}>
              <path
                d={route(name)}
                stroke="var(--ui-rule)"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                strokeDasharray="3 5"
                strokeLinecap="round"
              />
              <path
                data-route={name}
                d={route(name)}
                stroke="url(#console-trail)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="cs-trail"
                data-on={lit(name)}
              />
            </g>
          ))}
        </svg>

        {/* The inbox. */}
        <div className="card absolute overflow-hidden" style={{ left: u(QUEUE.x), top: u(QUEUE.y), width: u(QUEUE.w), height: u(QUEUE.h) }}>
          <div className="flex h-44 items-center gap-8 border-b border-border px-14">
            <Icon name="inbox" className="size-16 text-ui-value" />
            <span className={dash.title}>{copy.inbox}</span>
          </div>
          {RUNS.map((item, index) => {
            const status = rowStatus(index, run, phase);
            return (
              <div
                key={item.number}
                data-active={index === run && !posted}
                className="cs-row relative flex h-59 flex-col justify-center border-b border-border px-14 last:border-b-0"
              >
                <span className="truncate fs-u-12 font-semibold tracking-[-0.01em] text-ui-value">{item.supplier}</span>
                <span className="mt-4 flex items-center justify-between gap-6">
                  <span className="font-data fs-u-10.5 text-ui-quiet">{item.number}</span>
                  <span key={status} className="ui-swap">
                    <Chip chip={[STATUS_CHIP[status], copy.status[status]]} className="h-18 px-6 fs-u-10" />
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        {/* The reader: the agent at work. */}
        <div className="card absolute overflow-hidden" style={{ left: u(READER.x), top: u(READER.y), width: u(READER.w), height: u(READER.h) }}>
          <div className="flex h-52 items-center gap-10 border-b border-border px-14">
            <AgentOrb live={phase === "read" || phase === "toReader"} size={28} />
            <span className="flex min-w-0 flex-col">
              <span className={dash.title}>{copy.reading}</span>
              <span key={invoice.number} className="ui-swap font-data fs-u-11 text-ui-quiet">
                {invoice.number}
              </span>
            </span>
            <span className="ml-auto flex gap-3">
              {fields.map(([label], index) => (
                <b
                  key={label}
                  className="cs-step relative block h-4 w-14 overflow-hidden rounded-u-2 bg-ui-step-todo"
                  style={{ "--i": index } as CSSProperties}
                >
                  <i className="absolute inset-0 bg-ui-ai" />
                </b>
              ))}
            </span>
          </div>

          <div className="relative flex gap-16 px-14 pt-12">
            {/* The page being read. */}
            <div className="relative h-160 w-128 shrink-0 overflow-hidden rounded-u-6 border border-border bg-bg px-10 pt-10">
              <span className="block fs-u-9 font-semibold text-ui-value">{invoiceScatter.labels.title}</span>
              <span className="mt-2 block truncate fs-u-7 text-ui-quiet">{invoice.supplier}</span>
              {[86, 60, 92, 70, 100, 54, 88, 66].map((width, index) => (
                <span
                  key={index}
                  className={cn("mt-7 block h-4 rounded-full", index % 3 === 2 ? "bg-ui-ai-soft" : "bg-ui-step-todo")}
                  style={{ width: `${width}%` }}
                />
              ))}
              <span className="mt-9 ml-auto block h-6 w-46 rounded-full bg-ui-value/70" />
              <span className="cs-scan absolute inset-x-0 top-0 h-28" />
            </div>

            {/* What it pulled out. */}
            <dl className="flex min-w-0 flex-1 flex-col gap-3">
              {fields.map(([label, value], index) => (
                <div key={label} className="cs-field relative" style={{ "--i": index } as CSSProperties}>
                  <div className="flex h-19 items-center justify-between gap-8">
                    <dt className="fs-u-10.5 font-medium text-ui-quiet">{label}</dt>
                    <dd className="overflow-hidden">
                      <span key={`${invoice.number}-${label}`} className="cs-value block truncate font-data fs-u-11.5 font-semibold text-ui-value">
                        {value}
                      </span>
                    </dd>
                  </div>
                  <span className="block h-2 overflow-hidden rounded-full bg-ui-step-todo">
                    <span
                      className="cs-confidence block h-full rounded-full bg-[linear-gradient(90deg,var(--algo-green),var(--algo-cyan),var(--algo-violet))]"
                      style={{ "--c": 0.82 + ((index * 7) % 17) / 100 } as CSSProperties}
                    />
                  </span>
                </div>
              ))}
            </dl>
          </div>

          <div className="absolute inset-x-14 bottom-12 flex h-28 items-center gap-8 rounded-u-8 bg-ui-ai-soft px-10 fs-u-11 font-medium text-ui-value">
            <AgentMark live={phase === "read"} />
            <span key={`${run}-${thought}-${read}`} className="ui-swap truncate">
              {read ? copy.thoughts[phase === "read" ? thought : copy.thoughts.length - 1] : copy.readerIdle}
            </span>
          </div>
        </div>

        {/* The checks. */}
        <div className="card absolute overflow-hidden px-14 pt-14" style={{ left: u(CHECKS.x), top: u(CHECKS.y), width: u(CHECKS.w), height: u(CHECKS.h) }}>
          <div className="fs-u-13 font-semibold tracking-[-0.015em] text-ui-value">{copy.checksTitle}</div>
          <ul className="mt-10 overflow-hidden rounded-u-10 border border-border">
            {invoice.checks.map((check, index) => (
              <li
                key={`${invoice.number}-${index}`}
                style={{ "--i": index } as CSSProperties}
                className={cn(
                  "cs-check relative flex min-h-38 items-center gap-10 border-t border-border px-10 py-6 fs-u-11 leading-[1.3] tracking-[-0.01em] text-ui-value first:border-t-0",
                  check.flagged ? "font-semibold" : "font-medium",
                )}
              >
                <span className="relative flex size-20 shrink-0 items-center justify-center">
                  <span className="cs-spin absolute inset-0 rounded-full border-2 border-ui-step-todo border-t-[var(--algo-violet)]" />
                  <span className="cs-tick absolute inset-0">
                    <CheckMark flagged={check.flagged} />
                  </span>
                </span>
                <span className="cs-label min-w-0 flex-1">{check.label}</span>
                <span className="cs-label font-data fs-u-10 whitespace-nowrap text-ui-quiet">{check.value}</span>
                {check.flagged ? <span className="cs-flagbg absolute inset-0 -z-10 bg-ui-row-tint" /> : null}
              </li>
            ))}
          </ul>
        </div>

        {/* The outcome: posted, or a person first. */}
        <div className="card absolute overflow-hidden" style={{ left: u(OUTCOME.x), top: u(OUTCOME.y), width: u(OUTCOME.w), height: u(OUTCOME.h) }}>
          <div className="cs-layer absolute inset-0 flex flex-col px-14 pt-14" data-on={deciding}>
            <div className="flex items-center justify-between">
              <span className="fs-u-13 font-semibold tracking-[-0.015em] text-ui-value">{copy.outcome.decision}</span>
              <Chip chip={["flag", invoice.chip]} />
            </div>
            <div className="mt-10 flex items-center gap-10">
              <span className="flex size-28 items-center justify-center rounded-full bg-ui-flag fs-u-11 font-bold text-ui-on-flag">
                {copy.person.initials}
              </span>
              <span className="fs-u-11.5 font-medium text-ui-quiet">{copy.person.role}</span>
            </div>
            <div className="mt-10 flex items-start gap-8 rounded-u-9 bg-ui-ai-soft px-10 py-7 fs-u-11 leading-[1.4] font-medium text-ui-value">
              <span className="mt-2 flex">
                <AgentMark />
              </span>
              <span>{invoice.resolved}</span>
            </div>
            <div className="mt-auto mb-12 flex justify-end gap-8">
              <span className={cn(dash.button, dash.quiet, "h-30 px-12 fs-u-11.5")}>{copy.actions.back}</span>
              <span className={cn(dash.button, dash.primary, "cs-approve h-30 px-14 fs-u-11.5")} data-pressed={approving}>
                <Icon name="check" className="size-14" />
                {copy.actions.approve}
              </span>
            </div>
          </div>

          <div className="cs-layer absolute inset-0 flex flex-col px-14 pt-14" data-on={posted}>
            <div className="flex items-center justify-between">
              <span className="fs-u-13 font-semibold tracking-[-0.015em] text-ui-value">{copy.outcome.posted}</span>
              <Chip chip={["good", copy.status.posted]} />
            </div>
            <span key={invoice.number} className="ui-swap mt-8 font-data fs-u-11 text-ui-quiet">
              {invoice.number}
              {"  "}
              <b className="font-semibold text-ui-value">AED {invoice.total}</b>
            </span>
            <ol className="mt-8 flex flex-col">
              {log.map((line, index) => (
                <li
                  key={`${invoice.number}-${line}`}
                  className="cs-log flex items-center gap-10 border-t border-border py-6 fs-u-11 font-medium text-ui-value"
                  style={{ "--i": index } as CSSProperties}
                >
                  <span className="font-data fs-u-10 text-ui-quiet">{`09:${minute}:${String(4 + index * 3).padStart(2, "0")}`}</span>
                  <span className="min-w-0 flex-1 truncate">{line}</span>
                  <Icon name={index === log.length - 1 ? "task_alt" : "check"} className="size-14 text-ui-value" />
                </li>
              ))}
            </ol>
          </div>

          <div className="cs-layer absolute inset-0 flex flex-col items-center justify-center gap-8 px-14" data-on={!deciding && !posted}>
            <Icon name="hourglass_top" className="size-20 text-ui-quiet" />
            <span className="fs-u-11.5 font-medium text-ui-quiet">{copy.readerIdle}</span>
          </div>
        </div>

        <span
          ref={pulse}
          aria-hidden="true"
          className="absolute top-0 left-0 size-14 rounded-full bg-[var(--algo-cyan)] opacity-0 shadow-[0_0_0_calc(var(--u)*5)_color-mix(in_srgb,var(--algo-cyan)_28%,transparent),0_0_calc(var(--u)*22)_calc(var(--u)*5)_color-mix(in_srgb,var(--algo-violet)_55%,transparent)]"
        />
      </div>
    </Stage>
  );
}
