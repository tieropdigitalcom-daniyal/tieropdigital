export type InquiryEmail = { name: string; country: string; phone: string; email: string; message: string };

export function projectEmail(data: InquiryEmail, recipient: string, service = "") {
  const country = new Intl.DisplayNames(["en"], { type: "region" }).of(data.country) ?? data.country;
  const subject = `Project inquiry — ${data.name}${service ? ` / ${service}` : ""}`;
  const body = [
    "Hello TIEROP DIGITAL,", "", "I’d love to discuss a new project.", "",
    `Name: ${data.name}`, `Email: ${data.email}`, `Country: ${country}`, `Phone: ${data.phone}`,
    ...(service ? [`Service: ${service}`] : []), "", "Project details:", data.message,
    "", `Best regards,`, data.name,
  ].join("\n");
  return {
    mailto: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}
