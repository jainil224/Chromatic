import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, X, Loader2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { numericToIp } from "@/lib/utils";

interface Submission {
    id: string;
    name: string;
    colors: string[];
    created_at: string;
    ip_address_numeric?: number;
    tags?: string[];
    section?: string;
}

const CATEGORIES = [
    "Pastel", "Vintage", "Retro", "Neon", "Gold", "Light", "Dark", "Warm", "Cold",
    "Summer", "Fall", "Winter", "Spring", "Happy",
    "Nature", "Earth", "Night", "Space", "Rainbow", "Gradient", "Sunset", "Sky", "Sea",
    "Kid", "Skin", "Food", "Cream", "Coffee", "Wedding", "Christmas"
];

const AdminDashboard = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<Record<string, string>>({});
    const [editedTags, setEditedTags] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            setLoading(true);
            // Fetch palettes where section is null (pending)
            const { data, error } = await supabase
                .from('palettes')
                .select('*')
                .is('section', null)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setSubmissions(data || []);
        } catch (error) {
            console.error("Error fetching submissions:", error);
            toast.error("Failed to load submissions");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string, currentTags: string[]) => {
        const category = selectedCategories[id];
        if (!category) {
            toast.error("Please select a category");
            return;
        }

        setActionLoading(id);
        try {
            const extraTags = editedTags[id]
                ? editedTags[id].split(',').map(t => t.trim()).filter(Boolean)
                : [];

            const finalTags = Array.from(new Set([...currentTags, category.toLowerCase(), ...extraTags]));

            const { error } = await supabase
                .from('palettes')
                .update({
                    section: category.toLowerCase(),
                    tags: finalTags
                })
                .eq('id', id);

            if (error) throw error;

            toast.success("Palette approved!");
            setSubmissions(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            console.error("Error approving:", error);
            toast.error("Failed to approve palette");
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (id: string) => {
        if (!confirm("Are you sure you want to reject (delete) this palette?")) return;

        setActionLoading(id);
        try {
            const { error } = await supabase
                .from('palettes')
                .delete()
                .eq('id', id);

            if (error) throw error;

            toast.success("Palette rejected");
            setSubmissions(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            console.error("Error rejecting:", error);
            toast.error("Failed to reject palette");
        } finally {
            setActionLoading(null);
        }
    };

    const fixGenericPalettes = async () => {
        if (!confirm("This will rename all palettes starting with 'Happy Dream' and add tags. Continue?")) return;

        setActionLoading('fixing_generic');
        try {
            // 1. Fetch generic palettes
            const { data: palettes, error: fetchError } = await supabase
                .from('palettes')
                .select('*')
                .ilike('name', 'Happy Dream%');

            if (fetchError) throw fetchError;
            if (!palettes || palettes.length === 0) {
                toast.info("No 'Happy Dream' palettes found to fix.");
                return;
            }

            let updatedCount = 0;

            // 2. Iterate and update
            for (const palette of palettes) {
                const { name: newName, tags: newTags } = generatePaletteMetadata(palette.colors);

                // Keep existing tags if any, distinct merge
                const existingTags = Array.isArray(palette.tags) ? palette.tags : [];
                const mergedTags = Array.from(new Set([...existingTags, ...newTags]));

                const { error: updateError } = await supabase
                    .from('palettes')
                    .update({
                        name: newName,
                        tags: mergedTags
                    })
                    .eq('id', palette.id);

                if (updateError) {
                    console.error(`Failed to update ${palette.id}`, updateError);
                } else {
                    updatedCount++;
                }
            }

            toast.success(`Successfully fixed ${updatedCount} palettes!`);

        } catch (error: any) {
            console.error('Error fixing palettes:', error);
            toast.error(error.message || "Failed to fix palettes");
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground animate-in fade-in">
            <div className="border-b bg-card">
                <div className="container flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        </div>
                        <h1 className="text-xl font-bold font-display tracking-tight text-white/90">
                            Admin <span className="text-primary/100">Dashboard</span>
                            <span className="ml-2 text-[10px] text-white/30 uppercase tracking-[0.3em] font-mono border-l border-white/10 pl-2">by Jainil</span>
                        </h1>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="ghost"
                            onClick={() => navigate('/')}
                            className="text-white/60 hover:text-white hover:bg-white/5 rounded-xl px-4 flex items-center gap-2 transition-all font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                            Exit
                        </Button>
                        <Button
                            variant="outline"
                            onClick={async () => {
                                await supabase.auth.signOut();
                                navigate('/admin/login');
                            }}
                            className="bg-primary/10 hover:bg-primary border-primary/20 hover:border-primary text-primary hover:text-zinc-950 rounded-xl px-4 flex items-center gap-2 transition-all duration-300 font-bold shadow-[0_0_20px_rgba(var(--primary),0.1)] active:scale-95 group/logout"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/logout:translate-x-0.5 transition-transform"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            <main className="container py-8 px-4 mx-auto">
                <h2 className="text-2xl font-bold mb-6">Pending Submissions ({submissions.length})</h2>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : submissions.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground bg-card/50 rounded-xl border border-dashed">
                        <p>No pending submissions.</p>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {submissions.map((submission) => (
                            <div key={submission.id} className="group bg-card/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                {/* Color Preview */}
                                <div className="h-40 flex shadow-inner relative">
                                    {submission.colors.map((color, i) => (
                                        <div
                                            key={i}
                                            style={{ backgroundColor: color }}
                                            className="h-full flex-1 transition-all duration-500 group-hover:scale-[1.02] first:rounded-tl-2xl last:rounded-tr-2xl relative"
                                            title={color}
                                        >
                                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>
                                    ))}
                                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/50 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        {submission.colors.length} COLORS
                                    </div>
                                </div>

                                <div className="p-6 space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-2xl tracking-tight bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                                                {submission.name}
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] mb-1 flex items-center gap-1.5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                                    Date
                                                </p>
                                                <p className="text-xs font-medium text-white/90">
                                                    {new Date(submission.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </p>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                                                <p className="text-[10px] text-primary/70 font-bold uppercase tracking-[0.2em] mb-1 flex items-center gap-1.5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                                    Sender IP (Numeric)
                                                </p>
                                                <div className="flex items-center">
                                                    {submission.ip_address_numeric ? (
                                                        <div className="flex flex-col gap-1">
                                                            <span className="text-xs font-mono text-primary font-bold" title={`Numeric: ${submission.ip_address_numeric.toString()}`}>
                                                                {numericToIp(submission.ip_address_numeric.toString())}
                                                            </span>
                                                            <a
                                                                href={`https://www.whois.com/whois/${numericToIp(submission.ip_address_numeric.toString())}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-[9px] uppercase tracking-tighter text-white/30 hover:text-primary transition-colors flex items-center gap-1"
                                                            >
                                                                Verify Source <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                                            </a>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs font-mono text-muted-foreground/40 italic">Hidden</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-2">
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center px-1">
                                                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Classification</label>
                                                <span className="text-[10px] text-white/20 font-mono">ID: {submission.id.slice(0, 8)}</span>
                                            </div>
                                            <div className="relative group/select">
                                                <select
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm appearance-none focus:ring-2 ring-primary/20 transition-all outline-none text-white/80 cursor-pointer hover:bg-white/[0.08]"
                                                    value={selectedCategories[submission.id] || ""}
                                                    onChange={(e) => setSelectedCategories(prev => ({ ...prev, [submission.id]: e.target.value }))}
                                                >
                                                    <option value="" className="bg-zinc-900">Uncategorized</option>
                                                    {CATEGORIES.map(cat => (
                                                        <option key={cat} value={cat} className="bg-zinc-900">{cat}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/30 group-hover/select:text-white/50 transition-colors">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-1">Tags</label>
                                            <div className="relative">
                                                <input
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:ring-2 ring-primary/20 transition-all outline-none text-white/80 placeholder:text-white/10 hover:bg-white/[0.08]"
                                                    value={editedTags[submission.id] || ""}
                                                    onChange={(e) => setEditedTags(prev => ({ ...prev, [submission.id]: e.target.value }))}
                                                    placeholder="e.g. warm, sunset, vibrant"
                                                />
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" /><path d="M7 7h.01" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 pt-4 border-t border-white/5">
                                        <Button
                                            variant="default"
                                            className="flex-1 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/20 rounded-xl h-11 transition-all duration-300 font-bold active:scale-95 group/btn"
                                            onClick={() => handleApprove(submission.id, submission.tags || [])}
                                            disabled={!!actionLoading}
                                        >
                                            {actionLoading === submission.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <Check className="h-4 w-4 mr-2 group-hover/btn:scale-125 transition-transform" /> Approve
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="flex-1 border-rose-500/20 hover:bg-rose-500/10 text-rose-500/80 hover:text-rose-500 hover:border-rose-500/50 rounded-xl h-11 transition-all duration-300 font-bold active:scale-95 group/btn"
                                            onClick={() => handleReject(submission.id)}
                                            disabled={!!actionLoading}
                                        >
                                            {actionLoading === submission.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <X className="h-4 w-4 mr-2 group-hover/btn:rotate-90 transition-transform duration-300" /> Reject
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Maintenance Section */}
            <section className="container py-8 px-4 mx-auto border-t border-white/5 mt-8">
                <h2 className="text-xl font-bold mb-4 text-white/80">Maintenance Tools</h2>
                <div className="bg-card/30 rounded-xl p-6 border border-white/5">
                    <h3 className="text-lg font-medium mb-2">Fix Generic Palettes</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Finds palettes named "Happy Dream..." and renames them based on their colors, adding appropriate tags.
                    </p>
                    <Button
                        variant="secondary"
                        onClick={fixGenericPalettes}
                        disabled={!!actionLoading}
                    >
                        {actionLoading === 'fixing_generic' ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                            <Sparkles className="h-4 w-4 mr-2" />
                        )}
                        Fix Names & Tags
                    </Button>
                </div>
            </section>
        </div>
    );
};

// --- Helper Functions for Name/Tag Generation ---

function generatePaletteMetadata(colors: string[]) {
    // 1. Convert hex to HSL to understand the colors
    const hslColors = colors.map(hex => hexToHSL(hex));

    // 2. Determine dominant properties
    const avgL = hslColors.reduce((acc, c) => acc + c.l, 0) / hslColors.length;
    const avgS = hslColors.reduce((acc, c) => acc + c.s, 0) / hslColors.length;

    // 3. Generate Tags
    const tags = new Set<string>();

    // Brightness tags
    if (avgL < 30) tags.add("dark");
    else if (avgL > 70) tags.add("light");

    // Saturation tags
    if (avgS > 80) tags.add("vibrant");
    else if (avgS > 60) tags.add("neon");
    else if (avgS < 20) tags.add("pastel");
    else if (avgS < 10) tags.add("muted");

    // Warm/Cold tags based on hue
    const warmCount = hslColors.filter(c => (c.h >= 0 && c.h < 60) || (c.h >= 300)).length;
    const coldCount = hslColors.filter(c => c.h >= 150 && c.h < 300).length;

    if (warmCount > coldCount) tags.add("warm");
    if (coldCount > warmCount) tags.add("cold");

    // 4. Generate Name
    // Get the most saturated color to drive the name
    const dominant = hslColors.reduce((prev, current) => (prev.s > current.s) ? prev : current);

    let colorName = "Color";
    const h = dominant.h;
    if (h >= 0 && h < 15) colorName = "Red";
    else if (h >= 15 && h < 45) colorName = "Orange";
    else if (h >= 45 && h < 70) colorName = "Yellow";
    else if (h >= 70 && h < 150) colorName = "Green";
    else if (h >= 150 && h < 190) colorName = "Teal";
    else if (h >= 190 && h < 250) colorName = "Blue";
    else if (h >= 250 && h < 290) colorName = "Purple";
    else if (h >= 290 && h < 330) colorName = "Pink";
    else colorName = "Red";

    // Adjectives
    const adjective = avgL < 30 ? "Midnight"
        : avgL > 80 ? "Soft"
            : avgS > 80 ? "Electric"
                : avgS < 20 ? "Dusty"
                    : "Classic";

    // Nouns
    const nouns = ["Harmony", "Vibe", "Mood", "Essence", "Flow", "Scape", "Aura", "Dream"];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    const name = `${adjective} ${colorName} ${noun}`;

    return { name, tags: Array.from(tags) };
}

function hexToHSL(H: string) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
        r = parseInt("0x" + H[1] + H[1]);
        g = parseInt("0x" + H[2] + H[2]);
        b = parseInt("0x" + H[3] + H[3]);
    } else if (H.length == 7) {
        r = parseInt("0x" + H[1] + H[2]);
        g = parseInt("0x" + H[3] + H[4]);
        b = parseInt("0x" + H[5] + H[6]);
    }
    // Then to HSL
    r /= 255; g /= 255; b /= 255;
    let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin;
    let h = 0, s = 0, l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
}

export default AdminDashboard;
