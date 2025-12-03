import { useState } from "react";
import { SpellButton } from "../SpellButton";
import hogwartsDark from "@/assets/hogwarts-dark.jpg";
import hogwartsLit from "@/assets/hogwarts-lit.jpg";

interface HogwartsSceneProps {
  onComplete: () => void;
}

export const HogwartsScene = ({ onComplete }: HogwartsSceneProps) => {
  const [lightsOn, setLightsOn] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAlohomora = () => {
    setLightsOn(true);
    setIsTransitioning(true);

    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Dark castle background */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000",
          lightsOn ? "opacity-0" : "opacity-100"
        )}
        style={{ backgroundImage: `url(${hogwartsDark})` }}
      />

      {/* Lit castle background */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-2000",
          lightsOn ? "lights-on" : "opacity-0"
        )}
        style={{ backgroundImage: `url(${hogwartsLit})` }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

      {/* Content */}
      <div className={cn(
        "relative z-10 flex min-h-screen flex-col items-center justify-center px-4",
        isTransitioning && "scene-exit"
      )}>
        {/* Hogwarts Title */}
        <div className="mb-8 text-center">
          <h1 className="font-magical text-3xl md:text-6xl lg:text-7xl text-primary glow-gold mb-4">
            HOGWARTS
          </h1>
          <p className="font-elegant text-base md:text-xl text-foreground/80 tracking-[0.3em] uppercase">
            School of Witchcraft and Wizardry
          </p>
        </div>

        {/* Instruction text */}
        {!lightsOn && (
          <p className="font-parchment text-xl md:text-2xl text-foreground/70 mb-8 text-center animate-pulse">
            Cast the spell to illuminate the castle...
          </p>
        )}

        {/* Spell Button */}
        {!lightsOn && (
          <SpellButton
            spell="Alohomora"
            onClick={handleAlohomora}
            className="mt-4"
          />
        )}

        {/* Success message */}
        {lightsOn && (
          <p className="font-magical text-2xl md:text-3xl text-primary glow-gold animate-pulse">
            The castle awakens...
          </p>
        )}
      </div>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
