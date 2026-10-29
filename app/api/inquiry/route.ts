export const runtime = "nodejs";
export const dynamic = "force-dynamic";
import { env } from "@/lib/runtime-env";
import { NextResponse } from "next/server";
import { configuration, csrfValid, emailReady, ensureCsrf } from "@/lib/inquiry-server";
import { inquirySchema } from "@/lib/inquiry-schema";
import { EMAIL } from "@/lib/content";
import { readLimitedBody, sameOrigin, sha256 } from "@/lib/security";
type Stored = { id: string; user_hash: string; payload_hash: string; status: string; created_at: number; last_attempt: number; attempts: number };
export async function GET(request: Request) {
  const response = NextResponse.json({}, { headers: { "Cache-Control": "no-store, private" } });
  const csrf = ensureCsrf(response, request);
  const result = NextResponse.json({ emailReady: emailReady(), csrf }, { headers: { "Cache-Control": "no-store, private" } });
  for (const value of response.headers.getSetCookie()) result.headers.append("Set-Cookie", value);
  return result;
}
export async function POST(request: Request) {
  const reply = (error: string, status: number, retry?: number) => NextResponse.json({ error }, { status, headers: { "Cache-Control": "no-store, private", ...(retry ? { "Retry-After": String(retry) } : {}) } });
  if (!sameOrigin(request)) return reply("This request could not be verified. Please use the website form.", 403);
  if (!emailReady()) return reply("Online inquiries are not available yet. Please email tieropdigital.com@gmail.com.", 503);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply("Please submit the project inquiry form.", 415);
  const respond = (response: Response) => response;
  if (!csrfValid(request)) return respond(reply("This form session could not be verified. Refresh the page and try again.", 403));
  let raw: unknown; try { raw = JSON.parse(await readLimitedBody(request, 32768)); } catch { return respond(reply("The inquiry could not be read or is too large.", 400)); }
  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) return respond(reply("Please check your name, country, international phone number and project details.", 400));
  const data = parsed.data;
  const c = configuration(); const database = env.DB; if (!database) return respond(reply("Online inquiries are temporarily unavailable. Please email us directly.", 503));
  // A salted sender hash keeps the limit across cookie resets without trusting proxy IP headers.
  const identity = data.email.toLowerCase();
  const now = Math.floor(Date.now() / 1000); const userHash = await sha256(`${c.resendKey}:${identity}`);
  const payloadHash = await sha256(JSON.stringify([data.name, data.country, data.phone, data.email.toLowerCase(), data.message]));
  const accepted = () => respond(NextResponse.json({ accepted: true, status: "accepted_for_processing" }, { headers: { "Cache-Control": "no-store, private" } }));
  try {
    const existing = await database.prepare("SELECT id, user_hash, payload_hash, status, created_at, last_attempt, attempts FROM inquiry_requests WHERE id = ?").bind(data.requestId).first<Stored>();
    const submittedAt = existing?.created_at ?? now;
    if (existing) {
      if (existing.user_hash !== userHash || existing.payload_hash !== payloadHash) return respond(reply("This request reference has already been used. Refresh the page before sending changed details.", 409));
      if (existing.status === "accepted") return accepted();
      if (now - existing.last_attempt < 30) return respond(reply("Your inquiry may still be processing. Wait 30 seconds, then retry the same submission.", 409, 30));
      const retried = await database.prepare("UPDATE inquiry_requests SET status = 'pending', attempts = attempts + 1, last_attempt = ? WHERE id = ? AND attempts < 3 AND status != 'accepted' AND last_attempt <= ? AND (SELECT COALESCE(SUM(attempts), 0) FROM inquiry_requests WHERE user_hash = ? AND created_at > ?) < 5 AND (SELECT COALESCE(SUM(attempts), 0) FROM inquiry_requests WHERE created_at > ?) < 50 RETURNING id").bind(now, data.requestId, now - 30, userHash, now - 3600, now - 3600).first();
      if (!retried) return respond(reply("Please wait before trying again, or contact us directly by email.", 429, 3600));
    } else {
      const inserted = await database.prepare("INSERT INTO inquiry_requests (id, user_hash, payload_hash, created_at, last_attempt, attempts, status) SELECT ?, ?, ?, ?, ?, 1, 'pending' WHERE (SELECT COALESCE(SUM(attempts), 0) FROM inquiry_requests WHERE user_hash = ? AND created_at > ?) < 5 AND (SELECT COALESCE(SUM(attempts), 0) FROM inquiry_requests WHERE created_at > ?) < 50 RETURNING id").bind(data.requestId, userHash, payloadHash, now, now, userHash, now - 3600, now - 3600).first();
      if (!inserted) return respond(reply("You’ve reached the inquiry limit. Please wait before sending another, or contact us by email.", 429, 3600));
    }
    const country = new Intl.DisplayNames(["en"], { type: "region" }).of(data.country) ?? data.country;
    const text = ["New project inquiry received.", "", `Client Name: ${data.name}`, `Country: ${country}`, `Phone: ${data.phone}`, `Email: ${data.email}`, "", "Project Details:", data.message, "", "Contact details supplied by the visitor; no account sign-in is required.", `Submission Date: ${new Date(submittedAt * 1000).toISOString()} (UTC)`, "Source: TIEROP DIGITAL Website", `Request Reference: ${data.requestId}`].join("\n");
    const displayName = data.name.replace(/["\\<>]/g, "").trim();
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${c.resendKey}`, "Content-Type": "application/json", "Idempotency-Key": `tierop/${userHash}/${data.requestId}` }, body: JSON.stringify({ from: `"${displayName} via TIEROP DIGITAL" <${c.sender}>`, to: [EMAIL], reply_to: data.email, subject: `New Project Inquiry — ${data.name} — TIEROP DIGITAL`, text }), signal: AbortSignal.timeout(12000) });
    if (!response.ok) { await database.prepare("UPDATE inquiry_requests SET status = 'failed' WHERE id = ? AND status != 'accepted'").bind(data.requestId).run(); return respond(reply("The email service did not accept your inquiry. Please wait 30 seconds and retry, or email us directly.", 502, 30)); }
    const receipt = await response.json() as { id?: unknown };
    if (typeof receipt.id !== "string" || !receipt.id) return respond(reply("We couldn’t confirm email acceptance. Wait 30 seconds, then retry the same inquiry.", 502, 30));
    await database.prepare("UPDATE inquiry_requests SET status = 'accepted', email_id = ? WHERE id = ?").bind(receipt.id, data.requestId).run();
    return accepted();
  } catch { return respond(reply("We couldn’t confirm that your inquiry was accepted. Wait 30 seconds, then retry the same submission, or contact us by email.", 503, 30)); }
}
