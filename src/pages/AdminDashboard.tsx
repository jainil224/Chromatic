import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, Sparkles, LogOut, ArrowLeft, Check, X, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn, numericToIp } from "@/lib/utils";

interface Submission {
    id: string;
    name: string;
    colors: string[];
    submitted_at: string;
    ip_address_numeric?: string;
    tags?: string[];
    status: 'pending' | 'approved' | 'rejected';
    category?: string;
    source: 'palette_submissions' | 'palettes';
}

const CATEGORIES = [
    // Vibes
    "Bold", "Dark", "Neon", "Gold", "Glow",
    // Styles
    "Vintage", "Retro", "Warm", "Cold",
    // Seasons
    "Summer", "Spring", "Fall", "Winter",
    // Moods
    "Happy", "Night",
    // Themes
    "Nature", "Earth", "Space", "Rainbow", "Gradient", "Sunset", "Sky", "Sea",
    // Light
    "Light",
    // Special
    "Skin", "Kid", "Food", "Coffee", "Wedding", "Christmas",
];

type TabType = 'pending' | 'approved' | 'rejected';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<TabType>('pending');
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [approvedPalettes, setApprovedPalettes] = useState<Submission[]>([]);
    const [rejectedPalettes, setRejectedPalettes] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<Record<string, string>>({});
    const [editedTags, setEditedTags] = useState<Record<string, string>>({});
    const [editedNames, setEditedNames] = useState<Record<string, string>>({});
    const navigate = useNavigate();

    useEffect(() => { fetchAll(); }, []);

    const fetchAll = async () => {
        setLoading(true);
        try {
            // Pending from palette_submissions
            const { data: psData } = await supabase
                .from('palette_submissions')
                .select('*')
                .eq('status', 'pending')
                .order('submitted_at', { ascending: false });

            // Pending from legacy palettes table
            const { data: pData } = await supabase
                .from('palettes')
                .select('*')
                .is('section', null)
                .order('created_at', { ascending: false });

            // Approved
            const { data: approvedData } = await supabase
                .from('palette_submissions')
                .select('*')
                .eq('status', 'approved')
                .order('submitted_at', { ascending: false })
                .limit(30);

            // Rejected
            const { data: rejectedData } = await supabase
                .from('palette_submissions')
                .select('*')
                .eq('status', 'rejected')
                .order('submitted_at', { ascending: false })
                .limit(30);

            const mapSubmission = (s: any, source: 'palette_submissions' | 'palettes'): Submission => ({
                id: s.id,
                name: s.name,
                colors: s.colors,
                submitted_at: s.submitted_at || s.created_at,
                ip_address_numeric: s.ip_address_numeric,
                tags: s.tags || [],
                status: s.status || 'pending',
                category: s.category,
                source,
            });

            setSubmissions([
                ...(psData || []).map(s => mapSubmission(s, 'palette_submissions')),
                ...(pData || []).map(s => mapSubmission(s, 'palettes')),
            ]);
            setApprovedPalettes((approvedData || []).map(s => mapSubmission(s, 'palette_submissions')));
            setRejectedPalettes((rejectedData || []).map(s => mapSubmission(s, 'palette_submissions')));
        } catch (err) {
            toast.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (submission: Submission) => {
        const category = selectedCategories[submission.id];
        if (!category) { toast.error("Select a category first"); return; }

        // Use admin-edited name if provided, otherwise keep original
        const finalName = editedNames[submission.id]?.trim() || submission.name;

        setActionLoading(submission.id);
        try {
            // ── 1. Duplicate detection ────────────────────────────────────────
            const { data: existingPalettes } = await supabase
                .from('palettes')
                .select('id, name, colors');

            const submissionKey = [...submission.colors].map(c => c.toLowerCase()).sort().join(',');

            const duplicate = (existingPalettes || []).find(p => {
                if (!Array.isArray(p.colors)) return false;
                const key = [...p.colors].map((c: string) => c.toLowerCase()).sort().join(',');
                return key === submissionKey;
            });

            if (duplicate) {
                toast.error(
                    `⚠️ This color palette already exists in the website as "${duplicate.name}". Please reject it.`,
                    { duration: 6000 }
                );
                setActionLoading(null);
                return;
            }

            // ── 2. Build final tags ───────────────────────────────────────────
            // Only use: category the admin selected + admin-entered extra tags + new_arrival.
            // Original submission tags are intentionally excluded so they don't bleed in.
            const extraTags = editedTags[submission.id]
                ? editedTags[submission.id].split(',').map(t => t.trim().toLowerCase()).filter(Boolean)
                : [];
            const finalTags = Array.from(new Set([
                category.toLowerCase(),  // e.g. 'bold'
                ...extraTags,            // e.g. ['jainil', 'patel', 'done']
                'new_arrival',           // always added so the NEW badge shows
            ]));

            const approvedAt = new Date().toISOString();

            // ── 3. Approve ────────────────────────────────────────────────────
            if (submission.source === 'palette_submissions') {
                const { error } = await supabase.rpc('approve_submission', {
                    submission_id: submission.id,
                    target_category: category.toLowerCase(),
                    target_tags: finalTags
                });
                if (error) throw error;

                // Stamp approved_at + section after the RPC creates the palette row
                const { data: newPal } = await supabase
                    .from('palettes').select('id').eq('name', submission.name)
                    .order('created_at', { ascending: false }).limit(1).single();
                if (newPal) {
                    await supabase.from('palettes').update({
                        name: finalName,
                        section: category.toLowerCase(),
                        approved_at: approvedAt,
                        tags: finalTags,
                    }).eq('id', newPal.id);
                }
            } else {
                // Legacy palettes table
                const { error } = await supabase.from('palettes').update({
                    name: finalName,
                    section: category.toLowerCase(),
                    category: category.toLowerCase(),
                    tags: finalTags,
                    approved_at: approvedAt,
                }).eq('id', submission.id);
                if (error) throw error;
            }

            toast.success(`✅ "${finalName}" approved as ${category} — now live with NEW badge!`);
            setSubmissions(prev => prev.filter(s => s.id !== submission.id));
        } catch (err: any) {
            toast.error(err.message || "Failed to approve");
        } finally {
            setActionLoading(null);
        }
    };


    const handleReject = async (submission: Submission) => {
        if (!confirm(`Reject and delete "${submission.name}"?`)) return;
        setActionLoading(submission.id);
        try {
            if (submission.source === 'palette_submissions') {
                const { error } = await supabase.rpc('reject_submission', { submission_id: submission.id });
                if (error) throw error;
            } else {
                const { error } = await supabase.from('palettes').delete().eq('id', submission.id);
                if (error) throw error;
            }
            toast.success(`❌ "${submission.name}" rejected`);
            setSubmissions(prev => prev.filter(s => s.id !== submission.id));
        } catch (err: any) {
            toast.error(err.message || "Failed to reject");
        } finally {
            setActionLoading(null);
        }
    };

    // ── Admin-only: permanently delete an approved palette from the live site ──
    const handleDeleteLive = async (palette: Submission) => {
        if (!confirm(`🗑️ Permanently delete "${palette.name}" from the live site?\n\nThis cannot be undone.`)) return;
        setActionLoading(palette.id);
        try {
            const { error } = await supabase
                .from('palettes')
                .delete()
                .eq('id', palette.id);
            if (error) throw error;

            setApprovedPalettes(prev => prev.filter(p => p.id !== palette.id));
            toast.success(`🗑️ "${palette.name}" permanently removed from the live site.`);
        } catch (err: any) {
            toast.error(err.message || "Failed to delete palette");
        } finally {
            setActionLoading(null);
        }
    };

    const fixGenericPalettes = async () => {
        if (!confirm("Rename all 'Happy Dream' palettes based on their colors?")) return;
        setActionLoading('fixing_generic');
        try {
            const { data: palettes, error } = await supabase.from('palettes').select('*').ilike('name', 'Happy Dream%');
            if (error) throw error;
            if (!palettes?.length) { toast.info("No generic palettes found."); return; }
            let count = 0;
            for (const p of palettes) {
                const { name, tags } = generatePaletteMetadata(p.colors);
                const merged = Array.from(new Set([...(Array.isArray(p.tags) ? p.tags : []), ...tags]));
                const { error: ue } = await supabase.from('palettes').update({ name, tags: merged }).eq('id', p.id);
                if (!ue) count++;
            }
            toast.success(`Fixed ${count} palettes!`);
        } catch (err: any) {
            toast.error(err.message || "Failed");
        } finally {
            setActionLoading(null);
        }
    };

    const currentList = activeTab === 'pending' ? submissions
        : activeTab === 'approved' ? approvedPalettes
            : rejectedPalettes;

    const tabs: { id: TabType; label: string; count?: number }[] = [
        { id: 'pending', label: 'PENDING', count: submissions.length },
        { id: 'approved', label: 'APPROVED', count: approvedPalettes.length },
        { id: 'rejected', label: 'REJECTED', count: rejectedPalettes.length },
    ];

    return (
        <div className="min-h-screen relative overflow-hidden theme-transition">
            {/* Background Gradients (Fixed in Background) */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-background theme-transition" />
                <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full blur-3xl theme-transition bg-[var(--blob-1)]" />
                <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full blur-3xl theme-transition bg-[var(--blob-2)]" />
            </div>
            <div className="grain pointer-events-none fixed inset-0 -z-10" />

            {/* Top Bar */}
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-[42px] h-[42px] rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)]">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary-foreground"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        </div>
                        <div>
                            <span className="text-2xl font-display font-black tracking-tight text-foreground">
                                CHROMATIC <span className="text-primary">ADMIN</span>
                            </span>
                            <span className="block text-[10px] text-text-dim tracking-[0.3em] uppercase font-mono mt-0.5">by Jainil</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchAll}
                            className="px-4 py-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-secondary-foreground text-sm font-semibold transition-all"
                        >
                            ↺ Refresh
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="px-4 py-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-secondary-foreground text-sm font-semibold flex items-center gap-2 transition-all"
                        >
                            <ArrowLeft size={16} /> Exit
                        </button>
                        <button
                            onClick={async () => { await supabase.auth.signOut(); navigate('/admin/login'); }}
                            className="px-5 py-2 rounded-xl bg-destructive/10 border border-destructive/20 hover:bg-destructive/20 text-destructive text-sm font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_-5px_hsl(var(--destructive)/0.2)]"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Tab Bar */}
                <div className="flex items-center gap-4 mb-12">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "relative px-8 py-3.5 rounded-2xl border transition-all duration-300 font-display text-lg font-bold tracking-tight flex items-center gap-3 overflow-hidden group",
                                activeTab === tab.id
                                    ? "bg-primary/10 border-primary/50 text-foreground ring-1 ring-primary/20 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.2)]"
                                    : "bg-white/5 border-white/10 text-text-dim hover:bg-white/10 hover:border-white/20 hover:text-foreground"
                            )}
                        >
                            {tab.label}
                            {tab.count !== undefined && (
                                <span className={cn(
                                    "px-2 min-w-[24px] h-6 flex items-center justify-center rounded-full text-xs font-black font-mono transition-colors",
                                    activeTab === tab.id ? "bg-primary text-primary-foreground" : "bg-white/10 text-text-dim"
                                )}>
                                    {tab.count}
                                </span>
                            )}
                            {activeTab === tab.id && (
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 animate-[premium-shimmer_3s_infinite]" />
                            )}
                        </button>
                    ))}

                    <div className="ml-auto text-xs text-text-dim font-mono tracking-widest uppercase opacity-50">
                        reviewing {currentList.length} items
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-[400px] gap-4">
                        <Loader2 className="animate-spin text-primary" size={48} />
                        <p className="text-sm font-mono text-text-dim animate-pulse uppercase tracking-[0.2em]">Synchronizing data...</p>
                    </div>
                ) : currentList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[400px] gap-4 text-center">
                        <div className="text-6xl mb-4 grayscale opacity-40">
                            {activeTab === 'pending' ? '📭' : activeTab === 'approved' ? '✅' : '🗑️'}
                        </div>
                        <p style={{ fontSize: 18, fontWeight: 600, color: '#444', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            No {activeTab} submissions
                        </p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 24 }}>
                        {currentList.map((item) => (
                            <PaletteCard
                                key={item.id}
                                item={item}
                                activeTab={activeTab}
                                selectedCategory={selectedCategories[item.id] || ''}
                                onCategoryChange={(v) => setSelectedCategories(p => ({ ...p, [item.id]: v }))}
                                editedTags={editedTags[item.id] || ''}
                                onTagsChange={(v) => setEditedTags(p => ({ ...p, [item.id]: v }))}
                                editedName={editedNames[item.id] ?? item.name}
                                onNameChange={(v) => setEditedNames(p => ({ ...p, [item.id]: v }))}
                                onApprove={() => handleApprove(item)}
                                onReject={() => handleReject(item)}
                                onDeleteLive={() => handleDeleteLive(item)}
                                isLoading={actionLoading === item.id}
                            />
                        ))}
                    </div>
                )}


            </main>
        </div>
    );
};

// ─── Palette Card Component ───────────────────────────────────────────────────

interface CardProps {
    item: Submission;
    activeTab: TabType;
    selectedCategory: string;
    onCategoryChange: (v: string) => void;
    editedTags: string;
    onTagsChange: (v: string) => void;
    editedName: string;
    onNameChange: (v: string) => void;
    onApprove: () => void;
    onReject: () => void;
    onDeleteLive: () => void;
    isLoading: boolean;
}

const BADGE_COLORS: Record<TabType, { bg: string; color: string; label: string }> = {
    pending: { bg: '#f59e0b20', color: '#f59e0b', label: 'PENDING' },
    approved: { bg: '#10b98120', color: '#10b981', label: 'APPROVED' },
    rejected: { bg: '#ef444420', color: '#ef4444', label: 'REJECTED' },
};

const PaletteCard = ({
    item, activeTab, selectedCategory, onCategoryChange,
    editedTags, onTagsChange, editedName, onNameChange, onApprove, onReject, onDeleteLive, isLoading,
}: CardProps) => {
    const badge = BADGE_COLORS[activeTab];
    const date = new Date(item.submitted_at).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });

    return (
        <div className="group relative bg-card/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-2 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5),0_0_30px_-5px_hsl(var(--primary)/0.1)]">
            {/* Color Strip */}
            <div className="flex h-[180px] w-full">
                {item.colors.map((c, i) => (
                    <div key={i} className="flex-1 relative cursor-pointer" style={{ background: c }} title={c} />
                ))}
            </div>

            {/* Body */}
            <div className="p-6">

                {/* Status Badge + Source */}
                <div className="flex justify-between items-center mb-6">
                    <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black font-mono tracking-[0.2em] transition-all",
                        activeTab === 'pending' ? "bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20" :
                            activeTab === 'approved' ? "bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20" :
                                "bg-rose-500/10 text-rose-500 ring-1 ring-rose-500/20"
                    )}>
                        {badge.label}
                    </span>
                    <span className="text-[10px] font-mono text-text-dim/50 tracking-widest">{item.source === 'palette_submissions' ? 'NEW DB' : 'LEGACY'}</span>
                </div>

                {/* Name — inline editable for admin */}
                <div className="mb-6 relative group/name">
                    <input
                        value={editedName}
                        onChange={e => onNameChange(e.target.value)}
                        className="w-full bg-transparent border-none p-0 text-2xl font-display font-black tracking-tight text-foreground uppercase outline-none focus:text-primary transition-colors cursor-text"
                        title="Click to edit palette name"
                    />
                    <div className="h-0.5 w-0 bg-primary group-hover/name:w-full transition-all duration-300" />

                    {/* Edit hint — shows only when name differs from original */}
                    {editedName !== item.name && (
                        <span className="absolute -right-1 -top-4 text-[9px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-1.5 py-0.5 rounded ring-1 ring-amber-500/20">
                            Edited
                        </span>
                    )}
                </div>

                {/* Meta */}
                <div className="space-y-2.5 mb-8">
                    <div className="flex items-center gap-2 text-[13px]">
                        <span className="text-text-dim/60 font-mono uppercase tracking-wider text-[11px] w-20">Category</span>
                        <span className="text-foreground font-medium">{item.category || '—'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px]">
                        <span className="text-text-dim/60 font-mono uppercase tracking-wider text-[11px] w-20">IP Origin</span>
                        {item.ip_address_numeric ? (
                            <a href={`https://www.whois.com/whois/${numericToIp(item.ip_address_numeric)}`}
                                target="_blank" rel="noopener noreferrer"
                                className="text-primary/70 hover:text-primary transition-colors font-mono font-medium truncate">
                                {numericToIp(item.ip_address_numeric)}
                            </a>
                        ) : <span className="text-text-dim/40 italic">System</span>}
                    </div>
                    <div className="flex items-center gap-2 text-[13px]">
                        <span className="text-text-dim/60 font-mono uppercase tracking-wider text-[11px] w-20">Received</span>
                        <span className="text-foreground/80 font-medium">{date}</span>
                    </div>
                    {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1.5">
                            {item.tags.map(t => (
                                <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded text-[10px] text-text-dim font-mono">{t}</span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Actions — only editable on pending */}
                {activeTab === 'pending' && (
                    <>
                        {/* Category Select */}
                        <div className="mb-3 relative group/select">
                            <select
                                className="w-full bg-background/40 border border-white/5 rounded-xl px-4 py-3 text-sm font-semibold text-foreground outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all cursor-pointer appearance-none"
                                value={selectedCategory}
                                onChange={e => onCategoryChange(e.target.value)}
                            >
                                <option value="" className="bg-background">Assign Category</option>
                                {CATEGORIES.map(c => (
                                    <option key={c} value={c} className="bg-background">{c}</option>
                                ))}
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-dim text-[10px] pointer-events-none group-hover/select:text-primary transition-colors">▼</span>
                        </div>

                        {/* Tags Input */}
                        <div className="mb-6">
                            <input
                                className="w-full bg-background/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-text-dim/30 outline-none focus:border-primary/50 transition-all font-mono"
                                placeholder="metadata, keywords, comma-separated"
                                value={editedTags}
                                onChange={e => onTagsChange(e.target.value)}
                            />
                        </div>

                        {/* Approve / Reject */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={onApprove}
                                disabled={isLoading}
                                className="flex items-center justify-center gap-2 h-14 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_30px_-10px_rgba(16,185,129,0.5)] disabled:opacity-50 disabled:grayscale"
                            >
                                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} strokeWidth={3} />}
                                APPROVE
                            </button>
                            <button
                                onClick={onReject}
                                disabled={isLoading}
                                className="flex items-center justify-center gap-2 h-14 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-sm tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_10px_30px_-10px_rgba(244,63,94,0.5)] disabled:opacity-50 disabled:grayscale"
                            >
                                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <X size={18} strokeWidth={3} />}
                                REJECT
                            </button>
                        </div>
                    </>
                )}

                {/* Read-only view for approved/rejected + admin delete for approved */}
                {activeTab !== 'pending' && item.colors.length > 0 && (
                    <>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {item.colors.map((c, i) => (
                                <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-lg border border-white/5">
                                    <div className="w-3 h-3 rounded-full shadow-sm" style={{ background: c }} />
                                    <span className="text-[10px] font-mono text-text-dim/80">{c.toUpperCase()}</span>
                                </div>
                            ))}
                        </div>
                        {/* Admin-only: remove from live site */}
                        {activeTab === 'approved' && (
                            <button
                                onClick={onDeleteLive}
                                disabled={isLoading}
                                className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-500 font-bold text-xs tracking-widest uppercase hover:bg-rose-500 hover:text-white transition-all duration-300 disabled:opacity-50"
                            >
                                {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                DECOMMISSION FROM LIVE
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

// ─── Helper Functions ─────────────────────────────────────────────────────────

function generatePaletteMetadata(colors: string[]) {
    const hslColors = colors.map(hexToHSL);
    const avgL = hslColors.reduce((a, c) => a + c.l, 0) / hslColors.length;
    const avgS = hslColors.reduce((a, c) => a + c.s, 0) / hslColors.length;
    const tags = new Set<string>();
    if (avgL < 30) tags.add("dark");
    else if (avgL > 70) tags.add("light");
    if (avgS > 80) tags.add("vibrant");
    else if (avgS > 60) tags.add("neon");
    else if (avgS < 20) tags.add("pastel");
    const warmCount = hslColors.filter(c => (c.h >= 0 && c.h < 60) || c.h >= 300).length;
    const coldCount = hslColors.filter(c => c.h >= 150 && c.h < 300).length;
    if (warmCount > coldCount) tags.add("warm");
    if (coldCount > warmCount) tags.add("cold");
    const dominant = hslColors.reduce((p, c) => p.s > c.s ? p : c);
    const h = dominant.h;
    const colorName = h < 15 ? "Red" : h < 45 ? "Orange" : h < 70 ? "Yellow" : h < 150 ? "Green"
        : h < 190 ? "Teal" : h < 250 ? "Blue" : h < 290 ? "Purple" : "Pink";
    const adj = avgL < 30 ? "Midnight" : avgL > 80 ? "Soft" : avgS > 80 ? "Electric" : "Classic";
    const nouns = ["Harmony", "Vibe", "Mood", "Essence", "Flow", "Aura", "Dream"];
    return { name: `${adj} ${colorName} ${nouns[Math.floor(Math.random() * nouns.length)]}`, tags: Array.from(tags) };
}

function hexToHSL(H: string) {
    let r = 0, g = 0, b = 0;
    if (H.length === 4) { r = parseInt("0x" + H[1] + H[1]); g = parseInt("0x" + H[2] + H[2]); b = parseInt("0x" + H[3] + H[3]); }
    else if (H.length === 7) { r = parseInt("0x" + H[1] + H[2]); g = parseInt("0x" + H[3] + H[4]); b = parseInt("0x" + H[5] + H[6]); }
    r /= 255; g /= 255; b /= 255;
    const cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin;
    let h = 0, s = 0, l = 0;
    if (delta === 0) h = 0;
    else if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    return { h, s: +(s * 100).toFixed(1), l: +(l * 100).toFixed(1) };
}

export default AdminDashboard;
