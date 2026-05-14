import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, TrendingUp, IndianRupee, Star, Settings, Rss, Eye, Heart, Share2, Plus, Trash2, Edit2 } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_POSTS } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { toast } from 'sonner';

const SIDEBAR = [
  { label: 'Overview', path: '/creator-dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'My Content', path: '/creator-dashboard/content', icon: <Rss className="w-4 h-4" /> },
  { label: 'Analytics', path: '/creator-dashboard/analytics', icon: <BarChart2 className="w-4 h-4" /> },
  { label: 'Monetization', path: '/creator-dashboard/monetization', icon: <IndianRupee className="w-4 h-4" /> },
  { label: 'Audience', path: '/creator-dashboard/audience', icon: <Users className="w-4 h-4" /> },
  { label: 'Growth Tools', path: '/creator-dashboard/growth', icon: <TrendingUp className="w-4 h-4" /> },
  { label: 'Verified Badge', path: '/creator-dashboard/verified', icon: <Star className="w-4 h-4" /> },
  { label: 'Settings', path: '/creator-dashboard/settings', icon: <Settings className="w-4 h-4" /> },
];

export default function CreatorContent() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }
  const [confirmDel, setConfirmDel] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (confirmDel !== id) { setConfirmDel(id); return; }
    toast.success('Post deleted!'); setConfirmDel(null);
  };

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="My Content" roleLabel="Creator">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-5">
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">My Posts</h2>
          <button onClick={() => toast.success('New post editor coming soon!')} className="flex items-center gap-2 px-4 py-2 gradient-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">
            <Plus className="w-4 h-4" /> New Post
          </button>
        </motion.div>
        {MOCK_POSTS.map(post => (
          <motion.div key={post.id} variants={fadeInUp} className="glass-dark rounded-2xl p-5">
            <div className="flex gap-4">
              {post.image && <img src={post.image} alt="" className="w-24 h-20 object-cover rounded-xl shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-300 mb-3 line-clamp-2">{post.content}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {(post.likes * 12).toLocaleString('en-IN')}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {post.likes}</span>
                  <span className="flex items-center gap-1"><Share2 className="w-3 h-3" /> {post.shares}</span>
                  <span>{post.time}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => toast.success('Edit mode opened!')} className="flex items-center gap-1 px-3 py-1.5 text-xs border border-white/10 text-gray-300 rounded-lg hover:bg-white/5 transition-all">
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <button onClick={() => handleDelete(post.id)} className={`flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg transition-all ${confirmDel === post.id ? 'bg-red-500 text-white' : 'border border-red-500/30 text-red-400 hover:bg-red-500/10'}`}>
                  <Trash2 className="w-3 h-3" /> {confirmDel === post.id ? 'Confirm?' : 'Delete'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </DashboardLayout>
  );
}
