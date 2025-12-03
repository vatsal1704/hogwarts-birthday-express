import { useState } from "react";
import { SpellButton } from "../SpellButton";
import gatesImage from "@/assets/gates.jpg";

interface GatesSceneProps {
  onComplete: () => void;
}

export const GatesScene = ({ onComplete }: GatesSceneProps) => {
  const [gatesOpen, setGatesOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleWingardium = () => {
    setGatesOpen(true);
    setIsTransitioning(true);
    
    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden scene-enter">
      {/* Gates background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${gatesImage})` }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/60" />

      {/* Animated gate overlay effect */}
      {gatesOpen && (
        <div className="absolute inset-0 flex">
          <div 
            className="w-1/2 h-full bg-background/80 origin-left gate-left-open"
            style={{ transformStyle: "preserve-3d" }}
          />
          <div 
            className="w-1/2 h-full bg-background/80 origin-right gate-right-open"
            style={{ transformStyle: "preserve-3d" }}
          />
        </div>
      )}

      {/* Fog effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

      {/* Content */}
      <div className={cn(
        "relative z-10 flex min-h-screen flex-col items-center justify-center px-4",
        isTransitioning && "opacity-0 transition-opacity duration-1000 delay-1500"
      )}>
        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="font-magical text-3xl md:text-5xl lg:text-6xl text-primary glow-gold mb-4">
            The Gates Await
          </h2>
          <p className="font-elegant text-lg md:text-xl text-foreground/80 tracking-widest">
            A powerful spell is needed to enter
          </p>
        </div>

        {/* Instruction */}
        {!gatesOpen && (
          <p className="font-parchment text-xl md:text-2xl text-foreground/70 mb-8 text-center animate-pulse">
            Levitate the ancient gates...
          </p>
        )}

        {/* Spell Button */}
        {!gatesOpen && (
          <SpellButton
            spell="Wingardium Leviosa"
            onClick={handleWingardium}
            className="mt-4"
          />
        )}

        {/* Success message */}
        {gatesOpen && (
          <p className="font-magical text-2xl md:text-3xl text-primary glow-gold animate-pulse">
            The path is revealed...
          </p>
        )}
      </div>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
