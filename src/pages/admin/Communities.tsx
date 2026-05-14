import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, FileText, AlertTriangle, Plus, Edit2, Trash2, Globe, Lock } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_COMMUNITIES } from '@/lib/mockData';
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

export default function AdminCommunities() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user || (user as any).role !== 'admin') { navigate('/admin-login'); return null; }
  const [confirmDel, setConfirmDel] = useState<string | null>(null);

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Community Management" roleLabel="Platform Admin">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-5">
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">All Communities</h2>
          <button onClick={() => toast.success('Create community form opening!')} className="flex items-center gap-2 px-4 py-2 gradient-primary text-white text-sm font-semibold rounded-xl">
            <Plus className="w-4 h-4" /> Create Community
          </button>
        </motion.div>

        <motion.div variants={staggerContainer} className="space-y-3">
          {MOCK_COMMUNITIES.map(c => (
            <motion.div key={c.id} variants={fadeInUp} className="glass-dark rounded-2xl p-4 flex items-center gap-4">
              <img src={c.image} alt={c.name} className="w-16 h-14 object-cover rounded-xl shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-white">{c.name}</h3>
                  {c.type === 'Public' ? <Globe className="w-3 h-3 text-green-400" /> : <Lock className="w-3 h-3 text-yellow-400" />}
                </div>
                <p className="text-xs text-gray-400">{c.members.toLocaleString('en-IN')} members · {c.category}</p>
              </div>
              <span className="text-xs text-green-400 shrink-0">Active</span>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => toast.success('Edit form opened!')} className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300"><Edit2 className="w-3 h-3" />Edit</button>
                <button onClick={() => { if (confirmDel !== c.id) setConfirmDel(c.id); else { toast.success('Community removed!'); setConfirmDel(null); } }}
                  className={`text-xs flex items-center gap-1 transition-colors ${confirmDel === c.id ? 'text-red-500' : 'text-red-400 hover:text-red-300'}`}>
                  <Trash2 className="w-3 h-3" />{confirmDel === c.id ? 'Confirm?' : 'Delete'}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
