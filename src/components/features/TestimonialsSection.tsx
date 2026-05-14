import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { staggerContainer, fadeInUp, viewportOptions } from '@/lib/animations';
import { MOCK_TESTIMONIALS } from '@/lib/mockData';

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-[#080c1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-cyan-400 font-medium mb-4">Testimonials</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-['Space_Grotesk']">What Our <span className="gradient-text">Community Says</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Trusted by millions of users across India. Here's what they have to say about SocioChat.</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_TESTIMONIALS.map(t => (
            <motion.div key={t.id} variants={fadeInUp}
              className="p-8 glass-dark rounded-2xl hover:border-indigo-400/30 transition-all duration-300 relative group">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-indigo-400/20 group-hover:text-indigo-400/40 transition-colors" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
              </div>
              <p className="text-gray-300 leading-relaxed mb-6 text-base">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400/50" />
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
