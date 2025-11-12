import { useState } from "react";
import { Lock } from "lucide-react";
import { CodeInput } from "@/components/CodeInput";
import { SuccessMessage } from "@/components/SuccessMessage";
import { useToast } from "@/hooks/use-toast";

const CORRECT_CODE = "MRCH";

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isError, setIsError] = useState(false);
  const { toast } = useToast();

  const handleCodeComplete = (code: string) => {
    if (code.toUpperCase() === CORRECT_CODE) {
      setIsUnlocked(true);
      toast({
        title: "Success!",
        description: "Code verified successfully",
      });
    } else {
      setIsError(true);
      toast({
        title: "Incorrect Code",
        description: "Please try again",
        variant: "destructive",
      });
      
      setTimeout(() => setIsError(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/20 p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-2xl p-8 md:p-12 border border-border/50 backdrop-blur">
          {!isUnlocked ? (
            <div className="space-y-8">
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-gradient-to-br from-primary to-accent">
                  <Lock className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-bold tracking-tight">Enter Code</h1>
                  <p className="text-muted-foreground">
                    Enter the 4-letter code to unlock
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <CodeInput
                  length={4}
                  onComplete={handleCodeComplete}
                  isError={isError}
                />
              </div>

              <div className="text-center text-sm text-muted-foreground">
                Enter letters (case insensitive)
              </div>
            </div>
          ) : (
            <SuccessMessage />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
