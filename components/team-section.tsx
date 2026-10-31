import Link from "next/link";
import { team } from "@/lib/team";
import { SITE_URL } from "@/lib/content";
import { Arrow } from "./icons";
import { StructuredData } from "./structured-data";

export function TeamSection({ standalone = false }: { standalone?: boolean }) {
  return <section className={`team-section section shell ${standalone ? "team-section-full" : ""}`} id="team" aria-labelledby="team-heading">
    {!standalone && <><div className="section-label"><span className="eyebrow">THE PEOPLE BEHIND THE POSSIBILITIES</span><Link prefetch={false} href="/team" className="text-link">Meet our team <Arrow /></Link></div><div className="team-intro"><h2 id="team-heading">Different strengths.<br /><span className="muted">One shared direction.</span></h2><p>Business thinking, technical craft and thoughtful delivery. Meet the people bringing it together.</p></div></>}
    <div className="team-grid">{team.map((person, index) => <article className="team-card" key={person.slug} id={person.slug}>
      <div className="team-portrait"><img src={person.image} alt={`${person.name}, ${person.role} at Tierop Digital`} width="768" height="960" loading="lazy" decoding="async" /><span className="team-portrait-index mono">0{index + 1} / TIEROP</span></div>
      <div className="team-card-body"><span className="eyebrow team-focus">{person.focus}</span><h3>{person.name}</h3><p className="team-role">{person.role}</p><p className="team-bio">{person.bio}</p><a className="team-email" href={`mailto:${person.email}`}>{person.email}<Arrow /></a></div>
    </article>)}</div>
    <StructuredData data={{ "@context": "https://schema.org", "@graph": team.map(person => ({ "@type": "Person", "@id": `${SITE_URL}/team#${person.slug}`, name: person.name, jobTitle: person.role, email: person.email, image: `${SITE_URL}${person.image}`, url: `${SITE_URL}/team#${person.slug}`, worksFor: { "@id": `${SITE_URL}/#organization` } })) }} />
  </section>;
}
