# Script para actualizar la aplicación en VPS
# Ejecutar cuando hagas cambios y quieras actualizar

param(
    [string]$usuario = "root",
    [string]$ip = "207.180.203.22"
)

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Actualizando Lumica Web en VPS" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que git tiene cambios commiteados
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "Tienes cambios sin commitear. ¿Quieres continuar? (s/n)" -ForegroundColor Yellow
    $respuesta = Read-Host
    if ($respuesta -ne "s") {
        Write-Host "Actualización cancelada" -ForegroundColor Red
        exit 1
    }
}

Write-Host "1. Haciendo push a GitHub..." -ForegroundColor Yellow
git push origin master

Write-Host "2. Actualizando código en VPS..." -ForegroundColor Yellow
ssh ${usuario}@${ip} @"
cd /var/www/lumicaweb
git pull origin master
npm install
npm run build
pm2 restart lumicaweb
"@

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "Actualización completada!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""
Write-Host "Verifica los logs con:" -ForegroundColor Cyan
Write-Host "ssh ${usuario}@${ip} 'pm2 logs lumicaweb'" -ForegroundColor Gray
Write-Host ""
