#!/bin/bash

# Script de despliegue a VPS - Lumica Web Design
# Ejecutar en el VPS: bash deploy.sh

echo "🚀 Iniciando despliegue a VPS..."
echo ""

# Navegar a directorio del proyecto
cd /var/www/lumicaweb

echo "📥 Descargando cambios de GitHub..."
git fetch origin
git pull origin master

echo ""
echo "📦 Instalando dependencias..."
npm install

echo ""
echo "🔨 Compilando proyecto..."
npm run build

echo ""
echo "♻️  Reiniciando aplicación con PM2..."
pm2 restart lumicaweb

echo ""
echo "✅ Verificando estado..."
pm2 status lumicaweb

echo ""
echo "📋 Últimos logs..."
pm2 logs lumicaweb --lines 20

echo ""
echo "🎉 ¡Despliegue completado!"
