import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Types ---
interface TourStep {
    targetId: string;
    title: string;
    message: string;
    position?: 'bottom' | 'bottom-start' | 'bottom-end' | 'top' | 'right';
}

// --- Tour Data ---
const TOUR_STEPS: TourStep[] = [
    {
        targetId: 'tour-logo',
        title: 'Explore the Palette Library',
        message: 'Browse thousands of curated palette of colours. crafted for modern UI, branding, and creative projects.',
        position: 'bottom-start',
    },
    {
        targetId: 'navbar-search',
        title: 'Find Your Inspiration',
        message: 'Search by mood, theme, or tone to instantly discover sets of colours. that match your vision.',
        position: 'bottom',
    },
    {
        targetId: 'tour-pixels',
        title: 'Extract from Images',
        message: 'Upload any image and let AI generate a perfectly matched palette based on dominant colours.',
        position: 'bottom',
    },
    {
        targetId: 'tour-build',
        title: 'Create & Share',
        message: "Design your own custom combinations of colours. from scratch. Once you're satisfied, submit and inspire designers worldwide.",
        position: 'bottom',
    },
    {
        targetId: 'tour-tweak',
        title: 'Refine with Precision',
        message: 'Adjust brightness, saturation, and tones to perfect every shade in your colours.',
        position: 'bottom',
    },
    {
        targetId: 'tour-theme-toggle',
        title: 'Switch Display Mode',
        message: 'Toggle between light and dark mode for a personalized creative experience with colours.',
        position: 'bottom-end',
    },
    // ─── Sidebar Category Guidance ────────────────────────────────────────
    {
        targetId: 'tour-cat-vibes',
        title: 'Filter by Vibes',
        message: 'Choose a mood — Bold, Neon, Retro, Dark, Warm and more — to instantly filter the library to colours.',
        position: 'right',
    },
];

export const NavbarTour = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

    // --- Initialization & LocalStorage ---
    useEffect(() => {
        const hasSeenTour = localStorage.getItem('chromatic_navbar_tour_seen');
        if (!hasSeenTour) {
            // Delay start to allow UI to settle
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    // --- Core Logic: Update Highlight Position ---
    useEffect(() => {
        if (!isVisible) return;

        const updatePosition = () => {
            const step = TOUR_STEPS[currentStepIndex];
            const element = document.getElementById(step.targetId);

            if (element) {
                const rect = element.getBoundingClientRect();
                setTargetRect(rect);

                const tooltipWidth = 340;
                const tooltipHeight = 180; // estimated
                const GAP = 20;
                const windowWidth = window.innerWidth;
                const windowHeight = window.innerHeight;

                let top = 0;
                let left = 0;

                if (step.position === 'right') {
                    // Tooltip appears to the right of the element
                    top = rect.top + rect.height / 2 - tooltipHeight / 2;
                    left = rect.right + GAP;
                    // Clamp vertically
                    if (top < GAP) top = GAP;
                    if (top + tooltipHeight > windowHeight - GAP) top = windowHeight - tooltipHeight - GAP;
                } else {
                    // Default: below the element, centred
                    top = rect.bottom + GAP;
                    left = rect.left + rect.width / 2;
                    // Edge detection for left/right
                    if (left - tooltipWidth / 2 < GAP) left = tooltipWidth / 2 + GAP;
                    if (left + tooltipWidth / 2 > windowWidth - GAP) left = windowWidth - tooltipWidth / 2 - GAP;
                }

                setTooltipPosition({ top, left });
                element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [currentStepIndex, isVisible]);

    // --- Keyboard Navigation ---
    useEffect(() => {
        if (!isVisible) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'Enter') handleNext();
            if (e.key === 'ArrowLeft') handleBack();
            if (e.key === 'Escape') handleSkip();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isVisible, currentStepIndex]);

    const handleNext = () => {
        if (currentStepIndex < TOUR_STEPS.length - 1) {
            setCurrentStepIndex((prev) => prev + 1);
        } else {
            handleFinish();
        }
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((prev) => prev - 1);
        }
    };

    const handleSkip = () => {
        setIsVisible(false);
        localStorage.setItem('chromatic_navbar_tour_seen', 'true');
    };

    const handleFinish = () => {
        setIsVisible(false);
        localStorage.setItem('chromatic_navbar_tour_seen', 'true');
    };

    if (!isVisible) return null;

    const currentStep = TOUR_STEPS[currentStepIndex];

    return createPortal(
        <div className="fixed inset-0 z-[9999] pointer-events-none font-sans">
            <AnimatePresence>
                {/* --- Backdrop / Spotlight Overlay --- */}
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-background/60 backdrop-blur-[2px]"
                        style={{
                            clipPath: targetRect
                                ? `polygon(
                                    0% 0%, 
                                    0% 100%, 
                                    ${targetRect.left}px 100%, 
                                    ${targetRect.left}px ${targetRect.top}px, 
                                    ${targetRect.right}px ${targetRect.top}px, 
                                    ${targetRect.right}px ${targetRect.bottom}px, 
                                    ${targetRect.left}px ${targetRect.bottom}px, 
                                    ${targetRect.left}px 100%, 
                                    100% 100%, 
                                    100% 0%
                                   )`
                                : 'none'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* --- Spotlight Highlight (The Glowing Box) --- */}
            {targetRect && (
                <motion.div
                    layoutId="tour-highlight"
                    className="absolute border-2 border-primary rounded-lg shadow-[0_0_30px_hsl(var(--primary)/0.3)] pointer-events-none"
                    initial={false}
                    animate={{
                        top: targetRect.top - 8,
                        left: targetRect.left - 8,
                        width: targetRect.width + 16,
                        height: targetRect.height + 16,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                    {/* Inner soft glow */}
                    <div className="absolute inset-0 rounded-lg bg-primary/10 mix-blend-screen" />
                </motion.div>
            )}

            {/* --- Tooltip Card --- */}
            <div
                className="absolute pointer-events-auto"
                style={{
                    top: tooltipPosition.top,
                    left: tooltipPosition.left,
                    transform: 'translateX(-50%)',
                }}
            >
                <motion.div
                    key={currentStepIndex}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                    className="w-[340px] bg-popover/95 backdrop-blur-xl border border-primary/40 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden"
                >
                    {/* Decorative Top Line */}
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />

                    <div className="p-6 relative">
                        {/* Subtle Background Glow */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none" />

                        {/* Header: Step Indicator & Title */}
                        <div className="flex flex-col gap-1 mb-3">
                            <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                                Step {currentStepIndex + 1} of {TOUR_STEPS.length}
                            </span>
                            <h3 className="text-lg font-bold text-foreground leading-tight">
                                {currentStep.title}
                            </h3>
                        </div>

                        {/* Body Message */}
                        <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-6">
                            {currentStep.message}
                        </p>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-between">
                            {/* Skip / Back */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleSkip}
                                    className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                                >
                                    Skip
                                </button>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleBack}
                                    disabled={currentStepIndex === 0}
                                    className="h-8 px-3 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg text-xs disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
                                >
                                    Back
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={handleNext}
                                    className="h-8 px-4 bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs rounded-lg shadow-[0_0_20px_hsl(var(--primary)/0.4)] transition-all hover:scale-105 active:scale-95"
                                >
                                    {currentStepIndex === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>,
        document.body
    );
};

