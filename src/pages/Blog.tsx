import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: string;
}

const POSTS_PER_PAGE = 9;

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/content/posts.json")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

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
              Blog
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-brand-dark-foreground mb-4 sm:mb-5 tracking-tight leading-[1.1]">
              Blog sobre <span className="text-primary">Amianto</span>
            </h1>
            <p className="text-brand-dark-foreground/50 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
              Articulos sobre retirada de amianto, uralita, normativa vigente y todo lo que necesitas saber sobre el desamiantado.
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {/* Articles grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {paginatedPosts.map((post, i) => (
                    <Link
                      to={`/blog/${post.slug}`}
                      key={post.slug}
                      className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 opacity-0 animate-urgent-slide"
                      style={{ animationDelay: `${i * 60}ms`, animationFillMode: "forwards" }}
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span className="inline-flex items-center gap-1 text-muted-foreground/50 text-xs">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <h2 className="font-display text-lg text-foreground mb-2 group-hover:text-primary transition-colors tracking-tight">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-muted-foreground/50 text-xs">{post.date}</p>
                          <span className="inline-flex items-center gap-1 text-primary text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                            Leer <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-16">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="inline-flex items-center gap-1 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold border border-border bg-card hover:border-primary/30 hover:text-primary transition-all disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Anterior</span>
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                          p === page
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                            : "border border-border bg-card hover:border-primary/30 hover:text-primary"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="inline-flex items-center gap-1 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-semibold border border-border bg-card hover:border-primary/30 hover:text-primary transition-all disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <span className="hidden sm:inline">Siguiente</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default Blog;
