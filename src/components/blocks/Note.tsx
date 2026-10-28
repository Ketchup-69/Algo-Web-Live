import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Qualifying small print: a disclaimer, a scope note. Never a claim of its own. */
export function Note({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("max-w-[78ch] text-sm text-fg-muted", className)}>{children}</p>;
}
