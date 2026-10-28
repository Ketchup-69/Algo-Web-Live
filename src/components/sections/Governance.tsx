import { Container, GradientField, Heading, Section, Text } from "@/components/ui";
import { PinnedSteps } from "@/components/motion";
import { ApprovalCard } from "@/components/product/ApprovalCard";
import { AuditTrailCard } from "@/components/product/AuditTrailCard";
import { DataTiersCard } from "@/components/product/DataTiersCard";
import { RetrievalCard } from "@/components/product/RetrievalCard";
import { governance } from "@/content/sections";

/**
 * One visual per control, in the order of `governance.points`. Each shows the
 * thing its sentence says and nothing else: a person deciding; an answer
 * citing its records and a record the role cannot see; the four kinds of
 * logged event; three classes of data going three ways.
 */
const VISUALS = [ApprovalCard, RetrievalCard, AuditTrailCard, DataTiersCard] as const;

/**
 * The load-bearing argument, made one control
 * at a time. The claim opens the section; then, on a wide screen, a full
 * screen holds still while the page scrolls and the four pairs change places
 * — the control on the left, the proof on the right, nothing else in view
 * (see PinnedSteps). Everywhere else they are four pairs in a column.
 *
 * It sits on the page's own ground in both themes — no panel, no change of
 * colour — so the page reads as one surface from the hero to the closing band.
 */
export function Governance() {
  return (
    <Section id={governance.id} spacing="none" className="relative">
      <GradientField className="gfield-soft" />

      {/* The opener: the section's claim, centred, on its own. It scrolls
          away before the panel pins, so the pairs have the screen to themselves. */}
      <Container width="wide" className="relative pt-(--space-section-lg)">
        <div className="mx-auto flex max-w-[52rem] flex-col items-center text-center">
          <Heading level={2} size="3xl" lead={governance.h2Lead}>
            {governance.h2}
          </Heading>
          <Text size="lg" tone="muted" className="mt-6 max-w-[52ch]">
            {governance.intro}
          </Text>
        </div>
      </Container>

      <PinnedSteps labels={governance.points.map((point) => point.label)} navLabel={governance.stepsLabel}>
        <Container width="wide" className="relative">
          <div className="steps-grid">
            {governance.points.map((point, index) => {
              const Visual = VISUALS[index];
              return (
                <div key={point.label} data-step="" data-state={index === 0 ? "active" : "after"}>
                  <div className="step-text">
                    <Heading level={3} size="2xl" className="max-w-[14ch]">
                      {point.label}
                    </Heading>
                    <Text tone="muted" size="lg" measure={false} className="mt-6 max-w-[38ch]">
                      {point.description}
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
