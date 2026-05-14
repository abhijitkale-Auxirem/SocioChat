import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { staggerContainer, fadeInUp, viewportOptions } from '@/lib/animations';
import { Clock, Search, ArrowRight } from 'lucide-react';
import { MOCK_BLOGS } from '@/lib/mockData';

const CATEGORIES = ['All', 'Technology', 'Creator Tips', 'Security', 'Growth', 'Community'];

const EXTRA_BLOGS = [
  { id: '5', title: 'Voice & Video Calls: Best Practices on SocioChat', excerpt: 'Get the most out of SocioChat video calls with these expert tips for Indian network conditions.', image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop', author: { name: 'Arjun Mehta', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face' }, category: 'Technology', readTime: '4 min', date: 'May 1, 2026', tags: [] },
  { id: '6', title: 'Moderation Tools Every Community Admin Should Use', excerpt: 'Keep your SocioChat community healthy and safe with these powerful moderation features.', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop', author: { name: 'Neha Singh', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face' }, category: 'Community', readTime: '6 min', date: 'Apr 28, 2026', tags: [] },
];

export default function Blog() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const ALL_BLOGS = [...MOCK_BLOGS, ...EXTRA_BLOGS];

  const filtered = ALL_BLOGS.filter(b =>
    (category === 'All' || b.category === category) &&
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute top-20 left-1/3 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-purple-400 font-medium mb-6">SocioChat Blog</span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 font-['Space_Grotesk']">Insights & <span className="gradient-text">Stories</span></h1>
            <p className="text-xl text-gray-400 mb-8">Tips, guides, and stories from the SocioChat team and creator community.</p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <motion.div key={post.id} variants={fadeInUp}
                className="group glass-dark rounded-2xl overflow-hidden hover:border-indigo-400/30 transition-all duration-300 hover:-translate-y-2">
                <div className="h-52 overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs bg-indigo-500/90 text-white px-2.5 py-1 rounded-full">{post.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-3 leading-snug group-hover:text-indigo-400 transition-colors font-['Space_Grotesk']">{post.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-xs text-gray-400">{post.author.name}</span>
                    </div>
                    <Link to={`/blog/${post.id}`} className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                      Read <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
