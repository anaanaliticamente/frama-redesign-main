import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

interface Location {
  name: string;
  slug: string;
}

interface ServiceLocationBannerProps {
  locations: Location[];
}

const defaultLocations: Location[] = [
  { name: "Madrid", slug: "madrid" },
  { name: "Toledo", slug: "toledo" },
  { name: "Ávila", slug: "avila" },
  { name: "Guadalajara", slug: "guadalajara" },
  { name: "Segovia", slug: "segovia" },
  { name: "Cuenca", slug: "cuenca" },
];

const ServiceLocationBanner = ({ locations = defaultLocations }: ServiceLocationBannerProps) => (
  <div className="not-prose my-16 bg-accent/50 border border-border rounded-2xl p-8 md:p-10">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
        <MapPin className="w-5 h-5 text-primary" />
      </div>
      <div>
        <h3 className="font-display text-lg text-foreground tracking-tight">Zonas de trabajo</h3>
        <p className="text-xs text-muted-foreground">Prestamos servicio en las siguientes provincias</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2">
      {locations.map((loc) => (
        <Link
          key={loc.slug}
          to={`/localidades/${loc.slug}`}
          className="group inline-flex items-center gap-2 bg-background border border-border rounded-xl px-4 py-2.5 hover:border-primary/40 hover:shadow-sm transition-all duration-300"
        >
          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{loc.name}</span>
          <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
        </Link>
      ))}
    </div>
  </div>
);

export { defaultLocations };
export default ServiceLocationBanner;
