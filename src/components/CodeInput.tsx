import { useRef, useState, KeyboardEvent, ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface CodeInputProps {
  length: number;
  onComplete: (code: string) => void;
  isError: boolean;
}

export const CodeInput = ({ length, onComplete, isError }: CodeInputProps) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newValues = [...values];
    newValues[index] = value.toUpperCase();
    setValues(newValues);

    // Auto-focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all inputs are filled
    if (newValues.every(v => v) && index === length - 1) {
      onComplete(newValues.join(""));
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length).toUpperCase();
    const newValues = [...values];
    
    for (let i = 0; i < pastedData.length && i < length; i++) {
      newValues[i] = pastedData[i];
    }
    
    setValues(newValues);
    
    if (newValues.every(v => v)) {
      onComplete(newValues.join(""));
    } else {
      const nextEmptyIndex = newValues.findIndex(v => !v);
      if (nextEmptyIndex !== -1) {
        inputRefs.current[nextEmptyIndex]?.focus();
      }
    }
  };

  return (
    <div className="flex gap-3">
      {values.map((value, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          maxLength={1}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className={cn(
            "w-16 h-20 text-center text-3xl font-bold rounded-lg",
            "bg-card border-2 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
            "hover:border-primary/50",
            isError && "border-destructive animate-shake"
          )}
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};
