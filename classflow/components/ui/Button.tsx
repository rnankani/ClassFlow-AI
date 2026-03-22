"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "default" | "lg"
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function Button({
  children,
  variant = "primary",
  size = "default",
  className,
  onClick,
  disabled,
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variants = {
    primary: "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500 shadow-lg shadow-primary-500/25",
    secondary: "bg-white text-dark-900 border border-dark-200 hover:bg-dark-50 focus:ring-dark-400",
    outline: "bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
  }
  
  const sizes = {
    default: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}
