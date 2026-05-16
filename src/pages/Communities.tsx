import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Lock, Globe, Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { staggerContainer, fadeInUp, viewportOptions } from '@/lib/animations';
import { MOCK_COMMUNITIES } from '@/lib/mockData';

const CATEGORIES = ['All', 'Technology', 'Business', 'Design', 'Health', 'Entertainment', 'Food', 'Education', 'Sports', 'Music'];

const ALL_COMMUNITIES = MOCK_COMMUNITIES;

export default function Communities() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Explicit functional conditional block matching logic
  const filteredCommunities = ALL_COMMUNITIES.filter(c => {
    const matchesCategory = activeCategory === 'All' || c.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#070b18] min-h-screen text-white selection:bg-indigo-500/30">
      <Navbar />
      
      {/* Visual Ambient Decorative Backdrops */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Hero Presentation Header Area */}
      <section className="pt-40 pb-12 relative z-10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs text-indigo-400 font-semibold mb-6 tracking-wide">
              Discover Communities
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 font-['Space_Grotesk'] tracking-tight">
              Find Your <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Tribe</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Explore 850,000+ communities across every interest. Join the conversation that matters to you.
            </p>
            
            {/* Search Module Controller element */}
            <div className="relative max-w-xl mx-auto group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Search communities by title..."
                className="w-full pl-12 pr-12 py-4 bg-[#0e1420]/80 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-all font-['Inter'] backdrop-blur-xl" 
              />
              {search && (
                <button 
                  onClick={() => setSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Functional Category Filter Chips bar */}
      <section className="pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2.5 flex-wrap justify-center sm:justify-start border-b border-white/5 pb-6">
            {CATEGORIES.map(cat => {
              const isSelected = activeCategory === cat;
              return (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 border ${
                    isSelected 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                      : 'bg-white/5 border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic Results Grid Display block */}
      <section className="py-8 pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Real-time structural metrics counters */}
          <div className="flex items-center gap-4 flex-wrap mb-8">

  <div className="flex items-center gap-2 text-[11px] text-slate-500">
    <Users className="w-3.5 h-3.5 text-indigo-400" />
    <span>
      {filteredCommunities.length}{" "}
      {filteredCommunities.length === 1
        ? "Community"
        : "Communities"}
    </span>
  </div>

  <div className="w-px h-3 bg-[#1e2433]" />

  <div className="flex items-center gap-2 text-[11px] text-slate-500">
    <Globe className="w-3.5 h-3.5 text-indigo-400" />
    <span>
      {activeCategory === "All"
        ? "All Topics"
        : activeCategory}
    </span>
  </div>

</div>
          <AnimatePresence mode="popLayout">
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={staggerContainer}
             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCommunities.map(community => (
                <motion.div 
                  key={community.id} 
                  variants={fadeInUp}
                  layout
className="group h-full rounded-2xl overflow-hidden bg-[#0d1527]/60 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 flex flex-col backdrop-blur-md"                >
                  {/* Media Cover Layer elements */}
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img 
                      src={community.image} 
                      alt={community.name} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b18] via-transparent to-transparent opacity-60" />
                    
                    {/* Security Access Badge Indicator row */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] uppercase font-black tracking-wider text-white border border-white/5">
                      {community.type === 'Public' ? (
                        <Globe className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Lock className="w-3 h-3 text-amber-400" />
                      )}
                      {community.type}
                    </div>

                    {/* Taxonomy Category Tag overlay over media view */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest bg-indigo-600/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md border border-indigo-400/20">
                        {community.category}
                      </span>
                    </div>
                  </div>

                  {/* Body Copy Card Block */}
                  <div className="p-5 flex flex-col flex-grow justify-between">
                    <h3 className="text-lg font-bold text-white mb-4 font-['Space_Grotesk'] group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {community.name}
                    </h3>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
                      <div className="flex items-center gap-2 text-sm text-gray-400 font-['Inter']">
                        <Users className="w-4 h-4 text-indigo-400/70" /> 
                        <span>{community.members.toLocaleString('en-US')} members</span>
                      </div>
                      <Link 
                        to="/register" 
                        className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all shadow-md shadow-indigo-600/10"
                      >
                        Join
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty Fallback Messaging Display anchor item */}
          {filteredCommunities.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 border border-white/5 rounded-2xl bg-white/[0.01]"
            >
              <Users className="w-12 h-12 mx-auto mb-4 opacity-20 text-indigo-400" />
              <h3 className="text-base font-bold text-gray-300 font-['Space_Grotesk'] mb-1">No Groups Discovered</h3>
              <p className="text-gray-500 text-sm font-['Inter'] mb-4">Try adjusting your keyword filter parameters.</p>
              <button 
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="text-xs font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Reset System Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}