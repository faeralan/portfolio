import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const base = "https://faeralan.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, l === routing.defaultLocale ? base : `${base}/${l}`]),
  );

  return routing.locales.map((locale) => ({
    url: locale === routing.defaultLocale ? base : `${base}/${locale}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: { languages },
  }));
}
