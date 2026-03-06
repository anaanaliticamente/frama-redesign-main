import { type LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ServiceFeatureCardsProps {
  label?: string;
  heading: string;
  features: Feature[];
}

const ServiceFeatureCards = ({ label, heading, features }: ServiceFeatureCardsProps) => (
  <div className="not-prose my-16">
    {(label || heading) && (
      <div className="mb-10">
        {label && (
          <span className="inline-block text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">{label}</span>
        )}
        <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">{heading}</h2>
      </div>
    )}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map((feature, i) => (
        <div
          key={feature.title}
          className="group relative bg-card border border-border rounded-2xl p-7 hover:border-primary/40 transition-all duration-300 overflow-hidden"
        >
          {/* Top accent — alternating widths for visual variety */}
          <div className="absolute top-0 left-0 h-[3px] bg-primary/60 transition-all duration-500 group-hover:w-full"
            style={{ width: `${30 + (i % 3) * 20}%` }} />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
              <feature.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-lg text-foreground mb-2 tracking-tight">{feature.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ServiceFeatureCards;
