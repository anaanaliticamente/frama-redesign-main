import { Link } from "react-router-dom";
import { Shield, Clock, Award, Wrench, Phone, CheckCircle, MapPin, ArrowRight, FileText, Truck, HardHat } from "lucide-react";

interface LocalidadPageProps {
  nombre: string;
  img: string;
  municipios?: string[];
}

const localidades: Record<string, LocalidadPageProps> = {
  madrid: {
    nombre: "Madrid",
    img: "/images/madrid.webp",
    municipios: [
      "Móstoles", "Alcalá De Henares", "Leganés", "Fuenlabrada", "Getafe",
      "Alcorcón", "Torrejón De Ardoz", "Parla", "Alcobendas", "Aranjuez",
      "Boadilla Del Monte", "Coslada", "Humanes De Madrid", "Las Rozas Madrid"
    ],
  },
  toledo: {
    nombre: "Toledo",
    img: "/images/toledo.webp",
    municipios: ["Talavera De La Reina", "Illescas"],
  },
  guadalajara: { nombre: "Guadalajara", img: "/images/guadalajara.webp" },
  avila: { nombre: "Ávila", img: "/images/avila.webp" },
  segovia: { nombre: "Segovia", img: "/images/segovia.webp" },
  cuenca: { nombre: "Cuenca", img: "/images/cadiz.webp" },
};

const serviceIcons = [FileText, Truck, HardHat];

const localidadContent = (nombre: string, municipios?: string[]) => (
  <>
    {/* Stats banner */}
    <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
      {[
        { icon: Clock, label: "Años de experiencia", value: "+10" },
        { icon: Award, label: "Proyectos realizados", value: "+500" },
        { icon: Shield, label: "Seguro RC", value: "300K€" },
        { icon: Wrench, label: "Respuesta", value: "24h" },
      ].map((stat) => (
        <div key={stat.label} className="relative bg-card border border-border rounded-2xl p-4 sm:p-6 text-center overflow-hidden group hover:border-primary/40 transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary mx-auto mb-2 sm:mb-3" />
          <p className="font-display text-2xl sm:text-3xl text-foreground tracking-tight">{stat.value}</p>
          <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 tracking-wide uppercase">{stat.label}</p>
        </div>
      ))}
    </div>

    <h2>Retirada de Amianto en {nombre}</h2>
    <p>
      <strong>FRAMA</strong> es una <strong>empresa autorizada para la retirada de amianto</strong> en {nombre}. Inscrita en el RERA con autorización N. 2800907 y NIMA N. 2800136268, realizamos la retirada segura y certificada de todo tipo de materiales con amianto.
    </p>
    <p>
      Contamos con un equipo profesional certificado en prevención de riesgos laborales y un seguro de Responsabilidad Civil de 300.000 euros. Nos encargamos de todo el proceso: desde la inspección inicial hasta la entrega del certificado de eliminación del residuo.
    </p>

    {/* CTA banner */}
    <div className="not-prose relative bg-brand-dark rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 my-12 sm:my-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10 text-center">
        <span className="inline-block text-primary text-xs font-bold tracking-[0.2em] uppercase mb-4">Presupuesto gratuito</span>
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-brand-dark-foreground mb-4 tracking-tight">
          ¿Necesitas retirar amianto en {nombre}?
        </h3>
        <p className="text-brand-dark-foreground/50 mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
          Solicita tu presupuesto sin compromiso. Te respondemos en menos de 24 horas.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:+34614681331"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 w-full sm:w-auto"
          >
            <Phone className="w-4 h-4" />
            Llamar ahora
          </a>
          <a
            href="#presupuesto"
            className="inline-flex items-center justify-center gap-2 bg-brand-dark-foreground/10 text-brand-dark-foreground px-7 py-3.5 rounded-xl font-bold border border-brand-dark-foreground/20 hover:bg-brand-dark-foreground/20 transition-all w-full sm:w-auto"
          >
            Solicitar Presupuesto
          </a>
        </div>
      </div>
    </div>

    {/* Service cards */}
    <div className="not-prose my-16">
      <div className="text-center mb-10">
        <span className="inline-block text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">Lo que hacemos</span>
        <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">Servicios en {nombre}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            title: "Retirada de Uralita",
            desc: "Desmontaje seguro de placas de fibrocemento en tejados y cubiertas, con transporte a vertedero autorizado.",
            link: "/servicios/retirada-uralita-tejados",
          },
          {
            title: "Retirada de Chimeneas",
            desc: "Retirada certificada de chimeneas de fibrocemento que contienen amianto, con todos los protocolos de seguridad.",
            link: "/servicios/retirada-chimeneas-amianto",
          },
          {
            title: "Retirada de Bajantes",
            desc: "Extracción segura de bajantes y tuberías de microcemento con amianto en edificios y comunidades.",
            link: "/servicios/retirada-bajantes-tuberias",
          },
        ].map((service, i) => {
          const Icon = serviceIcons[i];
          return (
            <Link
              key={service.title}
              to={service.link}
              className="group relative bg-card border border-border rounded-2xl p-5 sm:p-7 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display text-lg text-foreground group-hover:text-primary transition-colors mb-2 tracking-tight">
                  {service.title} en {nombre}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary tracking-wide uppercase group-hover:gap-3 transition-all">
                  Ver más <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>

    <h2>Empresa autorizada RERA en {nombre}</h2>
    <p>
      FRAMA es una empresa inscrita en el Registro de Empresas con Riesgo de Amianto (RERA), lo que nos habilita legalmente para realizar trabajos de retirada de materiales que contienen amianto en {nombre} y alrededores.
    </p>
    <p>
      Nos encargamos de la tramitación completa de la documentación necesaria ante las autoridades laborales y medioambientales, incluyendo el plan de trabajo, la comunicación de apertura del centro de trabajo y la gestión del residuo peligroso.
    </p>

    {/* Checklist */}
    <div className="not-prose relative bg-accent/60 border border-primary/15 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-12 my-12 sm:my-16 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary/40 via-primary to-primary/40" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/4" />
      <div className="relative z-10">
        <div className="text-center mb-8">
          <span className="inline-block text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">Nuestro servicio incluye</span>
          <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-tight">
            Retirada de amianto en {nombre}
          </h3>
          <p className="text-sm text-muted-foreground mt-3">
            Servicio integral para <strong className="text-foreground font-semibold">Particulares, Comunidades y Empresas</strong>.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            `Retirada de placas de uralita y fibrocemento en ${nombre}.`,
            "Inspección técnica y evaluación del estado del material.",
            "Elaboración del plan de trabajo conforme a normativa vigente.",
            "Tramitación de permisos ante autoridades laborales.",
            "Desmontaje con equipos de protección individual (EPI) homologados.",
            "Embalaje, etiquetado y transporte como residuo peligroso.",
            "Depósito en vertedero autorizado.",
            "Entrega de certificado de gestión de residuos.",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 bg-background/70 backdrop-blur-sm rounded-xl p-4 border border-border/50">
              <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Municipios section */}
    {municipios && municipios.length > 0 && (
      <div className="not-prose my-16">
        <div className="text-center mb-10">
          <span className="inline-block text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Zonas de trabajo
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-tight mb-3">
            También trabajamos en
          </h2>
          <p className="text-muted-foreground text-sm">
            Damos cobertura a los principales municipios de {nombre}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {municipios.map((mun) => (
            <div
              key={mun}
              className="flex items-center gap-2 sm:gap-3 bg-card border border-border rounded-xl p-3 sm:p-4 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 w-[calc(50%-0.375rem)] md:w-[calc(33.333%-0.5rem)]"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">{mun}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Nuestros servicios */}
    <div className="not-prose my-16">
      <div className="text-center mb-10">
        <span className="inline-block text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">Explora</span>
        <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">Nuestros servicios</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { label: "Retirada de uralita en tejados", link: "/servicios/retirada-uralita-tejados" },
          { label: "Retirada de chimeneas de amianto", link: "/servicios/retirada-chimeneas-amianto" },
          { label: "Retirada de bajantes y tuberías", link: "/servicios/retirada-bajantes-tuberias" },
        ].map((s) => (
          <Link
            key={s.label}
            to={s.link}
            className="group flex items-center justify-between gap-3 bg-card border border-border rounded-xl px-5 py-4 hover:border-primary/40 hover:bg-accent/50 transition-all duration-300"
          >
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{s.label}</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  </>
);

export { localidades, localidadContent };
export type { LocalidadPageProps };
