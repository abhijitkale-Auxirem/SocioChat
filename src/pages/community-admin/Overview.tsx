import { useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, Megaphone, UserCheck, AlertTriangle } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { MOCK_COMMUNITIES } from '@/lib/mockData';

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

export default function CommunityAdminOverview() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }

  const STATS = [
    { label: 'Total Members', value: '45,200', color: 'from-indigo-500 to-purple-600', path: '/community-admin/members' },
    { label: 'Communities', value: '3', color: 'from-cyan-500 to-blue-600', path: '/community-admin/communities' },
    { label: 'Active Today', value: '8,430', color: 'from-purple-500 to-pink-600', path: '/community-admin/analytics' },
    { label: 'Reports Pending', value: '12', color: 'from-orange-500 to-red-600', path: '/community-admin/moderation' },
  ];

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Community Admin" roleLabel="Community Admin">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
        <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(s => (
            <Link key={s.label} to={s.path} className="p-5 glass-dark rounded-2xl hover:border-indigo-400/30 transition-all hover:-translate-y-1 duration-300">
              <div className={`text-2xl font-bold font-['Space_Grotesk'] bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </Link>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white font-['Space_Grotesk']">My Communities</h3>
            <Link to="/community-admin/communities" className="text-xs text-indigo-400 hover:text-indigo-300">Manage All</Link>
          </div>
          <div className="space-y-3">
            {MOCK_COMMUNITIES.slice(0, 3).map(c => (
              <div key={c.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <img src={c.image} alt={c.name} className="w-12 h-10 object-cover rounded-lg shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.members.toLocaleString('en-IN')} members · {c.type}</p>
                </div>
                <span className="text-xs text-green-400">Active</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <h3 className="text-base font-semibold text-white font-['Space_Grotesk']">Pending Reports</h3>
          </div>
          {[
            { reporter: 'User #1234', reason: 'Spam content in Tech India', time: '2 hours ago' },
            { reporter: 'User #5678', reason: 'Inappropriate language', time: '4 hours ago' },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <div>
                <p className="text-sm text-white">{r.reason}</p>
                <p className="text-xs text-gray-500">{r.reporter} · {r.time}</p>
              </div>
              <Link to="/community-admin/moderation" className="text-xs text-orange-400 hover:text-orange-300 transition-colors">Review</Link>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
