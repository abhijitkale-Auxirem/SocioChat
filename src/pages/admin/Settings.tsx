import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, FileText, AlertTriangle, Database, Globe } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
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

  // 1. CALL ALL HOOKS AT THE TOP (Fixed "Rules of Hooks" error)
  const [maintenance, setMaintenance] = useState(() => localStorage.getItem('app_maintenance') === 'true');
  const [registrations, setRegistrations] = useState(() => localStorage.getItem('app_reg_enabled') !== 'false');
  const [aiMod, setAiMod] = useState(() => localStorage.getItem('app_ai_mod') !== 'false');

  // 2. CHECK PERMISSIONS IN USEEFFECT
  useEffect(() => {
    if (!user || (user as { role: string }).role !== 'admin') {
      navigate('/admin-login');
    }
  }, [user, navigate]);

  // 3. PERSIST SETTINGS TO LOCALSTORAGE
  useEffect(() => {
    localStorage.setItem('app_maintenance', String(maintenance));
    localStorage.setItem('app_reg_enabled', String(registrations));
    localStorage.setItem('app_ai_mod', String(aiMod));
  }, [maintenance, registrations, aiMod]);

  // If unauthorized, don't render the UI
  if (!user || (user as { role: string }).role !== 'admin') {
  return null;
}

  const handleToggle = (setter: (v: boolean) => void, current: boolean, isWarn: boolean) => {
    if (isWarn && !current) {
      const confirm = window.confirm("Warning: Maintenance mode will lock all non-admin users out. Continue?");
      if (!confirm) return;
    }
    setter(!current);
    toast.success('System configuration updated!');
  };

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Platform Settings" roleLabel="Platform Admin">
      <motion.div 
        initial="hidden" 
        animate="visible" 
        variants={staggerContainer} 
        className="max-w-2xl space-y-6"
      >
        {/* Platform Controls */}
        <motion.div variants={fadeInUp} className="glass-dark rounded-3xl p-8 border border-white/10 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-6 font-['Space_Grotesk'] flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            Platform Master Controls
          </h3>
          
          <div className="space-y-4">
            {[
              { label: 'Maintenance Mode', val: maintenance, set: setMaintenance, warn: true, desc: 'Locks app for maintenance' },
              { label: 'Allow New Registrations', val: registrations, set: setRegistrations, warn: false, desc: 'Enable/Disable signup page' },
              { label: 'AI Auto-Moderation', val: aiMod, set: setAiMod, warn: false, desc: 'Real-time content filtering' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
                <div>
                  <span className={`text-sm font-semibold block ${item.warn && item.val ? 'text-orange-400' : 'text-gray-200'}`}>
                    {item.label}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">{item.desc}</span>
                </div>
                
                <button 
                  onClick={() => handleToggle(item.set, item.val, item.warn)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 shadow-lg ${
                    item.val 
                      ? (item.warn ? 'bg-orange-500 shadow-orange-500/20' : 'bg-indigo-500 shadow-indigo-500/20') 
                      : 'bg-gray-800'
                  }`}
                >
                  <motion.span 
                    animate={{ x: item.val ? 24 : 4 }}
                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-md"
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Platform Information */}
        <motion.div variants={fadeInUp} className="glass-dark rounded-3xl p-8 border border-white/10 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white font-['Space_Grotesk']">System Diagnostics</h3>
            <span className="px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded-full border border-green-500/20">
              OPERATIONAL
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {[
              { k: 'Platform Version', v: 'v2.6.0-stable', icon: Globe },
              { k: 'Database Cluster', v: 'PostgreSQL 16 (Dharashiv-Node)', icon: Database },
              { k: 'API Health', v: '99.9% Uptime', icon: BarChart2 },
              { k: 'Last Backup', v: 'May 15, 2026 02:00 AM', icon: RefreshCw },
            ].map(({ k, v, icon: Icon }) => (
              <div key={k} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-3 h-3 text-gray-500" />
                  <span className="text-[10px] text-gray-500 uppercase font-bold">{k}</span>
                </div>
                <span className="text-white font-medium text-xs">{v}</span>
              </div>
            ))}
          </div>
          
          <button 
            onClick={() => toast.success('Platform backup initiated!')} 
            className="w-full mt-6 py-4 gradient-primary text-white text-sm font-bold rounded-2xl hover:opacity-90 shadow-xl shadow-indigo-600/20 transition-all"
          >
            Create Instant System Backup
          </button>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
function RefreshCw(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* paths here */}
    </svg>
  );
}