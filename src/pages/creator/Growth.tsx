import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, TrendingUp, DollarSign, Star, Settings, Rss, Check, Lock } from 'lucide-react';
import { getCurrentUser, updateUserProfile } from '@/lib/auth';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';
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

export default function CreatorGrowth() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Growth Tools" roleLabel="Creator">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-6">
        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-2 font-['Space_Grotesk']">AI Growth Recommendations</h3>
          <p className="text-sm text-gray-400 mb-5">Based on your engagement patterns and audience data.</p>
          {[
            { title: 'Post at peak hours', desc: 'Your audience is most active between 7PM-9PM IST. Schedule posts during this window for 40% more reach.', action: 'Schedule Post' },
            { title: 'Use trending hashtags', desc: 'Add #CreatorEconomy, #CommunityGrowth, and #DigitalCreators to boost discoverability by 25%.', action: 'Apply Now' },
            { title: 'Go live this week', desc: 'Live sessions get 6x more engagement. Your audience expects content on weekends.', action: 'Schedule Live' },
          ].map(rec => (
            <div key={rec.title} className="flex items-start gap-4 py-4 border-b border-white/5 last:border-0">
              <div className="w-8 h-8 gradient-primary rounded-xl flex items-center justify-center shrink-0"><TrendingUp className="w-4 h-4 text-white" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white mb-1">{rec.title}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{rec.desc}</p>
              </div>
              <button onClick={() => toast.success(`${rec.action} initiated!`)} className="px-3 py-1.5 text-xs gradient-primary text-white rounded-lg hover:opacity-90 transition-all shrink-0">{rec.action}</button>
            </div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { title: 'Cross-Platform Sharing', desc: 'Share your content to Instagram, Twitter, and LinkedIn automatically', locked: false },
            { title: 'Audience Lookalike', desc: 'Find new users similar to your best followers using AI matching', locked: true },
            { title: 'Content Calendar', desc: 'Plan and schedule 30 days of content in one sitting', locked: false },
            { title: 'Collaboration Finder', desc: 'Connect with creators in your niche for mutual growth', locked: true },
          ].map(tool => (
            <div key={tool.title} className={`p-5 glass-dark rounded-2xl ${tool.locked ? 'opacity-60' : 'hover:border-indigo-400/30'} transition-all`}>
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-semibold text-white font-['Space_Grotesk']">{tool.title}</h4>
                {tool.locked ? <Lock className="w-4 h-4 text-yellow-400" /> : <Check className="w-4 h-4 text-green-400" />}
              </div>
              <p className="text-xs text-gray-400 mb-3">{tool.desc}</p>
              <button onClick={() => tool.locked ? toast.info('Upgrade to Creator Pro to unlock!') : toast.success('Feature activated!')}
                className={`text-xs px-3 py-1.5 rounded-lg transition-all ${tool.locked ? 'border border-yellow-400/30 text-yellow-400' : 'gradient-primary text-white'}`}>
                {tool.locked ? 'Upgrade to Unlock' : 'Activate'}
              </button>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
