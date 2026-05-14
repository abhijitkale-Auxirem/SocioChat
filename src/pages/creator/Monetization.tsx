import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, TrendingUp, IndianRupee, Star, Settings, Rss } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
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

const TRANSACTIONS = [
  { from: 'Priya Sharma', type: 'Community Subscription', amount: '₹499', date: 'May 14, 2026', status: 'Completed' },
  { from: 'Arjun Mehta', type: 'Creator Tip', amount: '₹200', date: 'May 13, 2026', status: 'Completed' },
  { from: 'TechStart Inc.', type: 'Sponsored Post', amount: '₹15,000', date: 'May 12, 2026', status: 'Pending' },
  { from: 'Neha Singh', type: 'Community Subscription', amount: '₹499', date: 'May 11, 2026', status: 'Completed' },
];

export default function Monetization() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Monetization" roleLabel="Creator">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
        <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[['₹84,500', 'This Month', 'text-green-400'], ['₹6,24,200', 'Total Earned', 'text-indigo-400'], ['₹18,200', 'Pending Payout', 'text-yellow-400']].map(([v, l, c]) => (
            <div key={l} className="p-5 glass-dark rounded-2xl">
              <div className={`text-2xl font-bold font-['Space_Grotesk'] ${c}`}>{v}</div>
              <div className="text-xs text-gray-400 mt-1">{l}</div>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white font-['Space_Grotesk']">Monetization Sources</h3>
            <button onClick={() => toast.success('Payout requested! Expect payment in 7 days.')} className="text-xs px-4 py-2 gradient-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all">Request Payout</button>
          </div>
          {[
            { source: 'Paid Community Subscriptions', amount: '₹42,000', members: 84 },
            { source: 'Creator Tips & Donations', amount: '₹24,500', members: 122 },
            { source: 'Sponsored Content', amount: '₹18,000', members: 3 },
          ].map(s => (
            <div key={s.source} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
              <div>
                <p className="text-sm text-white">{s.source}</p>
                <p className="text-xs text-gray-500">{s.members} contributors</p>
              </div>
              <span className="text-sm font-semibold text-green-400">{s.amount}</span>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-5">
          <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Recent Transactions</h3>
          <div className="space-y-3">
            {TRANSACTIONS.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-sm text-white">{t.from}</p>
                  <p className="text-xs text-gray-500">{t.type} · {t.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-400">{t.amount}</p>
                  <p className={`text-xs ${t.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>{t.status}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
