import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

// Using a royalty-free magical/fantasy music URL
// You can replace this with your own Harry Potter theme music URL
const MUSIC_URL = "https://assets.mixkit.co/music/preview/mixkit-fantasy-game-adventure-presentation-668.mp3";

export const MusicPlayer = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else if (hasInteracted) {
        audioRef.current.play().catch(() => {
          // Autoplay was prevented
          setIsMuted(true);
        });
      }
    }
  }, [isMuted, hasInteracted]);

  const toggleMute = () => {
    setHasInteracted(true);
    setIsMuted(!isMuted);
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-background/80 backdrop-blur-sm border border-primary/30 text-primary hover:bg-primary/20 transition-all duration-300 hover:scale-110 group"
      aria-label={isMuted ? "Unmute music" : "Mute music"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 group-hover:animate-pulse" />
      ) : (
        <Volume2 className="w-5 h-5 animate-pulse" />
      )}
      
      {/* Hint text */}
      <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap text-xs text-foreground/60 font-elegant tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
        {isMuted ? "Play Music" : "Mute"}
      </span>
    </button>
  );
};
