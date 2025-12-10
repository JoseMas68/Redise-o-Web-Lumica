"use client"

import Image from "next/image"

// Iconos oficiales de tecnologías desde svgl.app
export const techLogos = {
  // Frontend
  wordpress: "https://svgl.app/library/wordpress.svg",
  react: "https://svgl.app/library/react.svg",
  nextjs: "https://svgl.app/library/nextjs.svg",
  angular: "https://svgl.app/library/angular.svg",
  nodejs: "https://svgl.app/library/nodejs.svg",
  typescript: "https://svgl.app/library/typescript.svg",
  // Backend
  python: "https://svgl.app/library/python.svg",
  php: "https://svgl.app/library/php.svg",
  mysql: "https://svgl.app/library/mysql.svg",
  postgresql: "https://svgl.app/library/postgresql.svg",
  mongodb: "https://svgl.app/library/mongodb.svg",
  firebase: "https://svgl.app/library/firebase.svg",
  // Design
  figma: "https://svgl.app/library/figma.svg",
  canva: "https://svgl.app/library/canva.svg",
  adobexd: "https://svgl.app/library/adobexd.svg",
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

  return (
    <img
      src={logoUrl}
      alt={name}
      className={`${className} object-contain`}
      loading="lazy"
      onError={(e) => {
        // Si falla la carga, mostrar placeholder
        (e.target as HTMLImageElement).style.display = "none"
      }}
    />
  )
}
