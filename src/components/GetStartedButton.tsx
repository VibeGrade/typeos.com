"use client"
// import { useAuthenticationContext } from '@/src/infrastructure/authentication/authentication.context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { cn } from "@/src/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, Chrome, Mail } from "lucide-react";
import { motion, AnimatePresence } from "motion";
import { useDevice } from "src/lib/hooks/useDevice";
import Image from "next/image";
import { useGT, T, Branch } from 'gt-next';

interface GetStartedButtonProps {
    children?: React.ReactNode;
    href?: string;
    target?: string;
}

const GetStartedButton = ({ children, href, target }: GetStartedButtonProps) => {
    const { user, userData } = useAuthenticationContext()
    const router = useRouter()
    const [showLoggedIn, setShowLoggedIn] = useState(false)
    const { isMobile } = useDevice();
    const t = useGT();
    
    useEffect(() => {
        // Add a small delay to allow for a smooth transition if already logged in
        const timer = setTimeout(() => {
            setShowLoggedIn(!!user)
        }, 500)
        
        return () => clearTimeout(timer)
    }, [user])
    
    return (
        <div className="flex flex-col items-center w-fit">
            <AnimatePresence mode="wait">
                <motion.div
                    key={showLoggedIn ? "logged-in" : "logged-out"}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="h-12 sm:h-14 w-fit"
                >
                    {!showLoggedIn ? (
                        <Link
                            href={href ?? (isMobile ? "/login" : "/extension")}
                            target={target ?? "_self"}
                            className="h-full w-fit flex items-center justify-center"
                        >
                            <Button
                                size={"lg"}
                                variant="neumorphic-primary"
                                className="h-full w-fit text-base px-6 "
                            >
                                <div className='flex justify-center items-center gap-2'>
                                    {children ?? (
                                        <T>
                                            <Branch
                                                branch={isMobile.toString()}
                                                true={
                                                    <>
                                                        Start for Free
                                                        <ArrowLongRightIcon className="!w-5 !h-5 " strokeWidth={2} />
                                                    </>
                                                }
                                                false={
                                                    <>
                                                        Add to Chrome for Free
                                                        <Chrome
                                                            className=" h-8 w-8 group-hover:translate-x-0.5 transition-all"
                                                            strokeWidth={3}
                                                        />
                                                    </>
                                                }
                                            />
                                        </T>
                                    )}
                                </div>
                            </Button>
                        </Link>
                    ) : (
                        <Link
                            href={"/teacher"}
                            className="h-full w-fit flex items-center justify-center"
                        >
                            <Button
                                size={"lg"}
                                variant="neumorphic-secondary"
                                className="h-full w-fit text-base px-6 text-sky-800"
                            >
                                <div className='relative z-30 flex justify-center items-center gap-2'>
                                    {children ?? (
                                        <T>
                                            Grade Now
                                            <ArrowLongRightIcon className="!w-5 !h-5 text-sky-800" strokeWidth={2} />
                                        </T>
                                    )}
                                </div>
                            </Button>
                        </Link>
                    )}
                </motion.div>
            </AnimatePresence>
            
            {/* Mobile text - shown below button on mobile */}
            <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="font-bold text-sky-800 mt-2 flex sm:hidden flex-row items-center whitespace-nowrap text-xs gap-1"
            >
                <CheckCircleIcon className="size-3 flex-shrink-0" />
                <T>No credit card required</T>
            </motion.span>
            
            {/* Desktop text - only shown on larger screens */}
            <AnimatePresence mode="wait">
                <motion.span
                    key={showLoggedIn ? "logged-in-text" : "logged-out-text"}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className={cn(
                        "font-bold text-sky-800 mt-2 hidden sm:flex flex-row items-center whitespace-nowrap",
                        showLoggedIn ? "text-xs gap-1" : "text-sm gap-2"
                    )}
                >
                    <CheckCircleIcon className={showLoggedIn ? "size-3 flex-shrink-0" : "size-4 flex-shrink-0"} /> 
                    <T>No credit card required</T>
                </motion.span>
            </AnimatePresence>
           
        </div>
    );
}

export default GetStartedButton;