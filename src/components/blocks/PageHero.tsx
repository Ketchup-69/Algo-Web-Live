import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button, Container, GradientField, Heading, Section, Text } from "@/components/ui";
import { HeroSequence } from "@/components/motion/HeroSequence";
import type { HeroCopy } from "@/content/types";

/**
 * The opening of every page and its one h1. With a visual, the statement sits
 * on the left and the product answers it on the right; without one, the
 * statement has the width to itself.
 *
 * `data-hero-seq` marks the parts the load sequence drives. The attribute is
 * also what the CSS guard in globals.css targets, so the two stay in step:
 * add a hook here and it is hidden pre-paint and animated, or neither.
 */
export function PageHero({
  copy,
  size = "3xl",
  visual,
}: {
  copy: HeroCopy;
  size?: "3xl" | "4xl";
  visual?: ReactNode;
}) {
  return (
    <Section spacing="none" className="relative overflow-hidden pt-14 pb-(--space-section-md) sm:pt-20 lg:pt-24">
      <GradientField />
      <div aria-hidden="true" className="bg-dot-pattern pointer-events-none absolute inset-x-0 top-0 h-[70vh]" />

      <Container width="wide" className="relative">
        <HeroSequence>
          <div className={cn("grid items-center gap-14", visual && "lg:grid-cols-2 lg:gap-10")}>
            <div>
              <Heading
                level={1}
                size={size}
                className={cn("text-balance", visual ? "max-w-[15ch]" : "max-w-[20ch]")}
                data-hero-seq="headline"
              >
                {copy.heading}
              </Heading>
              <Text tone="muted" size="lg" className="mt-8 max-w-[52ch]">
                {copy.lede}
              </Text>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button href={copy.primary.href} size="lg" data-hero-seq="cta">
                  {copy.primary.label}
                </Button>
                {copy.secondary ? (
                  <Button href={copy.secondary.href} variant="secondary" size="lg" data-hero-seq="cta">
                    {copy.secondary.label}
                  </Button>
                ) : null}
              </div>
              {copy.note ? (
                <Text tone="muted" size="sm" measure={false} className="mt-5" data-hero-seq="supporting">
                  {copy.note}
                </Text>
              ) : null}
            </div>
            {visual ? <div data-hero-seq="visual">{visual}</div> : null}
          </div>
        </HeroSequence>
      </Container>
    </Section>
  );
}
