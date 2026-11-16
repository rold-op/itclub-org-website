import { useState } from 'react';
import { MotionConfig, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PartnerStrip } from './components/PartnerStrip';
import { AboutSection } from './components/AboutSection';
import { TracksSection } from './components/TracksSection';
import { PillarsSection } from './components/PillarsSection';
import { BannerCta } from './components/BannerCta';
import { EventsSection } from './components/EventsSection';
import { Footer } from './components/Footer';
import {
  JoinModal,
  TrackDetailModal,
  StoryModal,
  CharterModal,
} from './components/Modals';
import type { EngineeringTrack, ClubEventStory } from './data/clubData';

export default function App() {
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [preselectedTrackId, setPreselectedTrackId] = useState<string | undefined>(undefined);
  const [selectedTrack, setSelectedTrack] = useState<EngineeringTrack | null>(null);
  const [selectedStory, setSelectedStory] = useState<ClubEventStory | null>(null);
  const [charterOpen, setCharterOpen] = useState(false);
  const [rsvpedIds, setRsvpedIds] = useState<string[]>([]);

  const handleOpenJoin = (trackId?: string) => {
    setPreselectedTrackId(trackId);
    setSelectedTrack(null);
    setJoinModalOpen(true);
  };

  const handleToggleRsvp = (storyId: string) => {
    setRsvpedIds((prev) =>
      prev.includes(storyId)
        ? prev.filter((id) => id !== storyId)
        : [...prev, storyId]
    );
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[var(--bg-canvas)] text-[var(--body)]">
        <main className="flex-1">
          <Navbar onOpenJoin={() => handleOpenJoin()} />

          <HeroSection />

          <PartnerStrip />

          <AboutSection onOpenCharter={() => setCharterOpen(true)} />

          <TracksSection
            onSelectTrack={(track) => setSelectedTrack(track)}
            onOpenJoin={() => handleOpenJoin()}
          />

          <PillarsSection />

          <BannerCta onOpenJoin={() => handleOpenJoin()} />

          <EventsSection
            rsvpedIds={rsvpedIds}
            onSelectStory={(story) => setSelectedStory(story)}
          />
        </main>

        <Footer
          onOpenJoin={() => handleOpenJoin()}
          onOpenCharter={() => setCharterOpen(true)}
        />

        <AnimatePresence>
          {joinModalOpen && (
            <JoinModal
              key="join-modal"
              initialTrackId={preselectedTrackId}
              onClose={() => setJoinModalOpen(false)}
            />
          )}

          {selectedTrack && (
            <TrackDetailModal
              key={`track-${selectedTrack.id}`}
              track={selectedTrack}
              onClose={() => setSelectedTrack(null)}
              onApplyForTrack={(id) => handleOpenJoin(id)}
            />
          )}

          {selectedStory && (
            <StoryModal
              key={`story-${selectedStory.id}`}
              story={selectedStory}
              isRsvped={rsvpedIds.includes(selectedStory.id)}
              onToggleRsvp={handleToggleRsvp}
              onClose={() => setSelectedStory(null)}
            />
          )}

          {charterOpen && (
            <CharterModal
              key="charter-modal"
              onClose={() => setCharterOpen(false)}
              onOpenJoin={() => handleOpenJoin()}
            />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
