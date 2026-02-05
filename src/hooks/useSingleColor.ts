import { useState, useEffect } from 'react';

const STORAGE_KEY = 'chromatic-single-color';
const TEXT_COLOR_KEY = 'chromatic-text-color';
const BACKGROUND_COLOR_KEY = 'chromatic-background-color';
const DEFAULT_COLOR = '#3b82f6'; // Blue
const DEFAULT_TEXT_COLOR = '#1f2937'; // Dark Gray
const DEFAULT_BACKGROUND_COLOR = '#f3f4f6'; // Light Gray

export const useSingleColor = () => {
    const [color, setColor] = useState<string>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored || DEFAULT_COLOR;
    });

    const [textColor, setTextColor] = useState<string>(() => {
        const stored = localStorage.getItem(TEXT_COLOR_KEY);
        return stored || DEFAULT_TEXT_COLOR;
    });

    const [backgroundColor, setBackgroundColor] = useState<string>(() => {
        const stored = localStorage.getItem(BACKGROUND_COLOR_KEY);
        return stored || DEFAULT_BACKGROUND_COLOR;
    });

    useEffect(() => {
        const root = document.documentElement;

        // Apply primary color to components
        root.style.setProperty('--demo-primary', color);
        root.style.setProperty('--demo-accent', color);

        // Apply text color
        root.style.setProperty('--demo-text', textColor);

        // Apply background color
        root.style.setProperty('--demo-background', backgroundColor);
        root.style.setProperty('--demo-secondary', '#e5e7eb'); // Fixed secondary color
    }, [color, textColor, backgroundColor]);

    const saveColor = (newColor: string) => {
        localStorage.setItem(STORAGE_KEY, newColor);
    };

    const saveTextColor = (newTextColor: string) => {
        localStorage.setItem(TEXT_COLOR_KEY, newTextColor);
    };

    const saveBackgroundColor = (newBackgroundColor: string) => {
        localStorage.setItem(BACKGROUND_COLOR_KEY, newBackgroundColor);
    };

    const updateColor = (newColor: string) => {
        setColor(newColor);
    };

    const updateTextColor = (newTextColor: string) => {
        setTextColor(newTextColor);
    };

    const updateBackgroundColor = (newBackgroundColor: string) => {
        setBackgroundColor(newBackgroundColor);
    };

    const resetColor = () => {
        setColor(DEFAULT_COLOR);
        setTextColor(DEFAULT_TEXT_COLOR);
        setBackgroundColor(DEFAULT_BACKGROUND_COLOR);
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(TEXT_COLOR_KEY);
        localStorage.removeItem(BACKGROUND_COLOR_KEY);
    };

    return {
        color,
        textColor,
        backgroundColor,
        updateColor,
        updateTextColor,
        updateBackgroundColor,
        resetColor,
        saveColor,
        saveTextColor,
        saveBackgroundColor,
    };
};
