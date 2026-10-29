import { env } from "@/lib/runtime-env";
import { equalTokens, randomToken, requestOrigin } from "./security";

export function configuration() {
  const values = env as unknown as Record<string, string | undefined>;
  const from = (values.INQUIRY_FROM_EMAIL ?? "").trim();
  const address = from.match(/<([^<>]+)>$/)?.[1] ?? from;
  const sender = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(address) ? address : "";
  return { resendKey: values.RESEND_API_KEY ?? "", sender, webhookSecret: values.RESEND_WEBHOOK_SECRET ?? "" };
}
export function emailReady() { const c = configuration(); return !!(c.resendKey && c.sender && env.DB); }
export function cookie(request: Request, name: string) {
  const key = requestOrigin(request).startsWith("https:") ? `__Host-${name}` : name;
  const part = request.headers.get("cookie")?.split(";").map(value => value.trim()).find(value => value.startsWith(`${key}=`));
  try { return part ? decodeURIComponent(part.slice(key.length + 1)) : ""; } catch { return ""; }
}
export function csrfValid(request: Request) { return equalTokens(cookie(request, "td_csrf"), request.headers.get("x-csrf-token") ?? ""); }
export function ensureCsrf(response: Response, request: Request) {
  const current = cookie(request, "td_csrf");
  const value = /^[A-Za-z0-9_-]{43}$/.test(current) ? current : randomToken();
  if (value !== current) {
    const secure = requestOrigin(request).startsWith("https:");
    response.headers.append("Set-Cookie", `${secure ? "__Host-" : ""}td_csrf=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${secure ? "; Secure" : ""}`);
  }
  return value;
}
