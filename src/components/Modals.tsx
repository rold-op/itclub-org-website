import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MapPin,
  User,
  ArrowRight,
  Clock,
} from 'lucide-react';
import {
  ENGINEERING_TRACKS,
  type EngineeringTrack,
  type ClubEventStory,
} from '../data/clubData';
import { EASE_OUT_EXPO } from '../lib/motion';
import { ResilientImage } from './ResilientImage';

interface ModalBackdropProps {
  onClose: () => void;
  titleId: string;
  children: React.ReactNode;
}

function ModalBackdrop({ onClose, titleId, children }: ModalBackdropProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      style={{
        backgroundColor: 'var(--backdrop-bg)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
        className="modal-surface w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-auto"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* 1. Membership Application Modal */
interface JoinModalProps {
  initialTrackId?: string;
  onClose: () => void;
}

export function JoinModal({ initialTrackId, onClose }: JoinModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [year, setYear] = useState('Sophomore (2nd Year)');
  const [trackId, setTrackId] = useState(
    initialTrackId || ENGINEERING_TRACKS[0].id
  );
  const [githubUrl, setGithubUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (trimmedName.length < 2) {
      setError('Please enter your full name.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setError('Please enter a valid university or personal email address.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  const selectedTrack =
    ENGINEERING_TRACKS.find((t) => t.id === trackId) || ENGINEERING_TRACKS[0];

  return (
    <ModalBackdrop onClose={onClose} titleId="join-modal-title">
      <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-subtle)]">
        <div>
          <h2 id="join-modal-title" className="font-head font-semibold text-xl">
            Apply for IT-CLUB Membership
          </h2>
          <p className="text-xs text-[var(--mute)] mt-0.5">
            Open to all majors and experience levels · Fall &amp; Spring Cohorts
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close membership form"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--brand-soft)] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {submitted ? (
        <div className="p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold status-ok mb-4">
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            <span>Application Recorded</span>
          </div>

          <h3 className="font-head font-semibold text-2xl text-[var(--ink)]">
            Welcome, {fullName.trim()}
          </h3>
          <p className="mt-2 text-sm text-[var(--body)] leading-relaxed">
            Your interest for the{' '}
            <strong className="text-[var(--ink)]">{selectedTrack.title}</strong>{' '}
            track has been logged for{' '}
            <span className="font-mono-tabular text-[var(--ink)]">{email.trim()}</span>.
          </p>

          <div className="mt-5 p-4 rounded-xl subcard-surface space-y-2 text-sm">
            <div className="flex items-center gap-2 text-[var(--ink)] font-medium">
              <Calendar className="w-4 h-4 text-[var(--brand-accent)]" aria-hidden="true" />
              <span>Next Orientation Session: {selectedTrack.schedule}</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--body)]">
              <MapPin className="w-4 h-4 text-[var(--brand-accent)]" aria-hidden="true" />
              <span>Location: {selectedTrack.room} · Track Lead: {selectedTrack.lead}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#017278] hover:bg-[#015E63] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
          {error && (
            <div
              role="alert"
              className="flex items-center gap-2.5 p-3 rounded-xl text-xs font-medium status-bad"
            >
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="member-name"
                className="block text-xs font-medium text-[var(--ink)] mb-1.5"
              >
                Full Name
              </label>
              <input
                id="member-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jordan Rivera"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm input-f"
              />
            </div>

            <div>
              <label
                htmlFor="member-email"
                className="block text-xs font-medium text-[var(--ink)] mb-1.5"
              >
                Email Address
              </label>
              <input
                id="member-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="j.rivera@university.edu"
                className="w-full px-3.5 py-2.5 rounded-xl text-sm input-f"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="member-year"
                className="block text-xs font-medium text-[var(--ink)] mb-1.5"
              >
                Academic Standing
              </label>
              <select
                id="member-year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm input-f cursor-pointer"
              >
                <option value="Freshman (1st Year)">Freshman (1st Year)</option>
                <option value="Sophomore (2nd Year)">Sophomore (2nd Year)</option>
                <option value="Junior (3rd Year)">Junior (3rd Year)</option>
                <option value="Senior (4th Year)">Senior (4th Year)</option>
                <option value="Graduate Researcher">Graduate Researcher</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="member-track"
                className="block text-xs font-medium text-[var(--ink)] mb-1.5"
              >
                Primary Engineering Track
              </label>
              <select
                id="member-track"
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm input-f cursor-pointer"
              >
                {ENGINEERING_TRACKS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="member-github"
              className="block text-xs font-medium text-[var(--ink)] mb-1.5"
            >
              GitHub or Portfolio URL (Optional)
            </label>
            <input
              id="member-github"
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username"
              className="w-full px-3.5 py-2.5 rounded-xl text-sm input-f"
            />
          </div>

          <div>
            <label
              htmlFor="member-notes"
              className="block text-xs font-medium text-[var(--ink)] mb-1.5"
            >
              What do you want to build or learn this semester?
            </label>
            <textarea
              id="member-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Interested in contributing to campus open-source APIs or embedded sensor firmware..."
              className="w-full px-3.5 py-2.5 rounded-xl text-sm input-f resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] bg-transparent transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#017278] hover:bg-[#015E63] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <span>Submit Application</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </form>
      )}
    </ModalBackdrop>
  );
}

/* 2. Track Detail Modal */
interface TrackDetailModalProps {
  track: EngineeringTrack;
  onClose: () => void;
  onApplyForTrack: (trackId: string) => void;
}

export function TrackDetailModal({
  track,
  onClose,
  onApplyForTrack,
}: TrackDetailModalProps) {
  return (
    <ModalBackdrop onClose={onClose} titleId="track-modal-title">
      <div className="relative h-52 sm:h-60 w-full overflow-hidden">
        <ResilientImage
          src={track.image}
          alt={track.title}
          fallbackLabel={track.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/90 via-[#0D1117]/35 to-transparent"
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close track details"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/75 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="absolute bottom-5 left-6 right-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium status-ok mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{track.capacityStatus} Cohort</span>
          </div>
          <h2 id="track-modal-title" className="font-head font-semibold text-2xl text-white">
            {track.title}
          </h2>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <p className="text-sm sm:text-base text-[var(--body)] leading-relaxed">
          {track.shortDesc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl subcard-surface">
            <p className="text-xs text-[var(--mute)] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[var(--brand-accent)]" aria-hidden="true" />
              <span>Schedule</span>
            </p>
            <p className="mt-1 text-xs font-medium text-[var(--ink)] font-mono-tabular">
              {track.schedule}
            </p>
          </div>
          <div className="p-3.5 rounded-xl subcard-surface">
            <p className="text-xs text-[var(--mute)] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[var(--brand-accent)]" aria-hidden="true" />
              <span>Lab Room</span>
            </p>
            <p className="mt-1 text-xs font-medium text-[var(--ink)]">{track.room}</p>
          </div>
          <div className="p-3.5 rounded-xl subcard-surface">
            <p className="text-xs text-[var(--mute)] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[var(--brand-accent)]" aria-hidden="true" />
              <span>Track Lead</span>
            </p>
            <p className="mt-1 text-xs font-medium text-[var(--ink)]">{track.lead}</p>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--mute)] mb-2">
            Core Technologies
          </h3>
          <p className="text-sm font-mono-tabular text-[var(--ink)]">
            {track.stack.join(' · ')}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--mute)] mb-2.5">
            Active Squad Projects
          </h3>
          <div className="space-y-2.5">
            {track.projects.map((proj) => (
              <div
                key={proj.name}
                className="p-3.5 rounded-xl subcard-surface flex flex-col sm:flex-row sm:items-center justify-between gap-1"
              >
                <span className="font-head font-semibold text-sm text-[var(--ink)]">
                  {proj.name}
                </span>
                <span className="text-xs text-[var(--body)]">{proj.outcome}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] bg-transparent transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onApplyForTrack(track.id)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#017278] hover:bg-[#015E63] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            <span>Join This Track</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
}

/* 3. Story / Event Reader Modal */
interface StoryModalProps {
  story: ClubEventStory;
  isRsvped: boolean;
  onToggleRsvp: (storyId: string) => void;
  onClose: () => void;
}

export function StoryModal({
  story,
  isRsvped,
  onToggleRsvp,
  onClose,
}: StoryModalProps) {
  return (
    <ModalBackdrop onClose={onClose} titleId="story-modal-title">
      <div className="relative h-52 sm:h-60 w-full overflow-hidden">
        <ResilientImage
          src={story.image}
          alt={story.title}
          fallbackLabel={story.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0D1117]/90 via-[#0D1117]/35 to-transparent"
          aria-hidden="true"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close event details"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/75 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="absolute bottom-5 left-6 right-6">
          <div className="flex items-center gap-2 text-xs text-slate-200 font-mono-tabular mb-1.5">
            <span className="text-teal-300 font-semibold">{story.category}</span>
            <span aria-hidden="true">·</span>
            <span>{story.date}</span>
            <span aria-hidden="true">·</span>
            <span>{story.readTime}</span>
          </div>
          <h2 id="story-modal-title" className="font-head font-semibold text-xl sm:text-2xl text-white leading-snug">
            {story.title}
          </h2>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--mute)] pb-4 border-b border-[var(--border-subtle)]">
          <span className="inline-flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[var(--brand-accent)]" aria-hidden="true" />
            <span>{story.speaker}</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[var(--brand-accent)]" aria-hidden="true" />
            <span>{story.location}</span>
          </span>
        </div>

        <div className="space-y-3 text-sm sm:text-base text-[var(--body)] leading-relaxed">
          {story.fullStory.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        <div className="p-4 rounded-xl subcard-surface">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--mute)] mb-2.5">
            Session Highlights &amp; Agenda
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--ink)]">
            {story.agenda.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-[var(--brand-accent)]" aria-hidden="true">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-2 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-sm font-medium text-[#94A3B8] hover:text-[#F8FAFC] bg-transparent transition-colors cursor-pointer"
          >
            Close
          </button>

          {story.registrationState !== 'Recap' ? (
            <button
              type="button"
              onClick={() => onToggleRsvp(story.id)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                isRsvped
                  ? 'status-ok'
                  : 'bg-[#017278] hover:bg-[#015E63] text-white'
              }`}
            >
              {isRsvped ? (
                <>
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>Seat Reserved (Click to Cancel)</span>
                </>
              ) : (
                <>
                  <span>Reserve Workshop Seat</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium status-new">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Published Recap</span>
            </span>
          )}
        </div>
      </div>
    </ModalBackdrop>
  );
}

/* 4. Club Charter Modal */
interface CharterModalProps {
  onClose: () => void;
  onOpenJoin: () => void;
}

export function CharterModal({ onClose, onOpenJoin }: CharterModalProps) {
  return (
    <ModalBackdrop onClose={onClose} titleId="charter-modal-title">
      <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-subtle)]">
        <div>
          <h2 id="charter-modal-title" className="font-head font-semibold text-xl">
            IT-CLUB Charter &amp; Engineering Principles
          </h2>
          <p className="text-xs text-[var(--mute)] mt-0.5">
            Student Governance · Open-Source Policy · Lab Conduct
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close charter"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--brand-soft)] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-5 text-sm text-[var(--body)] leading-relaxed">
        <div className="p-4 rounded-xl subcard-surface">
          <h3 className="font-head font-semibold text-base text-[var(--ink)]">
            01. Open by Default
          </h3>
          <p className="mt-1.5">
            All non-sensitive club software, PCB designs, and workshop notes are published under permissive open-source licenses (MIT or Apache-2.0) so incoming cohorts can fork and build on prior semesters.
          </p>
        </div>

        <div className="p-4 rounded-xl subcard-surface">
          <h3 className="font-head font-semibold text-base text-[var(--ink)]">
            02. Mentorship Without Gatekeeping
          </h3>
          <p className="mt-1.5">
            No entrance exams or prior portfolio requirements exist for general membership. First-year students start with guided pair-programming and structured code reviews.
          </p>
        </div>

        <div className="p-4 rounded-xl subcard-surface">
          <h3 className="font-head font-semibold text-base text-[var(--ink)]">
            03. Responsible Security &amp; Compute Use
          </h3>
          <p className="mt-1.5">
            Cybersecurity exercises run strictly within isolated club lab networks. Shared GPU and cluster resources are allocated fairly by student track leads for research and campus tooling.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-sm font-medium text-[#64748B] hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] bg-transparent transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenJoin();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#017278] hover:bg-[#015E63] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            <span>Apply for Membership</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
}
