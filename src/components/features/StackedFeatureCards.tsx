"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shuffle, Chrome, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/dris/button'
import Link from 'next/link'
import { useDevice } from '@/hooks/useDevice'

interface FeatureCard {
  id: string
  tag: {
    icon: React.ComponentType<{ className?: string }>
    text: string
  }
  title: string
  description: React.ReactNode
  content: React.ReactNode
}

interface StackedFeatureCardsProps {
  category: string
  cards: FeatureCard[]
  colorScheme: {
    bg: string
    border: string
    text: string
    icon: string
    buttonVariant: 'neumorphic-red' | 'neumorphic-green' | 'neumorphic-rose' | 'neumorphic-primary'
  }
  index: number
  onVideoClick?: (videoSrc: string) => void
  videosCanPlay?: boolean
  videoRefs?: React.MutableRefObject<(HTMLVideoElement | null)[]>
}

export default function StackedFeatureCards({ category, cards, colorScheme, index, onVideoClick, videosCanPlay, videoRefs }: StackedFeatureCardsProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const { isMobile } = useDevice()
  const SHUFFLE_INTERVAL = 7000

  // Auto-shuffle functionality
  useEffect(() => {
    if (isPaused || cards.length <= 1) return

    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % cards.length)
    }, SHUFFLE_INTERVAL)

    return () => clearInterval(interval)
  }, [isPaused, cards.length, currentCardIndex])

  const handleManualShuffle = () => {
    setCurrentCardIndex((prev) => (prev + 1) % cards.length)
    setIsPaused(true)
    // Resume auto-shuffle after manual interaction
    setTimeout(() => setIsPaused(false), 2000)
  }

  const goToPrevious = () => {
    setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 2000)
  }

  const goToNext = () => {
    setCurrentCardIndex((prev) => (prev + 1) % cards.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 2000)
  }

  const currentCard = cards[currentCardIndex]

  return (
    <div className="relative">
      {/* Container for the swipeable content */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentCard.id}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ 
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1]
            }}
            className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20"
          >
            {/* Text Content Column */}
            <div className={`lg:w-4/12 lg:max-w-md space-y-5 ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
              {/* Tag/Subtitle */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg">
                  <currentCard.tag.icon className="h-5 w-5 text-black shrink-0" />
                </div>
                <span className="text-gray-600 font-bold text-sm uppercase tracking-wide">
                  {currentCard.tag.text}
                </span>
              </div>
              
              <h3 className="text-left text-black font-bold font-sans text-3xl lg:text-4xl">
                {currentCard.title}
              </h3>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed text-left">
                {currentCard.description}
              </p>

              {/* Get TypeOS Button - Only show on desktop */}
              {!isMobile && (
                <div className="pt-4">
                  <Button
                    variant="silver"
                    onClick={() => window.open('https://chromewebstore.google.com/detail/vibelearn-ai-in-google-do/hikgnomhpklghakgjgecehpfodfmaanm', '_blank')}
                  >
                    Get TypeOS
                  </Button>
                </div>
              )}
            </div>

            {/* Media (Video/Image) Column */}
            <div className="lg:w-8/12 w-full">
              {currentCard.content}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls - Outside the swipeable area */}
      {cards.length > 1 && (
        <div className="flex items-center justify-center gap-8 mt-8">
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevious}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Previous feature"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={goToNext}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Next feature"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {cards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentCardIndex(idx)
                  setIsPaused(true)
                  setTimeout(() => setIsPaused(false), 2000)
                }}
                className={`transition-all duration-300 ${
                  idx === currentCardIndex 
                    ? 'bg-black h-2 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400 h-2 w-2'
                } rounded-full`}
                aria-label={`Go to feature ${idx + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={handleManualShuffle}
            variant="minimal"
            size="sm"
            className="flex items-center gap-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Shuffle className="h-4 w-4" />
            Shuffle
          </Button>
        </div>
      )}
    </div>
  )
}