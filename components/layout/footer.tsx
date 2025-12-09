"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail } from "lucide-react";

const footerLinks = {
  enlaces: [
    { name: "Inicio", href: "/" },
    { name: "Servicios", href: "/servicios" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Sobre Nosotros", href: "/sobre-nosotros" },
    { name: "Contacto", href: "/contacto" },
  ],
  legal: [
    { name: "Aviso Legal", href: "/aviso-legal" },
    { name: "Política de Privacidad", href: "/politica-privacidad" },
    { name: "Política de Cookies", href: "/politica-cookies" },
  ],
};

export function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* Logo y Descripción */}
          <div className="space-y-4 text-center md:text-left">
            <a href="#inicio" onClick={(e) => handleClick(e, '#inicio')} className="inline-flex items-center space-x-2">
              <Image
                src="/images/logo-web.webp"
                alt="Lumica Web Design"
                width={300}
                height={75}
                className="h-20 w-auto dark:brightness-0 dark:invert"
              />
            </a>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto md:mx-0">
              Diseñamos tu web profesional, rápida y a medida. Tu éxito digital empieza aquí.
            </p>
          </div>

          {/* Enlaces */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-sm font-semibold">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#inicio"
                  onClick={(e) => handleClick(e, '#inicio')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  onClick={(e) => handleClick(e, '#servicios')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  onClick={(e) => handleClick(e, '#portfolio')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#sobre-nosotros"
                  onClick={(e) => handleClick(e, '#sobre-nosotros')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  onClick={(e) => handleClick(e, '#contacto')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-sm font-semibold">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+34624237696"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  +34 624 237 696
                </a>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@lumicawebdesign.com"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  info@lumicawebdesign.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col gap-4 items-center text-center md:flex-row md:items-center md:justify-between">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground order-2 md:order-1">
              © {new Date().getFullYear()} Lumica Web Design. Todos los derechos reservados.
            </p>

            {/* Enlaces Legales */}
            <div className="flex flex-wrap gap-4 justify-center text-sm text-muted-foreground order-1 md:order-2">
              <Link
                href="/aviso-legal"
                className="hover:text-primary transition-colors"
              >
                Aviso Legal
              </Link>
              <span>|</span>
              <Link
                href="/privacidad"
                className="hover:text-primary transition-colors"
              >
                Privacidad
              </Link>
              <span>|</span>
              <Link
                href="/cookies"
                className="hover:text-primary transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
