import { useState, useEffect } from "react";
import owlImage from "@/assets/owl.png";
import letterImage from "@/assets/letter-envelope.png";

interface OwlSceneProps {
  onLetterClick: () => void;
}

export const OwlScene = ({ onLetterClick }: OwlSceneProps) => {
  const [owlFlying, setOwlFlying] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [owlGone, setOwlGone] = useState(false);

  useEffect(() => {
    // Start owl animation after scene enters
    const timer = setTimeout(() => {
      setOwlFlying(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (owlFlying) {
      // Show letter after owl animation completes
      const timer = setTimeout(() => {
        setOwlGone(true);
        setTimeout(() => {
          setShowLetter(true);
        }, 500);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [owlFlying]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-night scene-enter">
      {/* Starry sky background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-foreground sparkle"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <div className="absolute top-20 right-20 w-24 h-24 md:w-32 md:h-32 rounded-full bg-foreground/20 blur-sm" />
      <div className="absolute top-20 right-20 w-20 h-20 md:w-28 md:h-28 rounded-full bg-foreground/30" />

      {/* Flying Owl */}
      {owlFlying && !owlGone && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={owlImage}
            alt="Hedwig the owl delivering a letter"
            className="w-48 h-48 md:w-64 md:h-64 object-contain owl-fly"
          />
        </div>
      )}

      {/* Letter */}
      {showLetter && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="letter-drop cursor-pointer letter-hover"
            onClick={onLetterClick}
          >
            <img
              src={letterImage}
              alt="Hogwarts acceptance letter"
              className="w-48 h-60 md:w-64 md:h-80 object-contain drop-shadow-2xl"
            />
            <p className="font-magical text-lg md:text-xl text-primary text-center mt-4 glow-gold animate-pulse">
              Click to open
            </p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-start pt-20 px-4">
        <h2 className="font-magical text-3xl md:text-5xl text-primary glow-gold text-center mb-4">
          An Owl Approaches
        </h2>
        <p className="font-elegant text-lg md:text-xl text-foreground/80 tracking-widest text-center">
          {!showLetter ? "A message from afar..." : "Your letter has arrived!"}
        </p>
      </div>
    </div>
  );
};
