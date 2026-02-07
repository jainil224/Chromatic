import { useState, useRef, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
    Upload,
    Image as ImageIcon,
    X,
    Plus,
    Minus,
    Download,
    Copy,
    Check,
    ChevronDown
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Marker {
    x: number;
    y: number;
    color: string;
}

interface ImagePickerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onExport?: (palette: { name: string; colors: string[] }) => void;
    // Persistence props
    savedImage: string | null;
    onImageChange: (img: string | null) => void;
    savedMarkers: Marker[];
    onMarkersChange: (markers: Marker[]) => void;
    savedNumColors: number;
    onNumColorsChange: (num: number) => void;
}

export function ImagePickerModal({
    isOpen,
    onClose,
    onExport,
    savedImage,
    onImageChange,
    savedMarkers,
    onMarkersChange,
    savedNumColors,
    onNumColorsChange
}: ImagePickerModalProps) {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [pickerSize, setPickerSize] = useState(96); // Loupe Size control (default 96px)

    // Loupe State
    const [isLoupeVisible, setIsLoupeVisible] = useState(false);

    // Performance Optimization: Localize markers to avoid global re-renders during drag
    const [localMarkers, setLocalMarkers] = useState<Marker[]>(savedMarkers);
    const localMarkersRef = useRef<Marker[]>(savedMarkers);
    const draggingRef = useRef<number | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const loupeRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);

    // Sync ref with state
    useEffect(() => {
        localMarkersRef.current = localMarkers;
    }, [localMarkers]);

    // Sync from parent only when modal opens
    useEffect(() => {
        if (isOpen) {
            setLocalMarkers(savedMarkers);
        }
    }, [isOpen]); // Only when opening to prevent fighting during interaction

    const getPixelColor = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        const dpr = window.devicePixelRatio || 1;
        // Sample from the physical pixel coordinates
        const cx = Math.max(0, Math.min(Math.round(x * dpr), ctx.canvas.width - 1));
        const cy = Math.max(0, Math.min(Math.round(y * dpr), ctx.canvas.height - 1));
        const data = ctx.getImageData(cx, cy, 1, 1).data;
        return `#${((1 << 24) + (data[0] << 16) + (data[1] << 8) + data[2]).toString(16).slice(1).toUpperCase()}`;
    };

    const updateLoupe = useCallback((x: number, y: number) => {
        const sourceCanvas = canvasRef.current;
        const targetCanvas = loupeRef.current;
        if (!sourceCanvas || !targetCanvas) return;

        const ctx = targetCanvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const zoomLevel = 10; // 10x magnification
        const size = targetCanvas.width; // Physical size scaled by DPR in rendering
        const sourceSize = (targetCanvas.width / dpr) / zoomLevel;

        // Source coordinates scaled by DPR for absolute accuracy
        const sx = (x * dpr) - (sourceSize * dpr / 2);
        const sy = (y * dpr) - (sourceSize * dpr / 2);

        ctx.imageSmoothingEnabled = false; // Keep pixels sharp
        ctx.clearRect(0, 0, size, size);

        // Draw the zoomed section of the image
        ctx.drawImage(
            sourceCanvas,
            sx, sy, sourceSize * dpr, sourceSize * dpr,
            0, 0, size, size
        );

        // Draw high-contrast small crosshair (+)
        const centerX = size / 2;
        const centerY = size / 2;
        const crossSize = 6; // Crosshair arm length

        // Draw shadow/outline for contrast (Black)
        ctx.strokeStyle = "rgba(0,0,0,0.8)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        // Horizontal
        ctx.moveTo(centerX - crossSize, centerY); ctx.lineTo(centerX + crossSize, centerY);
        // Vertical
        ctx.moveTo(centerX, centerY - crossSize); ctx.lineTo(centerX, centerY + crossSize);
        ctx.stroke();

        // Draw core crosshair (White)
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        // Horizontal
        ctx.moveTo(centerX - crossSize, centerY); ctx.lineTo(centerX + crossSize, centerY);
        // Vertical
        ctx.moveTo(centerX, centerY - crossSize); ctx.lineTo(centerX, centerY + crossSize);
        ctx.stroke();
    }, []);

    const drawImageToCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        const img = imageRef.current;
        if (!canvas || !container || !img || !img.complete) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const containerWidth = container.clientWidth;
        const containerHeight = 400; // Fixed container height

        if (containerWidth === 0) return; // Wait for layout

        const ratio = Math.min(containerWidth / img.width, containerHeight / img.height);
        const logicalWidth = img.width * ratio;
        const logicalHeight = img.height * ratio;

        // High-DPI Scaling: Adjust physical buffer size vs CSS display size
        if (canvas.width !== logicalWidth * dpr || canvas.height !== logicalHeight * dpr) {
            canvas.width = logicalWidth * dpr;
            canvas.height = logicalHeight * dpr;
            canvas.style.width = `${logicalWidth}px`;
            canvas.style.height = `${logicalHeight}px`;

            ctx.scale(dpr, dpr);
            ctx.drawImage(img, 0, 0, logicalWidth, logicalHeight);

            // Re-sync marker colors with precision
            if (localMarkersRef.current.length > 0) {
                const refreshed = localMarkersRef.current.map(m => ({
                    ...m,
                    color: getPixelColor(ctx, m.x, m.y)
                }));
                setLocalMarkers(refreshed);
                onMarkersChange(refreshed);
            }
        } else {
            // Refill the buffer if context was lost/reset
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.drawImage(img, 0, 0, logicalWidth, logicalHeight);
        }

        // Initial markers placement if none exist
        if (localMarkersRef.current.length === 0) {
            const newMarkers: Marker[] = [];
            for (let i = 0; i < savedNumColors; i++) {
                const x = Math.floor(Math.random() * logicalWidth);
                const y = Math.floor(Math.random() * logicalHeight);
                const color = getPixelColor(ctx, x, y);
                newMarkers.push({ x, y, color });
            }
            setLocalMarkers(newMarkers);
            onMarkersChange(newMarkers);
        }
    }, [savedNumColors, onMarkersChange]);

    const updateMarkerPosition = useCallback((index: number, clientX: number, clientY: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(clientX - rect.left);
        const y = Math.floor(clientY - rect.top);

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        const color = getPixelColor(ctx, x, y);

        setLocalMarkers(prev => {
            const next = [...prev];
            if (next[index]) {
                next[index] = { ...next[index], x, y, color };
            }
            return next;
        });

        updateLoupe(x, y);
    }, [updateLoupe]);

    // Handle Resize and Initial Drawing
    useEffect(() => {
        if (!isOpen || !savedImage) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = savedImage;
        imageRef.current = img;

        img.onload = () => {
            drawImageToCanvas();
        };

        const container = containerRef.current;
        if (container) {
            const observer = new ResizeObserver(() => {
                drawImageToCanvas();
            });
            observer.observe(container);
            return () => observer.disconnect();
        }
    }, [isOpen, savedImage, drawImageToCanvas]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (draggingRef.current !== null) {
                updateMarkerPosition(draggingRef.current, e.clientX, e.clientY);
            }
        };

        const handleMouseUp = () => {
            if (draggingRef.current !== null) {
                onMarkersChange(localMarkersRef.current);
                draggingRef.current = null;
                setDraggingIndex(null);
                setIsLoupeVisible(false);
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (draggingRef.current !== null) {
                const touch = e.touches[0];
                updateMarkerPosition(draggingRef.current, touch.clientX, touch.clientY);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("touchend", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleMouseUp);
        };
    }, [updateMarkerPosition, onMarkersChange]);

    // Handle number of colors change - Single Source of Truth Sync
    useEffect(() => {
        if (!isOpen || !savedImage) return;

        // Force local markers to match the target count
        if (savedNumColors !== localMarkers.length) {
            setLocalMarkers(prev => {
                if (savedNumColors === prev.length) return prev;

                let next: Marker[] = [...prev];
                if (savedNumColors > prev.length) {
                    const canvas = canvasRef.current;
                    const ctx = canvas?.getContext("2d");
                    const dpr = window.devicePixelRatio || 1;

                    for (let i = prev.length; i < savedNumColors; i++) {
                        if (ctx && canvas) {
                            const logicalWidth = canvas.width / dpr;
                            const logicalHeight = canvas.height / dpr;
                            const x = Math.floor(Math.random() * logicalWidth);
                            const y = Math.floor(Math.random() * logicalHeight);
                            const color = getPixelColor(ctx, x, y);
                            next.push({ x, y, color });
                        } else {
                            next.push({ x: 0, y: 0, color: "#AAAAAA" });
                        }
                    }
                } else {
                    next = prev.slice(0, savedNumColors);
                }

                // Important: Notify parent of the new marker list to maintain global sync
                onMarkersChange(next);
                return next;
            });
        }

        if (activeIndex >= savedNumColors) {
            setActiveIndex(Math.max(0, savedNumColors - 1));
        }
    }, [savedNumColors, isOpen, savedImage, localMarkers.length, onMarkersChange, activeIndex]);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (draggingIndex !== null) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor(e.clientX - rect.left);
        const y = Math.floor(e.clientY - rect.top);

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        const color = getPixelColor(ctx, x, y);

        const next = [...localMarkers];
        next[activeIndex] = { x, y, color };
        setLocalMarkers(next);
        onMarkersChange(next);

        // Briefly show loupe on click too
        setIsLoupeVisible(true);
        updateLoupe(x, y);
        setTimeout(() => setIsLoupeVisible(false), 500);

        if (activeIndex < savedNumColors - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                onImageChange(event.target?.result as string);
                setLocalMarkers([]);
                onMarkersChange([]);
            };
            reader.readAsDataURL(file);
        }
    };

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`Copied ${type} to clipboard`);
    };

    const downloadJson = () => {
        const data = {
            name: "Image Palette",
            colors: localMarkers.map(m => m.color)
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "palette.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleDownloadCode = () => {
        const cssContent = `:root {\n${localMarkers.map((m, i) => `  --color-${i + 1}: ${m.color};`).join('\n')}\n}`;

        const blob = new Blob([cssContent], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "palette-colors.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        toast.success("Code downloaded successfully!");
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[800px] h-[90vh] flex flex-col p-0 gap-0 border-border bg-background/95 backdrop-blur-xl">
                <DialogHeader className="p-6 border-b border-border">
                    <DialogTitle className="text-2xl font-display flex items-center justify-between">
                        Select image
                        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                            <X className="h-5 w-5" />
                        </Button>
                    </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto no-scrollbar">
                    <Tabs defaultValue="upload" className="w-full">
                        <div className="px-6 border-b border-border">
                            <TabsList className="bg-transparent border-0 h-12 gap-8 p-0">
                                <TabsTrigger value="upload" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 h-12 font-mono text-xs uppercase tracking-wider">
                                    <Upload className="h-4 w-4 mr-2" /> Upload
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="p-6">
                            <TabsContent value="upload" className="mt-0">
                                {!savedImage ? (
                                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:bg-secondary/50 transition-colors group">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <div className="p-4 rounded-full bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
                                                <Upload className="h-8 w-8 text-primary" />
                                            </div>
                                            <p className="mb-2 text-sm text-foreground font-mono">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-secondary-foreground/70 font-mono">
                                                PNG, JPG or WEBP
                                            </p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                    </label>
                                ) : null}
                            </TabsContent>



                            {/* Preview Area */}
                            {savedImage && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-mono text-xs uppercase tracking-wider text-secondary-foreground/70 flex items-center gap-2">
                                            Pick colors by clicking on image
                                        </h3>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onImageChange(null)}
                                            className="text-xs font-mono text-secondary-foreground/70 hover:text-foreground"
                                        >
                                            Change image
                                        </Button>
                                    </div>

                                    <div
                                        ref={containerRef}
                                        className="relative rounded-2xl overflow-hidden bg-secondary/30 border border-border group select-none flex items-center justify-center p-4"
                                        style={{ height: '400px' }}
                                    >
                                        {/* Coordinate-Locked Wrapper: Syncs Canvas and Markers 1:1 */}
                                        <div className="relative shadow-2xl">
                                            <canvas
                                                ref={canvasRef}
                                                onClick={handleCanvasClick}
                                                className="cursor-crosshair block"
                                            />

                                            {/* Markers and Loupe (Layered on Canvas) */}
                                            {localMarkers.map((marker, i) => {
                                                const isActive = draggingIndex === i || (isLoupeVisible && activeIndex === i);

                                                return (
                                                    <div
                                                        key={i}
                                                        className={cn(
                                                            "absolute rounded-full border-[3px] border-white shadow-2xl -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing transition-[width,height,opacity,transform,ring] duration-300 ease-out z-10",
                                                            isActive ? "scale-100 z-50 ring-4 ring-primary/20 backdrop-blur-md" : "w-10 h-10 scale-100 opacity-90",
                                                            activeIndex === i && !isActive && "ring-4 ring-primary/20 scale-110",
                                                        )}
                                                        style={{
                                                            left: marker.x,
                                                            top: marker.y,
                                                            width: isActive ? `${pickerSize}px` : undefined,
                                                            height: isActive ? `${pickerSize}px` : undefined,
                                                            backgroundColor: isActive ? 'transparent' : marker.color,
                                                            touchAction: 'none'
                                                        }}
                                                        onMouseDown={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            setActiveIndex(i);
                                                            setDraggingIndex(i);
                                                            draggingRef.current = i;
                                                            setIsLoupeVisible(true);
                                                            updateLoupe(marker.x, marker.y);
                                                        }}
                                                        onTouchStart={(e) => {
                                                            e.stopPropagation();
                                                            setActiveIndex(i);
                                                            setDraggingIndex(i);
                                                            draggingRef.current = i;
                                                            setIsLoupeVisible(true);
                                                            updateLoupe(marker.x, marker.y);
                                                        }}
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        {/* Magnified Image Loupe */}
                                                        <canvas
                                                            ref={i === (draggingIndex ?? (isLoupeVisible ? activeIndex : -1)) ? loupeRef : null}
                                                            width={(pickerSize - 6) * (window.devicePixelRatio || 1)}
                                                            height={(pickerSize - 6) * (window.devicePixelRatio || 1)}
                                                            className={cn(
                                                                "absolute inset-0 rounded-full bg-black/20 overflow-hidden transition-opacity duration-300",
                                                                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                                                            )}
                                                            style={{ width: '100%', height: '100%' }}
                                                        />

                                                        {/* Central precision indicator - Circular Ring */}
                                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                            <div className={cn(
                                                                "border-2 border-white shadow-[0_0_0_1px_rgba(0,0,0,0.5)] transition-all duration-300",
                                                                isActive ? "w-4 h-4 rounded-full ring-2 ring-black/50 bg-transparent" : "w-1.5 h-1.5 rounded-full bg-white"
                                                            )} />
                                                        </div>

                                                        {/* Number Label - Hide when zoomed */}
                                                        <div className={cn(
                                                            "absolute transition-opacity duration-200",
                                                            isActive ? "opacity-0" : "opacity-100"
                                                        )}
                                                            style={{
                                                                bottom: '-32px',
                                                                left: '50%',
                                                                transform: 'translateX(-50%)'
                                                            }}>
                                                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-black/90 text-[10px] font-bold text-white shadow-lg border border-white/20">
                                                                {i + 1}
                                                            </div>
                                                        </div>

                                                        {/* Small color preview during zoom */}
                                                        {isActive && (
                                                            <div
                                                                className="absolute left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/90 border border-white/20 text-[10px] font-bold text-white shadow-xl animate-in fade-in zoom-in duration-300"
                                                                style={{
                                                                    backgroundColor: marker.color,
                                                                    top: '-48px'
                                                                }}
                                                            >
                                                                {marker.color}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Controls */}
                                    <div className="space-y-6 bg-card/30 p-6 rounded-2xl border border-border/50">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <label className="text-xs font-mono uppercase tracking-wider text-secondary-foreground/70">
                                                    Number of colors: <span className="text-foreground">{savedNumColors}</span>
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-4 relative z-50">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setPickerSize(prev => Math.max(64, prev - 16));
                                                    }}
                                                    className="h-10 w-10 rounded-full border-2 border-border bg-card hover:bg-secondary shadow-sm flex items-center justify-center transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={pickerSize <= 64}
                                                    title="Decrease Picker Size"
                                                >
                                                    <Minus className="h-5 w-5 text-foreground" />
                                                </button>
                                                <div className="flex-1 flex items-center px-4">
                                                    <Slider
                                                        value={[savedNumColors]}
                                                        onValueChange={(val) => onNumColorsChange(val[0])}
                                                        min={2}
                                                        max={8}
                                                        step={1}
                                                        className="w-full"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setPickerSize(prev => Math.min(160, prev + 16));
                                                    }}
                                                    className="h-10 w-10 rounded-full border-2 border-border bg-card hover:bg-secondary shadow-sm flex items-center justify-center transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={pickerSize >= 160}
                                                    title="Increase Picker Size"
                                                >
                                                    <Plus className="h-5 w-5 text-foreground" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Palette Bar */}
                                        <div className="flex h-24 rounded-2xl overflow-hidden border border-border shadow-inner bg-secondary/20">
                                            {localMarkers.map((marker, i) => (
                                                <div
                                                    key={i}
                                                    className={cn(
                                                        "flex-1 relative group cursor-pointer transition-all duration-500",
                                                        activeIndex === i ? "flex-[2]" : "hover:flex-[1.2]"
                                                    )}
                                                    style={{ backgroundColor: marker.color }}
                                                    onClick={() => setActiveIndex(i)}
                                                >
                                                    <div className={cn(
                                                        "absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px]",
                                                        activeIndex === i && "opacity-100"
                                                    )}>
                                                        {/* Individual Remove Button (on hover) */}
                                                        {localMarkers.length > 2 && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    onNumColorsChange(savedNumColors - 1);
                                                                }}
                                                                className="absolute top-2 right-2 p-1 rounded-full bg-black/40 hover:bg-black/60 text-white/70 hover:text-white transition-colors"
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </button>
                                                        )}

                                                        <span className="font-mono text-[10px] font-bold text-white drop-shadow-md">
                                                            {marker.color}
                                                        </span>
                                                        {activeIndex === i && (
                                                            <div className="h-1.5 w-1.5 rounded-full bg-white mt-1" />
                                                        )}
                                                    </div>
                                                </div>
                                            ))}

                                            {/* Direct Add Slot (The "Plus" in Palette Panel) */}
                                            {localMarkers.length < 8 && (
                                                <button
                                                    onClick={() => onNumColorsChange(savedNumColors + 1)}
                                                    className="flex-1 flex flex-col items-center justify-center bg-card hover:bg-secondary transition-colors border-l border-border/50 group"
                                                >
                                                    <div className="p-2 rounded-full bg-primary/10 group-hover:scale-110 transition-transform">
                                                        <Plus className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <span className="font-mono text-[8px] uppercase tracking-tighter text-secondary-foreground/70 mt-1 font-bold">Add</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Tabs>
                </div>

                <DialogFooter className="p-6 border-t border-border bg-card/30 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-11 px-4 font-mono text-xs uppercase tracking-wider">
                                    Export Options <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-56 p-2 bg-background/95 backdrop-blur-xl border-border">
                                <DropdownMenuItem onClick={() => {
                                    const hex = localMarkers.map(m => m.color).join(', ');
                                    copyToClipboard(hex, "HEX");
                                }} className="h-10 cursor-pointer font-mono text-[10px] uppercase">
                                    <Copy className="mr-2 h-4 w-4" /> Copy HEX
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    const rgb = localMarkers.map(m => {
                                        const r = parseInt(m.color.slice(1, 3), 16);
                                        const g = parseInt(m.color.slice(3, 5), 16);
                                        const b = parseInt(m.color.slice(5, 7), 16);
                                        return `rgb(${r}, ${g}, ${b})`;
                                    }).join(', ');
                                    copyToClipboard(rgb, "RGB");
                                }} className="h-10 cursor-pointer font-mono text-[10px] uppercase">
                                    <Copy className="mr-2 h-4 w-4" /> Copy RGB
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => {
                                    const css = `:root {\n${localMarkers.map((m, i) => `  --color-${i + 1}: ${m.color.toUpperCase()};`).join('\n')}\n}`;
                                    copyToClipboard(css, "CSS Variables");
                                }} className="h-10 cursor-pointer font-mono text-[10px] uppercase">
                                    <Copy className="mr-2 h-4 w-4" /> Copy CSS Variables
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={downloadJson} className="h-10 cursor-pointer font-mono text-[10px] uppercase">
                                    <Download className="mr-2 h-4 w-4" /> Download JSON
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" onClick={onClose} className="h-11 px-6 font-mono text-xs uppercase tracking-wider border-border hover:bg-secondary">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDownloadCode}
                            disabled={!savedImage || localMarkers.length === 0}
                            className="h-11 px-8 font-mono text-xs uppercase tracking-wider bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/20 transition-all"
                        >
                            <Download className="mr-2 h-4 w-4" /> Download Code
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
