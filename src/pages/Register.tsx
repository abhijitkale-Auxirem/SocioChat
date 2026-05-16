import { useState, useEffect } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, UserPlus, Globe, User, Edit3, Crown, Lock } from 'lucide-react';
import { registerUser, UserRole } from '@/lib/auth';
import { RoleToggle } from '@/components/ui/role-toggle';
import { toast } from 'sonner';

const ROLES: { value: UserRole; label: string; desc: string; icon: React.ReactNode; color: string }[] = [
  { value: 'user', label: 'General User', desc: 'Chat, join communities, and connect with friends', icon: <User className="w-5 h-5" />, color: 'from-indigo-500 to-blue-600' },
  { value: 'creator', label: 'Creator', desc: 'Build audience, share content, and monetize', icon: <Edit3 className="w-5 h-5" />, color: 'from-purple-500 to-pink-600' },
  { value: 'community_admin', label: 'Community Admin', desc: 'Create and manage thriving communities', icon: <Crown className="w-5 h-5" />, color: 'from-cyan-500 to-teal-600' },
];

export default function Register() {
  const navigate = useNavigate();
  
  // Real-time Registration Guard State
  const [isRegAllowed, setIsRegAllowed] = useState(() => localStorage.getItem('app_reg_enabled') !== 'false');
  
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '', role: 'user' as UserRole });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sync with Admin Settings in real-time
  useEffect(() => {
    const checkRegStatus = () => {
      setIsRegAllowed(localStorage.getItem('app_reg_enabled') !== 'false');
    };
    window.addEventListener('storage', checkRegStatus);
    return () => window.removeEventListener('storage', checkRegStatus);
  }, []);

  const sanitizePhoneInput = (value: string) => value.replace(/\D/g, '').slice(0, 10);
  const sanitizeNameInput = (value: string) => value.replace(/[^A-Za-z\s]/g, '').slice(0, 30);

  const handleFieldChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({
      ...prev,
      [key]:
        key === 'phone' ? sanitizePhoneInput(value)
        : key === 'name' ? sanitizeNameInput(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final security check: prevent submission if admin disabled registrations
    if (localStorage.getItem('app_reg_enabled') === 'false') {
      toast.error("Registrations are currently closed by the platform administrator.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const nameRegex = /^[A-Za-z\s]{3,30}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();

    if (!name || !email || !phone || !form.password || !form.confirm) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!nameRegex.test(name)) {
      toast.error("Name must contain only letters and be 3 to 30 characters long.");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Enter a valid 10-digit phone number.");
      return;
    }

    if (!passwordRegex.test(form.password)) {
      toast.error("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
      return;
    }

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 800));
      const result = registerUser({ name, email, password: form.password, role: form.role, phone });

      if (result.success) {
        toast.success(result.message);
        navigate("/login");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // If registration is closed, show a professional "Closed" state
  if (!isRegAllowed) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#070b18] px-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-dark p-10 rounded-[2.5rem] border border-white/10 max-w-md text-center">
          <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3 font-['Space_Grotesk']">Registrations Closed</h1>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            The SocioChat community is currently at capacity or undergoing maintenance. 
            New account creation has been temporarily suspended by the admin.
          </p>
          <Link to="/login" className="block w-full py-4 gradient-primary text-white font-bold rounded-xl shadow-lg">
            Back to Sign In
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#070b18]">
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: "url('/assets/auth-bg.png')", backgroundSize: "cover" }} />
      
      <div className="relative w-full flex items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl text-white font-['Space_Grotesk']">SocioChat</span>
          </Link>

          <div className="glass-dark rounded-[2rem] p-8 border border-white/10 shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-2 font-['Space_Grotesk']">Create Account</h1>
            <p className="text-gray-400 mb-8">Join the world's most adaptive social network</p>

            <div className="mb-8">
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">Identity</p>
              <RoleToggle options={ROLES} selected={form.role} onChange={value => setForm(p => ({ ...p, role: value }))} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-4">
                {[
                  { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Alex Rivers' },
                  { label: 'Email Address', key: 'email', type: 'email', placeholder: 'alex@example.com' },
                  { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '1234567890' },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">{label}</label>
                    <input 
                      type={type} 
                      value={form[key as keyof typeof form]} 
                      onChange={e => handleFieldChange(key as keyof typeof form, e.target.value)}
                      placeholder={placeholder}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[{ label: 'Password', key: 'password' }, { label: 'Confirm', key: 'confirm' }].map(({ label, key }) => (
                  <div key={key}>
                    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">{label}</label>
                    <div className="relative">
                      <input 
                        type={showPass ? 'text' : 'password'} 
                        value={form[key as keyof typeof form]} 
                        onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                        placeholder="••••••••"
                        className="w-full px-4 py-3.5 pr-10 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" 
                      />
                      {key === 'password' && (
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
                          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <motion.button 
                type="submit" 
                whileHover={{ scale: 1.01 }} 
                whileTap={{ scale: 0.99 }} 
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 mt-4 gradient-primary text-white font-bold rounded-xl shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" /> 
                    Join SocioChat
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-center text-gray-500 text-sm">
                Already part of the network?{' '}
                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-bold">Sign In</Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}