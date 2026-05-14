import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  LayoutDashboard, MessageCircle, Users, Rss, UserPlus,
  Bell, User, Settings, UserCheck, UserX, Search,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_PROFILES } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { toast } from 'sonner';

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
  if (!user) { navigate('/login'); return null; }

  const [query, setQuery] = useState('');
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [added, setAdded] = useState<string[]>([]);

  const filtered = MOCK_PROFILES.filter(p =>
    !dismissed.includes(p.id) &&
    (p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.role.toLowerCase().includes(query.toLowerCase()))
  );

  const handleAdd = (id: string, name: string) => {
    if (added.includes(id)) return;
    setAdded(prev => [...prev, id]);
    toast.success(`Friend request sent to ${name}!`);
  };

  const handleDismiss = (id: string, name: string) => {
    setDismissed(prev => [...prev, id]);
    toast.info(`${name} dismissed`);
  };

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Friends" roleLabel="General User">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">

        {/* Search bar */}
        <motion.div variants={fadeInUp} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search people by name or role..."
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          />
        </motion.div>

        {/* Results */}
        <motion.div variants={fadeInUp}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">People You May Know</h2>
            <span className="text-xs text-gray-500">{filtered.length} suggestions</span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 glass-dark rounded-2xl">
              <Search className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 font-medium">No people found</p>
              <p className="text-gray-600 text-sm mt-1">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(p => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-dark rounded-2xl p-5 hover:border-indigo-400/30 transition-all hover:-translate-y-1 duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400/30"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                      <p className="text-xs text-gray-400 truncate">{p.role} · {p.followers} followers</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAdd(p.id, p.name)}
                      className={`flex-1 flex items-center justify-center gap-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                        added.includes(p.id)
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30 cursor-default'
                          : 'gradient-primary text-white hover:opacity-90'
                      }`}
                    >
                      <UserCheck className="w-3 h-3" />
                      {added.includes(p.id) ? 'Request Sent' : 'Add Friend'}
                    </button>
                    <button
                      onClick={() => handleDismiss(p.id, p.name)}
                      className="p-2 glass rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                      title="Dismiss"
                    >
                      <UserX className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
