import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';

export default function Accessibility() {
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-4 font-['Space_Grotesk']">Accessibility <span className="gradient-text">Statement</span></h1>
            <p className="text-gray-400 mb-10">SocioChat is committed to ensuring digital accessibility for people with disabilities.</p>
          </motion.div>
          <div className="glass-dark rounded-3xl p-8 space-y-6">
            {[
              ['WCAG Compliance', 'We strive to meet WCAG 2.1 Level AA standards across our web and mobile applications.'],
              ['Screen Reader Support', 'SocioChat is designed to be compatible with major screen readers including NVDA, VoiceOver, and TalkBack.'],
              ['Keyboard Navigation', 'All features of SocioChat are accessible via keyboard navigation without requiring a mouse.'],
              ['Color & Contrast', 'We maintain minimum 4.5:1 color contrast ratios for all text content across the platform.'],
              ['Feedback', 'If you experience any accessibility barriers, please contact us at accessibility@sociochat.com'],
            ].map(([title, content]) => (
              <div key={title}>
                <h2 className="text-lg font-bold text-white mb-2 font-['Space_Grotesk']">{title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
