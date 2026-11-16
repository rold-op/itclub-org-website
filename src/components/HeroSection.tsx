import { useRef, useState, useEffect, type MouseEvent } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { HERO_IMAGE } from '../data/clubData';
import { EASE_OUT_EXPO } from '../lib/motion';
import { ResilientImage } from './ResilientImage';

export function HeroSection() {
  const heroCardRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const rawX = useMotionValue(500);
  const rawY = useMotionValue(280);

  const springConfig = shouldReduceMotion
    ? { stiffness: 1000, damping: 100, mass: 0.1 }
    : { stiffness: 260, damping: 28, mass: 0.5 };

  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  useEffect(() => {
    const el = heroCardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set(rect.width / 2);
    rawY.set(rect.height / 2);
  }, [rawX, rawY]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = heroCardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
    if (!isHovering) setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    const el = heroCardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set(rect.width / 2);
    rawY.set(rect.height / 2);
  };

  // Dark shroud with radial flashlight cutout revealing both background and hero text
  const flashlightMask = useMotionTemplate`radial-gradient(${
    isHovering ? '380px' : '260px'
  } circle at ${smoothX}px ${smoothY}px, rgba(8, 12, 18, ${
    isHovering ? '0.14' : shouldReduceMotion ? '0.25' : '0.82'
  }) 0%, rgba(8, 12, 18, ${
    isHovering ? '0.68' : '0.92'
  }) 55%, rgba(8, 12, 18, 0.97) 100%)`;

  // Subtle teal flashlight halo accent
  const flashlightGlow = useMotionTemplate`radial-gradient(320px circle at ${smoothX}px ${smoothY}px, rgba(45, 212, 191, ${
    isHovering ? '0.16' : '0.04'
  }), transparent 72%)`;

  const handleScrollDown = () => {
    const target = document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full -mt-[60px] sm:-mt-[64px]">
      <div className="relative w-full">
        {/* Full-Bleed Maximized Hero Image Container */}
        <div
          ref={heroCardRef}
          onMouseEnter={() => setIsHovering(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative overflow-hidden w-full min-h-[100dvh] flex flex-col justify-center bg-[#080C12]"
        >
          {/* Maximized Background Lab Photography */}
          <ResilientImage
            src={HERO_IMAGE}
            alt="IT-CLUB student engineers collaborating around laptops and hardware prototypes inside the campus studio"
            fallbackLabel="IT-CLUB Engineering Studio"
            className="absolute inset-0 z-0 w-full h-full object-cover object-center"
          />

          {/* Base Legibility Gradient */}
          <div
            className="absolute inset-0 z-0 bg-gradient-to-b from-[#080C12]/40 via-transparent to-[#080C12]/60 pointer-events-none"
            aria-hidden="true"
          />

          {/* Centered Dominant Editorial Headline (revealed by flashlight) */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-24 pb-24 sm:pt-28 sm:pb-28 pointer-events-none">
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              className="font-head font-semibold text-white tracking-tight max-w-3xl leading-[1.08]"
              style={{ fontSize: 'clamp(2.25rem, 4.4vw, 3.85rem)', textWrap: 'balance' }}
            >
              The Next Generation of Tech Builders Starts Here
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE_OUT_EXPO }}
              className="mt-5 text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed"
            >
              A student-led engineering community uniting software developers, AI researchers, security analysts, and hardware builders through weekly labs and open-source projects.
            </motion.p>
          </div>

          {/* Interactive Dark Shroud + Flashlight Cutout (sits above background and text) */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{ background: flashlightMask }}
            aria-hidden="true"
          />

          {/* Subtle Brand Teal Flashlight Rim Glow */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{ background: flashlightGlow }}
            aria-hidden="true"
          />
          {/* Sculptural Curved Cutout Medallion */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 flex justify-center pointer-events-none">
            <div className="relative flex items-end justify-center w-[220px] h-[112px] pb-1.5">
              {/* Smooth Architectural Upward Arch Saddle */}
              <svg
                viewBox="0 0 220 92"
                className="absolute bottom-0 left-0 w-full h-[92px] pointer-events-none"
                aria-hidden="true"
              >
                <path
                  d="M 0 92 C 38 92, 46 14, 110 14 C 174 14, 182 92, 220 92 Z"
                  fill="var(--bg-canvas)"
                />
              </svg>

              {/* Interactive Circular Scroll Badge */}
              <motion.button
                type="button"
                onClick={handleScrollDown}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                aria-label="Scroll down to explore IT-CLUB"
                className="pointer-events-auto relative w-[90px] h-[90px] rounded-full bg-[#1E2430] hover:bg-[#017278] text-white flex items-center justify-center shadow-lg transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-ring)]"
              >
              <svg
                viewBox="0 0 100 100"
                className="w-[82px] h-[82px] animate-slow-spin"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="heroCirclePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text
                  fill="currentColor"
                  fontSize="8.6"
                  fontWeight="600"
                  letterSpacing="2.1"
                  className="uppercase font-head"
                >
                  <textPath href="#heroCirclePath" startOffset="0%">
                    EXPLORE MORE ABOUT IT-CLUB •
                  </textPath>
                </text>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center">
                <ArrowDown className="w-4 h-4 text-white" aria-hidden="true" />
              </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
