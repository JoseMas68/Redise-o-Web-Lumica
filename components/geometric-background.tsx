"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function GeometricBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none block dark:hidden">
      {/* Círculo grande */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl"
        style={{ top: "10%", right: "10%" }}
        animate={isMobile ? {} : {
          y: [0, 50, 0],
          x: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Triángulo - deshabilitado en móvil */}
      {!isMobile && (
        <motion.div
          className="absolute w-64 h-64"
          style={{ top: "60%", left: "5%" }}
          animate={{
            rotate: [0, 360],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
            <polygon
              points="50,10 90,90 10,90"
              fill="url(#triangleGradient)"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
            <defs>
              <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.77 0.15 65)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="oklch(0.42 0.21 264)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}

      {/* Hexágono - deshabilitado en móvil */}
      {!isMobile && (
        <motion.div
          className="absolute w-48 h-48"
          style={{ top: "30%", left: "15%" }}
          animate={{
            rotate: [0, -360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
            <polygon
              points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
              fill="url(#hexGradient)"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-secondary"
            />
            <defs>
              <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.42 0.21 264)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="oklch(0.77 0.15 65)" stopOpacity="0.15" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}

      {/* Cuadrado giratorio - deshabilitado en móvil */}
      {!isMobile && (
        <motion.div
          className="absolute w-32 h-32"
          style={{ bottom: "20%", right: "20%" }}
          animate={{
            rotate: [0, 360],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-10">
            <rect
              x="20"
              y="20"
              width="60"
              height="60"
              fill="url(#squareGradient)"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary"
              rx="5"
            />
            <defs>
              <linearGradient id="squareGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.77 0.15 65)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="oklch(0.42 0.21 264)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}

      {/* Círculo pequeño */}
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-secondary/10 to-primary/10 blur-2xl"
        style={{ bottom: "10%", left: "30%" }}
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rombo - deshabilitado en móvil */}
      {!isMobile && (
        <motion.div
          className="absolute w-56 h-56"
          style={{ top: "50%", right: "30%" }}
          animate={{
            rotate: [0, 180, 360],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-8">
            <polygon
              points="50,10 90,50 50,90 10,50"
              fill="url(#diamondGradient)"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-secondary"
            />
            <defs>
              <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="oklch(0.42 0.21 264)" stopOpacity="0.15" />
                <stop offset="100%" stopColor="oklch(0.77 0.15 65)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}
    </div>
  );
}
