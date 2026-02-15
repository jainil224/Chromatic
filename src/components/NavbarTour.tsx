import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { X, ChevronRight, ChevronLeft, Terminal } from 'lucide-react';

// --- Types ---
interface TourStep {
    targetId: string;
    title: string;
    message: string;
    position?: 'bottom' | 'bottom-start' | 'bottom-end' | 'top';
}

// --- Tour Data ---
const TOUR_STEPS: TourStep[] = [
    {
        targetId: 'tour-logo',
        title: 'COLOR_DATABASE: ONLINE_',
        message: 'Access thousands of ready-to-use color palettes. Explore, get inspired, and start building instantly.',
        position: 'bottom-start',
    },
    {
        targetId: 'navbar-search',
        title: 'SMART_SEARCH_PROTOCOL_',
        message: 'Type a mood, theme, or color tone. Find the exact palette your project needs in seconds.',
        position: 'bottom',
    },
    {
        targetId: 'tour-pixels',
        title: 'AI_PIXEL_EXTRACTION_ENGINE_',
        message: 'Upload any image. Our AI scans the pixels and generates a perfectly matched color palette automatically.',
        position: 'bottom',
    },
    {
        targetId: 'tour-build',
        title: 'CUSTOM_PALETTE_BUILDER_',
        message: 'Create your own color palette from scratch. Design something uniquely yours and submit it to the Chromomatic community.',
        position: 'bottom',
    },
    {
        targetId: 'tour-tweak',
        title: 'COLOR_CONTROL_SYSTEM_',
        message: 'Fine-tune brightness, saturation, and tones. Perfect every shade until your palette feels just right.',
        position: 'bottom',
    },

    {
        targetId: 'tour-theme-toggle',
        title: 'DISPLAY_MODE_SWITCH_',
        message: 'Switch between dark and light mode for a more comfortable creative experience.',
        position: 'bottom-end',
    },
];

// --- Typewriter Effect Component ---
const Typewriter = ({ text, speed = 30, onComplete }: { text: string; speed?: number; onComplete?: () => void }) => {
    const [displayedText, setDisplayedText] = useState('');
    const index = useRef(0);

    useEffect(() => {
        setDisplayedText('');
        index.current = 0;

        const interval = setInterval(() => {
            if (index.current < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index.current));
                index.current++;
            } else {
                clearInterval(interval);
                onComplete?.();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, onComplete]);

    return <span>{displayedText}</span>;
};

export const NavbarTour = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

    // --- Initialization ---
    useEffect(() => {
        const hasSeenTour = localStorage.getItem('chromatic_navbar_tour_seen');
        if (!hasSeenTour) {
            // Small delay to ensure DOM is ready
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    // --- Navigation Handlers ---
    const handleNext = () => {
        if (currentStepIndex < TOUR_STEPS.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            handleClose();
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((prev) => prev - 1);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('chromatic_navbar_tour_seen', 'true');
    };

    // --- Keyboard Support ---
    useEffect(() => {
        if (!isVisible) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'Enter') handleNext();
            if (e.key === 'ArrowLeft') handleBack();
            if (e.key === 'Escape') handleClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isVisible, currentStepIndex]);

    // --- Positioning Logic ---
    useEffect(() => {
        if (!isVisible) return;

        const updatePosition = () => {
            const step = TOUR_STEPS[currentStepIndex];
            const element = document.getElementById(step.targetId);

            if (element) {
                const rect = element.getBoundingClientRect();
                setTargetRect(rect);

                // Simple positioning logic (can be enhanced with popover libraries)
                const top = rect.bottom + 12; // Default offset
                let left = rect.left + rect.width / 2; // Center horizontally by default

                // Adjust for screen edges roughly
                const tooltipWidth = 320; // Approx max width
                if (left - tooltipWidth / 2 < 20) left = tooltipWidth / 2 + 20;
                if (left + tooltipWidth / 2 > window.innerWidth - 20) left = window.innerWidth - tooltipWidth / 2 - 20;

                setPosition({ top, left });

                // Scroll into view if needed
                element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition); // In case of scroll

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
        };
    }, [currentStepIndex, isVisible]);

    if (!isVisible) return null;

    const currentStep = TOUR_STEPS[currentStepIndex];

    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;

    return createPortal(
        <div className="fixed inset-0 z-[1000] pointer-events-none">
            {/* --- 4-Panel Overlay System --- */}
            {/* Top Panel */}
            <motion.div
                initial={false}
                animate={{
                    height: targetRect ? targetRect.top : 0,
                    width: '100%',
                    top: 0,
                    left: 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute bg-black/85 backdrop-blur-[4px] pointer-events-auto"
                onClick={handleClose}
            />
            {/* Bottom Panel */}
            <motion.div
                initial={false}
                animate={{
                    height: targetRect ? windowHeight - targetRect.bottom : 0,
                    width: '100%',
                    top: targetRect ? targetRect.bottom : windowHeight,
                    left: 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute bg-black/85 backdrop-blur-[4px] pointer-events-auto"
                onClick={handleClose}
            />
            {/* Left Panel */}
            <motion.div
                initial={false}
                animate={{
                    height: targetRect ? targetRect.height : 0,
                    width: targetRect ? targetRect.left : 0,
                    top: targetRect ? targetRect.top : 0,
                    left: 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute bg-black/85 backdrop-blur-[4px] pointer-events-auto"
                onClick={handleClose}
            />
            {/* Right Panel */}
            <motion.div
                initial={false}
                animate={{
                    height: targetRect ? targetRect.height : 0,
                    width: targetRect ? windowWidth - targetRect.right : 0,
                    top: targetRect ? targetRect.top : 0,
                    left: targetRect ? targetRect.right : windowWidth,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute bg-black/85 backdrop-blur-[4px] pointer-events-auto"
                onClick={handleClose}
            />

            {/* --- Spotlight Border (Z-Index 1001) --- */}
            {targetRect && (
                <motion.div
                    layoutId="tour-spotlight-border"
                    className="absolute z-[1001] pointer-events-none rounded-md"
                    initial={false}
                    animate={{
                        top: targetRect.top - 4,
                        left: targetRect.left - 4,
                        width: targetRect.width + 8,
                        height: targetRect.height + 8,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    {/* Neon Glow Container */}
                    <div className="relative w-full h-full rounded-md border border-primary/50 shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] bg-transparent box-border">
                        {/* Corner Markers */}
                        <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border-t-2 border-l-2 border-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]" />
                        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 border-t-2 border-r-2 border-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]" />
                        <div className="absolute -bottom-0.5 -left-0.5 w-2 h-2 border-b-2 border-l-2 border-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b-2 border-r-2 border-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]" />
                    </div>
                </motion.div>
            )}

            {/* --- Tooltip Container (Z-Index 1002) --- */}
            <div
                className="absolute pointer-events-auto z-[1002]"
                style={{
                    top: position.top,
                    left: position.left,
                    transform: 'translateX(-50%)'
                }}
            >
                <motion.div
                    key={currentStepIndex}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-[320px] bg-[#0a0a0a] border border-primary/30 text-white p-5 shadow-[0_0_40px_-10px_rgba(var(--primary-rgb),0.3)] overflow-hidden group"
                >

                    {/* --- Cyberpunk Decorative Elements --- */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-primary/40" />
                    {/* Scanline */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />


                    {/* --- Header --- */}
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2 text-primary text-xs font-mono tracking-wider">
                            <Terminal className="w-3 h-3" />
                            <Typewriter text={currentStep.title} speed={20} />
                        </div>
                        <div className="text-[10px] text-white/40 font-mono">
                            [{currentStepIndex + 1}/{TOUR_STEPS.length}]
                        </div>
                    </div>

                    {/* --- Content --- */}
                    <div className="mb-6 min-h-[60px]">
                        <p className="text-sm text-gray-300 font-mono leading-relaxed">
                            <Typewriter text={currentStep.message} speed={10} key={currentStep.message} />
                            <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-primary animate-pulse" />
                        </p>
                    </div>

                    {/* --- Actions --- */}
                    <div className="flex items-center justify-between font-mono text-xs">
                        <button
                            onClick={handleClose}
                            className="text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest hover:underline"
                        >
                            [Terminate]
                        </button>

                        <div className="flex gap-2">
                            {currentStepIndex > 0 && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleBack}
                                    className="h-7 px-3 border-white/20 hover:bg-white/10 hover:text-white rounded-none bg-transparent"
                                >
                                    <ChevronLeft className="w-3 h-3 mr-1" />
                                    Back
                                </Button>
                            )}
                            <Button
                                size="sm"
                                onClick={handleNext}
                                className="h-7 px-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none border border-primary/50 shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
                            >
                                {currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}
                                <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>,
        document.body
    );
};
