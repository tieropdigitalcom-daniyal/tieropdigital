import { TeamSection } from "@/components/team-section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("Meet the Team", "Meet Tierop Digital’s founder M Qasim Hassan, CEO Daniyal and head of operations Mudassir. Explore their work in web and game development, business systems and project delivery.", "/team");

export default function TeamPage() {
  return <main id="main"><div className="page-intro shell team-page-intro"><Breadcrumbs items={[{ label: "Our team" }]} /><div className="intro-topline"><span className="eyebrow">TIEROP DIGITAL / OUR PEOPLE</span><span className="mono muted">BUSINESS. TECHNOLOGY. DELIVERY.</span></div><h1 id="team-heading">The people.<br /><span className="muted">Behind the possibilities.</span></h1><p>Meet the people connecting your business goals with technical delivery and day-to-day project coordination.</p></div><TeamSection standalone /></main>;
}
