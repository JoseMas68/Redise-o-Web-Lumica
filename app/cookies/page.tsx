"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cookie } from "lucide-react";

export default function CookiesPage() {
  return (
    <MainLayout>
      <div className="min-h-screen py-24 md:py-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <Cookie className="w-3 h-3 mr-2" />
              Legal
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              Política de{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Cookies
              </span>
            </h1>
            <p className="text-muted-foreground">
              Información sobre el uso de cookies en este sitio web
            </p>
          </div>

          <Card className="p-8 md:p-12">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2>¿Qué son las cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente y proporcionen información a los propietarios del sitio.
              </p>

              <h2>¿Qué tipos de cookies utilizamos?</h2>
              
              <h3>Cookies técnicas (necesarias)</h3>
              <p>
                Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar. Generalmente se establecen solo en respuesta a acciones realizadas por ti, como establecer tus preferencias de privacidad o iniciar sesión.
              </p>
              <ul>
                <li><strong>Nombre:</strong> theme-preference</li>
                <li><strong>Propósito:</strong> Recordar tu preferencia de tema claro/oscuro</li>
                <li><strong>Duración:</strong> 1 año</li>
                <li><strong>Tipo:</strong> Primera parte</li>
              </ul>

              <h3>Cookies de análisis</h3>
              <p>
                Estas cookies nos permiten contar las visitas y conocer las fuentes de tráfico para poder medir y mejorar el rendimiento de nuestro sitio. Nos ayudan a saber qué páginas son las más y las menos populares.
              </p>
              <ul>
                <li><strong>Proveedor:</strong> Google Analytics (si está implementado)</li>
                <li><strong>Propósito:</strong> Análisis de tráfico y comportamiento de usuarios</li>
                <li><strong>Duración:</strong> Hasta 2 años</li>
                <li><strong>Tipo:</strong> Terceros</li>
              </ul>

              <h3>Cookies de funcionalidad</h3>
              <p>
                Estas cookies permiten que el sitio web proporcione funcionalidad y personalización mejoradas, como recordar tus preferencias.
              </p>

              <h2>¿Cómo gestionar las cookies?</h2>
              <p>
                Puedes controlar y/o eliminar las cookies como desees. Puedes eliminar todas las cookies que ya están en tu ordenador y puedes configurar la mayoría de los navegadores para evitar que se coloquen. Sin embargo, si haces esto, es posible que tengas que ajustar manualmente algunas preferencias cada vez que visites un sitio y que algunos servicios y funcionalidades no funcionen.
              </p>

              <h3>Gestión de cookies por navegador:</h3>
              <ul>
                <li>
                  <strong>Google Chrome:</strong>{" "}
                  <a 
                    href="https://support.google.com/chrome/answer/95647?hl=es" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Configuración de cookies en Chrome
                  </a>
                </li>
                <li>
                  <strong>Mozilla Firefox:</strong>{" "}
                  <a 
                    href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Configuración de cookies en Firefox
                  </a>
                </li>
                <li>
                  <strong>Safari:</strong>{" "}
                  <a 
                    href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Configuración de cookies en Safari
                  </a>
                </li>
                <li>
                  <strong>Microsoft Edge:</strong>{" "}
                  <a 
                    href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Configuración de cookies en Edge
                  </a>
                </li>
              </ul>

              <h2>Cookies de terceros</h2>
              <p>
                Este sitio web puede utilizar servicios de terceros que establecen sus propias cookies, como:
              </p>
              <ul>
                <li><strong>Google Analytics:</strong> Para análisis estadístico del tráfico web</li>
                <li><strong>Google Maps:</strong> Para mostrar mapas y ubicaciones</li>
              </ul>
              <p>
                Estas empresas pueden utilizar cookies propias sujetas a sus propias políticas de privacidad.
              </p>

              <h2>Actualización de la política de cookies</h2>
              <p>
                Lumica Web Design puede actualizar esta Política de Cookies de acuerdo con los requisitos legislativos o reglamentarios, o para adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos.
              </p>
              <p>
                Cuando se produzcan cambios significativos en esta Política de Cookies, se comunicarán a los usuarios mediante aviso informativo en el sitio web.
              </p>

              <h2>Más información</h2>
              <p>
                Para cualquier duda sobre esta política de cookies, puedes contactar con nosotros:
              </p>
              <ul>
                <li><strong>Email:</strong> <a href="mailto:info@lumicawebdesign.com" className="text-primary hover:underline">info@lumicawebdesign.com</a></li>
                <li><strong>Teléfono:</strong> <a href="tel:+34624237696" className="text-primary hover:underline">+34 624 237 696</a></li>
              </ul>
              
              <p>
                Puedes consultar también nuestra{" "}
                <a href="/privacidad" className="text-primary hover:underline">
                  Política de Privacidad
                </a>
                {" "}y nuestro{" "}
                <a href="/aviso-legal" className="text-primary hover:underline">
                  Aviso Legal
                </a>.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
