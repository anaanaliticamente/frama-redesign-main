import { Phone, Mail, Clock, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const provinces = [
  { name: "Madrid", slug: "madrid" },
  { name: "Toledo", slug: "toledo" },
  { name: "Avila", slug: "avila" },
  { name: "Guadalajara", slug: "guadalajara" },
  { name: "Segovia", slug: "segovia" },
  { name: "Cuenca", slug: "cuenca" },
];

const services = [
  { label: "Retirada de Uralita en Tejados", href: "/servicios/retirada-uralita-tejados" },
  { label: "Retirada de Chimeneas", href: "/servicios/retirada-chimeneas-amianto" },
  { label: "Retirada de Bajantes", href: "/servicios/retirada-bajantes-tuberias" },
];

const Footer = () => {
  return (
    <footer className="bg-brand-dark border-t border-brand-dark-foreground/5">
      {/* CTA banner */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-12 sm:-mt-16 mb-12 sm:mb-16 bg-primary rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 shadow-xl shadow-primary/20 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 text-center md:text-left">
            <h3 className="font-display text-2xl md:text-3xl text-primary-foreground mb-2">
              Necesitas retirar amianto?
            </h3>
            <p className="text-primary-foreground/70 text-sm md:text-base">
              Presupuesto gratuito y sin compromiso. Respuesta en 24h.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="tel:+34614681331"
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-primary px-6 py-3.5 rounded-xl font-bold hover:brightness-95 transition-all text-sm w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" />
              614 681 331
            </a>
            <a
              href="#presupuesto"
              className="inline-flex items-center justify-center gap-2 bg-primary-foreground/10 text-primary-foreground px-6 py-3.5 rounded-xl font-bold border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all text-sm w-full sm:w-auto"
            >
              Presupuesto online
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img src="/images/logo-frama-white.png" alt="FRAMA - Retirada de Amianto" className="h-14 mb-5" />
            <p className="text-brand-dark-foreground/40 text-sm leading-relaxed mb-5">
              Lideres en retirada y gestion de amianto. 100% seguro, legal y certificado.
            </p>
            <div className="inline-flex items-center gap-2 bg-brand-dark-foreground/5 rounded-xl px-3 py-2 border border-brand-dark-foreground/10">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span className="text-brand-dark-foreground/50 text-xs">L-V: 08:00 - 17:00</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-brand-dark-foreground font-semibold text-xs tracking-widest uppercase mb-5">
              Servicios
            </h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link to={s.href} className="text-brand-dark-foreground/40 text-sm hover:text-primary transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coverage */}
          <div>
            <h4 className="text-brand-dark-foreground font-semibold text-xs tracking-widest uppercase mb-5">
              Cobertura
            </h4>
            <ul className="space-y-2">
              {provinces.map((prov) => (
                <li key={prov.slug}>
                  <Link to={`/localidades/${prov.slug}`} className="text-brand-dark-foreground/40 text-sm hover:text-primary transition-colors inline-flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-primary/40" />
                    {prov.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-brand-dark-foreground font-semibold text-xs tracking-widest uppercase mb-5">
              Contacto
            </h4>
            <div className="space-y-3 mb-6">
              <a href="tel:+34614681331" className="flex items-center gap-2.5 text-brand-dark-foreground/50 hover:text-primary transition-colors text-sm">
                <Phone className="w-4 h-4 text-primary/60" />
                +34 614 681 331
              </a>
              <a href="mailto:info.noamianto@gmail.com" className="flex items-center gap-2.5 text-brand-dark-foreground/50 hover:text-primary transition-colors text-sm">
                <Mail className="w-4 h-4 text-primary/60" />
                info.noamianto@gmail.com
              </a>
            </div>
            <div className="bg-brand-dark-foreground/5 border border-brand-dark-foreground/10 rounded-xl p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-brand-dark-foreground/30 text-[10px] uppercase tracking-wider">RERA</span>
                <span className="text-primary text-xs font-bold">2800907</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-brand-dark-foreground/30 text-[10px] uppercase tracking-wider">NIMA</span>
                <span className="text-primary text-xs font-bold">2800136268</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-dark-foreground/5">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-brand-dark-foreground/20 text-xs">
            FRAMA 2026 - Retirada y Gestion de Amianto
          </p>
          <p className="text-brand-dark-foreground/20 text-xs">
            noamianto.es
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
