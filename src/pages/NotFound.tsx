import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary">
      <div className="text-center px-6 animate-fade-up">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-accent/10">
            <AlertCircle className="h-12 w-12 text-accent" />
          </div>
        </div>
        <h1 className="mb-2 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          404
        </h1>
        <p className="mb-4 text-xl text-secondary-foreground/60">Oops! Page not found</p>
        <p className="mb-8 text-secondary-foreground/50 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="gap-2 h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs uppercase"
        >
          <Home className="h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
