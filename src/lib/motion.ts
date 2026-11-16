export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const REVEAL_VIEWPORT = {
  once: true,
  amount: 0.12 as const,
};

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.52,
      delay,
      ease: EASE_OUT_EXPO,
    },
  }),
};

export const cardHoverTransition = {
  duration: 0.2,
  ease: EASE_OUT_EXPO,
};
