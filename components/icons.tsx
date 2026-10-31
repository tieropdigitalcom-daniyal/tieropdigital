export function Arrow({ diagonal = true, className = "" }: { diagonal?: boolean; className?: string }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function Spark({ className = "" }: { className?: string }) {
  return <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 0v32M0 16h32M4.686 4.686l22.628 22.628M4.686 27.314 27.314 4.686" stroke="currentColor" strokeWidth="2" /></svg>;
}

export function WhatsApp() {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z" /><path d="M8 7.5c.4-.4 1.1-.3 1.3.2l.7 1.6c.2.4.1.7-.2 1l-.5.5a7.3 7.3 0 0 0 3.5 3.2l.5-.7c.3-.3.6-.4 1-.2l1.5.7c.5.2.6.7.3 1.2-.7 1.4-2.1 1.5-3.7.8-2.5-1-4.5-3-5.4-5.5-.5-1.2-.2-2.2 1-2.8Z" /></svg>;
}
