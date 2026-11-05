import { Block, CompareTable, CtaBand, ItemGrid, LayerStack, Note, PageHero, Steps, TermList, Trace } from "@/components/blocks";
import { Button, Container, GradientField, Heading, Section, Text } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { agenticStack, stackLayers } from "@/content/stack";
import { PointerTracker } from "@/components/motion";
import { AgentFlowStacked } from "@/components/product/AgentFlow";
import { AgentConsole } from "@/components/product/AgentConsole";
import { site } from "@/content/site";
import { ProductRows } from "@/components/sections/ProductRows";
import {
  agentLaunch,
  comparison,
  difference,
  homeClosing,
  homeHero,
  homeMeta,
  industries,
  platformTeaser,
  products,
  securityTeaser,
} from "@/content/home";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(homeMeta, { absolute: true });

/**
 * The home page, in the live site's order: the promise, why it is different,
 * how a launch runs, the platform, the products, the industries, the controls,
 * and the invitation. Every string comes from src/content/home.ts.
 */
export default function Home() {
  return (
    <main id="main" className="flex-1">
      {/* One tracker for the page: every gradient marked `data-ptr` follows
          the cursor while it is on screen. */}
      <PointerTracker />
      <PageHero
        copy={homeHero}
        size="3xl"
        wideVisual
        visual={
          <figure>
            <AgentConsole className="mx-auto hidden sm:block lg:mr-0" />
            <AgentFlowStacked className="mx-auto sm:hidden" />
            <figcaption className="mt-4 text-center text-sm text-fg-muted lg:text-right">{site.ui.sampleNote}</figcaption>
          </figure>
        }
      />

      <Block copy={difference}>
        <ItemGrid items={difference.items} variant="cards" />
      </Block>

      <Block copy={comparison} spacing="sm">
        <CompareTable caption={comparison.caption} columns={comparison.columns} rows={comparison.rows} />
      </Block>

      <Block copy={agentLaunch} tone="subtle">
        <Steps items={agentLaunch.steps} />
        <p className="mt-12 max-w-[62ch] border-l-2 border-fg pl-5 font-display text-lg font-semibold text-fg">
          {agentLaunch.gate}
        </p>
        <Note className="mt-8">{agentLaunch.disclaimer}</Note>
      </Block>

      <Block copy={platformTeaser}>
        <TermList items={platformTeaser.terms} variant="chips" />
        <div className="mt-10 flex flex-wrap gap-3">
          {platformTeaser.links.map((link, index) => (
            <Button key={link.href} href={link.href} variant={index === 0 ? "secondary" : "ghost"}>
              {link.label}
            </Button>
          ))}
        </div>
      </Block>

      {/* AI agentic stack: follows the page theme like every other section. */}
      <Section id={agenticStack.id} tone="subtle" className="relative scroll-mt-20 overflow-hidden">
        <GradientField variant="panel" />
        <Container width="wide" className="relative">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Heading level={2} size="3xl" gradient className="max-w-[16ch] text-balance" data-reveal="lines">
                  {agenticStack.heading}
                </Heading>
                {agenticStack.intro ? (
                  <Text tone="muted" size="lg" className="mt-5 max-w-[44ch]">
                    {agenticStack.intro}
                  </Text>
                ) : null}
                <span aria-hidden="true" data-reveal="draw" className="hairline-brand mt-10 block max-w-80" />
                <Button href={agenticStack.link.href} variant="secondary" className="mt-10">
                  {agenticStack.link.label}
                </Button>
              </div>
              <LayerStack layers={stackLayers.map(({ title, line, icon }) => ({ title, body: line, icon }))} dense />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Block copy={products}>
        <ProductRows items={products.items} />
      </Block>

      <Block copy={industries}>
        <ItemGrid items={industries.items} variant="panel" />
      </Block>

      <Block copy={securityTeaser} tone="subtle">
        <Trace label={securityTeaser.sequenceLabel} items={securityTeaser.sequence.map((title) => ({ title }))} />
        <h3 className="mt-16 font-display text-2xl font-bold text-fg">{securityTeaser.pillarsHeading}</h3>
        <ItemGrid items={securityTeaser.pillars} columns={4} variant="cards" className="mt-8" />
        <Button href={securityTeaser.link.href} variant="secondary" className="mt-12">
          {securityTeaser.link.label}
        </Button>
      </Block>

      <CtaBand copy={homeClosing} />
    </main>
  );
}
