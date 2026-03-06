import { useState, useEffect, useRef } from "react";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const serviciosItems = [
  { label: "Retirada de Uralita en Tejados", href: "/servicios/retirada-uralita-tejados" },
  { label: "Retirada de Chimeneas de Amianto", href: "/servicios/retirada-chimeneas-amianto" },
  { label: "Retirada de Bajantes y Tuberias", href: "/servicios/retirada-bajantes-tuberias" },
];

const localidadesItems = [
  { label: "Madrid", href: "/localidades/madrid" },
  { label: "Toledo", href: "/localidades/toledo" },
  { label: "Avila", href: "/localidades/avila" },
  { label: "Guadalajara", href: "/localidades/guadalajara" },
  { label: "Segovia", href: "/localidades/segovia" },
  { label: "Cuenca", href: "/localidades/cuenca" },
];

const DropdownMenu = ({
  label,
  items,
  open,
  onToggle,
  onClose,
}: {
  label: string;
  items: { label: string; href: string }[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onMouseEnter={onToggle}
        onClick={onToggle}
        className="flex items-center gap-1 text-sm font-medium text-brand-dark-foreground/70 hover:text-brand-dark-foreground transition-colors"
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div
        onMouseLeave={onClose}
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-brand-dark/95 backdrop-blur-xl rounded-2xl py-2 z-50 border border-brand-dark-foreground/10 shadow-xl transition-all duration-300 origin-top ${
          open ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }`}
      >
        {items.map((item, i) => (
          <Link
            key={item.label}
            to={item.href}
            onClick={onClose}
            className="block px-5 py-3 text-sm text-brand-dark-foreground/70 hover:bg-brand-dark-foreground/5 hover:text-primary transition-all hover:pl-6"
            style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-brand-dark/90 backdrop-blur-xl shadow-lg shadow-brand-dark/20" : "bg-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <Link to="/" className="flex items-center group">
          <img src="/images/logo-frama-white.png" alt="FRAMA" className="h-12 sm:h-14 transition-transform duration-300 group-hover:scale-105" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-brand-dark-foreground/70 hover:text-brand-dark-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:rounded-full hover:after:w-full after:transition-all after:duration-300">
            Inicio
          </Link>
          <DropdownMenu
            label="Servicios"
            items={serviciosItems}
            open={openDropdown === "servicios"}
            onToggle={() => setOpenDropdown(openDropdown === "servicios" ? null : "servicios")}
            onClose={() => setOpenDropdown(null)}
          />
          <DropdownMenu
            label="Cobertura"
            items={localidadesItems}
            open={openDropdown === "localidades"}
            onToggle={() => setOpenDropdown(openDropdown === "localidades" ? null : "localidades")}
            onClose={() => setOpenDropdown(null)}
          />
          <Link to="/nuestros-trabajos" className="text-sm font-medium text-brand-dark-foreground/70 hover:text-brand-dark-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:rounded-full hover:after:w-full after:transition-all after:duration-300">
            Trabajos
          </Link>
          <Link to="/blog" className="text-sm font-medium text-brand-dark-foreground/70 hover:text-brand-dark-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:rounded-full hover:after:w-full after:transition-all after:duration-300">
            Blog
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="tel:+34614681331"
            className="inline-flex items-center gap-2 text-brand-dark-foreground/70 hover:text-brand-dark-foreground px-3 py-2 text-sm font-medium transition-colors"
          >
            <Phone className="w-4 h-4" />
            614 681 331
          </a>
          <a
            href="#presupuesto"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold hover:brightness-110 transition-all hover:shadow-[0_0_20px_hsl(0,75%,50%,0.2)] hover:scale-105 active:scale-95"
          >
            Presupuesto
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-brand-dark-foreground p-2"
            aria-label="Menu"
          >
            <div className="relative w-6 h-6">
              <Menu className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${mobileOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`} />
              <X className={`w-6 h-6 absolute inset-0 transition-all duration-300 ${mobileOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${mobileOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-brand-dark/98 backdrop-blur-xl border-t border-brand-dark-foreground/5 overflow-y-auto">
          <div className="px-5 py-6 flex flex-col gap-1">
            <Link to="/" onClick={() => setMobileOpen(false)} className="text-base font-medium text-brand-dark-foreground/80 hover:text-primary py-3 transition-colors">
              Inicio
            </Link>

            <button
              onClick={() => setMobileExpanded(mobileExpanded === "servicios" ? null : "servicios")}
              className="flex items-center justify-between w-full text-base font-medium text-brand-dark-foreground/80 hover:text-primary py-3 transition-colors"
            >
              <span>Servicios</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileExpanded === "servicios" ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-400 ease-out ${mobileExpanded === "servicios" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="pl-4 flex flex-col gap-0.5 mb-2">
                {serviciosItems.map((item, i) => (
                  <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)}
                    className="text-sm text-brand-dark-foreground/50 hover:text-primary py-2.5 pl-4 border-l-2 border-primary/20 transition-all hover:border-primary/60 hover:pl-5"
                    style={{ transitionDelay: `${i * 50}ms` }}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileExpanded(mobileExpanded === "localidades" ? null : "localidades")}
              className="flex items-center justify-between w-full text-base font-medium text-brand-dark-foreground/80 hover:text-primary py-3 transition-colors"
            >
              <span>Cobertura</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${mobileExpanded === "localidades" ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-400 ease-out ${mobileExpanded === "localidades" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="pl-4 flex flex-col gap-0.5 mb-2">
                {localidadesItems.map((item, i) => (
                  <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)}
                    className="text-sm text-brand-dark-foreground/50 hover:text-primary py-2.5 pl-4 border-l-2 border-primary/20 transition-all hover:border-primary/60 hover:pl-5"
                    style={{ transitionDelay: `${i * 50}ms` }}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/nuestros-trabajos" onClick={() => setMobileOpen(false)} className="text-base font-medium text-brand-dark-foreground/80 hover:text-primary py-3 transition-colors">
              Trabajos
            </Link>
            <Link to="/blog" onClick={() => setMobileOpen(false)} className="text-base font-medium text-brand-dark-foreground/80 hover:text-primary py-3 transition-colors">
              Blog
            </Link>

            <div className="pt-4 space-y-3 border-t border-brand-dark-foreground/5 mt-2">
              <a
                href="#presupuesto"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center bg-primary text-primary-foreground w-full py-4 rounded-xl text-base font-bold active:scale-95 transition-transform"
              >
                Solicitar Presupuesto
              </a>
              <a
                href="tel:+34614681331"
                className="flex items-center justify-center gap-2 bg-brand-dark-foreground/5 text-brand-dark-foreground w-full py-4 rounded-xl text-base font-bold border border-brand-dark-foreground/10 active:scale-95 transition-transform"
              >
                <Phone className="w-5 h-5" />
                614 681 331
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
