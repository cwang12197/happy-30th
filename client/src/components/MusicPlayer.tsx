/*
 * DESIGN: Floating music toggle button
 * Style: Small, unobtrusive pill button in the corner
 * Colors: Golden yellow (#D4A017) to match the party theme
 * Behavior: Auto-plays on first user interaction, toggleable mute
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MUSIC_URL = 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663336994935/IFJgfOLKcPPJkedB.wav';

interface MusicPlayerProps {
  active: boolean;
}

export default function MusicPlayer({ active }: MusicPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = 'auto';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Auto-play on first user click anywhere on the page
  useEffect(() => {
    if (hasInteracted) return;

    const handleFirstInteraction = () => {
      setHasInteracted(true);
      if (audioRef.current && active && !isMuted) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Browser blocked autoplay, user can click the button
        });
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted, active, isMuted]);

  // Handle active state changes (pause when leaving splash)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (active && !isMuted && hasInteracted) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else if (!active) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [active, isMuted, hasInteracted]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      // Unmute
      setIsMuted(false);
      if (active) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    } else {
      // Mute
      setIsMuted(true);
      audio.pause();
      setIsPlaying(false);
    }
  }, [isMuted, active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ delay: 1, duration: 0.3 }}
          onClick={toggleMute}
          className="fixed top-4 right-4 z-[55] flex items-center gap-2 px-3 py-2 rounded-full shadow-lg backdrop-blur-sm transition-colors duration-200"
          style={{
            backgroundColor: isMuted ? 'rgba(0,0,0,0.4)' : 'rgba(212,160,23,0.9)',
            color: isMuted ? '#fff' : '#1a1a1a',
          }}
          title={isMuted ? 'Unmute music' : 'Mute music'}
          aria-label={isMuted ? 'Unmute birthday music' : 'Mute birthday music'}
        >
          {/* Speaker icon */}
          {isMuted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}

          {/* Animated music notes when playing */}
          {isPlaying && !isMuted && (
            <span className="flex gap-0.5">
              {[0, 1, 2].map(i => (
                <motion.span
                  key={i}
                  className="inline-block w-0.5 bg-[#1a1a1a] rounded-full"
                  animate={{ height: ['4px', '12px', '4px'] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </span>
          )}

          <span className="text-xs font-bold font-quicksand">
            {isMuted ? 'Play' : 'Music'}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
