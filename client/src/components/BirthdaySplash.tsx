/*
 * DESIGN: Party Popper → The Daily Chronicle
 * This is Act 1: The warm, joyful celebration splash.
 * Colors: golden yellow, coral, teal, lavender on warm cream
 * Fonts: Baloo 2 (display), Quicksand (body)
 * Mood: Bubbly, irreverent, celebratory
 */

import { motion } from 'framer-motion';

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/sMHpuJN7nHggUQUV7RaYok/sandbox/J6v3pGaehyEQQMLK24aKor-img-1_1771723057000_na1fn_aGVyby1jZWxlYnJhdGlvbg.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc01IcHVKTjduSGdnVVFVVjdSYVlvay9zYW5kYm94L0o2djNwR2FlaHlFUVFNTEsyNGFLb3ItaW1nLTFfMTc3MTcyMzA1NzAwMF9uYTFmbl9hR1Z5YnkxalpXeGxZbkpoZEdsdmJnLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Z5eukO4PAOXRbyJ-tf3CdIkhJnQJY3gbrlAQjQzXzl3BmCd58gW~caNoJnPjeepW5Hcgk6AY2iNq7fRkBMkVdTHYIIG08Z4yJrBX0e2I-y~~2uSzG1boijCxO3M9kI6aTOQvOCIWwWPIEhbtozJ60TyN8ur6xNzsWfD3aXP0MTF2AaTjW1h6v16EYhqmI8Axe3uiScdetlvStqFvkz06JCWQ1HAHD7oYO-DHJ2bEIwSnMw2W2Kf7Xm0~bMncJ5ZESyBdt1cSH8qG8PV2mDrSGAiPO4wzHbBdCDwebmOFu5YblRd3XW4YqRs7ea0bvEziYFodd3wGe0o7asFx7KTjww__";

const CONFETTI_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/sMHpuJN7nHggUQUV7RaYok/sandbox/J6v3pGaehyEQQMLK24aKor-img-3_1771723065000_na1fn_Y29uZmV0dGktYnVyc3Q.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvc01IcHVKTjduSGdnVVFVVjdSYVlvay9zYW5kYm94L0o2djNwR2FlaHlFUVFNTEsyNGFLb3ItaW1nLTNfMTc3MTcyMzA2NTAwMF9uYTFmbl9ZMjl1Wm1WMGRHa3RZblZ5YzNRLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=luWce5zh0lSEJoBNvYjswtx2sHA6x217pQupfq4iDviOP7bdWeF1hA00-jMc-GwZZmCwcS9~vC3LkOS98ejDEVN1rbzUNcNRgqHIwA~CSuNYaSrjwdKplO4GjhUItPzBt7YyXi-RU1doQ97GmgS66Au5Nr1Xz5pOjHe-zm9dScXH6wO7XUUYNwVooAhidLgt2ie5k94-ERB-Mduc2dhBi6NTi7IHFYr6J~m29Ihm0d8CYltFjKKaVrVocpXMGNQ5qsw95BcaLR-WB3bkCrKVvNhEtR8IrXOR~qRWyVpAEP6TmbMmTMnlLekvosQ2vrkUkgUbiSh1OGrob4nQdOgDYw__";

interface BirthdaySplashProps {
  onTransition: () => void;
}

export default function BirthdaySplash({ onTransition }: BirthdaySplashProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />
      {/* Warm vibrant overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFCA28]/20 via-transparent to-[#FF7043]/15" />

      {/* Floating decorative elements - scattered around edges */}
      <motion.div
        className="absolute top-[8%] left-[3%] text-5xl sm:text-7xl md:text-8xl select-none"
        animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        🎈
      </motion.div>
      <motion.div
        className="absolute top-[12%] right-[5%] text-4xl sm:text-6xl md:text-7xl select-none"
        animate={{ y: [10, -15, 10], rotate: [3, -3, 3] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        🎉
      </motion.div>
      <motion.div
        className="absolute bottom-[18%] left-[8%] text-4xl sm:text-5xl md:text-6xl select-none"
        animate={{ y: [-8, 12, -8], rotate: [-3, 3, -3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        🎊
      </motion.div>
      <motion.div
        className="absolute bottom-[22%] right-[3%] text-4xl sm:text-6xl md:text-7xl select-none"
        animate={{ y: [5, -10, 5], rotate: [2, -4, 2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        🥳
      </motion.div>
      <motion.div
        className="absolute top-[45%] left-[1%] text-3xl sm:text-4xl opacity-60 select-none"
        animate={{ y: [-5, 15, -5], scale: [1, 1.2, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute top-[28%] right-[12%] text-3xl sm:text-4xl md:text-5xl select-none"
        animate={{ y: [8, -8, 8], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        🎂
      </motion.div>
      <motion.div
        className="absolute bottom-[35%] left-[15%] text-2xl sm:text-3xl opacity-50 select-none"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        🎵
      </motion.div>
      <motion.div
        className="absolute top-[60%] right-[8%] text-2xl sm:text-3xl opacity-50 select-none"
        animate={{ y: [-5, 10, -5], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      >
        🎁
      </motion.div>

      {/* Confetti burst image - using screen blend to hide dark bg */}
      <motion.img
        src={CONFETTI_IMG}
        alt=""
        className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[90vw] max-w-[700px] pointer-events-none"
        style={{ mixBlendMode: 'screen', opacity: 0.5 }}
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.5 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Age badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
          className="mb-2 sm:mb-4"
        >
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#FF7043] via-[#FFCA28] to-[#FF7043] flex items-center justify-center shadow-2xl"
              style={{ boxShadow: '0 0 60px rgba(255, 202, 40, 0.4), 0 0 120px rgba(255, 112, 67, 0.2)' }}
            >
              <span className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white drop-shadow-lg">30</span>
            </div>
            <motion.div
              className="absolute -top-2 -right-2 text-2xl sm:text-3xl md:text-4xl"
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🎀
            </motion.div>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-center leading-none tracking-tight"
          style={{
            color: '#1a1a1a',
            textShadow: '3px 3px 0px rgba(255, 202, 40, 0.6), 6px 6px 0px rgba(255, 112, 67, 0.2)',
            WebkitTextStroke: '1px rgba(0,0,0,0.05)'
          }}
        >
          HAPPY
          <br />
          BIRTHDAY
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9, type: "spring" }}
          className="mt-1 sm:mt-2 relative"
        >
          <span className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold"
            style={{
              background: 'linear-gradient(135deg, #FF7043, #CE93D8, #4DD0E1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            You Are SO Old!!
          </span>
        </motion.div>

        {/* Cheeky message card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: -1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-5 sm:mt-7 max-w-md mx-auto w-full"
        >
          <div className="bg-white/85 backdrop-blur-md rounded-2xl px-5 sm:px-7 py-4 sm:py-5 shadow-xl border-2 border-dashed border-[#CE93D8]/60 relative overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#FFCA28]/20 to-transparent rounded-bl-full" />
            <p className="font-body text-base sm:text-lg text-[#1a1a1a] text-center leading-relaxed relative z-10">
              Can't believe you're a <span className="font-bold text-[#FF7043] text-lg sm:text-xl">dad</span> now. Poor kid.
            </p>
            <p className="font-body text-sm sm:text-base text-[#666] text-center mt-1">
              Ex-Deloitte consultant turned tech PM turned diaper changer.
            </p>
            <p className="font-body text-xs sm:text-sm text-[#999] text-center mt-0.5">
              The career pivot nobody asked for.
            </p>
            <p className="text-center mt-2">
              <span className="text-xl sm:text-2xl">👶</span>
              <span className="text-lg sm:text-xl mx-1">🎮</span>
              <span className="text-base sm:text-lg mx-1 text-[#CE93D8]">→</span>
              <span className="text-xl sm:text-2xl">👴</span>
            </p>
          </div>
        </motion.div>

        {/* Three decades badge row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="mt-5 sm:mt-7 flex items-center justify-center gap-3 sm:gap-4"
        >
          <span className="font-display text-lg sm:text-2xl font-bold bg-white/60 backdrop-blur-sm text-[#1a1a1a] px-4 py-1.5 rounded-full border border-[#4DD0E1]/40 shadow-sm">
            1996
          </span>
          <motion.span
            className="font-display text-xl sm:text-2xl font-bold text-[#CE93D8]"
            animate={{ x: [-3, 3, -3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
          <span className="font-display text-lg sm:text-2xl font-bold bg-white/60 backdrop-blur-sm text-[#1a1a1a] px-4 py-1.5 rounded-full border border-[#4DD0E1]/40 shadow-sm">
            2026
          </span>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onTransition}
          className="mt-7 sm:mt-9 relative group focus:outline-none"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF7043] to-[#FFCA28] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
          <div className="relative bg-gradient-to-r from-[#FF7043] via-[#FF8A65] to-[#FFCA28] text-white font-display font-bold text-base sm:text-lg md:text-xl px-7 sm:px-10 py-3.5 sm:py-4.5 rounded-full shadow-xl border border-white/20 flex items-center gap-2">
            <span className="text-xl">📰</span>
            <span>Let's Go Down History Lane</span>
          </div>
        </motion.button>

        {/* Scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 3 }}
          className="mt-5 font-body text-xs sm:text-sm text-[#555] text-center italic"
        >
          30 years of questionable decisions await...
        </motion.p>
      </div>
    </div>
  );
}
