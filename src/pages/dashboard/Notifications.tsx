import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  LayoutDashboard, MessageCircle, Users, Rss, UserPlus, 
  Bell, User, Settings, Heart, UserPlus2, MessageSquare, Check, Trash2 
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { motion, AnimatePresence, Variants } from 'framer-motion';
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

const INITIAL_NOTIFS = [
  { id: '1', icon: Heart, text: 'Priya Sharma liked your post', time: '5 min ago', color: 'text-red-400', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop&crop=face', read: false },
  { id: '2', icon: UserPlus2, text: 'Arjun Mehta sent you a friend request', time: '1 hour ago', color: 'text-indigo-400', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face', read: false },
  { id: '3', icon: MessageSquare, text: 'New message in a global community', time: '2 hours ago', color: 'text-cyan-400', avatar: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=40&h=40&fit=crop', read: false },
  { id: '4', icon: Bell, text: 'Anjali Patel commented on your photo', time: 'Yesterday', color: 'text-purple-400', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face', read: false },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export default function Notifications() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFS);

  if (!user) { navigate('/login'); return null; }

  // Logic: Mark as read and the list will re-sort automatically
  const handleRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success('All notifications cleared');
  };

  // Sort: Unread (false) first, Read (true) last
  const sortedNotifs = [...notifications].sort((a, b) => Number(a.read) - Number(b.read));

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Notifications" roleLabel="Global User">
      <motion.div initial="hidden" animate="visible" className="max-w-2xl space-y-4">
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">Notifications</h2>
            <p className="text-xs text-gray-500 mt-1">
              {notifications.filter(n => !n.read).length} new updates
            </p>
          </div>
          {notifications.length > 0 && (
            <button 
              onClick={clearAll} 
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-400 transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"
            >
              <Trash2 className="w-3 h-3" />
              Clear All
            </button>
          )}
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {sortedNotifs.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 glass-dark rounded-[2rem] border border-white/5">
                <Bell className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No notifications yet</p>
              </motion.div>
            ) : (
              sortedNotifs.map(n => (
                <motion.div
                  key={n.id}
                  layout // This prop handles the sliding animation to the bottom
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => handleRead(n.id)}
                  className={`relative group flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 cursor-pointer border ${
                    n.read 
                    ? 'bg-black/20 border-white/5 opacity-60' 
                    : 'glass-dark border-indigo-500/20 shadow-lg shadow-indigo-500/5'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img 
                      src={n.avatar} 
                      alt="" 
                      className={`w-11 h-11 rounded-full object-cover transition-all duration-500 ${n.read ? 'grayscale' : 'grayscale-0'}`} 
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#0d1120] border border-white/10 flex items-center justify-center">
                      <n.icon className={`w-3 h-3 ${n.read ? 'text-gray-500' : n.color}`} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm transition-colors duration-500 ${n.read ? 'text-gray-500' : 'text-gray-200'}`}>
                      {n.text}
                    </p>
                    <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-wider">{n.time}</p>
                  </div>

                  {/* Unread Indicator */}
                  {!n.read && (
                    <motion.div 
                      layoutId={`dot-${n.id}`}
                      className="w-2 h-2 bg-indigo-400 rounded-full" 
                    />
                  )}

                  {/* Visual check for read items */}
                  {n.read && (
                    <Check className="w-4 h-4 text-gray-700" />
                  )}
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}