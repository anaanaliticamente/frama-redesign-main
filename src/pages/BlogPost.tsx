import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, ArrowLeft, ArrowRight, Phone, Tag } from "lucide-react";
import NotFound from "./NotFound";

interface ContentBlock {
  type: "paragraph" | "heading" | "list";
  text?: string;
  items?: string[];
}

interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: string;
  content: ContentBlock[];
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/content/posts.json")
      .then((res) => res.json())
      .then((data: BlogPostData[]) => {
        setAllPosts(data);
        const found = data.find((p) => p.slug === slug);
        setPost(found || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <Footer />
      </>
    );
  }

  if (!post) return <NotFound />;

  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-brand-dark/85 backdrop-blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="container mx-auto px-4 relative z-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-brand-dark-foreground/50 hover:text-primary text-sm font-medium mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al blog
            </Link>

            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 bg-primary/20 text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-primary/20">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-brand-dark-foreground/40 text-xs">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-brand-dark-foreground mb-4 sm:mb-5 tracking-tight leading-[1.1]">
                {post.title}
              </h1>
              <p className="text-brand-dark-foreground/50 text-sm">{post.date}</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Article content */}
              <div className="space-y-6">
                {post.content.map((block, i) => {
                  if (block.type === "heading") {
                    return (
                      <h2
                        key={i}
                        className="font-display text-2xl md:text-3xl text-foreground mt-10 mb-4 tracking-tight"
                      >
                        {block.text}
                      </h2>
                    );
                  }
                  if (block.type === "list") {
                    return (
                      <ul key={i} className="space-y-3 my-6">
                        {block.items?.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                            <span className="text-muted-foreground leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={i} className="text-muted-foreground leading-relaxed text-base md:text-lg">
                      {block.text}
                    </p>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="relative bg-brand-dark rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mt-12 sm:mt-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 text-center">
                  <h3 className="font-display text-2xl md:text-3xl text-brand-dark-foreground mb-3 tracking-tight">
                    ¿Necesitas retirar amianto?
                  </h3>
                  <p className="text-brand-dark-foreground/50 mb-6 max-w-md mx-auto">
                    Solicita tu presupuesto gratuito y sin compromiso. Te respondemos en menos de 24 horas.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href="tel:+34614681331"
                      className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-primary/20 w-full sm:w-auto"
                    >
                      <Phone className="w-4 h-4" />
                      614 681 331
                    </a>
                    <Link
                      to="/contacto"
                      className="inline-flex items-center justify-center gap-2 bg-brand-dark-foreground/10 text-brand-dark-foreground px-7 py-3.5 rounded-xl font-bold border border-brand-dark-foreground/20 hover:bg-brand-dark-foreground/20 transition-all w-full sm:w-auto"
                    >
                      Solicitar Presupuesto
                    </Link>
                  </div>
                </div>
              </div>

              {/* Prev / Next navigation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                {prevPost ? (
                  <Link
                    to={`/blog/${prevPost.slug}`}
                    className="group flex items-center gap-3 bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all"
                  >
                    <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground/50 mb-1">Anterior</p>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{prevPost.title}</p>
                    </div>
                  </Link>
                ) : <div />}
                {nextPost && (
                  <Link
                    to={`/blog/${nextPost.slug}`}
                    className="group flex items-center gap-3 bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all text-right sm:justify-end"
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground/50 mb-1">Siguiente</p>
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{nextPost.title}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
                  </Link>
                )}
              </div>
            </div>

            {/* Related posts */}
            <div className="max-w-6xl mx-auto mt-20">
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-8 tracking-tight text-center">
                Articulos relacionados
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    to={`/blog/${related.slug}`}
                    className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full mb-2">
                        {related.category}
                      </span>
                      <h4 className="font-display text-base text-foreground group-hover:text-primary transition-colors tracking-tight line-clamp-2">
                        {related.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
};

export default BlogPost;
