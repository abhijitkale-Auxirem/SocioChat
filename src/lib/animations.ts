import type { Variants } from 'framer-motion';

// Standard easing cubic-bezier equivalents for strict TypeScript compatibility
const easeOutCubic = [0.25, 0.46, 0.45, 0.94] as const;
const easeInCubic = [0.42, 0, 1, 1] as const;
const easeInOutCubic = [0.42, 0, 0.58, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutCubic } },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOutCubic } },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOutCubic } },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOutCubic } },
};

export const slideInFromBottom: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const cardHover: Variants = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.03, y: -6, transition: { duration: 0.25, ease: easeOutCubic } },
};

export const buttonHover: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.97 },
};

export const viewportOptions = { once: true, margin: '-80px' } as const;
