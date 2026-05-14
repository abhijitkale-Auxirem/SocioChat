import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, Megaphone, UserCheck } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
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

export default function CommunitySettings() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }
  const [autoMod, setAutoMod] = useState(true);
  const [approveMembers, setApproveMembers] = useState(false);
  const [slowMode, setSlowMode] = useState(false);

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Community Settings" roleLabel="Community Admin">
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-xl space-y-6">
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Community Controls</h3>
          {[
            { label: 'Auto Moderation (AI Spam Filter)', key: 'autoMod', val: autoMod, set: setAutoMod },
            { label: 'Require Approval for New Members', key: 'approve', val: approveMembers, set: setApproveMembers },
            { label: 'Slow Mode (30s between messages)', key: 'slow', val: slowMode, set: setSlowMode },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <span className="text-sm text-gray-300">{item.label}</span>
              <button onClick={() => { item.set(!item.val); toast.success('Setting updated!'); }}
                className={`relative w-11 h-6 rounded-full transition-colors ${item.val ? 'bg-indigo-500' : 'bg-gray-700'}`}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${item.val ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Danger Zone</h3>
          <p className="text-sm text-gray-400 mb-4">Permanently delete this community and all its content.</p>
          <button onClick={() => toast.error('Community deletion requires admin confirmation.')} className="px-5 py-2.5 border border-red-500/30 text-red-400 text-sm font-semibold rounded-xl hover:bg-red-500/10 transition-all">Delete Community</button>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
