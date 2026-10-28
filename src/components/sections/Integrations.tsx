import { Container, Heading, Section, Text } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { integrations } from "@/content/sections";

/**
 * Headline left, a ruled grid of the systems right, as the brand file sets it.
 *
 * CLAUDE.md §2 forbids naming any other vendor or platform; the Phase 1 brief
 * overrides that for this list on the grounds that these are systems the buyer
 * already runs, not partner or customer references. Setting
 * `integrations.showSystems = false` in the content file removes the list
 * entirely in one edit — the heading, body and closing line still stand.
 */
export function Integrations() {
  return (
    <Section id={integrations.id} spacing="lg">
      <Container width="wide">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-20">
            <div>
              <Heading level={2} size="2xl" lead={integrations.h2Lead} data-reveal="lines">
                {integrations.h2}
              </Heading>
              <Text tone="muted" size="lg" className="mt-6" data-reveal="fade">
                {integrations.body}
              </Text>
            </div>

            <div>
              {integrations.showSystems ? (
                // A ruled grid: the gap is the rule. The list's ground is the
                // hairline colour and each tile paints over it, so the lines are
                // one pixel everywhere, including where rows wrap.
                // Logos are the files exported from the brand file; an entry
                // without one falls back to its name in type.
                <ul
                  className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-4"
                  data-reveal="group"
                >
                  {integrations.systems.map((system) => (
                    <li
                      key={system.name}
                      className="flex h-24 items-center justify-center bg-bg px-4 text-center transition-colors duration-200 hover:bg-surface sm:h-28"
                    >
                      {system.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element -- static export, no image optimiser (§3)
                        <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${system.logo}`} alt={system.name} className="logo-mark max-h-9 w-auto max-w-[68%] object-contain" />
                      ) : (
                        <span className="font-display text-base font-semibold tracking-[-0.02em] text-fg-muted">
                          {system.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : null}
              <Text tone="muted" className="mt-8 max-w-[62ch]" data-reveal="fade">
                {integrations.closing}
              </Text>
            </div>
          </div>

        </Reveal>
      </Container>
    </Section>
  );
}
