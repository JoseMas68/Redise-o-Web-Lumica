"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale } from "lucide-react";

export default function AvisoLegalPage() {
  return (
    <MainLayout>
      <div className="min-h-screen py-24 md:py-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Scale className="w-3 h-3 mr-2" />
              Legal
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Aviso{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Legal
              </span>
            </h1>
            <p className="text-muted-foreground">
              Información legal del sitio web
            </p>
          </div>

          <Card className="p-8 md:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>1. Datos identificativos</h2>
              <p>
                En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico, se informa:
              </p>
              <ul>
                <li><strong>Denominación social:</strong> Lumica Web Design</li>
                <li><strong>Nombre comercial:</strong> Lumica Web Design</li>
                <li><strong>Email:</strong> info@lumicawebdesign.com</li>
                <li><strong>Teléfono:</strong> +34 624 237 696</li>
                <li><strong>Dirección:</strong> Castellón de la Plana, España</li>
                <li><strong>Sitio web:</strong> web.lumicawebdesign.com</li>
              </ul>

              <h2>2. Objeto</h2>
              <p>
                El presente aviso legal regula el uso y utilización del sitio web web.lumicawebdesign.com, del que es titular Lumica Web Design.
              </p>
              <p>
                La navegación por el sitio web atribuye la condición de usuario del mismo e implica la aceptación plena y sin reservas de todas y cada una de las disposiciones incluidas en este Aviso Legal.
              </p>

              <h2>3. Servicios</h2>
              <p>
                A través de este sitio web, Lumica Web Design ofrece información sobre sus servicios de:
              </p>
              <ul>
                <li>Diseño y desarrollo web personalizado</li>
                <li>Diseño de páginas web corporativas</li>
                <li>Desarrollo de tiendas online y e-commerce</li>
                <li>Gestión de redes sociales</li>
                <li>Mantenimiento y soporte web</li>
                <li>Consultoría digital</li>
              </ul>

              <h2>4. Propiedad intelectual e industrial</h2>
              <p>
                Todos los contenidos del sitio web, incluyendo pero no limitado a textos, fotografías, gráficos, imágenes, iconos, tecnología, software, links y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, son propiedad intelectual de Lumica Web Design, sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación reconocidos por la normativa vigente en materia de propiedad intelectual sobre los mismos.
              </p>
              <p>
                Queda expresamente prohibida la reproducción, distribución, comunicación pública y transformación de los contenidos del sitio web sin autorización expresa de Lumica Web Design.
              </p>

              <h2>5. Responsabilidad</h2>
              <p>
                Lumica Web Design no se hace responsable de:
              </p>
              <ul>
                <li>La continuidad y disponibilidad de los contenidos</li>
                <li>La ausencia de errores en dichos contenidos</li>
                <li>La ausencia de virus y/o demás componentes dañinos</li>
                <li>Los daños que pudieran derivarse del uso de la información del sitio web</li>
                <li>El contenido de las páginas web de terceros a las que se pueda acceder mediante enlaces</li>
              </ul>

              <h2>6. Enlaces (links)</h2>
              <p>
                En el caso de que en el sitio web se dispusiesen enlaces o hipervínculos hacia otros sitios de Internet, Lumica Web Design no ejercerá ningún tipo de control sobre dichos sitios y contenidos.
              </p>
              <p>
                Lumica Web Design no asume ninguna responsabilidad por los contenidos de algún enlace perteneciente a un sitio web ajeno, ni garantiza la disponibilidad técnica, calidad, fiabilidad, exactitud, amplitud, veracidad, validez y constitucionalidad de cualquier material o información contenida en ninguno de dichos hipervínculos.
              </p>

              <h2>7. Protección de datos</h2>
              <p>
                Para conocer cómo tratamos tus datos personales, consulta nuestra{" "}
                <a href="/privacidad" className="text-primary hover:underline">
                  Política de Privacidad
                </a>.
              </p>

              <h2>8. Cookies</h2>
              <p>
                Este sitio web utiliza cookies. Para más información, consulta nuestra{" "}
                <a href="/cookies" className="text-primary hover:underline">
                  Política de Cookies
                </a>.
              </p>

              <h2>9. Legislación aplicable y jurisdicción</h2>
              <p>
                El presente Aviso Legal se rige en todos y cada uno de sus extremos por la ley española.
              </p>
              <p>
                Para la resolución de cualquier controversia que pudiera derivarse del acceso al sitio web, Lumica Web Design y el usuario se someten a los Juzgados y Tribunales de Castellón de la Plana.
              </p>

              <h2>10. Contacto</h2>
              <p>
                Para cualquier consulta relacionada con este aviso legal, puedes contactarnos en:
              </p>
              <ul>
                <li><strong>Email:</strong> <a href="mailto:info@lumicawebdesign.com" className="text-primary hover:underline">info@lumicawebdesign.com</a></li>
                <li><strong>Teléfono:</strong> <a href="tel:+34624237696" className="text-primary hover:underline">+34 624 237 696</a></li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
