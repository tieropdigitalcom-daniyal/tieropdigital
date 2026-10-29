// Next.js may see an internal HTTP URL behind Hostinger's HTTPS proxy.
// Browsers control Host; do not accept an arbitrary X-Forwarded-Host value.
export function requestOrigin(request: Request) {
  const url = new URL(request.url);
  const host = request.headers.get("host");
  if (!host || /[\s,/@\\?#]/.test(host)) return url.origin;
  const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim();
  const protocol = forwardedProtocol === "https" || forwardedProtocol === "http"
    ? `${forwardedProtocol}:` : url.protocol;
  try { return new URL(`${protocol}//${host}`).origin; } catch { return url.origin; }
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return origin === requestOrigin(request) && request.headers.get("sec-fetch-site") !== "cross-site";
}
export function equalTokens(a: string, b: string) {
  if (a.length !== b.length || a.length < 24 || a.length > 128) return false;
  let difference = 0; for (let i = 0; i < a.length; i++) difference |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return difference === 0;
}
export async function readLimitedBody(request: Request, limit: number) {
  if (Number(request.headers.get("content-length") ?? 0) > limit) throw new Error("payload_too_large");
  const reader = request.body?.getReader(); if (!reader) return "";
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) { const { done, value } = await reader.read(); if (done) break; size += value.byteLength; if (size > limit) { await reader.cancel(); throw new Error("payload_too_large"); } chunks.push(value); }
  const bytes = new Uint8Array(size); let offset = 0; for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return new TextDecoder().decode(bytes);
}
export function randomToken() { return base64url(crypto.getRandomValues(new Uint8Array(32))); }
export function base64url(bytes: Uint8Array) { return btoa(String.fromCharCode(...bytes)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", ""); }
export async function sha256(value: string) { return base64url(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)))); }
