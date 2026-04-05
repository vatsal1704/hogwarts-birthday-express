import { useState, useEffect } from "react";
import parchmentImage from "@/assets/parchment.jpg";

interface LetterSceneProps {
  recipientName?: string;
}

interface MessageLine {
  text: string;
  isTitle?: boolean;
  isSubtitle?: boolean;
  isSignature?: boolean;
  isEmpty?: boolean;
  isEmoji?: boolean;
}

const birthdayMessages: MessageLine[] = [
  { text: "✨", isEmoji: true },
  { text: "", isEmpty: true },
  { text: "Happy Birthday", isTitle: true },
  { text: "Aayushi", isSubtitle: true },
  { text: "", isEmpty: true },
  { text: "", isEmpty: true },
  { text: "On this most magical of days,", isSignature: false },
  { text: "the wizarding world celebrates you.", isSignature: false },
  { text: "", isEmpty: true },
  { text: "You possess a magic that no spell can teach —", isSignature: false },
  { text: "the gift of kindness, the charm of laughter,", isSignature: false },
  { text: "and a heart braver than any Gryffindor.", isSignature: false },
  { text: "", isEmpty: true },
  { text: "May all your wishes come true...", isSignature: false },
  { text: "", isEmpty: true },
  { text: "✨ Adventures as thrilling as Quidditch", isSignature: false },
  { text: "✨ Friendships as loyal as house-elves", isSignature: false },
  { text: "✨ Dreams as boundless as magic itself", isSignature: false },
  { text: "", isEmpty: true },
  { text: "With love and magic,", isSignature: true },
  { text: "Your Secret Admirer ⚡", isSignature: true },
];

export const LetterScene = ({ recipientName = "Ayushi" }: LetterSceneProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Replace name in messages
  const messages = birthdayMessages.map(msg => ({
    ...msg,
    text: msg.text.replace("Ayushi", recipientName)
  }));

  useEffect(() => {
    if (currentIndex >= messages.length) {
      setIsComplete(true);
      return;
    }

    // Skip empty lines automatically and quickly
    if (messages[currentIndex].isEmpty) {
      setCurrentIndex(prev => prev + 1);
      return;
    }

    // Duration should match the CSS animation (4s) plus a small buffer
    const duration = 4000;

    const timer = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex, messages]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Fullscreen dark magical background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-background to-midnight" />

      {/* Magical particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/60 sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Fullscreen Parchment */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
        <div
          className="relative w-full h-full max-w-5xl max-h-[90vh] parchment-unroll rounded-lg overflow-hidden"
          style={{ transformOrigin: "top center" }}
        >
          {/* Parchment Background */}
          <div
            className="absolute inset-0 rounded-lg"
            style={{
              backgroundImage: `url(${parchmentImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Parchment texture overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-parchment/30 via-transparent to-parchment/40 rounded-lg" />

          {/* Decorative border */}
          <div className="absolute inset-4 border-2 border-parchment-dark/20 rounded pointer-events-none" />

          {/* Content Container */}
          <div className="relative h-full flex flex-col items-center justify-center p-8 md:p-16 overflow-y-auto">
            {/* Hogwarts Crest/Header */}
            <div className="text-center mb-6 opacity-60">
              <p className="font-magical text-sm md:text-base text-parchment-dark/60 tracking-[0.3em] uppercase">
                Hogwarts School of Witchcraft & Wizardry
              </p>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6 max-w-2xl min-h-[300px]">
              {messages.map((msg, index) => {
                // Only render if it's the current index
                if (index !== currentIndex) return null;

                if (msg.isEmpty) return null;

                return (
                  <div
                    key={index}
                    className="animate-appear-disappear"
                  >
                    {msg.isEmoji ? (
                      <span className="text-5xl md:text-8xl block animate-pulse">{msg.text}</span>
                    ) : msg.isTitle ? (
                      <h1 className="font-magical text-4xl md:text-7xl lg:text-8xl text-parchment-dark tracking-wide drop-shadow-md">
                        {msg.text}
                      </h1>
                    ) : msg.isSubtitle ? (
                      <h2 className="font-magical text-3xl md:text-6xl lg:text-7xl text-primary tracking-wider drop-shadow-sm">
                        {msg.text}
                      </h2>
                    ) : msg.isSignature ? (
                      <p className="font-magical text-xl md:text-3xl text-parchment-dark/80 italic">
                        {msg.text}
                      </p>
                    ) : (
                      <p className={cn(
                        "font-magical text-xl md:text-4xl text-parchment-dark leading-relaxed",
                        msg.text.startsWith("✨") && "text-lg md:text-2xl"
                      )}>
                        {msg.text}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Wax Seal */}
            {isComplete && (
              <div className="mt-8 animate-fade-in">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-wax-red flex items-center justify-center shadow-xl transform hover:scale-110 transition-transform">
                  <span className="font-magical text-foreground text-2xl md:text-3xl">H</span>
                </div>
              </div>
            )}
          </div>

          {/* Parchment edge shadows */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-parchment-dark/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-parchment-dark/10 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Bottom message */}
      {isComplete && (
        <div className="absolute bottom-6 left-0 right-0 text-center animate-fade-in z-10">
          <p className="font-elegant text-foreground/70 text-sm md:text-base tracking-[0.2em]">
            ✨ May your birthday be truly magical ✨
          </p>
        </div>
      )}

      <style>{`
        @keyframes appearDisappear {
          0% { opacity: 0; transform: scale(0.9); filter: blur(4px); }
          10% { opacity: 1; transform: scale(1); filter: blur(0); }
          80% { opacity: 1; transform: scale(1); filter: blur(0); }
          100% { opacity: 0; transform: scale(1.1); filter: blur(2px); }
        }

        .animate-appear-disappear {
          animation: appearDisappear 4s ease-in-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .parchment-unroll {
          animation: unroll 1s ease-out forwards;
        }

        @keyframes unroll {
          from {
            opacity: 0;
            transform: scaleY(0.8) scaleX(0.95);
          }
          to {
            opacity: 1;
            transform: scaleY(1) scaleX(1);
          }
        }
      `}</style>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
