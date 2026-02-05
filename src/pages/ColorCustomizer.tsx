import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { SingleColorPicker } from '@/components/SingleColorPicker';
import { DemoWebsitePreview } from '@/components/DemoWebsitePreview';
import { useSingleColor } from '@/hooks/useSingleColor';
import { toast } from 'sonner';

const ColorCustomizer = () => {
    const navigate = useNavigate();
    const { color, textColor, updateColor, updateTextColor, resetColor, saveColor, saveTextColor } = useSingleColor();

    const handleSave = () => {
        saveColor(color);
        saveTextColor(textColor);
        toast.success('Configuration saved successfully!');
    };

    const handleReset = () => {
        resetColor();
        toast.success('Colors reset to default!');
    };

    const handleExportCSS = () => {
        const cssContent = `:root {
  --demo-primary: ${color};
  --demo-accent: ${color};
  --demo-text: ${textColor};
  --demo-background: #f3f4f6;
  --demo-secondary: #e5e7eb;
}`;

        const blob = new Blob([cssContent], { type: 'text/css' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'color-config.css';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('CSS exported successfully!');
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Main Content - Fullscreen */}
            <div className="h-screen">
                <div className="grid lg:grid-cols-[400px,1fr] gap-0 h-full">
                    {/* Left Panel - Single Color Picker */}
                    <div className="border-r border-border bg-card overflow-y-auto flex flex-col">
                        {/* Panel Header */}
                        <div className="p-4 border-b border-border flex items-center justify-between">
                            <button
                                onClick={() => navigate('/')}
                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                                title="Back to home"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <button
                                onClick={handleExportCSS}
                                className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity text-sm"
                            >
                                <Download className="h-4 w-4" />
                                Export
                            </button>
                        </div>

                        {/* Color Picker Content */}
                        <div className="flex-1 overflow-hidden">
                            <SingleColorPicker
                                color={color}
                                textColor={textColor}
                                onColorChange={updateColor}
                                onTextColorChange={updateTextColor}
                                onSave={handleSave}
                                onReset={handleReset}
                            />
                        </div>
                    </div>

                    {/* Right Panel - Preview */}
                    <div className="bg-background overflow-hidden">
                        <DemoWebsitePreview />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorCustomizer;
