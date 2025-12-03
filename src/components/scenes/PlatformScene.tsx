import { useState } from "react";
import platformWall from "@/assets/platform-wall.jpg";

interface PlatformSceneProps {
  onComplete: () => void;
}

export const PlatformScene = ({ onComplete }: PlatformSceneProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [showPortal, setShowPortal] = useState(false);

  const handleRunThrough = () => {
    setIsRunning(true);

    setTimeout(() => {
      setShowPortal(true);
    }, 800);

    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Platform Background */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000",
          isRunning && "scale-150 blur-sm"
        )}
        style={{ backgroundImage: `url(${platformWall})` }}
      />

      {/* Portal Effect */}
      {showPortal && (
        <div className="absolute inset-0 bg-primary/30 animate-pulse" />
      )}

      {/* Magical Transition Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-background transition-opacity duration-1000",
          showPortal ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-background/60" />

      {/* Content */}
      <div className={cn(
        "relative z-10 flex min-h-screen flex-col items-center justify-center px-4 transition-all duration-500",
        isRunning && "opacity-0 scale-150"
      )}>
        {/* Platform Sign */}
        <div className="mb-8 text-center">
          <div className="inline-block bg-background/80 backdrop-blur-sm border-4 border-primary rounded-lg px-6 py-3 md:px-8 md:py-4 mb-6">
            <h1 className="font-magical text-2xl md:text-5xl lg:text-6xl text-primary glow-gold">
              PLATFORM 9¾
            </h1>
          </div>
          <p className="font-elegant text-base md:text-xl text-foreground/80 tracking-widest">
            King's Cross Station
          </p>
        </div>

        {/* Instruction */}
        <p className="font-parchment text-xl md:text-2xl text-foreground/70 mb-8 text-center animate-pulse max-w-md">
          The barrier between platforms 9 and 10... Are you brave enough to run through?
        </p>

        {/* Run Button */}
        <button
          onClick={handleRunThrough}
          className="btn-spell font-magical text-xl md:text-2xl group"
        >
          <span className="relative z-10 glow-gold flex items-center gap-3">
            <span className="group-hover:translate-x-2 transition-transform duration-300">🏃</span>
            Run Through the Wall
            <span className="group-hover:-translate-x-2 transition-transform duration-300">🧱</span>
          </span>
        </button>

        {/* Hint */}
        <p className="font-parchment text-sm text-foreground/50 mt-8 text-center">
          "Best do it at a bit of a run if you're nervous"
        </p>
      </div>

      {/* Running Effect Particles */}
      {isRunning && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-8 bg-primary/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `particleStreakRun 0.5s ease-out forwards`,
                animationDelay: `${Math.random() * 0.3}s`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes particleStreakRun {
          from {
            transform: translateX(0) scaleX(1);
            opacity: 1;
          }
          to {
            transform: translateX(-200px) scaleX(3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
