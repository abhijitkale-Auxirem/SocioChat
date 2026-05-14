import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { staggerContainer, fadeInUp, viewportOptions } from '@/lib/animations';
import { PRICING_PLANS } from '@/lib/mockData';

export default function PricingSection() {
  return (
    <section className="py-24 bg-[#070b18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-purple-400 font-medium mb-4">Simple Pricing</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-['Space_Grotesk']">Plans for <span className="gradient-text">Every Creator</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Start free, scale as you grow. All plans include core messaging and community features.</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRICING_PLANS.map(plan => (
            <motion.div key={plan.name} variants={fadeInUp}
              className={`relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${plan.highlighted ? 'gradient-primary shadow-2xl shadow-indigo-500/40 scale-105' : 'glass-dark hover:border-indigo-400/30'}`}>
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                  <Zap className="w-3 h-3" /> Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2 font-['Space_Grotesk']">{plan.name}</h3>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold text-white font-['Space_Grotesk']">
                    {plan.price === 0 ? 'Free' : `₹${plan.price}`}
                  </span>
                  {plan.price > 0 && <span className="text-gray-300 mb-1">/{plan.period}</span>}
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className={`w-4 h-4 shrink-0 ${plan.highlighted ? 'text-white' : 'text-indigo-400'}`} />
                    <span className={plan.highlighted ? 'text-white/90' : 'text-gray-300'}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/register"
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${plan.highlighted ? 'bg-white text-indigo-600 hover:bg-gray-100' : 'border border-indigo-400/50 text-indigo-400 hover:bg-indigo-400/10'}`}>
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
