import { Phone, ArrowRight } from "lucide-react";

interface ServiceCalloutProps {
  heading: string;
  description: string;
  variant?: "primary" | "dark";
}

const ServiceCallout = ({ heading, description, variant = "dark" }: ServiceCalloutProps) => {
  const isDark = variant === "dark";

  return (
    <div className={`not-prose relative rounded-3xl p-10 md:p-14 my-16 overflow-hidden ${
      isDark ? "bg-brand-dark" : "bg-primary/10 border border-primary/20"
    }`}>
      {/* Decorative corner elements */}
      <div className={`absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 rounded-tl-xl ${
        isDark ? "border-primary/20" : "border-primary/30"
      }`} />
      <div className={`absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 rounded-br-xl ${
        isDark ? "border-primary/20" : "border-primary/30"
      }`} />
      {isDark && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.08),transparent_60%)]" />
      )}

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <h3 className={`font-display text-2xl md:text-3xl mb-4 tracking-tight ${
          isDark ? "text-brand-dark-foreground" : "text-foreground"
        }`}>
          {heading}
        </h3>
        <p className={`mb-8 leading-relaxed ${
          isDark ? "text-brand-dark-foreground/50" : "text-muted-foreground"
        }`}>
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:+34614681331"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20"
          >
            <Phone className="w-4 h-4" />
            Llamar ahora
          </a>
          <a
            href="#presupuesto"
            className={`group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold border transition-all ${
              isDark
                ? "bg-brand-dark-foreground/10 text-brand-dark-foreground border-brand-dark-foreground/15 hover:bg-brand-dark-foreground/20"
                : "bg-background text-foreground border-border hover:border-primary/40"
            }`}
          >
            Presupuesto Gratis
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCallout;
