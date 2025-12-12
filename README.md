# 🎨 Lumica Web Design - Portfolio Profesional

> Una plataforma moderna y optimizada para mostrar servicios de diseño web, con certificado SSL, animaciones fluidas y validación de seguridad.

[![Status](https://img.shields.io/badge/Status-Production-green?style=flat-square)](https://web.lumicawebdesign.com)
[![Security](https://img.shields.io/badge/Security-0%20Vulnerabilities-brightgreen?style=flat-square)](./SECURITY.md)
[![Build](https://img.shields.io/badge/Build-Passing-success?style=flat-square)]()
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)](https://www.typescriptlang.org/)

---

## 🎯 Características Principales

### ✨ Frontend Moderno
- **Next.js 16** con React 19 - Framework híbrido con rendering optimizado
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS con tree-shaking
- **Framer Motion 12** - Animaciones fluidas y optimizadas
- **Radix UI** - Componentes accesibles y personalizados

### 🔒 Seguridad Robusta
- **0 Vulnerabilidades npm** - Auditoría de seguridad completada
- **Validación de Inputs** - Sanitización HTML, email y teléfono
- **SSL/TLS** - Certificado Let's Encrypt (válido hasta marzo 2026)
- **Security Headers** - HSTS, CSP, X-Frame-Options
- **HTTPS Forzado** - Redireccionamiento automático

### ⚡ Rendimiento Optimizado
- **Build Time**: ~25 segundos (VPS)
- **Memory Usage**: ~23MB (producción)
- **Compresión Gzip** - Assets automáticamente comprimidos
- **CSS Tree-shaking** - Solo estilos utilizados
- **Pre-renderizado**: 12/12 rutas estáticas

---

## 📦 Stack Tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| **Frontend** | Next.js, React, TypeScript | 16.0.7, 19.2.0, 5 |
| **Estilos** | Tailwind CSS, PostCSS | 4, Latest |
| **Animaciones** | Framer Motion | 12.23.25 |
| **Componentes** | Radix UI | 1.11.0 |
| **Backend** | Node.js, Nodemailer | 18+, 7.0.11 |
| **DevOps** | PM2, Nginx, Ubuntu | Latest, 1.24.0, 20.04 |

---

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- npm 9+
- Git

### Instalación Local

```bash
# 1. Clonar repositorio
git clone https://github.com/JoseMas68/Redise-o-Web-Lumica.git
cd "Rediseño web lumica/lumicaweb"

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con credenciales SMTP

# 4. Ejecutar en desarrollo
npm run dev
# Abre: http://localhost:3000
```

### Build Producción

```bash
npm run build    # Compilar
npm start        # Iniciar servidor
```

---

## 🌐 Despliegue en VPS

### Instalación Rápida (Ubuntu)

```bash
ssh root@[tu_vps]
cd /var/www
git clone https://github.com/JoseMas68/Redise-o-Web-Lumica.git lumicaweb
cd lumicaweb
npm install
npm run build
pm2 start npm --name "lumicaweb" -- start
pm2 save && pm2 startup
```

**Ver guía completa**: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 📚 Documentación

| Documento | Contenido |
|-----------|----------|
| **[README.md](./README.md)** | Este archivo - Overview del proyecto |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Guía paso a paso de despliegue |
| **[SECURITY.md](./SECURITY.md)** | Auditoría de seguridad |
| **[TECHNICAL_REFERENCE.md](./TECHNICAL_REFERENCE.md)** | Referencias técnicas |

---

## 🔐 Seguridad

### Validaciones Implementadas
✅ Sanitización de inputs (HTML, email, teléfono)  
✅ SMTP seguro (TLS/SSL)  
✅ SSL/TLS (Let's Encrypt)  
✅ Security headers (HSTS, CSP, X-Frame-Options)  

### Auditoría Completada
```bash
npm audit --production
# Result: 0 vulnerabilities
```

**Detalles**: [SECURITY.md](./SECURITY.md)

---

## 📊 Performance

| Métrica | Valor | Estado |
|---------|-------|--------|
| Build Time | ~25s | ✅ |
| Memory | ~23MB | ✅ |
| Vulnerabilities | 0 | ✅ |
| SSL Grade | A+ | ✅ |

---

## 🎮 Comandos

```bash
npm run dev        # Desarrollo con hot reload
npm run build      # Build producción
npm start          # Iniciar servidor
npm run lint       # Linter
npm run format     # Formatear código
npm audit          # Verificar vulnerabilidades
```

---

## 🌍 URLs Producción

- 🌐 [web.lumicawebdesign.com](https://web.lumicawebdesign.com)
- 📧 Contacto: `/` (sección hero)
- 📄 Legal: `/privacidad`, `/aviso-legal`, `/cookies`

---

## 📁 Estructura del Proyecto

```
lumicaweb/
├── app/                    # App Router de Next.js
│   ├── page.tsx           # Página de inicio
│   ├── layout.tsx         # Layout principal
│   ├── api/contact/       # Email endpoint
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── layout/           # Header, Footer, MainLayout
│   └── ui/               # Componentes shadcn/ui
├── lib/                  # Utilidades
├── public/               # Archivos estáticos
│   └── images/          # Imágenes
└── docs/                # Documentación (en carpeta raíz)
```

## 🛠️ Componentes Instalados (shadcn/ui)

- Button, Card, Input, Textarea, Label
- Form, Accordion, Badge, Carousel
- Dialog, Separator, Avatar
- Navigation Menu, Sheet

## 📝 Páginas Planificadas

1. **Inicio** (`/`) - ✅ En desarrollo
2. **Servicios** (`/servicios`) - Pendiente
3. **Portfolio** (`/portfolio`) - Pendiente
4. **Sobre Nosotros** (`/sobre-nosotros`) - Pendiente
5. **Contacto** (`/contacto`) - Pendiente

## 🔗 Documentación Completa

Ver carpeta `../docs/` en la raíz del proyecto:
- [README.md](../docs/README.md) - Descripción general
- [PLANIFICACION.md](../docs/PLANIFICACION.md) - Cronograma
- [REQUISITOS.md](../docs/REQUISITOS.md) - Especificaciones
- [ESTRUCTURA.md](../docs/ESTRUCTURA.md) - Contenidos
- [ESTILOS.md](../docs/ESTILOS.md) - Guía de diseño

## 📞 Contacto

- **Teléfono**: 624 237 696
- **Email**: info@lumicawebdesign.com
- **Web Actual**: https://lumicawebdesign.com

---

**Estado**: ✅ Setup completado | 🚧 Desarrollo en curso
**Fecha**: 8 de diciembre de 2025

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
