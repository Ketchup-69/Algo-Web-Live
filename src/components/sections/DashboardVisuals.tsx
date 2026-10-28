import type { ReactNode } from "react";
import { Figure } from "@/components/blocks";
import { CashTiming } from "@/components/product/CashTiming";
import { CollectionsList } from "@/components/product/CollectionsList";
import { InvoiceChecks } from "@/components/product/InvoiceChecks";
import { PurchaseRequests } from "@/components/product/PurchaseRequests";
import { productFigures } from "@/content/products";
import { site } from "@/content/site";

/** The AlgoPO hero's drawing: purchase requests on their way to purchase orders. */
export function AlgoPOHeroVisual() {
  return (
    <figure>
      <PurchaseRequests className="mx-auto lg:mr-0" />
      <figcaption className="mt-4 text-center text-sm text-fg-muted lg:text-right">{site.ui.sampleNote}</figcaption>
    </figure>
  );
}

/** One dashboard drawing floating in a well, captioned with the workflow step it shows. */
function WellFigure({ caption, children }: { caption: { title: string; body: string }; children: ReactNode }) {
  return (
    <Figure title={caption.title} body={caption.body}>
      <div className="bg-well overflow-hidden rounded-card px-2 py-8 sm:px-6 sm:py-10">{children}</div>
    </Figure>
  );
}

export const AlgoPayWorkflowVisual = () => (
  <WellFigure caption={productFigures.algopay}>
    <InvoiceChecks className="mx-auto" />
  </WellFigure>
);

export const AlgoCashWorkflowVisual = () => (
  <WellFigure caption={productFigures.algocash}>
    <CollectionsList className="mx-auto" />
  </WellFigure>
);

export const AlgoCapitalWorkflowVisual = () => (
  <WellFigure caption={productFigures["algocapital-ai"]}>
    <CashTiming className="mx-auto" />
  </WellFigure>
);
