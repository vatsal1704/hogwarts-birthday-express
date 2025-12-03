import { useState, useEffect, useCallback } from "react";
import parchmentImage from "@/assets/parchment.jpg";

interface LetterSceneProps {
  recipientName?: string;
}

interface MessageLine {
  text: string;
  isTitle?: boolean;
  isSignature?: boolean;
  isEmpty?: boolean;
}

const birthdayMessages: MessageLine[] = [
  { text: "Happy Birthday", isTitle: true },
  { text: "", isEmpty: true },
  { text: "Dearest Kanishka,", isSignature: false },
  { text: "", isEmpty: true },
  { text: "On this most magical of days, the wizarding world celebrates the anniversary of your arrival." },
  { text: "", isEmpty: true },
  { text: "You possess a magic that no spell can teach — the gift of kindness, the charm of laughter, and a heart braver than any Gryffindor." },
  { text: "", isEmpty: true },
  { text: "May all your wishes come true..." },
  { text: "", isEmpty: true },
  { text: "✨ Adventures as thrilling as a Quidditch match" },
  { text: "✨ Friendships as loyal as house-elves" },
  { text: "✨ Dreams as boundless as the Hogwarts library" },
  { text: "✨ Joy as warm as butterbeer on a cold day" },
  { text: "", isEmpty: true },
  { text: "Remember: Happiness can be found even in the darkest of times, if one only remembers to turn on the light." },
  { text: "", isEmpty: true },
  { text: "Today, all the candles in the Great Hall glow in your honor." },
  { text: "", isEmpty: true },
  { text: "With love and magic,", isSignature: true },
  { text: "Your Secret Admirer ⚡", isSignature: true },
];

export const LetterScene = ({ recipientName = "Kanishka" }: LetterSceneProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isErasing, setIsErasing] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [completedMessages, setCompletedMessages] = useState<MessageLine[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Replace name in messages
  const messages = birthdayMessages.map(msg => ({
    ...msg,
    text: msg.text.replace("Kanishka", recipientName)
  }));

  const currentMessage = messages[currentMessageIndex];

  // Typing effect
  useEffect(() => {
    if (!showMessage || isComplete) return;
    if (!currentMessage) {
      setIsComplete(true);
      return;
    }

    // Handle empty lines
    if (currentMessage.isEmpty) {
      setCompletedMessages(prev => [...prev, currentMessage]);
      setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
      }, 300);
      return;
    }

    if (isErasing) {
      // Erasing effect
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, 20);
        return () => clearTimeout(timer);
      } else {
        // Done erasing, move to completed and next message
        setIsErasing(false);
        setCurrentMessageIndex(prev => prev + 1);
      }
    } else {
      // Typing effect
      if (displayText.length < currentMessage.text.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentMessage.text.slice(0, displayText.length + 1));
        }, 40);
        return () => clearTimeout(timer);
      } else {
        // Done typing, wait then start erasing (except for last few messages)
        const isLastSection = currentMessageIndex >= messages.length - 3;
        
        if (isLastSection) {
          // Don't erase the last messages, just add them
          setCompletedMessages(prev => [...prev, currentMessage]);
          setDisplayText("");
          setTimeout(() => {
            setCurrentMessageIndex(prev => prev + 1);
          }, 500);
        } else {
          // Wait then erase
          const timer = setTimeout(() => {
            setCompletedMessages(prev => [...prev, currentMessage]);
            setDisplayText("");
            setCurrentMessageIndex(prev => prev + 1);
          }, 1500);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [displayText, isErasing, currentMessage, showMessage, currentMessageIndex, messages.length, isComplete]);

  // Start the animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
            <div className="absolute inset-0 bg-gradient-to-b from-parchment/40 via-parchment/20 to-parchment/40" />
            
            {/* Content */}
            <div className="relative p-8 md:p-12 lg:p-16 min-h-[70vh]">
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
              <div className="space-y-3 min-h-[400px]">
                {/* Completed messages with slide-up animation */}
                {completedMessages.map((msg, index) => (
                  <div
                    key={index}
                    className="message-line-enter"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {msg.isEmpty ? (
                      <div className="h-4" />
                    ) : (
                      <p 
                        className={cn(
                          "font-parchment leading-relaxed transition-all duration-500",
                          msg.isTitle && "text-3xl md:text-4xl font-magical text-center text-parchment-dark mb-4",
                          msg.isSignature && "text-lg md:text-xl italic",
                          !msg.isTitle && !msg.isSignature && "text-lg md:text-xl text-parchment-dark",
                          msg.text.startsWith("✨") && "pl-4"
                        )}
                      >
                        {msg.text}
                      </p>
                    )}
                  </div>
                ))}

                {/* Currently typing message */}
                {showMessage && currentMessage && !currentMessage.isEmpty && !isComplete && (
                  <p 
                    className={cn(
                      "font-parchment leading-relaxed",
                      currentMessage.isTitle && "text-3xl md:text-4xl font-magical text-center text-parchment-dark mb-4",
                      currentMessage.isSignature && "text-lg md:text-xl italic text-parchment-dark",
                      !currentMessage.isTitle && !currentMessage.isSignature && "text-lg md:text-xl text-parchment-dark",
                      currentMessage.text.startsWith("✨") && "pl-4"
                    )}
                  >
                    {displayText}
                    <span className="animate-pulse text-primary">|</span>
                  </p>
                )}
              </div>

              {/* Wax Seal */}
              {isComplete && (
                <div className="flex justify-center mt-8 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-wax-red flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
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

      {/* Footer message */}
      {isComplete && (
        <div className="absolute bottom-8 left-0 right-0 text-center animate-fade-in">
          <p className="font-elegant text-foreground/60 text-sm tracking-widest">
            May your birthday be truly magical ⚡
          </p>
        </div>
      )}

      <style>{`
        @keyframes messageFadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message-line-enter {
          animation: messageFadeSlideUp 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
