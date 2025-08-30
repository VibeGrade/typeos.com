"use client"
import React, { useState, useRef, useEffect } from 'react'
import { SparklesIcon, BarChart4Icon, FileWarningIcon, BotIcon, HistoryIcon, XIcon } from 'lucide-react'
import { VIDEOS_BASE_URL } from '@/lib/constants'
import VideoContainer from '@/components/VideoContainer'
import FeatureItem from './FeatureItem'
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/dris/button"
import { useDevice } from "@/hooks/useDevice"

// Custom Video Modal for direct video files
const DirectVideoModal = ({ isOpen, onClose, videoSrc }: { isOpen: boolean; onClose: () => void; videoSrc: string }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md isolate z-[9999]"
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: "spring", damping: 35, stiffness: 400 }}
                        className="relative w-[80vw] h-[75vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <motion.button 
                            onClick={onClose}
                            className="absolute -top-16 -right-4 text-white text-xl bg-neutral-900/50 ring-1 backdrop-blur-md rounded-full p-3 hover:bg-neutral-900/70 transition-colors z-50"
                        >
                            <XIcon className="size-6" />
                        </motion.button>
                        <div className="w-full h-full border-2 border-white rounded-2xl overflow-hidden bg-black">
                            <video
                                src={videoSrc}
                                className="w-full h-full rounded-2xl object-contain"
                                controls
                                autoPlay
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const FeaturesSection = ({ showTitles = true }: { showTitles?: boolean }) => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [currentVideoSrc, setCurrentVideoSrc] = useState('');
    const [videosCanPlay, setVideosCanPlay] = useState(false);
    const { isMobile } = useDevice();
    
    // Refs to track all video elements
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const openVideo = (videoSrc: string) => {
        // Pause all videos when modal opens
        videoRefs.current.forEach(video => {
            if (video) video.pause();
        });
        
        setCurrentVideoSrc(videoSrc);
        setIsVideoOpen(true);
    };

    const closeVideo = () => {
        // Resume all videos when modal closes
        videoRefs.current.forEach(video => {
            if (video && videosCanPlay) video.play();
        });
        
        setIsVideoOpen(false);
    };

    // Start videos after animations complete
    useEffect(() => {
        if (videosCanPlay) {
            videoRefs.current.forEach(video => {
                if (video) video.play();
            });
        }
    }, [videosCanPlay]);

    // Start videos after animations complete
    useEffect(() => {
        setVideosCanPlay(false);
        const animationDuration = 500;
        const timer = setTimeout(() => {
            setVideosCanPlay(true);
        }, animationDuration);
        
        return () => clearTimeout(timer);
    }, []);

    const features = [
        {
            id: "ai-research",
            tag: {
                icon: SparklesIcon,
                text: "Research"
            },
            title: "AI Research",
            description: "Quickly research any topic with AI-powered insights directly in your documents.",
            content: (
                <VideoContainer
                    videoSrc="em-dash.mp4"
                    onClick={() => openVideo(`${VIDEOS_BASE_URL}/em-dash.mp4`)}
                    refIndex={0}
                    videoRefs={videoRefs}
                    hasHDSource={true}
                />
            ),
        },
        {
            id: "quick-edits",
            tag: {
                icon: BarChart4Icon,
                text: "Edit"
            },
            title: "Quick Edits",
            description: "Make any edit fast with AI assistance and intelligent suggestions.",
            content: (
                <VideoContainer
                    videoSrc="redo-conclusion.mp4"
                    onClick={() => openVideo(`${VIDEOS_BASE_URL}/redo-conclusion.mp4`)}
                    refIndex={1}
                    videoRefs={videoRefs}
                />
            ),
        },
    ];

    return (
        <>
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 py-16">
                <main className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-16">
                    {showTitles && (
                        <div className="space-y-4">
                            <h2 className="text-5xl sm:text-7xl text-black font-bold opacity-0 animate-fade-in-up">
                                TypeOS Features
                            </h2>
                            <p className="text-gray-600 text-lg max-w-2xl opacity-0 animate-fade-in-up animate-delay-200">
                                Work with AI directly in Google Docs and your Browser.
                            </p>
                        </div>
                    )}

                    <div className="space-y-24 w-full opacity-0 animate-fade-in-up animate-delay-400">
                        {features.map((feature, index) => (
                            <FeatureItem
                                key={feature.id}
                                id={feature.id}
                                tag={feature.tag}
                                title={feature.title}
                                description={feature.description}
                                content={feature.content}
                                colors={{
                                    bg: 'bg-gray-100',
                                    icon: 'text-black',
                                    text: 'text-gray-600',
                                    buttonVariant: 'silver'
                                }}
                                index={index}
                                isReversed={index % 2 !== 0}
                            />
                        ))}
                    </div>

                    {isMobile && (
                        <div className="opacity-0 animate-fade-in-up animate-delay-600">
                            <Button 
                                variant="silver"
                                onClick={() => window.open('https://chromewebstore.google.com/detail/vibelearn-ai-in-google-do/hikgnomhpklghakgjgecehpfodfmaanm', '_blank')}
                            >
                                Get TypeOS
                            </Button>
                        </div>
                    )}
                </main>
            </div>
            
            <DirectVideoModal
                isOpen={isVideoOpen}
                onClose={closeVideo}
                videoSrc={currentVideoSrc}
            />
        </>
    )
}

export default FeaturesSection;