import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Phone, ArrowRight } from "lucide-react";
import { useEffect } from "react";

interface ServicePageLayoutProps {
  title: string;
  subtitle?: string;
  badge?: string;
  heroImage?: string;
  children: React.ReactNode;
}

const ServicePageLayout = ({ title, subtitle, badge, heroImage, children }: ServicePageLayoutProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-28 pb-20 sm:pt-32 sm:pb-28 overflow-hidden">
          {heroImage && (
            <img
              src={heroImage}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className={`absolute inset-0 ${heroImage ? 'bg-brand-dark/75 backdrop-blur-[2px]' : 'bg-brand-dark'}`} />
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_20%_50%,hsl(var(--primary)/0.08),transparent_60%)]" />
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_80%_20%,hsl(var(--primary)/0.05),transparent_50%)]" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute -bottom-px left-0 w-full overflow-hidden">
            <svg viewBox="0 0 1440 40" className="w-full h-10 text-background" preserveAspectRatio="none">
              <path d="M0,40 L1440,40 L1440,0 Q720,40 0,0 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              {badge && (
                <span className="inline-flex items-center gap-2 bg-primary/15 text-primary text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6 border border-primary/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {badge}
                </span>
              )}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-dark-foreground mb-4 sm:mb-5 tracking-tight leading-[1.1]">
                {title}
              </h1>
              {subtitle && (
                <p className="text-brand-dark-foreground/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                  {subtitle}
                </p>
              )}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+34614681331"
                  className="group inline-flex items-center justify-center gap-2.5 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4" />
                  <span>+34 614 681 331</span>
                </a>
                <a
                  href="#presupuesto"
                  className="group inline-flex items-center justify-center gap-2 bg-brand-dark-foreground/10 text-brand-dark-foreground px-7 py-3.5 rounded-xl font-bold border border-brand-dark-foreground/15 hover:bg-brand-dark-foreground/20 transition-all w-full sm:w-auto"
                >
                  Solicitar Presupuesto
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg prose-headings:font-display prose-headings:text-foreground prose-headings:tracking-tight prose-headings:text-center md:prose-headings:text-left prose-p:text-center md:prose-p:text-left prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-li:text-muted-foreground">
              {children}
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

export default ServicePageLayout;
