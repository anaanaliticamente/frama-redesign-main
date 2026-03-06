import { CheckCircle } from "lucide-react";

interface ServiceChecklistProps {
  label?: string;
  heading: string;
  subtitle?: string;
  items: string[];
  columns?: 1 | 2;
}

const ServiceChecklist = ({ label, heading, subtitle, items, columns = 2 }: ServiceChecklistProps) => (
  <div className="not-prose relative my-16 overflow-hidden">
    {/* Left accent bar */}
    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/60 to-transparent rounded-full" />
    <div className="pl-8">
      {(label || heading) && (
        <div className="mb-8">
          {label && (
            <span className="inline-block text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">{label}</span>
          )}
          <h2 className="font-display text-2xl md:text-3xl text-foreground tracking-tight">{heading}</h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>}
        </div>
      )}
      <div className={`grid gap-3 ${columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
        {items.map((item) => (
          <div key={item} className="flex items-start gap-3 group">
            <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/25 transition-colors">
              <CheckCircle className="w-3 h-3 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ServiceChecklist;
