import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, Megaphone, UserCheck, Crown } from 'lucide-react';
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

const ROLES_DEF = [
  { role: 'Owner', color: 'text-yellow-400', bg: 'bg-yellow-500/20', desc: 'Full control over community settings and members' },
  { role: 'Admin', color: 'text-purple-400', bg: 'bg-purple-500/20', desc: 'Manage members and moderate content' },
  { role: 'Moderator', color: 'text-blue-400', bg: 'bg-blue-500/20', desc: 'Review reports and moderate discussions' },
  { role: 'Member', color: 'text-gray-400', bg: 'bg-gray-500/20', desc: 'Standard community member access' },
];

export default function MemberRoles() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Member Roles" roleLabel="Community Admin">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
        <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ROLES_DEF.map(r => (
            <div key={r.role} className="p-4 glass-dark rounded-2xl">
              <span className={`text-xs px-2 py-1 rounded-full ${r.bg} ${r.color} font-medium`}>{r.role}</span>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5">
            <h3 className="text-base font-semibold text-white font-['Space_Grotesk']">Assign Roles</h3>
          </div>
          <div className="divide-y divide-white/5">
            {MOCK_PROFILES.map(p => (
              <div key={p.id} className="flex items-center gap-4 px-5 py-4">
                <img src={p.avatar} alt={p.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{p.name}</p>
                  <p className="text-xs text-gray-500 truncate">{p.followers} followers</p>
                </div>
                <select onChange={() => toast.success(`Role updated for ${p.name}!`)} className="bg-white/5 border border-white/10 text-sm text-white rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-indigo-400">
                  <option value="member">Member</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
