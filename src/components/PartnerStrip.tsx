import { motion } from 'motion/react';
import { Cpu, Cloud, Shield, Database, Layers, GitBranch } from 'lucide-react';
import { PARTNER_ENTITIES } from '../data/clubData';
import { EASE_OUT_EXPO, REVEAL_VIEWPORT } from '../lib/motion';

const PARTNER_ICONS: Record<string, typeof Cpu> = {
  'os-lab': GitBranch,
  'cloud-guild': Cloud,
  'robotics-union': Cpu,
  'cybersec-soc': Shield,
  'dataworks': Database,
  'devforge': Layers,
};

export function PartnerStrip() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-14 max-w-[1280px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={REVEAL_VIEWPORT}
        transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        className="flex justify-center mb-8"
      >
        <p className="text-xs sm:text-sm font-medium text-[var(--mute)] text-center">
          Supported by University Engineering Labs &amp; Campus Guilds
        </p>
      </motion.div>

      {/* Monochrome Partner Marks Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 items-center">
        {PARTNER_ENTITIES.map((partner, index) => {
          const IconComponent = PARTNER_ICONS[partner.id] || Cpu;
          return (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 0.78, y: 0 }}
              whileHover={{ opacity: 1, y: -2 }}
              viewport={REVEAL_VIEWPORT}
              transition={{
                duration: 0.4,
                delay: index * 0.04,
                ease: EASE_OUT_EXPO,
              }}
              className="flex items-center justify-center gap-2.5 py-3 px-3 rounded-xl cursor-default"
            >
              <IconComponent
                className="w-5 h-5 text-[var(--brand-accent)] shrink-0"
                aria-hidden="true"
              />
              <span className="font-head font-semibold text-sm text-[var(--ink)] whitespace-nowrap">
                {partner.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
