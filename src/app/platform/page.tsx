import {
  Block,
  BlockHead,
  CompareTable,
  CtaBand,
  Figure,
  ItemGrid,
  Note,
  PageHero,
  Pipeline,
  RelatedLinks,
  Steps,
  TermList,
  Trace,
} from "@/components/blocks";
import { PointerTracker } from "@/components/motion";
import { OrbitHub } from "@/components/product/OrbitHub";
import { RetrievalCard } from "@/components/product/RetrievalCard";
import { ApprovalCard } from "@/components/product/ApprovalCard";
import { platformHub } from "@/content/product/hubs";
import { SystemTiles } from "@/components/sections/SystemTiles";
import {
  agents,
  architecture,
  capabilities,
  integrations,
  platformClosing,
  platformHero,
  platformMeta,
  platformRelated,
  runtime,
  platformFigures,
} from "@/content/platform";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(platformMeta);

/**
 * The platform, then the agents that run on it. The reader is the IT
 * director, so this is the long, technical page; every string comes from
 * src/content/platform.ts.
 */
export default function PlatformPage() {
  return (
    <main id="main" className="flex-1">
      <PointerTracker />
      <PageHero copy={platformHero} visual={<OrbitHub hub={platformHub} />} />

      <Block copy={capabilities}>
        <ItemGrid items={capabilities.items} variant="cards" />
      </Block>

      <Block copy={architecture} tone="subtle">
        <Steps items={architecture.layers} />
      </Block>

      <Block copy={runtime}>
        <Trace items={runtime.steps} />
        <TermList label={runtime.principlesLabel} items={runtime.principles} variant="chips" tone="violet" className="mt-14" />
      </Block>

      <Block copy={integrations} tone="subtle">
        <SystemTiles items={integrations.categories} />
        <ItemGrid items={integrations.categories} variant="panel" className="mt-16" />
        <TermList label={integrations.principlesLabel} items={integrations.principles} className="mt-16" />
        <Note className="mt-10">{integrations.disclaimer}</Note>
      </Block>

      <Block copy={agents}>
        <BlockHead copy={agents.compare} level={3} />
        <div className="mt-10">
          <CompareTable caption={agents.compare.caption} columns={agents.compare.columns} rows={agents.compare.rows} />
        </div>

        <BlockHead copy={agents.lifecycle} level={3} className="mt-24" />
        <Pipeline items={agents.lifecycle.steps} label={agents.lifecycle.heading} className="mt-10" />

        <BlockHead copy={agents.anatomy} level={3} className="mt-24" />
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <ItemGrid items={agents.anatomy.items} columns={2} variant="cards" />
          <Figure title={platformFigures.retrieval.title} body={platformFigures.retrieval.body}>
            <div className="bg-well overflow-hidden rounded-card px-2 py-8 sm:px-6">
              <RetrievalCard maxScale={1.1} className="mx-auto" />
            </div>
          </Figure>
        </div>

        <BlockHead copy={agents.coordination} level={3} className="mt-24" />
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
          <TermList items={agents.coordination.items} variant="checks" tone="violet" className="[&_ul]:lg:grid-cols-1 [&_ul]:sm:grid-cols-1" />
          <Figure title={platformFigures.approval.title} body={platformFigures.approval.body}>
            <div className="bg-well overflow-hidden rounded-card px-2 py-8 sm:px-6">
              <ApprovalCard maxScale={1.1} className="mx-auto" />
            </div>
          </Figure>
        </div>

        <BlockHead copy={agents.adoption} level={3} className="mt-24" />
        <Pipeline items={agents.adoption.steps} label={agents.adoption.heading} className="mt-10" />

        <Note className="mt-16">{agents.disclaimer}</Note>
      </Block>

      <Block copy={platformRelated} spacing="sm">
        <RelatedLinks items={platformRelated.items} />
      </Block>

      <CtaBand copy={platformClosing} />
    </main>
  );
}
