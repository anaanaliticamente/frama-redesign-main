import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";

// Before/After images
import tejadoAntes from "@/assets/trabajos/tejado-antes.jpg";
import tejadoDespues from "@/assets/trabajos/tejado-despues.jpg";
import goterasAntes from "@/assets/trabajos/goteras-antes.jpg";
import goterasDespues from "@/assets/trabajos/goteras-despues.jpg";
import fachadaAntes from "@/assets/trabajos/fachada-antes.jpg";
import fachadaDespues from "@/assets/trabajos/fachada-despues.jpg";
import canalonesAntes from "@/assets/trabajos/canalones-antes.jpg";
import canalonesDespues from "@/assets/trabajos/canalones-despues.jpg";
import imperAntes from "@/assets/trabajos/impermeabilizacion-antes.jpg";
import imperDespues from "@/assets/trabajos/impermeabilizacion-despues.jpg";
import antiavesAntes from "@/assets/trabajos/antiaves-antes.jpg";
import antiavesDespues from "@/assets/trabajos/antiaves-despues.jpg";
import uralitaAntes from "@/assets/trabajos/uralita-antes.jpg";
import uralitaDespues from "@/assets/trabajos/uralita-despues.jpg";
import comunidadAntes from "@/assets/trabajos/comunidad-antes.jpg";
import comunidadDespues from "@/assets/trabajos/comunidad-despues.jpg";
import pizarraAntes from "@/assets/trabajos/pizarra-antes.jpg";
import pizarraDespues from "@/assets/trabajos/pizarra-despues.jpg";

const trabajos = [
  { title: "Retirada de uralita en cubierta", location: "Toledo", before: tejadoAntes, after: tejadoDespues },
  { title: "Retirada de fibrocemento", location: "Madrid", before: goterasAntes, after: goterasDespues },
  { title: "Retirada de bajantes de amianto", location: "Guadalajara", before: fachadaAntes, after: fachadaDespues },
  { title: "Retirada de chimeneas de amianto", location: "Segovia", before: canalonesAntes, after: canalonesDespues },
  { title: "Retirada de tuberías de microcemento", location: "Cuenca", before: imperAntes, after: imperDespues },
  { title: "Retirada de placas de amianto", location: "Ávila", before: antiavesAntes, after: antiavesDespues },
  { title: "Retirada de uralita en nave", location: "Madrid", before: uralitaAntes, after: uralitaDespues },
  { title: "Retirada de amianto en comunidad", location: "Toledo", before: comunidadAntes, after: comunidadDespues },
  { title: "Retirada de cubierta de fibrocemento", location: "Guadalajara", before: pizarraAntes, after: pizarraDespues },
];

const TrabajoCard = ({ trabajo }: { trabajo: typeof trabajos[0] }) => {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-brand-dark">
      {/* Before image (always rendered) */}
      <img
        src={trabajo.before}
        alt={`Antes: ${trabajo.title}`}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showAfter ? "opacity-0" : "opacity-100"}`}
      />
      {/* After image */}
      <img
        src={trabajo.after}
        alt={`Después: ${trabajo.title}`}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showAfter ? "opacity-100" : "opacity-0"}`}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/30 to-transparent" />

      {/* Switch toggle minimalista */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center bg-black/50 backdrop-blur-sm rounded-full p-0.5">
          <button
            onClick={() => setShowAfter(false)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              !showAfter
                ? "bg-primary text-primary-foreground"
                : "text-white/60 hover:text-white"
            }`}
          >
            Antes
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              showAfter
                ? "bg-emerald-500 text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            Después
          </button>
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <p className="text-brand-dark-foreground font-display text-base sm:text-lg leading-tight">{trabajo.title}</p>
        <p className="text-brand-dark-foreground/50 text-sm mt-1">{trabajo.location}</p>
      </div>
    </div>
  );
};

const NuestrosTrabajos = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-brand-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,hsl(0_75%_50%/0.1),transparent_60%)]" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute -bottom-px left-0 w-full overflow-hidden">
            <svg viewBox="0 0 1440 40" className="w-full h-10 text-background" preserveAspectRatio="none">
              <path d="M0,40 L1440,40 L1440,0 Q720,40 0,0 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="inline-flex items-center gap-2 bg-primary/15 text-primary text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6 border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Portfolio
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-brand-dark-foreground mb-4 sm:mb-5 tracking-tight leading-[1.1]">
              Nuestros <span className="text-primary">Trabajos</span>
            </h1>
            <p className="text-brand-dark-foreground/50 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Proyectos de retirada de amianto realizados por FRAMA. Pulsa en cada tarjeta para ver el antes y despues.
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {trabajos.map((trabajo, i) => (
                <div
                  key={i}
                  className="opacity-0 animate-urgent-slide"
                  style={{ animationDelay: `${i * 100}ms`, animationFillMode: "forwards" }}
                >
                  <TrabajoCard trabajo={trabajo} />
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <p className="text-muted-foreground text-lg mb-6">
                ¿Quieres ver más trabajos o solicitar un presupuesto para tu proyecto?
              </p>
              <a
                href="tel:+34614681331"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/25"
              >
                <Phone className="w-5 h-5" />
                Llámanos: 614 681 331
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default NuestrosTrabajos;
