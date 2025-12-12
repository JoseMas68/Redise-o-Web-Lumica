# 🤝 Guía de Contribuciones - Lumica Web Design

¡Gracias por tu interés en contribuir a Lumica Web Design! Este documento explica cómo contribuir al proyecto.

---

## 📋 Tabla de Contenidos

1. [Código de Conducta](#-código-de-conducta)
2. [Cómo Contribuir](#-cómo-contribuir)
3. [Proceso de Pull Request](#-proceso-de-pull-request)
4. [Convenciones de Código](#-convenciones-de-código)
5. [Convenciones de Commits](#-convenciones-de-commits)
6. [Testing](#-testing)
7. [Documentación](#-documentación)

---

## 😊 Código de Conducta

### Nuestro Compromiso

Nos comprometemos a proporcionar un ambiente inclusivo y respetuoso para todos.

### Comportamiento Esperado

- Usa lenguaje respetuoso e inclusivo
- Sé constructivo con feedback
- Respeta las opiniones de otros
- Enfócate en lo mejor para la comunidad
- Reporta problemas de conducta apropiadamente

### Inaceptable

- Lenguaje ofensivo o discriminatorio
- Acoso de cualquier tipo
- Ataques personales
- Comportamiento disruptivo

---

## 🎯 Cómo Contribuir

### Reportar Bugs

**Antes de reportar:**
1. Verifica si el bug ya fue reportado
2. Intenta reproducir el problema
3. Recopila información detallada

**Al reportar:**

Abre un issue con:
```markdown
**Descripción del bug:**
[Descripción clara]

**Pasos para reproducir:**
1. ...
2. ...
3. ...

**Comportamiento esperado:**
[Qué debería pasar]

**Comportamiento actual:**
[Qué pasa realmente]

**Screenshots:**
[Si aplica]

**Entorno:**
- OS: [Windows/Mac/Linux]
- Node.js version: [versión]
- npm version: [versión]

**Logs:**
[Logs relevantes]
```

### Sugerir Enhancements

**Abre un issue con:**
```markdown
**Descripción de la feature:**
[Descripción clara]

**Motivación:**
[Por qué es útil]

**Ejemplo de uso:**
[Cómo sería usado]

**Contexto adicional:**
[Info relevante]
```

### Pull Requests

Acepto PRs que:
- Cierren bugs reportados
- Agreguen features solicitadas
- Mejoren documentación
- Refactoricen código existente
- Mejoren performance

---

## 🔄 Proceso de Pull Request

### 1. Fork el Repositorio

```bash
# Click en "Fork" en GitHub
# O usando gh:
gh repo fork --clone
```

### 2. Crear Rama

```bash
git checkout -b feature/nombre-descriptivo

# Convenciones:
# feature/       - Nueva funcionalidad
# bugfix/        - Corregir bug
# docs/          - Mejora documentación
# style/         - Cambios de formato (no funcionalidad)
# refactor/      - Refactorizar código existente
# test/          - Agregar tests
# perf/          - Mejora performance
```

### 3. Hacer Cambios

```bash
# Editar archivos...

# Linter
npm run lint

# Format
npm run format

# Build test
npm run build
```

### 4. Commit

```bash
# Usando commits semánticos
git commit -m "tipo(scope): descripción"

# Ejemplos:
git commit -m "feat(contact): agregar validación de email"
git commit -m "fix(header): menu sidebar light mode"
git commit -m "docs: actualizar DEPLOYMENT.md"
git commit -m "style: formatear código"
git commit -m "refactor(api): simplificar validaciones"
git commit -m "test: agregar tests para email"
```

### 5. Push & Create PR

```bash
git push origin feature/nombre-descriptivo

# Luego ve a GitHub y crea el PR
```

### 6. Descripción del PR

```markdown
## 📝 Descripción
Descripción clara del cambio

## 🎯 Tipo de Cambio
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring
- [ ] Performance improvement

## 🔗 Issues Relacionados
Closes #123

## 📋 Cambios Realizados
- Cambio 1
- Cambio 2
- Cambio 3

## ✅ Checklist
- [ ] Mi código sigue el estilo del proyecto
- [ ] He ejecutado `npm run lint` y `npm run format`
- [ ] He agregado tests si es necesario
- [ ] He actualizado documentación
- [ ] No hay breaking changes
- [ ] Los tests pasan (si aplica)

## 📸 Screenshots (si aplica)
[Adjuntar imágenes/gifs]
```

### 7. Review Process

- Espera review de mantenedores
- Responde comentarios y preguntas
- Realiza cambios solicitados
- Re-request review cuando esté listo

---

## 📝 Convenciones de Código

### TypeScript

```typescript
// ✅ Bueno
interface UserProfile {
  name: string;
  email: string;
  createdAt: Date;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ❌ Evitar
function validateEmail(email: any) {
  return email && email.includes("@");
}
```

### React Components

```typescript
// ✅ Bueno - Functional component con tipos
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export function Button({ label, onClick, variant = "primary" }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

// ❌ Evitar
function Button(props) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### Tailwind CSS

```tsx
// ✅ Bueno - Clases organizadas
<div className="flex items-center justify-between gap-4 p-6 bg-white rounded-lg shadow-md">

// ❌ Evitar - Clases desordenadas
<div className="p-6 shadow-md rounded-lg gap-4 bg-white justify-between items-center flex">
```

### Naming Conventions

```
Variables/Functions: camelCase
Classes/Types: PascalCase
Constants: UPPER_SNAKE_CASE
Files: kebab-case o camelCase (si es componente: PascalCase)
```

### Comentarios

```typescript
// ✅ Bueno - Comentarios explicativos
// Validar email usando RFC 5322 simplificado
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// ❌ Evitar - Comentarios obvios
// Este es un email
const email = "user@example.com";
```

---

## 📌 Convenciones de Commits

### Formato

```
tipo(scope): descripción corta

cuerpo (opcional)

footer (opcional)
```

### Tipos

| Tipo | Descripción | Emoji |
|------|-------------|-------|
| `feat` | Nueva funcionalidad | ✨ |
| `fix` | Correción de bug | 🐛 |
| `docs` | Cambios en documentación | 📚 |
| `style` | Formato, semicolons, etc | 🎨 |
| `refactor` | Refactorizar código | ♻️ |
| `perf` | Mejora de performance | ⚡ |
| `test` | Agregar/actualizar tests | 🧪 |
| `chore` | Actualizaciones deps, etc | 🔧 |
| `ci` | Cambios CI/CD | 🚀 |
| `sec` | Mejoras de seguridad | 🔒 |

### Ejemplos

```bash
✨ feat(auth): implementar login con Google
🐛 fix(contact): validación de email mejorada
📚 docs(deployment): agregar instrucciones SSL
🎨 style(components): formatear código
♻️ refactor(api): simplificar validaciones
⚡ perf(build): optimizar bundle size
🧪 test(contact): agregar tests de validación
🔧 chore(deps): actualizar nodemailer
🔒 sec(api): sanitizar inputs
```

### Scope (Opcional)

Especifica qué parte del código afecta:
- `auth` - Autenticación
- `contact` - Formulario de contacto
- `api` - Endpoints API
- `ui` - Interfaz de usuario
- `build` - Build process
- `deps` - Dependencias
- etc.

---

## 🧪 Testing

### Ejecutar Tests

```bash
# Tests locales (si existen)
npm test

# Watch mode
npm test -- --watch

# Coverage
npm test -- --coverage
```

### Escribir Tests

Para cualquier:
- Nueva funcionalidad crítica
- Bug fixes importantes
- Validaciones de seguridad

Ejemplo:
```typescript
// src/__tests__/utils/email.test.ts
describe("Email Validation", () => {
  it("should validate correct emails", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
  });

  it("should reject invalid emails", () => {
    expect(isValidEmail("invalid")).toBe(false);
  });

  it("should reject XSS attempts", () => {
    expect(isValidEmail("<script>alert('xss')</script>")).toBe(false);
  });
});
```

### Checklist Pre-Commit

```bash
# 1. Linting
npm run lint
npm run lint -- --fix

# 2. Formatting
npm run format

# 3. Build
npm run build

# 4. Tests
npm test

# 5. Seguridad
npm audit

# 6. Commits
git add .
git commit -m "✨ feat: descripción"
```

---

## 📖 Documentación

### Actualizar Documentación

Si cambias funcionalidad, **actualiza la documentación**:

- README.md - Overview y setup
- DEPLOYMENT.md - Procesos de deployment
- SECURITY.md - Cambios de seguridad
- TECHNICAL_REFERENCE.md - Referencias técnicas
- Comentarios de código - Explicaciones complejas

### Formato de Documentación

```markdown
# Título Principal

## Subtítulo

Descripción clara y concisa.

### Subsección

Detalles importantes.

#### Punto específico

```code
Ejemplos de código
```

**Importante**: Nota importante

> Quote o advertencia

- Punto 1
- Punto 2
- Punto 3
```

### Ejemplos en Documentación

Incluye siempre ejemplos en nueva funcionalidad:

```markdown
## Nueva Funcionalidad X

Descripción

### Uso

```typescript
// Ejemplo de uso
const result = newFeature(params);
```

### Parámetros

- `param1` (string) - Descripción
- `param2` (number) - Descripción

### Retorna

- (boolean) - Descripción

### Errores

- Lanza Error si...

### Ejemplo Completo

```typescript
// Código completo funcionando
```
```

---

## 🚀 Proceso de Release

(Solo mantenedores)

1. Actualizar versión en `package.json`
2. Actualizar `CHANGELOG.md`
3. Crear tag: `git tag -a v1.0.0 -m "Release v1.0.0"`
4. Push: `git push origin --tags`
5. GitHub releases: Crear release automáticamente

---

## 💬 Getting Help

- 📧 Email: lumicawebdesign@gmail.com
- 🐙 GitHub Issues: [Issues](https://github.com/JoseMas68/Redise-o-Web-Lumica/issues)
- 💬 Discussions: [Discussions](https://github.com/JoseMas68/Redise-o-Web-Lumica/discussions)

---

## 📝 Checklist Final

Antes de hacer push:

- [ ] Código funciona localmente
- [ ] Commits son semánticos
- [ ] Lint y format pasados
- [ ] Build exitoso
- [ ] Documentación actualizada
- [ ] Sin vulnerabilidades (npm audit)
- [ ] Tests pasan (si aplica)
- [ ] PR tiene descripción clara

---

**¡Gracias por contribuir! 🎉**

Tus contribuciones hacen a Lumica Web Design más fuerte y mejor.

---

**Última actualización**: 10 de diciembre de 2025  
**Mantenedor**: José Martínez (@JoseMas68)
