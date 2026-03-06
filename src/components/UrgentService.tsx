import { useEffect, useRef, useState } from "react";
import { ClipboardCheck, FileCheck, ShieldCheck, Truck } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    num: "01",
    title: "Inspeccion",
    desc: "Evaluamos el estado del material y elaboramos un plan de retirada.",
  },
  {
    icon: FileCheck,
    num: "02",
    title: "Permisos",
    desc: "Gestionamos toda la documentacion ante las autoridades competentes.",
  },
  {
    icon: ShieldCheck,
    num: "03",
    title: "Retirada",
    desc: "Equipo certificado con todos los protocolos de seguridad y EPI.",
  },
  {
    icon: Truck,
    num: "04",
    title: "Eliminacion",
    desc: "Transporte a vertedero autorizado con certificado de gestion.",
  },
];

const UrgentService = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 relative overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/urgente-bg.webp')" }}
      />
      <div className="absolute inset-0 bg-brand-dark/90 backdrop-blur-[2px]" />

      <div className={`container mx-auto px-4 relative z-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="text-center mb-14">
          <span className="inline-block bg-primary/15 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            Nuestro Proceso
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-brand-dark-foreground mb-4">
            Como trabajamos
          </h2>
          <p className="text-brand-dark-foreground/40 text-base max-w-xl mx-auto">
            Proceso profesional de principio a fin para una retirada segura y legal.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`relative text-center transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Number circle */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-brand-dark border-2 border-primary/30 flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-primary/30 text-xs font-bold tracking-widest uppercase mb-2 block">
                  Paso {step.num}
                </span>
                <h3 className="font-display text-lg text-brand-dark-foreground mb-2">{step.title}</h3>
                <p className="text-brand-dark-foreground/40 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgentService;
