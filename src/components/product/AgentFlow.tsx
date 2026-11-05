"use client";

import type { CSSProperties } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { cn } from "@/lib/cn";
import { agentFlow as data, type FlowKind, type FlowNodeId } from "@/content/product/flow";
import { useGsapContext } from "@/components/motion/useGsapContext";
import { AgentOrb } from "./AgentPill";
import { CheckMark } from "./Dash";
import { Icon, type IconName } from "./Icon";
import { Stage } from "./Stage";

gsap.registerPlugin(MotionPathPlugin);

type Box = { x: number; y: number };
type SegmentId =
  | "received-read"
  | "read-matched"
  | "matched-duplicates"
  | "duplicates-posted"
  | "duplicates-decision"
  | "decision-posted";

type Layout = {
  width: number;
  height: number;
  card: { w: number; h: number };
  nodes: Record<FlowNodeId, Box>;
  paths: Record<SegmentId, string>;
  /** Where each branch's label sits, its centre, and whether it reads upward. */
  labels: Record<"clean" | "exceptions", Box & { vertical?: boolean }>;
};

/** From 640px: a zigzag down the hero's right column, the branch fanning out at the foot. */
const WIDE: Layout = {
  width: 600,
  height: 640,
  card: { w: 252, h: 76 },
  nodes: {
    received: { x: 20, y: 12 },
    read: { x: 328, y: 112 },
    matched: { x: 20, y: 212 },
    duplicates: { x: 174, y: 320 },
    decision: { x: 344, y: 440 },
    posted: { x: 20, y: 556 },
  },
  paths: {
    "received-read": "M272 50 C380 50 454 56 454 112",
    "read-matched": "M454 188 C454 240 380 250 272 250",
    "matched-duplicates": "M146 288 C146 345 150 358 174 358",
    "duplicates-posted": "M300 396 C300 476 200 480 200 556",
    "duplicates-decision": "M426 358 C470 358 470 400 470 440",
    "decision-posted": "M470 516 C470 594 380 594 272 594",
  },
  labels: { clean: { x: 252, y: 476 }, exceptions: { x: 528, y: 392 } },
};

/** Below 640px: one column, the clean items bypassing the person down the left. */
const STACKED: Layout = {
  width: 340,
  height: 630,
  card: { w: 262, h: 72 },
  nodes: {
    received: { x: 64, y: 10 },
    read: { x: 64, y: 112 },
    matched: { x: 64, y: 214 },
    duplicates: { x: 64, y: 316 },
    decision: { x: 64, y: 432 },
    posted: { x: 64, y: 548 },
  },
  paths: {
    "received-read": "M195 82 C195 92 195 102 195 112",
    "read-matched": "M195 184 C195 194 195 204 195 214",
    "matched-duplicates": "M195 286 C195 296 195 306 195 316",
    "duplicates-decision": "M195 388 C195 404 195 416 195 432",
    "decision-posted": "M195 504 C195 520 195 532 195 548",
    "duplicates-posted": "M64 352 C22 352 22 372 22 470 C22 566 22 584 64 584",
  },
  labels: { clean: { x: 22, y: 468, vertical: true }, exceptions: { x: 250, y: 410 } },
};

/** The two runs, taken in turn for ever: a clean invoice, then an exception. */
const RUNS: { nodes: FlowNodeId[]; segments: SegmentId[] }[] = [
  {
    nodes: ["received", "read", "matched", "duplicates", "posted"],
    segments: ["received-read", "read-matched", "matched-duplicates", "duplicates-posted"],
  },
  {
    nodes: ["received", "read", "matched", "duplicates", "decision", "posted"],
    segments: ["received-read", "read-matched", "matched-duplicates", "duplicates-decision", "decision-posted"],
  },
];

const ICON: Record<FlowNodeId, IconName> = {
  received: "inbox",
  read: "document_scanner",
  matched: "compare_arrows",
  duplicates: "content_copy",
  decision: "person",
  posted: "task_alt",
};

const TILE: Record<FlowKind, string> = {
  start: "bg-ui-wait-soft text-ui-value",
  ai: "bg-ui-ai-soft text-ui-value",
  person: "bg-ui-flag text-ui-on-flag",
  done: "bg-ui-amount-soft text-ui-value",
};

const u = (n: number) => `calc(var(--u) * ${n})`;

function FlowCanvas({ layout, className }: { layout: Layout; className?: string }) {
  const scope = useGsapContext<HTMLDivElement>((_ctx, root) => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const node = (id: FlowNodeId) => root.querySelector<HTMLElement>(`[data-node="${id}"]`);
      const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-node]"));
      const trails = Array.from(root.querySelectorAll<SVGPathElement>("[data-trail]"));
      const pulse = root.querySelector<HTMLElement>("[data-pulse]");
      if (!pulse) return;

      const reset = () => {
        nodes.forEach((n) => {
          n.dataset.lit = "false";
          n.dataset.done = "false";
        });
      };
      const light = (id: FlowNodeId, previous?: FlowNodeId) => {
        if (previous) {
          const before = node(previous);
          if (before) {
            before.dataset.lit = "false";
            before.dataset.done = "true";
          }
        }
        const now = node(id);
        if (now) now.dataset.lit = "true";
      };

      const tl = gsap.timeline({ repeat: -1, paused: true });
      for (const run of RUNS) {
        tl.call(reset);
        tl.set(trails, { opacity: 0 });
        tl.call(() => light(run.nodes[0] as FlowNodeId));
        tl.to({}, { duration: 0.7 });
        run.segments.forEach((segment, index) => {
          const path = root.querySelector<SVGPathElement>(`[data-path="${segment}"]`);
          const trail = root.querySelector<SVGPathElement>(`[data-trail="${segment}"]`);
          if (!path) return;
          tl.set(pulse, { opacity: 1 });
          tl.to(pulse, {
            duration: 0.95,
            ease: "power1.inOut",
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
          });
          if (trail) tl.to(trail, { opacity: 1, duration: 0.95, ease: "power1.inOut" }, "<");
          tl.set(pulse, { opacity: 0 });
          const from = run.nodes[index] as FlowNodeId;
          const to = run.nodes[index + 1] as FlowNodeId;
          tl.call(() => light(to, from));
          // A person takes longer than a check.
          tl.to({}, { duration: to === "decision" ? 1.6 : 0.55 });
        });
        tl.call(() => light(run.nodes[run.nodes.length - 1] as FlowNodeId, run.nodes[run.nodes.length - 1]));
        tl.to({}, { duration: 1.4 });
        tl.to(trails, { opacity: 0, duration: 0.5 });
      }

      // Runs only while it can be seen, and never in a hidden tab.
      let onScreen = false;
      const update = () => {
        if (onScreen && document.visibilityState === "visible") tl.play();
        else tl.pause();
      };
      const observer = new IntersectionObserver(([entry]) => {
        onScreen = Boolean(entry?.isIntersecting);
        update();
      });
      observer.observe(root);
      document.addEventListener("visibilitychange", update);
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", update);
        tl.kill();
        // Back to the finished drawing.
        nodes.forEach((n) => {
          n.dataset.lit = "false";
          n.dataset.done = "true";
        });
      };
    });
    return () => mm.revert();
  });

  const { card } = layout;
  const segments = Object.entries(layout.paths) as [SegmentId, string][];

  return (
    <Stage width={layout.width} label={data.alt} className={className}>
      <div ref={scope} className="relative" style={{ height: u(layout.height) }}>
        <svg
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          className="absolute inset-0 size-full overflow-visible"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={`flow-trail-${layout.width}`}
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="0"
              x2={layout.width}
              y2={layout.height}
            >
              <stop offset="0%" stopColor="var(--algo-green)" />
              <stop offset="50%" stopColor="var(--algo-cyan)" />
              <stop offset="100%" stopColor="var(--algo-violet)" />
            </linearGradient>
          </defs>
          {segments.map(([id, d]) => (
            <path
              key={id}
              data-path={id}
              d={d}
              stroke="var(--ui-rule)"
              strokeOpacity="0.55"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              strokeLinecap="round"
            />
          ))}
          {segments.map(([id, d]) => (
            <path
              key={`trail-${id}`}
              data-trail={id}
              d={d}
              stroke={`url(#flow-trail-${layout.width})`}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0"
            />
          ))}
        </svg>

        {(["clean", "exceptions"] as const).map((branch) => {
          const at = layout.labels[branch];
          return (
            <span
              key={branch}
              className={cn(
                "absolute inline-flex h-22 items-center rounded-u-6 px-8 fs-u-11 font-semibold whitespace-nowrap text-ui-value",
                branch === "clean" ? "bg-ui-amount-soft" : "bg-ui-wait-soft",
              )}
              style={{
                left: u(at.x),
                top: u(at.y),
                transform: `translate(-50%, -50%)${at.vertical ? " rotate(-90deg)" : ""}`,
              }}
            >
              {data.branches[branch]}
            </span>
          );
        })}

        {data.nodes.map((item) => {
          const at = layout.nodes[item.id];
          return (
            <div
              key={item.id}
              data-node={item.id}
              data-lit="false"
              data-done="true"
              data-person={item.kind === "person" ? "" : undefined}
              className="flow-node card absolute flex items-center gap-12 px-14"
              style={{ left: u(at.x), top: u(at.y), width: u(card.w), height: u(card.h) } as CSSProperties}
            >
              <span className={cn("relative flex size-36 shrink-0 items-center justify-center rounded-u-9", TILE[item.kind])}>
                <Icon name={ICON[item.id]} className="size-19" />
                {item.kind === "ai" ? (
                  <span className="absolute -right-6 -bottom-6 flex rounded-full bg-bg">
                    <AgentOrb live size={18} />
                  </span>
                ) : null}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="fs-u-13 leading-[1.25] font-semibold tracking-[-0.015em] text-ui-value">{item.title}</span>
                <span className="flow-say mt-3 fs-u-11 leading-[1.3] font-medium text-ui-quiet">{item.sub}</span>
              </span>
              <span className="flow-done flex shrink-0">
                <CheckMark flagged={false} />
              </span>
            </div>
          );
        })}

        <span
          data-pulse=""
          aria-hidden="true"
          className="flow-pulse absolute top-0 left-0 size-12 rounded-full bg-[var(--algo-cyan)] shadow-[0_0_0_calc(var(--u)*4)_color-mix(in_srgb,var(--algo-cyan)_30%,transparent),0_0_calc(var(--u)*18)_calc(var(--u)*4)_color-mix(in_srgb,var(--algo-cyan)_55%,transparent)]"
        />
      </div>
    </Stage>
  );
}

/**
 * The home hero: an invoice travelling through the agent. Dashboard cards
 * joined by curved connectors; a pulse runs along them and lights each node
 * as it arrives, one at a time, then branches: a clean invoice goes straight
 * to the ERP, an exception goes to a person first. The two runs alternate.
 *
 * The static HTML, and the view under reduced motion, is the finished state:
 * every node ticked, no pulse. The timeline pauses whenever the drawing is
 * off screen or the tab is hidden, and is killed on unmount.
 */
/** The one-column flow on its own: the home hero on phones, where the console is too dense. */
export function AgentFlowStacked({ className }: { className?: string }) {
  return <FlowCanvas layout={STACKED} className={cn("max-w-[24rem]", className)} />;
}

export function AgentFlow({ className }: { className?: string }) {
  return (
    <>
      <FlowCanvas layout={WIDE} className={cn("hidden max-w-[37.5rem] sm:block", className)} />
      <FlowCanvas layout={STACKED} className={cn("max-w-[24rem] sm:hidden", className)} />
    </>
  );
}
