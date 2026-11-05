import { cn } from "@/lib/cn";
import { SITE_PATHS } from "./site-icon-paths";
import { PATHS } from "@/components/product/Icon";

export type FeatureIconName = keyof typeof SITE_PATHS | keyof typeof PATHS;

const ALL: Record<string, string> = { ...PATHS, ...SITE_PATHS };

/** The tint behind a glyph. The dashboard's own status colours, as whispers. */
export type IconTone = "cyan" | "violet" | "green" | "navy";

const TONES: Record<IconTone, string> = {
  cyan: "bg-tile-cyan",
  violet: "bg-tile-violet",
  green: "bg-tile-green",
  navy: "bg-tile-navy text-tile-on-navy",
};

/**
 * An icon for a list item on the marketing pages: the product dashboard's
 * square tile (soft tint, navy glyph). A server component, so the paths never
 * reach a client bundle. Decorative: the item's own words carry the meaning.
 */
export function FeatureIcon({
  name,
  tone = "cyan",
  size = "md",
  bare = false,
  className,
}: {
  name: FeatureIconName;
  tone?: IconTone;
  size?: "sm" | "md" | "lg";
  /** Just the glyph, no tile. */
  bare?: boolean;
  className?: string;
}) {
  const glyph = (
    <svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true" className={cn("shrink-0", bare ? className : size === "sm" ? "size-4" : size === "lg" ? "size-6" : "size-5")}>
      <path d={ALL[name]} />
    </svg>
  );
  if (bare) return glyph;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "feature-icon inline-flex shrink-0 items-center justify-center rounded-[0.625rem] text-fg",
        size === "sm" ? "size-8" : size === "lg" ? "size-12 rounded-xl" : "size-10",
        TONES[tone],
        className,
      )}
    >
      {glyph}
    </span>
  );
}

/** Tones taken in turn down a list, so a grid of tiles is never one flat colour. */
export const toneAt = (index: number): IconTone => (["cyan", "violet", "green"] as const)[index % 3] as IconTone;
