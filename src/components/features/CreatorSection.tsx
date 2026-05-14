import { motion } from 'framer-motion';
import { TrendingUp, IndianRupee, BadgeCheck, BarChart2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeInLeft, fadeInRight, viewportOptions } from '@/lib/animations';

const CREATOR_TOOLS = [
  { icon: BadgeCheck, label: 'Verified Creator Badge', color: 'text-indigo-400' },
  { icon: IndianRupee, label: 'Monetization Tools', color: 'text-green-400' },
  { icon: BarChart2, label: 'Deep Analytics Dashboard', color: 'text-cyan-400' },
  { icon: TrendingUp, label: 'Audience Growth Insights', color: 'text-purple-400' },
];

export default function CreatorSection() {
  return (
    <section className="py-24 bg-[#080c1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInLeft}>
            <div className="relative rounded-2xl overflow-hidden">
              <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=500&fit=crop" alt="Creator Tools" className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080c1a] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-white">Monthly Earnings</span>
                    <span className="text-xs text-green-400">+28% this month</span>
                  </div>
                  <div className="text-3xl font-bold text-white font-['Space_Grotesk']">₹84,500</div>
                  <div className="h-1.5 bg-white/10 rounded-full mt-3">
                    <div className="h-full w-3/4 gradient-primary rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInRight}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-indigo-400 font-medium mb-6">For Creators</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-['Space_Grotesk']">Turn Your <span className="gradient-text">Passion Into Profit</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">SocioChat gives creators everything they need to build an audience, engage followers, and generate real income through community monetization.</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {CREATOR_TOOLS.map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-3 p-4 glass-dark rounded-xl">
                  <Icon className={`w-5 h-5 ${color} shrink-0`} />
                  <span className="text-sm text-gray-300">{label}</span>
                </div>
              ))}
            </div>
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 gradient-primary text-white font-semibold rounded-2xl text-base shadow-xl shadow-indigo-500/30 hover:scale-105 transition-all duration-300">
              Start Creating <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
