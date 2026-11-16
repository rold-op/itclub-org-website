import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  CLUB_STORIES,
  CLUB_TESTIMONIAL,
  type ClubEventStory,
} from '../data/clubData';
import { EASE_OUT_EXPO, REVEAL_VIEWPORT, fadeUpVariant } from '../lib/motion';
import { ResilientImage } from './ResilientImage';

interface EventsSectionProps {
  rsvpedIds: string[];
  onSelectStory: (story: ClubEventStory) => void;
}

const CATEGORIES = ['All', 'Workshops', 'Hackathons', 'Releases'] as const;
type FilterCategory = (typeof CATEGORIES)[number];

export function EventsSection({ rsvpedIds, onSelectStory }: EventsSectionProps) {
  const [filter, setFilter] = useState<FilterCategory>('All');

  const visibleStories =
    filter === 'All'
      ? CLUB_STORIES.slice(0, 3)
      : CLUB_STORIES.filter((s) => s.category === filter);

  return (
    <section id="events" className="px-4 sm:px-6 lg:px-8 py-14 sm:py-20 max-w-[1280px] mx-auto">
      {/* Header Row */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={REVEAL_VIEWPORT}
        custom={0}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10"
      >
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-accent)] mb-3">
            Events &amp; Dispatch
          </p>
          <h2 className="font-head font-semibold text-3xl sm:text-4xl tracking-tight leading-[1.15]">
            Highlights, Workshops &amp; Stories From IT-CLUB
          </h2>
        </div>

        <div className="lg:col-span-5 flex flex-col sm:items-end gap-4">
          <p className="text-sm text-[var(--body)] lg:text-right max-w-md leading-relaxed">
            Upcoming hands-on workshops, open-source releases, and engineering recaps from our campus squads.
          </p>

          {/* Interactive Filter Segmented Control */}
          <div
            className="inline-flex items-center gap-1 p-1 rounded-xl glass-surface self-start sm:self-end overflow-x-auto max-w-full"
            role="tablist"
            aria-label="Filter club events and stories"
          >
            {CATEGORIES.map((category) => {
              const active = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(category)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#017278] text-white shadow-sm'
                      : 'text-[var(--mute)] hover:text-[var(--ink)]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Editorial Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {visibleStories.map((story, idx) => {
            const isRsvped = rsvpedIds.includes(story.id);
            return (
              <motion.article
                key={story.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{
                  duration: 0.35,
                  delay: idx * 0.04,
                  ease: EASE_OUT_EXPO,
                }}
                whileHover={{ y: -4 }}
                className="group flex flex-col rounded-2xl overflow-hidden panel-surface"
              >
                <button
                  type="button"
                  onClick={() => onSelectStory(story)}
                  className="text-left flex flex-col flex-1 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--brand-ring)] rounded-2xl"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden">
                    <ResilientImage
                      src={story.image}
                      alt={story.title}
                      fallbackLabel={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      {/* Clean Unboxed Metadata with Typographic Separators */}
                      <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-[var(--mute)] font-mono-tabular">
                        <span className="font-medium text-[var(--brand-accent)]">
                          {story.category}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{story.date}</span>
                        <span aria-hidden="true">·</span>
                        <span>{story.readTime}</span>
                      </div>

                      <h3 className="mt-3 font-head font-semibold text-lg text-[var(--ink)] leading-snug group-hover:text-[var(--brand-accent)] transition-colors">
                        {story.title}
                      </h3>

                      <p className="mt-2.5 text-sm text-[var(--body)] leading-relaxed line-clamp-3">
                        {story.excerpt}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
                      {isRsvped ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium status-ok">
                          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Seat Reserved</span>
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-[var(--mute)]">
                          {story.location}
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-accent)] whitespace-nowrap">
                        <span>Read Details</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </button>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Attributable Alumni Proof Block */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={REVEAL_VIEWPORT}
        custom={0.08}
        className="mt-14 rounded-2xl glass-surface p-6 sm:p-8 lg:p-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <blockquote className="text-base sm:text-lg text-[var(--ink)] leading-relaxed font-medium">
              &ldquo;{CLUB_TESTIMONIAL.quote}&rdquo;
            </blockquote>
          </div>
          <div className="lg:col-span-4 lg:text-right lg:pl-6 lg:border-l lg:border-[var(--border-subtle)]">
            <p className="font-head font-semibold text-sm text-[var(--ink)]">
              {CLUB_TESTIMONIAL.author}
            </p>
            <p className="text-xs text-[var(--mute)] mt-1">
              {CLUB_TESTIMONIAL.role}
            </p>
            <p className="text-xs font-mono-tabular text-[var(--brand-accent)] mt-0.5">
              {CLUB_TESTIMONIAL.cohort}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
