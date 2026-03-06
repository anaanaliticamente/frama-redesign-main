import { useEffect, useRef, useState, useCallback } from "react";
import { ShieldCheck, FileCheck, Users, Briefcase, CheckCircle, ArrowRight } from "lucide-react";

const stats = [
  { icon: Briefcase, value: 500, suffix: "+", label: "Proyectos Realizados" },
  { icon: Users, value: 450, suffix: "+", label: "Clientes Satisfechos" },
  { icon: ShieldCheck, value: 35, suffix: "+", label: "Años de Experiencia" },
  { icon: FileCheck, value: 20, suffix: "+", label: "Solicitudes Diarias" },
];

const features = [
  "Empresa autorizada RERA N. 2800907 y NIMA N. 2800136268",
  "Seguro de Responsabilidad Civil de 300.000 euros",
  "Equipo profesional certificado en prevención de riesgos laborales",
  "Gestión integral: inspección, retirada, transporte y vertedero autorizado",
  "Cobertura en Madrid, Toledo, Ávila, Guadalajara, Segovia y Cuenca",
];

const AnimatedCounter = ({ target, suffix, started }: { target: number; suffix: string; started: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return <>{count}{suffix}</>;
};

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="sobre-nosotros" ref={ref} className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/3 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="container mx-auto px-4">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {/* Image side */}
          <div className="relative group">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl shadow-primary/10">
              <img
                src="/images/blog/cubiertas-madrid.jpg"
                alt="Retirada profesional de amianto por FRAMA"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />

              {/* Badge flotante */}
              <div className={`absolute top-5 left-5 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-primary/30">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  Desde 1990
                </div>
              </div>
            </div>

            {/* Floating stats cards */}
            <div ref={statsRef} className="absolute -bottom-8 left-3 right-3 sm:left-5 sm:right-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`relative bg-card/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-4 text-center shadow-xl border border-white/50 overflow-hidden group/stat hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 ${
                      statsVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                    }`}
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover/stat:from-primary/5 group-hover/stat:to-primary/10 transition-all duration-300" />
                    {/* Top accent line */}
                    <div
                      className={`absolute top-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-700 ${
                        statsVisible ? "w-3/4" : "w-0"
                      }`}
                      style={{ transitionDelay: `${600 + i * 150}ms` }}
                    />
                    <div className="relative z-10">
                      <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 text-primary mx-auto mb-1.5 transition-all duration-500 ${statsVisible ? "scale-100" : "scale-0"}`} style={{ transitionDelay: `${400 + i * 150}ms` }} />
                      <p className="font-display text-lg sm:text-2xl md:text-3xl text-foreground tabular-nums">
                        <AnimatedCounter target={stat.value} suffix={stat.suffix} started={statsVisible} />
                      </p>
                      <p className="text-muted-foreground text-[8px] sm:text-[10px] leading-tight mt-0.5 font-medium uppercase tracking-wide">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Text side */}
          <div className="pt-14 sm:pt-12 lg:pt-0">
            <span className={`inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-5 border border-primary/20 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Sobre FRAMA
            </span>
            <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              Líderes en retirada y gestión de <span className="text-primary relative">
                Amianto
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                  <path d="M1 5.5Q50 1 100 5t99-1" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" className={`transition-all duration-1000 delay-700 ${visible ? "[stroke-dashoffset:0]" : "[stroke-dashoffset:300]"}`} strokeDasharray="300" />
                </svg>
              </span>
            </h2>
            <p className={`text-muted-foreground leading-relaxed mb-4 text-base transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              En FRAMA somos líderes en España en retirada de amianto, ofreciendo un servicio 100% seguro, legal y certificado. Desde 1990, nos hemos consolidado como empresa pionera en el sector del desamiantado.
            </p>
            <p className={`text-muted-foreground leading-relaxed mb-8 text-base transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              Contamos con autorización RERA N. 2800907 y NIMA N. 2800136268, además de un seguro de Responsabilidad Civil de 300.000 euros. Nuestro equipo está certificado en prevención de riesgos laborales.
            </p>

            <div className="space-y-3 mb-8">
              {features.map((f, i) => (
                <div
                  key={f}
                  className={`flex items-start gap-3 group/feat transition-all duration-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"}`}
                  style={{ transitionDelay: `${600 + i * 100}ms` }}
                >
                  <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5 group-hover/feat:bg-primary/25 group-hover/feat:scale-110 transition-all duration-300">
                    <CheckCircle className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground/80 group-hover/feat:text-foreground transition-colors duration-300">{f}</span>
                </div>
              ))}
            </div>

            <a
              href="#presupuesto"
              className={`group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-bold hover:brightness-110 transition-all duration-500 hover:shadow-[0_0_30px_hsl(0,75%,50%,0.3)] hover:gap-3 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: "1100ms" }}
            >
              Solicita Presupuesto Gratuito
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
