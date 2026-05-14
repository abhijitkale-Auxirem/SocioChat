import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, Megaphone, UserCheck, AlertTriangle, Check, X } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
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

const REPORTS = [
  { id: '1', reporter: 'User #2341', target: 'User #8892', reason: 'Posting spam links repeatedly', community: 'Tech India', time: '2 hours ago', severity: 'High' },
  { id: '2', reporter: 'User #4521', target: 'Post #1234', reason: 'Inappropriate content', community: 'Creative Hub', time: '4 hours ago', severity: 'Medium' },
  { id: '3', reporter: 'User #6789', target: 'User #3312', reason: 'Harassment in comments', community: 'Startup Network', time: 'Yesterday', severity: 'High' },
  { id: '4', reporter: 'User #1122', target: 'Post #5678', reason: 'Misinformation about health', community: 'Fitness First', time: 'Yesterday', severity: 'Medium' },
];

export default function Moderation() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }
  const [resolved, setResolved] = useState<Set<string>>(new Set());

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Moderation" roleLabel="Community Admin">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-5">
        <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4">
          {[['12', 'Pending Reports', 'text-orange-400'], ['48', 'Resolved This Week', 'text-green-400'], ['3', 'Banned Users', 'text-red-400']].map(([v, l, c]) => (
            <div key={l} className="p-4 glass-dark rounded-2xl">
              <div className={`text-2xl font-bold font-['Space_Grotesk'] ${c}`}>{v}</div>
              <div className="text-xs text-gray-400 mt-1">{l}</div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <h3 className="text-base font-semibold text-white font-['Space_Grotesk']">Pending Reports</h3>
          </div>
          <div className="divide-y divide-white/5">
            {REPORTS.map(r => (
              <div key={r.id} className={`p-5 ${resolved.has(r.id) ? 'opacity-40' : ''} transition-opacity`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${r.severity === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{r.severity}</span>
                      <span className="text-xs text-gray-500">{r.community}</span>
                    </div>
                    <p className="text-sm text-white">{r.reason}</p>
                    <p className="text-xs text-gray-500 mt-1">Reported by {r.reporter} against {r.target} · {r.time}</p>
                  </div>
                  {!resolved.has(r.id) && (
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => { toast.success('Content removed!'); setResolved(prev => new Set([...prev, r.id])); }}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-all">
                        <Check className="w-3 h-3" /> Take Action
                      </button>
                      <button onClick={() => { toast.info('Report dismissed.'); setResolved(prev => new Set([...prev, r.id])); }}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs border border-white/10 text-gray-400 rounded-lg hover:bg-white/5 transition-all">
                        <X className="w-3 h-3" /> Dismiss
                      </button>
                    </div>
                  )}
                  {resolved.has(r.id) && <span className="text-xs text-green-400 shrink-0">Resolved</span>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
