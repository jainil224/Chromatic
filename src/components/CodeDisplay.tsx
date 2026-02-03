import { useState } from "react";
import { Check, Copy, Code2 } from "lucide-react";
import { toast } from "sonner";
import type { Palette } from "@/data/palettes";

interface CodeDisplayProps {
  palette: Palette;
}

type CodeFormat = "css" | "tailwind" | "scss";

export function CodeDisplay({ palette }: CodeDisplayProps) {
  const [format, setFormat] = useState<CodeFormat>("css");
  const [copied, setCopied] = useState(false);

  const generateCode = (): string => {
    const colorNames = ["primary", "secondary", "accent", "muted", "background"];

    switch (format) {
      case "css":
        return `:root {
${palette.colors.map((c, i) => `  --color-${colorNames[i] || `shade-${i + 1}`}: ${c};`).join("\n")}
}`;

      case "tailwind":
        return `// tailwind.config.js
colors: {
${palette.colors.map((c, i) => `  '${colorNames[i] || `shade-${i + 1}`}': '${c}',`).join("\n")}
}`;

      case "scss":
        return `// _variables.scss
${palette.colors.map((c, i) => `$color-${colorNames[i] || `shade-${i + 1}`}: ${c};`).join("\n")}`;

      default:
        return "";
    }
  };

  const code = generateCode();

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard", {
      duration: 1500,
      position: "bottom-center",
    });
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-3 opacity-0 animate-slide-in-right" style={{ animationDelay: "0.4s" }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Code2 className="h-4 w-4" />
          <span className="font-mono text-xs uppercase tracking-widest">Generated Code</span>
        </div>

        {/* Format Toggle */}
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {(["css", "tailwind", "scss"] as CodeFormat[]).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`rounded-md px-3 py-1 font-mono text-xs uppercase transition-all ${format === f
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Code Block */}
      <div className="relative overflow-hidden rounded-lg border border-border bg-muted/50">
        <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-foreground">
          <code>{code}</code>
        </pre>

        {/* Copy Button */}
        <button
          onClick={copyCode}
          className="absolute right-2 top-2 z-10 flex items-center gap-1.5 rounded-md border border-border bg-card/80 backdrop-blur-sm px-3 py-1.5 font-mono text-xs shadow-sm transition-all hover:border-primary hover:text-primary hover:bg-card"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </button>
      </div>
    </div>
  );
}
