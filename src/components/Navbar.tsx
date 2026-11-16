import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { CLUB_LOGO } from '../data/clubData';
import { EASE_OUT_EXPO } from '../lib/motion';

interface NavbarProps {
  onOpenJoin: () => void;
}

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Pillars', href: '#pillars' },
  { label: 'Events', href: '#events' },
];

export function Navbar({ onOpenJoin }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-40 w-full">
      <header
        className={`w-full rounded-none border-0 transition-all duration-200 ${
          scrolled
            ? 'bg-[rgba(13,17,23,0.72)] backdrop-blur-[30px] backdrop-saturate-150'
            : 'bg-transparent'
        }`}
        style={
          scrolled
            ? {
                backdropFilter: 'blur(30px) saturate(160%)',
                WebkitBackdropFilter: 'blur(30px) saturate(160%)',
              }
            : undefined
        }
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 py-3 sm:py-3.5 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-3 text-white font-head font-bold text-base sm:text-lg tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] rounded-lg px-1"
          >
            <span className="w-9 h-9 rounded-full bg-white p-0.5 flex items-center justify-center shadow-sm overflow-hidden shrink-0">
              <img
                src={CLUB_LOGO}
                alt="Information Technology Club official logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </span>
            <span>IT-CLUB</span>
          </a>

          {/* Zone 2: 4 Clean Single-Line Nav Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-white/90"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap shrink-0 py-1 hover:text-white transition-colors relative after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[#2DD4BF] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF] rounded"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action Button + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenJoin}
              className="inline-flex items-center justify-center bg-white text-[#111827] hover:bg-[#F8FAFC] px-5 py-2 rounded-full text-sm font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
            >
              <span>Contact Us</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden w-9 h-9 rounded-full bg-white/15 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Glass Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
            className="w-full px-5 py-3 bg-[rgba(13,17,23,0.88)] backdrop-blur-[30px] backdrop-saturate-150 md:hidden"
            style={{
              backdropFilter: 'blur(30px) saturate(160%)',
              WebkitBackdropFilter: 'blur(30px) saturate(160%)',
            }}
          >
            <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-white/90 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
