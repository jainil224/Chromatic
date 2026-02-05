import { useState, useEffect } from 'react';

export interface ColorConfig {
    background: string;
    primary: string;
    secondary: string;
    text: string;
    accent: string;
}

const STORAGE_KEY = 'chromatic_color_config';

export const defaultColors: ColorConfig = {
    background: '#f3f4f6',  // Light Gray for sections
    primary: '#3b82f6',     // Blue
    secondary: '#e5e7eb',   // Lighter Gray for borders
    text: '#1f2937',        // Dark Gray
    accent: '#8b5cf6',      // Purple
};

export const useColorConfig = () => {
    const [config, setConfig] = useState<ColorConfig>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse color config:', e);
                return defaultColors;
            }
        }
        return defaultColors;
    });

    // Apply colors to CSS variables
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--demo-background', config.background);
        root.style.setProperty('--demo-primary', config.primary);
        root.style.setProperty('--demo-secondary', config.secondary);
        root.style.setProperty('--demo-text', config.text);
        root.style.setProperty('--demo-accent', config.accent);
    }, [config]);

    const saveConfig = (newConfig: ColorConfig) => {
        setConfig(newConfig);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    };

    const updateColor = (role: keyof ColorConfig, color: string) => {
        const newConfig = { ...config, [role]: color };
        saveConfig(newConfig);
    };

    const resetConfig = () => {
        setConfig(defaultColors);
        localStorage.removeItem(STORAGE_KEY);
    };

    return { config, saveConfig, updateColor, resetConfig };
};
