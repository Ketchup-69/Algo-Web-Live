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
 * The section ground (owner decision, 5 Nov 2026: the soft colour blobs are
 * gone). A fine line grid that fades out from where the light would have
 * been, and one crisp brand-gradient hairline. Static, decorative, hidden
 * from assistive tech. The old variant names are kept so callers need no edit.
 */
export function GradientField({
  variant = "glow",
  className,
}: {
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("gridfield", variants[variant], className)}>
      <i className="gridfield-lines" />
      <i className="gridfield-rule" />
    </div>
  );
}
