import { memo, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { CssImportSection } from './CssImportSection';

interface SingleColorPickerProps {
    color: string;
    textColor: string;
    backgroundColor: string;
    secondaryColor: string;
    accentColor: string;
    onColorChange: (color: string) => void;
    onTextColorChange: (color: string) => void;
    onBackgroundColorChange: (color: string) => void;
    onSecondaryColorChange: (color: string) => void;
    onAccentColorChange: (color: string) => void;
    onSave: () => void;
    onReset: () => void;
}

export const SingleColorPicker = memo(function SingleColorPicker({
    color,
    textColor,
    backgroundColor,
    secondaryColor,
    accentColor,
    onColorChange,
    onTextColorChange,
    onBackgroundColorChange,
    onSecondaryColorChange,
    onAccentColorChange,
    onSave,
    onReset,
}: SingleColorPickerProps) {
    const [copied, setCopied] = useState(false);

    const copyColor = () => {
        navigator.clipboard.writeText(color);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Global Color System</h2>
                        <p className="text-sm text-secondary-foreground/70">
                            Change the color below to instantly update <strong>all components</strong> across the preview
                        </p>
                    </div>

                    {/* How it works Info Box */}
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                        <p className="text-xs text-foreground">
                            <strong>💡 System Logic:</strong> This panel controls global application theme variables.
                            Updating these colors will instantly propagate to <strong>all components</strong> in the live preview.
                        </p>
                    </div>

                    {/* CSS Import Section */}
                    <div className="pb-2">
                        <CssImportSection
                            onUpdatePrimary={onColorChange}
                            onUpdateSecondary={onSecondaryColorChange}
                            onUpdateAccent={onAccentColorChange}
                            onUpdateBackground={onBackgroundColorChange}
                        />
                    </div>

                    {/* Main Color Picker Card */}
                    <div className="p-6 rounded-xl bg-card border-2 border-border space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">Primary Color</h3>
                            <p className="text-sm text-secondary-foreground/70">Main brand color for all components</p>
                        </div>

                        {/* Large Color Picker */}
                        <div className="relative">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => onColorChange(e.target.value)}
                                className="w-full h-24 rounded-lg cursor-pointer border-2 border-border hover:border-primary transition-colors"
                                style={{
                                    WebkitAppearance: 'none',
                                    appearance: 'none',
                                }}
                            />
                        </div>

                        {/* Hex Input with Copy */}
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={color}
                                onChange={(e) => onColorChange(e.target.value)}
                                className="flex-1 px-3 py-2 text-sm font-mono bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="#000000"
                            />
                            <button
                                onClick={copyColor}
                                className="p-2 hover:bg-secondary rounded-lg transition-colors border border-border flex-shrink-0"
                                title="Copy color"
                            >
                                {copied ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4 text-secondary-foreground/60" />
                                )}
                            </button>
                        </div>

                        {/* Affects Tags */}
                        <div className="pt-4 border-t border-border">
                            <p className="text-xs font-medium text-secondary-foreground/70 mb-3">This color controls:</p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    'All buttons',
                                    'CTAs',
                                    'Icons',
                                    'Chart bars',
                                    'Active states',
                                    'Highlights',
                                    'Progress bars',
                                    'Badges',
                                    'Links',
                                ].map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1.5 bg-secondary border border-border rounded-full text-xs text-foreground"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Text Color Picker Card */}
                    <div className="p-6 rounded-xl bg-card border-2 border-border space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">Text Color</h3>
                            <p className="text-sm text-secondary-foreground/70">Color for all text content</p>
                        </div>

                        {/* Text Color Picker */}
                        <div className="relative">
                            <input
                                type="color"
                                value={textColor}
                                onChange={(e) => onTextColorChange(e.target.value)}
                                className="w-full h-24 rounded-lg cursor-pointer border-2 border-border hover:border-primary transition-colors"
                                style={{
                                    WebkitAppearance: 'none',
                                    appearance: 'none',
                                }}
                            />
                        </div>

                        {/* Text Hex Input with Copy */}
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={textColor}
                                onChange={(e) => onTextColorChange(e.target.value)}
                                className="flex-1 px-3 py-2 text-sm font-mono bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="#000000"
                            />
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(textColor);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="p-2 hover:bg-secondary rounded-lg transition-colors border border-border flex-shrink-0"
                                title="Copy color"
                            >
                                {copied ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4 text-secondary-foreground/60" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Background Color Picker Card */}
                    <div className="p-6 rounded-xl bg-card border-2 border-border space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">Background Color</h3>
                            <p className="text-sm text-secondary-foreground/70">Main background color for the preview</p>
                        </div>

                        {/* Background Color Picker */}
                        <div className="relative">
                            <input
                                type="color"
                                value={backgroundColor}
                                onChange={(e) => onBackgroundColorChange(e.target.value)}
                                className="w-full h-24 rounded-lg cursor-pointer border-2 border-border hover:border-primary transition-colors"
                                style={{
                                    WebkitAppearance: 'none',
                                    appearance: 'none',
                                }}
                            />
                        </div>

                        {/* Background Hex Input with Copy */}
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={backgroundColor}
                                onChange={(e) => onBackgroundColorChange(e.target.value)}
                                className="flex-1 px-3 py-2 text-sm font-mono bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="#FFFFFF"
                            />
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(backgroundColor);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="p-2 hover:bg-secondary rounded-lg transition-colors border border-border flex-shrink-0"
                                title="Copy color"
                            >
                                {copied ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4 text-secondary-foreground/60" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Secondary Color Picker Card */}
                    <div className="p-6 rounded-xl bg-card border-2 border-border space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">Secondary Color</h3>
                            <p className="text-sm text-secondary-foreground/70">Secondary brand color</p>
                        </div>
                        <div className="relative">
                            <input
                                type="color"
                                value={secondaryColor}
                                onChange={(e) => onSecondaryColorChange(e.target.value)}
                                className="w-full h-24 rounded-lg cursor-pointer border-2 border-border hover:border-primary transition-colors"
                                style={{ WebkitAppearance: 'none', appearance: 'none' }}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={secondaryColor}
                                onChange={(e) => onSecondaryColorChange(e.target.value)}
                                className="flex-1 px-3 py-2 text-sm font-mono bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                onClick={() => { navigator.clipboard.writeText(secondaryColor); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                                className="p-2 hover:bg-secondary rounded-lg transition-colors border border-border flex-shrink-0"
                            >
                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-secondary-foreground/60" />}
                            </button>
                        </div>
                    </div>

                    {/* Accent Color Picker Card */}
                    <div className="p-6 rounded-xl bg-card border-2 border-border space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">Accent Color</h3>
                            <p className="text-sm text-secondary-foreground/70">Highlights and active states</p>
                        </div>
                        <div className="relative">
                            <input
                                type="color"
                                value={accentColor}
                                onChange={(e) => onAccentColorChange(e.target.value)}
                                className="w-full h-24 rounded-lg cursor-pointer border-2 border-border hover:border-primary transition-colors"
                                style={{ WebkitAppearance: 'none', appearance: 'none' }}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={accentColor}
                                onChange={(e) => onAccentColorChange(e.target.value)}
                                className="flex-1 px-3 py-2 text-sm font-mono bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button
                                onClick={() => { navigator.clipboard.writeText(accentColor); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                                className="p-2 hover:bg-secondary rounded-lg transition-colors border border-border flex-shrink-0"
                            >
                                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-secondary-foreground/60" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fixed Bottom Actions */}
            <div className="border-t border-border bg-card p-6 mt-auto">
                <div className="flex gap-3">
                    <button
                        onClick={onSave}
                        className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                    >
                        Save Configuration
                    </button>
                    <button
                        onClick={onReset}
                        className="px-4 py-3 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
});
