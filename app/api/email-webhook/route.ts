export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { env } from "@/lib/runtime-env";
import { NextResponse } from "next/server";
import { configuration } from "@/lib/inquiry-server";
import { readLimitedBody } from "@/lib/security";
export async function POST(request: Request) {
  const secret = configuration().webhookSecret; if (!secret || !env.DB) return NextResponse.json({ error: "Webhook unavailable." }, { status: 503 });
  const id = request.headers.get("svix-id") ?? ""; const timestamp = request.headers.get("svix-timestamp") ?? ""; const signatures = request.headers.get("svix-signature") ?? "";
  if (!id || id.length > 256 || !/^\d{10}$/.test(timestamp) || Math.abs(Date.now() / 1000 - Number(timestamp)) > 300 || signatures.length > 4096) return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  try {
    const body = await readLimitedBody(request, 65536); const bytes = Uint8Array.from(atob(secret.replace(/^whsec_/, "")), c => c.charCodeAt(0));
    const key = await crypto.subtle.importKey("raw", bytes, { name: "HMAC", hash: "SHA-256" }, false, ["verify"]); const signed = new TextEncoder().encode(`${id}.${timestamp}.${body}`);
    let verified = false;
    for (const signature of signatures.split(" ")) { const [version, value] = signature.split(","); if (version !== "v1" || !value) continue; const candidate = Uint8Array.from(atob(value), c => c.charCodeAt(0)); if (await crypto.subtle.verify("HMAC", key, candidate, signed)) verified = true; }
    if (!verified) return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
    const event = JSON.parse(body) as { type?: string; data?: { email_id?: string } };
    const types = ["email.sent", "email.delivered", "email.delivery_delayed", "email.bounced", "email.complained", "email.failed", "email.suppressed"];
    if (typeof event.type === "string" && types.includes(event.type) && typeof event.data?.email_id === "string" && event.data.email_id.length < 128) await env.DB.prepare("INSERT OR IGNORE INTO email_delivery_events (id, email_id, event_type, created_at) VALUES (?, ?, ?, ?)").bind(id, event.data.email_id, event.type, Math.floor(Date.now() / 1000)).run();
    return NextResponse.json({ received: true });
  } catch { return NextResponse.json({ error: "Webhook verification or processing failed." }, { status: 400 }); }
}
