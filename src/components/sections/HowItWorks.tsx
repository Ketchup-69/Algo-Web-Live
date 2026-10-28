import { Container, Heading, Section, Text } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { CodingWell } from "@/components/product/CodingWell";
import { FormatWell } from "@/components/product/FormatWell";
import { SystemsWell } from "@/components/product/SystemsWell";
import { howItWorks } from "@/content/sections";

/** One well per step, in step order: what is read, what is prepared, what is posted. */
const WELLS = [FormatWell, CodingWell, SystemsWell] as const;

/**
 * The brand file's three-wells row, one for one: a piece of the product in
 * each well, the step beneath it. This is a genuine sequence, which is the one
 * place CLAUDE.md §4 permits numbered markers.
 */
export function HowItWorks() {
  return (
    <Section id={howItWorks.id} spacing="lg">
      <Container width="wide">
        <Reveal>
          <div className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
            <Heading level={2} size="3xl" lead={howItWorks.h2Lead} data-reveal="lines">
              {howItWorks.h2}
            </Heading>
          </div>

          <ol className="mt-16 grid gap-x-10 gap-y-16 lg:mt-24 lg:grid-cols-3" data-reveal="group">
            {howItWorks.steps.map((step, i) => {
              const Visual = WELLS[i];
              return (
                <li key={step.title} className="flex flex-col">
                  {Visual ? <Visual className="mx-auto" /> : null}
                  <span
                    aria-hidden="true"
                    className="mt-8 block font-data text-sm font-medium text-accent tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-fg">
                    {step.title}
                  </h3>
                  <Text tone="muted" measure={false} className="mt-3 max-w-[44ch]">
                    {step.description}
                  </Text>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
