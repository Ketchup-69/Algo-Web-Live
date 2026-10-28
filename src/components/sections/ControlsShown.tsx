import { Container, GradientField, Heading, Section, Text } from "@/components/ui";
import { PinnedSteps } from "@/components/motion";
import { BlockHead } from "@/components/blocks";
import { ApprovalCard } from "@/components/product/ApprovalCard";
import { AuditTrailCard } from "@/components/product/AuditTrailCard";
import { RetrievalCard } from "@/components/product/RetrievalCard";
import { controlsShown } from "@/content/security";
import { site } from "@/content/site";

/**
 * One visual per control, in the order of `controlsShown.items`. Each shows
 * the thing its sentence says and nothing else: a person deciding; an answer
 * citing its records and a record the role cannot see; the logged events.
 */
const VISUALS = [ApprovalCard, RetrievalCard, AuditTrailCard] as const;

/**
 * The site's one signature scroll moment (§5). The claim opens the section;
 * then, on a wide screen, a full screen holds still while the page scrolls
 * and the pairs change places — the control on the left, the proof on the
 * right (see PinnedSteps). Everywhere else they are pairs in a column.
 */
export function ControlsShown() {
  return (
    <Section spacing="none" className="relative">
      <GradientField className="gfield-soft" />
      <Container width="wide" className="relative pt-(--space-section-md)">
        <BlockHead copy={controlsShown} align="center" />
      </Container>

      <PinnedSteps labels={controlsShown.items.map((item) => item.title)} navLabel={controlsShown.stepsLabel}>
        <Container width="wide" className="relative">
          <div className="steps-grid">
            {controlsShown.items.map((item, index) => {
              const Visual = VISUALS[index];
              return (
                <div key={item.title} data-step="" data-state={index === 0 ? "active" : "after"}>
                  <div className="step-text">
                    <Heading level={3} size="2xl" className="max-w-[14ch]">
                      {item.title}
                    </Heading>
                    <Text tone="muted" size="lg" measure={false} className="mt-6 max-w-[38ch]">
                      {item.body}
                    </Text>
                    <Text tone="muted" size="sm" measure={false} className="mt-6">
                      {site.ui.sampleNote}
                    </Text>
                  </div>
                  <div className="step-visual" data-step-visual="">
                    {Visual ? <Visual className="mx-auto" /> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </PinnedSteps>
    </Section>
  );
}
