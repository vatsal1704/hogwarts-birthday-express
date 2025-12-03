import { useState } from "react";
import { MagicParticles } from "@/components/MagicParticles";
import { MusicPlayer } from "@/components/MusicPlayer";
import { PlatformScene } from "@/components/scenes/PlatformScene";
import { HogwartsScene } from "@/components/scenes/HogwartsScene";
import { GatesScene } from "@/components/scenes/GatesScene";
import { OwlScene } from "@/components/scenes/OwlScene";
import { LetterScene } from "@/components/scenes/LetterScene";

type Scene = "platform" | "hogwarts" | "gates" | "owl" | "letter";

const Index = () => {
  const [currentScene, setCurrentScene] = useState<Scene>("platform");

  const handlePlatformComplete = () => {
    setCurrentScene("hogwarts");
  };

  const handleHogwartsComplete = () => {
    setCurrentScene("gates");
  };

  const handleGatesComplete = () => {
    setCurrentScene("owl");
  };

  const handleLetterClick = () => {
    setCurrentScene("letter");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Music Player */}
      <MusicPlayer />

      {/* Magic Particles (visible in most scenes) */}
      {currentScene !== "letter" && <MagicParticles />}

      {/* Scenes */}
      {currentScene === "platform" && (
        <PlatformScene onComplete={handlePlatformComplete} />
      )}

      {currentScene === "hogwarts" && (
        <HogwartsScene onComplete={handleHogwartsComplete} />
      )}

      {currentScene === "gates" && (
        <GatesScene onComplete={handleGatesComplete} />
      )}

      {currentScene === "owl" && (
        <OwlScene onLetterClick={handleLetterClick} />
      )}

      {currentScene === "letter" && (
        <LetterScene recipientName="Kanishka" />
      )}
    </main>
  );
};

export default Index;
