import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, UserPlus, Globe, User, Edit3, Crown } from 'lucide-react';
import { registerUser, UserRole } from '@/lib/auth';
import { toast } from 'sonner';

const ROLES: { value: UserRole; label: string; desc: string; icon: React.ReactNode; color: string }[] = [
  { value: 'user', label: 'General User', desc: 'Chat, join communities, and connect with friends', icon: <User className="w-5 h-5" />, color: 'from-indigo-500 to-blue-600' },
  { value: 'creator', label: 'Creator', desc: 'Build audience, share content, and monetize', icon: <Edit3 className="w-5 h-5" />, color: 'from-purple-500 to-pink-600' },
  { value: 'community_admin', label: 'Community Admin', desc: 'Create and manage thriving communities', icon: <Crown className="w-5 h-5" />, color: 'from-cyan-500 to-teal-600' },
];

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', role: 'user' as UserRole });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.phone) { toast.error('Please fill in all required fields.'); return; }
    if (form.password !== form.confirm) { toast.error('Passwords do not match.'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = registerUser({ name: form.name, email: form.email, password: form.password, role: form.role, phone: form.phone });
    setLoading(false);
    if (result.success) {
      toast.success(result.message);
      navigate('/login');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#070b18]" style={{ backgroundImage: "url('/assets/auth-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-[#070b18]/80 backdrop-blur-sm" />
      <div className="relative w-full flex items-center justify-center px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-lg">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl text-white font-['Space_Grotesk']">SocioChat</span>
          </Link>

          <div className="glass-dark rounded-3xl p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-2 font-['Space_Grotesk']">Create Account</h1>
            <p className="text-gray-400 mb-6">Join millions of Indians on SocioChat</p>

            <div className="mb-6">
              <p className="text-sm font-medium text-gray-300 mb-3">Select Your Role</p>
              <div className="grid grid-cols-3 gap-3">
                {ROLES.map(role => (
                  <button key={role.value} type="button" onClick={() => setForm(p => ({ ...p, role: role.value }))}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 ${form.role === role.value ? 'border-indigo-400 bg-indigo-400/10' : 'border-white/10 bg-white/3 hover:border-white/20'}`}>
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center mb-2 text-white`}>{role.icon}</div>
                    <p className="text-xs font-semibold text-white leading-tight">{role.label}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-tight hidden sm:block">{role.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Priya Sharma' },
                { label: 'Email Address', key: 'email', type: 'email', placeholder: 'priya@example.com' },
                { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
                  <input type={type} value={form[key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                {[{ label: 'Password', key: 'password' }, { label: 'Confirm Password', key: 'confirm' }].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
                    <div className="relative">
                      <input type={showPass ? 'text' : 'password'} value={form[key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 pr-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
                      {key === 'password' && <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>}
                    </div>
                  </div>
                ))}
              </div>

              <motion.button type="submit" whileTap={{ scale: 0.98 }} disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all disabled:opacity-70">
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><UserPlus className="w-5 h-5" /> Create Account</>}
              </motion.button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Sign in</Link>
            </p>
            <p className="text-center text-xs text-gray-600 mt-2">
              By registering, you agree to our <Link to="/terms" className="text-indigo-400 hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-indigo-400 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
