"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Rocket, Zap, Shield, Star, Code2, Smartphone, Store, Share2, Settings, Users, CheckCircle2, Mail, Phone, MapPin, Send, Layers, Palette, LineChart, Globe, ExternalLink, Award, Target, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MainLayout } from "@/components/layout/main-layout";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TechIcon } from "@/components/tech-icons";

// Componente para animaciones al entrar en viewport - optimizado para móvil
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px", amount: 0.1 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: isMobile ? 10 : 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 10 : 30 }}
      transition={{ duration: isMobile ? 0.3 : 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Componente Card con efecto 3D - deshabilitado en móvil para mejor rendimiento
function Card3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = (y - centerY) / 10;
    const rotateYValue = (centerX - x) / 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isMobile ? 'none' : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isMobile ? 'none' : "transform 0.1s ease-out"
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Palabras rotatorias
  const [currentWord, setCurrentWord] = useState(0);
  const rotatingWords = ["impactante", "profesional", "moderna", "única", "perfecta"];

  // Estado del formulario
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    setFormMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus('success');
        setFormMessage(result.message);
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus('error');
        setFormMessage(result.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      setFormStatus('error');
      setFormMessage('Error de conexión. Por favor, inténtalo de nuevo.');
    }

    // Limpiar mensaje después de 5 segundos
    setTimeout(() => {
      setFormStatus('idle');
      setFormMessage('');
    }, 5000);
  };

  const services = [
    {
      icon: Code2,
      title: "Diseño Web Personalizado",
      description: "Webs únicas que reflejan tu marca y se adaptan a todos los dispositivos",
      color: "from-orange-500 to-primary"
    },
    {
      icon: Smartphone,
      title: "Web Corporativa",
      description: "Presencia profesional con diseño elegante y funcional para tu empresa",
      color: "from-blue-500 to-secondary"
    },
    {
      icon: Store,
      title: "Tiendas Online",
      description: "E-commerce completo con pasarela de pago y gestión de productos",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Share2,
      title: "Gestión RRSS",
      description: "Estrategia y contenido para redes sociales que generan engagement",
      color: "from-pink-500 to-rose-600"
    },
    {
      icon: Settings,
      title: "Mantenimiento Web",
      description: "Actualizaciones, backups y soporte técnico continuo",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Users,
      title: "Comunidades Online",
      description: "Plataformas para gestionar y hacer crecer tu comunidad digital",
      color: "from-cyan-500 to-blue-600"
    }
  ];

  const projects = [
    {
      title: "Llavors.net",
      description: "Escuela infantil consciente con pedagogía respetuosa y diseño cálido",
      image: "/images/mockup-llavors.png",
      tags: ["Educación", "Infantil", "WordPress"],
      link: "https://llavors.net/"
    },
    {
      title: "Club Pati Castalia",
      description: "Web corporativa moderna para club deportivo",
      image: "/images/mockup-castalia.png",
      tags: ["Corporativa", "Deportes", "Responsive"],
      link: "https://clubpaticastalia.org/"
    },
    {
      title: "Delta Caravan",
      description: "Catálogo online de caravanas con búsqueda avanzada",
      image: "/images/mockup-deltacaravan.png",
      tags: ["Catálogo", "Automoción", "SEO"],
      link: "https://deltacaravan.es/"
    }
  ];

  const values = [
    {
      icon: Rocket,
      title: "Innovación Constante",
      description: "Utilizamos las últimas tecnologías y tendencias en diseño web"
    },
    {
      icon: Award,
      title: "Calidad Premium",
      description: "Cada proyecto recibe atención al detalle y acabados profesionales"
    },
    {
      icon: Heart,
      title: "Pasión por el Diseño",
      description: "Amamos lo que hacemos y se nota en cada pixel"
    }
  ];

  const faqs = [
    {
      question: "¿Cuánto tiempo tarda en estar lista mi web?",
      answer: "Depende de la complejidad del proyecto. Una web corporativa básica puede estar lista en 2-3 semanas, mientras que un e-commerce completo puede tomar 4-6 semanas. Siempre trabajamos con plazos claros y entregas parciales."
    },
    {
      question: "¿Qué incluye el servicio de diseño web?",
      answer: "Incluye diseño personalizado, desarrollo responsive, optimización SEO básica, integración con Google Analytics, formularios de contacto, galería de imágenes, y 1 mes de soporte post-lanzamiento. También incluimos hosting el primer año."
    },
    {
      question: "¿Puedo actualizar mi web yo mismo?",
      answer: "¡Sí! Te proporcionamos un panel de administración intuitivo y te damos formación para que puedas hacer cambios básicos. Para actualizaciones más complejas, ofrecemos servicio de mantenimiento mensual."
    },
    {
      question: "¿Qué pasa si no me gusta el diseño inicial?",
      answer: "Hacemos hasta 3 rondas de revisiones incluidas en el precio. Trabajamos contigo hasta que estés 100% satisfecho con el resultado. Tu feedback es esencial en nuestro proceso."
    },
    {
      question: "¿Ofrecen servicio de posicionamiento SEO?",
      answer: "Sí, todas nuestras webs vienen con SEO básico optimizado (meta tags, sitemap, velocidad). Para estrategias SEO avanzadas y posicionamiento continuo, ofrecemos planes mensuales personalizados."
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section with Parallax */}
      <section id="inicio" ref={heroRef} className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-20 pb-12 md:pb-0">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <motion.div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(252, 163, 45, 0.12) 0%, transparent 50%)",
            scale: heroScale
          }}
        />

        {/* Animated gradient mesh - móvil mejorado */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 20% 30%, rgba(252, 163, 45, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.1) 0%, transparent 40%)"
          }}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Floating elements - adaptado para móvil */}
        <motion.div
          className="absolute top-20 left-5 w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full blur-xl"
          animate={{ y: [0, -15, 0], x: [0, 8, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-5 w-24 h-24 md:w-32 md:h-32 bg-secondary/10 rounded-full blur-xl"
          animate={{ y: [0, 15, 0], x: [0, -8, 0], scale: [1, 0.9, 1] }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 md:w-48 md:h-48 bg-blue-500/5 rounded-full blur-3xl hidden sm:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div 
          className="container relative z-10 mx-auto px-4"
          style={{ opacity: heroOpacity }}
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
            {/* Left side - Text content */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="secondary" className="text-xs md:text-sm px-4 md:px-6 py-1.5 md:py-2 shadow-lg">
                  <Rocket className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                  Diseño Web Profesional
                </Badge>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.1]">
                  Tu web{" "}
                  <div className="inline-block min-w-[200px] sm:min-w-[240px] md:min-w-[280px] lg:min-w-[320px]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentWord}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block bg-gradient-to-r from-primary via-orange-400 to-secondary bg-clip-text text-transparent"
                      >
                        {rotatingWords[currentWord]}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>
                  empieza aquí
                </h1>
              </motion.div>

              <motion.p
                className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 px-4 sm:px-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                Diseño moderno, desarrollo profesional y resultados reales. Creamos experiencias digitales que convierten visitantes en clientes.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start items-stretch sm:items-center px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <Button asChild size="lg" className="text-base md:text-lg px-6 md:px-10 py-6 md:py-7 shadow-2xl hover:shadow-primary/50 transition-all group hover:scale-105 w-full sm:w-auto">
                  <a href="#contacto" onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    Empieza tu proyecto
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-2 transition-transform" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base md:text-lg px-6 md:px-10 py-6 md:py-7 hover:scale-105 transition-transform w-full sm:w-auto">
                  <a href="#portfolio" onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
                  }}>Ver Trabajos</a>
                </Button>
              </motion.div>

              {/* Stats con animación mejorada */}
              <motion.div
                className="grid grid-cols-3 gap-3 md:gap-6 pt-6 md:pt-8 max-w-md md:max-w-lg mx-auto lg:mx-0 px-4 sm:px-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.8 }}
              >
                {[
                  { number: "50+", label: "Proyectos" },
                  { number: "100%", label: "Satisfacción" },
                  { number: "24/7", label: "Soporte" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="text-center p-3 md:p-4 rounded-xl bg-primary/5 backdrop-blur-sm border border-primary/10 hover:border-primary/30 transition-all"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(252, 163, 45, 0.15)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-0.5 md:mb-1">
                      {stat.number}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Feature highlights - móvil mejorado */}
              <motion.div
                className="flex flex-wrap gap-2 md:gap-3 pt-6 md:pt-8 justify-center lg:justify-start px-4 sm:px-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1 }}
              >
                {["Diseño Responsivo", "SEO Optimizado", "Rápido", "Seguro"].map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 bg-primary/10 rounded-full text-xs md:text-sm font-semibold text-primary border border-primary/20"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(252, 163, 45, 0.2)" }}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    {feature}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right side - Interactive Illustration */}
            <motion.div
              className="relative w-full flex items-center justify-center px-4 sm:px-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-full max-w-md lg:max-w-lg">
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/10 to-blue-500/10 blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />

                {/* Main visual content - Browser mockup mejorado */}
                <motion.div
                  className="relative bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Browser bar */}
                  <div className="bg-muted/50 backdrop-blur-sm border-b border-border px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-2">
                      <motion.div className="w-3 h-3 rounded-full bg-red-500" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                      <motion.div className="w-3 h-3 rounded-full bg-yellow-500" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.2 }} />
                      <motion.div className="w-3 h-3 rounded-full bg-green-500" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} />
                    </div>
                    <div className="flex-1 bg-background/50 rounded px-3 py-1 text-xs text-muted-foreground ml-4 font-mono">
                      lumica.design
                    </div>
                  </div>
                  
                  {/* Content con animaciones */}
                  <div className="p-6 sm:p-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5 min-h-[280px] sm:min-h-[320px] flex flex-col justify-between">
                    <div className="space-y-4">
                      <motion.div
                        className="h-8 bg-gradient-to-r from-primary/40 to-secondary/40 rounded-lg w-3/4"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="h-4 bg-muted rounded w-full"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="h-4 bg-muted rounded w-5/6"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                    
                    {/* Interactive elements grid */}
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      {[
                        { icon: Code2, color: "from-blue-500 to-blue-600" },
                        { icon: Palette, color: "from-pink-500 to-rose-600" },
                        { icon: Zap, color: "from-yellow-500 to-orange-600" }
                      ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={i}
                            className={`aspect-square bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center shadow-lg`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            animate={{ y: [0, -8, 0] }}
                            transition={{ y: { duration: 3 + i, repeat: Infinity } }}
                          >
                            <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>

                {/* Floating feature badges */}
                <motion.div
                  className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-card border-2 border-primary/50 rounded-2xl px-3 md:px-4 py-2 shadow-xl"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    <span className="text-xs md:text-sm font-semibold">Rápido</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-card border-2 border-secondary/50 rounded-2xl px-3 md:px-4 py-2 shadow-xl"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-secondary" />
                    <span className="text-sm font-semibold">Seguro</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator - solo desktop */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-3 bg-primary rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">Nuestros Servicios</Badge>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Todo lo que necesitas para{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                brillar online
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Soluciones digitales completas adaptadas a tu negocio
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <Card3D className="h-full">
                  <Card className="h-full border-2 hover:border-primary/50 transition-all hover:shadow-2xl group">
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} p-4 mb-6 group-hover:scale-110 transition-transform`}>
                        <service.icon className="w-full h-full text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </Card3D>
              </AnimatedSection>
            ))}
          </div>

          {/* Process */}
          <AnimatedSection className="mt-24">
            <div className="max-w-5xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-center mb-16">
                Nuestro proceso de trabajo
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { step: "01", title: "Consulta", desc: "Analizamos tus necesidades y objetivos" },
                  { step: "02", title: "Diseño", desc: "Creamos mockups y prototipos visuales" },
                  { step: "03", title: "Desarrollo", desc: "Construimos tu web con las mejores tecnologías" },
                  { step: "04", title: "Pruebas", desc: "Testing exhaustivo en todos los dispositivos" },
                  { step: "05", title: "Lanzamiento", desc: "Publicamos y optimizamos tu web" },
                  { step: "06", title: "Soporte", desc: "Te acompañamos después del lanzamiento" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="relative p-6 rounded-2xl hover:bg-muted/50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-7xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent mb-3">{item.step}</div>
                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">Portfolio</Badge>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Proyectos que{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                inspiran
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Descubre algunos de nuestros trabajos más recientes
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <AnimatedSection key={index} delay={index * 0.15}>
                <Card3D className="h-full">
                  <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-all group hover:shadow-2xl">
                    <div className="relative h-64 bg-muted overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      <Badge className="absolute top-4 right-4 bg-primary shadow-lg">Novedad</Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full group/btn" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          Ver proyecto
                          <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </Card3D>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-nosotros" className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto items-center">
            <AnimatedSection>
              <Badge variant="outline" className="mb-4">Sobre Nosotros</Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Convertimos ideas en{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  experiencias digitales
                </span>
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  En <strong className="text-foreground">Lumica Web Design</strong>, creemos que cada negocio merece una presencia digital única y memorable. Con años de experiencia en diseño web y desarrollo, hemos ayudado a decenas de empresas a destacar en el mundo digital.
                </p>
                <p>
                  Nuestro enfoque combina creatividad, tecnología y estrategia para crear sitios web que no solo se ven increíbles, sino que también funcionan perfectamente y generan resultados reales.
                </p>
              </div>

              {/* Values */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {values.map((value, i) => (
                  <motion.div
                    key={i}
                    className="text-center"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-bold mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                <motion.div
                  className="relative rounded-3xl overflow-hidden shadow-2xl group/main"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                    <Image
                      src="/images/jose-main-color.jpg"
                      alt="José - Fundador de Lumica Web Design"
                      fill
                      className="object-cover grayscale group-hover/main:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </motion.div>
                
                {/* Decorative elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
              </div>
            </AnimatedSection>
          </div>

          {/* Team */}
          <AnimatedSection className="mt-24 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Conoce al equipo</h3>
              <p className="text-muted-foreground text-lg">
                Profesionales apasionados por el diseño y el desarrollo web
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* José */}
              <AnimatedSection delay={0.1}>
                <Card className="p-6 border-2 hover:border-primary/50 transition-all hover:shadow-xl group h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all">
                      <Image
                        src="/images/jose-team.jpg"
                        alt="José"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-1">José</h4>
                      <p className="text-primary font-semibold mb-3">Desarrollador Web & Arquitecto de Software</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Especialista en desarrollo full-stack y arquitectura de sistemas. Creador de soluciones web escalables y eficientes.
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>

              {/* Diana */}
              <AnimatedSection delay={0.2}>
                <Card className="p-6 border-2 hover:border-primary/50 transition-all hover:shadow-xl group h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-secondary/20 group-hover:ring-secondary/40 transition-all bg-gradient-to-br from-primary/10 to-secondary/10">
                      <Image
                        src="/images/diana-avatar.svg"
                        alt="Diana"
                        fill
                        className="object-cover p-2"
                      />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-1">Diana</h4>
                      <p className="text-secondary font-semibold mb-3">Diseñadora UX/UI & Social Media Manager</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Experta en experiencia de usuario y gestión de redes sociales. Crea diseños intuitivos y estrategias que conectan con la audiencia.
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>

              {/* Nala */}
              <AnimatedSection delay={0.3}>
                <Card className="p-6 border-2 hover:border-primary/50 transition-all hover:shadow-xl group h-full">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-orange-400/20 group-hover:ring-orange-400/40 transition-all">
                      <Image
                        src="/images/nala.jpg"
                        alt="Nala"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-1">Nala 🐱</h4>
                      <p className="text-orange-500 font-semibold mb-3">Chief Happiness Officer</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Supervisora oficial del equipo. Experta en breaks, motivación y mantener el ambiente de trabajo relajado.
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>

        {/* Tech Stack Section */}
        <div className="container mx-auto px-4 mt-32 mb-32">
          <AnimatedSection className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Tecnologías</Badge>
            <h3 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Stack tecnológico{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                profesional
              </span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              Las herramientas más modernas y confiables del mercado para garantizar calidad y rendimiento
            </p>
          </AnimatedSection>

          <div className="grid gap-12 max-w-7xl mx-auto">
            {/* Desarrollo Web */}
            <AnimatedSection>
              <Card className="p-10 border-2 border-primary/10 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                    <Code2 className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-2xl font-bold">Desarrollo Frontend</h4>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                  {[
                    { name: 'WordPress', key: 'wordpress' as const },
                    { name: 'React', key: 'react' as const },
                    { name: 'Next.js', key: 'nextjs' as const },
                    { name: 'Angular', key: 'angular' as const },
                    { name: 'Node.js', key: 'nodejs' as const },
                    { name: 'TypeScript', key: 'typescript' as const },
                  ].map((tech) => (
                    <AnimatedSection key={tech.name} delay={0.05}>
                      <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-primary/5 transition-all duration-300 group/tech cursor-pointer">
                        <div className="w-14 h-14 rounded-lg overflow-hidden shadow-md group-hover/tech:shadow-lg transition-all group-hover/tech:scale-110">
                          <TechIcon name={tech.key} className="w-full h-full" />
                        </div>
                        <span className="text-sm font-semibold text-center text-foreground group-hover/tech:text-primary transition-colors">{tech.name}</span>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </Card>
            </AnimatedSection>

            {/* Backend & Bases de Datos */}
            <AnimatedSection delay={0.1}>
              <Card className="p-10 border-2 border-secondary/10 hover:border-secondary/50 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg group-hover:from-secondary/30 group-hover:to-secondary/20 transition-all">
                    <Layers className="w-6 h-6 text-secondary" />
                  </div>
                  <h4 className="text-2xl font-bold">Backend & Datos</h4>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                  {[
                    { name: 'Python', key: 'python' as const },
                    { name: 'PHP', key: 'php' as const },
                    { name: 'MySQL', key: 'mysql' as const },
                    { name: 'PostgreSQL', key: 'postgresql' as const },
                    { name: 'MongoDB', key: 'mongodb' as const },
                    { name: 'Firebase', key: 'firebase' as const },
                  ].map((tech) => (
                    <AnimatedSection key={tech.name} delay={0.05}>
                      <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-secondary/5 transition-all duration-300 group/tech cursor-pointer">
                        <div className="w-14 h-14 rounded-lg overflow-hidden shadow-md group-hover/tech:shadow-lg transition-all group-hover/tech:scale-110">
                          <TechIcon name={tech.key} className="w-full h-full" />
                        </div>
                        <span className="text-sm font-semibold text-center text-foreground group-hover/tech:text-secondary transition-colors">{tech.name}</span>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </Card>
            </AnimatedSection>

            {/* Diseño & Creatividad */}
            <AnimatedSection delay={0.2}>
              <Card className="p-10 border-2 border-primary/10 hover:border-primary/50 hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                    <Palette className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-2xl font-bold">Diseño & Creatividad</h4>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
                  {[
                    { name: 'Figma', key: 'figma' as const },
                    { name: 'Canva', key: 'canva' as const },
                    { name: 'Adobe XD', key: 'adobexd' as const },
                    { name: 'Photoshop', key: 'photoshop' as const },
                    { name: 'Illustrator', key: 'illustrator' as const },
                    { name: 'Premiere', key: 'premiere' as const },
                  ].map((tech) => (
                    <AnimatedSection key={tech.name} delay={0.05}>
                      <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-primary/5 transition-all duration-300 group/tech cursor-pointer">
                        <div className="w-14 h-14 rounded-lg overflow-hidden shadow-md group-hover/tech:shadow-lg transition-all group-hover/tech:scale-110">
                          <TechIcon name={tech.key} className="w-full h-full" />
                        </div>
                        <span className="text-sm font-semibold text-center text-foreground group-hover/tech:text-primary transition-colors">{tech.name}</span>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>

        {/* Google Reviews Section */}
        <div className="container mx-auto px-4 mt-24">
          <AnimatedSection className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Opiniones</Badge>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Lo que dicen{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                nuestros clientes
              </span>
            </h3>
            <p className="text-muted-foreground text-lg">
              Reseñas reales de Google Business
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Review 1 - Delta Caravan */}
            <AnimatedSection delay={0.1}>
              <Card className="p-6 border-2 hover:border-primary/50 transition-all hover:shadow-xl h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                    D
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">Delta Caravan</h4>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  "¡Excelente experiencia con Lumnica Web Design! Desde el primer momento, su equipo mostró profesionalismo, creatividad y dedicación en cada detalle del proyecto."
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Google</span>
                </div>
              </Card>
            </AnimatedSection>

            {/* Review 2 - CastellonSpain Roller Marathons */}
            <AnimatedSection delay={0.2}>
              <Card className="p-6 border-2 hover:border-primary/50 transition-all hover:shadow-xl h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                    C
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">CastellonSpain Roller</h4>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  "Nos ha diseñado una web muy dinámica, visual, práctica y fácil de navegar por ella. La atención ante cada duda ha sido de 10. Muy contentos con el resultado. ¡Gracias!"
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Google</span>
                </div>
              </Card>
            </AnimatedSection>

            {/* Review 3 - Mayte Martinez */}
            <AnimatedSection delay={0.3}>
              <Card className="p-6 border-2 hover:border-primary/50 transition-all hover:shadow-xl h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                    M
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">Mayte Martínez</h4>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  "Mejor elección imposible, desde el primer momento supo captar mi esencia y se adaptó a mis necesidades. Pude hacer todos los cambios que quise con total flexibilidad."
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Google</span>
                </div>
              </Card>
            </AnimatedSection>
          </div>

          {/* Link to all reviews */}
          <AnimatedSection delay={0.4} className="text-center mt-8">
            <Button variant="outline" asChild>
              <a href="https://www.google.com/maps/search/Lumica+diseño+web" target="_blank" rel="noopener noreferrer">
                Ver todas las reseñas en Google
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">FAQs</Badge>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Preguntas{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                frecuentes
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Resolvemos tus dudas sobre nuestros servicios
            </p>
          </AnimatedSection>

          <AnimatedSection className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border-2 rounded-lg px-6 hover:border-primary/50 transition-colors"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4">Contacto</Badge>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              ¿Listo para empezar{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                tu proyecto?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Cuéntanos tu idea y la haremos realidad
            </p>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <AnimatedSection>
              <Card className="p-8 border-2">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre *</Label>
                      <Input id="name" name="name" placeholder="Tu nombre" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+34 600 000 000" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje *</Label>
                    <Textarea 
                      id="message"
                      name="message" 
                      placeholder="Cuéntanos sobre tu proyecto..." 
                      rows={6}
                      required 
                    />
                  </div>

                  {formMessage && (
                    <div className={`p-4 rounded-lg ${
                      formStatus === 'success' 
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800' 
                        : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
                    }`}>
                      {formMessage}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full group" 
                    disabled={formStatus === 'sending'}
                  >
                    {formStatus === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </Card>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-6">
                <Card className="p-8 border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-400 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Teléfono</h3>
                      <a href="tel:+34624237696" className="text-primary hover:underline text-lg">
                        +34 624 237 696
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Lun-Vie 9:00-19:00</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Email</h3>
                      <a href="mailto:info@lumicawebdesign.com" className="text-primary hover:underline text-lg">
                        info@lumicawebdesign.com
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">Respuesta en 24h</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Ubicación</h3>
                      <p className="text-muted-foreground">
                        Vila-real, Castellón
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">Trabajamos remoto en toda España</p>
                    </div>
                  </div>
                </Card>

                {/* WhatsApp Button */}
                <Button 
                  size="lg" 
                  className="w-full bg-green-600 hover:bg-green-700 group"
                  asChild
                >
                  <a href="https://wa.me/34624237696" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Chatea por WhatsApp
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-muted/50">
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection className="text-center max-w-4xl mx-auto">
            <motion.div
              className="absolute inset-0 -z-10"
              style={{
                background: "radial-gradient(circle at 50% 50%, oklch(0.77 0.15 65 / 0.1) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <Badge variant="outline" className="mb-6 text-lg px-6 py-2">
              <Star className="w-5 h-5 mr-2 text-primary" />
              Empieza hoy
            </Badge>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
              ¿Preparado para{" "}
              <span className="bg-gradient-to-r from-primary via-orange-400 to-secondary bg-clip-text text-transparent">
                destacar online?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
              Juntos crearemos la web perfecta para tu negocio. Sin compromisos, sin letras pequeñas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild 
                size="lg" 
                className="text-lg px-10 py-7 shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all group"
              >
                <a href="#contacto" onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Solicitar presupuesto gratuito
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </a>
              </Button>
              
              <Button 
                asChild 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-7 hover:scale-105 transition-all"
              >
                <a href="tel:+34624237696">
                  <Phone className="mr-2 h-5 w-5" />
                  Llamar ahora
                </a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 pt-12 border-t flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Respuesta en 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Sin compromiso</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Presupuesto personalizado</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </MainLayout>
  );
}
