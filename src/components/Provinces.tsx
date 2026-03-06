import { useEffect, useRef, useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const provinces = [
  { name: "Madrid", img: "/images/madrid.webp", slug: "madrid" },
  { name: "Toledo", img: "/images/toledo.webp", slug: "toledo" },
  { name: "Avila", img: "/images/avila.webp", slug: "avila" },
  { name: "Guadalajara", img: "/images/guadalajara.webp", slug: "guadalajara" },
  { name: "Segovia", img: "/images/segovia.webp", slug: "segovia" },
  { name: "Cuenca", img: "/images/cadiz.webp", slug: "cuenca" },
];

const Provinces = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="provincias" ref={ref} className="py-20 md:py-28 bg-brand-dark relative overflow-hidden">
      {/* Decorative bg */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div>
            <span className="inline-block bg-primary/15 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
              Cobertura
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-brand-dark-foreground max-w-md">
              Donde operamos
            </h2>
          </div>
          <p className="text-brand-dark-foreground/40 max-w-sm text-sm md:text-base md:text-right">
            Retirada de amianto en las principales provincias de Espana
          </p>
        </div>

        {/* Bento grid layout: 2 large + 4 small */}
        <div className={`grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[240px] gap-3 sm:gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {provinces.map((prov, i) => {
            const isLarge = i === 0 || i === 3;
            return (
              <Link
                key={prov.name}
                to={`/localidades/${prov.slug}`}
                className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 ${isLarge ? "md:col-span-2 md:row-span-2" : ""}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <img
                  src={prov.img}
                  alt={`Retirada de amianto en ${prov.name}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />

                {/* Red accent line at top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/20 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className={`font-display text-white leading-tight ${isLarge ? "text-xl sm:text-2xl md:text-3xl" : "text-base sm:text-lg"}`}>
                          {prov.name}
                        </h3>
                        {isLarge && (
                          <p className="text-white/40 text-xs sm:text-sm mt-1 hidden sm:block">
                            Retirada de amianto certificada
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Provinces;
