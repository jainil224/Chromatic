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
        <div className="midnight-mode min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
            <div className="w-full max-w-sm space-y-8 bg-card/30 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-2xl relative z-10 animate-fade-up">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/10 mb-2 ring-1 ring-primary/20">
                        <Lock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-display font-bold tracking-tight bg-gradient-to-br from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                            Restricted Access
                        </h1>
                        <p className="text-sm text-muted-foreground/80 font-medium">
                            This section is accessible only by <span className="text-primary font-bold">JAINIL PATEL</span>.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70 ml-1">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-background/20 border-white/10 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 placeholder:text-muted-foreground/40 h-11"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70 ml-1">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-background/20 border-white/10 focus:border-primary/50 focus:ring-primary/20 transition-all duration-300 h-11"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-11 text-base font-medium shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.5)] transition-all duration-300"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
