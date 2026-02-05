import { memo, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { generateTailwindPalette, TailwindShades } from '@/utils/colorUtils';
import { exportTailwindConfig, downloadFile } from '@/utils/exportConfig';

interface TailwindPaletteDisplayProps {
    baseColor: string;
    colorName: string;
}

export const TailwindPaletteDisplay = memo(function TailwindPaletteDisplay({
    baseColor,
    colorName,
}: TailwindPaletteDisplayProps) {
    const [copiedShade, setCopiedShade] = useState<string | null>(null);
    const palette = generateTailwindPalette(baseColor);

    const copyToClipboard = (shade: string, color: string) => {
        navigator.clipboard.writeText(color);
        setCopiedShade(shade);
        setTimeout(() => setCopiedShade(null), 2000);
    };

    const handleExport = () => {
        const config = exportTailwindConfig(colorName, palette);
        downloadFile(config, 'tailwind.config.js', 'text/javascript');
    };

    const shades = Object.entries(palette) as Array<[string, string]>;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Tailwind Palette</h3>
                    <p className="text-xs text-muted-foreground">
                        Generated shades (50-950)
                    </p>
                </div>
                <button
                    onClick={handleExport}
                    className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                    Export Config
                </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
                {shades.map(([shade, color]) => (
                    <div
                        key={shade}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                        <div
                            className="w-12 h-12 rounded-lg border-2 border-border flex-shrink-0 transition-transform group-hover:scale-105"
                            style={{ backgroundColor: color }}
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-foreground">
                                    {colorName}-{shade}
                                </span>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground">
                                {color}
                            </span>
                        </div>
                        <button
                            onClick={() => copyToClipboard(shade, color)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                            title="Copy color"
                        >
                            {copiedShade === shade ? (
                                <Check className="h-4 w-4 text-green-500" />
                            ) : (
                                <Copy className="h-4 w-4 text-muted-foreground" />
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
});
