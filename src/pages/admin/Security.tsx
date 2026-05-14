import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, FileText, AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { toast } from 'sonner';

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

const ALERTS = [
  { id: '1', level: 'Critical', message: 'Unusual login pattern detected from IP 192.168.1.45', time: '5 min ago' },
  { id: '2', level: 'Warning', message: 'High volume of failed login attempts for user@example.com', time: '1 hour ago' },
  { id: '3', level: 'Info', message: 'Security certificate renewed successfully', time: '3 hours ago' },
];

export default function AdminSecurity() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user || (user as any).role !== 'admin') { navigate('/admin-login'); return null; }

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Security Monitor" roleLabel="Platform Admin">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
        <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[['3', 'Active Alerts', 'text-orange-400'], ['2,840', 'Login Attempts/Hr', 'text-cyan-400'], ['12', 'Blocked IPs', 'text-red-400'], ['99.9%', 'Security Score', 'text-green-400']].map(([v, l, c]) => (
            <div key={l} className="p-5 glass-dark rounded-2xl">
              <div className={`text-2xl font-bold font-['Space_Grotesk'] ${c}`}>{v}</div>
              <div className="text-xs text-gray-400 mt-1">{l}</div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-5">
          <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Security Alerts</h3>
          <div className="space-y-3">
            {ALERTS.map(a => (
              <div key={a.id} className="flex items-start gap-3 p-4 rounded-xl bg-white/3">
                {a.level === 'Critical' ? <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" /> : a.level === 'Warning' ? <AlertTriangle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" /> : <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${a.level === 'Critical' ? 'bg-red-500/20 text-red-400' : a.level === 'Warning' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>{a.level}</span>
                    <span className="text-xs text-gray-500">{a.time}</span>
                  </div>
                  <p className="text-sm text-gray-300">{a.message}</p>
                </div>
                <button onClick={() => toast.success('Alert acknowledged!')} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors shrink-0">Ack</button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-5">
          <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Security Settings</h3>
          <div className="space-y-3">
            {[['Two-Factor Auth for Admins', true], ['IP Whitelist for Admin Panel', true], ['Auto-block Suspicious IPs', true], ['Login Attempt Limits', true]].map(([label, enabled]) => (
              <div key={label as string} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <span className="text-sm text-gray-300">{label}</span>
                <div className={`w-2 h-2 rounded-full ${enabled ? 'bg-green-400' : 'bg-gray-600'}`} />
              </div>
            ))}
          </div>
          <button onClick={() => toast.success('Security audit initiated!')} className="mt-4 px-5 py-2.5 gradient-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">Run Security Audit</button>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
