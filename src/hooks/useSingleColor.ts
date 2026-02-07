import { useState, useEffect } from 'react';

const STORAGE_KEY = 'chromatic-single-color';
const TEXT_COLOR_KEY = 'chromatic-text-color';
const BACKGROUND_COLOR_KEY = 'chromatic-background-color';
const SECONDARY_COLOR_KEY = 'chromatic-secondary-color';
const ACCENT_COLOR_KEY = 'chromatic-accent-color';

const DEFAULT_COLOR = '#3b82f6'; // Blue
const DEFAULT_TEXT_COLOR = '#1f2937'; // Dark Gray
const DEFAULT_BACKGROUND_COLOR = '#f3f4f6'; // Light Gray
const DEFAULT_SECONDARY_COLOR = '#e5e7eb'; // Gray-200
const DEFAULT_ACCENT_COLOR = '#3b82f6'; // Blue (same as primary default)

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

    const [secondaryColor, setSecondaryColor] = useState<string>(() => {
        const stored = localStorage.getItem(SECONDARY_COLOR_KEY);
        return stored || DEFAULT_SECONDARY_COLOR;
    });

    const [accentColor, setAccentColor] = useState<string>(() => {
        const stored = localStorage.getItem(ACCENT_COLOR_KEY);
        return stored || DEFAULT_ACCENT_COLOR;
    });

    useEffect(() => {
        const root = document.documentElement;

        // Apply primary color to components
        root.style.setProperty('--demo-primary', color);

        // Apply text color
        root.style.setProperty('--demo-text', textColor);

        // Apply background color
        root.style.setProperty('--demo-background', backgroundColor);

        // Apply new customizable colors
        root.style.setProperty('--demo-secondary', secondaryColor);
        root.style.setProperty('--demo-accent', accentColor);

    }, [color, textColor, backgroundColor, secondaryColor, accentColor]);

    const saveColor = (newColor: string) => localStorage.setItem(STORAGE_KEY, newColor);
    const saveTextColor = (newTextColor: string) => localStorage.setItem(TEXT_COLOR_KEY, newTextColor);
    const saveBackgroundColor = (newBackgroundColor: string) => localStorage.setItem(BACKGROUND_COLOR_KEY, newBackgroundColor);
    const saveSecondaryColor = (newColor: string) => localStorage.setItem(SECONDARY_COLOR_KEY, newColor);
    const saveAccentColor = (newColor: string) => localStorage.setItem(ACCENT_COLOR_KEY, newColor);

    const updateColor = (newColor: string) => setColor(newColor);
    const updateTextColor = (newTextColor: string) => setTextColor(newTextColor);
    const updateBackgroundColor = (newBackgroundColor: string) => setBackgroundColor(newBackgroundColor);
    const updateSecondaryColor = (newColor: string) => setSecondaryColor(newColor);
    const updateAccentColor = (newColor: string) => setAccentColor(newColor);

    const resetColor = () => {
        setColor(DEFAULT_COLOR);
        setTextColor(DEFAULT_TEXT_COLOR);
        setBackgroundColor(DEFAULT_BACKGROUND_COLOR);
        setSecondaryColor(DEFAULT_SECONDARY_COLOR);
        setAccentColor(DEFAULT_ACCENT_COLOR);

        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(TEXT_COLOR_KEY);
        localStorage.removeItem(BACKGROUND_COLOR_KEY);
        localStorage.removeItem(SECONDARY_COLOR_KEY);
        localStorage.removeItem(ACCENT_COLOR_KEY);
        localStorage.removeItem('chromatic-muted-color'); // Also remove old key if it exists
    };

    return {
        color,
        textColor,
        backgroundColor,
        secondaryColor,
        accentColor,
        updateColor,
        updateTextColor,
        updateBackgroundColor,
        updateSecondaryColor,
        updateAccentColor,
        resetColor,
        saveColor,
        saveTextColor,
        saveBackgroundColor,
        saveSecondaryColor,
        saveAccentColor,
    };
};
