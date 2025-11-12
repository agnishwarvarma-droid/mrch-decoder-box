import { CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";

export const SuccessMessage = () => {
  return (
    <div className="animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-success/20 blur-3xl rounded-full animate-pulse" />
          <CheckCircle2 className="w-24 h-24 text-success relative z-10" strokeWidth={1.5} />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[hsl(var(--lock-gradient-from))] to-[hsl(var(--lock-gradient-to))] bg-clip-text text-transparent">
            Congrats!!!
          </h2>
          <p className="text-xl text-muted-foreground">
            Now head to
          </p>
        </div>

        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8 py-6"
        >
          <a href="https://baddieventure.vercel.app" target="_blank" rel="noopener noreferrer">
            baddieventure.vercel.app
          </a>
        </Button>
      </div>
    </div>
  );
};
