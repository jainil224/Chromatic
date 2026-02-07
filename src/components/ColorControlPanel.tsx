import { memo } from 'react';
import { Copy, Check } from 'lucide-react';
import { ColorConfig } from '@/hooks/useColorConfig';
import { useState } from 'react';

interface ColorControlPanelProps {
    colors: ColorConfig;
    onColorChange: (role: keyof ColorConfig, color: string) => void;
    onReset: () => void;
    onSave: () => void;
}

const colorRoles = [
    {
        key: 'background' as keyof ColorConfig,
        label: 'Section Background',
        description: 'All section containers',
        affects: ['Pricing cards', 'Feature cards', 'Stats cards', 'Chart backgrounds']
    },
    {
        key: 'primary' as keyof ColorConfig,
        label: 'Primary Color',
        description: 'Main brand color',
        affects: ['All buttons', 'CTAs', 'Icons', 'Chart bars', 'Active states']
    },
    {
        key: 'secondary' as keyof ColorConfig,
        label: 'Secondary Color',
        description: 'Borders and dividers',
        affects: ['Card borders', 'Dividers', 'Subtle backgrounds']
    },
    {
        key: 'text' as keyof ColorConfig,
        label: 'Text Color',
        description: 'All text content',
        affects: ['Headings', 'Body text', 'Labels', 'Descriptions']
    },
    {
        key: 'accent' as keyof ColorConfig,
        label: 'Accent Color',
        description: 'Highlights and accents',
        affects: ['Secondary buttons', 'Badges', 'Progress bars', 'Highlights']
    },
];

export const ColorControlPanel = memo(function ColorControlPanel({
    colors,
    onColorChange,
    onReset,
    onSave,
}: ColorControlPanelProps) {
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    const copyColor = (color: string, key: string) => {
        navigator.clipboard.writeText(color);
        setCopiedColor(key);
        setTimeout(() => setCopiedColor(null), 2000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Global Color System</h2>
                <p className="text-sm text-secondary-foreground/70">
                    Change any color below to instantly update <strong>all related components</strong> across the preview
                </p>
            </div>

            {/* Color Pickers */}
            <div className="space-y-6">
                {colorRoles.map((role) => (
                    <div key={role.key} className="space-y-3 p-4 rounded-lg bg-secondary/50 border border-border">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <label className="text-sm font-semibold text-foreground">
                                    {role.label}
                                </label>
                                <p className="text-xs text-secondary-foreground/70 mt-0.5">
                                    {role.description}
                                </p>
                            </div>
                        </div>

                        {/* Color Picker and Input */}
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={colors[role.key]}
                                onChange={(e) => onColorChange(role.key, e.target.value)}
                                className="w-16 h-16 rounded-lg cursor-pointer border-2 border-border hover:border-primary transition-colors"
                            />
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={colors[role.key]}
                                        onChange={(e) => onColorChange(role.key, e.target.value)}
                                        className="flex-1 px-3 py-2 text-sm font-mono bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        placeholder="#000000"
                                    />
                                    <button
                                        onClick={() => copyColor(colors[role.key], role.key)}
                                        className="p-2 hover:bg-secondary rounded-lg transition-colors"
                                        title="Copy color"
                                    >
                                        {copiedColor === role.key ? (
                                            <Check className="h-4 w-4 text-green-500" />
                                        ) : (
                                            <Copy className="h-4 w-4 text-secondary-foreground/70" />
                                        )}
                                    </button>
                                </div>

                                {/* Affects List */}
                                <div className="flex flex-wrap gap-1">
                                    {role.affects.map((item, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[10px] px-2 py-0.5 bg-background border border-border rounded-full text-secondary-foreground/70"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Box */}
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-xs text-foreground">
                    <strong>💡 How it works:</strong> All components are linked to these colors via CSS variables.
                    Change any color above and watch <strong>every related component</strong> update instantly across the entire preview.
                </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
                <button
                    onClick={onSave}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                    Save Configuration
                </button>
                <button
                    onClick={onReset}
                    className="px-4 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                    Reset
                </button>
            </div>
        </div>
    );
});
