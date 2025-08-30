"use client"
import React from 'react'
import { motion } from "framer-motion"
import FeatureBadge from './FeatureBadge'
import { Button } from "@/components/dris/button"
import { useDevice } from "@/hooks/useDevice"
import { LucideIcon } from 'lucide-react'

interface FeatureItemProps {
    id: string
    tag: {
        icon: LucideIcon
        text: string
    }
    title: React.ReactNode
    description: React.ReactNode
    content: React.ReactNode
    colors: {
        bg: string
        icon: string
        text: string
        buttonVariant: string
    }
    index: number
    isReversed?: boolean
    isDarkMode?: boolean
}

const FeatureItem: React.FC<FeatureItemProps> = ({
    id,
    tag,
    title,
    description,
    content,
    colors,
    index,
    isReversed = false,
    isDarkMode = false
}) => {
    const { isMobile } = useDevice()

    return (
        <motion.div 
            key={id} 
            id={id} 
            className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.3,
                delay: index * 0.05,
                ease: [0.4, 0.0, 0.2, 1]
            }}
        >
            {/* Text Content Column */}
            <motion.div 
                className={`lg:w-4/12 lg:max-w-md space-y-3 sm:space-y-5 ${isReversed ? 'lg:order-last' : ''}`}
                initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.4, 0.0, 0.2, 1]
                }}
            >
                <FeatureBadge 
                    icon={tag.icon}
                    text={tag.text}
                    colors={colors}
                    index={index}
                    isDarkMode={isDarkMode}
                />
                
                <h3 className={`text-center lg:text-left ${isDarkMode ? 'text-white' : 'text-gray-900'} font-black font-sans text-2xl sm:text-3xl lg:text-4xl`}>
                    {title}
                </h3>
                <div className={`text-base lg:text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-900'} leading-relaxed text-center lg:text-left`}>
                    {description}
                </div>
                
                {/* Get TypeOS Button - Only show on desktop */}
                {!isMobile && (
                    <motion.div 
                        className="pt-4 flex justify-center lg:justify-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            duration: 0.2,
                            delay: index * 0.05 + 0.2,
                            ease: [0.4, 0.0, 0.2, 1]
                        }}
                    >
                        <Button 
                            variant="silver"
                            onClick={() => window.open('https://chromewebstore.google.com/detail/vibelearn-ai-in-google-do/hikgnomhpklghakgjgecehpfodfmaanm', '_blank')}
                        >
                            Get TypeOS
                        </Button>
                    </motion.div>
                )}
            </motion.div>

            {/* Media (Video/Image) Column */}
            <motion.div 
                className="lg:w-8/12 w-full"
                initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.4,
                    delay: index * 0.05 + 0.1,
                    ease: [0.4, 0.0, 0.2, 1]
                }}
            >
                {content}
            </motion.div>
        </motion.div>
    )
}

export default FeatureItem