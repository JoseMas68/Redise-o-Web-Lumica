import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Globe, ShoppingCart, Share2, Building2, Wrench, Users, ArrowRight, CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Diseño Web Esencial",
    tagline: "Webs que impresionan y convierten",
    description: "Ya sea un restaurante, un hotel, una clínica, o cualquier otro negocio, diseñamos páginas web que se adaptan a las necesidades y objetivos de cada sector.",
    features: [
      "Sistemas de reservas intuitivos",
      "Galerías impactantes",
      "Herramientas de gestión de citas",
      "Diseño profesional y funcional"
    ]
  },
  {
    icon: Building2,
    title: "Web Corporativa",
    tagline: "La imagen profesional que tu negocio merece",
    description: "Creamos páginas web completas, diseñadas para transmitir confianza, destacar frente a la competencia y potenciar tu presencia online.",
    features: [
      "Diseño corporativo profesional",
      "Optimizada para conversión",
      "Totalmente responsive",
      "SEO optimizado"
    ]
  },
  {
    icon: ShoppingCart,
    title: "Tiendas Online",
    tagline: "Convierte tus visitas en ventas",
    description: "Lleva tu negocio al siguiente nivel con una tienda online totalmente funcional. Usamos WooCommerce para garantizar seguridad, escalabilidad y facilidad de uso.",
    features: [
      "Diseño personalizado que destaca",
      "Gestión sencilla de productos",
      "Pasarela de pago segura",
      "Sistema de inventario"
    ]
  },
  {
    icon: Share2,
    title: "Gestión de Redes Sociales",
    tagline: "Deja que tus redes hablen por ti",
    description: "Creamos y ejecutamos estrategias en redes sociales para destacar tu negocio y conectar con tu público.",
    features: [
      "Creación de contenido visual y escrito",
      "Gestión integral de publicaciones",
      "Análisis de métricas",
      "Campañas publicitarias efectivas"
    ]
  },
  {
    icon: Wrench,
    title: "Mantenimiento Web Premium",
    tagline: "Cuida tu inversión digital",
    description: "Una página web necesita atención constante para mantenerse rápida, segura y actualizada. Nuestros planes de mantenimiento lo incluyen todo.",
    features: [
      "Actualizaciones periódicas",
      "Soporte técnico en tiempo récord",
      "Monitoreo de seguridad",
      "Backup automático"
    ]
  },
  {
    icon: Users,
    title: "Comunidades de Pago",
    tagline: "Monetiza tu talento y construye comunidad",
    description: "Ayudamos a creadores de contenido, coaches y profesionales a transformar su audiencia en una fuente de ingresos constante.",
    features: [
      "Espacios exclusivos para tu comunidad",
      "Gestión de pagos recurrentes",
      "Experiencia personalizada",
      "Plataforma escalable"
    ]
  }
];

const process = [
  {
    number: "01",
    title: "Contacto inicial",
    description: "Te damos la bienvenida por la vía que prefieras: teléfono, correo o WhatsApp. Aquí escuchamos tus ideas y agendamos una reunión."
  },
  {
    number: "02",
    title: "Primera reunión",
    description: "Hablamos de tu proyecto, necesidades y objetivos. Escuchamos con atención para entender exactamente qué necesitas."
  },
  {
    number: "03",
    title: "Boceto y propuesta",
    description: "Creamos un boceto inicial y una propuesta personalizada con plazos, funcionalidades y presupuesto claro."
  },
  {
    number: "04",
    title: "Desarrollo y diseño",
    description: "Manos a la obra. Diseñamos y desarrollamos tu web siguiendo el plan acordado, con actualizaciones regulares."
  },
  {
    number: "05",
    title: "Revisión y ajustes",
    description: "Te mostramos el resultado y realizamos los ajustes necesarios hasta que quede perfecto."
  },
  {
    number: "06",
    title: "Entrega y formación",
    description: "Entregamos tu web lista para funcionar y te formamos para que puedas gestionarla sin problema."
  }
];

const faqs = [
  {
    question: "¿Qué tipo de webs diseñáis?",
    answer: "Diseñamos todo tipo de páginas web: desde webs corporativas, tiendas online, landing pages, hasta plataformas educativas y comunidades de pago. Cada proyecto es personalizado según las necesidades del cliente."
  },
  {
    question: "¿Puedo gestionar mi web por mí mismo?",
    answer: "¡Por supuesto! Todas nuestras webs están diseñadas para que puedas gestionarlas fácilmente. Además, te damos formación personalizada y soporte continuo para que te sientas cómodo manejando tu página."
  },
  {
    question: "¿Hay permanencia en el mantenimiento?",
    answer: "No, no tenemos permanencia. Nuestros servicios de mantenimiento son flexibles y puedes cancelar cuando quieras. Creemos en ganarnos tu confianza con un buen trabajo, no con contratos obligatorios."
  },
  {
    question: "¿Cómo empiezo?",
    answer: "Es muy sencillo: contáctanos por teléfono, email o WhatsApp, cuéntanos tu proyecto y agendamos una primera reunión. Desde ahí, nos encargamos de todo el proceso."
  },
  {
    question: "¿Qué incluye una web diseñada por Lumicawebdesign?",
    answer: "Incluye diseño personalizado, desarrollo profesional, optimización SEO básica, diseño responsive, certificado SSL, formación para gestionar la web y soporte técnico. Todo lo necesario para que tu web funcione perfectamente."
  }
];

export default function ServiciosPage() {
  return (
    <MainLayout>
      {/* Header */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(252,163,45,0.1),transparent_50%)]" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">NUESTROS SERVICIOS</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)]">
              Soluciones digitales que{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                transforman negocios
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              En Lumica, diseñamos páginas web pensadas para destacar y funcionar. Desde una página básica hasta una tienda online completa.
            </p>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                    index % 2 === 0 ? 'from-primary/20 to-primary/5' : 'from-secondary/20 to-secondary/5'
                  } flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className={`w-7 h-7 ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`} />
                  </div>
                  <CardTitle className="text-xl font-bold mb-2">{service.title}</CardTitle>
                  <p className="text-sm text-muted-foreground italic mb-4">"{service.tagline}"</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                    <Link href="/contacto">
                      Pregúntanos
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4">¿CÓMO TRABAJAMOS?</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              Seguimos un proceso claro y transparente
            </h2>
            <p className="text-muted-foreground">
              Descubre cómo trabajamos para que el diseño de tu página web sea un éxito
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold font-[family-name:var(--font-display)] shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">PREGUNTAS FRECUENTES</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)]">
                Resolvemos tus dudas
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)]">
            ¿Listo para empezar tu proyecto?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Contacta con nosotros y cuéntanos qué necesitas. Te haremos una propuesta personalizada.
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
