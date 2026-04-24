"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("folio");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function set(next: "es" | "en") {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  const base =
    "px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] transition-colors rounded-sm";
  const active = "bg-accent text-[color:var(--paper)]";
  const inactive = "text-[color:var(--muted)] hover:text-[color:var(--ink)]";

  return (
    <div
      className="inline-flex items-center gap-0 border border-[color:var(--rule)] rounded-[4px] overflow-hidden"
      aria-busy={isPending}
    >
      <button
        type="button"
        onClick={() => set("es")}
        aria-label="Español"
        aria-pressed={locale === "es"}
        className={`${base} ${locale === "es" ? active : inactive}`}
      >
        {t("toggleEs")}
      </button>
      <span className="w-px h-4 bg-[color:var(--rule)]" aria-hidden />
      <button
        type="button"
        onClick={() => set("en")}
        aria-label="English"
        aria-pressed={locale === "en"}
        className={`${base} ${locale === "en" ? active : inactive}`}
      >
        {t("toggleEn")}
      </button>
    </div>
  );
}
