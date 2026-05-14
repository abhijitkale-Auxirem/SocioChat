import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { staggerContainer, fadeInUp, viewportOptions } from '@/lib/animations';
import { Users, Lock, Globe, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_COMMUNITIES } from '@/lib/mockData';

const CATEGORIES = ['All', 'Technology', 'Business', 'Design', 'Health', 'Entertainment', 'Food', 'Education', 'Sports', 'Music'];

const ALL_COMMUNITIES = [
  ...MOCK_COMMUNITIES,
  { id: '7', name: 'Education Hub', members: 52300, image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop', category: 'Education', type: 'Public' },
  { id: '8', name: 'Music Lovers', members: 29400, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop', category: 'Music', type: 'Public' },
  { id: '9', name: 'Sports Arena', members: 73100, image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=300&h=200&fit=crop', category: 'Sports', type: 'Public' },
];

export default function Communities() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = ALL_COMMUNITIES.filter(c =>
    (category === 'All' || c.category === category) &&
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-cyan-400 font-medium mb-6">Discover Communities</span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 font-['Space_Grotesk']">Find Your <span className="gradient-text">Tribe</span></h1>
            <p className="text-xl text-gray-400 mb-8">Explore 850,000+ communities across every interest. Join the conversation that matters to you.</p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search communities..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${category === cat ? 'gradient-primary text-white' : 'glass text-gray-400 hover:text-white hover:bg-white/10'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(community => (
              <motion.div key={community.id} variants={fadeInUp}
                className="group rounded-2xl overflow-hidden glass-dark hover:border-indigo-400/30 transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
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
                    <Link to="/register" className="px-4 py-1.5 gradient-primary text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-all">Join</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>No communities found matching your search.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
