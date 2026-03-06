import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useEffect } from "react";
import { Phone, MessageSquare } from "lucide-react";

const Contacto = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-24 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/blog/tejados-toledo.jpg')" }}
          />
          <div className="absolute inset-0 bg-brand-dark/85 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark/60" />

          <div className="container mx-auto px-4 relative z-10 text-center">
            <span className="inline-block bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6">
              Contacto
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-brand-dark-foreground mb-4 sm:mb-5 leading-tight">
              Solicita
              <span className="block text-primary">Presupuesto</span>
            </h1>
            <p className="text-brand-dark-foreground/60 text-base sm:text-lg max-w-2xl mx-auto mb-8 sm:mb-10 px-2 sm:px-0">
              Solicita tu presupuesto gratuito y sin compromiso para la retirada de amianto. Te respondemos en menos de 24 horas.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+34614681331"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" />
                +34 614 681 331
              </a>
              <a
                href="https://wa.me/34614681331"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-dark-foreground/10 text-brand-dark-foreground px-7 py-3.5 rounded-xl font-bold border border-brand-dark-foreground/20 hover:bg-brand-dark-foreground/20 transition-all w-full sm:w-auto"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Contacto;
