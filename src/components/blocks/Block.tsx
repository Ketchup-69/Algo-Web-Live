import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container, Heading, Section, Text, type SectionSpacing, type SectionTone } from "@/components/ui";
import { Reveal } from "@/components/motion";
import type { SectionCopy } from "@/content/types";

/**
 * One section of a page: its heading and intro, then whatever the section
 * holds. Every content section on every page is one of these, so the rhythm
 * between them is set once.
 *
 * Motion is the masked line reveal on the heading and nothing else; the body
 * is in place from the first frame (§5: restraint everywhere but the hero and
 * the one scroll moment).
 */
export function Block({
  copy,
  spacing = "md",
  tone = "none",
  align = "start",
  width = "wide",
  headingClassName,
  className,
  children,
}: {
  copy: SectionCopy;
  spacing?: SectionSpacing;
  tone?: SectionTone;
  align?: "start" | "center";
  width?: "default" | "wide";
  headingClassName?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <Section id={copy.id} spacing={spacing} tone={tone} className={cn("scroll-mt-20", className)}>
      <Container width={width}>
        <Reveal>
          <BlockHead copy={copy} align={align} className={headingClassName} />
          {children ? <div className="mt-12 lg:mt-16">{children}</div> : null}
        </Reveal>
      </Container>
    </Section>
  );
}

/** A section's heading and intro, on their own. */
export function BlockHead({
  copy,
  align = "start",
  level = 2,
  className,
}: {
  copy: Pick<SectionCopy, "heading" | "intro">;
  align?: "start" | "center";
  level?: 2 | 3;
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto flex flex-col items-center text-center", className)}>
      <Heading
        level={level}
        size={level === 2 ? "2xl" : "lg"}
        className={cn("text-balance", align === "center" ? "max-w-[24ch]" : "max-w-[22ch]")}
        data-reveal={level === 2 ? "lines" : undefined}
      >
        {copy.heading}
      </Heading>
      {copy.intro ? (
        <Text tone="muted" size="lg" className={cn("mt-5", align === "center" ? "max-w-[60ch]" : "max-w-[62ch]")}>
          {copy.intro}
        </Text>
      ) : null}
    </div>
  );
}
