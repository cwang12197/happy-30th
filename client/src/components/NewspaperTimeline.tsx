/*
 * DESIGN: Party Popper → The Daily Chronicle
 * Act 2: Full-screen newspaper with react-pageflip for realistic page-curl animation.
 * Typewriter headlines, scattered product images, fireworks on closing page.
 */

import React, { useCallback, useEffect, useRef, useState, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
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
        x, y: canvas!.height,
        vy: -(8 + Math.random() * 6),
        targetY: canvas!.height * (0.15 + Math.random() * 0.35),
        color: colors[Math.floor(Math.random() * colors.length)],
        trail: [], exploded: false,
      });
    }

    function explode(rocket: Rocket) {
      const count = 60 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.3;
        const speed = 2 + Math.random() * 5;
        particles.push({
          x: rocket.x, y: rocket.y,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
          life: 1, maxLife: 60 + Math.random() * 40,
          color: Math.random() > 0.3 ? rocket.color : colors[Math.floor(Math.random() * colors.length)],
          size: 1.5 + Math.random() * 2.5,
          gravity: 0.03 + Math.random() * 0.02, friction: 0.98,
        });
      }
    }

    let animId: number;
    let frame = 0;

    function animate() {
      ctx!.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);
      frame++;
      if (frame % 25 === 0 || (frame < 60 && frame % 10 === 0)) createRocket();

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 8) r.trail.shift();
        r.y += r.vy;
        r.vy *= 0.99;
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

    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', handleResize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 50, mixBlendMode: 'screen' }}
    />
  );
}

/* ─── Page wrapper (required by react-pageflip: must be forwardRef) ─── */
const PageWrapper = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className = '' }, ref) => (
    <div ref={ref} className={`page-wrapper-flip ${className}`} style={{
      backgroundColor: '#f0e4d0',
      backgroundImage: 'radial-gradient(ellipse at 20% 30%, rgba(139,119,80,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(139,119,80,0.06) 0%, transparent 50%)',
      boxShadow: 'inset 0 0 40px rgba(139,119,80,0.15)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Aged edge effect */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: 'linear-gradient(to right, rgba(139,119,80,0.12) 0%, transparent 3%, transparent 97%, rgba(139,119,80,0.12) 100%), linear-gradient(to bottom, rgba(139,119,80,0.08) 0%, transparent 3%, transparent 97%, rgba(139,119,80,0.08) 100%)',
      }} />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', boxSizing: 'border-box', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  )
);
PageWrapper.displayName = 'PageWrapper';

/* ─── Intro Page Content ─── */
function IntroContent() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 sm:px-12 md:px-16 h-full">
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

/* ─── Year Page Content ─── */
function YearContent({ data, index, isActive }: { data: TimelineYear; index: number; isActive: boolean }) {
  const decadeLabel = getDecadeLabel(data.year);

  return (
    <div className="px-6 sm:px-10 md:px-16 lg:px-20 py-6 sm:py-8 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {decadeLabel && (
          <div className="mb-4">
            <hr className="newspaper-rule-double" />
            <div className="text-center py-1.5">
              <span className="font-newspaper-sc text-xs sm:text-sm tracking-[0.3em] text-[#8b7750] uppercase">
                — {decadeLabel} —
              </span>
            </div>
            <hr className="newspaper-rule-double" />
          </div>
        )}

        {data.isPersonalMilestone && (
          <div className="text-center mb-3">
            <span className="inline-block bg-[#D4A017] text-white font-newspaper-headline text-xs sm:text-sm font-bold px-4 py-1.5 tracking-widest uppercase">
              EXTRA! EXTRA!
            </span>
          </div>
        )}

        <article className={`p-4 sm:p-6 border ${data.isPersonalMilestone ? 'border-[#D4A017] bg-[#D4A017]/5' : 'border-[#1a1a1a]/15'}`}>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-2xl sm:text-3xl md:text-4xl select-none">{data.icon}</span>
            <div className="flex-1">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span
                  className="font-newspaper-sc text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide"
                  style={{ color: data.isPersonalMilestone ? '#D4A017' : '#1a1a1a' }}
                >
                  {data.year}
                </span>
                <span className="font-newspaper-body text-xs sm:text-sm text-[#8b7750] italic">
                  — Vol. {index + 1}, No. {data.year - 1995}
                </span>
              </div>
              <hr className="newspaper-rule mt-1" style={{ borderColor: data.isPersonalMilestone ? '#D4A017' : '#1a1a1a' }} />
            </div>
          </div>

          <h3 className="font-newspaper-headline text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-3 text-[#1a1a1a] italic min-h-[1.5em]">
            {isActive ? <TypewriterText text={data.headline} speed={35} /> : data.headline}
          </h3>

          <div className="relative">
            {data.scatteredImages && data.scatteredImages.length > 0 && (
              <div className="hidden md:block">
                {data.scatteredImages.map((img, i) => (
                  <div key={i} className={`${img.position === 'right' ? 'float-right ml-4' : 'float-left mr-4'} mb-3 w-28 lg:w-36`}>
                    <div className="border border-[#1a1a1a]/30 p-1 bg-[#e8dcc4]">
                      <img src={img.url} alt={img.caption} className="w-full h-auto grayscale contrast-125 opacity-90" loading="lazy" />
                    </div>
                    <p className="font-newspaper-body text-[8px] text-[#8b7750] italic mt-0.5 text-center">{img.caption}</p>
                  </div>
                ))}
              </div>
            )}

            {data.isPersonalMilestone && data.personalNote && (
              <div className="mb-3 p-3 sm:p-4 border-l-4 border-[#D4A017] bg-[#D4A017]/8">
                <p className="font-typewriter text-xs sm:text-sm leading-relaxed text-[#1a1a1a]">{data.personalNote}</p>
              </div>
            )}

            {data.image && (
              <div className="my-3 max-w-xs mx-auto md:mx-0">
                <div className="border border-[#1a1a1a]/30 p-1 bg-[#e8dcc4]">
                  <img src={data.image} alt={data.imageCaption || `Photo from ${data.year}`} className="w-full h-auto grayscale contrast-125 opacity-90" style={{ maxHeight: '180px', objectFit: 'cover' }} loading="lazy" />
                </div>
                {data.imageCaption && (
                  <p className="font-newspaper-body text-[9px] text-[#8b7750] italic mt-1 text-center">{data.imageCaption}</p>
                )}
              </div>
            )}

            {data.scatteredImages && data.scatteredImages.length > 0 && (
              <div className="md:hidden flex gap-3 mb-3 overflow-x-auto">
                {data.scatteredImages.map((img, i) => (
                  <div key={i} className="flex-shrink-0 w-20">
                    <div className="border border-[#1a1a1a]/30 p-0.5 bg-[#e8dcc4]">
                      <img src={img.url} alt={img.caption} className="w-full h-auto grayscale contrast-125 opacity-90" loading="lazy" />
                    </div>
                    <p className="font-newspaper-body text-[7px] text-[#8b7750] italic mt-0.5 text-center">{img.caption}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-1.5 clear-both">
              {data.facts.map((fact, i) => (
                <p key={i} className="font-newspaper-body text-xs sm:text-sm leading-relaxed text-[#2a2a2a]">
                  <span className="font-bold text-[#1a1a1a] mr-1.5">&#9658;</span>{fact}
                </p>
              ))}
            </div>
          </div>
        </article>

        <div className="mt-4 pt-3 text-center">
          <hr className="newspaper-rule-thin mb-2" />
          <span className="font-newspaper-body text-[10px] text-[#8b7750]">
            — {data.year} · Page {index + 2} of {TOTAL_PAGES} —
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Closing Page Content ─── */
function ClosingContent() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 sm:px-10 md:px-16 h-full">
      <div className="flex items-center gap-3 mb-5 w-full max-w-lg">
        <div className="flex-1 h-[2px] bg-[#D4A017]" />
        <span className="text-[#D4A017] text-xl">✦</span>
        <div className="flex-1 h-[2px] bg-[#D4A017]" />
      </div>

      <div className="max-w-lg p-5 sm:p-7 md:p-8 border-2 border-[#D4A017] bg-gradient-to-b from-[#D4A017]/8 to-[#D4A017]/3 relative">
        <div className="absolute top-2 left-2 text-[#D4A017]/30 text-lg">❧</div>
        <div className="absolute top-2 right-2 text-[#D4A017]/30 text-lg rotate-180">❧</div>
        <div className="absolute bottom-2 left-2 text-[#D4A017]/30 text-lg rotate-180">❧</div>
        <div className="absolute bottom-2 right-2 text-[#D4A017]/30 text-lg">❧</div>

        <h2 className="font-newspaper-headline text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 italic">
          <TypewriterText text="30 Down, Dadbert." speed={60} />
        </h2>
        <div className="w-16 h-[2px] bg-[#D4A017] mx-auto mb-4" />
        <p className="font-typewriter text-xs sm:text-sm leading-relaxed text-[#2a2a2a] mb-3">
          What a crazy last couple of years. What a ridiculous triple decade.
          Let's be real — you peaked at TJ. Sleeping in the hallways, getting
          into the yearbook for it, the whole golden era. Everything since then
          has been a slow, graceful decline.
        </p>
        <p className="font-typewriter text-xs sm:text-sm leading-relaxed text-[#2a2a2a] mb-3">
          And yet somehow you still managed to trick Eugenia into marrying you,
          bring Julia into the world, adopt Jasmine the diva, questionably graduated
          from Cornell with no bio major to show for it, and zoom around NYC on a scooter like you own the place.
          Not bad for someone whose peak was a high school hallway.
        </p>
        <div className="w-8 h-[1px] bg-[#8b7750] mx-auto my-3" />
        <p className="font-typewriter text-xs sm:text-sm leading-relaxed text-[#2a2a2a] mb-3">
          I'm proud to have you as an older brother and a figure I grew up
          learning from — even if I didn't listen to a single thing you said.
          Here's to more in NYC. More scooter rides, more Jasmine walks, more
          questionable life decisions, and more of me annoying you about all of it.
        </p>
        <p className="font-typewriter text-base sm:text-lg leading-relaxed text-[#D4A017] font-bold">
          Happy 30th, Dadbert. 🎂
        </p>
        <p className="font-typewriter text-[10px] sm:text-xs text-[#8b7750] mt-2 italic">
          (Here's to the next 30. You're gonna need it.)
        </p>
      </div>

      <div className="flex items-center gap-3 mt-5 w-full max-w-lg">
        <div className="flex-1 h-[2px] bg-[#D4A017]" />
        <span className="text-[#D4A017] text-xl">✦</span>
        <div className="flex-1 h-[2px] bg-[#D4A017]" />
      </div>

      <div className="mt-5 font-newspaper-body text-[10px] sm:text-xs text-[#8b7750] italic space-y-1">
        <p>Published with love &middot; The Daily Chronicle &middot; Special Anniversary Edition</p>
        <p>© 1996–2026 &middot; All memories reserved</p>
        <p className="mt-3 text-sm">❧</p>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function NewspaperTimeline() {
  const flipBookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  // Track dimensions
  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const flipNext = useCallback(() => {
    flipBookRef.current?.pageFlip()?.flipNext();
  }, []);

  const flipPrev = useCallback(() => {
    flipBookRef.current?.pageFlip()?.flipPrev();
  }, []);

  // Backface fix: Add a CSS class to the flipbook container during flip animation
  // that hides the bottom page content, preventing text bleed-through.
  const [isFlipping, setIsFlipping] = useState(false);

  const onChangeState = useCallback((e: any) => {
    const state = e.data;
    // States: 'read' (idle), 'flipping' (animating), 'user_fold' (dragging)
    if (state === 'flipping' || state === 'user_fold') {
      setIsFlipping(true);
    } else {
      setIsFlipping(false);
    }
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

  const onFlip = useCallback((e: any) => {
    const page = e.data;
    setCurrentPage(page);
    // Show fireworks on the last page
    if (page === TOTAL_PAGES - 1) {
      setShowFireworks(true);
    } else {
      setShowFireworks(false);
    }
  }, []);

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
        className="fixed inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{ backgroundImage: `url(${NEWSPAPER_BG})`, zIndex: 0 }}
      />
      <div className="fixed inset-0 aged-paper noise-overlay pointer-events-none" style={{ zIndex: 1 }} />

      {/* Fireworks on closing page */}
      {showFireworks && <FireworksCanvas />}

      {/* Progress bar at top */}
      <div className="fixed top-0 left-0 right-0 z-40 h-1.5 bg-[#d4c5a9]">
        <div
          className="h-full bg-[#D4A017] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Page counter */}
      <div className="fixed top-4 right-4 sm:right-8 z-40 font-newspaper-body text-xs sm:text-sm text-[#8b7750]">
        <span className="font-bold text-[#1a1a1a]">{currentYearLabel}</span>
        <span className="mx-1.5">·</span>
        <span>{currentPage + 1} / {TOTAL_PAGES}</span>
      </div>

      {/* The flipbook */}
      <div className={`relative z-10 flex items-center justify-center ${isFlipping ? 'flipbook-animating' : ''}`} style={{ minHeight: '100vh' }}>
        {/* @ts-ignore - react-pageflip types are incomplete */}
        <HTMLFlipBook
          ref={flipBookRef}
          width={dimensions.width}
          height={dimensions.height}
          size="fixed"
          minWidth={320}
          maxWidth={2000}
          minHeight={400}
          maxHeight={2000}
          showCover={false}
          mobileScrollSupport={false}
          onFlip={onFlip}
          onChangeState={onChangeState}
          flippingTime={800}
          usePortrait={true}
          startPage={0}
          drawShadow={true}
          maxShadowOpacity={0.5}
          useMouseEvents={true}
          swipeDistance={30}
          clickEventForward={true}
          className="newspaper-flipbook"
          style={{}}
          startZIndex={0}
          autoSize={false}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {/* Cover / Intro page */}
          <PageWrapper>
            <IntroContent />
          </PageWrapper>

          {/* Year pages */}
          {timelineData.map((data, index) => (
            <PageWrapper key={data.year}>
              <YearContent data={data} index={index} isActive={currentPage === index + 1} />
            </PageWrapper>
          ))}

          {/* Closing page */}
          <PageWrapper>
            <ClosingContent />
          </PageWrapper>
        </HTMLFlipBook>
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
        <span className="hidden sm:inline">← → arrow keys · drag page corner · click arrows</span>
        <span className="sm:hidden">swipe or tap arrows</span>
      </div>
    </div>
  );
}
