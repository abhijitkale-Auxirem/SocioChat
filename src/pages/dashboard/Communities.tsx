import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Users, Globe, Lock, Search, X, ArrowUpRight, TrendingUp, Compass } from 'lucide-react';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MOCK_COMMUNITIES } from '@/lib/mockData';

const CATEGORIES = [
  'All', 'Technology', 'Business', 'Design', 'Health',
  'Entertainment', 'Food', 'Education', 'Sports', 'Music',
];

/* ─── Tiny utility helpers ─── */
const pad = (n: number) => String(n).padStart(2, '0');

/* ─── Search box with live name dropdown ─── */
function SearchBox({ search, setSearch, allCommunities }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handler
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handler
      );
  }, []);

  // Search ONLY by community name
  const suggestions = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return [];

    return allCommunities
      .filter((community: any) =>
        community.name
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 6);

  }, [search, allCommunities]);

  function handleSelect(name: string) {
    setSearch(name);
    setOpen(false);
  }

  return (
    <div
      ref={ref}
      className="relative flex-1 max-w-7xl"
    >
      <div className="relative">

        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" />

        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setOpen(true);
          }}
          onFocus={() =>
            search.trim() && setOpen(true)
          }
          placeholder="Search communities..."
          className="w-full pl-10 pr-10 py-2.5 bg-[#0e1420] border border-[#1e2433] rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-violet-500/40 transition-colors"
        />

        {search && (
          <button
            onClick={() => {
              setSearch("");
              setOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-300"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -8
            }}
            transition={{
              duration: 0.2
            }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#0e1420] border border-[#1e2433] rounded-xl overflow-hidden z-50 shadow-2xl shadow-black/60"
          >
            {suggestions.map(
              (community: any) => (
                <button
                  key={community.id}
                  onMouseDown={() =>
                    handleSelect(
                      community.name
                    )
                  }
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#141927] transition-colors border-b border-[#131927] last:border-0"
                >
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />

                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-semibold text-slate-200 truncate">
                      {community.name}
                    </p>

                    <p className="text-[11px] text-slate-500">
                      {community.members.toLocaleString()} members
                    </p>
                  </div>

                  <span className="text-[9px] font-black uppercase px-2 py-1 rounded bg-violet-500/10 border border-violet-500/20 text-violet-400">
                    {community.category}
                  </span>
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Featured Hero Card ─── */
function HeroCommunity({ community }) {
  const isPublic = community.type === 'Public';
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative grid md:grid-cols-5 gap-0 rounded-[2rem] overflow-hidden border border-[#1e2433] group bg-[#090d18]"
    >
      <div className="md:col-span-3 block aspect-[16/10] md:aspect-auto overflow-hidden relative min-h-[300px]">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#080c14]/80 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14]/80 to-transparent md:hidden" />
        
        <span className={`absolute top-4 left-4 flex items-center gap-1 text-[9px] font-black tracking-[0.12em] uppercase px-2.5 py-1 rounded-lg backdrop-blur-sm border ${
          isPublic ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' : 'bg-amber-400/20 border-amber-400/30 text-amber-300'
        }`}>
          {isPublic ? <Globe className="w-2.5 h-2.5" /> : <Lock className="w-2.5 h-2.5" />}
          {community.type}
        </span>
      </div>

      <div className="md:col-span-2 bg-[#080c14] flex flex-col justify-between p-8 md:p-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full">
              Featured Room
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">{community.category}</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-['Syne'] font-bold leading-[1.15] text-white mb-5 group-hover:text-violet-300 transition-colors duration-300">
            {community.name}
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed font-['DM_Sans'] mb-8 line-clamp-4">{community.description}</p>
        </div>

        <div className="space-y-6">
          <div className="h-px bg-[#1e2433]" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <Users className="w-3.5 h-3.5 text-violet-400" />
              <span className="font-bold text-slate-300">{community.members.toLocaleString()} members</span>
            </div>
            <button className="px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-black tracking-widest uppercase rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-lg shadow-violet-600/15">
              Join Hub <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Compact Numbered Side Card ─── */
function SideCommunityCard({ community, index }) {
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
        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-violet-400/70 mb-1.5 block">{community.category}</span>
        <h4 className="text-sm font-['Syne'] font-semibold text-slate-200 group-hover:text-white transition-colors leading-snug truncate">
          {community.name}
        </h4>
        <span className="text-[10px] text-slate-600 flex items-center gap-1 mt-1">
          <Users className="w-2.5 h-2.5" /> {community.members.toLocaleString()} members
        </span>
      </div>
    </motion.article>
  );
}

/* ─── Standard Grid Card ─── */
function GridCommunityCard({ community, index }) {
  const isPublic = community.type === 'Public';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.4
      }}
      className="group h-full flex flex-col border border-[#1e2433] rounded-2xl overflow-hidden hover:border-[#2e3651] transition-colors duration-300 bg-[#090d18]"
    >
      <div className="aspect-[16/9] overflow-hidden relative bg-[#0f1525]">

        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-500"
        />

        <div className="absolute top-3 right-3">
          <span
            className={`flex items-center gap-1 text-[8px] font-black tracking-[0.12em] uppercase px-2 py-0.5 rounded-md backdrop-blur-sm border ${
              isPublic
                ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                : 'bg-amber-400/20 border-amber-400/30 text-amber-300'
            }`}
          >
            {community.type}
          </span>
        </div>

        <div className="absolute bottom-3 left-3">
          <span className="text-[9px] font-black tracking-[0.18em] uppercase bg-[#090d18]/80 backdrop-blur-sm text-slate-300 border border-[#2a3050] px-2.5 py-1 rounded-lg">
            {community.category}
          </span>
        </div>

      </div>

      <div className="p-5 flex flex-col flex-grow">

        <h3 className="text-base font-['Syne'] font-bold text-slate-100 group-hover:text-violet-300 transition-colors mb-2 line-clamp-1">
          {community.name}
        </h3>

        <p className="text-slate-500 text-[13px] line-clamp-2 mb-5 flex-grow">
          {community.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[#141927]">

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Users className="w-3 h-3"/>
            {community.members.toLocaleString()} members
          </div>

          <button className="text-[10px] font-black tracking-widest uppercase text-slate-400 hover:text-violet-400 border border-[#1e2433] px-3 py-1.5 rounded-lg">
            Join Hub
          </button>

        </div>

      </div>

    </motion.article>
  );
}

/* ─── Main Communities Module Page ─── */
export default function Communities() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: headerRef, offset: ['start start', 'end start'] });
  const headerY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const filteredCommunities = useMemo(() => {
  const q = search.trim().toLowerCase();

  return MOCK_COMMUNITIES.filter(
    (community) => {

      const categoryMatches =
        activeCategory === "All" ||
        community.category === activeCategory;

      // Search ONLY by community name
      const searchMatches =
        !q ||
        community.name
          .toLowerCase()
          .includes(q);

      return (
        categoryMatches &&
        searchMatches
      );
    }
  );

}, [search, activeCategory]);

  const isFiltered = search.trim() !== '' || activeCategory !== 'All';

  // Slice layout matrices dynamically for pure "All View" presentation hierarchies
  const [heroCommunity, ...restCommunities] = filteredCommunities;
  const sidebarCommunities = restCommunities.slice(0, 4);
  const gridCommunities = restCommunities.slice(4);

  return (
    <div className="bg-[#080c14] min-h-screen text-white font-['DM_Sans']" style={{ colorScheme: 'dark' }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        ::selection { background: rgba(139, 92, 246, 0.18); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      <Navbar />

      {/* ── MASTHEAD HERO AREA ── */}
      <header ref={headerRef} className="relative pt-36 pb-16 overflow-hidden border-b border-[#131927]">
        <motion.div style={{ y: headerY }} className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <span className="absolute -top-4 right-[-2rem] text-[22vw] font-['Syne'] font-black text-white/[0.025] leading-none select-none">
            ROOMS
          </span>
          <div className="absolute inset-0"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-10 bg-violet-600" />
              <span className="text-[10px] font-black tracking-[0.25em] uppercase text-violet-400">Discover Groups</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
              <h1 className="text-5xl md:text-7xl font-['Syne'] font-black leading-[0.95] tracking-tight text-white">
                Find Your<br />
                <span className="text-violet-400">Communities</span>
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col gap-5 lg:items-end">
              <p className="text-slate-400 text-base leading-relaxed max-w-sm lg:text-right">
                Find your people. Join secure server blocks that match your unique technical or creative workflows.
              </p>

              <div className="flex items-center gap-4 flex-wrap lg:justify-end">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <Compass className="w-3.5 h-3.5 text-violet-400" />
                  <span>{MOCK_COMMUNITIES.length} total hubs</span>
                </div>
                <div className="w-px h-3 bg-[#1e2433]" />
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
                  <span>{CATEGORIES.length - 1} domains</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── NAVIGATION AND SEARCH SYSTEM TOOLBAR ── */}
      <div className="sticky top-0 z-40 bg-[#080c14]/90 backdrop-blur-xl border-b border-[#131927]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          <SearchBox
            search={search}
            setSearch={setSearch}
            allCommunities={MOCK_COMMUNITIES}
          />

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

          {isFiltered && (
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); }}
              className="text-[10px] font-black tracking-wider uppercase text-violet-400 hover:text-violet-300 transition-colors shrink-0"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── CORE COMPONENT FEED GRID GRIDDING SYSTEMS ── */}
      <main className="max-w-7xl mx-auto px-6 py-14">
        <div className="mb-6">
          <span className="text-[11px] text-slate-600">
            Showing {filteredCommunities.length} {filteredCommunities.length === 1 ? 'room' : 'rooms'}
            {activeCategory !== 'All' && ` inside ${activeCategory}`}
          </span>
        </div>

        <AnimatePresence mode="wait">
      {filteredCommunities.length === 0 ? (
  <motion.div
    key="empty"
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="text-center py-32"
  >
    <p className="text-6xl font-['Syne'] font-black text-[#131927] mb-4">
      ∅
    </p>

    <h3 className="text-lg font-['Syne'] font-bold text-slate-500 mb-2">
      No rooms discovered
    </h3>

    <p className="text-slate-600 text-sm">
      Modify search strings or change parameters filters.
    </p>
  </motion.div>

) : isFiltered ? (

  <motion.div
    key={`${search}-${activeCategory}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
  >
    <AnimatePresence mode="popLayout">
      {filteredCommunities.map(
        (community, i) => (
          <motion.div
            key={`${search}-${activeCategory}-${community.id}`}
            layout
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.95
            }}
          >
            <GridCommunityCard
              community={community}
              index={i}
            />
          </motion.div>
        )
      )}
    </AnimatePresence>
  </motion.div>


          ) : isFiltered ? (
            <motion.div
              key="filtered"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCommunities.map((community, i) => (
                <GridCommunityCard key={community.id} community={community} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              
              {heroCommunity && (
                <div className={`grid gap-8 mb-16 ${sidebarCommunities.length > 0 ? 'lg:grid-cols-3' : ''}`}>
                  <div className={sidebarCommunities.length > 0 ? 'lg:col-span-2' : ''}>
                    <HeroCommunity community={heroCommunity} />
                  </div>

                  {sidebarCommunities.length > 0 && (
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-slate-600">Trending Groups</span>
                        <div className="flex-1 h-px bg-[#131927]" />
                      </div>
                      {sidebarCommunities.map((community, i) => (
                        <SideCommunityCard key={community.id} community={community} index={i} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {gridCommunities.length > 0 && (
                <>
                  <div className="flex items-center gap-5 mb-10">
                    <div className="flex-1 h-px bg-[#131927]" />
                    <span className="text-[9px] font-black tracking-[0.22em] uppercase text-slate-600">All Rooms</span>
                    <div className="flex-1 h-px bg-[#131927]" />
                  </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
                      {gridCommunities.map((community, i) => (
                      <GridCommunityCard key={community.id} community={community} index={i} />
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