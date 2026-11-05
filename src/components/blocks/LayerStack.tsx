import { cn } from "@/lib/cn";
import { FeatureIcon, type FeatureIconName } from "@/components/ui/FeatureIcon";

type Layer = { title: string; body?: string; icon?: FeatureIconName };

/** The accent down each slab's edge steps along the logo's gradient, top to bottom. */
const EDGE = [
  "bg-[var(--algo-green)]",
  "bg-[color-mix(in_oklab,var(--algo-green)_50%,var(--algo-cyan))]",
  "bg-[var(--algo-cyan)]",
  "bg-[color-mix(in_oklab,var(--algo-cyan)_60%,var(--algo-violet))]",
  "bg-[color-mix(in_oklab,var(--algo-cyan)_30%,var(--algo-violet))]",
  "bg-[var(--algo-violet)]",
] as const;

/**
 * A layered architecture: slabs stacked top to bottom, joined by a spine that
 * runs through their icons. The layers land one after another as the section
 * arrives (`data-reveal="layers"`). Static HTML holds every word.
 */
export function LayerStack({
  layers,
  dense = false,
  className,
}: {
  layers: Layer[];
  /** Title over body at every width, for a narrow column. */
  dense?: boolean;
  className?: string;
}) {
  return (
    <ol data-reveal="layers" className={cn("relative flex flex-col gap-2.5", className)}>
      <span
        aria-hidden="true"
        className="absolute top-8 bottom-8 left-[calc(1.25rem+1.25rem-0.5px)] w-px bg-[linear-gradient(var(--algo-green),var(--algo-cyan),var(--algo-violet))] opacity-60 sm:left-[calc(1.5rem+1.25rem-0.5px)]"
      />
      {layers.map((layer, index) => (
        <li
          key={layer.title}
          data-layer=""
          className={cn("site-card lift stack-layer grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 px-5 py-5 sm:px-6", !dense && "lg:grid-cols-[auto_minmax(0,16rem)_minmax(0,1fr)] lg:items-center lg:gap-x-8")}
        >
          <span aria-hidden="true" className={cn("absolute inset-y-4 -left-px w-[3px] rounded-r-full", EDGE[index % EDGE.length])} />
          <FeatureIcon name={layer.icon ?? "layers"} tone="navy" className="relative" />
          <h3 className="self-center font-display text-lg font-semibold text-fg">{layer.title}</h3>
          {layer.body ? (
            <p className={cn("col-start-2 mt-1.5 text-base text-fg-muted", !dense && "lg:col-start-3 lg:mt-0")}>{layer.body}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
