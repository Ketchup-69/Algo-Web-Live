"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { Button, Text } from "@/components/ui";
import { contactPage as copy, type RequestType } from "@/content/contact";
import { buildMailto, site } from "@/content/site";

type Errors = Partial<Record<string, string>>;
type Composed = { to: string; subject: string; body: string; href: string };
type Copied = "address" | "message" | "failed" | null;

const REQUEST_VALUES = copy.request.options.map((option) => option.value);
const isRequest = (value: string | null): value is RequestType =>
  value !== null && (REQUEST_VALUES as string[]).includes(value);

/**
 * PLACEHOLDER: the CRM form embed replaces this in Phase 4 (CLAUDE.md §7).
 * Until then it is the `mailto:` composer, and it stays as the fallback after.
 *
 * A real, validated form. The first question is what the visitor needs; a
 * support request goes to the helpdesk and everything else to sales. On a
 * clean submit it builds a structured subject and a body listing every field,
 * opens the visitor's email app through a `mailto:` URL, and swaps in a panel
 * that repeats the address and the full message with copy buttons — because
 * `mailto:` fails silently for anyone on webmail without a handler, and they
 * must still be able to send it.
 *
 * Links elsewhere on the site can open it with a request type chosen
 * (`/contact/?request=product`). That is read after hydration, so the static
 * HTML is the plain form and nothing differs between server and client.
 */
export function ContactForm() {
  const [request, setRequest] = useState<RequestType | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [composed, setComposed] = useState<Composed | null>(null);
  const [copied, setCopied] = useState<Copied>(null);
  const panelHeading = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const addressRef = useRef<HTMLElement>(null);
  const messageRef = useRef<HTMLPreElement>(null);
  const wasComposed = useRef(false);

  useEffect(() => {
    const asked = new URLSearchParams(window.location.search).get("request");
    // Reading the address bar once on arrival is a sync with the outside
    // world, not derived state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isRequest(asked)) setRequest(asked);
  }, []);

  // Focus follows the state change: into the panel when it appears, back to
  // the form's first field when the visitor comes back to edit. The form
  // stays mounted (hidden) while the panel shows, so what they typed is
  // still there when they return.
  useEffect(() => {
    if (composed) {
      panelHeading.current?.focus();
      wasComposed.current = true;
    } else if (wasComposed.current) {
      wasComposed.current = false;
      formRef.current?.querySelector<HTMLElement>("input, textarea")?.focus();
    }
  }, [composed]);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(null), copied === "failed" ? 4000 : 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  function validate(data: FormData): Errors {
    const next: Errors = {};
    if (!isRequest(String(data.get("request") ?? "") || null)) next.request = copy.errors.request;
    for (const field of copy.fields) {
      const value = String(data.get(field.name) ?? "").trim();
      if (field.required && !value) {
        next[field.name] = copy.errors.required;
        continue;
      }
      // Deliberately permissive: the point is to catch a typo, not to police
      // which addresses are allowed to exist.
      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        next[field.name] = copy.errors.email;
      }
    }
    return next;
  }

  function compose(data: FormData): Composed {
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const chosen = copy.request.options.find((option) => option.value === value("request"));
    const to = chosen?.value === "support" ? site.email.helpdesk : site.email.sales;
    // Function replacers: a "$&" typed into a field is text, not a pattern.
    const subject = copy.subjectTemplate
      .replace("{request}", () => chosen?.label ?? "")
      .replace("{name}", () => value("name"))
      .replace("{company}", () => value("company"));
    const body = copy.fields
      .filter((field) => value(field.name))
      .map((field) =>
        field.type === "textarea"
          ? `${field.label}\n${value(field.name)}`
          : `${field.label}: ${value(field.name)}`,
      )
      .join("\n");
    return { to, subject, body, href: buildMailto(to, { subject, body }) };
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = found.request ? "request-opportunity" : copy.fields.find((f) => found[f.name])?.name;
      if (first) document.getElementById(first)?.focus();
      return;
    }
    const next = compose(data);
    setComposed(next);
    // Same tab, so a popup blocker never gets a say. The page stays put; the
    // panel is what the visitor sees when they come back from their mail app.
    window.location.href = next.href;
  }

  async function copyText(kind: "address" | "message", text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      return;
    } catch {
      // Clipboard unavailable or refused. Select the text on screen instead
      // and say so, so the visitor can copy it themselves.
    }
    const node = kind === "address" ? addressRef.current : messageRef.current;
    if (node) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(node);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
    setCopied("failed");
  }

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full rounded-control border bg-surface px-3.5 py-3 text-base text-fg",
      "transition-[border-color,box-shadow] duration-150 placeholder:text-fg-muted",
      "hover:border-fg-muted",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      hasError ? "border-2 border-attention" : "border-border-strong",
    );

  const errorText = (id: string, message?: string) =>
    message ? (
      // The error answers an action, so it is worth animating: it appears
      // where the eye already is. role="alert" is what announces it.
      <p id={id} role="alert" className="motion-safe:animate-field-error mt-2 text-sm font-medium text-fg">
        {message}
      </p>
    ) : null;

  return (
    <div className="card p-6 sm:p-8" data-ptr="">
      {composed ? (
        <div className="motion-safe:animate-panel-in" aria-live="polite">
          <h2
            ref={panelHeading}
            tabIndex={-1}
            className="font-display text-xl font-semibold text-fg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            {copy.composer.title}
          </h2>
          <Text tone="muted" className="mt-3">
            {copy.composer.body}
          </Text>

          <dl className="mt-8 flex flex-col gap-6">
            <div>
              <dt className="text-sm font-medium text-fg">{copy.composer.addressLabel}</dt>
              <dd className="mt-2 flex flex-wrap items-center gap-3">
                <code ref={addressRef} className="font-data rounded-control bg-bg-subtle px-2.5 py-1.5 text-sm text-fg">
                  {composed.to}
                </code>
                <Button variant="secondary" size="sm" onClick={() => copyText("address", composed.to)}>
                  {copied === "address" ? copy.composer.copied : copy.composer.copyAddress}
                </Button>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-fg">{composed.subject}</dt>
              <dd className="mt-2">
                <pre
                  ref={messageRef}
                  className="max-h-64 overflow-auto rounded-control bg-bg-subtle px-3.5 py-3 font-body text-sm leading-relaxed whitespace-pre-wrap text-fg-muted"
                >
                  {composed.body}
                </pre>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => copyText("message", `${composed.subject}\n\n${composed.body}`)}
                  >
                    {copied === "message" ? copy.composer.copied : copy.composer.copyMessage}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setComposed(null)}>
                    {copy.composer.edit}
                  </Button>
                </div>
                {copied === "failed" ? (
                  <p role="status" className="mt-3 text-sm text-fg-muted">
                    {copy.composer.copyFailed}
                  </p>
                ) : null}
              </dd>
            </div>
          </dl>
        </div>
      ) : null}

      {/* Mounted throughout so typed values survive a round trip to the
          panel; `hidden` takes it out of the tab order and the accessibility
          tree while the panel is shown. */}
      <form ref={formRef} noValidate onSubmit={onSubmit} hidden={composed !== null} className="flex flex-col gap-6">
        <fieldset aria-describedby={errors.request ? "request-error" : undefined}>
          <legend className="mb-3 block text-sm font-medium text-fg">
            {copy.request.legend}
            <span aria-hidden="true" className="text-fg-muted">
              {" "}
              {site.ui.requiredMarker}
            </span>
          </legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {copy.request.options.map((option) => (
              <label
                key={option.value}
                htmlFor={`request-${option.value}`}
                className={cn(
                  "flex cursor-pointer gap-3 rounded-control border p-3.5 transition-colors duration-150",
                  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
                  request === option.value
                    ? "border-2 border-fg bg-accent-soft p-[calc(0.875rem-1px)]"
                    : "border-border-strong hover:border-fg-muted",
                )}
              >
                <input
                  id={`request-${option.value}`}
                  type="radio"
                  name="request"
                  value={option.value}
                  checked={request === option.value}
                  onChange={() => setRequest(option.value)}
                  className="mt-1 size-4 shrink-0 accent-fg focus-visible:outline-none"
                />
                <span>
                  <span className="block text-sm font-semibold text-fg">{option.label}</span>
                  <span className="mt-1 block text-sm text-fg-muted">{option.hint}</span>
                </span>
              </label>
            ))}
          </div>
          {errorText("request-error", errors.request)}
        </fieldset>

        {copy.fields.map((field) => {
          const error = errors[field.name];
          const describedBy = error ? `${field.name}-error` : undefined;
          return (
            <div key={field.name}>
              <label htmlFor={field.name} className="mb-2 block text-sm font-medium text-fg">
                {field.label}
                <span aria-hidden={field.required ? true : undefined} className="text-fg-muted">
                  {" "}
                  {field.required ? site.ui.requiredMarker : copy.optionalMarker}
                </span>
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  rows={5}
                  required={field.required}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy}
                  className={inputClass(Boolean(error))}
                />
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  autoComplete={field.autoComplete}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy}
                  className={inputClass(Boolean(error))}
                />
              )}
              {errorText(`${field.name}-error`, error)}
            </div>
          );
        })}

        <div className="mt-2 flex flex-wrap items-center gap-4">
          <Button type="submit" size="lg">
            {copy.submitLabel}
          </Button>
          <Text tone="muted" size="sm" measure={false}>
            {copy.submitNote}
          </Text>
        </div>
      </form>
    </div>
  );
}
