import { motion } from 'framer-motion';
import { Users, Lock, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { staggerContainer, fadeInUp, viewportOptions } from '@/lib/animations';
import { MOCK_COMMUNITIES } from '@/lib/mockData';

export default function CommunitiesShowcase() {
  return (
    <section className="py-24 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-indigo-400 font-medium mb-4">Discover</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white font-['Space_Grotesk']">Trending <span className="gradient-text">Communities</span></h2>
            <p className="text-gray-400 text-lg mt-3 max-w-xl">Join thousands of thriving communities across India. Find your tribe today.</p>
          </div>
          <Link to="/communities" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors shrink-0">
            View All Communities <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_COMMUNITIES.map(community => (
            <motion.div key={community.id} variants={fadeInUp}
              className="group rounded-2xl overflow-hidden glass-dark hover:border-indigo-400/30 transition-all duration-300 hover:-translate-y-2 cursor-pointer">
              <div className="relative h-44 overflow-hidden">
                <img src={community.image} alt={community.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs text-white">
                  {community.type === 'Public' ? <Globe className="w-3 h-3 text-green-400" /> : <Lock className="w-3 h-3 text-yellow-400" />}
                  {community.type}
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs bg-indigo-500/80 text-white px-2.5 py-1 rounded-full">{community.category}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white mb-2 font-['Space_Grotesk'] group-hover:text-indigo-400 transition-colors">{community.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="w-4 h-4" /> {community.members.toLocaleString('en-IN')} members
                  </div>
                  <Link to="/register" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">Join Now</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
