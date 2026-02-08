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
                    <h1 className="text-xl font-bold font-display">Admin Dashboard</h1>
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => navigate('/')}>Exit</Button>
                        <Button variant="outline" onClick={async () => {
                            await supabase.auth.signOut();
                            navigate('/admin/login');
                        }}>Logout</Button>
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
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {submissions.map((submission) => (
                            <div key={submission.id} className="bg-card border rounded-xl overflow-hidden shadow-sm">
                                {/* Color Preview */}
                                <div className="h-32 flex">
                                    {submission.colors.map((color, i) => (
                                        <div
                                            key={i}
                                            style={{ backgroundColor: color }}
                                            className="h-full flex-1"
                                            title={color}
                                        />
                                    ))}
                                </div>

                                <div className="p-4 space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-lg">{submission.name}</h3>
                                        <p className="text-xs text-muted-foreground font-mono">
                                            Submitted: {new Date(submission.submitted_at).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-muted-foreground">Category (Optional)</label>
                                        <select
                                            className="w-full bg-background border rounded-md p-2 text-sm"
                                            value={selectedCategories[submission.id] || ""}
                                            onChange={(e) => setSelectedCategories(prev => ({ ...prev, [submission.id]: e.target.value }))}
                                        >
                                            <option value="">Select Category...</option>
                                            {CATEGORIES.map(cat => (
                                                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-muted-foreground">Tags (Comma separated)</label>
                                        <input
                                            className="w-full bg-background border rounded-md p-2 text-sm"
                                            value={editedTags[submission.id] || ""}
                                            onChange={(e) => setEditedTags(prev => ({ ...prev, [submission.id]: e.target.value }))}
                                            placeholder="e.g. warm, sunset"
                                        />
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            variant="default"
                                            className="flex-1 bg-green-600 hover:bg-green-700"
                                            onClick={() => handleApprove(submission.id, submission.tags || [])}
                                            disabled={!!actionLoading}
                                        >
                                            {actionLoading === submission.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <Check className="h-4 w-4 mr-2" /> Approve
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            className="flex-1"
                                            onClick={() => handleReject(submission.id)}
                                            disabled={!!actionLoading}
                                        >
                                            {actionLoading === submission.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <X className="h-4 w-4 mr-2" /> Reject
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
