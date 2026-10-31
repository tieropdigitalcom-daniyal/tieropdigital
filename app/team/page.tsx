import { TeamSection } from "@/components/team-section";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata("Meet the Team", "Meet M Qasim Hassan, Daniyal and Mudassir: the leadership team behind Tierop Digital's business development, technology and operations.", "/team");

export default function TeamPage() {
  return <main id="main"><div className="page-intro shell team-page-intro"><Breadcrumbs items={[{ label: "Our team" }]} /><div className="intro-topline"><span className="eyebrow">TIEROP DIGITAL / OUR PEOPLE</span><span className="mono muted">BUSINESS. TECHNOLOGY. DELIVERY.</span></div><h1 id="team-heading">The people.<br /><span className="muted">Behind the possibilities.</span></h1><p>Different strengths, connected by a shared care for the work and the people we work with.</p></div><TeamSection standalone /></main>;
}
