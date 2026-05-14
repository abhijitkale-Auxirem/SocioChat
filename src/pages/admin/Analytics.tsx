import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, FileText, AlertTriangle } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';

const SIDEBAR = [
  { label: 'Overview', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Users', path: '/admin/users', icon: <Users className="w-4 h-4" /> },
  { label: 'Communities', path: '/admin/communities', icon: <Users className="w-4 h-4" /> },
  { label: 'Blog', path: '/admin/blog', icon: <FileText className="w-4 h-4" /> },
  { label: 'Reports', path: '/admin/reports', icon: <AlertTriangle className="w-4 h-4" /> },
  { label: 'Analytics', path: '/admin/analytics', icon: <BarChart2 className="w-4 h-4" /> },
  { label: 'Security', path: '/admin/security', icon: <Shield className="w-4 h-4" /> },
  { label: 'Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
];

export default function AdminAnalytics() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user || (user as any).role !== 'admin') { navigate('/admin-login'); return null; }

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Platform Analytics" roleLabel="Platform Admin">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
        <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[['4.92M', 'Total Users', 'text-indigo-400'], ['2.4M+', 'Daily Messages', 'text-cyan-400'], ['₹2.4Cr', 'Monthly Revenue', 'text-green-400'], ['99.9%', 'Platform Uptime', 'text-purple-400']].map(([v, l, c]) => (
            <div key={l} className="p-5 glass-dark rounded-2xl">
              <div className={`text-2xl font-bold font-['Space_Grotesk'] ${c}`}>{v}</div>
              <div className="text-xs text-gray-400 mt-1">{l}</div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-5">
          <h3 className="text-base font-semibold text-white mb-6 font-['Space_Grotesk']">User Growth — 2026</h3>
          <div className="flex items-end gap-2 h-36">
            {[55, 72, 68, 85, 80, 95, 90, 110, 105, 125, 120, 140].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full gradient-primary rounded-t-lg" style={{ height: `${(v / 140) * 100}%` }} />
                <span className="text-xs text-gray-600">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Revenue by Source</h3>
            {[['Pro Subscriptions', '₹1.2Cr', 50], ['Creator Plans', '₹72L', 30], ['Enterprise', '₹48L', 20]].map(([s, a, p]) => (
              <div key={s as string} className="mb-4">
                <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">{s}</span><span className="text-green-400">{a}</span></div>
                <div className="h-2 bg-white/10 rounded-full"><div className="h-full bg-gradient-to-r from-green-500 to-teal-600 rounded-full" style={{ width: `${p}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Top States by Users</h3>
            {[['Maharashtra', 28], ['Karnataka', 22], ['Tamil Nadu', 18], ['Delhi NCR', 15], ['Gujarat', 10]].map(([state, pct]) => (
              <div key={state} className="mb-3">
                <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">{state}</span><span className="text-white">{pct}%</span></div>
                <div className="h-1.5 bg-white/10 rounded-full"><div className="h-full gradient-primary rounded-full" style={{ width: `${pct}%` }} /></div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
