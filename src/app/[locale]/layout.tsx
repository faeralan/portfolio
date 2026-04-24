import type { Metadata } from "next";
import { Source_Serif_4, IBM_Plex_Serif, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { routing } from "@/i18n/routing";
import "../globals.css";

const display = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

const body = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const canonical = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://faeralan.dev"),
    authors: [{ name: "Alan Faerverguer", url: "https://faeralan.dev" }],
    creator: "Alan Faerverguer",
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale,
      type: "profile",
      url: canonical,
      siteName: "Alan Faerverguer",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, l === routing.defaultLocale ? "/" : `/${l}`]),
      ),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alan Faerverguer",
    jobTitle: "Full-stack Software Developer",
    url: "https://faeralan.dev",
    image: "https://faeralan.dev/opengraph-image",
    email: "faeralan@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressCountry: "AR",
    },
    sameAs: [
      "https://github.com/faeralan",
      "https://linkedin.com/in/afaerverguer",
    ],
    knowsAbout: [
      "TypeScript",
      "JavaScript",
      "Next.js",
      "NestJS",
      "React",
      "Angular",
      "ASP.NET",
      "PostgreSQL",
      "Clean Architecture",
    ],
  };

  return (
    <html lang={locale} className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
