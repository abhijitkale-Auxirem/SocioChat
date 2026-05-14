import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, MessageCircle, Users, Rss, UserPlus, Bell, User, Settings } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_COMMUNITIES } from '@/lib/mockData';
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

export default function DashboardCommunities() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Communities" roleLabel="General User">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">Discover Communities</h2>
          <button onClick={() => toast.success('Community creation coming soon!')} className="px-4 py-2 gradient-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">
            Create Community
          </button>
        </motion.div>
        <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_COMMUNITIES.map(c => (
            <div key={c.id} className="glass-dark rounded-2xl overflow-hidden hover:border-indigo-400/30 transition-all hover:-translate-y-1 duration-300">
              <img src={c.image} alt={c.name} className="w-full h-36 object-cover" />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-semibold text-white font-['Space_Grotesk']">{c.name}</h3>
                  <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full">{c.category}</span>
                </div>
                <p className="text-xs text-gray-400 mb-3">{c.members.toLocaleString('en-IN')} members · {c.type}</p>
                <button onClick={() => toast.success(`Joined ${c.name}!`)} className="w-full py-2 gradient-primary text-white text-xs font-semibold rounded-lg hover:opacity-90 transition-all">Join Community</button>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
