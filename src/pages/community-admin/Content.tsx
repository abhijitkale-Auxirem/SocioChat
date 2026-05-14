import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, Megaphone, UserCheck, Rss, Edit2, Trash2 } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_POSTS } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { toast } from 'sonner';

const SIDEBAR = [
  { label: 'Overview', path: '/community-admin', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'My Communities', path: '/community-admin/communities', icon: <Megaphone className="w-4 h-4" /> },
  { label: 'Members', path: '/community-admin/members', icon: <UserCheck className="w-4 h-4" /> },
  { label: 'Content', path: '/community-admin/content', icon: <Rss className="w-4 h-4" /> },
  { label: 'Analytics', path: '/community-admin/analytics', icon: <BarChart2 className="w-4 h-4" /> },
  { label: 'Moderation', path: '/community-admin/moderation', icon: <Shield className="w-4 h-4" /> },
  { label: 'Members Roles', path: '/community-admin/roles', icon: <Users className="w-4 h-4" /> },
  { label: 'Settings', path: '/community-admin/settings', icon: <Settings className="w-4 h-4" /> },
];

export default function CommunityContent() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Community Content" roleLabel="Community Admin">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-5">
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">Community Posts</h2>
          <button onClick={() => toast.success('Post pinning feature!')} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Pin Management</button>
        </motion.div>
        {MOCK_POSTS.map(post => (
          <motion.div key={post.id} variants={fadeInUp} className="glass-dark rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <img src={post.user.avatar} alt={post.user.name} className="w-8 h-8 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{post.user.name}</p>
                <p className="text-xs text-gray-500">{post.time}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toast.success('Post approved!')} className="text-xs text-green-400 hover:text-green-300 transition-colors">Approve</button>
                <button onClick={() => toast.success('Post hidden from feed!')} className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"><Edit2 className="w-3 h-3" />Hide</button>
                <button onClick={() => toast.success('Post deleted!')} className="text-xs flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"><Trash2 className="w-3 h-3" />Remove</button>
              </div>
            </div>
            <p className="text-sm text-gray-300 line-clamp-2">{post.content}</p>
            <div className="flex gap-4 mt-3 text-xs text-gray-500">
              <span>{post.likes} likes</span>
              <span>{post.comments} comments</span>
              <span>{post.shares} shares</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </DashboardLayout>
  );
}
