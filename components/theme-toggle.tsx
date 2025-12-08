"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-14 h-8 rounded-full bg-muted" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-14 h-8 rounded-full bg-muted border-2 border-border hover:border-primary transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="Cambiar tema"
    >
      {/* Track background */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          backgroundColor: isDark ? "oklch(0.18 0.015 264)" : "oklch(0.77 0.15 65 / 0.2)"
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Toggle circle */}
      <motion.div
        className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-background shadow-lg flex items-center justify-center"
        animate={{
          x: isDark ? 20 : 0
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-primary" />
        ) : (
          <Sun className="h-4 w-4 text-primary" />
        )}
      </motion.div>
    </button>
  );
}
