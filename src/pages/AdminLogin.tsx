import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2, Lock } from "lucide-react";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                navigate("/admin");
            }
        };
        checkSession();
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Welcome back!");
            navigate("/admin");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden theme-transition">
            {/* Background Gradients */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-background theme-transition" />
                <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full blur-3xl theme-transition bg-[var(--blob-1)] opacity-50" />
                <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full blur-3xl theme-transition bg-[var(--blob-2)] opacity-50" />
            </div>
            <div className="grain pointer-events-none fixed inset-0 -z-10" />

            <div className="w-full max-w-sm space-y-8 bg-card/30 backdrop-blur-2xl p-10 rounded-3xl border border-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] relative z-10 animate-fade-up">
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center p-5 rounded-2xl bg-primary/10 ring-1 ring-primary/20 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.2)]">
                        <Lock className="h-7 w-7 text-primary" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl font-display font-black tracking-tight text-foreground uppercase">
                            Admin <span className="text-primary">Portal</span>
                        </h1>
                        <p className="text-[11px] text-text-dim font-mono uppercase tracking-[0.2em] opacity-80">
                            Secure access for authorized creators
                        </p>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-text-dim/60 ml-1">
                            Identification
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="admin@chromatic.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-background/20 border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 placeholder:text-text-dim/20 h-12 rounded-xl font-mono text-sm"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-text-dim/60 ml-1">
                            Security Key
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-background/20 border-white/5 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 h-12 rounded-xl font-mono"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-14 text-sm font-black uppercase tracking-[0.2em] shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.4)] hover:shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.6)] transition-all duration-500 rounded-xl hover:scale-[1.02] active:scale-[0.98]"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            "Establish Session"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
