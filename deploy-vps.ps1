# Script de despliegue para VPS
# Ejecutar desde PowerShell en Windows

param(
    [string]$usuario = "root",
    [string]$ip = "207.180.203.22",
    [string]$subdominio = "web.tudominio.com"
)

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Deploy Lumica Web a VPS" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar que estamos en el directorio correcto
if (!(Test-Path "package.json")) {
    Write-Host "ERROR: Debes ejecutar este script desde la raíz del proyecto" -ForegroundColor Red
    exit 1
}

Write-Host "1. Conectando al VPS..." -ForegroundColor Yellow

# 2. Crear estructura de directorios en VPS
Write-Host "2. Creando directorios en VPS..." -ForegroundColor Yellow
ssh ${usuario}@${ip} "mkdir -p /var/www/lumicaweb"

# 3. Subir archivos al VPS (excluyendo node_modules y .next)
Write-Host "3. Subiendo archivos al VPS..." -ForegroundColor Yellow
Write-Host "   (Esto puede tardar varios minutos dependiendo de tu conexión)" -ForegroundColor Gray

# Crear archivo temporal con exclusiones
$exclude = @(
    "node_modules",
    ".next",
    ".git",
    "*.log",
    ".env.local",
    ".DS_Store"
)

# Usar rsync si está disponible, sino usar scp
if (Get-Command rsync -ErrorAction SilentlyContinue) {
    $excludeArgs = $exclude | ForEach-Object { "--exclude=$_" }
    rsync -avz $excludeArgs ./ ${usuario}@${ip}:/var/www/lumicaweb/
} else {
    Write-Host "   Nota: Instala rsync para transferencias más rápidas" -ForegroundColor Gray
    Write-Host "   Usando scp... (esto tardará más)" -ForegroundColor Gray
    scp -r * ${usuario}@${ip}:/var/www/lumicaweb/
}

# 4. Instalar dependencias y construir en el VPS
Write-Host "4. Instalando dependencias en VPS..." -ForegroundColor Yellow
ssh ${usuario}@${ip} @"
cd /var/www/lumicaweb
npm install
echo 'Construyendo aplicación...'
npm run build
"@

# 5. Configurar PM2
Write-Host "5. Configurando PM2..." -ForegroundColor Yellow
ssh ${usuario}@${ip} @"
cd /var/www/lumicaweb
# Instalar PM2 si no está instalado
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi

# Detener instancia anterior si existe
pm2 delete lumicaweb 2>/dev/null || true

# Iniciar aplicación
pm2 start npm --name lumicaweb -- start
pm2 save
pm2 startup | tail -n 1 | bash
"@

# 6. Configurar Nginx
Write-Host "6. Configurando Nginx..." -ForegroundColor Yellow
$nginxConfig = @"
server {
    listen 80;
    server_name ${subdominio};

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \`$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \`$host;
        proxy_cache_bypass \`$http_upgrade;
        proxy_set_header X-Real-IP \`$remote_addr;
        proxy_set_header X-Forwarded-For \`$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \`$scheme;
    }
}
"@

# Enviar configuración de Nginx
$nginxConfig | ssh ${usuario}@${ip} "cat > /tmp/lumicaweb.conf"
ssh ${usuario}@${ip} @"
sudo mv /tmp/lumicaweb.conf /etc/nginx/sites-available/lumicaweb
sudo ln -sf /etc/nginx/sites-available/lumicaweb /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl restart nginx
"@

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "Despliegue completado!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Configura tu subdominio en Hostinger:" -ForegroundColor White
Write-Host "   - Tipo: A" -ForegroundColor Gray
Write-Host "   - Nombre: [tu-subdominio]" -ForegroundColor Gray
Write-Host "   - Apunta a: 207.180.203.22" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Instala SSL (después de configurar el DNS):" -ForegroundColor White
Write-Host "   ssh ${usuario}@${ip}" -ForegroundColor Gray
Write-Host "   sudo certbot --nginx -d ${subdominio}" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Verifica el estado:" -ForegroundColor White
Write-Host "   ssh ${usuario}@${ip}" -ForegroundColor Gray
Write-Host "   pm2 status" -ForegroundColor Gray
Write-Host "   pm2 logs lumicaweb" -ForegroundColor Gray
Write-Host ""
Write-Host "Tu aplicación debería estar corriendo en: http://${subdominio}" -ForegroundColor Yellow
Write-Host ""
