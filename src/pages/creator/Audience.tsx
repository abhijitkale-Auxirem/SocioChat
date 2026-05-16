import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, TrendingUp, DollarSign, Star, Settings, Rss } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { MOCK_PROFILES } from '@/lib/mockData';
import { toast } from 'sonner';

const SIDEBAR = [
  { label: 'Overview', path: '/creator-dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'My Content', path: '/creator-dashboard/content', icon: <Rss className="w-4 h-4" /> },
  { label: 'Analytics', path: '/creator-dashboard/analytics', icon: <BarChart2 className="w-4 h-4" /> },
  { label: 'Monetization', path: '/creator-dashboard/monetization', icon: <DollarSign className="w-4 h-4" /> },
  { label: 'Audience', path: '/creator-dashboard/audience', icon: <Users className="w-4 h-4" /> },
  { label: 'Growth Tools', path: '/creator-dashboard/growth', icon: <TrendingUp className="w-4 h-4" /> },
  { label: 'Verified Badge', path: '/creator-dashboard/verified', icon: <Star className="w-4 h-4" /> },
  { label: 'Settings', path: '/creator-dashboard/settings', icon: <Settings className="w-4 h-4" /> },
];

export default function CreatorAudience() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Audience" roleLabel="Creator">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
        <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4">
          {[['28,450', 'Total Followers'], ['12,200', 'Active This Week'], ['94.2%', 'Retention Rate']].map(([v, l]) => (
            <div key={l} className="p-5 glass-dark rounded-2xl text-center">
              <div className="text-2xl font-bold text-indigo-400 font-['Space_Grotesk']">{v}</div>
              <div className="text-xs text-gray-400 mt-1">{l}</div>
            </div>
          ))}
        </motion.div>
        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-5">
          <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Top Followers</h3>
          <div className="space-y-3">
            {MOCK_PROFILES.map(p => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.role} · {p.followers} followers</p>
                </div>
                <button onClick={() => toast.success(`Message sent to ${p.name}!`)} className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Message</button>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-5">
          <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Audience Demographics</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-400 mb-3">Age Groups</p>
              {[['18-24', 42], ['25-34', 35], ['35-44', 15], ['45+', 8]].map(([g, p]) => (
                <div key={g} className="mb-2">
                  <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">{g}</span><span className="text-white">{p}%</span></div>
                  <div className="h-1.5 bg-white/10 rounded-full"><div className="h-full gradient-primary rounded-full" style={{ width: `${p}%` }} /></div>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-3">Top Cities</p>
              {[['Mumbai', 28], ['Delhi', 22], ['Bangalore', 18], ['Hyderabad', 12], ['Chennai', 8]].map(([c, p]) => (
                <div key={c} className="mb-2">
                  <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">{c}</span><span className="text-white">{p}%</span></div>
                  <div className="h-1.5 bg-white/10 rounded-full"><div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" style={{ width: `${p}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
