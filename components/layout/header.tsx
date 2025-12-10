"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
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
            src="/logo_light.png"
            alt="Lumica Web Design"
            width={360}
            height={90}
            priority
            className="h-24 md:h-28 w-auto hidden dark:inline-block"
          />
          <Image
            src="/logo_dark.png"
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

      {/* Menu móvil custom - fixed, independiente del scroll */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-[98] md:hidden"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel del menú */}
          <div className="fixed top-0 right-0 bottom-0 w-[320px] bg-white dark:bg-black z-[101] md:hidden shadow-2xl border-l">
            {/* Header del menú */}
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white dark:bg-black">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Menú
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Contenedor con scroll */}
            <div className="overflow-y-auto p-6 bg-white dark:bg-black" style={{ height: 'calc(100vh - 88px)' }}>
              {/* Botones de navegación */}
              <nav className="flex flex-col gap-3">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="text-lg font-medium text-foreground bg-gray-50 dark:bg-black text-left transition-all hover:text-primary hover:bg-primary/10 cursor-pointer py-4 px-5 rounded-xl active:bg-primary/20 group flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                ))}

                {/* Separador */}
                <div className="my-4 border-t" />

                {/* Botón CTA */}
                <Button
                  className="w-full py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                  onClick={() => handleNavClick('#contacto')}
                >
                  CONTACTA CON NOSOTROS
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
