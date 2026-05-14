import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, Megaphone, UserCheck, Search, UserX, Crown } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_PROFILES } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { toast } from 'sonner';

const SIDEBAR = [
  { label: 'Overview', path: '/community-admin', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'My Communities', path: '/community-admin/communities', icon: <Megaphone className="w-4 h-4" /> },
  { label: 'Members', path: '/community-admin/members', icon: <UserCheck className="w-4 h-4" /> },
  { label: 'Content', path: '/community-admin/content', icon: <BarChart2 className="w-4 h-4" /> },
  { label: 'Analytics', path: '/community-admin/analytics', icon: <BarChart2 className="w-4 h-4" /> },
  { label: 'Moderation', path: '/community-admin/moderation', icon: <Shield className="w-4 h-4" /> },
  { label: 'Members Roles', path: '/community-admin/roles', icon: <Users className="w-4 h-4" /> },
  { label: 'Settings', path: '/community-admin/settings', icon: <Settings className="w-4 h-4" /> },
];

export default function Members() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }
  const [search, setSearch] = useState('');
  const filtered = MOCK_PROFILES.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Members" roleLabel="Community Admin">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-5">
        <motion.div variants={fadeInUp} className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-400" />
          </div>
          <div className="text-sm text-gray-400">{filtered.length} members</div>
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-white/5 bg-white/3">
              <tr>
                {['Member', 'Role', 'Followers', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-full object-cover" />
                      <span className="text-sm text-white font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded-full">{p.role}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-400">{p.followers}</td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => toast.success(`${p.name} promoted to Moderator!`)} className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                        <Crown className="w-3 h-3" /> Promote
                      </button>
                      <button onClick={() => toast.success(`${p.name} has been removed.`)} className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors ml-2">
                        <UserX className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
