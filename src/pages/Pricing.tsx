import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PricingSection from '@/components/features/PricingSection';
import { staggerContainer, fadeInUp, viewportOptions } from '@/lib/animations';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      

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
          <div className="space-y-4">
            {[
              ['Can I change plans anytime?', 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'],
              ['Is there a free trial for paid plans?', 'Yes, we offer a 14-day free trial for Pro and Creator plans — no credit card required.'],
              ['How does community monetization work?', 'Creators can charge members for exclusive communities, receive tips, and run sponsored content.'],
              ['What payment methods do you accept?', 'We accept all major credit/debit cards, PayPal, and popular payment apps worldwide.'],
            ].map(([q, a], i) => (
              <div key={q} className="glass-dark rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors">
                  <span className="text-base font-medium text-white pr-4">{q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-indigo-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
