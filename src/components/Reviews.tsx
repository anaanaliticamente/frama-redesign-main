import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import reviewsJson from "../../public/content/reviews.json";

interface ReviewData {
  name: string;
  location: string;
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

const GoogleIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const VISIBLE_DESKTOP = 3;
const AUTO_INTERVAL = 5000;

const Reviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const reviews = useMemo(() => {
    const arr = Array.isArray(reviewsJson) ? reviewsJson : (reviewsJson as { reviews: ReviewData[] }).reviews;
    return arr.map(enrichReview);
  }, []);

  const totalPages = Math.max(1, Math.ceil(reviews.length / VISIBLE_DESKTOP));

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
              Reseñas de Google
            </span>
            <h2 className="font-display text-3xl md:text-5xl text-foreground tracking-tight">
              Lo que dicen nuestros <span className="text-primary">clientes</span>
            </h2>
          </div>

          {/* Rating summary card */}
          <div className="flex items-center gap-3 sm:gap-5 bg-card border border-border rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-sm w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <GoogleIcon />
              <span className="text-xs text-muted-foreground font-medium">Google Reviews</span>
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
                <div
                  key={`${current}-${i}`}
                  className="group relative bg-card border border-border rounded-3xl p-5 sm:p-7 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  {/* Gradient accent at top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Background glow on hover */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Quote watermark */}
                  <div className="absolute -top-2 -right-2 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 group-hover:rotate-6 transform">
                    <Quote className="w-24 h-24 text-foreground" />
                  </div>

                  <div className="relative z-10">
                    {/* Top: Google + Stars */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <GoogleIcon />
                        <StarRating rating={review.rating} />
                      </div>
                      <span className="text-[11px] text-muted-foreground/40 font-medium">{review.date}</span>
                    </div>

                    {/* Comment */}
                    <p className="text-[15px] text-foreground/80 leading-relaxed mb-6 min-h-[5rem]">
                      &ldquo;{review.text}&rdquo;
                    </p>

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
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-muted-foreground/40" />
                          <p className="text-xs text-muted-foreground/50">{review.location}</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
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
      </div>
    </section>
  );
};

export default Reviews;
