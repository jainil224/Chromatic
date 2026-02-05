import { TailwindShades } from './colorUtils';

export interface ColorConfig {
    background: string;
    primary: string;
    secondary: string;
    text: string;
    accent: string;
}

/**
 * Export Tailwind CSS configuration
 */
export const exportTailwindConfig = (
    colorName: string,
    palette: TailwindShades
): string => {
    const config = `module.exports = {
  theme: {
    extend: {
      colors: {
        ${colorName}: {
          50: '${palette[50]}',
          100: '${palette[100]}',
          200: '${palette[200]}',
          300: '${palette[300]}',
          400: '${palette[400]}',
          500: '${palette[500]}',
          600: '${palette[600]}',
          700: '${palette[700]}',
          800: '${palette[800]}',
          900: '${palette[900]}',
          950: '${palette[950]}',
        },
      },
    },
  },
  plugins: [],
}`;

    return config;
};

/**
 * Export CSS variables
 */
export const exportCSSVariables = (colors: ColorConfig): string => {
    const css = `:root {
  /* Background */
  --color-background: ${colors.background};
  
  /* Primary */
  --color-primary: ${colors.primary};
  
  /* Secondary */
  --color-secondary: ${colors.secondary};
  
  /* Text */
  --color-text: ${colors.text};
  
  /* Accent */
  --color-accent: ${colors.accent};
}`;

    return css;
};

/**
 * Download file helper
 */
export const downloadFile = (content: string, filename: string, type: string = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
