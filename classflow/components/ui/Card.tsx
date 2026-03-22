"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className, hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-white rounded-2xl p-6 border border-dark-100 shadow-sm",
        hover && "hover:shadow-xl hover:border-primary-200",
        className
      )}
    >
      {children}
    </motion.div>
  )
}
