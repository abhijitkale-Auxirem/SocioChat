import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PricingSection from '@/components/features/PricingSection';
import { staggerContainer, fadeInUp, viewportOptions } from '@/lib/animations';
import { Check, X } from 'lucide-react';

const COMPARISON = [
  { feature: 'Messaging', free: true, pro: true, creator: true },
  { feature: 'Communities', free: '5 max', pro: 'Unlimited', creator: 'Unlimited' },
  { feature: 'Storage', free: '100 MB', pro: '10 GB', creator: '50 GB' },
  { feature: 'Video Calls', free: '1-to-1', pro: 'Group up to 20', creator: 'Group up to 100' },
  { feature: 'Analytics', free: false, pro: 'Basic', creator: 'Advanced' },
  { feature: 'Verified Badge', free: false, pro: false, creator: true },
  { feature: 'Monetization', free: false, pro: false, creator: true },
  { feature: 'Priority Support', free: false, pro: true, creator: true },
  { feature: 'Custom Themes', free: false, pro: true, creator: true },
];

export default function Pricing() {
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-16 text-center relative overflow-hidden">
        <div className="absolute top-20 left-1/3 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-indigo-400 font-medium mb-6">Transparent Pricing</span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 font-['Space_Grotesk']">Simple, <span className="gradient-text">Honest Pricing</span></h1>
            <p className="text-xl text-gray-400">No hidden fees. No surprises. Start free and upgrade as you grow. All prices in Indian Rupees.</p>
          </motion.div>
        </div>
      </section>

      <PricingSection />

      <section className="py-20 bg-[#0a0e1a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white font-['Space_Grotesk']">Detailed Plan <span className="gradient-text">Comparison</span></h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer} className="glass-dark rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 bg-white/5 px-6 py-4">
              <div className="text-sm font-semibold text-gray-400">Feature</div>
              {['Free', 'Pro', 'Creator'].map(p => <div key={p} className="text-sm font-semibold text-white text-center">{p}</div>)}
            </div>
            {COMPARISON.map((row, i) => (
              <motion.div key={row.feature} variants={fadeInUp}
                className={`grid grid-cols-4 px-6 py-4 border-t border-white/5 ${i % 2 === 0 ? '' : 'bg-white/2'}`}>
                <div className="text-sm text-gray-300">{row.feature}</div>
                {[row.free, row.pro, row.creator].map((val, j) => (
                  <div key={j} className="flex justify-center items-center">
                    {typeof val === 'boolean' ? (
                      val ? <Check className="w-4 h-4 text-green-400" /> : <X className="w-4 h-4 text-gray-600" />
                    ) : (
                      <span className="text-xs text-indigo-400 font-medium text-center">{val}</span>
                    )}
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#070b18]">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 font-['Space_Grotesk']">Frequently Asked <span className="gradient-text">Questions</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ['Can I change plans anytime?', 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'],
              ['Is there a free trial for paid plans?', 'Yes, we offer a 14-day free trial for Pro and Creator plans — no credit card required.'],
              ['How does community monetization work?', 'Creators can charge members for exclusive communities, receive tips, and run sponsored content.'],
              ['What payment methods do you accept?', 'We accept UPI, Net Banking, all major credit/debit cards, and popular Indian payment apps.'],
            ].map(([q, a]) => (
              <div key={q} className="p-6 glass-dark rounded-2xl">
                <h3 className="text-base font-semibold text-white mb-2 font-['Space_Grotesk']">{q}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
