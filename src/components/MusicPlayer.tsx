import { useEffect, useRef } from "react";

// Harry Potter Theme (Hedwig's Theme)
const MUSIC_URL = "https://ia801307.us.archive.org/28/items/HarryPotter-hedwigstheme/Harry_Potter_Theme_Song_Hedwigs_Theme.mp3";

export const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume
    audio.volume = 0.6;

    const playAudio = () => {
      if (audio.paused) {
        audio.play()
          .then(() => {
            // console.log("Audio playing successfully");
          })
          .catch(err => {
            console.log("Autoplay prevented (waiting for interaction):", err);
          });
      }
    };

    // Try to play immediately
    playAudio();

    // Add global listeners to capture any interaction
    const handleInteraction = () => {
      playAudio();
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={MUSIC_URL}
      loop
      autoPlay
      className="hidden"
    />
  );
};
