import { motion } from 'framer-motion';
import { Users, MessageCircle, Globe, Star } from 'lucide-react';
import { staggerContainer, fadeInUp, viewportOptions } from '@/lib/animations';

const STATS = [
  { icon: Users, label: 'Active Users', value: '4.9M+', sub: 'Across India', color: 'text-indigo-400', bg: 'from-indigo-500/20 to-indigo-600/5' },
  { icon: MessageCircle, label: 'Messages Daily', value: '2.4M+', sub: 'Real-time delivery', color: 'text-cyan-400', bg: 'from-cyan-500/20 to-cyan-600/5' },
  { icon: Globe, label: 'Communities', value: '850K+', sub: 'Public & private', color: 'text-purple-400', bg: 'from-purple-500/20 to-purple-600/5' },
  { icon: Star, label: 'App Rating', value: '4.8/5', sub: 'On Play Store', color: 'text-yellow-400', bg: 'from-yellow-500/20 to-yellow-600/5' },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-[#0a0e1a] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map(({ icon: Icon, label, value, sub, color, bg }) => (
            <motion.div key={label} variants={fadeInUp}
              className={`p-6 rounded-2xl bg-gradient-to-br ${bg} border border-white/5 text-center group hover:-translate-y-1 transition-all duration-300`}>
              <div className={`flex justify-center mb-3 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className={`text-3xl font-bold ${color} font-['Space_Grotesk'] mb-1`}>{value}</div>
              <div className="text-sm font-semibold text-white mb-1">{label}</div>
              <div className="text-xs text-gray-500">{sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
