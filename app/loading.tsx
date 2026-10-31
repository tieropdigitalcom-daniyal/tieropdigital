import { Spark } from "@/components/icons";
export default function Loading() {
  return <div id="page-loading" className="route-loading shell" role="status" aria-live="polite"><span className="loading-mark"><Spark /></span><span className="eyebrow">TIEROP DIGITAL</span><p>Bringing ideas into view.</p><span className="loading-track" aria-hidden="true"><span /></span><span className="sr-only">Loading the next page.</span></div>;
}
