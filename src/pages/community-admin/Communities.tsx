import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, Megaphone, UserCheck, Plus, Edit2, Trash2 } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_COMMUNITIES } from '@/lib/mockData';
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

export default function MyCommunities() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }
  const [confirmDel, setConfirmDel] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', type: 'Public' });

  const handleCreate = () => {
    if (!form.name) { toast.error('Community name is required!'); return; }
    toast.success(`Community "${form.name}" created successfully!`);
    setShowCreate(false); setForm({ name: '', category: '', type: 'Public' });
  };

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="My Communities" roleLabel="Community Admin">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-5">
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">Manage Communities</h2>
          <button onClick={() => setShowCreate(true)} className="flex items-center gap-2 px-4 py-2 gradient-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">
            <Plus className="w-4 h-4" /> Create Community
          </button>
        </motion.div>

        {showCreate && (
          <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-6">
            <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">New Community</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs text-gray-400 mb-2">Community Name *</label>
                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Name your community"
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-400" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Category</label>
                <input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} placeholder="e.g. Technology"
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-400" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Type</label>
                <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-400">
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleCreate} className="px-5 py-2 gradient-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">Create</button>
              <button onClick={() => setShowCreate(false)} className="px-5 py-2 border border-white/10 text-gray-300 text-sm rounded-xl hover:bg-white/5 transition-all">Cancel</button>
            </div>
          </motion.div>
        )}

        {MOCK_COMMUNITIES.map(c => (
          <motion.div key={c.id} variants={fadeInUp} className="glass-dark rounded-2xl p-5 flex items-center gap-4">
            <img src={c.image} alt={c.name} className="w-16 h-14 object-cover rounded-xl shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-white font-['Space_Grotesk']">{c.name}</h3>
              <p className="text-xs text-gray-400">{c.members.toLocaleString('en-IN')} members · {c.category} · {c.type}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => toast.success(`Edit form opened for ${c.name}!`)} className="flex items-center gap-1 px-3 py-1.5 text-xs border border-white/10 text-gray-300 rounded-lg hover:bg-white/5 transition-all">
                <Edit2 className="w-3 h-3" /> Edit
              </button>
              <button onClick={() => { if (confirmDel !== c.id) { setConfirmDel(c.id); } else { toast.success('Community deleted!'); setConfirmDel(null); } }}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg transition-all ${confirmDel === c.id ? 'bg-red-500 text-white' : 'border border-red-500/30 text-red-400 hover:bg-red-500/10'}`}>
                <Trash2 className="w-3 h-3" /> {confirmDel === c.id ? 'Confirm' : 'Delete'}
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </DashboardLayout>
  );
}
