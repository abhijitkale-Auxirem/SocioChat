import { useState, useMemo, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Users,
  Lock,
  Globe,
  Search,
  ArrowUpRight,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MOCK_COMMUNITIES } from "@/lib/mockData";

const CATEGORIES = [
  "All",
  "Technology",
  "Business",
  "Design",
  "Health",
  "Entertainment",
  "Food",
  "Education",
  "Sports",
  "Music",
  "Gaming",
  "Finance",
  "Travel",
];

const pad = (n: number) => String(n).padStart(2, "0");

/* ================= FEATURED HERO ================= */

function HeroCommunity({ community }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="relative grid md:grid-cols-5 rounded-[2rem] overflow-hidden border border-[#1e2433]"
    >
      <div className="md:col-span-3 relative overflow-hidden">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#070b18]" />
      </div>

      <div className="md:col-span-2 p-8 bg-[#080c14] flex flex-col justify-between">

        <div>
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] uppercase font-black tracking-wider">
            Featured
          </span>

          <h2 className="mt-6 text-3xl font-bold">
            {community.name}
          </h2>

          <p className="mt-4 text-gray-400 text-sm leading-relaxed">
            Connect with members who share your passion for{" "}
            {community.category}.
          </p>
        </div>

        <div className="pt-6 border-t border-[#1e2433] flex justify-between">

          <div className="flex gap-3 items-center">

            <Users className="w-4 h-4 text-indigo-400" />

            <span className="text-sm text-gray-400">
              {community.members.toLocaleString()} members
            </span>
          </div>

          <button className="w-10 h-10 rounded-full border border-indigo-500/30 flex items-center justify-center hover:bg-indigo-600">
            <ArrowUpRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </motion.div>
  );
}

/* ================= SIDEBAR CARD ================= */

function SideCard({ community, index }: any) {
  return (
    <div className="group flex gap-4 py-5 border-b border-[#1e2433]">

      <span className="text-3xl font-bold text-[#1e2433] group-hover:text-indigo-400/40">
        {pad(index + 1)}
      </span>

      <div>

        <span className="text-[10px] uppercase text-indigo-400 font-black">
          {community.category}
        </span>

        <h4 className="text-sm font-bold text-gray-300 mt-1 group-hover:text-white">
          {community.name}
        </h4>

        <span className="text-xs text-gray-500">
          {community.members.toLocaleString()} members
        </span>

      </div>
    </div>
  );
}

/* ================= GRID CARD ================= */

function GridCard({ community }: any) {
  return (
    <motion.div
      layout
      whileHover={{ y: -5 }}
      className="rounded-2xl overflow-hidden bg-[#0d1527] border border-[#1e2433]"
    >
      <div className="relative h-52">

        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-3 right-3 bg-black/70 px-2 py-1 rounded-lg text-[10px] uppercase flex gap-1">

          {community.type === "Public" ? (
            <>
              <Globe className="w-3 h-3 text-emerald-400" />
              Public
            </>
          ) : (
            <>
              <Lock className="w-3 h-3 text-amber-400" />
              Private
            </>
          )}

        </div>

      </div>

      <div className="p-5">

        <h3 className="font-bold text-lg">
          {community.name}
        </h3>

        <div className="flex justify-between items-center mt-6">

          <div className="flex items-center gap-2 text-sm text-gray-400">

            <Users className="w-4 h-4 text-indigo-400" />

            {community.members.toLocaleString()}

          </div>

          <button className="px-4 py-2 rounded-lg bg-indigo-600 text-sm font-semibold">
            Join
          </button>

        </div>

      </div>
    </motion.div>
  );
}

/* ================= PAGE ================= */

export default function Communities() {

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const headerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });

  const headerY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "20%"]
  );

  const filteredCommunities = useMemo(() => {

    const q = search.toLowerCase();

    return MOCK_COMMUNITIES.filter((c) => {

      const categoryMatch =
        activeCategory === "All" ||
        c.category === activeCategory;

      const searchMatch =
        !q ||
        c.name.toLowerCase().includes(q);

      return categoryMatch && searchMatch;

    });

  }, [search, activeCategory]);

  const isFiltered =
    search !== "" ||
    activeCategory !== "All";

  const [heroCommunity, ...rest] = filteredCommunities;

  const sidebarCommunities = rest.slice(0, 4);

  const gridCommunities = rest.slice(4);

  return (
    <div className="bg-[#070b18] min-h-screen text-white">

      <Navbar />

      {/* HERO */}

      <header
        ref={headerRef}
        className="pt-36 pb-16 border-b border-[#131927] relative overflow-hidden"
      >

        <motion.div
          style={{ y: headerY }}
          className="absolute inset-0"
        >

          <span className="absolute right-0 top-0 text-[20vw] font-black text-white/[0.03]">
            COMMUNITY
          </span>

        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative">

          <h1 className="text-6xl font-bold leading-none">

            Find Your
            <br />

            <span className="text-indigo-400">
              Tribe
            </span>

          </h1>

          <p className="text-gray-400 mt-6 max-w-md">
            Discover communities and connect with people
            around shared interests.
          </p>

        </div>

      </header>

      {/* TOOLBAR */}

      <div className="sticky top-0 z-40 bg-[#070b18]/90 backdrop-blur-xl border-b border-[#131927]">

        <div className="max-w-7xl mx-auto p-4 flex flex-col sm:flex-row gap-4">

          <div className="relative flex-1 max-w-sm">

            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"/>

            <input
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="Search communities..."
              className="w-full bg-[#0d1527] border border-[#1e2433] rounded-xl pl-10 py-3"
            />

          </div>

          <div className="flex gap-2 overflow-auto scrollbar-hide">

            {CATEGORIES.map((cat)=>(
              <button
                key={cat}
                onClick={()=>setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap ${
                  activeCategory===cat
                    ? "bg-indigo-600"
                    : "border border-[#1e2433]"
                }`}
              >
                {cat}
              </button>
            ))}

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <main className="max-w-7xl mx-auto px-6 py-14">

        <AnimatePresence mode="wait">

          {filteredCommunities.length===0 ? (

            <motion.div
              className="text-center py-20"
            >
              <Users className="w-14 h-14 mx-auto opacity-20"/>

              <h3 className="mt-4 text-xl font-bold">
                No Communities Found
              </h3>

            </motion.div>

          ) : isFiltered ? (

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredCommunities.map(c=>(
                <GridCard
                  key={c.id}
                  community={c}
                />
              ))}

            </div>

          ) : (

            <>
              <div className="grid lg:grid-cols-3 gap-8 mb-16">

                <div className="lg:col-span-2">
                  <HeroCommunity
                    community={heroCommunity}
                  />
                </div>

                <div>
                  {sidebarCommunities.map((c,i)=>(
                    <SideCard
                      key={c.id}
                      community={c}
                      index={i}
                    />
                  ))}
                </div>

              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {gridCommunities.map(c=>(
                  <GridCard
                    key={c.id}
                    community={c}
                  />
                ))}

              </div>
            </>
          )}

        </AnimatePresence>

      </main>

      <Footer />

    </div>
  );
}