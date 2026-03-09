import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Send, CheckCircle, Loader2 } from "lucide-react";
import reviewsJson from "../../public/content/reviews.json";

interface ReviewData {
  name: string;
  rating: number;
  text: string;
  date: string;
}

interface Review extends ReviewData {
  initials: string;
  color: string;
}

const GRADIENT_COLORS = [
  "from-red-500 to-orange-500",
  "from-violet-500 to-purple-500",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-yellow-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-blue-500",
  "from-teal-500 to-emerald-500",
  "from-orange-500 to-red-500",
];

function enrichReview(r: ReviewData, i: number): Review {
  const parts = r.name.split(" ");
  const initials = parts.map((p) => p[0]).join("").toUpperCase().slice(0, 2);
  return { ...r, initials, color: GRADIENT_COLORS[i % GRADIENT_COLORS.length] };
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-muted/30 text-muted/30"}`}
      />
    ))}
  </div>
);

const InteractiveStarRating = ({ rating, onRate }: { rating: number; onRate: (r: number) => void }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onRate(i + 1)}
        className="transition-transform hover:scale-125 active:scale-95"
      >
        <Star
          className={`w-7 h-7 transition-colors ${i < rating ? "fill-amber-400 text-amber-400" : "fill-transparent text-border stroke-[1.5] hover:fill-amber-100 hover:text-amber-300"}`}
        />
      </button>
    ))}
  </div>
);

const MAX_TEXT_LENGTH = 150;

const ReviewCard = ({ review }: { review: Review }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > MAX_TEXT_LENGTH;
  const displayText = !isLong || expanded ? review.text : review.text.slice(0, MAX_TEXT_LENGTH).trimEnd() + "...";

  return (
    <div className="group relative bg-card border border-border rounded-3xl p-5 sm:p-7 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col h-full">
      {/* Gradient accent at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Background glow on hover */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Quote watermark */}
      <div className="absolute -top-2 -right-2 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 group-hover:rotate-6 transform">
        <Quote className="w-24 h-24 text-foreground" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Top: Stars + Date */}
        <div className="flex items-center justify-between mb-5">
          <StarRating rating={review.rating} />
          <span className="text-[11px] text-muted-foreground/40 font-medium">{review.date}</span>
        </div>

        {/* Comment — flex-1 makes all cards push the author section to the same position */}
        <div className="flex-1 mb-6">
          <p className="text-[15px] text-foreground/80 leading-relaxed">
            &ldquo;{displayText}&rdquo;
          </p>
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-primary text-xs font-semibold mt-2 hover:underline"
            >
              {expanded ? "Ver menos" : "Leer más"}
            </button>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-5 group-hover:bg-primary/20 transition-colors duration-500" />

        {/* Author */}
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <span className="font-display text-xs text-white font-bold tracking-wide">
              {review.initials}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{review.name}</p>
            <p className="text-xs text-muted-foreground/50">Cliente verificado</p>
          </div>
          <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const WEBHOOK_URL = "https://tu-n8n.com/webhook/tu-id-resenas";

const ReviewForm = ({ onSubmit }: { onSubmit: (review: ReviewData) => void }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Por favor, selecciona una valoración.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const newReview: ReviewData = {
        name: name.trim(),
        rating,
        text: text.trim(),
        date: new Date().toLocaleDateString("es-ES", { month: "long", year: "numeric" }),
      };

      // TODO: Reemplazar con webhook real cuando esté listo
      if (WEBHOOK_URL.includes("tu-n8n.com")) {
        await new Promise((resolve) => setTimeout(resolve, 800));
      } else {
        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...newReview, fecha: new Date().toISOString() }),
        });
        if (!response.ok) throw new Error("Error al enviar");
      }

      onSubmit(newReview);
      setSuccess(true);
    } catch {
      setError("No se pudo enviar la reseña. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-card border border-border rounded-3xl p-8 sm:p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="font-display text-xl text-foreground mb-2">¡Gracias por tu opinión!</h3>
        <p className="text-sm text-muted-foreground">Tu reseña ha sido enviada y será publicada próximamente.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-3xl p-6 sm:p-8">
      <h3 className="font-display text-xl text-foreground mb-1">Deja tu opinión</h3>
      <p className="text-sm text-muted-foreground mb-6">¿Has trabajado con nosotros? Nos encantaría conocer tu experiencia.</p>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="review-name" className="block text-sm font-medium text-foreground mb-1.5">Nombre</label>
          <input
            id="review-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Valoración</label>
          <InteractiveStarRating rating={rating} onRate={setRating} />
        </div>

        {/* Text */}
        <div>
          <label htmlFor="review-text" className="block text-sm font-medium text-foreground mb-1.5">Tu experiencia</label>
          <textarea
            id="review-text"
            required
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Cuéntanos cómo fue tu experiencia con nuestro servicio..."
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Enviar reseña
            </>
          )}
        </button>
      </div>
    </form>
  );
};

const VISIBLE_DESKTOP = 3;
const AUTO_INTERVAL = 5000;

const Reviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(() => {
    const arr = Array.isArray(reviewsJson) ? reviewsJson : (reviewsJson as { reviews: ReviewData[] }).reviews;
    return arr.map(enrichReview);
  });

  const totalPages = Math.max(1, Math.ceil(reviews.length / VISIBLE_DESKTOP));

  const handleNewReview = useCallback((data: ReviewData) => {
    setReviews((prev) => {
      const enriched = enrichReview(data, prev.length);
      const updated = [...prev, enriched];
      const lastPage = Math.ceil(updated.length / VISIBLE_DESKTOP) - 1;
      setTimeout(() => setCurrent(lastPage), 400);
      return updated;
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setSectionVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((page: number) => {
    if (animating || page === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(page);
      setTimeout(() => setAnimating(false), 50);
    }, 300);
  }, [animating, current]);

  const next = useCallback(() => {
    const nextPage = (current + 1) % totalPages;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(nextPage);
      setTimeout(() => setAnimating(false), 50);
    }, 300);
  }, [current, totalPages]);

  const prev = useCallback(() => {
    const prevPage = (current - 1 + totalPages) % totalPages;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(prevPage);
      setTimeout(() => setAnimating(false), 50);
    }, 300);
  }, [current, totalPages]);

  // Auto-play
  useEffect(() => {
    if (paused || !sectionVisible) return;
    const timer = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next, sectionVisible]);

  const visibleReviews = reviews.slice(current * VISIBLE_DESKTOP, current * VISIBLE_DESKTOP + VISIBLE_DESKTOP);
  const avg = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";
  const totalReviews = reviews.length;

  if (reviews.length === 0) return null;

  // Progress for auto-play bar
  const progressPercent = ((current + 1) / totalPages) * 100;

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-accent/30 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-20 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-32 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 transition-all duration-700 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div>
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-5 border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Opiniones de clientes
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-foreground tracking-tight">
              Lo que dicen nuestros <span className="text-primary">clientes</span>
            </h2>
          </div>

          {/* Rating summary card */}
          <div className="flex items-center gap-3 sm:gap-5 bg-card border border-border rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-sm w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="text-xs text-muted-foreground font-medium">Valoración media</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex items-center gap-2">
              <span className="font-display text-3xl text-foreground leading-none">{avg}</span>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground">{totalReviews} reseñas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slider area */}
        <div
          className={`transition-all duration-700 delay-200 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Cards */}
          <div className="relative">
            {/* Fade edges on desktop */}
            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-accent/30 to-transparent z-10 pointer-events-none" />
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-accent/30 to-transparent z-10 pointer-events-none" />

            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-5 transition-all duration-500 ease-out ${
                animating ? "opacity-0 scale-[0.97] blur-[2px]" : "opacity-100 scale-100 blur-0"
              }`}
            >
              {visibleReviews.map((review, i) => (
                <ReviewCard key={`${current}-${i}`} review={review} />
              ))}
            </div>
          </div>

          {/* Controls bar */}
          <div className="flex items-center justify-between mt-10 max-w-md mx-auto">
            <button
              onClick={prev}
              className="w-12 h-12 sm:w-11 sm:h-11 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/40 hover:text-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 active:scale-90 shrink-0"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Progress dots + bar */}
            <div className="flex-1 mx-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="group/dot relative py-2"
                    aria-label={`Pagina ${i + 1}`}
                  >
                    <div className={`rounded-full transition-all duration-500 ${
                      i === current
                        ? "w-10 h-2 bg-primary shadow-md shadow-primary/30"
                        : "w-2 h-2 bg-border group-hover/dot:bg-primary/40"
                    }`} />
                  </button>
                ))}
              </div>
              {/* Progress bar */}
              <div className="h-0.5 bg-border/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary/40 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <button
              onClick={next}
              className="w-12 h-12 sm:w-11 sm:h-11 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary/40 hover:text-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 active:scale-90 shrink-0"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Page counter */}
          <div className="flex justify-center mt-4">
            <span className="text-xs text-muted-foreground/30 font-medium tabular-nums">
              {current + 1} / {totalPages}
            </span>
          </div>
        </div>

        {/* Write a review CTA + Form */}
        <div className={`mt-16 max-w-xl mx-auto transition-all duration-700 delay-300 ${sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {!showForm ? (
            <div className="text-center">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-card border border-border rounded-2xl px-6 py-4 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="w-4 h-4 fill-transparent text-border stroke-[1.5] group-hover:fill-amber-400 group-hover:text-amber-400 transition-colors duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                  ))}
                </div>
                <span className="text-sm font-semibold text-foreground">Escribe tu opinión</span>
              </button>
            </div>
          ) : (
            <ReviewForm onSubmit={handleNewReview} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
