import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, TrendingUp, IndianRupee, Star, Settings, Rss, BadgeCheck } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
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

export default function VerifiedBadge() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }

  const CRITERIA = [
    { label: 'At least 1,000 followers', met: true },
    { label: 'Account at least 30 days old', met: true },
    { label: 'Complete profile (photo, bio, contact)', met: true },
    { label: 'No recent community violations', met: true },
    { label: 'Active posting (5+ posts last 30 days)', met: false },
  ];

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Verified Badge" roleLabel="Creator">
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-xl space-y-6">
        <div className="p-8 glass-dark rounded-2xl text-center">
          <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BadgeCheck className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 font-['Space_Grotesk']">Get Verified</h2>
          <p className="text-gray-400 text-sm mb-6">A verified badge shows your community you are a trusted, authentic creator on SocioChat.</p>

          <div className="text-left space-y-3 mb-6">
            {CRITERIA.map(c => (
              <div key={c.label} className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${c.met ? 'bg-green-500' : 'bg-gray-700'}`}>
                  {c.met ? <span className="text-white text-xs">✓</span> : <span className="text-gray-400 text-xs">✗</span>}
                </div>
                <span className={`text-sm ${c.met ? 'text-gray-300' : 'text-gray-500'}`}>{c.label}</span>
              </div>
            ))}
          </div>

          <div className="text-xs text-gray-500 mb-5">4/5 criteria met. Complete all to apply.</div>
          <button onClick={() => toast.info('Complete all criteria before applying for verification!')} className="w-full py-3 gradient-primary text-white font-semibold rounded-xl hover:opacity-90 transition-all">Apply for Verification</button>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
