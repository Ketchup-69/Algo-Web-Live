import {
  Block,
  BlockHead,
  CompareTable,
  CtaBand,
  ItemGrid,
  Note,
  PageHero,
  RelatedLinks,
  Steps,
  TermList,
  Trace,
} from "@/components/blocks";
import { PointerTracker } from "@/components/motion";
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
      <PageHero copy={platformHero} />

      <Block copy={capabilities}>
        <ItemGrid items={capabilities.items} />
      </Block>

      <Block copy={architecture} tone="subtle">
        <Steps items={architecture.layers} />
      </Block>

      <Block copy={runtime}>
        <Trace items={runtime.steps} />
        <TermList label={runtime.principlesLabel} items={runtime.principles} className="mt-14" />
      </Block>

      <Block copy={integrations} tone="subtle">
        <SystemTiles items={integrations.categories} />
        <ItemGrid items={integrations.categories} className="mt-16" />
        <TermList label={integrations.principlesLabel} items={integrations.principles} className="mt-16" />
        <Note className="mt-10">{integrations.disclaimer}</Note>
      </Block>

      <Block copy={agents}>
        <BlockHead copy={agents.compare} level={3} />
        <div className="mt-10">
          <CompareTable caption={agents.compare.caption} columns={agents.compare.columns} rows={agents.compare.rows} />
        </div>

        <BlockHead copy={agents.lifecycle} level={3} className="mt-24" />
        <Steps items={agents.lifecycle.steps} className="mt-10 lg:grid-cols-5" />

        <BlockHead copy={agents.anatomy} level={3} className="mt-24" />
        <ItemGrid items={agents.anatomy.items} columns={4} className="mt-10" />

        <BlockHead copy={agents.coordination} level={3} className="mt-24" />
        <TermList items={agents.coordination.items} className="mt-10" />

        <BlockHead copy={agents.adoption} level={3} className="mt-24" />
        <Steps items={agents.adoption.steps} className="mt-10" />

        <Note className="mt-16">{agents.disclaimer}</Note>
      </Block>

      <Block copy={platformRelated} spacing="sm">
        <RelatedLinks items={platformRelated.items} />
      </Block>

      <CtaBand copy={platformClosing} />
    </main>
  );
}
