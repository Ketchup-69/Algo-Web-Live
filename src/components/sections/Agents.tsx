import { Container, GradientField, Heading, Section, Text } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { ExceptionsPanel } from "@/components/product/ExceptionsPanel";
import { Icon } from "@/components/product/Icon";
import { StatementPanel } from "@/components/product/StatementPanel";
import { VerificationCards } from "@/components/product/VerificationCards";
import { agents, proof } from "@/content/sections";

/**
 * Deliberately not four identical rounded cards with identical shadows — that
 * is an anti-pattern in CLAUDE.md §4, and it would also misrepresent the
 * content. These four agents are not a menu of parallel options; they are four
 * consecutive stages of one money cycle: commit, pay, collect, measure.
 *
 * So they are drawn as a spine. At desktop width a single rule runs through
 * all four and draws itself in as the section arrives; each stage is a node
 * on it, marked by a dot where it meets the rule. Below that, where the four
 * wrap into rows, each stage carries its own hairline and the dot sits on it
 * — the same drawing, one row at a time.
 */
export function Agents() {
  return (
    // Clipped sideways only: the wash under the statement panel is wider
    // than the page by design, and must not give the page a scrollbar.
    <Section id={agents.id} spacing="lg" className="overflow-x-clip">
      <Container width="wide">
        <Reveal>
          {/* Centred, as the brand file sets its section openers. The only
              centred block on the page, so it reads as a new chapter. */}
          <div className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
            <Heading level={2} size="3xl" lead={agents.h2Lead} data-reveal="lines">
              {agents.h2}
            </Heading>
            <Text tone="muted" size="lg" className="mt-6 max-w-[56ch]" data-reveal="fade">
              {agents.intro}
            </Text>
          </div>

          {/* The work itself, as the brand file's second page sets it: the
              reconciled statement, centred, with the blue welling up under
              it. The page's signature moment. */}
          <div className="relative mt-16 lg:mt-20" data-reveal="rise">
            <GradientField variant="panel" />
            <StatementPanel className="relative mx-auto" />
          </div>

          {/* One rule across all four, not one per column — the point is that
              this is a single cycle, and four separate gradients would say the
              opposite. It draws in from the left. */}
          <hr aria-hidden="true" className="rule-accent mt-16 hidden lg:mt-24 lg:block" data-reveal="draw" />

          <ol className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4 lg:gap-x-10" data-reveal="group">
            {agents.items.map((agent) => (
              <li
                key={agent.name}
                className="group relative flex flex-col border-t border-border py-8 pr-4 lg:border-t-0 lg:py-10"
              >
                {/* The node: sits on the rule (its own below lg, the shared one
                    at lg) and brightens on hover. */}
                <span
                  aria-hidden="true"
                  className="absolute -top-[5px] left-0 size-[9px] rounded-full border-2 border-accent bg-bg transition-colors duration-200 group-hover:bg-accent"
                />
                <span className="text-sm font-medium text-accent">{agent.stage}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-fg">
                  {agent.name}
                </h3>
                <Text tone="muted" measure={false} className="mt-4 max-w-[36ch]">
                  {agent.description}
                </Text>
              </li>
            ))}
          </ol>

          <Text tone="muted" className="mt-12 max-w-[62ch]" data-reveal="fade">
            {agents.closing}
          </Text>

          <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-2 lg:gap-8" data-reveal="group">
            {/* The brand file's second-page pair: every line matched three
                ways, and what was held back from the run. One card above the
                other in the first well — side by side the drawing is 1440
                wide, and at half a page its type would be under 6px. */}
            {[
              <VerificationCards key="match" stacked maxScale={0.86} className="mx-auto" />,
              <ExceptionsPanel key="held" maxScale={1.3} className="mx-auto" />,
            ].map((visual, index) => (
              <div key={visual.key} className="flex flex-col">
                <div className="bg-well flex flex-1 items-center overflow-hidden rounded-card px-6 py-10">{visual}</div>
                <Heading level={3} size="md" className="mt-8">
                  {agents.wells[index]?.title}
                </Heading>
                <Text tone="muted" measure={false} className="mt-3 max-w-[52ch]">
                  {agents.wells[index]?.body}
                </Text>
              </div>
            ))}
          </div>

          {/* What each of the four is measured on. It follows directly from
              the line above it, so it lives here rather than as a section of
              its own further down. One panel, three columns, hairlines between
              them. Method only, never a claimed figure (§2).
              Edit: src/content/sections.ts → proof */}
          {proof.enabled ? (
            <div id={proof.id} className="card mt-16 p-8 sm:p-10 lg:mt-24 lg:p-14" data-ptr="" data-reveal="rise">
              <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
                <div>
                  <Heading level={3} size="xl" className="max-w-[18ch]">
                    {proof.h2}
                  </Heading>
                  <Text tone="muted" className="mt-5 max-w-[44ch]">
                    {proof.intro}
                  </Text>
                </div>
                <dl className="grid gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-border">
                  {proof.measures.map((measure) => (
                    <div key={measure.label} className="sm:px-6 sm:first:pl-0 sm:last:pr-0">
                      <dt className="font-display text-lg font-semibold text-fg">
                        <span className="mb-5 flex size-11 items-center justify-center rounded-control bg-accent-soft text-accent">
                          <Icon name={measure.icon} className="size-6" />
                        </span>
                        {measure.label}
                      </dt>
                      <dd>
                        <Text tone="muted" size="sm" measure={false} className="mt-3">
                          {measure.description}
                        </Text>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ) : null}
        </Reveal>
      </Container>
    </Section>
  );
}
