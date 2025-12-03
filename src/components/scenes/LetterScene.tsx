import { useState, useEffect } from "react";
import parchmentImage from "@/assets/parchment.jpg";

interface LetterSceneProps {
  recipientName?: string;
}

const birthdayMessages = [
  "Dearest Friend,",
  "",
  "On this most magical of days, the wizarding world celebrates the anniversary of your arrival.",
  "",
  "You possess a magic that no spell can teach — the gift of kindness, the charm of laughter, and a heart braver than any Gryffindor.",
  "",
  "May your new year be filled with:",
  "✨ Adventures as thrilling as a Quidditch match",
  "✨ Friendships as loyal as house-elves",
  "✨ Dreams as boundless as the Hogwarts library",
  "✨ Joy as warm as butterbeer on a cold day",
  "",
  "Remember: Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
  "",
  "Today, all the candles in the Great Hall glow in your honor. The house ghosts raise their spectral goblets. Even Peeves promises to behave (well, mostly).",
  "",
  "May every wish you make come true, every dream take flight like a golden snitch, and every moment sparkle with the magic that is uniquely you.",
  "",
  "Happy Birthday, dear wizard!",
  "",
  "With love and magic,",
  "Your Secret Admirer ⚡",
];

export const LetterScene = ({ recipientName = "Friend" }: LetterSceneProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Replace "Friend" with actual name if provided
  const messages = birthdayMessages.map(line => 
    line.replace("Dearest Friend,", `Dearest ${recipientName},`)
  );

  useEffect(() => {
    if (currentLineIndex >= messages.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = messages[currentLineIndex];
    
    if (currentLine === "") {
      // Empty line - add it and move to next
      setDisplayedLines(prev => [...prev, ""]);
      setCurrentLineIndex(prev => prev + 1);
      setCurrentCharIndex(0);
      return;
    }

    if (currentCharIndex >= currentLine.length) {
      // Line complete, move to next
      setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 300);
      return;
    }

    // Type next character
    const timer = setTimeout(() => {
      if (currentCharIndex === 0) {
        setDisplayedLines(prev => [...prev, currentLine.charAt(0)]);
      } else {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          newLines[newLines.length - 1] = currentLine.slice(0, currentCharIndex + 1);
          return newLines;
        });
      }
      setCurrentCharIndex(prev => prev + 1);
    }, 30);

    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, messages]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background scene-enter">
      {/* Dark magical background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-background to-midnight" />
      
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40 sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Parchment Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 md:p-8">
        <div 
          className="relative w-full max-w-3xl parchment-unroll"
          style={{ transformOrigin: "top center" }}
        >
          {/* Parchment Background */}
          <div 
            className="relative rounded-lg overflow-hidden shadow-2xl"
            style={{
              backgroundImage: `url(${parchmentImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Parchment overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-parchment/30 via-transparent to-parchment/30" />
            
            {/* Content */}
            <div className="relative p-8 md:p-12 lg:p-16">
              {/* Hogwarts Header */}
              <div className="text-center mb-8">
                <h1 className="font-magical text-2xl md:text-3xl text-parchment-dark mb-2">
                  HOGWARTS
                </h1>
                <p className="font-elegant text-sm md:text-base text-parchment-dark/70 tracking-[0.2em] uppercase">
                  School of Witchcraft and Wizardry
                </p>
                <div className="w-32 h-0.5 bg-parchment-dark/30 mx-auto mt-4" />
              </div>

              {/* Letter Content */}
              <div className="space-y-2 min-h-[400px]">
                {displayedLines.map((line, index) => (
                  <p 
                    key={index}
                    className={cn(
                      "font-parchment text-lg md:text-xl text-parchment-dark leading-relaxed",
                      line === "" && "h-4",
                      line.startsWith("✨") && "pl-4"
                    )}
                  >
                    {line}
                    {index === displayedLines.length - 1 && isTyping && (
                      <span className="animate-pulse ml-1">|</span>
                    )}
                  </p>
                ))}
              </div>

              {/* Wax Seal */}
              {!isTyping && (
                <div className="flex justify-center mt-8 text-reveal">
                  <div className="w-16 h-16 rounded-full bg-wax-red flex items-center justify-center shadow-lg">
                    <span className="font-magical text-foreground text-xl">H</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Parchment shadow */}
          <div className="absolute -bottom-4 left-4 right-4 h-8 bg-background/50 blur-xl rounded-full" />
        </div>
      </div>

      {/* Return hint */}
      {!isTyping && (
        <div className="absolute bottom-8 left-0 right-0 text-center text-reveal">
          <p className="font-elegant text-foreground/60 text-sm tracking-widest">
            May your birthday be truly magical ⚡
          </p>
        </div>
      )}
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
