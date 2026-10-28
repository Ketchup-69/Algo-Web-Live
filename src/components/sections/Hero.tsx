import { Button, Container, GradientField, Heading, Section, Text } from "@/components/ui";
import { HeroSequence } from "@/components/motion/HeroSequence";
import { hero } from "@/content/sections";
import { InvoiceScatter } from "@/components/product/InvoiceScatter";

/**
 * The statement beside the product: the headline is read first because it is
 * on the left and arrives first, and the scatter answers it.
 *
 * The ground: the brand wash — three soft lights that lean toward the cursor
 * — under a dot pattern that fades out beneath a radial mask. All tokens, so
 * it follows the theme; all CSS transforms, fed two numbers a frame by the
 * pointer tracker; still under reduced motion.
 *
 * `data-hero-seq` marks the parts the load sequence drives. The attribute is
 * also what the CSS guard in globals.css targets, so the two stay in step:
 * add a hook here and it is hidden pre-paint and animated, or neither.
 */
export function Hero() {
  return (
    <Section
      id={hero.id}
      spacing="none"
      className="relative overflow-hidden pt-14 pb-(--space-section-md) sm:pt-20 lg:pt-24"
    >
      <GradientField />
      <div aria-hidden="true" className="bg-dot-pattern pointer-events-none absolute inset-x-0 top-0 h-[70vh]" />

      <Container width="wide" className="relative">
        <HeroSequence>
          {/* The brand file's opening spread: the statement on the left, the
              invoice scatter on the right, centred on each other. Below `lg`
              the scatter follows the text. */}
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-10">
            <div>
              <Heading level={1} size="3xl" className="max-w-[17ch]" data-hero-seq="headline">
                {hero.h1}
              </Heading>
              <Text tone="muted" size="lg" className="mt-8 max-w-[46ch]" data-hero-seq="sub">
                {hero.sub}
              </Text>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button href={hero.primaryCta.href} size="lg" data-hero-seq="cta">
                  {hero.primaryCta.label}
                </Button>
                <Button href={hero.secondaryCta.href} variant="secondary" size="lg" data-hero-seq="cta">
                  {hero.secondaryCta.label}
                </Button>
              </div>
              <Text tone="muted" size="sm" measure={false} className="mt-5" data-hero-seq="supporting">
                {hero.supporting}
              </Text>
            </div>

            {/* The ghosts run past the drawing's frame, as drawn; the section
                clips them at the page edge. */}
            <div data-hero-seq="visual">
              <InvoiceScatter className="mx-auto lg:mr-0" />
            </div>
          </div>
        </HeroSequence>
      </Container>
    </Section>
  );
}
