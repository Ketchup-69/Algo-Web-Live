import { LegalDocument } from "@/components/blocks";
import { termsOfUse } from "@/content/terms";
import { pageMetadata } from "@/lib/metadata";

// Kept out of search while it is a draft; indexed once `draft` is removed.
export const metadata = pageMetadata(termsOfUse.meta, { index: !termsOfUse.draft });

export default function TermsPage() {
  return <LegalDocument doc={termsOfUse} />;
}
