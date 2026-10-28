import { Block, CtaBand, ItemGrid, Note, PageHero, Steps, TermList, Trace } from "@/components/blocks";
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
      <PageHero copy={securityHero} />

      <ControlsShown />

      <Block copy={pipeline} tone="subtle">
        <Steps items={pipeline.steps} columns={4} />
      </Block>

      <Block copy={observability}>
        <Trace label={observability.traceLabel} items={observability.trace} />
        <TermList label={observability.signalsLabel} items={observability.signals} className="mt-14" />
      </Block>

      <Block copy={securityLifecycle} tone="subtle" spacing="sm">
        <Trace items={securityLifecycle.steps} />
      </Block>

      <Block copy={frameworks}>
        <ItemGrid items={frameworks.items} />
        <Note className="mt-12 border-l-2 border-fg pl-5 text-base text-fg">{frameworks.disclaimer}</Note>
      </Block>

      <CtaBand copy={securityClosing} />
    </main>
  );
}
