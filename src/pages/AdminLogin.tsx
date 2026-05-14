import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Shield, Globe } from 'lucide-react';
import { loginAdmin } from '@/lib/auth';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = loginAdmin(form.email, form.password);
    setLoading(false);
    if (result.success) {
      toast.success(result.message);
      navigate('/admin');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b18] px-4" style={{ backgroundImage: "url('/assets/auth-bg.jpg')", backgroundSize: 'cover' }}>
      <div className="absolute inset-0 bg-[#070b18]/85 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-indigo-500/40">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white font-['Space_Grotesk']">Admin Portal</h1>
          <p className="text-gray-400 mt-2">SocioChat Platform Administration</p>
        </div>

        <div className="glass-dark rounded-3xl p-8 shadow-2xl">
          <div className="bg-indigo-400/10 border border-indigo-400/20 rounded-xl p-4 mb-6">
            <p className="text-xs text-indigo-400 font-medium">Demo Credentials</p>
            <p className="text-xs text-gray-400 mt-1">Email: admin@sociochat.in</p>
            <p className="text-xs text-gray-400">Password: Admin@123</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Admin Email</label>
              <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="admin@sociochat.in"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="Admin password"
                  className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <motion.button type="submit" whileTap={{ scale: 0.98 }} disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-70">
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Shield className="w-5 h-5" /> Admin Sign In</>}
            </motion.button>
          </form>

          <p className="text-center mt-6">
            <Link to="/login" className="text-sm text-gray-500 hover:text-indigo-400 transition-colors flex items-center justify-center gap-1">
              <Globe className="w-3 h-3" /> Back to User Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
