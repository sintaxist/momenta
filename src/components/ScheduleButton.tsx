// src/components/ScheduleButton.tsx
"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Calendar, Sparkles } from "lucide-react";
import React from "react";

interface ScheduleButtonProps {
  variant?: "primary" | "secondary" | "floating";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export function ScheduleButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
}: ScheduleButtonProps) {
  const handleScheduleClick = () => {
    window.open("https://calendly.com/alejandrocanek", "_blank");
  };

  // Este componente no usa cva, sino clases directas, ¡lo cual está perfecto!
  const baseClasses = "transition-all duration-300";
  const variantClasses = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-indigo-500/25",
    secondary:
      "bg-white/20 backdrop-blur-xl border border-indigo-200 text-indigo-600 hover:bg-indigo-50",
    floating:
      "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-2xl",
  }[variant];

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  }[size];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-block" // Importante para que motion.div no ocupe todo el ancho
    >
      <Button
        onClick={handleScheduleClick}
        // Ignoramos las variantes del botón base y usamos las nuestras
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
        style={{ fontFamily: "Sora, sans-serif", fontWeight: 500 }}
      >
        <Calendar
          size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
          className="mr-2"
        />
        {children || "Agendar Meeting Gratuito"}
        {variant === "floating" && (
          <motion.div
            animate={{ rotate: [0, 15, -10, 15, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="ml-2"
          >
            <Sparkles size={16} />
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
}
