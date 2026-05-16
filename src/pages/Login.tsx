import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, LogIn, Globe } from 'lucide-react';
import { loginUser, getDashboardPath } from '@/lib/auth';
import { toast } from 'sonner';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields.');
      return;
    }
    if (!emailRegex.test(form.email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = loginUser(form.email.trim().toLowerCase(), form.password);
    setLoading(false);
    if (result.success && result.user) {
      toast.success(result.message);
      navigate(getDashboardPath(result.user.role));
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#070b18]" style={{ backgroundImage: "url('/assets/auth-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-[#070b18]/80 backdrop-blur-sm" />
      <div className="relative w-full flex items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="w-full max-w-md">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-2xl text-white font-['Space_Grotesk']">SocioChat</span>
          </Link>

          <div className="glass-dark rounded-3xl p-8 shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-2 font-['Space_Grotesk']">Welcome Back</h1>
            <p className="text-gray-400 mb-8">Sign in to your SocioChat account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    placeholder="Your password"
                    className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <motion.button type="submit" whileTap={{ scale: 0.98 }} disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all disabled:opacity-70">
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><LogIn className="w-5 h-5" /> Sign In</>}
              </motion.button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">Create one free</Link>
            </p>
            <p className="text-center mt-2">
              <a href="https://apps.apple.com/app/sociochat" target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Download on App Store</a> | <a href="https://play.google.com/store/apps/details?id=com.sociochat" target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Get on Google Play</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
