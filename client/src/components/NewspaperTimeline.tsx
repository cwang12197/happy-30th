/*
 * DESIGN: Party Popper → The Daily Chronicle
 * Act 2: Vintage newspaper with REALISTIC PAGE-FLIP animation using react-pageflip.
 * Each year is its own newspaper "page" that physically flips like a book.
 */

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'framer-motion';
import { timelineData, type TimelineYear } from '@/lib/timelineData';

const NEWSPAPER_BG = "https://private-us-east-1.manuscdn.com/sessionFile/sMHpuJN7nHggUQUV7RaYok/sandbox/J6v3pGaehyEQQMLK24aKor-img-2_1771723050000_na1fn_bmV3c3BhcGVyLXRleHR1cmU.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc01IcHVKTjduSGdnVVFVVjdSYVlvay9zYW5kYm94L0o2djNwR2FlaHlFUVFNTEsyNGFLb3ItaW1nLTJfMTc3MTcyMzA1MDAwMF9uYTFmbl9ibVYzYzNCaGNHVnlMWFJsZUhSMWNtVS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rq5hto~lwLp9MKB6MB85TdGiDySY7I7ciGTcoYG-6S3mhDeJRdTmpoLfxgvDbya-nVos8cyVDr5Y6A0MWqYlO-srnHXRpLzVosZeb3OnAerbG96TYlzey8TUYhA~r4lLCILl~mqz0usVIGz3Ohf9mFk5cd1mAMoc~-i~opsVg9h79FdtTstYPZPWd4-nJqggRrUxqG~F~HtmlfEsO~0pJF5IS~FjkB0hRg7daEVVuN6XQ3bjFGdw2idL0SzSkpFFAwUclMeeXXb0-c45RSAeGUHRDCZSI0hqAJCt7EyXc~0Kuon-Xp0XL6AZN5G~b0s9kYgawNgF5i-CLGo4bYvX2Q__";

const TOTAL_PAGES = timelineData.length + 2; // intro + years + closing

/* ─── Decade label helper ─── */
function getDecadeLabel(year: number): string | null {
  if (year === 1996) return "THE LATE NINETIES";
  if (year === 2000) return "THE TWO-THOUSANDS";
  if (year === 2010) return "THE TWENTY-TENS";
  if (year === 2020) return "THE ROARING TWENTIES";
  return null;
}

/* ─── Page wrapper (react-pageflip requires forwardRef) ─── */
const PageWrapper = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = '' }, ref) => (
    <div ref={ref} className={`page-wrapper ${className}`}>
      {children}
    </div>
  )
);
PageWrapper.displayName = 'PageWrapper';

/* ─── Intro Page ─── */
const IntroPage = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="page-wrapper">
    <div className="page-inner flex flex-col items-center justify-center h-full text-center px-6 sm:px-10">
      {/* Ornamental top border */}
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-[2px] bg-[#1a1a1a]" />
          <span className="font-newspaper-body text-xs text-[#8b7750]">❧</span>
          <div className="flex-1 h-[2px] bg-[#1a1a1a]" />
        </div>
        <hr className="newspaper-rule-thin mb-2" />
      </div>

      <h1 className="font-newspaper-display text-4xl sm:text-5xl md:text-7xl text-[#1a1a1a] leading-none py-2">
        The Daily Chronicle
      </h1>
      <p className="font-newspaper-sc text-[10px] sm:text-xs md:text-sm tracking-[0.25em] text-[#8b7750] mt-1">
        EST. 1996 &middot; SPECIAL 30TH BIRTHDAY EDITION
      </p>

      <div className="w-full max-w-md mt-3">
        <hr className="newspaper-rule mb-1" />
        <div className="flex justify-between items-center font-newspaper-body text-[9px] sm:text-xs text-[#8b7750] italic px-1">
          <span>Price: Priceless</span>
          <span>✦ 30 Years of History ✦</span>
          <span>"All the news that's fit to celebrate"</span>
        </div>
        <hr className="newspaper-rule-thin mt-1" />
      </div>

      <div className="mt-6 sm:mt-10 max-w-sm">
        <p className="font-typewriter text-xs sm:text-sm md:text-base text-[#4a4a4a] leading-relaxed">
          From the birth of Pokémon to the birth of baby Julia, these pages chronicle
          thirty remarkable years of science, gaming, technology, and the most important
          moments of all — the personal ones.
        </p>
      </div>

      <div className="mt-6 sm:mt-10">
        <p className="font-newspaper-body text-[10px] sm:text-xs text-[#8b7750] italic animate-pulse">
          Turn the page to begin →
        </p>
      </div>
    </div>
  </div>
));
IntroPage.displayName = 'IntroPage';

/* ─── Year Page ─── */
const YearPage = forwardRef<HTMLDivElement, { data: TimelineYear; index: number }>(
  ({ data, index }, ref) => {
    const decadeLabel = getDecadeLabel(data.year);

    return (
      <div ref={ref} className="page-wrapper">
        <div className="page-inner overflow-y-auto px-5 sm:px-8 py-6 sm:py-8 h-full">
          {/* Decade divider if applicable */}
          {decadeLabel && (
            <div className="mb-4 sm:mb-6">
              <hr className="newspaper-rule-double" />
              <div className="text-center py-1">
                <span className="font-newspaper-sc text-[10px] sm:text-sm tracking-[0.3em] text-[#8b7750] uppercase">
                  — {decadeLabel} —
                </span>
              </div>
              <hr className="newspaper-rule-double" />
            </div>
          )}

          {/* EXTRA banner for personal milestones */}
          {data.isPersonalMilestone && (
            <div className="text-center mb-3">
              <span className="inline-block bg-[#D4A017] text-white font-newspaper-headline text-[10px] sm:text-xs font-bold px-3 py-1 tracking-widest uppercase">
                EXTRA! EXTRA!
              </span>
            </div>
          )}

          <article className={`${data.isPersonalMilestone ? 'border-2 border-[#D4A017] p-3 sm:p-5 bg-[#D4A017]/5' : ''}`}>
            {/* Year header */}
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl sm:text-3xl select-none">{data.icon}</span>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span
                    className="font-newspaper-sc text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide"
                    style={{ color: data.isPersonalMilestone ? '#D4A017' : '#1a1a1a' }}
                  >
                    {data.year}
                  </span>
                  <span className="font-newspaper-body text-[9px] sm:text-xs text-[#8b7750] italic">
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
            <h3 className="font-newspaper-headline text-lg sm:text-xl md:text-2xl font-bold leading-tight mb-3 text-[#1a1a1a] italic">
              {data.headline}
            </h3>

            {/* Personal milestone note */}
            {data.isPersonalMilestone && data.personalNote && (
              <div className="mb-3 p-3 sm:p-4 border-l-4 border-[#D4A017] bg-[#D4A017]/8">
                <p className="font-typewriter text-xs sm:text-sm leading-relaxed text-[#1a1a1a]">
                  {data.personalNote}
                </p>
              </div>
            )}

            {/* Newspaper photo if available */}
            {data.image && (
              <div className="my-3">
                <div className="border border-[#1a1a1a]/30 p-1 bg-[#e8dcc4]">
                  <img
                    src={data.image}
                    alt={data.imageCaption || `Photo from ${data.year}`}
                    className="w-full h-auto grayscale contrast-125 opacity-90"
                    style={{ maxHeight: '180px', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
                {data.imageCaption && (
                  <p className="font-newspaper-body text-[8px] sm:text-[10px] text-[#8b7750] italic mt-1 text-center">
                    {data.imageCaption}
                  </p>
                )}
              </div>
            )}

            {/* Facts */}
            <div className="space-y-1.5">
              {data.facts.map((fact, i) => (
                <p
                  key={i}
                  className="font-newspaper-body text-[11px] sm:text-xs md:text-sm leading-relaxed text-[#2a2a2a]"
                >
                  <span className="font-bold text-[#1a1a1a] mr-1">&#9658;</span>
                  {fact}
                </p>
              ))}
            </div>
          </article>

          {/* Page number at bottom */}
          <div className="mt-auto pt-4 text-center">
            <hr className="newspaper-rule-thin mb-2" />
            <span className="font-newspaper-body text-[9px] text-[#8b7750]">
              — {data.year} · Page {index + 2} of {TOTAL_PAGES} —
            </span>
          </div>
        </div>
      </div>
    );
  }
);
YearPage.displayName = 'YearPage';

/* ─── Closing Page ─── */
const ClosingPage = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} className="page-wrapper">
    <div className="page-inner flex flex-col items-center justify-center h-full text-center px-5 sm:px-8 py-6">
      <div className="flex items-center gap-2 mb-4 w-full max-w-sm">
        <div className="flex-1 h-[2px] bg-[#D4A017]" />
        <span className="text-[#D4A017] text-lg">✦</span>
        <div className="flex-1 h-[2px] bg-[#D4A017]" />
      </div>

      <div className="max-w-sm p-4 sm:p-6 border-2 border-[#D4A017] bg-gradient-to-b from-[#D4A017]/8 to-[#D4A017]/3 relative">
        {/* Corner ornaments */}
        <div className="absolute top-1 left-1 text-[#D4A017]/30 text-sm">❧</div>
        <div className="absolute top-1 right-1 text-[#D4A017]/30 text-sm rotate-180">❧</div>
        <div className="absolute bottom-1 left-1 text-[#D4A017]/30 text-sm rotate-180">❧</div>
        <div className="absolute bottom-1 right-1 text-[#D4A017]/30 text-sm">❧</div>

        <h2 className="font-newspaper-headline text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-4 italic">
          30 Down, Dadbert.
        </h2>
        <div className="w-12 h-[2px] bg-[#D4A017] mx-auto mb-4" />
        <p className="font-typewriter text-[11px] sm:text-xs leading-relaxed text-[#2a2a2a] mb-3">
          What a crazy last couple of years. What a ridiculous triple decade.
          From Babybert sleeping in the TJHSST hallways to forgetting your ID
          at Cornell move-in to zooming around NYC on a scooter like a maniac.
        </p>
        <p className="font-typewriter text-[11px] sm:text-xs leading-relaxed text-[#2a2a2a] mb-3">
          Somehow you tricked Eugenia into marrying you, brought Julia into
          the world, became a dog dad to Jasmine the diva, pivoted from burnt-out
          Deloitte consultant to tech PM (lateral move at best), and still find
          time to be hardstuck in ranked. Impressive, honestly.
        </p>
        <div className="w-6 h-[1px] bg-[#8b7750] mx-auto my-3" />
        <p className="font-typewriter text-[11px] sm:text-xs leading-relaxed text-[#2a2a2a] mb-3">
          I'm super proud to have you as an older brother and a figure I grew
          up learning from — even if I didn't listen to any of your nagging or
          lessons. I'm excited to continue annoying you in NYC.
        </p>
        <p className="font-typewriter text-sm sm:text-base leading-relaxed text-[#D4A017] font-bold">
          Happy 30th, Dadbert. 🎂
        </p>
        <p className="font-typewriter text-[10px] text-[#8b7750] mt-1 italic">
          (Love you though. Don't tell anyone I said that.)
        </p>
      </div>

      <div className="flex items-center gap-2 mt-4 w-full max-w-sm">
        <div className="flex-1 h-[2px] bg-[#D4A017]" />
        <span className="text-[#D4A017] text-lg">✦</span>
        <div className="flex-1 h-[2px] bg-[#D4A017]" />
      </div>

      {/* Footer */}
      <div className="mt-4 font-newspaper-body text-[9px] text-[#8b7750] italic space-y-0.5">
        <p>Published with love &middot; The Daily Chronicle &middot; Special Anniversary Edition</p>
        <p>© 1996–2026 &middot; All memories reserved</p>
        <p className="mt-2 text-[8px]">❧</p>
      </div>
    </div>
  </div>
));
ClosingPage.displayName = 'ClosingPage';

/* ─── Main Component ─── */
export default function NewspaperTimeline() {
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef<any>(null);
  const [bookDimensions, setBookDimensions] = useState({ width: 550, height: 700 });

  // Calculate responsive book dimensions
  useEffect(() => {
    const updateDimensions = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let width: number;
      let height: number;

      if (vw < 640) {
        // Mobile
        width = Math.min(vw - 32, 380);
        height = Math.min(vh - 120, 580);
      } else if (vw < 1024) {
        // Tablet
        width = Math.min(vw - 80, 500);
        height = Math.min(vh - 100, 680);
      } else {
        // Desktop
        width = Math.min(vw * 0.4, 580);
        height = Math.min(vh - 100, 750);
      }

      // Ensure minimum aspect ratio (roughly 3:4)
      if (height / width < 1.1) {
        height = width * 1.3;
      }

      setBookDimensions({ width: Math.round(width), height: Math.round(height) });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const onFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  const flipNext = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext();
  }, []);

  const flipPrev = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        flipNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        flipPrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [flipNext, flipPrev]);

  const progressPercent = (currentPage / (TOTAL_PAGES - 1)) * 100;
  const currentYearLabel =
    currentPage === 0
      ? 'Cover'
      : currentPage >= TOTAL_PAGES - 1
        ? 'Fin'
        : String(timelineData[Math.min(currentPage - 1, timelineData.length - 1)]?.year || '');

  return (
    <div className="relative min-h-screen overflow-hidden select-none">
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
        <div className="fixed top-3 right-4 sm:right-16 z-40 font-newspaper-body text-xs text-[#8b7750]">
          <span className="font-bold text-[#1a1a1a]">{currentYearLabel}</span>
          <span className="mx-1">·</span>
          <span>{currentPage + 1} / {TOTAL_PAGES}</span>
        </div>

        {/* Book container */}
        <div className="relative z-10 flex items-center justify-center" style={{ minHeight: '100vh' }}>
          <div className="flipbook-container" style={{ perspective: '2500px' }}>
            {/* @ts-ignore - react-pageflip types are incomplete */}
            <HTMLFlipBook
              ref={bookRef}
              width={bookDimensions.width}
              height={bookDimensions.height}
              size="fixed"
              minWidth={300}
              maxWidth={600}
              minHeight={450}
              maxHeight={800}
              drawShadow={true}
              flippingTime={800}
              usePortrait={true}
              startZIndex={0}
              autoSize={true}
              maxShadowOpacity={0.5}
              showCover={true}
              mobileScrollSupport={false}
              onFlip={onFlip}
              className="newspaper-flipbook"
              style={{}}
              startPage={0}
              clickEventForward={true}
              useMouseEvents={true}
              swipeDistance={30}
              showPageCorners={true}
              disableFlipByClick={false}
            >
              {/* Cover / Intro page */}
              <IntroPage />

              {/* Year pages */}
              {timelineData.map((yearData, index) => (
                <YearPage key={yearData.year} data={yearData} index={index} />
              ))}

              {/* Closing page */}
              <ClosingPage />
            </HTMLFlipBook>
          </div>
        </div>

        {/* Navigation arrows */}
        {currentPage > 0 && (
          <button
            onClick={flipPrev}
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
            onClick={flipNext}
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
          <span className="hidden sm:inline">← → arrow keys · drag page corner · click arrows</span>
          <span className="sm:hidden">swipe page or tap arrows</span>
        </div>
      </div>
    </div>
  );
}
