import { MainLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactoPage() {
  return (
    <MainLayout>
      {/* Header */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-secondary/10 via-background to-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(3,68,212,0.1),transparent_50%)]" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">CONTACTO</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)]">
              ¿Tienes un{" "}
              <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                proyecto en mente?
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Nos encanta escuchar nuevas ideas y retos. Escríbenos y juntos crearemos algo increíble para tu negocio.
            </p>
          </div>
        </div>
      </section>

      {/* Formulario y Info */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Formulario */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo *</Label>
                        <Input 
                          id="name" 
                          placeholder="Tu nombre" 
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="tu@email.com" 
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono (opcional)</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="+34 600 000 000" 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Asunto *</Label>
                      <Input 
                        id="subject" 
                        placeholder="¿En qué podemos ayudarte?" 
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Cuéntanos tu proyecto *</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Describe tu proyecto, necesidades o cualquier duda que tengas..."
                        rows={6}
                        required
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="captcha">¿Cuánto es 8 + 8? *</Label>
                        <Input 
                          id="captcha" 
                          type="number" 
                          placeholder="Respuesta" 
                          className="w-24"
                          required
                        />
                      </div>
                    </div>

                    <Button size="lg" className="w-full md:w-auto">
                      Enviar mensaje
                    </Button>

                    <p className="text-sm text-muted-foreground">
                      * Campos obligatorios
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-4">Información de contacto</h3>
                    <div className="space-y-4">
                      <a 
                        href="tel:+34624237696"
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Teléfono</p>
                          <p className="font-semibold group-hover:text-primary transition-colors">624 237 696</p>
                        </div>
                      </a>

                      <a 
                        href="mailto:info@lumicawebdesign.com"
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/20 transition-colors">
                          <Mail className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-semibold group-hover:text-secondary transition-colors break-all">info@lumicawebdesign.com</p>
                        </div>
                      </a>

                      <div className="flex items-start gap-3 p-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Horario</p>
                          <p className="font-semibold">Lunes a Viernes</p>
                          <p className="text-sm text-muted-foreground">9:00 - 18:00</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3">
                        <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Ubicación</p>
                          <p className="font-semibold">Servicio online</p>
                          <p className="text-sm text-muted-foreground">En toda España</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold">¿Prefieres WhatsApp?</h3>
                  <p className="text-sm text-muted-foreground">
                    También puedes contactarnos directamente por WhatsApp para una respuesta más rápida
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="https://wa.me/34624237696" target="_blank" rel="noopener noreferrer">
                      Abrir WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold">Tiempo de respuesta</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nos comprometemos a responder todos los mensajes en un plazo máximo de 24 horas laborables.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa (opcional) */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <Card className="overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="w-12 h-12 mx-auto text-muted-foreground/50" />
                <p className="text-muted-foreground">Mapa de ubicación</p>
                <p className="text-sm text-muted-foreground">Servicio online en toda España</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </MainLayout>
  );
}
