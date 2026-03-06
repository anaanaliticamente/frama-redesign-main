import { Phone, ArrowDown, ShieldCheck, FileCheck, Users } from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, label: "RERA N. 2800907", sub: "Empresa autorizada" },
  { icon: FileCheck, label: "300.000 EUR", sub: "Seguro R.C." },
  { icon: Users, label: "Desde 2015", sub: "Equipo certificado" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background - urgente-bg for a different look */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/images/hero-bg.webp')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/95 via-brand-dark/70 to-brand-dark/95" />

      {/* Content */}
      <div className="flex-1 flex items-center relative z-10 pt-20 pb-16 sm:pt-24 sm:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-10 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-bold tracking-widest uppercase">
                Lideres en retirada de amianto
              </span>
            </div>

            <h1
              className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-brand-dark-foreground leading-[0.9] mb-6 sm:mb-8 opacity-0 animate-fade-up tracking-tight"
              style={{ animationDelay: "0.2s" }}
            >
              Retirada de{" "}
              <span className="relative inline-block">
                <span className="text-primary">Amianto</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/40 rounded-full" />
              </span>
              <br />
              <span className="text-brand-dark-foreground/60 text-3xl sm:text-4xl md:text-6xl lg:text-7xl">100% segura y legal</span>
            </h1>

            <p
              className="text-base sm:text-lg md:text-xl text-brand-dark-foreground/50 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed opacity-0 animate-fade-up px-2 sm:px-0"
              style={{ animationDelay: "0.35s" }}
            >
              Especialistas en retirada de uralita, chimeneas y tuberias de fibrocemento.
              Servicio certificado con gestion integral de residuos peligrosos.
            </p>

            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              <a
                href="#presupuesto"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-2xl text-base font-bold hover:brightness-110 transition-all hover:shadow-[0_0_40px_hsl(0,75%,50%,0.25)] hover:-translate-y-0.5"
              >
                Presupuesto gratuito
              </a>
              <a
                href="tel:+34614681331"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-dark-foreground/10 backdrop-blur text-brand-dark-foreground px-10 py-4 rounded-2xl text-base font-bold border border-brand-dark-foreground/15 hover:bg-brand-dark-foreground/20 transition-all hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5" />
                614 681 331
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar at bottom */}
      <div className="relative z-10 pb-8">
        <div className="container mx-auto px-4">
          <div
            className="grid grid-cols-3 gap-3 max-w-2xl mx-auto opacity-0 animate-fade-up"
            style={{ animationDelay: "0.7s" }}
          >
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center text-center bg-brand-dark-foreground/5 backdrop-blur-sm border border-brand-dark-foreground/10 rounded-2xl px-3 py-4 sm:px-6 sm:py-5"
              >
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary mb-2" />
                <p className="text-brand-dark-foreground text-xs sm:text-sm font-bold leading-tight">{item.label}</p>
                <p className="text-brand-dark-foreground/40 text-[10px] sm:text-xs mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-10 opacity-0 animate-fade-in hidden md:flex" style={{ animationDelay: "1.2s" }}>
        <a href="#sobre-nosotros" className="flex flex-col items-center gap-2 text-brand-dark-foreground/30 hover:text-primary transition-colors">
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
