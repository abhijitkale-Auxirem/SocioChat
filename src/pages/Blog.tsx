import { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Search, ArrowUpRight, Calendar, TrendingUp, BookOpen } from 'lucide-react';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MOCK_BLOGS } from '@/lib/mockData';

const CATEGORIES = ['All', 'Technology', 'Creator Tips', 'Security', 'Growth', 'Community'];

const EXTRA_BLOGS = [
  {
    id: '5',
    title: 'Voice & Video Calls: Best Practices on SocioChat',
    excerpt: 'Get the most out of SocioChat video calls with these expert tips for various network conditions.',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=500&fit=crop',
    author: { name: 'Arjun Mehta', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face' },
    category: 'Technology',
    readTime: '4 min',
    date: 'May 1, 2026',
    tags: [],
  },
  {
    id: '6',
    title: 'Moderation Tools Every Community Admin Should Use',
    excerpt: 'Keep your SocioChat community healthy and safe with these powerful moderation features.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
    author: { name: 'Neha Singh', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face' },
    category: 'Community',
    readTime: '6 min',
    date: 'Apr 28, 2026',
    tags: [],
  },
];

/* ─── tiny helpers ─── */
const pad = n => String(n).padStart(2, '0');

/* ─── Featured hero card (first post) ─── */
function HeroPost({ post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid md:grid-cols-5 gap-0 rounded-[2rem] overflow-hidden border border-[#1e2433] group"
    >
      {/* image — 3 cols */}
      <Link to={`/blog/${post.id}`} className="md:col-span-3 block aspect-[16/10] md:aspect-auto overflow-hidden relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        {/* dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#080c14]/80 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14]/80 to-transparent md:hidden" />
      </Link>

      {/* copy — 2 cols */}
      <div className="md:col-span-2 bg-[#080c14] flex flex-col justify-between p-8 md:p-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">
              Featured
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">{post.category}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-['Syne'] font-bold leading-[1.15] text-white mb-5 group-hover:text-violet-300 transition-colors duration-300">
            <Link to={`/blog/${post.id}`}>{post.title}</Link>
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed font-['DM_Sans'] mb-8">{post.excerpt}</p>
        </div>

        <div className="space-y-6">
          <div className="h-px bg-[#1e2433]" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={post.author.avatar} alt={post.author.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-violet-500/20" />
              <div>
                <p className="text-[11px] font-bold text-white uppercase tracking-wider">{post.author.name}</p>
                <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> {post.readTime} read
                </p>
              </div>
            </div>
            <Link
              to={`/blog/${post.id}`}
              className="w-10 h-10 rounded-full border border-violet-500/30 flex items-center justify-center text-violet-400 hover:bg-violet-600 hover:text-white transition-all duration-200"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Compact numbered sidebar card ─── */
function SideCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5, ease: 'easeOut' }}
      className="group flex gap-4 items-start py-5 border-b border-[#1e2433] last:border-0"
    >
      <span className="text-[28px] font-['Syne'] font-bold text-[#1e2433] group-hover:text-violet-400/40 transition-colors leading-none mt-1 select-none min-w-[2ch]">
        {pad(index + 1)}
      </span>
      <div className="flex-1 min-w-0">
        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-violet-400/70 mb-1.5 block">{post.category}</span>
        <h4 className="text-sm font-['Syne'] font-semibold text-slate-200 group-hover:text-white transition-colors leading-snug line-clamp-2 mb-2">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h4>
        <span className="text-[10px] text-slate-600 flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" /> {post.readTime}
        </span>
      </div>
    </motion.article>
  );
}

/* ─── Standard grid card ─── */
function GridCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: 0.07 * (index % 3), duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col border border-[#1e2433] rounded-2xl overflow-hidden hover:border-[#2e3651] transition-colors duration-300 bg-[#090d18]"
    >
      <Link to={`/blog/${post.id}`} className="block aspect-[16/9] overflow-hidden relative bg-[#0f1525]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-500"
        />
        <div className="absolute bottom-3 left-3">
          <span className="text-[9px] font-black tracking-[0.18em] uppercase bg-[#090d18]/80 backdrop-blur-sm text-slate-300 border border-[#2a3050] px-2.5 py-1 rounded-lg">
            {post.category}
          </span>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-[10px] text-slate-600 mb-3">
          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
          <span className="text-[#1e2433]">·</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
        </div>

        <h3 className="text-base font-['Syne'] font-bold text-slate-100 group-hover:text-violet-300 transition-colors leading-snug line-clamp-2 mb-3 flex-grow">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h3>

        <p className="text-slate-500 text-[13px] font-['DM_Sans'] line-clamp-2 leading-relaxed mb-5">{post.excerpt}</p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#141927]">
          <div className="flex items-center gap-2.5">
            <img src={post.author.avatar} alt={post.author.name} className="w-7 h-7 rounded-full object-cover" />
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{post.author.name}</span>
          </div>
          <Link
            to={`/blog/${post.id}`}
            className="text-[10px] font-black tracking-widest uppercase text-slate-600 hover:text-violet-400 flex items-center gap-1 transition-colors"
          >
            Read <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Main Page ─── */
export default function Blog() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: headerRef, offset: ['start start', 'end start'] });
  const headerY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const allBlogs = [...MOCK_BLOGS, ...EXTRA_BLOGS];

  const filteredBlogs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allBlogs.filter(post => {
      const categoryMatches = activeCategory === 'All' || post.category === activeCategory;
      const searchMatches = !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        (post.category ?? '').toLowerCase().includes(q);
      return categoryMatches && searchMatches;
    });
  }, [search, activeCategory]);

  // isFiltered = any filter active → flat grid, no hero hierarchy
  const isFiltered = search.trim() !== '' || activeCategory !== 'All';

  // editorial layout slices — only used when !isFiltered (full All view)
  const [heroPost, ...restPosts] = filteredBlogs;
  const sidebarPosts = restPosts.slice(0, 4);
  const gridPosts = restPosts.slice(4);

  return (
    <div className="bg-[#080c14] min-h-screen text-white font-['DM_Sans']" style={{ colorScheme: 'dark' }}>

      {/* load custom fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        ::selection { background: rgba(251,191,36,0.18); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      <Navbar />

      {/* ── MASTHEAD ── */}
      <header ref={headerRef} className="relative pt-36 pb-16 overflow-hidden border-b border-[#131927]">
        <motion.div style={{ y: headerY }} className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          {/* big ghost text */}
          <span className="absolute -top-4 right-[-2rem] text-[22vw] font-['Syne'] font-black text-white/[0.025] leading-none select-none">
            BLOG
          </span>
          {/* subtle grid overlay */}
          <div className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* eyebrow */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-10 bg-violet-600" />
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-violet-400">SocioChat Journal</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
              <h1 className="text-5xl md:text-7xl font-['Syne'] font-black leading-[0.95] tracking-tight text-white">
                Insights &<br />
                <span className="text-violet-400">Stories</span>
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col gap-5 lg:items-end">
              <p className="text-slate-400 text-base leading-relaxed max-w-sm lg:text-right">
                Tips, engineering strategies, and ecosystem guides from the creator community.
              </p>

              {/* stat pills */}
              <div className="flex items-center gap-4 flex-wrap lg:justify-end">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                  <span>{allBlogs.length} articles</span>
                </div>
                <div className="w-px h-3 bg-[#1e2433]" />
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
                  <span>{CATEGORIES.length - 1} topics</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── TOOLBAR: Search + Categories ── */}
      <div className="sticky top-0 z-40 bg-[#080c14]/90 backdrop-blur-xl border-b border-[#131927]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

          {/* search */}
          <div className="relative flex-1 max-w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles…"
              className="w-full pl-10 pr-4 py-2.5 bg-[#0e1420] border border-[#1e2433] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/40 transition-colors"
            />
          </div>

          {/* category chips — horizontal scroll on mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide pb-0.5 sm:pb-0">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-[10px] font-black tracking-widest uppercase transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-violet-600 text-white'
                    : 'bg-transparent text-slate-500 hover:text-white border border-[#1e2433] hover:border-[#2e3651]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-7xl mx-auto px-6 py-14">

        <AnimatePresence mode="wait">
          {filteredBlogs.length === 0 ? (
            /* Empty state */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-32"
            >
              <p className="text-6xl font-['Syne'] font-black text-[#131927] mb-4">∅</p>
              <h3 className="text-lg font-['Syne'] font-bold text-slate-500 mb-2">No articles found</h3>
              <p className="text-slate-600 text-sm">Try adjusting your search or category filter.</p>
            </motion.div>
          ) : isFiltered ? (
            /* Filtered: simple uniform grid, no hero hierarchy */
            <motion.div
              key="filtered"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredBlogs.map((post, i) => (
                <GridCard key={post.id} post={post} index={i} />
              ))}
            </motion.div>
          ) : (
            /* Default editorial layout — only when activeCategory=All and no search */
            <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

              {/* Hero + sidebar row — only render if we have enough posts */}
              {heroPost && (
                <div className={`grid gap-8 mb-16 ${sidebarPosts.length > 0 ? 'lg:grid-cols-3' : ''}`}>
                  <div className={sidebarPosts.length > 0 ? 'lg:col-span-2' : ''}>
                    <HeroPost post={heroPost} />
                  </div>

                  {/* sidebar: numbered list — only show if there are sidebar posts */}
                  {sidebarPosts.length > 0 && (
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-slate-600">Trending</span>
                        <div className="flex-1 h-px bg-[#131927]" />
                      </div>
                      {sidebarPosts.map((post, i) => (
                        <SideCard key={post.id} post={post} index={i} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Divider + remaining grid */}
              {gridPosts.length > 0 && (
                <>
                  <div className="flex items-center gap-5 mb-10">
                    <div className="flex-1 h-px bg-[#131927]" />
                    <span className="text-[9px] font-black tracking-[0.22em] uppercase text-slate-600">All Articles</span>
                    <div className="flex-1 h-px bg-[#131927]" />
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gridPosts.map((post, i) => (
                      <GridCard key={post.id} post={post} index={i} />
                    ))}
                  </div>
                </>
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}