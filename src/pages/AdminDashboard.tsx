import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Submission {
    id: string;
    name: string;
    colors: string[];
    likes: number;
    status: 'pending' | 'approved' | 'rejected';
    submitted_at: string;
    category?: string;
    tags?: string[];
    user_ip?: string;
    ip_address_numeric?: string | number;
}

const CATEGORIES = [
    "dark", "light", "pastel", "vintage", "retro", "neon", "gold", "cold", "fall", "winter", "spring", "happy", "nature", "earth", "space", "rainbow", "gradient", "sunset", "sky", "sea", "kid", "skin", "food", "cream", "coffee", "wedding", "christmas"
];

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<Record<string, string>>({});
    const [editedTags, setEditedTags] = useState<Record<string, string>>({});

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            navigate("/admin/login");
            return;
        }
        fetchSubmissions();
    };

    const fetchSubmissions = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('palette_submissions')
            .select('*')
            .eq('status', 'pending')
            .order('submitted_at', { ascending: false });

        if (error) {
            console.error('Error fetching submissions:', error);
            toast.error('Failed to load submissions');
        } else {
            setSubmissions(data || []);
            // Initialize editedTags with existing tags
            const initialTags: Record<string, string> = {};
            data?.forEach((s: Submission) => {
                if (s.tags && s.tags.length > 0) {
                    initialTags[s.id] = s.tags.join(', ');
                }
            });
            setEditedTags(initialTags);
        }
        setLoading(false);
    };

    const handleApprove = async (id: string, currentTags: string[]) => {
        setActionLoading(id);
        const category = selectedCategories[id] || null;
        // Use edited tags if available, otherwise use current tags from submission
        const tagsToSave = editedTags[id] !== undefined
            ? editedTags[id].split(',').map(t => t.trim()).filter(t => t.length > 0)
            : currentTags;

        try {
            const { data, error } = await supabase.rpc('approve_submission', {
                submission_id: id,
                target_category: category,
                target_tags: tagsToSave
            });

            if (error) throw error;

            toast.success(`Palette approved${category ? ` to ${category}` : ''}!`);
            // Remove locally
            setSubmissions(prev => prev.filter(s => s.id !== id));
        } catch (error: any) {
            console.error('Error approving:', error);
            toast.error(error.message || "Failed to approve");
        } finally {
            setActionLoading(null);
        }
    };

    const handleReject = async (id: string) => {
        setActionLoading(id);
        try {
            const { error } = await supabase.rpc('reject_submission', { submission_id: id });

            if (error) throw error;

            toast.success("Palette rejected.");
            // Remove locally
            setSubmissions(prev => prev.filter(s => s.id !== id));
        } catch (error: any) {
            console.error('Error rejecting:', error);
            toast.error(error.message || "Failed to reject");
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
                                                    {new Date(submission.submitted_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
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
                                                            <span className="text-[10px] font-mono text-primary truncate max-w-[120px]" title={submission.ip_address_numeric.toString()}>
                                                                {submission.ip_address_numeric.toString()}
                                                            </span>
                                                            <a
                                                                href={`https://www.whois.com/whois/${submission.ip_address_numeric}`}
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
                                                        <option key={cat} value={cat} className="bg-zinc-900">{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
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
        </div>
    );
};

export default AdminDashboard;
