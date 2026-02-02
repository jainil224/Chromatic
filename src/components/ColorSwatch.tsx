import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

interface ColorSwatchProps {
  color: string;
  index: number;
}

export function ColorSwatch({ color, index }: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(color);
    setCopied(true);
    toast.success(`Copied ${color}`, {
      duration: 1500,
      position: "bottom-center",
    });
    setTimeout(() => setCopied(false), 1500);
  };

  // Determine if text should be light or dark based on color
  const isLight = (hex: string) => {
    const c = hex.substring(1);
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luma > 140;
  };

  const textColor = isLight(color) ? "#1a1a1a" : "#ffffff";

  return (
    <button
      onClick={copyToClipboard}
      className="group relative flex flex-1 min-w-0 flex-col items-center justify-end overflow-hidden py-6 transition-all duration-300 hover:flex-[1.5] opacity-0 animate-scale-in"
      style={{ 
        backgroundColor: color,
        animationDelay: `${0.3 + index * 0.08}s`,
      }}
    >
      {/* Hover overlay */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ 
          background: `linear-gradient(to top, ${color}ee, ${color}88)` 
        }}
      />

      {/* Content */}
      <div 
        className="relative z-10 flex flex-col items-center gap-2 opacity-0 transition-all duration-200 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
        style={{ color: textColor }}
      >
        {copied ? (
          <Check className="h-5 w-5" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="font-mono text-xs font-medium uppercase tracking-wider">
          {color}
        </span>
      </div>

      {/* Always visible color code on mobile */}
      <span 
        className="relative z-10 font-mono text-[10px] font-medium uppercase tracking-wider opacity-50 transition-opacity group-hover:opacity-0 md:hidden"
        style={{ color: textColor }}
      >
        {color}
      </span>
    </button>
  );
}
