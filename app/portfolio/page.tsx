import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";

const projects = [
  {
    name: "Escuela Infantil Llavors",
    url: "https://llavors.net",
    category: "Web Corporativa",
    description: "Un espacio diseñado para reflejar el enfoque único de esta escuela. Web funcional y atractiva, con información clara para familias interesadas en su metodología.",
    features: ["Diseño infantil y acogedor", "Información para padres", "Galería de instalaciones", "Formulario de contacto"],
    image: "/images/projects/llavors.jpg"
  },
  {
    name: "Club de Patinaje Castalia",
    url: "https://clubpaticastalia.org",
    category: "Web Corporativa",
    description: "Una web dinámica para un club deportivo apasionado por la velocidad. Incluye sección de eventos, galería multimedia y noticias actualizadas para sus miembros. Fácil gestión.",
    features: ["Sistema de noticias", "Galería multimedia", "Gestión de miembros", "Diseño deportivo"],
    badge: "Novedad",
    image: "/images/projects/castalia.jpg"
  },
  {
    name: "Deltacaravan",
    url: "https://deltacaravan.es",
    category: "E-commerce",
    description: "Diseño moderno y enfocado en la experiencia del usuario. La web muestra su flota de caravanas, sistema de reservas y guías útiles para los viajeros. Reservas online y pasarela de pago segura.",
    features: ["Catálogo de caravanas", "Sistema de reservas", "Pasarela de pago", "Guías de viaje"],
    image: "/images/projects/deltacaravan.jpg"
  }
];

const demos = [
  {
    name: "Academia Online",
    url: "https://wheat-mandrill-953699.hostingersite.com",
    category: "Plataforma Educativa",
    description: "Diseña, aloja y vende tus cursos con acceso exclusivo para tus alumnos. Ideal para formadores, coaches y creadores de conocimiento.",
    image: "/images/demos/academia.jpg"
  },
  {
    name: "Casa Rural con Reservas",
    url: "https://orangered-mosquito-511924.hostingersite.com",
    category: "Reservas",
    description: "Diseñada para mostrar tu alojamiento con encanto y facilitar las reservas directas, sin comisiones. Ideal para propietarios que quieren más visibilidad.",
    badge: "Novedad",
    image: "/images/demos/casa-rural.jpg"
  },
  {
    name: "Tienda Online",
    url: "https://moccasin-alpaca-196652.hostingersite.com",
    category: "E-commerce",
    description: "Carrito, pasarela de pago y catálogo personalizable. Ideal para marcas, artesanos o emprendedores digitales. Vende sin intermediarios.",
    image: "/images/demos/ecommerce.jpg"
  }
];

export default function PortfolioPage() {
  return (
    <MainLayout>
      {/* Header */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-secondary/10 via-background to-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(3,68,212,0.1),transparent_50%)]" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">NUESTRO TRABAJO</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)]">
              Proyectos que{" "}
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                hablan por nosotros
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Cada proyecto es único y está diseñado con pasión para alcanzar los objetivos de nuestros clientes
            </p>
          </div>
        </div>
      </section>

      {/* Proyectos Realizados */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              Mira lo que ya hemos logrado
            </h2>
            <p className="text-muted-foreground">Proyectos reales de clientes satisfechos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-56 bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
                  {project.badge && (
                    <Badge className="absolute top-4 right-4 z-10">{project.badge}</Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge variant="secondary" className="mb-2">{project.category}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {project.name}
                  </CardTitle>
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    {project.url.replace('https://', '')}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      Ver la web
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demos */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4">DEMOS DISPONIBLES</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              Mira lo que podemos realizar
            </h2>
            <p className="text-muted-foreground">Ejemplos funcionales de diferentes tipos de proyectos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {demos.map((demo, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-56 bg-gradient-to-br from-secondary/20 to-primary/20 overflow-hidden">
                  {demo.badge && (
                    <Badge className="absolute top-4 right-4 z-10 bg-secondary">{demo.badge}</Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge variant="outline" className="mb-2 bg-white/90">{demo.category}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-secondary transition-colors">
                    {demo.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {demo.description}
                  </p>
                  <Button variant="outline" className="w-full group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors" asChild>
                    <a href={demo.url} target="_blank" rel="noopener noreferrer">
                      Ver demo
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-secondary to-primary text-primary-foreground">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)]">
            ¿Quieres ver tu proyecto hacerse realidad?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Cuéntanos tu idea y crearemos algo único para tu negocio
          </p>
          <Button size="lg" variant="secondary" asChild className="shadow-xl">
            <Link href="/contacto">
              Solicita tu presupuesto
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
