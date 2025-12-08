"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm border-b" 
        : "bg-transparent"
    }`}>
      <div className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo-web.webp"
            alt="Lumica Web Design"
            width={360}
            height={90}
            priority
            className="h-24 md:h-28 w-auto dark:brightness-0 dark:invert"
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
                  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
              element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
          >
            CONTACTA
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px] p-0">
              {/* Header del menú con botón cerrar personalizado */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold">Menú</h2>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full hover:bg-primary/10 group"
                >
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  <span className="sr-only">Cerrar menú</span>
                </Button>
              </div>
              
              {/* Navegación */}
              <nav className="flex flex-col gap-2 p-6">
                {navigation.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(item.href);
                      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      setIsOpen(false);
                    }}
                    className="text-lg font-medium transition-all hover:text-primary cursor-pointer py-3 px-4 rounded-lg hover:bg-primary/5 group flex items-center justify-between"
                  >
                    {item.name}
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navigation.length * 0.1 }}
                >
                  <Button className="mt-6 w-full" size="lg" onClick={() => {
                    const element = document.querySelector('#contacto');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setIsOpen(false);
                  }}>
                    CONTACTA
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
