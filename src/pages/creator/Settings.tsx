import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, TrendingUp, IndianRupee, Star, Settings, Rss } from 'lucide-react';
import { getCurrentUser, updateUserProfile } from '@/lib/auth';
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

export default function CreatorSettings() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }
  const [form, setForm] = useState({ name: user.name, bio: user.bio || '', phone: user.phone });

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Creator Settings" roleLabel="Creator">
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-xl space-y-6">
        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Creator Profile</h3>
          <div className="space-y-4">
            {[{ label: 'Display Name', key: 'name' }, { label: 'Bio', key: 'bio' }, { label: 'Phone', key: 'phone' }].map(f => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-gray-300 mb-2">{f.label}</label>
                {f.key === 'bio' ? (
                  <textarea value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all resize-none" />
                ) : (
                  <input type="text" value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
                )}
              </div>
            ))}
            <button onClick={() => { updateUserProfile(form); toast.success('Creator profile updated!'); }} className="px-6 py-3 gradient-primary text-white font-semibold rounded-xl hover:opacity-90 transition-all">Save Settings</button>
          </div>
        </div>

        <div className="glass-dark rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk']">Notification Preferences</h3>
          {[['New followers', true], ['Comments on posts', true], ['Payout notifications', true], ['Community updates', false]].map(([l, v]) => (
            <div key={l as string} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <span className="text-sm text-gray-300">{l}</span>
              <button className={`relative w-11 h-6 rounded-full transition-colors ${v ? 'bg-indigo-500' : 'bg-gray-700'}`} onClick={() => toast.success('Preference updated!')}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${v ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
