/*
 * DESIGN: Party Popper → The Daily Chronicle
 * Act 2: Full-screen newspaper pages with typewriter headlines,
 * scattered product images, and fireworks on the closing page.
 * Each year is a full-viewport page with smooth crossfade transitions.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

/* ─── Typewriter Effect ─── */
function TypewriterText({ text, className = '', speed = 40, onDone }: { text: string; className?: string; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="animate-pulse text-[#D4A017]">|</span>}
    </span>
  );
}

/* ─── Fireworks Canvas ─── */
function FireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
      color: string; size: number;
      gravity: number; friction: number;
    }

    interface Rocket {
      x: number; y: number;
      vy: number; targetY: number;
      color: string; trail: { x: number; y: number }[];
      exploded: boolean;
    }

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#F7DC6F', '#BB8FCE', '#FF8C00', '#00FF7F', '#FF69B4', '#7FFF00'];

    function createRocket() {
      const x = Math.random() * canvas!.width;
      rockets.push({
        x,
        y: canvas!.height,
        vy: -(8 + Math.random() * 6),
        targetY: canvas!.height * (0.15 + Math.random() * 0.35),
        color: colors[Math.floor(Math.random() * colors.length)],
        trail: [],
        exploded: false,
      });
    }

    function explode(rocket: Rocket) {
      const count = 60 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = 2 + Math.random() * 5;
        particles.push({
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 60 + Math.random() * 40,
          color: Math.random() > 0.3 ? rocket.color : colors[Math.floor(Math.random() * colors.length)],
          size: 1.5 + Math.random() * 2.5,
          gravity: 0.03 + Math.random() * 0.02,
          friction: 0.98,
        });
      }
    }

    let animId: number;
    let frame = 0;

    function animate() {
      ctx!.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      frame++;
      if (frame % 25 === 0 || (frame < 60 && frame % 10 === 0)) {
        createRocket();
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 8) r.trail.shift();
        r.y += r.vy;
        r.vy *= 0.99;

        // Draw trail
        for (let j = 0; j < r.trail.length; j++) {
          const alpha = j / r.trail.length * 0.6;
          ctx!.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx!.fillRect(r.trail[j].x - 1, r.trail[j].y - 1, 2, 2);
        }

        if (r.y <= r.targetY && !r.exploded) {
          r.exploded = true;
          explode(r);
          rockets.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        const alpha = Math.max(0, p.life / p.maxLife);
        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = p.color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx!.fill();

        // Sparkle trail
        if (Math.random() > 0.7) {
          ctx!.globalAlpha = alpha * 0.3;
          ctx!.fillStyle = '#fff';
          ctx!.beginPath();
          ctx!.arc(p.x - p.vx * 2, p.y - p.vy * 2, p.size * 0.5, 0, Math.PI * 2);
          ctx!.fill();
        }

        if (p.life <= 0) particles.splice(i, 1);
      }

      ctx!.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 50, mixBlendMode: 'screen' }}
    />
  );
}

/* ─── Intro Page ─── */
function IntroPage() {
  return (
    <div className="newspaper-fullpage flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-20">
      {/* Ornamental top border */}
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 h-[2px] bg-[#1a1a1a]" />
          <span className="font-newspaper-body text-sm text-[#8b7750]">❧</span>
          <div className="flex-1 h-[2px] bg-[#1a1a1a]" />
        </div>
        <hr className="newspaper-rule-thin mb-3" />
      </div>

      <h1 className="font-newspaper-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#1a1a1a] leading-none py-3">
        The Daily Chronicle
      </h1>
      <p className="font-newspaper-sc text-xs sm:text-sm md:text-base tracking-[0.3em] text-[#8b7750] mt-2">
        EST. 1996 &middot; SPECIAL 30TH BIRTHDAY EDITION
      </p>

      <div className="w-full max-w-2xl mt-4">
        <hr className="newspaper-rule mb-2" />
        <div className="flex justify-between items-center font-newspaper-body text-[10px] sm:text-xs md:text-sm text-[#8b7750] italic px-2">
          <span>Price: Priceless</span>
          <span>✦ 30 Years of History ✦</span>
          <span>"All the news that's fit to celebrate"</span>
        </div>
        <hr className="newspaper-rule-thin mt-2" />
      </div>

      <div className="mt-8 sm:mt-12 max-w-xl">
        <p className="font-typewriter text-sm sm:text-base md:text-lg text-[#4a4a4a] leading-relaxed">
          From the birth of Pokémon to the birth of baby Julia, these pages chronicle
          thirty remarkable years of science, gaming, technology, and the most important
          moments of all — the personal ones.
        </p>
      </div>

      <div className="mt-8 sm:mt-12">
        <p className="font-newspaper-body text-xs sm:text-sm text-[#8b7750] italic animate-pulse">
          Press → or click the arrow to begin
        </p>
      </div>
    </div>
  );
}

/* ─── Year Page ─── */
function YearPage({ data, index, isActive }: { data: TimelineYear; index: number; isActive: boolean }) {
  const decadeLabel = getDecadeLabel(data.year);

  return (
    <div className="newspaper-fullpage overflow-y-auto px-6 sm:px-12 md:px-20 lg:px-32 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Decade divider if applicable */}
        {decadeLabel && (
          <div className="mb-6">
            <hr className="newspaper-rule-double" />
            <div className="text-center py-2">
              <span className="font-newspaper-sc text-xs sm:text-sm md:text-base tracking-[0.3em] text-[#8b7750] uppercase">
                — {decadeLabel} —
              </span>
            </div>
            <hr className="newspaper-rule-double" />
          </div>
        )}

        {/* EXTRA banner for personal milestones */}
        {data.isPersonalMilestone && (
          <div className="text-center mb-4">
            <span className="inline-block bg-[#D4A017] text-white font-newspaper-headline text-xs sm:text-sm font-bold px-4 py-1.5 tracking-widest uppercase">
              EXTRA! EXTRA!
            </span>
          </div>
        )}

        <article className={`${data.isPersonalMilestone ? 'border-2 border-[#D4A017] p-4 sm:p-6 md:p-8 bg-[#D4A017]/5' : ''}`}>
          {/* Year header */}
          <div className="flex items-baseline gap-3 mb-3">
            <span className="text-3xl sm:text-4xl md:text-5xl select-none">{data.icon}</span>
            <div className="flex-1">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span
                  className="font-newspaper-sc text-4xl sm:text-5xl md:text-7xl font-bold tracking-wide"
                  style={{ color: data.isPersonalMilestone ? '#D4A017' : '#1a1a1a' }}
                >
                  {data.year}
                </span>
                <span className="font-newspaper-body text-xs sm:text-sm text-[#8b7750] italic">
                  — Vol. {index + 1}, No. {data.year - 1995}
                </span>
              </div>
              <hr
                className="newspaper-rule mt-1"
                style={{ borderColor: data.isPersonalMilestone ? '#D4A017' : '#1a1a1a' }}
              />
            </div>
          </div>

          {/* Typewriter Headline */}
          <h3 className="font-newspaper-headline text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 text-[#1a1a1a] italic min-h-[2em]">
            {isActive ? (
              <TypewriterText text={data.headline} speed={35} />
            ) : (
              data.headline
            )}
          </h3>

          {/* Content area with optional scattered images */}
          <div className="relative">
            {/* Scattered images - floating alongside content */}
            {data.scatteredImages && data.scatteredImages.length > 0 && (
              <div className="hidden md:block">
                {data.scatteredImages.map((img, i) => (
                  <div
                    key={i}
                    className={`${img.position === 'right' ? 'float-right ml-4' : 'float-left mr-4'} mb-3 w-32 lg:w-40`}
                  >
                    <div className="border border-[#1a1a1a]/30 p-1 bg-[#e8dcc4]">
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-auto grayscale contrast-125 opacity-90"
                        loading="lazy"
                      />
                    </div>
                    <p className="font-newspaper-body text-[8px] sm:text-[9px] text-[#8b7750] italic mt-0.5 text-center">
                      {img.caption}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Personal milestone note */}
            {data.isPersonalMilestone && data.personalNote && (
              <div className="mb-4 p-4 sm:p-5 border-l-4 border-[#D4A017] bg-[#D4A017]/8">
                <p className="font-typewriter text-sm sm:text-base leading-relaxed text-[#1a1a1a]">
                  {data.personalNote}
                </p>
              </div>
            )}

            {/* Newspaper photo if available */}
            {data.image && (
              <div className="my-4 max-w-sm mx-auto md:mx-0">
                <div className="border border-[#1a1a1a]/30 p-1 bg-[#e8dcc4]">
                  <img
                    src={data.image}
                    alt={data.imageCaption || `Photo from ${data.year}`}
                    className="w-full h-auto grayscale contrast-125 opacity-90"
                    style={{ maxHeight: '220px', objectFit: 'cover' }}
                    loading="lazy"
                  />
                </div>
                {data.imageCaption && (
                  <p className="font-newspaper-body text-[9px] sm:text-[10px] text-[#8b7750] italic mt-1 text-center">
                    {data.imageCaption}
                  </p>
                )}
              </div>
            )}

            {/* Mobile scattered images - shown inline on small screens */}
            {data.scatteredImages && data.scatteredImages.length > 0 && (
              <div className="md:hidden flex gap-3 mb-4 overflow-x-auto">
                {data.scatteredImages.map((img, i) => (
                  <div key={i} className="flex-shrink-0 w-24">
                    <div className="border border-[#1a1a1a]/30 p-0.5 bg-[#e8dcc4]">
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-auto grayscale contrast-125 opacity-90"
                        loading="lazy"
                      />
                    </div>
                    <p className="font-newspaper-body text-[7px] text-[#8b7750] italic mt-0.5 text-center">
                      {img.caption}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Facts */}
            <div className="space-y-2 clear-both">
              {data.facts.map((fact, i) => (
                <p
                  key={i}
                  className="font-newspaper-body text-xs sm:text-sm md:text-base leading-relaxed text-[#2a2a2a]"
                >
                  <span className="font-bold text-[#1a1a1a] mr-1.5">&#9658;</span>
                  {fact}
                </p>
              ))}
            </div>
          </div>
        </article>

        {/* Page number at bottom */}
        <div className="mt-6 pt-4 text-center">
          <hr className="newspaper-rule-thin mb-3" />
          <span className="font-newspaper-body text-[10px] sm:text-xs text-[#8b7750]">
            — {data.year} · Page {index + 2} of {TOTAL_PAGES} —
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Closing Page ─── */
function ClosingPage({ isActive }: { isActive: boolean }) {
  return (
    <>
      {isActive && <FireworksCanvas />}
      <div className="newspaper-fullpage flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-20">
        <div className="flex items-center gap-3 mb-6 w-full max-w-lg">
          <div className="flex-1 h-[2px] bg-[#D4A017]" />
          <span className="text-[#D4A017] text-xl">✦</span>
          <div className="flex-1 h-[2px] bg-[#D4A017]" />
        </div>

        <div className="max-w-lg p-6 sm:p-8 md:p-10 border-2 border-[#D4A017] bg-gradient-to-b from-[#D4A017]/8 to-[#D4A017]/3 relative">
          {/* Corner ornaments */}
          <div className="absolute top-2 left-2 text-[#D4A017]/30 text-lg">❧</div>
          <div className="absolute top-2 right-2 text-[#D4A017]/30 text-lg rotate-180">❧</div>
          <div className="absolute bottom-2 left-2 text-[#D4A017]/30 text-lg rotate-180">❧</div>
          <div className="absolute bottom-2 right-2 text-[#D4A017]/30 text-lg">❧</div>

          <h2 className="font-newspaper-headline text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-5 italic">
            {isActive ? (
              <TypewriterText text="30 Down, Dadbert." speed={60} />
            ) : (
              "30 Down, Dadbert."
            )}
          </h2>
          <div className="w-16 h-[2px] bg-[#D4A017] mx-auto mb-5" />
          <p className="font-typewriter text-xs sm:text-sm leading-relaxed text-[#2a2a2a] mb-4">
            What a crazy last couple of years. What a ridiculous triple decade.
            From Babybert sleeping in the TJHSST hallways to forgetting your ID
            at Cornell move-in to zooming around NYC on a scooter like a maniac.
          </p>
          <p className="font-typewriter text-xs sm:text-sm leading-relaxed text-[#2a2a2a] mb-4">
            Somehow you tricked Eugenia into marrying you, brought Julia into
            the world, became a dog dad to Jasmine the diva, pivoted from burnt-out
            Deloitte consultant to tech PM (lateral move at best), and still find
            time to be hardstuck in ranked. Impressive, honestly.
          </p>
          <div className="w-8 h-[1px] bg-[#8b7750] mx-auto my-4" />
          <p className="font-typewriter text-xs sm:text-sm leading-relaxed text-[#2a2a2a] mb-4">
            I'm super proud to have you as an older brother and a figure I grew
            up learning from — even if I didn't listen to any of your nagging or
            lessons. I'm excited to continue annoying you in NYC.
          </p>
          <p className="font-typewriter text-base sm:text-lg leading-relaxed text-[#D4A017] font-bold">
            Happy 30th, Dadbert. 🎂
          </p>
          <p className="font-typewriter text-[10px] sm:text-xs text-[#8b7750] mt-2 italic">
            (Love you though. Don't tell anyone I said that.)
          </p>
        </div>

        <div className="flex items-center gap-3 mt-6 w-full max-w-lg">
          <div className="flex-1 h-[2px] bg-[#D4A017]" />
          <span className="text-[#D4A017] text-xl">✦</span>
          <div className="flex-1 h-[2px] bg-[#D4A017]" />
        </div>

        {/* Footer */}
        <div className="mt-6 font-newspaper-body text-[10px] sm:text-xs text-[#8b7750] italic space-y-1">
          <p>Published with love &middot; The Daily Chronicle &middot; Special Anniversary Edition</p>
          <p>© 1996–2026 &middot; All memories reserved</p>
          <p className="mt-3 text-sm">❧</p>
        </div>
      </div>
    </>
  );
}

/* ─── Page Flip Transition ─── */
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

/* ─── Main Component ─── */
export default function NewspaperTimeline() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const goToPage = useCallback((newPage: number) => {
    if (isAnimating) return;
    if (newPage < 0 || newPage >= TOTAL_PAGES) return;
    setIsAnimating(true);
    setDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
  }, [currentPage, isAnimating]);

  const flipNext = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const flipPrev = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

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

  // Swipe support for mobile
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx < 0) flipNext();
        else flipPrev();
      }
      touchStartRef.current = null;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [flipNext, flipPrev]);

  const progressPercent = (currentPage / (TOTAL_PAGES - 1)) * 100;
  const currentYearLabel =
    currentPage === 0
      ? 'Cover'
      : currentPage >= TOTAL_PAGES - 1
        ? 'Fin'
        : String(timelineData[Math.min(currentPage - 1, timelineData.length - 1)]?.year || '');

  const isClosingPage = currentPage === TOTAL_PAGES - 1;

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden select-none" style={{ perspective: '1500px' }}>
      {/* Paper texture background */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{ backgroundImage: `url(${NEWSPAPER_BG})`, zIndex: 0 }}
      />
      <div className="fixed inset-0 aged-paper noise-overlay pointer-events-none" style={{ zIndex: 1 }} />

      {/* Progress bar at top */}
      <div className="fixed top-0 left-0 right-0 z-40 h-1.5 bg-[#d4c5a9]">
        <motion.div
          className="h-full bg-[#D4A017]"
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Page counter */}
      <div className="fixed top-4 right-4 sm:right-8 z-40 font-newspaper-body text-xs sm:text-sm text-[#8b7750]">
        <span className="font-bold text-[#1a1a1a]">{currentYearLabel}</span>
        <span className="mx-1.5">·</span>
        <span>{currentPage + 1} / {TOTAL_PAGES}</span>
      </div>

      {/* Page content with flip animation */}
      <div className="relative z-10" style={{ transformStyle: 'preserve-3d' }}>
        <AnimatePresence
          mode="wait"
          custom={direction}
          onExitComplete={() => setIsAnimating(false)}
        >
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              rotateY: { type: "spring", stiffness: 200, damping: 30, duration: 0.5 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            style={{ transformOrigin: direction > 0 ? 'left center' : 'right center' }}
          >
            {currentPage === 0 && <IntroPage />}
            {currentPage > 0 && currentPage < TOTAL_PAGES - 1 && (
              <YearPage
                data={timelineData[currentPage - 1]}
                index={currentPage - 1}
                isActive={true}
              />
            )}
            {isClosingPage && <ClosingPage isActive={true} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      {currentPage > 0 && (
        <button
          onClick={flipPrev}
          className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-40 group focus:outline-none"
          aria-label="Previous page"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f0e4d0]/90 backdrop-blur-sm border border-[#8b7750]/30 flex items-center justify-center shadow-lg group-hover:bg-[#D4A017]/20 group-hover:border-[#D4A017]/50 transition-all duration-200 group-active:scale-90">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </button>
      )}
      {currentPage < TOTAL_PAGES - 1 && (
        <button
          onClick={flipNext}
          className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-40 group focus:outline-none"
          aria-label="Next page"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#f0e4d0]/90 backdrop-blur-sm border border-[#8b7750]/30 flex items-center justify-center shadow-lg group-hover:bg-[#D4A017]/20 group-hover:border-[#D4A017]/50 transition-all duration-200 group-active:scale-90">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#1a1a1a]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
  );
}
