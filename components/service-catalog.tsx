import { ServiceFlights } from "./service-flights";
import { servicePages } from "@/lib/service-pages";
export function ServiceCatalog() {
  const items = servicePages.map(({ title, category, icon, description, slug }) => ({ title, category, icon, description, slug }));
  return <ServiceFlights filters detailed items={items} />;
}
