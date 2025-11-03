import { NextRequest } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ContactSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(5),
  email: z.string().email(),
  zip: z.string().optional().nullable(),
  serviceType: z.string().optional().nullable(),
  date: z.string().optional().nullable(),
  timeWindow: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  details: z.string().optional().nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const data = ContactSchema.parse(json);

    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = Number(process.env.SMTP_PORT ?? "587");
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const SMTP_SECURE = process.env.SMTP_SECURE
      ? String(process.env.SMTP_SECURE).toLowerCase() === "true"
      : SMTP_PORT === 465;
    const TO = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_CONTACT_TO_EMAIL;
    const FROM = process.env.CONTACT_FROM_EMAIL || (SMTP_USER ? `Installer Man <${SMTP_USER}>` : undefined);

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !TO || !FROM) {
      return new Response(
        JSON.stringify({ error: "SMTP not configured.", missing: {
          SMTP_HOST: !!SMTP_HOST,
          SMTP_USER: !!SMTP_USER,
          SMTP_PASS: !!SMTP_PASS,
          CONTACT_TO_EMAIL: !!TO,
          CONTACT_FROM_EMAIL: !!FROM,
          // Note: SMTP_PORT defaults to 587 when not provided
          SMTP_PORT: true,
        } }),
        { status: 500, headers: { "content-type": "application/json" } }
      );
    }
    const subject = `you have received a new lead ${data.name}`;
    const html = `
      <div style="font-family: system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif; line-height:1.6;">
        <h2 style="margin:0 0 12px;">New Contact Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        ${data.zip ? `<p><strong>ZIP:</strong> ${escapeHtml(data.zip)}</p>` : ""}
        ${data.serviceType ? `<p><strong>Service type:</strong> ${escapeHtml(data.serviceType)}</p>` : ""}
        ${data.date ? `<p><strong>Preferred date:</strong> ${escapeHtml(data.date)}</p>` : ""}
        ${data.timeWindow ? `<p><strong>Time window:</strong> ${escapeHtml(data.timeWindow)}</p>` : ""}
        ${data.budget ? `<p><strong>Approx. budget:</strong> ${escapeHtml(data.budget)}</p>` : ""}
        ${data.details ? `<p><strong>Details:</strong><br/>${escapeHtml(data.details).replace(/\n/g, "<br/>")}</p>` : ""}
      </div>
    `;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const info = await transporter.sendMail({
      from: FROM,
      to: TO,
      subject,
      html,
      replyTo: data.email,
    });

    return new Response(JSON.stringify({ ok: true, id: info.messageId }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: "Invalid input", issues: err.issues }), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ error: "Unexpected error", details: String((err as Error)?.message || err) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


