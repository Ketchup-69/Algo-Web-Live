import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Block, CtaBand, ItemGrid, LayerStack, Note, PageHero, RelatedLinks, Steps, TermList } from "@/components/blocks";
import { InvoiceScatter } from "@/components/product/InvoiceScatter";
import { site } from "@/content/site";
import { Container, Heading, Section } from "@/components/ui";
import { PointerTracker } from "@/components/motion";
import { AlgoPOChecks, AlgoPOWells } from "@/components/sections/AlgoPOVisuals";
import {
  AlgoCapitalWorkflowVisual,
  AlgoCashWorkflowVisual,
  AlgoPayWorkflowVisual,
  AlgoPOHeroVisual,
} from "@/components/sections/DashboardVisuals";
import { productList, type ProductSlug } from "@/content/products";
import { pageMetadata } from "@/lib/metadata";

/** Static export needs every slug known at build time. */
export function generateStaticParams() {
  return productList.map((product) => ({ slug: product.slug }));
}

export const dynamicParams = false;

const find = (slug: string) => productList.find((product) => product.slug === slug);

export async function generateMetadata({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = find(slug);
  return product ? pageMetadata(product.meta) : {};
}

/**
 * The drawings each product has: the brand file's set on AlgoPO, and one
 * drawing in the product dashboard's language on each page.
 */
const VISUALS: Record<ProductSlug, { hero?: ReactNode; workflow?: ReactNode; checks?: ReactNode }> = {
  algopo: {
    hero: <AlgoPOHeroVisual />,
    workflow: <AlgoPOWells />,
    checks: <AlgoPOChecks />,
  },
  algopay: {
    hero: (
      // The pile bleeds past the column on wide screens, so the invoice in
      // front is read at a useful size; the hero clips it at the edge.
      <figure className="-mx-[22%] w-[144%] lg:mx-0 lg:w-[128%]">
        <InvoiceScatter maxScale={0.8} className="mx-auto lg:mr-0" />
        <figcaption className="mt-4 text-center text-sm text-fg-muted lg:text-right">{site.ui.sampleNote}</figcaption>
      </figure>
    ),
    workflow: <AlgoPayWorkflowVisual />,
  },
  algocash: { workflow: <AlgoCashWorkflowVisual /> },
  "algocapital-ai": { workflow: <AlgoCapitalWorkflowVisual /> },
};

/**
 * One template for the four product pages: the promise, the workflow stage
 * by stage, what the product brings to each stage, the cases it surfaces for
 * a person, what it is measured on, and the way onward.
 */
export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = find(slug);
  if (!product) notFound();
  const visuals = VISUALS[product.slug];

  return (
    <main id="main" className="flex-1">
      <PointerTracker />
      <PageHero copy={product.hero} visual={visuals.hero} />

      <Block copy={product.workflow}>
        {visuals.workflow ? <div className="mb-20">{visuals.workflow}</div> : null}
        <Steps items={product.workflow.steps} columns={4} />
      </Block>

      {visuals.checks}

      {product.architecture ? (
        <Block copy={product.architecture} tone="subtle">
          <LayerStack layers={product.architecture.layers} />
          {product.architecture.scope ? (
            <aside className="site-card mt-8 grid gap-3 p-6 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-8 sm:p-7">
              <span className="relative font-display text-base font-semibold text-fg">
                <span aria-hidden="true" className="hairline-brand absolute -top-6 left-0 w-16 sm:-top-7" />
                {product.architecture.scope.label}
              </span>
              <p className="max-w-[62ch] text-base text-fg">{product.architecture.scope.body}</p>
            </aside>
          ) : null}
        </Block>
      ) : null}

      <Block copy={product.capabilities} tone={product.architecture ? "none" : "subtle"}>
        <ItemGrid items={product.capabilities.items} variant="cards" />
      </Block>

      {product.pathway ? (
        <Block copy={product.pathway} tone="subtle">
          <Steps items={product.pathway.steps} columns={4} />
        </Block>
      ) : null}

      <Block copy={product.exceptions}>
        <TermList items={product.exceptions.items} variant="checks" />
      </Block>

      <Block copy={product.measures} spacing="sm">
        <TermList items={product.measures.items} variant="chips" />
        {product.outcome ? (
          <Heading level={3} size="lg" className="mt-16 max-w-[30ch] text-balance">
            {product.outcome.heading}
          </Heading>
        ) : null}
        <Note className="mt-8">{product.disclaimer}</Note>
      </Block>

      <Section spacing="sm">
        <Container width="wide">
          <RelatedLinks items={product.related} />
        </Container>
      </Section>

      <CtaBand copy={product.closing} />
    </main>
  );
}
