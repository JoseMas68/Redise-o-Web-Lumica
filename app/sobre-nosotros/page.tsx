import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Heart, Target, Users, Star, ArrowRight, CheckCircle2 } from "lucide-react";

const values = [
  {
    icon: Users,
    title: "Trato personalizado",
    description: "Cada cliente es único, y sus necesidades también. Nuestro objetivo es adaptarnos a ti, no al revés."
  },
  {
    icon: Target,
    title: "Calidad sin compromisos",
    description: "Desde el diseño hasta los detalles técnicos, ponemos el 200% para que el resultado supere tus expectativas."
  },
  {
    icon: Heart,
    title: "Acompañamiento continuo",
    description: "No solo creamos tu web, te ayudamos a sacarle el máximo partido y estamos contigo en cada paso."
  }
];

const differentiators = [
  "Propiedad total de tu web: Lo que creamos es 100% tuyo. Sin ataduras ni sorpresas.",
  "Diseño hecho a medida: Porque entendemos que cada negocio tiene su propia personalidad.",
  "Nada de plantillas genéricas: Aquí se hace bien o no se hace."
];

export default function SobreNosotrosPage() {
  return (
    <MainLayout>
      {/* Header */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(252,163,45,0.1),transparent_60%)]" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">SOMOS LUMICA</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)]">
              Descubre{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                quiénes somos
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Cada cliente es único para nosotros
            </p>
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge>Nuestra historia</Badge>
              <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)]">
                Una agencia joven con una misión clara
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Somos una agencia joven con una misión clara: <strong className="text-foreground">diseñar páginas web que funcionen, impresionen y ayuden a nuestros clientes a crecer</strong>. Lo que nos diferencia es nuestra obsesión por entregar un trabajo impecable, nuestro trato cercano y personalizado, y nuestra pasión por el diseño.
                </p>
                <p>
                  Queremos que cualquier persona, sin importar el tamaño de su negocio, pueda tener una presencia online de calidad. Diseñamos webs que no solo se ven bien, sino que <strong className="text-foreground">funcionan: convierten, informan y te representan</strong>.
                </p>
                <p>
                  Creemos firmemente que una web es más que un escaparate; es una herramienta para impulsar tu crecimiento.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground text-sm">Imagen del equipo trabajando</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Badge className="mb-4">NUESTRO ENFOQUE</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] mb-4">
              Un equipo dinámico con una clara obsesión: hacer las cosas bien
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all">
                <CardContent className="pt-8 pb-8 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center">Lo que nos hace diferentes</h3>
            <div className="space-y-4">
              {differentiators.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-background">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4">EL EQUIPO</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)]">
              Conoce a quien está detrás de Lumica
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden">
              <div className="relative h-80 bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Foto profesional de José</p>
                </div>
              </div>
              <CardContent className="p-8 text-center space-y-4">
                <div className="flex justify-center">
                  <Avatar className="w-24 h-24 border-4 border-background -mt-16">
                    <AvatarImage src="/images/team/jose.jpg" />
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-secondary text-white">J</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">José</h3>
                  <p className="text-muted-foreground">Fundador & Lead Developer</p>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                  Apasionado por crear experiencias web únicas que ayuden a los negocios a crecer. Con cada proyecto, busco superar las expectativas y entregar soluciones que realmente marquen la diferencia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reseñas */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge className="mb-4">TESTIMONIOS</Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)]">
              Esto es lo que opinan nuestros clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    "Excelente trabajo, muy profesionales y atentos. La web quedó perfecta y el soporte post-entrega es de 10."
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">C{i}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">Cliente satisfecho</p>
                      <p className="text-xs text-muted-foreground">Hace {i} meses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground mb-4">Integración automática de Google Reviews próximamente</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)]">
            ¿Quieres formar parte de nuestros casos de éxito?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Contacta con nosotros y obtén tu presupuesto personalizado
          </p>
          <Button size="lg" variant="secondary" asChild className="shadow-xl">
            <Link href="/contacto">
              Contacta con nosotros
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
