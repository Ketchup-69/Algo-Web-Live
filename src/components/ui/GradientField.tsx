import { cn } from "@/lib/cn";

const variants = {
  /** Light from the top right. Hero, and the dark governance panel. */
  glow: "gfield-glow",
  /** The luminous cloud in the rise of the closing band. */
  band: "gfield-band",
  /** Light welling up beneath a product panel, as on the brand file's second page. */
  panel: "gfield-panel",
} as const;

/**
 * The brand wash: three soft lights on the section's ground.
 *
 * Decorative, so it is hidden from the accessibility tree and takes no
 * pointer events. Colours, positions and how far each light follows the
 * cursor are all in globals.css. The page's `<PointerTracker />` makes it
 * follow; without one it drifts on its own.
 */
export function GradientField({
  variant = "glow",
  className,
}: {
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <div aria-hidden="true" data-ptr="" className={cn("gfield", variants[variant], className)}>
      <i className="gblob" />
      <i className="gblob" />
      <i className="gblob" />
    </div>
  );
}
