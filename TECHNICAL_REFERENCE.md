# 📚 Referencias Técnicas - Lumica Web Design

## Stack Tecnológico Completo

### Frontend

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| **Next.js** | 16.0.7 | Framework React con SSG/SSR |
| **React** | 19.2.0 | Librería UI |
| **TypeScript** | 5 | Type safety |
| **Tailwind CSS** | 4 | Utilidad CSS |
| **Framer Motion** | 12.23.25 | Animaciones avanzadas |
| **Radix UI** | 1.11.0 | Componentes accesibles |
| **PostCSS** | Latest | Procesamiento CSS |

### Backend

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| **Node.js** | 18+ | Runtime JavaScript |
| **Nodemailer** | 7.0.11 | Envío de emails |
| **Next.js API Routes** | 16.0.7 | Endpoints API |

### DevOps & Infraestructura

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| **PM2** | Latest | Process manager |
| **Nginx** | 1.24.0 | Reverse proxy |
| **Ubuntu** | 20.04 LTS | OS servidor |
| **Let's Encrypt** | Latest | SSL/TLS certificates |
| **Docker** | Optional | Containerization |

### Herramientas de Desarrollo

| Herramienta | Propósito |
|------------|----------|
| **ESLint** | Linting |
| **Prettier** | Formatting |
| **Git** | Control de versiones |
| **GitHub** | Repositorio remoto |

---

## Estructura de Carpetas

```
lumicaweb/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # 📧 Email endpoint
│   ├── page.tsx                  # 🏠 Homepage
│   ├── layout.tsx                # 📐 Layout principal
│   ├── globals.css               # 🎨 Estilos globales
│   └── favicon.ico
│
├── components/
│   ├── ui/
│   │   ├── scroll-area.tsx       # Scroll personalizado
│   │   └── select.tsx            # Select customizado
│   ├── layout/
│   │   └── header.tsx            # 🧭 Navegación
│   ├── tech-icons.tsx            # 🔧 Stack de tecnologías
│   └── [otros componentes]
│
├── public/
│   ├── logo_light.png            # Logo modo claro
│   ├── logo_dark.png             # Logo modo oscuro
│   └── imagenes/
│
├── styles/                        # Archivos de estilos
│
├── lib/
│   └── [utilidades]
│
├── .env.local                     # Variables de entorno
├── package.json                   # Dependencias
├── tsconfig.json                  # Configuración TS
├── next.config.js                 # Configuración Next.js
├── tailwind.config.ts             # Configuración Tailwind
├── postcss.config.js              # Configuración PostCSS
│
├── SECURITY.md                    # 🔒 Documentación de seguridad
├── DEPLOYMENT.md                  # 🚀 Guía de despliegue
└── README.md                      # 📖 Documentación

```

---

## Variables de Entorno (.env.local)

```bash
# SMTP Configuration
SMTP_HOST=smtp.gmail.com           # Servidor SMTP
SMTP_PORT=587                      # Puerto (587 para TLS, 465 para SSL)
SMTP_USER=correo@gmail.com         # Correo Gmail
SMTP_PASS=contraseña_app           # Contraseña de aplicación
CONTACT_EMAIL=destino@gmail.com    # Donde llegan los emails

# Opcional
NODE_ENV=production                # Entorno
PORT=3000                          # Puerto local
```

---

## Rutas del Aplicativo

### Rutas Estáticas (Pre-renderizadas)

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `app/page.tsx` | Página principal |
| `/privacidad` | `app/privacidad/page.tsx` | Política de privacidad |
| `/aviso-legal` | `app/aviso-legal/page.tsx` | Aviso legal |
| `/cookies` | `app/cookies/page.tsx` | Política de cookies |

### Rutas Dinámicas (API)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/contact` | Enviar formulario de contacto |
| `GET` | `/api/health` | Verificar estado del servidor (opcional) |

---

## Funciones de Seguridad

### Input Validation (`app/api/contact/route.ts`)

```typescript
// Sanitización de entrada
sanitizeInput(input, maxLength)
  └─ Elimina caracteres HTML < >
  └─ Limpia espacios en blanco
  └─ Valida longitud máxima

// Validación de email
isValidEmail(email)
  └─ Valida formato RFC 5322 simplificado
  └─ Verifica dominio existe (básico)

// Validación de teléfono
isValidPhone(phone)
  └─ Patrón: 7-20 caracteres
  └─ Permite dígitos, espacios, signos (+, -, .)

// Validación de extensión
isValidExtension(extension)
  └─ Solo permite .png, .jpg, .jpeg, .webp
  └─ Máximo 5MB
```

### SMTP Security

```typescript
// Configuración por puerto
SMTP_PORT = 587 → nodemailer.createTransport({
  secure: false,
  requireTLS: true
});

SMTP_PORT = 465 → nodemailer.createTransport({
  secure: true
});

// Verificación de certificados
rejectUnauthorized: true  // Rechaza certificados inválidos
```

### Headers de Seguridad (Nginx)

```
Strict-Transport-Security: max-age=31536000
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

---

## Comandos Más Utilizados

### Desarrollo Local

```bash
# Instalación
npm install

# Desarrollo con hot reload
npm run dev
# Acceso: http://localhost:3000

# Build producción
npm run build

# Iniciar servidor build
npm start

# Lint código
npm run lint

# Format código
npm run format
```

### Git Workflow

```bash
# Estado del repositorio
git status

# Ver cambios
git diff

# Agregar cambios
git add .
git add archivo.ts           # archivo específico

# Commit
git commit -m "🎉 Mensaje descriptivo"

# Push a GitHub
git push origin master

# Pull actualizaciones
git pull origin master

# Ver historial
git log --oneline

# Crear rama
git checkout -b feature/nueva-rama

# Cambiar rama
git checkout master
```

### VPS Management

```bash
# Conexión SSH
ssh root@207.180.203.22

# Descargar actualizaciones
git pull origin master

# Instalar dependencias
npm install

# Compilar proyecto
npm run build

# Gestión PM2
pm2 status                    # Ver estado
pm2 logs lumicaweb           # Ver logs
pm2 restart lumicaweb        # Reiniciar
pm2 stop lumicaweb           # Parar
pm2 delete lumicaweb         # Eliminar

# Verificar conectividad
curl https://web.lumicawebdesign.com

# Ver tamaño de carpeta
du -sh /var/www/lumicaweb

# Espacio disponible
df -h
```

### Security & Auditing

```bash
# Auditoría de seguridad npm
npm audit

# Auditoría solo producción
npm audit --production

# Arreglar vulnerabilidades automáticamente
npm audit fix

# Arreglar force (puede romper compatibilidad)
npm audit fix --force

# Check seguridad SSL
echo | openssl s_client -servername web.lumicawebdesign.com -connect web.lumicawebdesign.com:443 2>/dev/null | openssl x509 -noout -dates

# Renovar certificado SSL
sudo certbot renew --force-renewal -v
```

---

## Performance Metrics

### Build Performance

| Métrica | Valor | Estado |
|---------|-------|--------|
| Build Time Local | ~47s | ⚠️ Normal |
| Build Time VPS | ~25.9s | ✅ Optimizado |
| Pages Pre-rendered | 12/12 | ✅ Completo |
| TypeScript Errors | 0 | ✅ Clean |

### Runtime Performance

| Métrica | Valor | Estado |
|---------|-------|--------|
| Memory Usage | ~23.1MB | ✅ Óptimo |
| Uptime | >99% | ✅ Estable |
| Response Time | <200ms | ✅ Rápido |
| CSS Bundle Size | <50KB | ✅ Comprimido |

### Security Metrics

| Métrica | Valor | Estado |
|---------|-------|--------|
| npm Vulnerabilities | 0 | ✅ Limpio |
| Nodemailer | 7.0.11 | ✅ Actualizado |
| SSL Grade | A+ | ✅ Excelente |
| HTTPS | Enabled | ✅ Activo |

---

## Validation Rules

### Formulario de Contacto

```
nombre:
  - Tipo: String
  - Min: 2 caracteres
  - Max: 100 caracteres
  - Sanitización: Si (< > removidos)

email:
  - Tipo: String
  - Patrón: RFC 5322 simplificado
  - Validación: Dominio
  - Sanitización: Si

teléfono:
  - Tipo: String (opcional)
  - Patrón: 7-20 caracteres (dígitos, espacios, +, -, .)
  - Sanitización: Si

mensaje:
  - Tipo: String
  - Min: 10 caracteres
  - Max: 5000 caracteres
  - Sanitización: Si

archivo:
  - Tipo: File (opcional)
  - Extensiones: .png, .jpg, .jpeg, .webp
  - Max Size: 5MB
  - Validación: MIME type
```

---

## Archivos Configuración

### `next.config.js`

```javascript
// Configuraciones:
- swcMinify: true              // SWC minification
- compress: true               // Gzip compression
- poweredByHeader: false       // Oculta versión Next.js
- reactStrictMode: true        // Detecta problemas React
- images.unoptimized: true     // Para desarrollo
- logging: detailed            // Logs detallados
```

### `tailwind.config.ts`

```typescript
// Tree-shaking configurado
// Purge: app/**/*.{js,ts,jsx,tsx,mdx}
// Theme personalizado con colores corporativos
// Plugins: Radix UI compatible
```

### `postcss.config.js`

```javascript
// Plugins:
- tailwindcss                  // CSS utilities
- autoprefixer                 // Prefijos vendor
- cssnano (production)         // Minificación
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "strict": true,
    "esModuleInterop": true,
    "paths": {
      "@/*": ["./*"]            // Imports absolutos
    }
  }
}
```

---

## Integración Continua (CI/CD)

### GitHub Actions (Recomendado)

Crear `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [master]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Security audit
        run: npm audit --production
        
      - name: Build
        run: npm run build
        
      - name: Deploy to VPS
        env:
          SSH_KEY: ${{ secrets.SSH_KEY }}
          SSH_HOST: ${{ secrets.SSH_HOST }}
        run: |
          mkdir -p ~/.ssh
          echo "$SSH_KEY" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh -i ~/.ssh/id_rsa -o StrictHostKeyChecking=no root@$SSH_HOST "cd /var/www/lumicaweb && git pull && npm install && npm run build && pm2 restart lumicaweb"
```

---

## Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| Build falla | `rm -rf .next node_modules && npm install && npm run build` |
| Email no funciona | Verificar `.env.local`, revisar logs: `pm2 logs lumicaweb` |
| Alto CPU | `pm2 monit` para monitorear, aumentar RAM si es necesario |
| Certificado expirado | `sudo certbot renew --force-renewal -v` |
| Nginx no responde | `sudo systemctl restart nginx && sudo nginx -t` |
| PM2 no reinicia | `pm2 delete lumicaweb && pm2 start npm --name lumicaweb -- start` |

---

## Recursos Útiles

### Documentación Oficial

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/docs/primitives)
- [Nodemailer](https://nodemailer.com/)

### Herramientas Online

- [SSL Checker](https://www.sslshopper.com/ssl-checker.html)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Can I use](https://caniuse.com/)
- [npm Registry](https://www.npmjs.com/)

---

## Contacto & Soporte

- 📧 Email: lumicawebdesign@gmail.com
- 🌐 Sitio: https://web.lumicawebdesign.com
- 🐙 GitHub: https://github.com/JoseMas68/Redise-o-Web-Lumica
- 📍 Ubicación: Vila-real, Castellón

---

**Documento**: Referencias Técnicas v1.0  
**Última actualización**: 10 de diciembre de 2025  
**Mantenedor**: José Martínez  
**Estado**: ✅ ACTUAL
