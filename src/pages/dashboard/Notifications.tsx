import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, MessageCircle, Users, Rss, UserPlus, Bell, User, Settings, Heart, UserPlus2, MessageSquare } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
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

const NOTIFS = [
  { id: '1', icon: Heart, text: 'Priya Sharma liked your post', time: '5 min ago', color: 'text-red-400', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop&crop=face', read: false },
  { id: '2', icon: UserPlus2, text: 'Arjun Mehta sent you a friend request', time: '1 hour ago', color: 'text-indigo-400', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face', read: false },
  { id: '3', icon: MessageSquare, text: 'New message in Tech India community', time: '2 hours ago', color: 'text-cyan-400', avatar: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=40&h=40&fit=crop', read: true },
  { id: '4', icon: Bell, text: 'Anjali Patel commented on your photo', time: 'Yesterday', color: 'text-purple-400', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face', read: true },
  { id: '5', icon: Users, text: 'You have been added to Startup Network', time: 'Yesterday', color: 'text-green-400', avatar: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=40&h=40&fit=crop', read: true },
];

export default function Notifications() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Notifications" roleLabel="General User">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl space-y-4">
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">Notifications</h2>
          <button onClick={() => toast.success('All marked as read!')} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Mark all as read</button>
        </motion.div>
        {NOTIFS.map(n => (
          <motion.div key={n.id} variants={fadeInUp}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all cursor-pointer hover:border-indigo-400/30 ${n.read ? 'glass-dark opacity-70' : 'glass-dark border-indigo-400/20'}`}>
            <div className="relative shrink-0">
              <img src={n.avatar} alt="" className="w-11 h-11 rounded-full object-cover" />
              <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0d1120] flex items-center justify-center`}>
                <n.icon className={`w-3 h-3 ${n.color}`} />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-200">{n.text}</p>
              <p className="text-xs text-gray-500 mt-0.5">{n.time}</p>
            </div>
            {!n.read && <span className="w-2 h-2 bg-indigo-400 rounded-full shrink-0" />}
          </motion.div>
        ))}
      </motion.div>
    </DashboardLayout>
  );
}
