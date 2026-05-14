import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ChevronDown, LayoutDashboard, User, Settings, LogOut, Zap, Sparkles } from 'lucide-react';
import { getCurrentUser, logoutUser, getDashboardPath } from '@/lib/auth';
import { toast } from 'sonner';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Features', path: '/features' },
  { label: 'Communities', path: '/communities' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Particle = ({ style }: { style: React.CSSProperties }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-indigo-400/60"
    style={style}
    animate={{ y: [0, -12, 0], opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
    transition={{ duration: 2.5 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut', delay: Math.random() * 2 }}
  />
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const navRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const navBlur = useTransform(scrollY, [0, 80], [0, 16]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setProfileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
        setConfirmLogout(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    if (!confirmLogout) { setConfirmLogout(true); return; }
    logoutUser();
    toast.success('Logged out successfully. See you soon!');
    setConfirmLogout(false);
    setProfileOpen(false);
    navigate('/');
  };

  const particles = Array.from({ length: 6 }, (_, i) => ({
    left: `${10 + i * 15}%`,
    top: `${20 + (i % 2) * 40}%`,
  }));

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#070b18]/90 backdrop-blur-2xl shadow-2xl shadow-indigo-900/30 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      {/* Animated top gradient line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #4F46E5, #06B6D4, #8B5CF6, transparent)',
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />

      {/* Floating particles when not scrolled */}
      {!scrolled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p, i) => (
            <Particle key={i} style={{ left: p.left, top: p.top }} />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div
              className="relative w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-indigo-500/40"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <Zap className="w-5 h-5 text-white" />
              <motion.div
                className="absolute inset-0 rounded-xl bg-white/20"
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <div className="flex flex-col leading-none">
              <motion.span
                className="font-bold text-xl text-white font-['Space_Grotesk'] tracking-tight"
                whileHover={{ letterSpacing: '0.05em' }}
                transition={{ duration: 0.2 }}
              >
                Socio<span className="gradient-text">Chat</span>
              </motion.span>
              <span className="text-[9px] text-indigo-400/60 font-medium tracking-widest uppercase">Connect. Create. Chat.</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 relative">
            {NAV_LINKS.map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  onHoverStart={() => setHoveredLink(link.path)}
                  onHoverEnd={() => setHoveredLink(null)}
                  className="relative"
                >
                  <Link
                    to={link.path}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 block ${
                      isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBg"
                        className="absolute inset-0 rounded-lg gradient-primary opacity-20"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    {hoveredLink === link.path && !isActive && (
                      <motion.div
                        layoutId="hoverNavBg"
                        className="absolute inset-0 rounded-lg bg-white/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavDot"
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <motion.button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1 rounded-full transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative">
                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border-2 border-indigo-400" />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-indigo-400"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#070b18] rounded-full" />
                  </div>
                  <motion.div animate={{ rotate: profileOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-gray-300 hidden sm:block" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.92 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      className="absolute right-0 mt-3 w-60 glass-dark rounded-2xl shadow-2xl shadow-indigo-900/40 overflow-hidden border border-indigo-400/20"
                    >
                      {/* Profile header */}
                      <div className="px-4 py-4 border-b border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 gradient-primary opacity-10" />
                        <div className="flex items-center gap-3 relative">
                          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400/50" />
                          <div>
                            <p className="text-sm font-semibold text-white">{user.name}</p>
                            <p className="text-xs text-gray-400">{user.email}</p>
                            <span className="text-[10px] text-indigo-400 capitalize font-medium bg-indigo-400/10 px-1.5 py-0.5 rounded-full">{user.role}</span>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        {[
                          { to: getDashboardPath(user.role), icon: LayoutDashboard, label: 'Dashboard' },
                          { to: '/profile', icon: User, label: 'Profile' },
                          { to: '/settings', icon: Settings, label: 'Settings' },
                        ].map(({ to, icon: Icon, label }) => (
                          <Link key={label} to={to} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all group">
                            <span className="w-7 h-7 rounded-lg bg-indigo-400/10 flex items-center justify-center group-hover:bg-indigo-400/20 transition-colors">
                              <Icon className="w-3.5 h-3.5 text-indigo-400" />
                            </span>
                            {label}
                          </Link>
                        ))}

                        <div className="border-t border-white/10 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all group ${
                              confirmLogout ? 'text-red-400 bg-red-400/10' : 'text-gray-300 hover:text-red-400 hover:bg-red-400/5'
                            }`}
                          >
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${confirmLogout ? 'bg-red-400/20' : 'bg-white/5 group-hover:bg-red-400/10'}`}>
                              <LogOut className="w-3.5 h-3.5" />
                            </span>
                            {confirmLogout ? 'Confirm Logout?' : 'Logout'}
                          </button>
                          {confirmLogout && (
                            <button onClick={() => setConfirmLogout(false)} className="w-full text-xs text-gray-500 py-1.5 hover:text-gray-300 transition-colors">
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/login" className="px-4 py-2 text-sm text-gray-300 hover:text-white border border-white/10 hover:border-white/30 rounded-xl transition-all">
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="relative px-5 py-2 text-sm font-semibold text-white gradient-primary rounded-xl shadow-lg shadow-indigo-500/40"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Get Started
                    </span>
                  </Link>
                </motion.div>
              </div>
            )}

            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-gray-300 hover:text-white p-2 rounded-xl hover:bg-white/5 transition-all"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {menuOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X className="w-6 h-6" /></motion.div>
                  : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><Menu className="w-6 h-6" /></motion.div>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-[#0a0e1a]/98 backdrop-blur-2xl border-t border-white/5"
          >
            <div className="px-4 py-5 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      location.pathname === link.path
                        ? 'text-white bg-indigo-500/15 border border-indigo-400/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {location.pathname === link.path && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {!user && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="pt-3 flex gap-2">
                  <Link to="/login" className="flex-1 text-center py-2.5 text-sm text-gray-300 border border-white/15 rounded-xl hover:bg-white/5 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="flex-1 text-center py-2.5 text-sm font-semibold text-white gradient-primary rounded-xl shadow-lg shadow-indigo-500/30">
                    Get Started
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
