import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { EASE_OUT_EXPO, REVEAL_VIEWPORT } from '../lib/motion';

interface BannerCtaProps {
  onOpenJoin: () => void;
}

export function BannerCta({ onOpenJoin }: BannerCtaProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1280px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={REVEAL_VIEWPORT}
        transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#014E52] via-[#017278] to-[#111827] px-6 py-12 sm:px-12 sm:py-16 text-center shadow-sm"
      >
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2
            className="font-head font-semibold text-2xl sm:text-3xl lg:text-[34px] text-white tracking-tight leading-[1.2]"
            style={{ textWrap: 'balance' }}
          >
            Experience collaborative software and hardware engineering with peers guiding every step of your first pull request.
          </h2>

          <div className="mt-8 flex justify-center">
            <motion.button
              type="button"
              onClick={onOpenJoin}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
              className="group inline-flex items-center gap-3 bg-white text-[#111827] hover:bg-[#F8FAFC] pl-5 pr-1.5 py-1.5 rounded-full text-sm font-semibold transition-colors duration-150 cursor-pointer whitespace-nowrap shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2DD4BF]"
            >
              <span>Apply for Membership</span>
              <span className="w-8 h-8 rounded-full bg-[#017278] group-hover:bg-[#02858C] text-white flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
