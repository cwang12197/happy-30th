/*
 * DESIGN: Party Popper → The Daily Chronicle
 * Main page orchestrating the two-act experience:
 * Act 1: Colorful birthday splash (BirthdaySplash)
 * Act 2: Vintage newspaper timeline (NewspaperTimeline)
 * Transition: Dramatic fold-away with "Extra! Extra!" interstitial
 */

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BirthdaySplash from '@/components/BirthdaySplash';
import NewspaperTimeline from '@/components/NewspaperTimeline';
import Confetti from '@/components/Confetti';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
  const [phase, setPhase] = useState<'splash' | 'transitioning' | 'timeline'>('splash');

  const handleTransition = useCallback(() => {
    setPhase('transitioning');

    // Show the interstitial, then reveal the timeline
    setTimeout(() => {
      setPhase('timeline');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 1800);
  }, []);

  const handleBackToParty = useCallback(() => {
    setPhase('splash');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen">
      {/* Confetti canvas overlay - only on splash */}
      <Confetti active={phase === 'splash'} />

      {/* Background music - plays on splash page */}
      <MusicPlayer active={phase === 'splash'} />

      <AnimatePresence mode="wait">
        {phase === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BirthdaySplash onTransition={handleTransition} />
          </motion.div>
        )}

        {phase === 'transitioning' && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex items-center justify-center"
            style={{ backgroundColor: '#f0e4d0' }}
          >
            {/* Aged paper texture overlay */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(139,119,80,0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(139,119,80,0.2) 0%, transparent 60%)'
              }}
            />
            <div className="text-center relative z-10">
              <motion.div
                initial={{ scale: 2, opacity: 0, rotate: -5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
              >
                <p className="font-newspaper-display text-4xl sm:text-6xl md:text-7xl text-[#1a1a1a] mb-3">
                  Extra! Extra!
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="font-typewriter text-sm sm:text-base text-[#8b7750]">
                  Unfolding 30 years of history...
                </p>
                <motion.div
                  className="mt-4 flex justify-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#D4A017]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {phase === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Back to party button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              onClick={handleBackToParty}
              className="fixed top-4 left-4 z-50 bg-[#D4A017] hover:bg-[#c4910f] text-[#1a1a1a] font-newspaper-headline font-bold text-xs sm:text-sm px-3 sm:px-4 py-2 shadow-lg transition-colors duration-200"
              style={{ borderRadius: '2px' }}
            >
              ← Back to Party
            </motion.button>

            <NewspaperTimeline />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
