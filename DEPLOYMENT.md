# 🚀 Guía de Despliegue - Lumica Web Design

## Estado del Proyecto

✅ **Listo para Producción**
- Build time: ~22-25 segundos
- Vulnerabilidades: 0
- Test: ✅ Pasados
- Performance: ✅ Optimizado

---

## 1. Despliegue Local (Desarrollo)

### Requisitos

```bash
- Node.js 18+
- npm 9+
- Git
```

### Instalación

```bash
# 1. Clonar
git clone https://github.com/JoseMas68/Redise-o-Web-Lumica.git
cd "Rediseño web lumica/lumicaweb"

# 2. Instalar dependencias
npm install

# 3. Configurar .env.local
cp .env.example .env.local
nano .env.local

# Contenido mínimo:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASS=tu_contraseña_app
CONTACT_EMAIL=lumicawebdesign@gmail.com

# 4. Ejecutar desarrollo
npm run dev

# Abre: http://localhost:3000
```

---

## 2. Despliegue en VPS (Producción)

### Servidor Recomendado

```
- Proveedor: cualquiera (usado: VPS Linux)
- SO: Ubuntu 20.04 LTS
- RAM: 2GB mínimo
- CPU: 1-2 vCPU
- Storage: 20GB SSD
```

### Instalación VPS

```bash
# 1. SSH
ssh root@207.180.203.22

# 2. Actualizar sistema
sudo apt update && sudo apt upgrade -y

# 3. Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs npm

# 4. Instalar PM2 globalmente
sudo npm install -g pm2

# 5. Clonar repositorio
cd /var/www
sudo git clone https://github.com/JoseMas68/Redise-o-Web-Lumica.git lumicaweb
cd lumicaweb

# 6. Instalar dependencias
npm install

# 7. Configurar .env.local
sudo nano .env.local

# Pegar:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=lumicawebdesign@gmail.com
SMTP_PASS=[CONTRASEÑA_APP]
CONTACT_EMAIL=lumicawebdesign@gmail.com

# 8. Build
npm run build

# 9. Iniciar con PM2
pm2 start npm --name "lumicaweb" -- start
pm2 save
pm2 startup

# 10. Verificar
pm2 logs lumicaweb
```

---

## 3. Configuración Nginx (Reverse Proxy)

### Instalación

```bash
sudo apt install nginx -y
```

### Configuración

```bash
sudo nano /etc/nginx/sites-available/default
```

Reemplazar con:

```nginx
upstream lumicaweb {
    server 127.0.0.1:3000;
}

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name lumicawebdesign.com www.lumicawebdesign.com web.lumicawebdesign.com;
    return 301 https://$server_name$request_uri;
}

# HTTPS
server {
    listen 443 ssl http2;
    server_name lumicawebdesign.com www.lumicawebdesign.com web.lumicawebdesign.com;

    ssl_certificate /etc/letsencrypt/live/lumicawebdesign.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lumicawebdesign.com/privkey.pem;
    
    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        proxy_pass http://lumicaweb;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Caché estática
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Aplicar

```bash
# Validar configuración
sudo nginx -t

# Recargar
sudo systemctl reload nginx

# Iniciar
sudo systemctl start nginx
```

---

## 4. Certificado SSL (Let's Encrypt)

### Instalación

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### Generar Certificado

```bash
sudo certbot certonly --nginx -d lumicawebdesign.com -d www.lumicawebdesign.com -d web.lumicawebdesign.com
```

### Renovación Automática

```bash
# Probar renovación
sudo certbot renew --dry-run

# Certificado se renueva automáticamente via cron
# Verificar: sudo systemctl list-timers | grep certbot
```

### Verificación

```bash
# Comprobar validez
echo | openssl s_client -servername web.lumicawebdesign.com -connect web.lumicawebdesign.com:443 2>/dev/null | openssl x509 -noout -dates
```

---

## 5. Monitoreo y Mantenimiento

### PM2 Monitoreo

```bash
# Estado
pm2 status

# Logs en tiempo real
pm2 logs lumicaweb

# Ver todas las aplicaciones
pm2 list

# Restart
pm2 restart lumicaweb

# Stop
pm2 stop lumicaweb

# Delete
pm2 delete lumicaweb
```

### Rotación de Logs

```bash
# Instalar plugin
pm2 install pm2-logrotate

# Configurar
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 5
```

### Uptime Monitoring

```bash
# Usar monit o New Relic
# Alternativa gratuita: PM2+ Plus
pm2 plus
```

---

## 6. Actualización Automática

### Script de Deploy

Crear: `/var/www/deploy.sh`

```bash
#!/bin/bash

cd /var/www/lumicaweb

# Fetch actualizaciones
git fetch origin

# Si hay cambios
if [ $(git rev-parse HEAD) != $(git rev-parse origin/master) ]; then
    echo "Hay actualizaciones disponibles..."
    
    # Pull cambios
    git pull origin master
    
    # Instalar dependencias
    npm install
    
    # Build
    npm run build
    
    # Restart
    pm2 restart lumicaweb
    
    echo "✅ Deploy completado"
else
    echo "📦 No hay cambios"
fi
```

### Cron Job Automático

```bash
# Editar crontab
sudo crontab -e

# Agregar línea (verifica cada hora)
0 * * * * /var/www/deploy.sh >> /var/log/deploy.log 2>&1
```

---

## 7. Backup y Recuperación

### Backup Manual

```bash
# Backup del repositorio
sudo tar -czf /backup/lumicaweb-$(date +%Y%m%d).tar.gz /var/www/lumicaweb

# Backup de configuración
sudo cp /var/www/lumicaweb/.env.local /backup/.env.local.backup

# Backup de nginx
sudo cp /etc/nginx/sites-available/default /backup/nginx-config.backup
```

### Restauración

```bash
# Restaurar
sudo tar -xzf /backup/lumicaweb-YYYYMMDD.tar.gz -C /var/www

# Restaurar .env.local
sudo cp /backup/.env.local.backup /var/www/lumicaweb/.env.local

# Rebuild
cd /var/www/lumicaweb
npm install
npm run build
pm2 restart lumicaweb
```

### Cron Backup Automático

```bash
# Diario a las 2 AM
0 2 * * * sudo tar -czf /backup/lumicaweb-$(date +\%Y\%m\%d).tar.gz /var/www/lumicaweb >> /var/log/backup.log 2>&1
```

---

## 8. Troubleshooting

### Build falla

```bash
# Limpiar caché
rm -rf /var/www/lumicaweb/.next
rm -rf /var/www/lumicaweb/node_modules

# Reinstalar
cd /var/www/lumicaweb
npm install
npm run build

# Restart
pm2 restart lumicaweb
```

### Email no funciona

```bash
# Verificar .env.local
cat /var/www/lumicaweb/.env.local

# Verificar conectividad SMTP
telnet smtp.gmail.com 587

# Ver logs detallados
pm2 logs lumicaweb | grep -i "error\|email"

# Probar conexión
node -e "require('nodemailer').createTransport({host:'smtp.gmail.com',port:587,auth:{user:'X',pass:'X'}}).verify(console.log)"
```

### Alto uso de CPU/RAM

```bash
# Monitoreo
pm2 monit

# Aumentar RAM de Node
pm2 start npm --name "lumicaweb" -- start -- --max-old-space-size=1024

# O editar ecosystem.config.js
```

### Certificado SSL expirado

```bash
# Renovar
sudo certbot renew --force-renewal -v

# Restart nginx
sudo systemctl restart nginx

# Verificar
curl -I https://web.lumicawebdesign.com
```

---

## 9. Métricas de Performance

### Medición

```bash
# Lighthouse
npm install -g lighthouse
lighthouse https://web.lumicawebdesign.com

# Tamaño de bundle
npm run build -- --analyze  # si está configurado

# Build time
npm run build

# Observar logs
pm2 logs lumicaweb
```

### Objetivos

| Métrica | Objetivo | Actual |
|---------|----------|--------|
| Build Time | < 30s | ~23s ✅ |
| Vulnerabilidades | 0 | 0 ✅ |
| Memory | < 50MB | ~23MB ✅ |
| Uptime | > 99.5% | TBD |

---

## 10. Checklist de Despliegue

### Pre-Deploy ✅

- [x] Código testeado localmente
- [x] npm audit ejecutado (0 vulnerabilidades)
- [x] .env.local configurado
- [x] Build exitoso locally
- [x] Commits en GitHub

### Deploy ✅

- [x] SSH al servidor
- [x] git pull
- [x] npm install
- [x] npm run build
- [x] pm2 restart
- [x] Verificar logs

### Post-Deploy ✅

- [x] Verificar https://web.lumicawebdesign.com
- [x] Revisar logs: `pm2 logs lumicaweb`
- [x] Probar formulario de contacto
- [x] Verificar certificado SSL
- [x] Confirmar actualizaciones en GitHub

---

## 11. Contacto de Soporte

📧 **Email**: lumicawebdesign@gmail.com  
🌐 **Web**: https://web.lumicawebdesign.com  
📱 **Ubicación**: Vila-real, Castellón

---

**Documento**: Guía de Despliegue v1.0  
**Fecha**: 10 de diciembre de 2025  
**Estado**: ✅ PRODUCCIÓN  
**Próxima Revisión**: 31 de marzo de 2026
