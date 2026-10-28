import { Button, Container, GradientField, Heading } from "@/components/ui";
import { Reveal } from "@/components/motion";
import type { ClosingCopy } from "@/content/types";

/**
 * The band that closes every page: the page ground rises into it, and the
 * footer falls out of it. It follows the page theme: a pale sky tint with a
 * navy heading in light, navy with the brand gradient in dark. One per page,
 * and always last.
 */
export function CtaBand({ copy }: { copy: ClosingCopy }) {
  return (
    <section
      className="bg-band relative pt-[calc(var(--band-rise)+2rem)] pb-(--space-section-md) text-fg"
    >
      <GradientField variant="band" />
      <Container width="wide" className="relative">
        <Reveal>
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
            <Heading level={2} size="3xl" gradient className="max-w-[20ch] text-balance" data-reveal="lines">
              {copy.heading}
            </Heading>
            <div className="flex flex-wrap gap-3">
              <Button href={copy.primary.href} size="lg">
                {copy.primary.label}
              </Button>
              {copy.secondary ? (
                <Button href={copy.secondary.href} variant="secondary" size="lg">
                  {copy.secondary.label}
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
