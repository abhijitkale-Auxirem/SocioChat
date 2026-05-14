import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  LayoutDashboard, MessageCircle, Users, Rss, UserPlus,
  Bell, User, Settings, Lock, Shield,
} from 'lucide-react';
import { getCurrentUser, logoutUser } from '@/lib/auth';
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

interface ToggleRowProps {
  label: string;
  value: boolean;
  onChange: () => void;
}

function ToggleRow({ label, value, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <span className="text-sm text-gray-300">{label}</span>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${value ? 'bg-indigo-500' : 'bg-gray-700'}`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
}

export default function UserSettings() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }

  const [notifs, setNotifs] = useState({
    Messages: true,
    Communities: true,
    Mentions: true,
    'Platform Updates': false,
  });
  const [privacy, setPrivacy] = useState({
    'Public Profile': true,
    'Show Phone Number': false,
    'Show Email Address': false,
  });
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteAccount = () => {
    if (!confirmDelete) { setConfirmDelete(true); return; }
    logoutUser();
    toast.success('Account deleted.');
    navigate('/');
  };

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Settings" roleLabel="General User">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-2xl space-y-6">

        {/* Notifications */}
        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk'] flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-400 shrink-0" />
            Notification Preferences
          </h3>
          {Object.entries(notifs).map(([key, val]) => (
            <ToggleRow
              key={key}
              label={key}
              value={val}
              onChange={() => setNotifs(p => ({ ...p, [key]: !val }))}
            />
          ))}
        </motion.div>

        {/* Privacy */}
        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk'] flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400 shrink-0" />
            Privacy Settings
          </h3>
          {Object.entries(privacy).map(([key, val]) => (
            <ToggleRow
              key={key}
              label={key}
              value={val}
              onChange={() => setPrivacy(p => ({ ...p, [key]: !val }))}
            />
          ))}
        </motion.div>

        {/* Security */}
        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-6">
          <h3 className="text-base font-semibold text-white mb-4 font-['Space_Grotesk'] flex items-center gap-2">
            <Lock className="w-4 h-4 text-orange-400 shrink-0" />
            Security
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => toast.success('Password reset email sent!')}
              className="w-full py-3 border border-white/10 text-gray-300 text-sm font-medium rounded-xl hover:bg-white/5 transition-all text-left px-4"
            >
              Change Password
            </button>
            <button
              onClick={() => toast.success('Two-factor authentication enabled!')}
              className="w-full py-3 border border-white/10 text-gray-300 text-sm font-medium rounded-xl hover:bg-white/5 transition-all text-left px-4"
            >
              Enable Two-Factor Authentication
            </button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-6 border border-red-500/10">
          <h3 className="text-base font-semibold text-red-400 mb-2 font-['Space_Grotesk']">Danger Zone</h3>
          <p className="text-sm text-gray-400 mb-4">Once you delete your account, there is no going back.</p>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleDeleteAccount}
              className={`px-6 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                confirmDelete ? 'bg-red-500 text-white' : 'border border-red-500/30 text-red-400 hover:bg-red-500/10'
              }`}
            >
              {confirmDelete ? 'Confirm Delete Account' : 'Delete Account'}
            </button>
            {confirmDelete && (
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </motion.div>

      </motion.div>
    </DashboardLayout>
  );
}
