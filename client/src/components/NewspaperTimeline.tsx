/*
 * DESIGN: Party Popper → The Daily Chronicle
 * This is Act 2: The vintage newspaper broadsheet timeline.
 * Colors: charcoal ink (#1a1a1a) on aged parchment (#f0e4d0)
 * Personal milestones: gold accent (#D4A017)
 * Fonts: UnifrakturMaguntia (masthead), Playfair Display (headlines), Lora (body), Special Elite (typewriter)
 */

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { timelineData, type TimelineYear } from '@/lib/timelineData';

const NEWSPAPER_BG = "https://private-us-east-1.manuscdn.com/sessionFile/sMHpuJN7nHggUQUV7RaYok/sandbox/J6v3pGaehyEQQMLK24aKor-img-2_1771723050000_na1fn_bmV3c3BhcGVyLXRleHR1cmU.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc01IcHVKTjduSGdnVVFVVjdSYVlvay9zYW5kYm94L0o2djNwR2FlaHlFUVFNTEsyNGFLb3ItaW1nLTJfMTc3MTcyMzA1MDAwMF9uYTFmbl9ibVYzYzNCaGNHVnlMWFJsZUhSMWNtVS5qcGc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rq5hto~lwLp9MKB6MB85TdGiDySY7I7ciGTcoYG-6S3mhDeJRdTmpoLfxgvDbya-nVos8cyVDr5Y6A0MWqYlO-srnHXRpLzVosZeb3OnAerbG96TYlzey8TUYhA~r4lLCILl~mqz0usVIGz3Ohf9mFk5cd1mAMoc~-i~opsVg9h79FdtTstYPZPWd4-nJqggRrUxqG~F~HtmlfEsO~0pJF5IS~FjkB0hRg7daEVVuN6XQ3bjFGdw2idL0SzSkpFFAwUclMeeXXb0-c45RSAeGUHRDCZSI0hqAJCt7EyXc~0Kuon-Xp0XL6AZN5G~b0s9kYgawNgF5i-CLGo4bYvX2Q__";

function YearArticle({ data, index }: { data: TimelineYear; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.05 }}
      className={`mb-10 sm:mb-12 relative ${data.isPersonalMilestone ? 'milestone-gold p-5 sm:p-7' : ''}`}
    >
      {/* Year header */}
      <div className="flex items-baseline gap-3 mb-3">
        <span className="text-3xl sm:text-4xl select-none">{data.icon}</span>
        <div className="flex-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-newspaper-sc text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide" style={{ color: data.isPersonalMilestone ? '#D4A017' : '#1a1a1a' }}>
              {data.year}
            </span>
            <span className="font-newspaper-body text-xs sm:text-sm text-[#8b7750] italic">
              — Vol. {index + 1}, No. {data.year - 1995}
            </span>
          </div>
          <hr className="newspaper-rule" style={{ borderColor: data.isPersonalMilestone ? '#D4A017' : '#1a1a1a' }} />
        </div>
      </div>

      {/* Headline */}
      <h3 className="font-newspaper-headline text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 text-[#1a1a1a]"
        style={{ fontStyle: 'italic' }}
      >
        {data.headline}
      </h3>

      {/* Personal milestone note */}
      {data.isPersonalMilestone && data.personalNote && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-5 p-4 sm:p-5 border-l-4 border-[#D4A017] bg-[#D4A017]/8"
        >
          <p className="font-typewriter text-sm sm:text-base md:text-lg leading-relaxed text-[#1a1a1a]">
            {data.personalNote}
          </p>
        </motion.div>
      )}

      {/* Facts in newspaper column style */}
      <div className={`${!data.isPersonalMilestone && data.facts.length > 3 ? 'newspaper-columns' : ''}`}>
        {data.facts.map((fact, i) => (
          <p key={i} className="font-newspaper-body text-sm sm:text-base leading-relaxed text-[#2a2a2a] mb-2.5 break-inside-avoid">
            <span className="font-bold text-[#1a1a1a] mr-1">&#9658;</span>
            {fact}
          </p>
        ))}
      </div>

      {/* Thin rule at bottom */}
      {!data.isPersonalMilestone && <hr className="newspaper-rule-thin mt-5" />}
    </motion.article>
  );
}

function DecadeDivider({ decade }: { decade: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="my-10 sm:my-14"
    >
      <hr className="newspaper-rule-double" />
      <div className="text-center py-3">
        <span className="font-newspaper-sc text-base sm:text-xl tracking-[0.3em] text-[#8b7750] uppercase">
          — {decade} —
        </span>
      </div>
      <hr className="newspaper-rule-double" />
    </motion.div>
  );
}

export default function NewspaperTimeline() {
  return (
    <div className="relative min-h-screen">
      {/* Paper texture background - fixed */}
      <div
        className="fixed inset-0 bg-cover bg-center opacity-25 pointer-events-none"
        style={{ backgroundImage: `url(${NEWSPAPER_BG})`, zIndex: 0 }}
      />
      <div className="aged-paper noise-overlay relative" style={{ minHeight: '100vh' }}>
        {/* Newspaper Masthead */}
        <header className="pt-10 sm:pt-14 pb-4 sm:pb-6 px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
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
          </div>
        </header>

        {/* Timeline content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 relative z-10">
          {/* Intro blurb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mb-10 sm:mb-14"
          >
            <p className="font-typewriter text-sm sm:text-base md:text-lg text-[#4a4a4a] max-w-2xl mx-auto leading-relaxed">
              From the birth of Pokémon to the birth of baby Julia, these pages chronicle 
              thirty remarkable years of science, gaming, technology, and the most important 
              moments of all — the personal ones.
            </p>
          </motion.div>

          {/* Late 90s */}
          <DecadeDivider decade="THE LATE NINETIES" />
          {timelineData.filter(d => d.year >= 1996 && d.year <= 1999).map((data, i) => (
            <YearArticle key={data.year} data={data} index={i} />
          ))}

          {/* 2000s */}
          <DecadeDivider decade="THE TWO-THOUSANDS" />
          {timelineData.filter(d => d.year >= 2000 && d.year <= 2009).map((data, i) => (
            <YearArticle key={data.year} data={data} index={i + 4} />
          ))}

          {/* 2010s */}
          <DecadeDivider decade="THE TWENTY-TENS" />
          {timelineData.filter(d => d.year >= 2010 && d.year <= 2019).map((data, i) => (
            <YearArticle key={data.year} data={data} index={i + 14} />
          ))}

          {/* 2020s */}
          <DecadeDivider decade="THE ROARING TWENTIES" />
          {timelineData.filter(d => d.year >= 2020 && d.year <= 2026).map((data, i) => (
            <YearArticle key={data.year} data={data} index={i + 24} />
          ))}

          {/* Closing message */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 sm:mt-20 text-center"
          >
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
                30 Down, Who Knows How Many To Go
              </h2>
              <div className="w-16 h-[2px] bg-[#D4A017] mx-auto mb-5" />
              <p className="font-typewriter text-sm sm:text-base leading-relaxed text-[#2a2a2a] mb-4">
                What a crazy last couple of years. What a ridiculous triple decade.
                You went from catching Pokémon to catching feelings, from Xbox LAN
                parties to baby bottle prep at 3 AM.
              </p>
              <p className="font-typewriter text-sm sm:text-base leading-relaxed text-[#2a2a2a] mb-4">
                Somehow you tricked Eugenia into marrying you, brought Julia into
                the world, and still find time to be hardstuck in ranked. Impressive,
                honestly.
              </p>
              <div className="w-8 h-[1px] bg-[#8b7750] mx-auto my-5" />
              <p className="font-typewriter text-sm sm:text-base leading-relaxed text-[#2a2a2a] mb-4">
                But for real — you're an incredible brother, husband, and dad.
                I'm not going to get too sappy because you'd never let me live it down,
                but I'm genuinely excited for the next 30 years of roasting you.
              </p>
              <p className="font-typewriter text-base sm:text-lg md:text-xl leading-relaxed text-[#D4A017] font-bold">
                Happy 30th, old man. You're ancient now. 🎂
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
          </motion.div>
        </main>
      </div>
    </div>
  );
}
