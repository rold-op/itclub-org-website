import { CLUB_LOGO } from '../data/clubData';

interface FooterProps {
  onOpenJoin: () => void;
  onOpenCharter: () => void;
}

export function Footer({
  onOpenJoin,
  onOpenCharter,
}: FooterProps) {
  return (
    <footer className="mt-8 border-t border-[var(--border-subtle)] bg-[var(--panel-bg)]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Summary */}
          <div className="md:col-span-5">
            <a
              href="#"
              className="inline-flex items-center gap-3 font-head font-bold text-lg text-[var(--ink)] tracking-tight"
            >
              <span className="w-10 h-10 rounded-full bg-white p-0.5 border border-[var(--border-subtle)] flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                <img
                  src={CLUB_LOGO}
                  alt="Information Technology Club official logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
              </span>
              <span>IT-CLUB</span>
            </a>
            <p className="mt-3 text-sm text-[var(--body)] max-w-sm leading-relaxed">
              Student-led software engineering, applied AI, cybersecurity, and hardware prototyping organization.
            </p>
            <p className="mt-3 text-xs font-mono-tabular text-[var(--mute)]">
              Engineering Hall 304 · Open Tue–Fri, 16:30–20:30
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--mute)]">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-[var(--body)]">
              <li>
                <a href="#about" className="hover:text-[var(--brand-accent)] transition-colors">
                  Who We Are
                </a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-[var(--brand-accent)] transition-colors">
                  Engineering Tracks
                </a>
              </li>
              <li>
                <a href="#pillars" className="hover:text-[var(--brand-accent)] transition-colors">
                  Core Pillars
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-[var(--brand-accent)] transition-colors">
                  Workshops &amp; Dispatch
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Actions */}
          <div className="md:col-span-4 space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--mute)]">
              Membership
            </h3>
            <ul className="space-y-2 text-sm text-[var(--body)]">
              <li>
                <button
                  type="button"
                  onClick={onOpenJoin}
                  className="hover:text-[var(--brand-accent)] transition-colors cursor-pointer text-left"
                >
                  Apply for Fall / Spring Cohort
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenCharter}
                  className="hover:text-[var(--brand-accent)] transition-colors cursor-pointer text-left"
                >
                  Club Charter &amp; Open-Source Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--mute)]">
          <p>©2026 IT-Club Organization.</p>
          <a
            href="mailto:itcluborg.2022@gmail.com"
            className="font-mono-tabular hover:text-[var(--brand-accent)] transition-colors"
          >
            itcluborg.2022@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
