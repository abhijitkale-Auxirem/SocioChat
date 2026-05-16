import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, TrendingUp, DollarSign, Star, Settings, Rss } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';

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

export default function CreatorAnalytics() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }

  const WEEKS = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const DATA = [65, 80, 72, 95];
  const maxVal = Math.max(...DATA);

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Analytics" roleLabel="Creator">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
        <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[['1.2M', 'Total Reach', 'text-indigo-400'], ['89.4K', 'Impressions', 'text-cyan-400'], ['8.7%', 'Engagement', 'text-purple-400'], ['2.3K', 'New Followers', 'text-green-400']].map(([v, l, c]) => (
            <div key={l} className="p-5 glass-dark rounded-2xl">
              <div className={`text-2xl font-bold font-['Space_Grotesk'] ${c}`}>{v}</div>
              <div className="text-xs text-gray-400 mt-1">{l}</div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-5">
          <h3 className="text-base font-semibold text-white mb-6 font-['Space_Grotesk']">Monthly Engagement</h3>
          <div className="flex items-end gap-4 h-40">
            {WEEKS.map((w, i) => (
              <div key={w} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-gray-400">{DATA[i]}K</span>
                <div className="w-full gradient-primary rounded-t-lg transition-all duration-500" style={{ height: `${(DATA[i] / maxVal) * 100}%` }} />
                <span className="text-xs text-gray-500">{w}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Top Performing Posts</h3>
            {[
              { title: 'AI Tools for Global Creators', reach: '245K', engagement: '12.4%' },
              { title: 'Building 1000 True Fans', reach: '189K', engagement: '9.8%' },
              { title: 'Monetize in 2026', reach: '156K', engagement: '8.2%' },
            ].map(p => (
              <div key={p.title} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <p className="text-sm text-gray-300 truncate max-w-xs">{p.title}</p>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-xs text-indigo-400">{p.reach} reach</p>
                  <p className="text-xs text-green-400">{p.engagement}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Traffic Sources</h3>
            {[['Organic Search', 42], ['Social Share', 28], ['Community', 18], ['Direct', 12]].map(([s, p]) => (
              <div key={s} className="mb-4">
                <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">{s}</span><span className="text-white">{p}%</span></div>
                <div className="h-2 bg-white/10 rounded-full"><div className="h-full gradient-primary rounded-full" style={{ width: `${p}%` }} /></div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
