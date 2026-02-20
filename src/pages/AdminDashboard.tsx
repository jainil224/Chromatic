import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Loader2, Sparkles, LogOut, ArrowLeft, Check, X } from "lucide-react";
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

            // ── 2. Build final tags (include new_arrival) ─────────────────────
            const extraTags = editedTags[submission.id]
                ? editedTags[submission.id].split(',').map(t => t.trim()).filter(Boolean)
                : [];
            const finalTags = Array.from(new Set([
                ...(submission.tags || []),
                category.toLowerCase(),
                ...extraTags,
                'new_arrival',   // ← automatically added
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
                        section: category.toLowerCase(),
                        approved_at: approvedAt,
                        tags: finalTags,
                    }).eq('id', newPal.id);
                }
            } else {
                // Legacy palettes table
                const { error } = await supabase.from('palettes').update({
                    section: category.toLowerCase(),
                    category: category.toLowerCase(),
                    tags: finalTags,
                    approved_at: approvedAt,
                }).eq('id', submission.id);
                if (error) throw error;
            }

            toast.success(`✅ "${submission.name}" approved as ${category} — now live with NEW badge!`);
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
        <div className="min-h-screen text-white" style={{ background: '#080808', fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}>

            {/* Top Bar */}
            <header style={{ borderBottom: '1px solid #1a1a1a', background: '#0d0d0d' }} className="sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div style={{ width: 42, height: 42, borderRadius: 10, background: 'linear-gradient(135deg, #00f5d4, #7b2fff)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        </div>
                        <div>
                            <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                                CHROMATIC <span style={{ color: '#00f5d4' }}>ADMIN</span>
                            </span>
                            <span style={{ display: 'block', fontSize: 11, color: '#444', letterSpacing: '0.3em', textTransform: 'uppercase', fontFamily: 'monospace' }}>by Jainil</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchAll}
                            style={{ padding: '9px 20px', borderRadius: 10, border: '1px solid #222', background: '#111', color: '#888', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}
                        >
                            ↺ Refresh
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            style={{ padding: '9px 20px', borderRadius: 10, border: '1px solid #222', background: '#111', color: '#aaa', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600 }}
                        >
                            <ArrowLeft size={14} /> Exit
                        </button>
                        <button
                            onClick={async () => { await supabase.auth.signOut(); navigate('/admin/login'); }}
                            style={{ padding: '9px 22px', borderRadius: 10, border: '1px solid #00f5d430', background: '#00f5d410', color: '#00f5d4', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700 }}
                        >
                            <LogOut size={14} /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Tab Bar */}
                <div className="flex items-center gap-4 mb-10">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '13px 32px',
                                borderRadius: 8,
                                border: activeTab === tab.id ? '2px solid #00f5d4' : '2px solid #222',
                                background: activeTab === tab.id ? '#00f5d415' : 'transparent',
                                color: activeTab === tab.id ? '#00f5d4' : '#444',
                                fontSize: 16,
                                fontWeight: 800,
                                letterSpacing: '0.12em',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                            }}
                        >
                            {tab.label}
                            {tab.count !== undefined && (
                                <span style={{
                                    background: activeTab === tab.id ? '#00f5d4' : '#222',
                                    color: activeTab === tab.id ? '#000' : '#555',
                                    borderRadius: 20,
                                    padding: '2px 10px',
                                    fontSize: 13,
                                    fontWeight: 900,
                                }}>
                                    {tab.count}
                                </span>
                            )}
                        </button>
                    ))}

                    <div style={{ marginLeft: 'auto', fontSize: 13, color: '#333', fontFamily: 'monospace' }}>
                        reviewing {currentList.length} items
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                        <Loader2 className="animate-spin" size={32} style={{ color: '#00f5d4' }} />
                    </div>
                ) : currentList.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 0', color: '#333' }}>
                        <div style={{ fontSize: 64, marginBottom: 16 }}>
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
                                onApprove={() => handleApprove(item)}
                                onReject={() => handleReject(item)}
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
    onApprove: () => void;
    onReject: () => void;
    isLoading: boolean;
}

const BADGE_COLORS: Record<TabType, { bg: string; color: string; label: string }> = {
    pending: { bg: '#f59e0b20', color: '#f59e0b', label: 'PENDING' },
    approved: { bg: '#10b98120', color: '#10b981', label: 'APPROVED' },
    rejected: { bg: '#ef444420', color: '#ef4444', label: 'REJECTED' },
};

const PaletteCard = ({
    item, activeTab, selectedCategory, onCategoryChange,
    editedTags, onTagsChange, onApprove, onReject, isLoading,
}: CardProps) => {
    const badge = BADGE_COLORS[activeTab];
    const date = new Date(item.submitted_at).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });

    return (
        <div style={{
            background: '#0e0e0e',
            border: '1px solid #1c1c1c',
            borderRadius: 12,
            overflow: 'hidden',
            transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#00f5d440';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 30px #00f5d408';
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#1c1c1c';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
            }}
        >
            {/* Color Strip */}
            <div style={{ display: 'flex', height: 180 }}>
                {item.colors.map((c, i) => (
                    <div key={i} style={{ flex: 1, background: c, position: 'relative' }} title={c} />
                ))}
            </div>

            {/* Body */}
            <div style={{ padding: '20px 22px 22px' }}>

                {/* Status Badge + Source */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span style={{
                        padding: '5px 14px', borderRadius: 20,
                        background: badge.bg, color: badge.color,
                        fontSize: 11, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase',
                    }}>
                        {badge.label}
                    </span>
                    <span style={{ fontSize: 11, color: '#2a2a2a', fontFamily: 'monospace' }}>{item.source === 'palette_submissions' ? 'NEW DB' : 'LEGACY'}</span>
                </div>

                {/* Name */}
                <h3 style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.02em', color: '#fff', marginBottom: 14, lineHeight: 1.1, textTransform: 'uppercase' }}>
                    {item.name}
                </h3>

                {/* Meta */}
                <div style={{ fontSize: 13, color: '#555', lineHeight: 2.1, marginBottom: 18 }}>
                    <div><span style={{ color: '#444' }}>Category: </span>{item.category || '—'}</div>
                    <div><span style={{ color: '#444' }}>IP: </span>
                        {item.ip_address_numeric ? (
                            <a href={`https://www.whois.com/whois/${numericToIp(item.ip_address_numeric)}`}
                                target="_blank" rel="noopener noreferrer"
                                style={{ color: '#00f5d470', textDecoration: 'none', fontFamily: 'monospace' }}>
                                {numericToIp(item.ip_address_numeric)}
                            </a>
                        ) : 'Hidden'}
                    </div>
                    <div><span style={{ color: '#444' }}>Date: </span>{date}</div>
                    {item.tags && item.tags.length > 0 && (
                        <div><span style={{ color: '#444' }}>Tags: </span>{item.tags.join(', ')}</div>
                    )}
                </div>

                {/* Actions — only editable on pending */}
                {activeTab === 'pending' && (
                    <>
                        {/* Category Select */}
                        <div style={{ marginBottom: 10, position: 'relative' }}>
                            <select
                                style={{
                                    width: '100%', background: '#111', border: '1px solid #222',
                                    borderRadius: 10, padding: '12px 16px', color: selectedCategory ? '#fff' : '#555',
                                    fontSize: 15, fontWeight: 600, outline: 'none', cursor: 'pointer',
                                    appearance: 'none',
                                }}
                                value={selectedCategory}
                                onChange={e => onCategoryChange(e.target.value)}
                            >
                                <option value="" style={{ background: '#111' }}>— Select Category —</option>
                                {CATEGORIES.map(c => (
                                    <option key={c} value={c} style={{ background: '#111' }}>{c}</option>
                                ))}
                            </select>
                            <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: '#444', pointerEvents: 'none', fontSize: 12 }}>▼</span>
                        </div>

                        {/* Tags Input */}
                        <div style={{ marginBottom: 16 }}>
                            <input
                                style={{
                                    width: '100%', background: '#111', border: '1px solid #1a1a1a',
                                    borderRadius: 10, padding: '12px 16px', color: '#ccc',
                                    fontSize: 14, outline: 'none', boxSizing: 'border-box',
                                }}
                                placeholder="Extra tags (comma separated)"
                                value={editedTags}
                                onChange={e => onTagsChange(e.target.value)}
                            />
                        </div>

                        {/* Approve / Reject */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            <button
                                onClick={onApprove}
                                disabled={isLoading}
                                style={{
                                    padding: '15px', borderRadius: 10,
                                    background: isLoading ? '#065f46' : '#059669',
                                    border: 'none',
                                    color: '#fff', fontWeight: 900, fontSize: 15,
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    letterSpacing: '0.08em', textTransform: 'uppercase',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                    transition: 'all 0.15s',
                                    boxShadow: '0 4px 20px #05966940',
                                }}
                                onMouseEnter={e => !isLoading && ((e.currentTarget as HTMLButtonElement).style.background = '#10b981')}
                                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#059669')}
                                onMouseDown={e => (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)'}
                                onMouseUp={e => (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'}
                            >
                                {isLoading ? <Loader2 size={17} className="animate-spin" /> : <Check size={17} strokeWidth={3} />}
                                APPROVE
                            </button>
                            <button
                                onClick={onReject}
                                disabled={isLoading}
                                style={{
                                    padding: '15px', borderRadius: 10,
                                    background: '#dc2626',
                                    border: 'none',
                                    color: '#fff', fontWeight: 900, fontSize: 15,
                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                    letterSpacing: '0.08em', textTransform: 'uppercase',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                                    transition: 'all 0.15s',
                                    boxShadow: '0 4px 20px #dc262640',
                                }}
                                onMouseEnter={e => !isLoading && ((e.currentTarget as HTMLButtonElement).style.background = '#ef4444')}
                                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = '#dc2626')}
                                onMouseDown={e => (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)'}
                                onMouseUp={e => (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'}
                            >
                                {isLoading ? <Loader2 size={17} className="animate-spin" /> : <X size={17} strokeWidth={3} />}
                                REJECT
                            </button>
                        </div>
                    </>
                )}

                {/* Read-only view for approved/rejected */}
                {activeTab !== 'pending' && item.colors.length > 0 && (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {item.colors.map((c, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <div style={{ width: 12, height: 12, borderRadius: 3, background: c }} />
                                <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#444' }}>{c.toUpperCase()}</span>
                            </div>
                        ))}
                    </div>
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
