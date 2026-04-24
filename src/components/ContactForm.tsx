"use client";

import { useActionState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { sendMessage, type ContactFormState } from "@/app/actions";

const initial: ContactFormState = { status: "idle" };

export function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const projectTypes = t.raw("projectTypes") as Array<{ value: string; label: string }>;

  const [state, formAction, isPending] = useActionState(sendMessage, initial);

  const errorFor = (field: string) =>
    state.status === "validation" ? state.issues?.[field as keyof NonNullable<ContactFormState["issues"]>] : undefined;

  return (
    <form
      action={formAction}
      className="bg-[color:var(--paper-dark)] border border-[color:var(--rule)] rounded-[4px] p-8 md:p-10 flex flex-col gap-6"
      aria-live="polite"
    >
      <input type="hidden" name="locale" value={locale} />

      <header className="flex flex-col gap-1">
        <h3 className="font-display text-[24px] leading-tight font-semibold text-[color:var(--ink)]">
          {t("formTitle")}
        </h3>
      </header>

      <Field label={t("formLabelName")} error={errorFor("name")}>
        <input
          type="text"
          name="name"
          required
          minLength={2}
          className="input-underline"
          aria-invalid={!!errorFor("name")}
        />
      </Field>

      <Field label={t("formLabelEmail")} error={errorFor("email")}>
        <input
          type="email"
          name="email"
          required
          className="input-underline"
          aria-invalid={!!errorFor("email")}
        />
      </Field>

      <Field label={t("formLabelPhone")} error={errorFor("phone")}>
        <input
          type="tel"
          name="phone"
          required
          minLength={6}
          inputMode="tel"
          autoComplete="tel"
          placeholder="+54 9 11 5555 5555"
          className="input-underline"
          aria-invalid={!!errorFor("phone")}
        />
      </Field>

      <Field label={t("formLabelCompany")} error={errorFor("company")}>
        <input type="text" name="company" className="input-underline" />
      </Field>

      <Field label={t("formLabelType")} error={errorFor("type")}>
        <select name="type" required defaultValue="new" className="input-underline">
          {projectTypes.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t("formLabelMessage")} error={errorFor("message")}>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={4000}
          className="input-underline"
          aria-invalid={!!errorFor("message")}
        />
      </Field>

      <div className="flex flex-col gap-3 pt-2">
        <button type="submit" disabled={isPending} className="btn-primary self-start">
          {isPending ? t("formSending") : t("formSubmit")}
          <span aria-hidden className="font-mono text-[color:var(--accent)]">→</span>
        </button>

        {state.status === "success" && (
          <p className="font-mono text-[12px] text-[color:var(--ink)]" role="status">
            ✓ {t("formSuccess")}
          </p>
        )}
        {state.status === "validation" && (
          <p className="font-mono text-[12px] text-[color:var(--accent)]" role="alert">
            {t("formErrorValidation")}
          </p>
        )}
        {state.status === "error" && (
          <p className="font-mono text-[12px] text-[color:var(--accent)]" role="alert">
            {t("formErrorGeneric")}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="mono-label">{label}</span>
      {children}
      {error && (
        <span className="font-mono text-[10px] text-[color:var(--accent)] mt-1">{error}</span>
      )}
    </label>
  );
}
