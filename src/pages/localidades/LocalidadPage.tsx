import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import UrgentService from "@/components/UrgentService";
import WhatsAppButton from "@/components/WhatsAppButton";
import { localidades, localidadContent } from "./localidadData";
import NotFound from "@/pages/NotFound";
import { Phone } from "lucide-react";
import { useEffect } from "react";

const LocalidadPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const loc = slug ? localidades[slug] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!loc) return <NotFound />;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero with background image */}
        <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 overflow-hidden">
          <img
            src={loc.img}
            alt={`Retirada de amianto en ${loc.nombre}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm" />
          <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="inline-block bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
              {loc.nombre}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl text-brand-dark-foreground mb-4">
              Retirada de Amianto en {loc.nombre}
            </h1>
            <p className="text-brand-dark-foreground/60 text-lg max-w-2xl mx-auto mb-8">
              Empresa autorizada RERA para la retirada segura y certificada de amianto
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+34614681331"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-xl font-bold hover:brightness-110 transition-all w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" />
                LLÁMENOS +34 614 681 331
              </a>
              <a
                href="#presupuesto"
                className="inline-flex items-center justify-center gap-2 bg-brand-dark-foreground/10 text-brand-dark-foreground px-6 py-3.5 rounded-xl font-bold border border-brand-dark-foreground/20 hover:bg-brand-dark-foreground/20 transition-all w-full sm:w-auto"
              >
                Solicitar Presupuesto
              </a>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg prose-headings:font-display prose-headings:text-foreground prose-headings:text-center md:prose-headings:text-left prose-p:text-center md:prose-p:text-left prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-li:text-muted-foreground">
              {localidadContent(loc.nombre, loc.municipios)}
            </div>
          </div>
        </section>

        <ContactForm />
        <UrgentService />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default LocalidadPage;
