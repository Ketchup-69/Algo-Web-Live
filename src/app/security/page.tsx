import { Block, CtaBand, Figure, ItemGrid, Note, PageHero, Pipeline, TermList, Trace } from "@/components/blocks";
import { OrbitHub } from "@/components/product/OrbitHub";
import { AuditTrailCard } from "@/components/product/AuditTrailCard";
import { securityHub } from "@/content/product/hubs";
import { PointerTracker } from "@/components/motion";
import { ControlsShown } from "@/components/sections/ControlsShown";
import {
  frameworks,
  observability,
  pipeline,
  securityClosing,
  securityHero,
  securityLifecycle,
  securityMeta,
  securityFigures,
} from "@/content/security";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(securityMeta);

/**
 * Security and trust: three controls shown working, then all eight in order,
 * what is observed, how security runs through the life of an agent, and the
 * frameworks the controls are mapped to — always with the live site's
 * disclaimer beside them (§2).
 */
export default function SecurityPage() {
  return (
    <main id="main" className="flex-1">
      <PointerTracker />
      <PageHero copy={securityHero} visual={<OrbitHub hub={securityHub} />} />

      <ControlsShown />

      <Block copy={pipeline} tone="subtle">
        <Pipeline items={pipeline.steps} label={pipeline.heading} />
      </Block>

      <Block copy={observability}>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
          <Trace label={observability.traceLabel} items={observability.trace} className="[&_ol]:lg:grid-cols-1 [&_ol]:sm:grid-cols-1" />
          <Figure title={securityFigures.audit.title} body={securityFigures.audit.body}>
            <div className="bg-well overflow-hidden rounded-card px-2 py-8 sm:px-6">
              <AuditTrailCard maxScale={1.1} className="mx-auto" />
            </div>
          </Figure>
        </div>
        <TermList label={observability.signalsLabel} items={observability.signals} variant="chips" className="mt-14" />
      </Block>

      <Block copy={securityLifecycle} tone="subtle" spacing="sm">
        <Trace items={securityLifecycle.steps} />
      </Block>

      <Block copy={frameworks}>
        <ItemGrid items={frameworks.items} variant="panel" />
        <Note className="mt-12 border-l-2 border-fg pl-5 text-base text-fg">{frameworks.disclaimer}</Note>
      </Block>

      <CtaBand copy={securityClosing} />
    </main>
  );
}
