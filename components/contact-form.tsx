"use client";
import { useEffect, useState, useRef, type FormEvent } from "react";
import { parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js/min";
import { countries } from "@/lib/countries";
import { inquirySchema } from "@/lib/inquiry-schema";
import { createRequestId } from "@/lib/request-id";
import { projectEmail, type InquiryEmail } from "@/lib/inquiry-email";
import { EMAIL, WHATSAPP_URL, serviceCatalog } from "@/lib/content";
import { Arrow } from "./icons";

type Delivery = { emailReady: boolean; csrf?: string };
type Draft = ReturnType<typeof projectEmail>;
const countryOptions = countries.map(item => <option key={item.code} value={item.code}>{item.name}</option>);
const callingCodeOptions = countries.map(item => <option key={item.code} value={item.code}>+{item.callingCode} {item.code}</option>);

export function ContactForm() {
  const [delivery, setDelivery] = useState<Delivery>({ emailReady: false });
  const [draft, setDraft] = useState<Draft | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [country, setCountry] = useState("");
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>("US");
  const [messageLength, setMessageLength] = useState(0);
  const lastPayload = useRef("");
  const requestId = useRef("");
  const result = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);
  const alive = useRef(false);

  useEffect(() => {
    alive.current = true;
    requestId.current = createRequestId();
    const requestedService = new URLSearchParams(location.search).get("service");
    setSelectedService(serviceCatalog.find(item => item.title === requestedService)?.title ?? "");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    fetch("/api/inquiry", { cache: "no-store", signal: controller.signal })
      .then(async response => { if (!response.ok) throw Error(); return response.json() as Promise<Delivery>; })
      .then(data => { if (alive.current) setDelivery(data); })
      .catch(() => { /* The complete email draft is available even without the backend. */ })
      .finally(() => { clearTimeout(timeout); if (alive.current) setLoading(false); });
    return () => { alive.current = false; clearTimeout(timeout); controller.abort(); request.current?.abort(); };
  }, []);

  useEffect(() => {
    if (!draft && !success && !notice) return;
    const element = result.current;
    if (!element) return;
    element.focus({ preventScroll: true });
    element.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  }, [draft, success, notice]);

  function prepareDraft(data: InquiryEmail, open = false) {
    const links = projectEmail(data, EMAIL, selectedService);
    setDraft(links);
    // Keep this synchronous with the visitor's submit gesture. Never auto-send.
    if (open) window.location.assign(links.mailto);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const previewOnly = (event.nativeEvent as SubmitEvent).submitter?.getAttribute("value") === "preview";
    const form = new FormData(event.currentTarget);
    const phone = parsePhoneNumberFromString(String(form.get("phone") ?? ""), phoneCountry)?.number ?? "";
    const parsed = inquirySchema.safeParse({ name: form.get("name"), country, phone, email: form.get("email"), message: form.get("message"), website: form.get("website") ?? "", requestId: requestId.current || createRequestId() });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message;
      setErrors(fieldErrors);
      document.getElementById(`inquiry-${Object.keys(fieldErrors)[0]}`)?.focus();
      return;
    }
    const fingerprint = JSON.stringify([parsed.data.name, parsed.data.country, parsed.data.phone, parsed.data.email, parsed.data.message, selectedService]);
    if (lastPayload.current && lastPayload.current !== fingerprint) parsed.data.requestId = createRequestId();
    requestId.current = parsed.data.requestId;
    lastPayload.current = fingerprint;
    setErrors({}); setNotice(""); setDraft(null);
    if (previewOnly || !delivery.emailReady) { prepareDraft(parsed.data, !previewOnly); return; }
    setSending(true);
    const controller = new AbortController();
    request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST", headers: { "Content-Type": "application/json", "X-CSRF-Token": delivery.csrf ?? "" },
        body: JSON.stringify({ ...parsed.data, message: selectedService ? `[Service: ${selectedService}]\n\n${parsed.data.message}` : parsed.data.message }),
        signal: controller.signal,
      });
      const data = await response.json() as { accepted?: boolean; error?: string };
      if (!response.ok || data.accepted !== true) throw new Error(data.error ?? "We couldn’t confirm your inquiry. Please try again or use the email below.");
      if (alive.current) setSuccess(true);
    } catch (error) {
      if (!alive.current) return;
      setNotice(error instanceof Error && error.name !== "AbortError" ? error.message : "The connection took too long. Your details are safe below; send them from your email app.");
      prepareDraft(parsed.data);
    } finally { clearTimeout(timeout); if (alive.current) setSending(false); }
  }

  return <div className={`contact-form-panel depth-panel${success ? " has-result" : ""}`}>
    <div className="form-heading"><span className="eyebrow"><span className="status-dot" /> A GOOD IDEA STARTS HERE</span><span className="form-heading-mark" aria-hidden="true">↗</span></div>
    <h2>Let’s start something<span>.</span></h2>
    <p className="form-intro">A little about you. A little about your idea.<br />The beginning of something different.</p>
    {selectedService && <p className="selected-service">Your project / <strong>{selectedService}</strong></p>}
    {(draft || success || notice) && <div ref={result} className={`inquiry-result${success ? " is-accepted" : ""}`} role="status" aria-live="polite" aria-atomic="true" tabIndex={-1}>
      <span className="inquiry-result-icon" aria-hidden="true">{success ? "✓" : "↗"}</span>
      <span className="eyebrow">{success ? "THE NEXT CHAPTER STARTS HERE" : "ONE LAST LITTLE STEP"}</span>
      <h3>{success ? "A good beginning." : "Your idea is ready to go."}</h3>
      <p>{success ? "Our email service has accepted your inquiry for processing. We’ll review your idea and continue the conversation by email." : "Your project email is ready. Review it in your email app and press Send. We’d love to hear what you have in mind."}</p>
      {notice && <p className="inquiry-result-notice">{notice}</p>}
      {draft && <div className="inquiry-result-actions"><a className="button button-primary" href={draft.mailto}>Open email app <Arrow /></a><a className="inquiry-gmail-link" href={draft.gmail} target="_blank" rel="noopener noreferrer">Open in Gmail <Arrow /></a></div>}
      {success && <a className="text-link" href="/work">Explore our work <Arrow /></a>}
      {!success && <span className="inquiry-result-recipient">To {EMAIL}</span>}
    </div>}
    {!success && <form onSubmit={submit} noValidate aria-busy={sending}>
      <div className="form-section-label"><span>01 / YOUR DETAILS</span><span>LET’S GET ACQUAINTED</span></div>
      <fieldset disabled={sending} className="form-fields">
        <legend className="sr-only">Your project inquiry</legend>
        <div className="form-field"><label htmlFor="inquiry-name">Full name<span>*</span></label><input id="inquiry-name" name="name" autoComplete="name" placeholder="Your full name" maxLength={100} required aria-invalid={!!errors.name} aria-describedby={errors.name ? "error-name" : undefined} />{errors.name && <span id="error-name" className="field-error">{errors.name}</span>}</div>
        <div className="form-field"><label htmlFor="inquiry-country">Country<span>*</span></label><select id="inquiry-country" name="country" autoComplete="country" value={country} onChange={event => { setCountry(event.target.value); if (event.target.value) setPhoneCountry(event.target.value as CountryCode); }} required aria-invalid={!!errors.country} aria-describedby={errors.country ? "error-country" : undefined}><option value="">Select your country</option>{countryOptions}</select>{errors.country && <span id="error-country" className="field-error">{errors.country}</span>}</div>
        <div className="form-field full"><label htmlFor="inquiry-phone">Phone number<span>*</span></label><div className="phone-group"><select value={phoneCountry} onChange={event => setPhoneCountry(event.target.value as CountryCode)} aria-label="International calling code">{callingCodeOptions}</select><input id="inquiry-phone" type="tel" name="phone" autoComplete="tel-national" placeholder="Your phone number" required aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "error-phone" : undefined} maxLength={25} /></div>{errors.phone && <span id="error-phone" className="field-error">{errors.phone}</span>}</div>
        <div className="form-field full"><label htmlFor="inquiry-email">Email address<span>*</span></label><input id="inquiry-email" name="email" type="email" autoComplete="email" maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? "error-email" : undefined} placeholder="you@example.com" required />{errors.email && <span id="error-email" className="field-error">{errors.email}</span>}</div>
        <div className="form-field full"><div className="form-section-label"><span>02 / YOUR IDEA</span><span>EVERY DETAIL HELPS</span></div><label htmlFor="inquiry-message">Tell us about your project<span>*</span></label><textarea id="inquiry-message" name="message" placeholder="The idea, the audience, the possibilities. What would you love to create?" minLength={20} maxLength={4900} required onChange={event => setMessageLength(event.target.value.length)} aria-invalid={!!errors.message} aria-describedby={errors.message ? "error-message" : "message-hint"} />{errors.message && <span id="error-message" className="field-error">{errors.message}</span>}<div className="message-hint" id="message-hint"><span>A little context goes a long way. At least 20 characters.</span><span>{messageLength.toLocaleString("en-GB")} / 4,900</span></div></div>
        <div className="honeypot" aria-hidden="true"><label htmlFor="inquiry-website">Leave this field empty</label><input id="inquiry-website" name="website" tabIndex={-1} autoComplete="off" /></div>
      </fieldset>
      <p className="form-privacy">Your details stay between us. <a href="/privacy">Privacy notice</a> · * Required fields.</p>
      <button className="button button-primary submit-button" type="submit" disabled={sending} aria-busy={sending}>{sending ? "Sending your idea…" : delivery.emailReady ? "Send project inquiry" : "Let’s talk — open email"}<Arrow /></button>
      {!delivery.emailReady && <button className="form-preview-email" type="submit" value="preview" disabled={sending}>Preview email first <Arrow /></button>}
      <p className="inquiry-delivery-note">{loading ? "You can fill in your details while we prepare your inquiry." : delivery.emailReady ? "Straight to our team. We’ll reply to your email." : "Opens a ready-to-send email. Review it, then press Send in your email app."}</p>
      <a className="form-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Prefer a quick hello? Chat on WhatsApp <Arrow /></a>
    </form>}
  </div>;
}
