import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ENGINEERING_TRACKS, type EngineeringTrack } from '../data/clubData';
import { EASE_OUT_EXPO, REVEAL_VIEWPORT, fadeUpVariant } from '../lib/motion';
import { ResilientImage } from './ResilientImage';

interface TracksSectionProps {
  onSelectTrack: (track: EngineeringTrack) => void;
  onOpenJoin: () => void;
}

export function TracksSection({ onSelectTrack, onOpenJoin }: TracksSectionProps) {
  return (
    <section id="tracks" className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-[1280px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Header Column */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={REVEAL_VIEWPORT}
          custom={0}
          className="lg:col-span-4 lg:sticky lg:top-8"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-accent)] mb-3">
            Tracks &amp; Labs
          </p>
          <h2 className="font-head font-semibold text-3xl tracking-tight leading-[1.15]">
            Engineering Tracks &amp; Open-Source Labs
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--body)] leading-relaxed">
            Four focused technical squads run weekly build sessions, mentor cohorts, and deploy maintained campus infrastructure. Select any track to inspect its schedule, stack, and active repositories.
          </p>

          <motion.button
            type="button"
            onClick={onOpenJoin}
            whileTap={{ scale: 0.97 }}
            className="mt-6 group inline-flex items-center gap-3 bg-[#017278] hover:bg-[#02858C] text-white pl-4 pr-1.5 py-1.5 rounded-full text-sm font-semibold transition-colors duration-150 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-ring)]"
          >
            <span>Join a Track</span>
            <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </motion.button>
        </motion.div>

        {/* Right Showcase Track Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ENGINEERING_TRACKS.map((track, idx) => (
            <motion.button
              key={track.id}
              type="button"
              onClick={() => onSelectTrack(track)}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={REVEAL_VIEWPORT}
              transition={{
                duration: 0.5,
                delay: idx * 0.06,
                ease: EASE_OUT_EXPO,
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.985 }}
              className="group relative text-left overflow-hidden rounded-2xl aspect-[4/3] panel-surface cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-ring)]"
            >
              <ResilientImage
                src={track.image}
                alt={`${track.title} lab session`}
                fallbackLabel={track.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              {/* Measured Gradient Scrim for 4.5:1+ Legibility */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/95 via-[#0D1117]/45 to-transparent"
                aria-hidden="true"
              />

              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-mono-tabular text-teal-300">
                    {track.schedule}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center group-hover:bg-[#017278] transition-colors shrink-0">
                    <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-2 font-head font-semibold text-lg sm:text-xl text-white leading-snug">
                  {track.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
                  {track.shortDesc}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
