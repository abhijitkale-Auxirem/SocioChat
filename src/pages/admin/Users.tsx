import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, FileText, AlertTriangle, Search, Trash2, Edit2, Eye, UserX } from 'lucide-react';
import { getCurrentUser, getUsers } from '@/lib/auth';
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

export default function AdminUsers() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user || (user as any).role !== 'admin') { navigate('/admin-login'); return null; }

  const registered = getUsers();
  const [search, setSearch] = useState('');
  const [viewUser, setViewUser] = useState<any>(null);
  const [confirmDel, setConfirmDel] = useState<string | null>(null);

  const filtered = registered.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="User Management" roleLabel="Platform Admin">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-5">
        <motion.div variants={fadeInUp} className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-400" />
          </div>
          <span className="text-sm text-gray-400">{filtered.length} users registered</span>
        </motion.div>

        {viewUser && (
          <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-base font-semibold text-white font-['Space_Grotesk']">User Details</h3>
              <button onClick={() => setViewUser(null)} className="text-gray-400 hover:text-white">Close</button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <img src={viewUser.avatar} alt={viewUser.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-400/50" />
              <div>
                <p className="text-lg font-bold text-white">{viewUser.name}</p>
                <p className="text-sm text-gray-400">{viewUser.email}</p>
                <p className="text-xs text-indigo-400 capitalize">{viewUser.role.replace('_', ' ')}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-400">Phone:</span><span className="text-white ml-2">{viewUser.phone}</span></div>
              <div><span className="text-gray-400">Joined:</span><span className="text-white ml-2">{new Date(viewUser.joinedAt).toLocaleDateString()}</span></div>
            </div>
          </motion.div>
        )}

        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No users found. Users appear here after registration.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="border-b border-white/5 bg-white/3">
                <tr>{['User', 'Email', 'Role', 'Joined', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-400">{h}</th>)}</tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                        <span className="text-sm text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400">{u.email}</td>
                    <td className="px-4 py-3"><span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full capitalize">{u.role.replace('_', ' ')}</span></td>
                    <td className="px-4 py-3 text-xs text-gray-500">{new Date(u.joinedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setViewUser(u)} className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"><Eye className="w-3 h-3" />View</button>
                        <button onClick={() => toast.success(`${u.name} profile edit opened!`)} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"><Edit2 className="w-3 h-3" />Edit</button>
                        <button onClick={() => { if (confirmDel !== u.id) setConfirmDel(u.id); else { toast.success('User removed!'); setConfirmDel(null); } }}
                          className={`text-xs flex items-center gap-1 transition-colors ${confirmDel === u.id ? 'text-red-500' : 'text-red-400 hover:text-red-300'}`}>
                          <Trash2 className="w-3 h-3" />{confirmDel === u.id ? 'Confirm' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
