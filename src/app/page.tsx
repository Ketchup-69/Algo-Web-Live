import { Block, CompareTable, CtaBand, ItemGrid, Note, PageHero, Steps, TermList, Trace } from "@/components/blocks";
import { Button } from "@/components/ui";
import { PointerTracker } from "@/components/motion";
import { InvoiceScatter } from "@/components/product/InvoiceScatter";
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
import { site } from "@/content/site";
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
        size="4xl"
        visual={
          <figure>
            <InvoiceScatter className="mx-auto lg:mr-0" />
            <figcaption className="mt-4 text-center text-sm text-fg-muted lg:text-right">{site.ui.sampleNote}</figcaption>
          </figure>
        }
      />

      <Block copy={difference}>
        <ItemGrid items={difference.items} />
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
        <TermList items={platformTeaser.terms} />
        <div className="mt-10 flex flex-wrap gap-3">
          {platformTeaser.links.map((link, index) => (
            <Button key={link.href} href={link.href} variant={index === 0 ? "secondary" : "ghost"}>
              {link.label}
            </Button>
          ))}
        </div>
      </Block>

      <Block copy={products}>
        <ProductRows items={products.items} />
      </Block>

      <Block copy={industries}>
        <ItemGrid items={industries.items} />
      </Block>

      <Block copy={securityTeaser} tone="subtle">
        <Trace label={securityTeaser.sequenceLabel} items={securityTeaser.sequence.map((title) => ({ title }))} />
        <h3 className="mt-16 font-display text-2xl font-bold text-fg">{securityTeaser.pillarsHeading}</h3>
        <ItemGrid items={securityTeaser.pillars} columns={4} className="mt-8" />
        <Button href={securityTeaser.link.href} variant="secondary" className="mt-12">
          {securityTeaser.link.label}
        </Button>
      </Block>

      <CtaBand copy={homeClosing} />
    </main>
  );
}
