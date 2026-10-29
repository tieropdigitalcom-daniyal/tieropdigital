"use client";
import { useEffect, useState, useRef, type FormEvent } from "react";
import { getCountries, getCountryCallingCode, parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js/min";
import { inquirySchema } from "@/lib/inquiry-schema";
import { createRequestId } from "@/lib/request-id";
import { EMAIL, serviceCatalog } from "@/lib/content";
import { Arrow } from "./icons";
type Delivery = { emailReady: boolean; csrf?: string };
const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const countries = getCountries().map(code => ({ code, name: countryNames.of(code) ?? code })).sort((a, b) => a.name.localeCompare(b.name));
export function ContactForm() {
  const [delivery, setDelivery] = useState<Delivery>({ emailReady: false });
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(true); const [sending, setSending] = useState(false); const [success, setSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [notice, setNotice] = useState(""); const [errors, setErrors] = useState<Record<string, string>>({});
  const lastPayload = useRef("");
  const [country, setCountry] = useState(""); const [phoneCountry, setPhoneCountry] = useState<CountryCode>("US"); const [requestId, setRequestId] = useState("");
  useEffect(() => {
    setRequestId(createRequestId());
    const requestedService = new URLSearchParams(location.search).get("service");
    setSelectedService(serviceCatalog.find(item => item.title === requestedService)?.title ?? "");
    
    let active = true;
    fetch("/api/inquiry", { cache: "no-store", signal: AbortSignal.timeout(10000) }).then(async r => { if (!r.ok) throw Error(); return r.json() as Promise<Delivery>; }).then(data => { if (active) setDelivery(data); }).catch(() => { if (active) setNotice("You can prepare your inquiry below and send it using your email app."); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const enabled = !loading;
  function prepareDraft(data: { name: string; country: string; phone: string; email: string; message: string }) {
    const subject = `Project inquiry — ${data.name}${selectedService ? ` / ${selectedService}` : ""}`;
    const body = [`Client name: ${data.name}`, `Email: ${data.email}`, `Country: ${countryNames.of(data.country) ?? data.country}`, `Phone: ${data.phone}`, "", "Project details:", data.message].join("\n");
    setDraft(`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!enabled || sending) return;
    const form = new FormData(event.currentTarget);
    const phone = parsePhoneNumberFromString(String(form.get("phone") ?? ""), phoneCountry)?.number ?? "";
    const parsed = inquirySchema.safeParse({ name: form.get("name"), country, phone, email: form.get("email"), message: form.get("message"), website: form.get("website") ?? "", requestId });
    if (!parsed.success) { const fieldErrors: Record<string, string> = {}; for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message; setErrors(fieldErrors); const first = Object.keys(fieldErrors)[0]; document.getElementById(`inquiry-${first}`)?.focus(); return; }
    const fingerprint = JSON.stringify([parsed.data.name, parsed.data.country, parsed.data.phone, parsed.data.email, parsed.data.message]);
    if (lastPayload.current && lastPayload.current !== fingerprint) { parsed.data.requestId = createRequestId(); setRequestId(parsed.data.requestId); }
    lastPayload.current = fingerprint;
    setErrors({}); setNotice(""); setDraft("");
    if (!delivery.emailReady) { prepareDraft(parsed.data); return; }
    setSending(true);
    try {
      const response = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json", "X-CSRF-Token": delivery.csrf ?? "" }, body: JSON.stringify({ ...parsed.data, message: selectedService ? `[Service: ${selectedService}]\n\n${parsed.data.message}` : parsed.data.message }) });
      const data = await response.json() as { accepted?: boolean; error?: string };
      if (!response.ok || data.accepted !== true) throw new Error(data.error ?? "Your inquiry wasn’t accepted. Please try again or email us directly.");
      setSuccess(true);
    } catch (error) { setNotice(error instanceof Error ? error.message : "We couldn’t process your inquiry. Please try again."); prepareDraft(parsed.data); } finally { setSending(false); }
  }
  if (success) return <div className="contact-form-panel success-panel" role="status"><span className="success-check">✓</span><h2>A good beginning.</h2><p>Your inquiry was accepted by our email service for processing. We’ll review your project and continue the conversation by email.</p><a className="button button-outline" href="/work">Explore our work <Arrow /></a></div>;
  return <div className="contact-form-panel depth-panel"><h2>Let’s start something.</h2><p className="form-intro">A little about you. A little about your idea.<br />The beginning of something different.</p>{selectedService && <p className="selected-service">Your project / <strong>{selectedService}</strong></p>}{notice && <p className="form-message" role="alert">{notice} <a href={`mailto:${EMAIL}`}>Email TIEROP DIGITAL ↗</a></p>}{loading ? <div className="inquiry-checking" role="status"><span aria-hidden="true" />Preparing your project inquiry…</div> : <p className="inquiry-delivery-note">{delivery.emailReady ? "Send your idea directly. We’ll reply to the email you enter below." : "Fill in your details to prepare an email. Open your email app, review it and press Send there."}</p>}{draft && <div className="inquiry-draft" role="status"><strong>Your project email is ready.</strong><p>Open it in your email app and press Send to deliver it to our team. Your name and project details are already included.</p><a className="button button-primary" href={draft}>Open email app <Arrow /></a><a className="inquiry-gmail-link" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${draft.split("subject=")[1]?.split("&body=")[0] ?? ""}&body=${draft.split("&body=")[1] ?? ""}`} target="_blank" rel="noopener noreferrer">Prefer Gmail? Open a draft ↗</a></div>}<form onSubmit={submit} noValidate aria-busy={sending}><fieldset disabled={!enabled || sending} className="form-fields"><legend className="sr-only">Your project inquiry</legend><div className="form-field"><label htmlFor="inquiry-name">Full name<span>*</span></label><input id="inquiry-name" name="name" autoComplete="name" placeholder="Your full name" maxLength={100} required aria-invalid={!!errors.name} aria-describedby={errors.name ? "error-name" : undefined} />{errors.name && <span id="error-name" className="field-error">{errors.name}</span>}</div><div className="form-field"><label htmlFor="inquiry-country">Country<span>*</span></label><select id="inquiry-country" name="country" autoComplete="country" value={country} onChange={e => { setCountry(e.target.value); if (e.target.value) setPhoneCountry(e.target.value as CountryCode); }} required aria-invalid={!!errors.country} aria-describedby={errors.country ? "error-country" : undefined}><option value="">Select your country</option>{countries.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}</select>{errors.country && <span id="error-country" className="field-error">{errors.country}</span>}</div><div className="form-field full"><label htmlFor="inquiry-phone">Phone number<span>*</span></label><div className="phone-group"><select value={phoneCountry} onChange={e => setPhoneCountry(e.target.value as CountryCode)} aria-label="International calling code">{countries.map(c => <option key={c.code} value={c.code}>+{getCountryCallingCode(c.code)} {c.code}</option>)}</select><input id="inquiry-phone" type="tel" name="phone" autoComplete="tel-national" placeholder="Your phone number" required aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "error-phone" : undefined} maxLength={25} /></div>{errors.phone && <span id="error-phone" className="field-error">{errors.phone}</span>}</div><div className="form-field full"><label htmlFor="inquiry-email">Email address<span>*</span></label><input id="inquiry-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "error-email" : undefined} placeholder="you@example.com" required />{errors.email && <span id="error-email" className="field-error">{errors.email}</span>}</div><div className="form-field full"><label htmlFor="inquiry-message">Tell us about your project<span>*</span></label><textarea id="inquiry-message" name="message" placeholder="What are you looking to create? Tell us about the idea, the audience and what you have in mind." minLength={20} maxLength={4900} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "error-message" : undefined} />{errors.message && <span id="error-message" className="field-error">{errors.message}</span>}</div><div className="honeypot" aria-hidden="true"><label htmlFor="inquiry-website">Leave this field empty</label><input id="inquiry-website" name="website" tabIndex={-1} autoComplete="off" /></div></fieldset><p className="form-privacy">Your details are used to discuss your project. Read our <a href="/privacy">privacy notice</a>. Fields marked * are required.</p><button className="button button-primary submit-button" type="submit" disabled={!enabled || sending} aria-busy={sending}>{sending ? "Processing your inquiry…" : delivery.emailReady ? "Send project inquiry" : "Prepare project email"}<Arrow /></button></form></div>;
}
