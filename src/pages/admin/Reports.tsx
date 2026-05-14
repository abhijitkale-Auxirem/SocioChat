import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, FileText, AlertTriangle, Check, X } from 'lucide-react';
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

const REPORTS_DATA = [
  { id: '1', type: 'User Report', target: 'User #45231', reason: 'Hate speech in public community', reporter: 'User #8821', time: '30 min ago', priority: 'High' },
  { id: '2', type: 'Content Report', target: 'Post #12890', reason: 'Spam and misleading content', reporter: 'User #3312', time: '2 hours ago', priority: 'Medium' },
  { id: '3', type: 'Community Report', target: 'Community #445', reason: 'Illegal content distribution', reporter: 'User #7721', time: '4 hours ago', priority: 'High' },
  { id: '4', type: 'User Report', target: 'User #90234', reason: 'Impersonation of public figure', reporter: 'User #1123', time: 'Yesterday', priority: 'Low' },
  { id: '5', type: 'Content Report', target: 'Post #88721', reason: 'Copyright violation', reporter: 'User #5532', time: 'Yesterday', priority: 'Medium' },
];

export default function AdminReports() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user || (user as any).role !== 'admin') { navigate('/admin-login'); return null; }
  const [resolved, setResolved] = useState<Set<string>>(new Set());

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Reports" roleLabel="Platform Admin">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-5">
        <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4">
          {[['142', 'Total Pending', 'text-orange-400'], ['1,240', 'Resolved This Month', 'text-green-400'], ['12', 'Critical Priority', 'text-red-400']].map(([v, l, c]) => (
            <div key={l} className="p-4 glass-dark rounded-2xl">
              <div className={`text-2xl font-bold font-['Space_Grotesk'] ${c}`}>{v}</div>
              <div className="text-xs text-gray-400 mt-1">{l}</div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl overflow-hidden">
          <div className="divide-y divide-white/5">
            {REPORTS_DATA.map(r => (
              <div key={r.id} className={`p-5 ${resolved.has(r.id) ? 'opacity-40' : ''} transition-opacity`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${r.priority === 'High' ? 'bg-red-500/20 text-red-400' : r.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'}`}>{r.priority}</span>
                      <span className="text-xs text-gray-500">{r.type}</span>
                    </div>
                    <p className="text-sm text-white">{r.reason}</p>
                    <p className="text-xs text-gray-500 mt-1">{r.target} · Reported by {r.reporter} · {r.time}</p>
                  </div>
                  {!resolved.has(r.id) ? (
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => { toast.success('Action taken!'); setResolved(p => new Set([...p, r.id])); }}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-all">
                        <Check className="w-3 h-3" /> Action
                      </button>
                      <button onClick={() => { toast.info('Report dismissed.'); setResolved(p => new Set([...p, r.id])); }}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs border border-white/10 text-gray-400 rounded-lg hover:bg-white/5 transition-all">
                        <X className="w-3 h-3" /> Dismiss
                      </button>
                    </div>
                  ) : <span className="text-xs text-green-400 shrink-0">Resolved</span>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
