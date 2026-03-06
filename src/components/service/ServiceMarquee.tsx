const keywords = [
  "Amianto", "Uralita", "Fibrocemento", "RERA", "Chimeneas",
  "Bajantes", "Tuberías", "Cubiertas", "Tejados", "Residuo Peligroso",
  "Certificado", "Plan de Trabajo", "EPI", "Vertedero Autorizado",
];

const ServiceMarquee = () => {
  const repeated = [...keywords, ...keywords];

  return (
    <div className="not-prose my-16 overflow-hidden">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-marquee gap-4">
          {repeated.map((kw, i) => (
            <span
              key={`${kw}-${i}`}
              className="shrink-0 inline-flex items-center gap-2 bg-card border border-border rounded-full px-5 py-2.5 text-sm font-medium text-muted-foreground whitespace-nowrap hover:border-primary/40 hover:text-foreground transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              {kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceMarquee;
