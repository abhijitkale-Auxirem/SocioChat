import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, MessageCircle, Users, Rss, UserPlus, Bell, User, Settings, Camera } from 'lucide-react';
import { getCurrentUser, updateUserProfile } from '@/lib/auth';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
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

export default function Profile() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user) { navigate('/login'); return null; }

  const [form, setForm] = useState({ name: user.name, bio: user.bio || '', phone: user.phone });
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setAvatarPreview(dataUrl);
      updateUserProfile({ avatar: dataUrl });
      toast.success('Profile photo updated!');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateUserProfile({ name: form.name, bio: form.bio, phone: form.phone });
    toast.success('Profile updated successfully!');
  };

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="My Profile" roleLabel="General User">
      <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-2xl">
        <div className="glass-dark rounded-2xl p-8 mb-6">
          <div className="flex items-start gap-6 mb-8">
            <div className="relative shrink-0">
              <img
                src={avatarPreview}
                alt={user.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-400"
              />
              {/* Hidden real file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors shadow-lg"
                title="Upload photo from device"
              >
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">{user.name}</h2>
              <p className="text-sm text-indigo-400 capitalize">{user.role.replace('_', ' ')}</p>
              <p className="text-xs text-gray-500 mt-1">
                Member since {new Date(user.joinedAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              </p>
              <p className="text-xs text-gray-600 mt-1">Click the camera icon to upload a photo from your device</p>
            </div>
          </div>

          <div className="space-y-5">
            {[
              { label: 'Full Name', key: 'name', type: 'text' },
              { label: 'Bio', key: 'bio', type: 'textarea' },
              { label: 'Phone Number', key: 'phone', type: 'tel' },
            ].map(({ label, key, type }) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
                {type === 'textarea' ? (
                  <textarea
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    rows={3}
                    placeholder={`Your ${label.toLowerCase()}`}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all resize-none"
                  />
                ) : (
                  <input
                    type={type}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    placeholder={`Your ${label.toLowerCase()}`}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                  />
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-3 bg-white/3 border border-white/5 rounded-xl text-gray-500 cursor-not-allowed"
              />
            </div>

            <button
              onClick={handleSave}
              className="px-8 py-3 gradient-primary text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-indigo-500/30"
            >
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
