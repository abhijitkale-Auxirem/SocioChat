import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, MessageCircle, Users, Rss, UserPlus, Bell, User, Settings, Heart, MessageSquare, Share2, Send, Image, X } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_POSTS } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { toast } from 'sonner';

const SIDEBAR = [
  { label: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Messages', path: '/dashboard/chat', icon: <MessageCircle className="w-4 h-4" /> },
  { label: 'Communities', path: '/dashboard/communities', icon: <Users className="w-4 h-4" /> },
  { label: 'Feed', path: '/dashboard/feed', icon: <Rss className="w-4 h-4" /> },
  { label: 'Friends', path: '/dashboard/friends', icon: <UserPlus className="w-4 h-4" /> },
  { label: 'Notifications', path: '/dashboard/notifications', icon: <Bell className="w-4 h-4" /> },
  { label: 'Profile', path: '/dashboard/profile', icon: <User className="w-4 h-4" /> },
  { label: 'Settings', path: '/dashboard/settings', icon: <Settings className="w-4 h-4" /> },
];

export default function Feed() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }
  const [showPost, setShowPost] = useState(false);
  const [postText, setPostText] = useState('');
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const handleLike = (id: string) => {
    setLiked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
    toast.success(liked.has(id) ? 'Unliked post' : 'Liked post!');
  };

  const handlePost = () => {
    if (!postText.trim()) { toast.error('Write something first!'); return; }
    toast.success('Post shared successfully!');
    setPostText(''); setShowPost(false);
  };

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Social Feed" roleLabel="General User">
      <div className="max-w-2xl mx-auto space-y-5">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          {!showPost ? (
            <div onClick={() => setShowPost(true)} className="glass-dark rounded-2xl p-4 cursor-text flex items-center gap-3 hover:border-indigo-400/30 transition-all">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
              <span className="text-gray-500 text-sm">What's on your mind, {user.name.split(' ')[0]}?</span>
            </div>
          ) : (
            <div className="glass-dark rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Create Post</h3>
                <button onClick={() => setShowPost(false)}><X className="w-4 h-4 text-gray-400" /></button>
              </div>
              <textarea value={postText} onChange={e => setPostText(e.target.value)} rows={4} placeholder="Share something with your community..."
                className="w-full px-4 py-3 bg-white/5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none mb-3" />
              <div className="flex items-center justify-between">
                <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition-colors"><Image className="w-4 h-4" /> Add Image</button>
                <button onClick={handlePost} className="flex items-center gap-2 px-5 py-2 gradient-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">
                  <Send className="w-4 h-4" /> Post
                </button>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-4">
          {MOCK_POSTS.map(post => (
            <motion.div key={post.id} variants={fadeInUp} className="glass-dark rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400/30" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{post.user.name}</p>
                  <p className="text-xs text-gray-500">{post.time}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed mb-4">{post.content}</p>
              {post.image && <img src={post.image} alt="Post" className="w-full h-52 object-cover rounded-xl mb-4" />}
              <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                <button onClick={() => handleLike(post.id)} className={`flex items-center gap-2 text-sm transition-colors ${liked.has(post.id) ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}>
                  <Heart className={`w-4 h-4 ${liked.has(post.id) ? 'fill-red-400' : ''}`} /> {post.likes + (liked.has(post.id) ? 1 : 0)}
                </button>
                <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                  <MessageSquare className="w-4 h-4" /> {post.comments}
                </button>
                <button onClick={() => toast.success('Link copied!')} className="flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
                  <Share2 className="w-4 h-4" /> {post.shares}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
