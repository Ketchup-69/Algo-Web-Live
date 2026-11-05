import type { FeatureIconName } from "@/components/ui/FeatureIcon";

/**
 * Picks the icon for a list item from its own words, so every ItemGrid,
 * TermList and Steps entry carries one without a hand-kept table per page.
 * First match wins; the order runs from the most specific idea to the most
 * general. An item that needs a different glyph sets `icon` in its content
 * file, which always beats this.
 */
const RULES: ReadonlyArray<readonly [RegExp, FeatureIconName]> = [
  [/duplicate|paid item|previously paid/i, "content_copy"],
  [/surcharge|rate breach|contract-rate|unapproved payment|policy exception/i, "report"],
  [/variance|difference|mismatch|discrepancy|gap|breach/i, "compare_arrows"],
  [/credit note|credit request|unapplied/i, "receipt"],
  [/remittance|receipt\b|receivable|collections?|promise-to-pay|dso|overdue|dispute/i, "account_balance_wallet"],
  [/beneficiary|currency/i, "currency_exchange"],
  [/payment|settlement|transaction/i, "payments"],
  [/liquidity|capital|cash|working-capital|financ|fintech|accounting/i, "account_balance"],
  [/forecast|scenario|driver|position/i, "query_stats"],
  [/risk|threat|adversarial|anomal|security event|threshold|concentration/i, "warning"],
  [/escalat|investigat/i, "pending_actions"],
  [/knowledge|memory|retrieval/i, "database"],
  [/human|people|person|oversight|authority|approv|review|checkpoint|sign/i, "how_to_reg"],
  [/identity|actor|verified/i, "fingerprint"],
  [/privilege|credential|access|permission|secure|security|protect/i, "encrypted"],
  [/polic|control|governan|govern|rule|limit|segregation|compliance|frameworks?|iso|nist|soc 2|pdpl|ai act|owasp/i, "policy"],
  [/audit|trace|record|history|evidence|accountab/i, "history"],
  [/monitor|observab|visibility|signal|status|latency|incident/i, "monitoring"],
  [/measure|outcome|result|success|turnaround|cycle time|rate\b|accuracy|volume|value|kpi/i, "speed"],
  [/reconcil|match/i, "sync_alt"],
  [/invoice|document|capture|extract|statement|purchase order|purchasing|procurement/i, "description"],
  [/supplier|retail|distribution/i, "local_shipping"],
  [/hospitality|hotel/i, "hotel"],
  [/health/i, "medical_services"],
  [/customer|commercial|sales/i, "groups"],
  [/integrat|connect|system|erp|api|interface|cloud|platform|enterprise resource/i, "hub"],
  [/data|knowledge|memory|retrieval|context|storage|information/i, "database"],
  [/model|reason|intelligen|understand|agent/i, "psychology"],
  [/workflow|orchestrat|handoff|delegation|coordinat|route|routing/i, "account_tree"],
  [/execut|act\b|action|deploy|launch|production/i, "rocket_launch"],
  [/code|coding|engineer|build|tool/i, "build"],
  [/channel|alert|collaboration|email|communication/i, "send"],
  [/qualif|discover|prioriti|objective|purpose|role|business|work\b/i, "target"],
  [/improv|retire|periodic|continuous|update/i, "autorenew"],
  [/test|validat|check|evaluat/i, "task_alt"],
  [/operation|scal|modular|experience/i, "widgets"],
];

const match = (text: string) => RULES.find(([pattern]) => pattern.test(text))?.[1];

/** The title decides; the body is asked only when the title says nothing. */
export function iconFor(title: string, body?: string): FeatureIconName {
  return match(title) ?? (body ? match(body) : undefined) ?? "task_alt";
}
