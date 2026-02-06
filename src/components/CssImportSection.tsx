import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, Plus, ClipboardPaste } from 'lucide-react';

interface CssImportSectionProps {
    onUpdatePrimary: (color: string) => void;
    onUpdateSecondary: (color: string) => void;
    onUpdateAccent: (color: string) => void;
    onUpdateMuted: (color: string) => void;
    onUpdateBackground: (color: string) => void;
}

export const CssImportSection = ({
    onUpdatePrimary,
    onUpdateSecondary,
    onUpdateAccent,
    onUpdateMuted,
    onUpdateBackground
}: CssImportSectionProps) => {
    const [cssInput, setCssInput] = useState('');

    const handleImport = () => {
        if (!cssInput.trim()) {
            toast.error("Please paste some CSS first");
            return;
        }

        // Regex to find variable definitions: --variable-name: #hexcode;
        // Supports hex codes (3, 4, 6, 8 digits) and now supports alphanumeric names (e.g. primary, 1, 2)
        const variableRegex = /--color-([a-z0-9]+)\s*:\s*(#[0-9a-fA-F]{3,8})/g;

        let match;
        let found = 0;

        while ((match = variableRegex.exec(cssInput)) !== null) {
            const [, variable, color] = match;

            switch (variable) {
                case 'primary':
                case '1':
                    onUpdatePrimary(color);
                    found++;
                    break;
                case 'secondary':
                case '2':
                    onUpdateSecondary(color);
                    found++;
                    break;
                case 'accent':
                case '3':
                    onUpdateAccent(color);
                    found++;
                    break;
                case 'muted':
                case '4':
                    onUpdateMuted(color);
                    found++;
                    break;
                case 'background':
                case '5':
                    onUpdateBackground(color);
                    found++;
                    break;
            }
        }

        if (found > 0) {
            toast.success(`Imported ${found} colors successfully!`);
            setCssInput('');
        } else {
            toast.warning("No valid color variables found. Check the format.");
        }
    };

    return (
        <div className="p-6 rounded-xl bg-card border-2 border-border space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
                    <ClipboardPaste className="h-5 w-5 text-primary" />
                    Paste CSS Color Variables
                </h3>
                <p className="text-sm text-muted-foreground">
                    Paste your <code>:root</code> variables here to instantly update the theme.
                </p>
            </div>

            <div className="space-y-3">
                <Textarea
                    value={cssInput}
                    onChange={(e) => setCssInput(e.target.value)}
                    placeholder=":root {&#10;  --color-primary: #fbfbfb;&#10;  --color-secondary: #eaf8ff;&#10;  --color-accent: #cfdcff;&#10;  --color-muted: #cfcaff;&#10;  --color-background: #f7f8ff;&#10;}"
                    className="font-mono text-xs h-40 bg-background resize-none border-border focus-visible:ring-primary"
                />
                <Button
                    onClick={handleImport}
                    className="w-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                    Apply Colors
                </Button>
            </div>
        </div>
    );
};
