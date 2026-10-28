import { Container, Heading, Section, Text } from "@/components/ui";
import { Counter, Reveal } from "@/components/motion";
import { problem } from "@/content/sections";

/**
 * The statement. Type does the work here: the heading is the largest thing
 * between the hero and the footer, and everything under it is quiet.
 */
export function Problem() {
  return (
    <Section id={problem.id} spacing="lg">
      <Container width="wide">
        <Reveal>
          {/* The statement on the left, the reasoning beside it on the right,
              tops aligned: one thought, read across. */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
            <Heading level={2} size="3xl" className="max-w-[18ch]" data-reveal="lines">
              {problem.h2}
            </Heading>
            <div className="flex flex-col gap-6 lg:pt-3">
              <Text size="lg" measure={false} className="max-w-[52ch]" data-reveal="fade">
                {problem.body}
              </Text>
              <Text tone="muted" size="lg" measure={false} className="max-w-[52ch]" data-reveal="fade">
                {problem.followOn}
              </Text>
            </div>
          </div>

          {/*
            Three figures that are true by construction of the product (see
            the content file). Each counts up as it enters the viewport. The
            definition list is term-then-description in the DOM and drawn
            figure-first, so a screen reader hears each label once.
            Edit: src/content/sections.ts → problem.stats.items[n]
          */}
          {problem.stats.enabled ? (
            <div className="mt-16 border-t border-border pt-8 lg:mt-24 lg:pt-10">
              {problem.stats.placeholder ? (
                <Text tone="muted" size="sm" measure={false} className="mb-8" data-reveal="fade">
                  {problem.stats.note}
                </Text>
              ) : null}
              <dl className="grid gap-10 sm:grid-cols-3 sm:gap-8" data-reveal="group">
                {problem.stats.items.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <dt className="order-2 mt-3 max-w-[26ch] text-sm text-fg-muted">{stat.label}</dt>
                    <dd className="order-1">
                      <Counter
                        value={stat.value}
                        animate={!problem.stats.placeholder}
                        className="block font-display text-5xl font-semibold text-fg tabular-nums"
                      />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
        </Reveal>
      </Container>
    </Section>
  );
}
