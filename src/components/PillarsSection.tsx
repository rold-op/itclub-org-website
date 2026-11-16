import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MapPin, Calendar } from 'lucide-react';
import { CORE_PILLARS } from '../data/clubData';
import { EASE_OUT_EXPO, REVEAL_VIEWPORT, fadeUpVariant } from '../lib/motion';
import { ResilientImage } from './ResilientImage';

export function PillarsSection() {
  const [activeId, setActiveId] = useState<string>(CORE_PILLARS[0].id);
  const activePillar = CORE_PILLARS.find((p) => p.id === activeId) || CORE_PILLARS[0];

  return (
    <section id="pillars" className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-[1280px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left Tall Visual Showcase with Crossfade */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          custom={0}
          className="lg:col-span-5 flex flex-col"
        >
          <div className="relative overflow-hidden rounded-2xl flex-1 min-h-[380px] lg:min-h-[540px] panel-surface">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
                className="absolute inset-0"
              >
                <ResilientImage
                  src={activePillar.image}
                  alt={activePillar.title}
                  fallbackLabel={activePillar.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            <div
              className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/90 via-[#0D1117]/25 to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <p className="font-head font-semibold text-base text-white">
                {activePillar.number}. {activePillar.title}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-200">
                <span className="inline-flex items-center gap-1.5 font-mono-tabular">
                  <Calendar className="w-3.5 h-3.5 text-teal-300" aria-hidden="true" />
                  {activePillar.schedule}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-300" aria-hidden="true" />
                  {activePillar.location}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Interactive Pillars Accordion */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          custom={0.08}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-accent)] mb-3">
            Core Pillars
          </p>
          <h2 className="font-head font-semibold text-3xl sm:text-4xl tracking-tight leading-[1.15]">
            Essential Pillars Powering Our Tech Community
          </h2>

          <div className="mt-8 border-t border-[var(--border-subtle)]">
            {CORE_PILLARS.map((pillar) => {
              const isOpen = pillar.id === activeId;
              return (
                <div
                  key={pillar.id}
                  className="border-b border-[var(--border-subtle)]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(pillar.id)}
                    aria-expanded={isOpen}
                    className="w-full py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)] rounded"
                  >
                    <span
                      className={`font-head font-semibold text-base sm:text-lg transition-colors ${
                        isOpen
                          ? 'text-[var(--brand-accent)]'
                          : 'text-[var(--ink)] group-hover:text-[var(--brand-accent)]'
                      }`}
                    >
                      {pillar.number}. {pillar.title}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-[var(--mute)] transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[var(--brand-accent)]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={`content-${pillar.id}`}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
                        className="pb-5 pr-6"
                      >
                        <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed">
                          {pillar.summary}
                        </p>
                        <ul className="mt-3 space-y-1.5 text-xs sm:text-sm text-[var(--mute)]">
                          {pillar.highlights.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="text-[var(--brand-accent)] font-semibold" aria-hidden="true">
                                —
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
