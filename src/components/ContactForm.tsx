import { useEffect, useRef, useState } from "react";
import { Phone, Send, MessageSquare, Loader2, CheckCircle, Mail, Clock } from "lucide-react";

const WEBHOOK_URL = "https://tu-n8n.com/webhook/tu-id";

const ContactForm = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    tipoObra: "Retirada de uralita en tejados",
    provincia: "",
    descripcion: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          fecha: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Error al enviar");

      setSuccess(true);
      setFormData({
        nombre: "",
        telefono: "",
        email: "",
        tipoObra: "Retirada de uralita en tejados",
        provincia: "",
        descripcion: "",
      });
    } catch {
      setError("Error al enviar. Intentalo de nuevo o llamanos directamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="presupuesto" ref={ref} className="py-20 md:py-28 bg-brand-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/3 rounded-full blur-3xl" />

      <div className={`container mx-auto px-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-primary/15 text-primary text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-4">
            Contacto
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-brand-dark-foreground mb-4">
            Solicita tu presupuesto
          </h2>
          <p className="text-brand-dark-foreground/40 text-base max-w-md mx-auto">
            Sin compromiso. Respuesta en menos de 24 horas.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Contact cards - 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="tel:+34614681331"
              className="flex items-center gap-4 bg-brand-dark-foreground/5 border border-brand-dark-foreground/10 rounded-2xl p-5 hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-brand-dark-foreground text-sm font-semibold">Llamanos</p>
                <p className="text-primary font-display text-lg">+34 614 681 331</p>
              </div>
            </a>

            <a
              href="https://wa.me/34614681331"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-brand-dark-foreground/5 border border-brand-dark-foreground/10 rounded-2xl p-5 hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-brand-dark-foreground text-sm font-semibold">WhatsApp</p>
                <p className="text-brand-dark-foreground/50 text-sm">Respuesta inmediata</p>
              </div>
            </a>

            <a
              href="mailto:info.noamianto@gmail.com"
              className="flex items-center gap-4 bg-brand-dark-foreground/5 border border-brand-dark-foreground/10 rounded-2xl p-5 hover:border-primary/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary/25 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-brand-dark-foreground text-sm font-semibold">Email</p>
                <p className="text-brand-dark-foreground/50 text-sm">info.noamianto@gmail.com</p>
              </div>
            </a>

            <div className="flex items-center gap-3 pt-2">
              <Clock className="w-4 h-4 text-primary/60" />
              <p className="text-brand-dark-foreground/30 text-sm">Lunes a Viernes: 08:00 - 17:00</p>
            </div>
          </div>

          {/* Form - 3 cols */}
          <div className="lg:col-span-3">
            <div className="bg-background rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
              <h3 className="font-display text-xl sm:text-2xl text-foreground mb-6 sm:mb-8">Cuentanos tu proyecto</h3>
              {success ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="font-display text-2xl text-foreground mb-2">Mensaje enviado!</h4>
                  <p className="text-muted-foreground">Nos pondremos en contacto contigo lo antes posible.</p>
                  <button onClick={() => setSuccess(false)} className="mt-6 text-primary underline">
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
              <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Nombre *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      className="w-full border border-input rounded-xl px-4 py-3 text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Telefono *</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                      placeholder="600 000 000"
                      className="w-full border border-input rounded-xl px-4 py-3 text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Correo electronico</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    className="w-full border border-input rounded-xl px-4 py-3 text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Tipo de servicio</label>
                    <select
                      name="tipoObra"
                      value={formData.tipoObra}
                      onChange={handleChange}
                      className="w-full border border-input rounded-xl px-4 py-3 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none"
                    >
                      <option>Retirada de uralita en tejados</option>
                      <option>Retirada de chimeneas de amianto</option>
                      <option>Retirada de bajantes y tuberias</option>
                      <option>Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Provincia *</label>
                    <input
                      type="text"
                      name="provincia"
                      value={formData.provincia}
                      onChange={handleChange}
                      required
                      placeholder="Ej: Madrid"
                      className="w-full border border-input rounded-xl px-4 py-3 text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Descripcion</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tipo de material, superficie aproximada, ubicacion..."
                    className="w-full border border-input rounded-xl px-4 py-3 text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all hover:shadow-[0_0_30px_hsl(0,75%,50%,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Enviando...</>
                  ) : (
                    <><Send className="w-5 h-5" /> Solicitar Presupuesto Gratuito</>
                  )}
                </button>
              </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
