# Portfolio — Alan Faerverguer

Personal portfolio built as a bilingual (ES/EN) editorial-style "dossier". Full-stack developer profile with projects, capabilities, experience, stack, and a working contact form.

Live: [alanfaerverguer.vercel.app](https://alanfaerverguer.vercel.app)

## Stack

- **Next.js 16** (App Router, `proxy.ts` convention, async `params`)
- **React 19** + TypeScript
- **Tailwind CSS v4** with a custom "Dossier" design system (paper/ink tokens, rule lines, dot grids, SVG grain overlay)
- **next-intl 4** for i18n with `as-needed` locale prefix (`/` → Spanish, `/en` → English)
- **Resend** + **Zod** for the contact form (server actions, no client-side mail keys)
- **Vercel Analytics**
- Fonts: Source Serif 4, IBM Plex Serif, JetBrains Mono (via `next/font`)

## Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx        # generateStaticParams + metadata per locale
│   │   └── page.tsx          # single-page editorial layout
│   ├── actions.ts            # server action: sendMessage (Zod + Resend)
│   ├── icon.tsx              # generated 32×32 favicon (AF monogram)
│   └── globals.css           # design tokens + utility classes
├── components/
│   ├── ContactForm.tsx       # useActionState + progressive enhancement
│   └── LocaleSwitcher.tsx
├── i18n/
│   ├── routing.ts            # locales = ["es", "en"]
│   ├── request.ts
│   └── navigation.ts
└── proxy.ts                  # next-intl middleware (Next 16 rename)

messages/
├── es.json
└── en.json
```

All textual content lives in `messages/*.json` — no copy lives in components.

## Local development

```bash
npm install
cp .env.local.example .env.local   # fill in Resend vars
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Key | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | Yes | From [resend.com/api-keys](https://resend.com/api-keys) |
| `RESEND_FROM` | No | Defaults to a fallback. Must use a Resend-verified domain in production. `onboarding@resend.dev` works for sandbox testing. |
| `RESEND_TO` | No | Inbox for incoming messages. Defaults to the author's address. |

Next.js loads `.env.local` at startup only — restart `npm run dev` after editing.

## Scripts

```bash
npm run dev     # start dev server
npm run build   # production build (static + proxy)
npm run start   # serve the production build
npm run lint    # ESLint
```

## Deploy

Designed for Vercel — zero config. Import the repo, set the three Resend env vars, deploy. Previews on every PR; `main` ships to production.

## License

MIT.
