interface Step {
  number: string;
  title: string;
  description: string;
}

interface ServiceProcessProps {
  label?: string;
  heading: string;
  steps: Step[];
}

const ServiceProcess = ({ label, heading, steps }: ServiceProcessProps) => (
  <div className="not-prose my-16">
    {(label || heading) && (
      <div className="mb-10">
        {label && (
          <span className="inline-block text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3">{label}</span>
        )}
        <h2 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">{heading}</h2>
      </div>
    )}
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden md:block" />
      <div className="space-y-6">
        {steps.map((step, i) => (
          <div key={step.number} className="group flex gap-6 items-start">
            {/* Number circle */}
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full bg-brand-dark flex items-center justify-center border-2 border-primary/30 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                <span className="font-display text-sm font-bold text-primary">{step.number}</span>
              </div>
            </div>
            {/* Content */}
            <div className="flex-1 bg-card border border-border rounded-2xl p-6 group-hover:border-primary/30 group-hover:shadow-md transition-all duration-300">
              <h3 className="font-display text-lg text-foreground mb-2 tracking-tight">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ServiceProcess;
