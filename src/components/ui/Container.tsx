import type { ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const widths = {
  /** Long-form reading. Stays under 75 characters per CLAUDE.md §4. */
  prose: "max-w-[68ch]",
  /** The default page column. */
  default: "max-w-[75rem]",
  /** Full-bleed-ish content: wide tables, the agent visual. */
  wide: "max-w-[90rem]",
} as const;

export type ContainerWidth = keyof typeof widths;

type ContainerProps<T extends ElementType> = {
  as?: T;
  width?: ContainerWidth;
} & Omit<ComponentPropsWithoutRef<T>, "as">;

/**
 * Horizontal column and gutters. The gutter is one fluid token (20px at
 * 360px, 80px on a wide screen), so every container shares a left edge.
 */
export function Container<T extends ElementType = "div">({
  as,
  width = "default",
  className,
  ...props
}: ContainerProps<T>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={cn(
        "mx-auto w-full px-(--gutter)",
        widths[width],
        className,
      )}
      {...props}
    />
  );
}
