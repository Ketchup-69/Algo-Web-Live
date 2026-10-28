import { LegalDocument } from "@/components/blocks";
import { privacyNotice } from "@/content/privacy";
import { pageMetadata } from "@/lib/metadata";

// Kept out of search while it is a draft; indexed once `draft` is removed.
export const metadata = pageMetadata(privacyNotice.meta, { index: !privacyNotice.draft });

export default function PrivacyPage() {
  return <LegalDocument doc={privacyNotice} />;
}
