import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Block, CtaBand, ItemGrid, Note, PageHero, RelatedLinks, Steps, TermList } from "@/components/blocks";
import { Container, Heading, Section } from "@/components/ui";
import { PointerTracker } from "@/components/motion";
import { AlgoPOChecks, AlgoPOWells } from "@/components/sections/AlgoPOVisuals";
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
 * The drawings each product has. AlgoPO has the brand file's full set; the
 * other three have none yet and read as text.
 * PLACEHOLDER: product illustrations for AlgoCash, AlgoPay and AlgoCapital AI
 * (to be drawn from the brand file with the product-visual agent).
 */
const VISUALS: Partial<Record<ProductSlug, { workflow?: ReactNode; checks?: ReactNode }>> = {
  algopo: {
    workflow: <AlgoPOWells />,
    checks: <AlgoPOChecks />,
  },
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
  const visuals = VISUALS[product.slug] ?? {};

  return (
    <main id="main" className="flex-1">
      <PointerTracker />
      <PageHero copy={product.hero} />

      <Block copy={product.workflow}>
        {visuals.workflow ? <div className="mb-20">{visuals.workflow}</div> : null}
        <Steps items={product.workflow.steps} columns={4} />
      </Block>

      {visuals.checks}

      <Block copy={product.capabilities} tone="subtle">
        <ItemGrid items={product.capabilities.items} />
      </Block>

      <Block copy={product.exceptions}>
        <TermList items={product.exceptions.items} />
      </Block>

      <Block copy={product.measures} spacing="sm">
        <TermList items={product.measures.items} />
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
