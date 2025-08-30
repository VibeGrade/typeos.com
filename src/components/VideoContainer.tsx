"use client"
import React, { forwardRef } from 'react'
import { PlayCircleIcon } from 'lucide-react'
export const VIDEOS_BASE_URL = "https://videos.daniel-ff0.workers.dev"

interface VideoContainerProps {
    videoSrc: string
    onClick: () => void
    refIndex?: number
    videoRefs?: React.MutableRefObject<(HTMLVideoElement | null)[]>
    hasHDSource?: boolean
}

const VideoContainer = forwardRef<HTMLVideoElement, VideoContainerProps>(
    ({ videoSrc, onClick, refIndex, videoRefs, hasHDSource = false }, ref) => {
        const setVideoRef = (el: HTMLVideoElement | null) => {
            if (videoRefs && typeof refIndex === 'number') {
                videoRefs.current[refIndex] = el
            }
            if (typeof ref === 'function') {
                ref(el)
            } else if (ref) {
                ref.current = el
            }
        }

        return (
            <div 
                className='relative p-3 bg-white/20 backdrop-blur-sm border-white/50 border rounded-xl overflow-hidden shadow-lg cursor-pointer group'
                onClick={onClick}
            >
                <div className='relative rounded-lg overflow-hidden bg-white/80 backdrop-blur-sm'>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors z-10">
                        <PlayCircleIcon className="w-16 h-16 text-white/0 group-hover:text-white/90 transition-all duration-200 drop-shadow-lg" />
                    </div>
                    <video
                        ref={setVideoRef}
                        loop
                        muted
                        playsInline
                        preload="auto"
                        controls={false}
                        disablePictureInPicture
                        controlsList="nodownload noplaybackrate"
                        className="w-full h-auto object-contain [&::-webkit-media-controls]:hidden"
                    >
                        {hasHDSource && (
                            <source
                                src={`${VIDEOS_BASE_URL}/${videoSrc}`}
                                type="video/mp4"
                                media="(min-width: 1080px)" 
                            />
                        )}
                        {hasHDSource ? (
                            <source
                                src={`${VIDEOS_BASE_URL}/${videoSrc.replace('1080', '720')}`}
                                type="video/mp4" 
                            />
                        ) : (
                            <source
                                src={`${VIDEOS_BASE_URL}/${videoSrc}`}
                                type="video/mp4" 
                            />
                        )}
                    </video>
                </div>
            </div>
        )
    }
)

VideoContainer.displayName = 'VideoContainer'

export default VideoContainer