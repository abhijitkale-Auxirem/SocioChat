import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, MessageCircle, Users, Rss, UserPlus, Bell, User, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_MESSAGES, MOCK_POSTS } from '@/lib/mockData';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { useEffect, useState } from 'react';

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

export default function UserOverview() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMsgId, setOpenMsgId] = useState<string | null>(null);

  useEffect(() => {
    // If redirected here with openMsg state from a recent message click
    if ((location.state as any)?.openMsg) {
      setOpenMsgId((location.state as any).openMsg);
    }
  }, [location.state]);

  if (!user) { navigate('/login'); return null; }

  const STATS = [
    { label: 'Messages', value: '1,247', color: 'from-indigo-500 to-purple-600' },
    { label: 'Friends', value: '342', color: 'from-cyan-500 to-blue-600' },
    { label: 'Communities', value: '18', color: 'from-purple-500 to-pink-600' },
    { label: 'Posts', value: '89', color: 'from-orange-500 to-red-600' },
  ];

  const handleMsgClick = (msgId: string) => {
    // Navigate to chat page with the selected contact
    navigate('/dashboard/chat', { state: { selectedId: msgId } });
  };

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Dashboard" roleLabel="General User">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">

        {/* Welcome banner */}
        <motion.div variants={fadeInUp} className="flex items-center gap-4 p-6 glass-dark rounded-2xl">
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400" />
          <div>
            <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">Welcome back, {user.name.split(' ')[0]}!</h2>
            <p className="text-gray-400 text-sm">Here's what's happening in your social world today.</p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="p-5 glass-dark rounded-2xl hover:-translate-y-1 transition-all duration-300">
              <div className={`text-2xl font-bold font-['Space_Grotesk'] bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent Messages — clicking navigates to chat */}
          <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white font-['Space_Grotesk']">Recent Messages</h3>
              <Link to="/dashboard/chat" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">View All</Link>
            </div>
            <div className="space-y-2">
              {MOCK_MESSAGES.slice(0, 3).map(msg => (
                <button
                  key={msg.id}
                  onClick={() => handleMsgClick(msg.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer text-left group"
                >
                  <div className="relative shrink-0">
                    <img src={msg.avatar} alt={msg.sender} className="w-9 h-9 rounded-full object-cover" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#0d1120] rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate group-hover:text-indigo-300 transition-colors">{msg.sender}</p>
                    <p className="text-xs text-gray-400 truncate">{msg.text}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-500">{msg.time}</p>
                    {msg.unread > 0 && (
                      <span className="text-xs bg-indigo-500 text-white rounded-full px-1.5 py-0.5 mt-0.5 inline-block">{msg.unread}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Recent Posts */}
          <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white font-['Space_Grotesk']">Recent Posts</h3>
              <Link to="/dashboard/feed" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">View Feed</Link>
            </div>
            <div className="space-y-4">
              {MOCK_POSTS.slice(0, 2).map(post => (
                <div key={post.id} className="p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <img src={post.user.avatar} alt={post.user.name} className="w-7 h-7 rounded-full object-cover" />
                    <p className="text-sm font-medium text-white">{post.user.name}</p>
                    <p className="text-xs text-gray-500 ml-auto">{post.time}</p>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2">{post.content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
