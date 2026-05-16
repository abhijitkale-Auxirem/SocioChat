import { useNavigate, Link } from 'react-router-dom';
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

export default function CreatorOverview() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }

  const STATS = [
    { label: 'Total Followers', value: '28,450', change: '+12.4%', color: 'from-indigo-500 to-purple-600', path: '/creator-dashboard/audience' },
    { label: 'Monthly Earnings', value: '$84,500', change: '+28.7%', color: 'from-green-500 to-teal-600', path: '/creator-dashboard/monetization' },
    { label: 'Post Reach', value: '1.2M', change: '+18.3%', color: 'from-cyan-500 to-blue-600', path: '/creator-dashboard/analytics' },
    { label: 'Engagement Rate', value: '8.7%', change: '+2.1%', color: 'from-purple-500 to-pink-600', path: '/creator-dashboard/analytics' },
  ];

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Creator Dashboard" roleLabel="Creator">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
        <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(s => (
            <Link key={s.label} to={s.path} className="p-5 glass-dark rounded-2xl hover:border-indigo-400/30 transition-all hover:-translate-y-1 duration-300 cursor-pointer">
              <div className={`text-2xl font-bold font-['Space_Grotesk'] bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
              <div className="text-xs text-gray-400 mt-1">{s.label}</div>
              <div className="text-xs text-green-400 mt-1">{s.change} this month</div>
            </Link>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Recent Performance</h3>
            <div className="space-y-3">
              {[
                { label: 'Profile Views', val: 45200, max: 60000 },
                { label: 'Post Impressions', val: 120000, max: 150000 },
                { label: 'Story Views', val: 28700, max: 35000 },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white">{item.val.toLocaleString('en-US')}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full">
                    <div className="h-full gradient-primary rounded-full" style={{ width: `${(item.val / item.max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-dark rounded-2xl p-5">
            <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Earnings Breakdown</h3>
            {[
              { source: 'Paid Community', amount: '$42,000', pct: 50 },
              { source: 'Creator Tips', amount: '$24,500', pct: 29 },
              { source: 'Sponsored Posts', amount: '$18,000', pct: 21 },
            ].map(e => (
              <div key={e.source} className="mb-4">
                <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">{e.source}</span><span className="text-green-400">{e.amount}</span></div>
                <div className="h-2 bg-white/10 rounded-full"><div className="h-full bg-gradient-to-r from-green-500 to-teal-600 rounded-full" style={{ width: `${e.pct}%` }} /></div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
