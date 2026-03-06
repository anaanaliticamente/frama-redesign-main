import { Shield, Clock, Award, Wrench } from "lucide-react";

const stats = [
  { icon: Clock, value: "+10", label: "Años experiencia" },
  { icon: Award, value: "+500", label: "Proyectos realizados" },
  { icon: Shield, value: "300K€", label: "Seguro RC" },
  { icon: Wrench, value: "24h", label: "Respuesta" },
];

const ServiceStatsBanner = () => (
  <div className="not-prose my-16">
    <div className="relative bg-brand-dark rounded-2xl p-6 md:p-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,hsl(var(--primary)/0.08),transparent_60%)]" />
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="font-display text-2xl md:text-3xl text-brand-dark-foreground tracking-tight">{stat.value}</p>
            <p className="text-xs text-brand-dark-foreground/40 mt-1 tracking-wide uppercase">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ServiceStatsBanner;
