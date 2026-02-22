/*
 * DESIGN: Party Popper → The Daily Chronicle
 * Act 2: Vintage newspaper with PAGE-FLIP animation.
 * Each year is its own newspaper "page" that flips like a broadsheet.
 * Navigation via arrows / swipe / keyboard.
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineData, type TimelineYear } from '@/lib/timelineData';

const NEWSPAPER_BG = "https://private-us-east-1.manuscdn.com/sessionFile/sMHpuJN7nHggUQUV7RaYok/sandbox/J6v3pGaehyEQQMLK24aKor-img-2_1771723050000_na1fn_bmV3c3BhcGVyLXRleHR1cmU.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc01IcHVKTjduSGdnVVFVVjdSYVlvay9zYW5kYm94L0o2djNwR2FlaHlFUVFNTEsyNGFLb3ItaW1nLTJfMTc3MTcyMzA1MDAwMF9uYTFmbl9ibVYzYzNCaGNHVnlMWFJsZUhSMWNtVS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rq5hto~lwLp9MKB6MB85TdGiDySY7I7ciGTcoYG-6S3mhDeJRdTmpoLfxgvDbya-nVos8cyVDr5Y6A0MWqYlO-srnHXRpLzVosZeb3OnAerbG96TYlzey8TUYhA~r4lLCILl~mqz0usVIGz3Ohf9mFk5cd1mAMoc~-i~opsVg9h79FdtTstYPZPWd4-nJqggRrUxqG~F~HtmlfEsO~0pJF5IS~FjkB0hRg7daEVVuN6XQ3bjFGdw2idL0SzSkpFFAwUclMeeXXb0-c45RSAeGUHRDCZSI0hqAJCt7EyXc~0Kuon-Xp0XL6AZN5G~b0s9kYgawNgF5i-CLGo4bYvX2Q__";

// Total pages: intro (0) + 31 years (1-31) + closing (32)
const TOTAL_PAGES = timelineData.length + 2; // intro + years + closing

// Page flip variants
const pageVariants = {
  enter: (direction: number) => ({
    rotateY: direction > 0 ? 90 : -90,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    rotateY: direction > 0 ? -90 : 90,
    opacity: 0,
    scale: 0.95,
  }),
};

const pageTransition = {
  type: "tween" as const,
  duration: 0.5,
  ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
};

/* ─── Decade label helper ─── */
function getDecadeLabel(year: number): string | null {
  if (year === 1996) return "THE LATE NINETIES";
  if (year === 2000) return "THE TWO-THOUSANDS";
  if (year === 2010) return "THE TWENTY-TENS";
  if (year === 2020) return "THE ROARING TWENTIES";
  return null;
}

/* ─── Single Year Page ─── */
function YearPage({ data, index }: { data: TimelineYear; index: number }) {
  const decadeLabel = getDecadeLabel(data.year);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-8">
      {/* Decade divider if applicable */}
      {decadeLabel && (
        <div className="mb-6 sm:mb-8">
          <hr className="newspaper-rule-double" />
          <div className="text-center py-2">
            <span className="font-newspaper-sc text-sm sm:text-lg tracking-[0.3em] text-[#8b7750] uppercase">
              — {decadeLabel} —
            </span>
          </div>
          <hr className="newspaper-rule-double" />
        </div>
      )}

      <article className={`${data.isPersonalMilestone ? 'milestone-gold p-5 sm:p-7' : ''}`}>
        {/* Year header */}
        <div className="flex items-baseline gap-3 mb-3">
          <span className="text-3xl sm:text-5xl select-none">{data.icon}</span>
          <div className="flex-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span
                className="font-newspaper-sc text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide"
                style={{ color: data.isPersonalMilestone ? '#D4A017' : '#1a1a1a' }}
              >
                {data.year}
              </span>
              <span className="font-newspaper-body text-xs sm:text-sm text-[#8b7750] italic">
                — Vol. {index + 1}, No. {data.year - 1995}
              </span>
            </div>
            <hr
              className="newspaper-rule"
              style={{ borderColor: data.isPersonalMilestone ? '#D4A017' : '#1a1a1a' }}
            />
          </div>
        </div>

        {/* Headline */}
        <h3
          className="font-newspaper-headline text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 text-[#1a1a1a] italic"
        >
          {data.headline}
        </h3>

        {/* Personal milestone note */}
        {data.isPersonalMilestone && data.personalNote && (
          <div className="mb-5 p-4 sm:p-5 border-l-4 border-[#D4A017] bg-[#D4A017]/8">
            <p className="font-typewriter text-sm sm:text-base md:text-lg leading-relaxed text-[#1a1a1a]">
              {data.personalNote}
            </p>
          </div>
        )}

        {/* Newspaper photo if available */}
        {data.image && (
          <div className="my-4 sm:my-5">
            <div className="border border-[#1a1a1a]/30 p-1 bg-[#e8dcc4]">
              <img
                src={data.image}
                alt={data.imageCaption || `Photo from ${data.year}`}
                className="w-full h-auto grayscale contrast-125 opacity-90"
                style={{ maxHeight: '280px', objectFit: 'cover' }}
              />
            </div>
            {data.imageCaption && (
              <p className="font-newspaper-body text-[10px] sm:text-xs text-[#8b7750] italic mt-1 text-center">
                {data.imageCaption}
              </p>
            )}
          </div>
        )}

        {/* Facts */}
        <div className={`${!data.isPersonalMilestone && data.facts.length > 3 ? 'newspaper-columns' : ''}`}>
          {data.facts.map((fact, i) => (
            <p
              key={i}
              className="font-newspaper-body text-sm sm:text-base leading-relaxed text-[#2a2a2a] mb-2.5 break-inside-avoid"
            >
              <span className="font-bold text-[#1a1a1a] mr-1">&#9658;</span>
              {fact}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}

/* ─── Intro Page ─── */
function IntroPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-8 text-center">
      {/* Ornamental top border */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-[2px] bg-[#1a1a1a]" />
        <span className="font-newspaper-body text-xs text-[#8b7750]">❧</span>
        <div className="flex-1 h-[2px] bg-[#1a1a1a]" />
      </div>
      <hr className="newspaper-rule-thin mb-2" />

      <h1 className="font-newspaper-display text-5xl sm:text-6xl md:text-8xl text-[#1a1a1a] leading-none py-2">
        The Daily Chronicle
      </h1>
      <p className="font-newspaper-sc text-xs sm:text-sm md:text-base tracking-[0.25em] text-[#8b7750] mt-1">
        EST. 1996 &middot; SPECIAL 30TH BIRTHDAY EDITION
      </p>

      <hr className="newspaper-rule mt-3 mb-1" />
      <div className="flex justify-between items-center font-newspaper-body text-[10px] sm:text-xs text-[#8b7750] italic px-1 sm:px-2">
        <span>Price: Priceless</span>
        <span className="hidden sm:inline">✦ 30 Years of History ✦</span>
        <span className="sm:hidden">30 Years</span>
        <span className="hidden sm:inline">"All the news that's fit to celebrate"</span>
        <span className="sm:hidden">Celebrate!</span>
      </div>
      <hr className="newspaper-rule-thin mt-1" />
      <div className="flex items-center gap-2 mt-2">
        <div className="flex-1 h-[1px] bg-[#1a1a1a]/30" />
        <span className="font-newspaper-body text-xs text-[#8b7750]">❧</span>
        <div className="flex-1 h-[1px] bg-[#1a1a1a]/30" />
      </div>

      <div className="mt-8 sm:mt-12">
        <p className="font-typewriter text-sm sm:text-base md:text-lg text-[#4a4a4a] max-w-2xl mx-auto leading-relaxed">
          From the birth of Pokémon to the birth of baby Julia, these pages chronicle
          thirty remarkable years of science, gaming, technology, and the most important
          moments of all — the personal ones.
        </p>
      </div>

      <div className="mt-10 sm:mt-14">
        <p className="font-newspaper-body text-xs sm:text-sm text-[#8b7750] italic animate-pulse">
          Turn the page to begin →
        </p>
      </div>
    </div>
  );
}

/* ─── Closing Page ─── */
function ClosingPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-8 text-center">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-[2px] bg-[#D4A017]" />
        <span className="text-[#D4A017] text-xl">✦</span>
        <div className="flex-1 h-[2px] bg-[#D4A017]" />
      </div>

      <div className="max-w-2xl mx-auto p-6 sm:p-10 border-2 border-[#D4A017] bg-gradient-to-b from-[#D4A017]/8 to-[#D4A017]/3 relative">
        {/* Corner ornaments */}
        <div className="absolute top-2 left-2 text-[#D4A017]/30 text-lg">❧</div>
        <div className="absolute top-2 right-2 text-[#D4A017]/30 text-lg rotate-180">❧</div>
        <div className="absolute bottom-2 left-2 text-[#D4A017]/30 text-lg rotate-180">❧</div>
        <div className="absolute bottom-2 right-2 text-[#D4A017]/30 text-lg">❧</div>

        <h2 className="font-newspaper-headline text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-5 italic">
          30 Down, Dadbert.
        </h2>
        <div className="w-16 h-[2px] bg-[#D4A017] mx-auto mb-5" />
        <p className="font-typewriter text-sm sm:text-base leading-relaxed text-[#2a2a2a] mb-4">
          What a crazy last couple of years. What a ridiculous triple decade.
          From Babybert sleeping in the TJHSST hallways to forgetting your ID
          at Cornell move-in to zooming around NYC on a scooter like a maniac.
        </p>
        <p className="font-typewriter text-sm sm:text-base leading-relaxed text-[#2a2a2a] mb-4">
          Somehow you tricked Eugenia into marrying you, brought Julia into
          the world, became a dog dad to Jasmine the diva, pivoted from burnt-out
          Deloitte consultant to tech PM (lateral move at best), and still find
          time to be hardstuck in ranked. Impressive, honestly.
        </p>
        <div className="w-8 h-[1px] bg-[#8b7750] mx-auto my-5" />
        <p className="font-typewriter text-sm sm:text-base leading-relaxed text-[#2a2a2a] mb-4">
          I'm super proud to have you as an older brother and a figure I grew
          up learning from — even if I didn't listen to any of your nagging or
          lessons. I'm excited to continue annoying you in NYC.
        </p>
        <p className="font-typewriter text-base sm:text-lg md:text-xl leading-relaxed text-[#D4A017] font-bold">
          Happy 30th, Dadbert. 🎂
        </p>
        <p className="font-typewriter text-xs text-[#8b7750] mt-2 italic">
          (Love you though. Don't tell anyone I said that.)
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <div className="flex-1 h-[2px] bg-[#D4A017]" />
        <span className="text-[#D4A017] text-xl">✦</span>
        <div className="flex-1 h-[2px] bg-[#D4A017]" />
      </div>

      {/* Footer */}
      <div className="mt-8 font-newspaper-body text-xs text-[#8b7750] italic space-y-1">
        <p>Published with love &middot; The Daily Chronicle &middot; Special Anniversary Edition</p>
        <p>© 1996–2026 &middot; All memories reserved</p>
        <p className="mt-3 text-[10px]">❧</p>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function NewspaperTimeline() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage < 0 || newPage >= TOTAL_PAGES) return;
      setDirection(newPage > currentPage ? 1 : -1);
      setCurrentPage(newPage);
    },
    [currentPage]
  );

  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevPage();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextPage, prevPage]);

  // Touch / swipe navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      // Only trigger if horizontal swipe is dominant and > 50px
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) nextPage();
        else prevPage();
      }
    };

    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', handleTouchStart);
      el.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextPage, prevPage]);

  // Determine what to render for the current page
  const renderPage = () => {
    if (currentPage === 0) return <IntroPage />;
    if (currentPage === TOTAL_PAGES - 1) return <ClosingPage />;
    const yearIndex = currentPage - 1;
    const data = timelineData[yearIndex];
    return <YearPage data={data} index={yearIndex} />;
  };

  // Progress info
  const progressPercent = (currentPage / (TOTAL_PAGES - 1)) * 100;
  const currentYearLabel =
    currentPage === 0
      ? 'Cover'
      : currentPage === TOTAL_PAGES - 1
        ? 'Fin'
        : String(timelineData[currentPage - 1].year);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden select-none"
    >
      {/* Paper texture background */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-25 pointer-events-none"
        style={{ backgroundImage: `url(${NEWSPAPER_BG})`, zIndex: 0 }}
      />
      <div className="aged-paper noise-overlay relative" style={{ minHeight: '100vh' }}>
        {/* Progress bar at top */}
        <div className="fixed top-0 left-0 right-0 z-40 h-1 bg-[#d4c5a9]">
          <motion.div
            className="h-full bg-[#D4A017]"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Page counter */}
        <div className="fixed top-3 right-16 z-40 font-newspaper-body text-xs text-[#8b7750]">
          <span className="font-bold text-[#1a1a1a]">{currentYearLabel}</span>
          <span className="mx-1">·</span>
          <span>{currentPage + 1} / {TOTAL_PAGES}</span>
        </div>

        {/* Page content with flip animation */}
        <div
          className="relative z-10 flex items-center justify-center"
          style={{ minHeight: '100vh', perspective: '1200px' }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              className="w-full py-14 sm:py-20"
              style={{ transformOrigin: 'center center', backfaceVisibility: 'hidden' }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        {currentPage > 0 && (
          <button
            onClick={prevPage}
            className="fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 group focus:outline-none"
            aria-label="Previous page"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f0e4d0]/80 backdrop-blur-sm border border-[#8b7750]/30 flex items-center justify-center shadow-lg group-hover:bg-[#D4A017]/20 group-hover:border-[#D4A017]/50 transition-all duration-200">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>
        )}
        {currentPage < TOTAL_PAGES - 1 && (
          <button
            onClick={nextPage}
            className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 group focus:outline-none"
            aria-label="Next page"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#f0e4d0]/80 backdrop-blur-sm border border-[#8b7750]/30 flex items-center justify-center shadow-lg group-hover:bg-[#D4A017]/20 group-hover:border-[#D4A017]/50 transition-all duration-200">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}

        {/* Bottom navigation hint */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 font-newspaper-body text-[10px] sm:text-xs text-[#8b7750]/60 text-center">
          <span className="hidden sm:inline">← → arrow keys · swipe · click arrows</span>
          <span className="sm:hidden">swipe or tap arrows</span>
        </div>
      </div>
    </div>
  );
}
