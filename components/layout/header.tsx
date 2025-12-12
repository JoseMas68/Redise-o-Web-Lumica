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
    <>
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
    </header>

      {/* Menu móvil fullscreen - Moderno y elegante */}
      {isOpen && (
        <>
          {/* Backdrop animado */}
          <div
            className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/20 z-[98] md:hidden backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            style={{
              animation: 'fadeIn 0.3s ease-out'
            }}
          />

          {/* Panel principal - Fullscreen */}
          <div 
            className="fixed top-0 left-0 right-0 bottom-0 z-[101] md:hidden overflow-hidden"
            style={{
              animation: 'slideInRight 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            {/* Grid background decorativo */}
            <div className="absolute inset-0 bg-white dark:bg-slate-950">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(79, 172, 254, 0.1) 25%, rgba(79, 172, 254, 0.1) 26%, transparent 27%, transparent 74%, rgba(79, 172, 254, 0.1) 75%, rgba(79, 172, 254, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(79, 172, 254, 0.1) 25%, rgba(79, 172, 254, 0.1) 26%, transparent 27%, transparent 74%, rgba(79, 172, 254, 0.1) 75%, rgba(79, 172, 254, 0.1) 76%, transparent 77%, transparent)',
                backgroundSize: '50px 50px'
              }} />
            </div>

            {/* Contenido */}
            <div className="relative h-full flex flex-col">
              {/* Header con botón cerrar */}
              <div className="flex items-center justify-between px-6 py-8 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="p-3 bg-gradient-to-br from-primary to-blue-600 rounded-xl">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    Menú
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-primary/10 rounded-xl"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Contenido scrolleable */}
              <div className="overflow-y-auto flex-1 px-6 pb-8">
                {/* Sección de navegación */}
                <div className="mb-12">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">Navegar</p>
                  <nav className="flex flex-col gap-2">
                    {navigation.map((item, idx) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="group relative px-6 py-4 text-left rounded-xl transition-all duration-300 hover:bg-primary/10 active:bg-primary/20"
                        style={{
                          animation: `slideInUp 0.5s ease-out ${idx * 0.08}s backwards`
                        }}
                      >
                        {/* Fondo con gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-blue-600/5 rounded-xl transition-all" />
                        
                        {/* Borde lateral animado */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-blue-600 rounded-l-xl opacity-0 group-hover:opacity-100 transition-all" />
                        
                        <div className="relative flex items-center justify-between">
                          <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                            {item.name}
                          </span>
                          <ArrowRight className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                        </div>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Separador visual */}
                <div className="my-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                {/* Sección CTA */}
                <div className="space-y-4">
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Acción</p>
                  <Button
                    className="w-full py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-blue-600 hover:shadow-primary/50"
                    size="lg"
                    onClick={() => handleNavClick('#contacto')}
                    style={{
                      animation: 'slideInUp 0.5s ease-out 0.4s backwards'
                    }}
                  >
                    <span className="flex items-center gap-2">
                      Comienza Tu Proyecto
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Button>
                </div>

                {/* Footer info */}
                <div className="mt-12 pt-8 border-t border-primary/10">
                  <p className="text-sm text-muted-foreground text-center">
                    Listo para transformar tu presencia digital
                  </p>
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes slideInRight {
              from {
                opacity: 0;
                transform: translateX(100%);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            @keyframes slideInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </>
      )}
    </>
  );
}
