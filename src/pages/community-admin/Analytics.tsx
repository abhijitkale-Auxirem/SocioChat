import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, Megaphone, UserCheck } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';

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

export default function CommunityAnalytics() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Community Analytics" roleLabel="Community Admin">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
        <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[['45,200', 'Total Members'], ['8,430', 'Daily Active'], ['2,840', 'New This Week'], ['94.2%', 'Retention']].map(([v, l]) => (
            <div key={l} className="p-5 glass-dark rounded-2xl">
              <div className="text-2xl font-bold gradient-text font-['Space_Grotesk']">{v}</div>
              <div className="text-xs text-gray-400 mt-1">{l}</div>
            </div>
          ))}
        </motion.div>
        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-5">
          <h3 className="text-base font-semibold text-white mb-6 font-['Space_Grotesk']">Weekly Member Growth</h3>
          <div className="flex items-end gap-3 h-36">
            {[45, 62, 58, 72, 68, 85, 95].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full gradient-primary rounded-t-lg" style={{ height: `${v}%` }} />
                <span className="text-xs text-gray-500">{['M','T','W','T','F','S','S'][i]}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Top Communities</h3>
            {[['Tech India', '45,200', 92], ['Startup Network', '23,100', 78], ['Creative Hub', '18,500', 65]].map(([n, m, p]) => (
              <div key={n} className="mb-4">
                <div className="flex justify-between text-xs mb-1"><span className="text-gray-300">{n}</span><span className="text-gray-400">{m} members</span></div>
                <div className="h-2 bg-white/10 rounded-full"><div className="h-full gradient-primary rounded-full" style={{ width: `${p}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Activity by Time</h3>
            {[['Morning (6AM-12PM)', 18], ['Afternoon (12PM-6PM)', 32], ['Evening (6PM-10PM)', 42], ['Night (10PM-6AM)', 8]].map(([t, p]) => (
              <div key={t} className="mb-3">
                <div className="flex justify-between text-xs mb-1"><span className="text-gray-400 text-xs">{t}</span><span className="text-white">{p}%</span></div>
                <div className="h-1.5 bg-white/10 rounded-full"><div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" style={{ width: `${p}%` }} /></div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
