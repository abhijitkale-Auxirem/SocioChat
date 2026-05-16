import { useNavigate, Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, FileText, AlertTriangle, Activity } from 'lucide-react';
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

export default function AdminOverview() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user || (user as any).role !== 'admin') { navigate('/admin-login'); return null; }

  const STATS = [
    { label: 'Total Users', value: '4,920,450', color: 'from-indigo-500 to-purple-600', path: '/admin/users' },
    { label: 'Communities', value: '850,200', color: 'from-cyan-500 to-blue-600', path: '/admin/communities' },
    { label: 'Active Today', value: '284,300', color: 'from-green-500 to-teal-600', path: '/admin/analytics' },
    { label: 'Pending Reports', value: '142', color: 'from-orange-500 to-red-600', path: '/admin/reports' },
    { label: 'Monthly Revenue', value: '$2.4M', color: 'from-purple-500 to-pink-600', path: '/admin/analytics' },
    { label: 'Security Alerts', value: '3', color: 'from-red-500 to-rose-600', path: '/admin/security' },
  ];

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Admin Dashboard" roleLabel="Platform Admin">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
        <motion.div variants={fadeInUp}>
          <div className="p-4 bg-indigo-500/10 border border-indigo-400/20 rounded-2xl mb-6 flex items-center gap-3">
            <Activity className="w-5 h-5 text-indigo-400" />
            <span className="text-sm text-gray-300">Platform is fully operational. All systems running normally.</span>
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {STATS.map(s => (
            <Link key={s.label} to={s.path} className="p-5 glass-dark rounded-2xl hover:border-indigo-400/30 transition-all hover:-translate-y-1 duration-300">
              <div className={`text-2xl font-bold font-['Space_Grotesk'] bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </Link>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">New User Registrations</h3>
            <div className="flex items-end gap-2 h-28">
              {[65, 78, 72, 88, 82, 95, 110, 98, 115, 105, 125, 140].map((v, i) => (
                <div key={i} className="flex-1 gradient-primary rounded-t-sm" style={{ height: `${(v / 140) * 100}%` }} />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Jan</span><span>Jun</span><span>May 2026</span>
            </div>
          </div>
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'View Reports', path: '/admin/reports', color: 'from-orange-500 to-red-600' },
                { label: 'Manage Users', path: '/admin/users', color: 'from-indigo-500 to-purple-600' },
                { label: 'Security Check', path: '/admin/security', color: 'from-green-500 to-teal-600' },
                { label: 'New Blog Post', path: '/admin/blog', color: 'from-purple-500 to-pink-600' },
              ].map(a => (
                <Link key={a.label} to={a.path} className={`p-3 rounded-xl text-center text-sm font-medium text-white bg-gradient-to-br ${a.color} opacity-80 hover:opacity-100 transition-opacity`}>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
