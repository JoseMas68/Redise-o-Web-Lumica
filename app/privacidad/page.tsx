"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export default function PrivacidadPage() {
  return (
    <MainLayout>
      <div className="min-h-screen py-24 md:py-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Shield className="w-3 h-3 mr-2" />
              Legal
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Política de{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Privacidad
              </span>
            </h1>
            <p className="text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <Card className="p-8 md:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>1. Información que recopilamos</h2>
              <p>
                En Lumica Web Design recopilamos la información que nos proporcionas directamente cuando:
              </p>
              <ul>
                <li>Te pones en contacto con nosotros a través del formulario web</li>
                <li>Nos envías un correo electrónico</li>
                <li>Contratas nuestros servicios</li>
              </ul>
              <p>
                Esta información puede incluir: nombre, dirección de correo electrónico, número de teléfono y cualquier otra información que decidas compartir con nosotros.
              </p>

              <h2>2. Cómo utilizamos tu información</h2>
              <p>
                Utilizamos la información recopilada para:
              </p>
              <ul>
                <li>Responder a tus consultas y solicitudes de información</li>
                <li>Proporcionar y mejorar nuestros servicios</li>
                <li>Enviarte información relevante sobre nuestros servicios (solo si has dado tu consentimiento)</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>

              <h2>3. Base legal para el tratamiento de datos</h2>
              <p>
                Tratamos tus datos personales bajo las siguientes bases legales:
              </p>
              <ul>
                <li><strong>Consentimiento:</strong> Has dado tu consentimiento explícito para el tratamiento de tus datos</li>
                <li><strong>Ejecución de contrato:</strong> El tratamiento es necesario para la prestación de servicios</li>
                <li><strong>Interés legítimo:</strong> Para mejorar nuestros servicios y comunicaciones</li>
              </ul>

              <h2>4. Compartir información</h2>
              <p>
                No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto:
              </p>
              <ul>
                <li>Cuando sea necesario para prestar nuestros servicios (por ejemplo, proveedores de hosting)</li>
                <li>Cuando estemos obligados legalmente a hacerlo</li>
                <li>Con tu consentimiento explícito</li>
              </ul>

              <h2>5. Seguridad de los datos</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tus datos personales contra acceso no autorizado, alteración, divulgación o destrucción.
              </p>

              <h2>6. Tus derechos</h2>
              <p>
                De acuerdo con el RGPD, tienes derecho a:
              </p>
              <ul>
                <li><strong>Acceso:</strong> Solicitar información sobre los datos que tenemos sobre ti</li>
                <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                <li><strong>Supresión:</strong> Solicitar la eliminación de tus datos</li>
                <li><strong>Limitación:</strong> Solicitar la limitación del tratamiento de tus datos</li>
                <li><strong>Portabilidad:</strong> Recibir tus datos en un formato estructurado</li>
                <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos</li>
              </ul>
              <p>
                Para ejercer estos derechos, contacta con nosotros en:{" "}
                <a href="mailto:info@lumicawebdesign.com" className="text-primary hover:underline">
                  info@lumicawebdesign.com
                </a>
              </p>

              <h2>7. Cookies</h2>
              <p>
                Utilizamos cookies para mejorar tu experiencia en nuestro sitio web. Puedes consultar más información en nuestra{" "}
                <a href="/cookies" className="text-primary hover:underline">Política de Cookies</a>.
              </p>

              <h2>8. Retención de datos</h2>
              <p>
                Conservamos tus datos personales solo durante el tiempo necesario para cumplir con los fines para los que fueron recopilados, incluido el cumplimiento de obligaciones legales, contables o de información.
              </p>

              <h2>9. Cambios en esta política</h2>
              <p>
                Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos sobre cambios significativos publicando la nueva política en esta página y actualizando la fecha de "última actualización".
              </p>

              <h2>10. Contacto</h2>
              <p>
                Si tienes preguntas sobre esta política de privacidad, contacta con nosotros:
              </p>
              <ul>
                <li><strong>Email:</strong> <a href="mailto:info@lumicawebdesign.com" className="text-primary hover:underline">info@lumicawebdesign.com</a></li>
                <li><strong>Teléfono:</strong> <a href="tel:+34624237696" className="text-primary hover:underline">+34 624 237 696</a></li>
                <li><strong>Dirección:</strong> Castellón de la Plana, España</li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
