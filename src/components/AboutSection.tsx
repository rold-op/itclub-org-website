import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import {
  ABOUT_COLLAB_IMAGE,
  ABOUT_HARDWARE_IMAGE,
  CLUB_METRICS,
} from '../data/clubData';
import { EASE_OUT_EXPO, REVEAL_VIEWPORT, fadeUpVariant } from '../lib/motion';
import { ResilientImage } from './ResilientImage';

interface AboutSectionProps {
  onOpenCharter: () => void;
}

export function AboutSection({ onOpenCharter }: AboutSectionProps) {
  return (
    <section id="about" className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-[1280px] mx-auto">
      {/* Asymmetric Editorial Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          custom={0}
          className="lg:col-span-5"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-accent)] mb-3">
            Who We Are
          </p>
          <h2 className="font-head font-semibold text-3xl sm:text-4xl tracking-tight leading-[1.15]">
            We Are Builders Shaping Campus Technology
          </h2>

          {/* Tabular Quantitative Proof Adjacent to Mission */}
          <dl className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-[var(--border-subtle)]">
            {CLUB_METRICS.map((metric) => (
              <div key={metric.label}>
                <dt className="text-xs text-[var(--mute)] leading-snug">{metric.label}</dt>
                <dd className="mt-1 font-head font-semibold text-xl sm:text-2xl text-[var(--ink)] font-mono-tabular">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          custom={0.08}
          className="lg:col-span-7 flex flex-col items-start"
        >
          <p className="text-base sm:text-lg text-[var(--body)] leading-relaxed max-w-[65ch]">
            Founded to bridge classroom computer science with practical engineering, IT-CLUB brings together undergraduates and graduate researchers across software architecture, applied machine learning, cybersecurity, and embedded hardware. Members collaborate in small product squads, maintain real open-source campus tools, and mentor incoming peers every semester.
          </p>

          <motion.button
            type="button"
            onClick={onOpenCharter}
            whileTap={{ scale: 0.97 }}
            className="mt-7 group inline-flex items-center gap-3 glass-surface hover:border-[var(--brand-accent)] pl-4 pr-1.5 py-1.5 rounded-full text-sm font-semibold text-[var(--ink)] transition-all duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)]"
          >
            <span>Read Club Charter</span>
            <span className="w-8 h-8 rounded-full bg-[#017278] group-hover:bg-[#02858C] text-white flex items-center justify-center transition-colors">
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Dual Visual Showcase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
          whileHover={{ y: -3 }}
          className="group relative overflow-hidden rounded-2xl aspect-[4/3] panel-surface"
        >
          <ResilientImage
            src={ABOUT_COLLAB_IMAGE}
            alt="IT-CLUB members sketching system architecture diagrams and coding together in the innovation lab"
            fallbackLabel="Software Architecture & Squads"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-xs font-medium text-white/80">Collaborative Design</p>
            <h3 className="mt-1 font-head font-semibold text-lg text-white">
              Cross-Disciplinary Product &amp; Systems Squads
            </h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={REVEAL_VIEWPORT}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE_OUT_EXPO }}
          whileHover={{ y: -3 }}
          className="group relative overflow-hidden rounded-2xl aspect-[4/3] panel-surface"
        >
          <ResilientImage
            src={ABOUT_HARDWARE_IMAGE}
            alt="Embedded hardware workbench with oscilloscope, microcontroller, and robotic arm prototype"
            fallbackLabel="Hardware & Embedded Lab"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
            aria-hidden="true"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-xs font-medium text-white/80">Hands-On Prototyping</p>
            <h3 className="mt-1 font-head font-semibold text-lg text-white">
              Dedicated Electronics, PCB &amp; Robotics Bench
            </h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
