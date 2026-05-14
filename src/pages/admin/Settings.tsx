import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, FileText, AlertTriangle } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
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

export default function AdminSettings() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user || (user as any).role !== 'admin') { navigate('/admin-login'); return null; }
  const [maintenance, setMaintenance] = useState(false);
  const [registrations, setRegistrations] = useState(true);
  const [aiMod, setAiMod] = useState(true);

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Platform Settings" roleLabel="Platform Admin">
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-xl space-y-6">
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Platform Controls</h3>
          {[
            { label: 'Maintenance Mode', val: maintenance, set: setMaintenance, warn: true },
            { label: 'Allow New Registrations', val: registrations, set: setRegistrations, warn: false },
            { label: 'AI Auto-Moderation', val: aiMod, set: setAiMod, warn: false },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <span className={`text-sm ${item.warn && item.val ? 'text-orange-400' : 'text-gray-300'}`}>{item.label}</span>
              <button onClick={() => { if (item.warn) toast.warning('Warning: This affects all users!'); item.set(!item.val); toast.success('Setting updated!'); }}
                className={`relative w-11 h-6 rounded-full transition-colors ${item.val ? (item.warn ? 'bg-orange-500' : 'bg-indigo-500') : 'bg-gray-700'}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${item.val ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>

        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Platform Information</h3>
          <div className="space-y-3 text-sm">
            {[['Platform Version', 'SocioChat v2.6.0'], ['Database', 'PostgreSQL 16 (OnSpace Cloud)'], ['CDN Status', 'Active (Cloudflare)'], ['API Version', 'v3.2.1'], ['Last Backup', 'May 14, 2026 02:00 AM IST']].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-gray-400">{k}</span>
                <span className="text-white">{v}</span>
              </div>
            ))}
          </div>
          <button onClick={() => toast.success('System backup initiated!')} className="mt-4 px-5 py-2.5 gradient-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">Create Backup Now</button>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
