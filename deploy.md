# Guía de Despliegue a VPS

## Requisitos en el VPS
- Node.js 18+ instalado
- PM2 instalado globalmente
- Nginx instalado
- Acceso SSH

## Pasos de Despliegue

### 1. Conectar al VPS
```bash
ssh usuario@207.180.203.22
```

### 2. Instalar dependencias necesarias (si no están)
```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js (si no está)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2
sudo npm install -g pm2

# Instalar Nginx
sudo apt install nginx -y
```

### 3. Crear directorio para la aplicación
```bash
sudo mkdir -p /var/www/lumicaweb
sudo chown -R $USER:$USER /var/www/lumicaweb
```

### 4. Subir el código al VPS
Desde tu PC local, en la carpeta del proyecto:

```bash
# Opción 1: Usando Git (recomendado)
# En el VPS:
cd /var/www/lumicaweb
git clone https://github.com/JoseMas68/Redise-o-Web-Lumica.git .

# Opción 2: Usando SCP
# Desde tu PC:
scp -r * usuario@207.180.203.22:/var/www/lumicaweb/
```

### 5. Instalar dependencias y construir
```bash
cd /var/www/lumicaweb
npm install
npm run build
```

### 6. Iniciar con PM2
```bash
pm2 start npm --name "lumicaweb" -- start
pm2 save
pm2 startup
```

### 7. Configurar Nginx

Crear archivo de configuración:
```bash
sudo nano /etc/nginx/sites-available/lumicaweb
```

Contenido del archivo:
```nginx
server {
    listen 80;
    server_name tusubdominio.tudominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Activar el sitio:
```bash
sudo ln -s /etc/nginx/sites-available/lumicaweb /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 8. Configurar SSL con Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d tusubdominio.tudominio.com
```

### 9. Configurar el subdominio en Hostinger

1. Accede al panel de Hostinger
2. Ve a Dominios → Tu dominio → DNS/Name Servers
3. Añade un registro A:
   - Tipo: A
   - Nombre: tusubdominio (ej: web, app, etc)
   - Apunta a: 207.180.203.22
   - TTL: 14400

Espera 5-30 minutos para que se propague el DNS.

## Actualizar la aplicación

Para actualizar después de hacer cambios:

```bash
cd /var/www/lumicaweb
git pull origin master
npm install
npm run build
pm2 restart lumicaweb
```

## Comandos útiles de PM2

```bash
pm2 status              # Ver estado
pm2 logs lumicaweb      # Ver logs
pm2 restart lumicaweb   # Reiniciar
pm2 stop lumicaweb      # Detener
pm2 delete lumicaweb    # Eliminar
```

## Verificación

1. Verifica que la app esté corriendo: `pm2 status`
2. Verifica Nginx: `sudo systemctl status nginx`
3. Prueba en navegador: `http://tusubdominio.tudominio.com`
