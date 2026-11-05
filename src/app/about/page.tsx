import { Block, CtaBand, ItemGrid, PageHero, Steps, TermList } from "@/components/blocks";
import { PointerTracker } from "@/components/motion";
import { aboutClosing, aboutHero, aboutMeta, accountability, principles, story, team, vision } from "@/content/about";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(aboutMeta);

/** Where Algomotive came from, how it works, and what it holds itself to. */
export default function AboutPage() {
  return (
    <main id="main" className="flex-1">
      <PointerTracker />
      <PageHero copy={aboutHero} />

      <Block copy={story}>
        <Steps items={story.steps} layout="rows" />
      </Block>

      <Block copy={principles} tone="subtle">
        <ItemGrid items={principles.items} variant="cards" />
      </Block>

      <Block copy={vision}>
        <TermList items={vision.items} />
      </Block>

      <Block copy={accountability} spacing="sm">
        <ItemGrid items={accountability.items} columns={4} variant="panel" />
      </Block>

      <Block copy={team} tone="subtle">
        <TeamGrid people={team.people} />
      </Block>

      <CtaBand copy={aboutClosing} />
    </main>
  );
}
