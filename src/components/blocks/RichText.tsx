import type { ReactNode } from "react";
import { Link } from "@/components/ui";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

/**
 * A line of copy with links in it, written `[label](href)` in the content
 * file. Square brackets with no address after them stay as text: that is how
 * a draft marks a gap.
 */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      <Link key={match.index} href={href}>
        {label}
      </Link>,
    );
    last = match.index + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
