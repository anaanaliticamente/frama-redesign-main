import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Retirada de Uralita en Tejados y Cubiertas",
    desc: "Ofrecemos un servicio integral de retirada de placas de amianto. FRAMA es una empresa dedicada a la retirada de amianto, inscrita en el RERA, con gestion completa desde la inspeccion hasta el vertedero autorizado.",
    href: "/servicios/retirada-uralita-tejados",
    image: "/images/blog/retirada-uralita.jpg",
    tag: "Tejados",
  },
  {
    title: "Retirada de Chimeneas de Amianto",
    desc: "Realizamos retirada segura y certificada de chimeneas de fibrocemento. Nuestro equipo profesional garantiza el cumplimiento de toda la normativa vigente en materia de residuos peligrosos.",
    href: "/servicios/retirada-chimeneas-amianto",
    image: "/images/blog/mantenimiento-tejado.jpg",
    tag: "Chimeneas",
  },
  {
    title: "Retirada de Bajantes y Tuberias de Microcemento",
    desc: "FRAMA es una empresa dedicada a la retirada de amianto en bajantes y tuberias. Servicio integral que incluye inspeccion, extraccion segura, transporte y deposito en vertedero autorizado.",
    href: "/servicios/retirada-bajantes-tuberias",
    image: "/images/blog/comunidades-vecinos.jpg",
    tag: "Bajantes",
  },
];

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="servicios" ref={ref} className="py-20 md:py-28 bg-brand-dark relative overflow-hidden">
      <div className="absolute top-20 left-0 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div>
            <span className="inline-block bg-primary/15 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
              Servicios
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-brand-dark-foreground max-w-lg">
              Soluciones de retirada de <span className="text-primary">amianto</span>
            </h2>
          </div>
          <p className="text-brand-dark-foreground/40 max-w-md text-sm md:text-base md:text-right">
            Servicio integral para viviendas, naves industriales y comunidades de vecinos.
          </p>
        </div>

        {/* Mobile: horizontal scroll / Desktop: grid */}
        <div className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {services.map((service, i) => (
            <Link
              to={service.href}
              key={service.title}
              className={`group flex flex-col min-w-[80vw] sm:min-w-[60vw] md:min-w-0 snap-start bg-brand-dark-foreground/5 border border-brand-dark-foreground/10 rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:border-primary/30 hover:-translate-y-1 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />
                <span className="absolute top-4 left-4 bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  {service.tag}
                </span>
              </div>

              <div className="flex flex-col flex-1 p-5 sm:p-8">
                <h3 className="font-display text-lg sm:text-xl text-brand-dark-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                  {service.title}
                </h3>
                <p className="text-brand-dark-foreground/40 text-sm leading-relaxed flex-1">
                  {service.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all mt-6">
                  Ver servicio
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
