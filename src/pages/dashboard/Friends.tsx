import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  LayoutDashboard, MessageCircle, Users, Rss, UserPlus,
  Bell, User, Settings, UserCheck, UserX, Search,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_PROFILES } from '@/lib/mockData';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { toast } from 'sonner';

// Fixed Variants with "as const" to prevent TS errors
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" as const } 
  }
};

const SIDEBAR = [
  { label: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Messages', path: '/dashboard/chat', icon: <MessageCircle className="w-4 h-4" /> },
  { label: 'Communities', path: '/dashboard/communities', icon: <Users className="w-4 h-4" /> },
  { label: 'Feed', path: '/dashboard/feed', icon: <Rss className="w-4 h-4" /> },
  { label: 'Friends', path: '/dashboard/friends', icon: <UserPlus className="w-4 h-4" /> },
  { label: 'Notifications', path: '/dashboard/notifications', icon: <Bell className="w-4 h-4" /> },
  { label: 'Profile', path: '/dashboard/profile', icon: <User className="w-4 h-4" /> },
  { label: 'Settings', path: '/dashboard/settings', icon: <Settings className="w-4 h-4" /> },
];

export default function Friends() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  
  // State for search and social actions
  const [query, setQuery] = useState('');
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);

  if (!user) { navigate('/login'); return null; }

  // Filter logic (Global/World focus)
  const filtered = MOCK_PROFILES.filter(p =>
    !dismissed.includes(p.id) &&
    (p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.role.toLowerCase().includes(query.toLowerCase()))
  );

  const handleFollow = (id: string, name: string) => {
    if (following.includes(id)) return;
    setFollowing(prev => [...prev, id]);
    toast.success(`You are now following ${name}!`);
  };

  const handleDismiss = (id: string, name: string) => {
    setDismissed(prev => [...prev, id]);
    toast.info(`${name} removed from suggestions`);
  };

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Friends" roleLabel="Global User">
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={staggerContainer} 
        className="space-y-6"
      >
        {/* Search bar */}
        <motion.div variants={fadeInUp} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search creators and friends worldwide..."
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all shadow-inner"
          />
        </motion.div>

        {/* Results Section */}
        <motion.div variants={fadeInUp}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">People You May Know</h2>
            <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase tracking-widest text-gray-400 border border-white/5">
              {filtered.length} Discoveries
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 glass-dark rounded-[2rem] border border-white/5">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-600" />
              </div>
              <p className="text-gray-400 font-medium">No results found</p>
              <p className="text-gray-600 text-sm mt-1">Global search returned no matches for "{query}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence mode='popLayout'>
                {filtered.map(p => {
                  const isFollowing = following.includes(p.id);

                  return (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                      whileHover={{ y: -5 }}
                      className="glass-dark rounded-2xl p-5 border border-white/10 hover:border-indigo-500/40 transition-colors duration-300 relative group overflow-hidden"
                    >
                      {/* Suble background glow on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="flex items-center gap-4 mb-5 relative z-10">
                        <div className="relative">
                          <img
                            src={p.avatar}
                            alt={p.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-white/10 group-hover:border-indigo-400 transition-colors"
                          />
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#0A0C14] rounded-full" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white truncate font-['Space_Grotesk']">{p.name}</p>
                          <p className="text-[11px] text-gray-500 truncate mb-1 uppercase tracking-tighter">{p.role}</p>
                          <div className="flex items-center gap-1.5 text-[10px] text-indigo-400 font-medium">
                            <Users className="w-3 h-3" />
                            {p.followers} Global Followers
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 relative z-10">
                        <button
                          onClick={() => handleFollow(p.id, p.name)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 ${
                            isFollowing
                              ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-inner'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                          }`}
                        >
                          {isFollowing ? (
                            <>
                              <UserCheck className="w-3.5 h-3.5" />
                              Following
                            </>
                          ) : (
                            <>
                              <UserPlus className="w-3.5 h-3.5" />
                              Follow
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={() => handleDismiss(p.id, p.name)}
                          className="p-2.5 glass-dark rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/10 border border-white/5 transition-all"
                          title="Dismiss Suggestion"
                        >
                          <UserX className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}