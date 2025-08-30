"use client"
import React from 'react'
import { motion } from "framer-motion"
import { LucideIcon } from 'lucide-react'

interface FeatureBadgeProps {
    icon: LucideIcon
    text: string
    colors: {
        bg: string
        icon: string
        text: string
    }
    index: number
    isDarkMode?: boolean
}

const FeatureBadge: React.FC<FeatureBadgeProps> = ({ 
    icon: Icon, 
    text, 
    colors, 
    index, 
    isDarkMode = false 
}) => {
    return (
        <div className="hidden sm:flex items-center gap-3 sm:mb-6">
            <motion.div 
                className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.2,
                    delay: index * 0.05 + 0.1,
                    ease: [0.4, 0.0, 0.2, 1]
                }}
            >
                <Icon className="h-5 w-5 text-black shrink-0" />
            </motion.div>
            <span className="text-gray-600 font-bold text-sm uppercase tracking-wide">
                {text}
            </span>
        </div>
    )
}

export default FeatureBadge