"use server";

import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(6).max(40),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  type: z.enum(["new", "feature", "migration", "integration", "consulting", "other"]),
  message: z.string().trim().min(10).max(4000),
  locale: z.enum(["es", "en"]).default("es"),
});

export type ContactFormState = {
  status: "idle" | "success" | "error" | "validation";
  issues?: Partial<Record<keyof z.infer<typeof schema>, string>>;
};

export async function sendMessage(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    company: formData.get("company") ?? "",
    type: formData.get("type"),
    message: formData.get("message"),
    locale: formData.get("locale") ?? "es",
  });

  if (!parsed.success) {
    const issues: ContactFormState["issues"] = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path[0] as keyof z.infer<typeof schema>;
      if (path && !issues[path]) issues[path] = issue.message;
    }
    return { status: "validation", issues };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY missing");
    return { status: "error" };
  }

  const resend = new Resend(apiKey);
  const data = parsed.data;
  const from = process.env.RESEND_FROM ?? "Alan Faerverguer <alan@faerverguer.com>";
  const to = process.env.RESEND_TO ?? "faeralan@gmail.com";

  const typeLabels: Record<typeof data.type, string> = {
    new: "New product / MVP",
    feature: "Feature on existing product",
    migration: "Migration / refactor",
    integration: "Integration",
    consulting: "Consulting",
    other: "Other",
  };

  const subject =
    data.locale === "es"
      ? `Nueva consulta · ${data.name} · ${typeLabels[data.type]}`
      : `New inquiry · ${data.name} · ${typeLabels[data.type]}`;

  const html = `
    <div style="font-family: ui-monospace, Menlo, monospace; font-size: 14px; color: #1A2333; background: #F3EDDF; padding: 32px; line-height: 1.6;">
      <p style="margin: 0 0 16px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #6B6357;">Consulta</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #6B6357; width: 140px;">Name</td><td style="padding: 8px 0;">${escape(data.name)}</td></tr>
        <tr><td style="padding: 8px 0; color: #6B6357;">Email</td><td style="padding: 8px 0;"><a href="mailto:${escape(data.email)}" style="color: #C8331F; text-decoration: none;">${escape(data.email)}</a></td></tr>
        ${data.phone ? `<tr><td style="padding: 8px 0; color: #6B6357;">Phone</td><td style="padding: 8px 0;"><a href="tel:${escape(data.phone.replace(/[^+0-9]/g, ""))}" style="color: #C8331F; text-decoration: none;">${escape(data.phone)}</a></td></tr>` : ""}
        ${data.company ? `<tr><td style="padding: 8px 0; color: #6B6357;">Company</td><td style="padding: 8px 0;">${escape(data.company)}</td></tr>` : ""}
        <tr><td style="padding: 8px 0; color: #6B6357;">Type</td><td style="padding: 8px 0;">${typeLabels[data.type]}</td></tr>
        <tr><td style="padding: 8px 0; color: #6B6357;">Locale</td><td style="padding: 8px 0;">${data.locale.toUpperCase()}</td></tr>
      </table>
      <hr style="border: none; border-top: 1px solid rgba(26,35,51,0.18); margin: 20px 0;" />
      <div style="white-space: pre-wrap; font-family: Georgia, serif; font-size: 16px; line-height: 1.55;">${escape(data.message)}</div>
    </div>
  `;

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject,
      html,
    });
    if (result.error) {
      console.error("Resend error", result.error);
      return { status: "error" };
    }
    return { status: "success" };
  } catch (err) {
    console.error("Resend throw", err);
    return { status: "error" };
  }
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
