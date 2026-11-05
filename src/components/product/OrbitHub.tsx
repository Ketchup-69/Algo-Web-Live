import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import type { Hub } from "@/content/product/hubs";
import { Awake } from "@/components/motion/Awake";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { AgentOrb } from "./AgentPill";
import { Stage } from "./Stage";

type Point = { x: number; y: number };
type Layout = { width: number; height: number; centre: Point; orb: number; card: { w: number; h: number }; spokes: Point[]; rings: number[] };

/** From 640px: the six around the centre, three a side. */
const WIDE: Layout = {
  width: 560,
  height: 500,
  centre: { x: 280, y: 250 },
  orb: 104,
  card: { w: 176, h: 58 },
  spokes: [
    { x: 100, y: 64 },
    { x: 460, y: 64 },
    { x: 92, y: 250 },
    { x: 468, y: 250 },
    { x: 100, y: 436 },
    { x: 460, y: 436 },
  ],
  rings: [150, 212],
};

/** Below 640px: the centre on top, the six in two columns beneath. */
const NARROW: Layout = {
  width: 340,
  height: 560,
  centre: { x: 170, y: 92 },
  orb: 92,
  card: { w: 156, h: 58 },
  spokes: [
    { x: 86, y: 250 },
    { x: 254, y: 250 },
    { x: 86, y: 360 },
    { x: 254, y: 360 },
    { x: 86, y: 470 },
    { x: 254, y: 470 },
  ],
  rings: [70, 104],
};

const TONES = ["cyan", "violet", "green", "cyan", "violet", "green"] as const;
const u = (n: number) => `calc(var(--u) * ${n})`;

function Canvas({ hub, layout, className }: { hub: Hub; layout: Layout; className?: string }) {
  const { centre, card } = layout;
  return (
    <Stage width={layout.width} maxScale={1.05} label={hub.alt} className={className}>
      <div className="hub relative" style={{ height: u(layout.height) } as CSSProperties}>
        {layout.rings.map((radius, index) => (
          <span
            key={radius}
            aria-hidden="true"
            className={cn("hub-ring absolute rounded-full border border-dashed border-ui-rule/40", index % 2 && "hub-ring-reverse")}
            style={{ left: u(centre.x - radius), top: u(centre.y - radius), width: u(radius * 2), height: u(radius * 2) }}
          />
        ))}

        {layout.spokes.map((to, index) => {
          const dx = to.x - centre.x;
          const dy = to.y - centre.y;
          const length = Math.hypot(dx, dy);
          const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
          return (
            <span
              key={index}
              aria-hidden="true"
              className="hub-spoke absolute h-px origin-left"
              style={
                {
                  left: u(centre.x),
                  top: u(centre.y),
                  width: u(length),
                  transform: `rotate(${angle.toFixed(2)}deg)`,
                  "--len": length.toFixed(1),
                  "--i": index,
                } as CSSProperties
              }
            >
              <i className="hub-dot absolute top-1/2 left-0 size-8 -translate-y-1/2 rounded-full" />
            </span>
          );
        })}

        <div
          className="absolute flex flex-col items-center"
          style={{ left: u(centre.x), top: u(centre.y), transform: "translate(-50%, -50%)" }}
        >
          <span className="hub-halo absolute rounded-full" style={{ width: u(layout.orb * 1.6), height: u(layout.orb * 1.6) }} />
          <span className="relative rounded-full bg-bg shadow-[0_calc(var(--u)*18)_calc(var(--u)*40)_calc(var(--u)*-12)_rgb(3_21_34/0.35)]">
            <AgentOrb live size={layout.orb} />
          </span>
          <span className="absolute top-full mt-10 rounded-u-6 bg-bg px-8 py-3 fs-u-12 font-semibold whitespace-nowrap text-ui-value shadow-[0_0_0_var(--u)_var(--ui-rule)]">
            {hub.centre}
          </span>
        </div>

        {hub.spokes.map((spoke, index) => {
          const at = layout.spokes[index]!;
          return (
            <div
              key={spoke.title}
              className="hub-card card absolute flex items-center gap-10 px-10"
              style={
                {
                  left: u(at.x - card.w / 2),
                  top: u(at.y - card.h / 2),
                  width: u(card.w),
                  height: u(card.h),
                  "--i": index,
                } as CSSProperties
              }
            >
              <span className="flex size-34 shrink-0 items-center justify-center">
                <FeatureIcon name={spoke.icon} tone={TONES[index % TONES.length]} className="size-34 rounded-u-9 [&>svg]:size-18" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="fs-u-12 leading-[1.2] font-semibold tracking-[-0.01em] text-ui-value">{spoke.title}</span>
                <span className="mt-2 fs-u-10 font-medium text-ui-quiet">{spoke.sub}</span>
              </span>
            </div>
          );
        })}
      </div>
    </Stage>
  );
}

/**
 * The agent at the centre and six things around it, joined by spokes that
 * carry small pulses in and out; the cards light one at a time and the
 * dashed rings turn. All CSS (lift.css, `hub-`), transform and opacity only,
 * paused off screen, still under reduced motion. A server component: the
 * icons never ship in client code.
 */
export function OrbitHub({ hub, className }: { hub: Hub; className?: string }) {
  return (
    <Awake className={className}>
      <figure>
        <Canvas hub={hub} layout={WIDE} className="mx-auto hidden sm:block lg:mr-0" />
        <Canvas hub={hub} layout={NARROW} className="mx-auto max-w-[24rem] sm:hidden" />
      </figure>
    </Awake>
  );
}
