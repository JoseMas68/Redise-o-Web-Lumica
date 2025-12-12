"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Inicio", href: "#inicio" },
  { name: "Servicios", href: "#servicios" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Sobre Nosotros", href: "#sobre-nosotros" },
  { name: "Contacto", href: "#contacto" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      setIsOpen(false);
      setTimeout(() => {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <header className={`sticky top-0 z-[100] w-full transition-all duration-300 ${
      scrolled
        ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm border-b"
        : "bg-transparent"
    }`}>
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo_dark.png"
            alt="Lumica Web Design"
            width={360}
            height={90}
            priority
            className="h-24 md:h-28 w-auto hidden dark:inline-block"
          />
          <Image
            src="/logo_light.png"
            alt="Lumica Web Design"
            width={360}
            height={90}
            priority
            className="h-24 md:h-28 w-auto dark:hidden"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  if (element) {
                    const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                  }
                  setIsOpen(false);
                }}
                className={`text-base font-medium transition-all hover:text-primary relative group cursor-pointer ${
                  isActive ? "text-primary" : "text-foreground"
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full ${
                  isActive ? "w-full" : ""
                }`} />
              </a>
            );
          })}
        </nav>

        {/* CTA Button Desktop */}
        <div className="hidden md:flex md:items-center md:gap-2">
          <ThemeToggle />
          <Button
            className="shadow-md hover:shadow-lg transition-all"
            onClick={() => {
              const element = document.querySelector('#contacto');
              if (element) {
                const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
              }
            }}
          >
            CONTACTA
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Menú</span>
          </Button>
        </div>
      </div>

      {/* Menu móvil lateral - Moderno con diseño mejorado */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-[98] md:hidden backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel del menú - Lateral derecha */}
          <div className="fixed top-0 right-0 bottom-0 w-[320px] bg-white dark:bg-slate-950 z-[101] md:hidden shadow-2xl border-l overflow-hidden">
            {/* Grid background decorativo */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(79, 172, 254, 0.1) 25%, rgba(79, 172, 254, 0.1) 26%, transparent 27%, transparent 74%, rgba(79, 172, 254, 0.1) 75%, rgba(79, 172, 254, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(79, 172, 254, 0.1) 25%, rgba(79, 172, 254, 0.1) 26%, transparent 27%, transparent 74%, rgba(79, 172, 254, 0.1) 75%, rgba(79, 172, 254, 0.1) 76%, transparent 77%, transparent)',
              backgroundSize: '50px 50px'
            }} />

            {/* Header del menú */}
            <div className="relative flex items-center justify-between p-6 border-b border-primary/10 sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm z-10">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-primary to-blue-600 rounded-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  Menú
                </h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="hover:bg-primary/10 rounded-lg"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Contenedor con scroll */}
            <div className="relative overflow-y-auto p-6" style={{ height: 'calc(100vh - 80px)' }}>
              {/* Sección de navegación */}
              <div className="mb-8">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Navegar</p>
                <nav className="flex flex-col gap-2">
                  {navigation.map((item, idx) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className="group relative px-4 py-3 text-left rounded-lg transition-all duration-300 hover:bg-primary/10 active:bg-primary/20"
                      style={{
                        animation: `slideInUp 0.5s ease-out ${idx * 0.08}s backwards`
                      }}
                    >
                      {/* Borde lateral animado */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-blue-600 rounded-l-lg opacity-0 group-hover:opacity-100 transition-all" />
                      
                      <div className="relative flex items-center justify-between">
                        <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.name}
                        </span>
                        <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Separador visual */}
              <div className="my-6 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

              {/* Sección CTA */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Acción</p>
                <Button
                  className="w-full py-5 text-sm font-semibold shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-blue-600 hover:shadow-primary/50"
                  onClick={() => handleNavClick('#contacto')}
                  style={{
                    animation: 'slideInUp 0.5s ease-out 0.4s backwards'
                  }}
                >
                  <span className="flex items-center gap-2">
                    Comienza Tu Proyecto
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes slideInUp {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </>
      )}
    </header>
  );
}
