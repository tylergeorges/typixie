import { TypixieLetter } from "@/components/typixie/types";
import { useTypixieSelecor } from "@/components/typixie/typixie-provider";
import { cn } from "@/utils/cn";
import { forwardRef } from "react";

interface WordProps {
  wordIdx: number;
}

export const Word = forwardRef<HTMLSpanElement, WordProps>(
  ({ wordIdx }, ref) => {
    const word = useTypixieSelecor((v) => v.test.words[wordIdx]);

    return (
      <span ref={word.isActive ? ref : null} className="relative inline-block">
        {word.letters.map(({ isCorrect, val }, idx) => {
          return (
            <span
              className={cn(
                "inline-block relative",
                typeof isCorrect === "undefined"
                  ? "text-muted"
                  : isCorrect
                    ? "text-primary"
                    : "text-destructive"
              )}
              key={`${val}-${idx}`}
            >
              {val}
            </span>
          );
        })}
      </span>
    );
  }
);

Word.displayName = "Word";
