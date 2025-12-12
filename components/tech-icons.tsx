"use client"

import Image from "next/image"

// Iconos oficiales de tecnologías desde svgl.app o SVG personalizados
export const techLogos = {
  // Frontend
  wordpress: "https://svgl.app/library/wordpress.svg",
  react: "data:image/svg+xml,%3Csvg viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='64' cy='64' r='50' fill='%2361DAFB'/%3E%3Ccircle cx='64' cy='64' r='12' fill='%23282C34'/%3E%3Cellipse cx='64' cy='64' rx='30' ry='10' fill='none' stroke='%23282C34' stroke-width='2'/%3E%3Cellipse cx='64' cy='64' rx='30' ry='10' fill='none' stroke='%23282C34' stroke-width='2' transform='rotate(60 64 64)'/%3E%3Cellipse cx='64' cy='64' rx='30' ry='10' fill='none' stroke='%23282C34' stroke-width='2' transform='rotate(120 64 64)'/%3E%3C/svg%3E",
  nextjs: "data:image/svg+xml,%3Csvg viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='128' height='128' rx='8' fill='%23000'/%3E%3Cpath d='M40 30 L88 98 M88 30 L40 98' stroke='white' stroke-width='3' stroke-linecap='round'/%3E%3Ccircle cx='88' cy='30' r='4' fill='white'/%3E%3Ccircle cx='40' cy='98' r='4' fill='white'/%3E%3C/svg%3E",
  angular: "https://svgl.app/library/angular.svg",
  nodejs: "https://svgl.app/library/nodejs.svg",
  typescript: "https://svgl.app/library/typescript.svg",
  // Backend
  python: "https://svgl.app/library/python.svg",
  php: "data:image/svg+xml,%3Csvg viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='128' height='128' rx='16' fill='%23777BB3'/%3E%3Ctext x='64' y='78' font-size='56' font-weight='bold' fill='white' text-anchor='middle' font-family='monospace'%3EoPHP%3C/text%3E%3C/svg%3E",
  mysql: "data:image/svg+xml,%3Csvg viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='128' height='128' fill='%2300758F'/%3E%3Ctext x='64' y='80' font-size='40' font-weight='bold' fill='white' text-anchor='middle' font-family='monospace'%3EMySQL%3C/text%3E%3C/svg%3E",
  postgresql: "https://svgl.app/library/postgresql.svg",
  mongodb: "data:image/svg+xml,%3Csvg viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M64 25 Q75 35 75 50 Q75 70 64 85 Q53 70 53 50 Q53 35 64 25Z' fill='%2313AA52'/%3E%3Cpath d='M64 35 Q70 40 70 50 Q70 65 64 75 Q58 65 58 50 Q58 40 64 35Z' fill='white' fill-opacity='0.3'/%3E%3C/svg%3E",
  firebase: "https://svgl.app/library/firebase.svg",
  // Design
  figma: "https://svgl.app/library/figma.svg",
  canva: "https://svgl.app/library/canva.svg",
  adobexd: "data:image/svg+xml,%3Csvg viewBox='0 0 128 128' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='128' height='128' fill='%23470137'/%3E%3Ctext x='64' y='80' font-size='44' font-weight='bold' fill='%23FF26BE' text-anchor='middle' font-family='monospace'%3EXD%3C/text%3E%3C/svg%3E",
  photoshop: "https://svgl.app/library/photoshop.svg",
  illustrator: "https://svgl.app/library/illustrator.svg",
  premiere: "https://svgl.app/library/premiere.svg",
}

export function TechIcon({ 
  name, 
  className = "w-12 h-12" 
}: { 
  name: keyof typeof techLogos
  className?: string 
}) {
  const logoUrl = techLogos[name]
  
  if (!logoUrl) {
    return (
      <div className={`${className} bg-muted rounded-lg flex items-center justify-center`}>
        <span className="text-xs text-muted-foreground">N/A</span>
      </div>
    )
  }

  // Iconos que necesitan filtro en modo oscuro (los oscuros)
  const needsDarkModeFilter = ["nextjs", "php"].includes(name)
  
  return (
    <img
      src={logoUrl}
      alt={name}
      className={`${className} object-contain ${needsDarkModeFilter ? "dark:invert dark:brightness-110" : ""}`}
      loading="lazy"
      onError={(e) => {
        // Si falla la carga, mostrar placeholder
        (e.target as HTMLImageElement).style.display = "none"
      }}
    />
  )
}
