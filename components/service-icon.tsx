import type { ReactNode } from "react";
export function ServiceIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    chat: <><path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-2 2V11.5A8.5 8.5 0 0 1 10.5 3h2a8.5 8.5 0 0 1 8.5 8.5Z" /><path d="M7 9h9M7 13h6" /></>,
    app: <><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M8 4v5m0 4h3m-3 3h7" /></>,
    shop: <><path d="m5 8-2 5v7h18v-7l-2-5ZM7 8V6a5 5 0 0 1 10 0v2M9 20v-6h6v6M3 13h18" /></>,
    web: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="m6 9 2 8 4-8 2 8 4-8" /></>,
    code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16" />,
    layers: <path d="m12 3 10 5-10 5L2 8Zm-9 9 9 5 9-5M3 17l9 5 9-5" />,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></>,
    automation: <><circle cx="5" cy="5" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="12" cy="19" r="2" /><path d="M7 5h10M5 7v5h7m7-5v5h-7v5" /></>,
    design: <><path d="m15 3 6 6-9 9-8 2 2-8ZM6 12l6 6m3-15-3 9 9-3" /><circle cx="12" cy="12" r="1" /></>,
    video: <><rect x="2" y="5" width="15" height="14" rx="3" /><path d="m17 10 5-3v10l-5-3ZM8 9l4 3-4 3Z" /></>,
    spark: <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5ZM20 2v4m-2-2h4" />,
    growth: <path d="M4 20h16M6 16v-4m6 4V9m6 7V5M4 8l6-4 4 1 6-3" />,
  };
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.app}</svg>;
}
