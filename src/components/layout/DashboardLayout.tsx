import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, LogOut, ChevronRight } from 'lucide-react';
import { getCurrentUser, logoutUser } from '@/lib/auth';
import { toast } from 'sonner';

interface SidebarItem { label: string; path: string; icon: React.ReactNode; }

interface Props {
  children: React.ReactNode;
  sidebarItems: SidebarItem[];
  title: string;
  roleLabel: string;
}

export default function DashboardLayout({ children, sidebarItems, title, roleLabel }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    if (!confirmLogout) { setConfirmLogout(true); return; }
    logoutUser();
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-white font-['Space_Grotesk']">SocioChat</span>
        </Link>
        <div className="flex items-center gap-3">
          <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
            <p className="text-xs text-indigo-400">{roleLabel}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-3 px-3">Navigation</p>
        <div className="space-y-1">
          {sidebarItems.map(item => (
            <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${location.pathname === item.path ? 'sidebar-item-active text-indigo-400' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <span className={`shrink-0 ${location.pathname === item.path ? 'text-indigo-400' : 'text-gray-500 group-hover:text-indigo-400'}`}>{item.icon}</span>
              <span className="truncate">{item.label}</span>
              {location.pathname === item.path && <ChevronRight className="w-3 h-3 ml-auto text-indigo-400" />}
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-white/10 space-y-2">
        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
          <Globe className="w-4 h-4 text-cyan-400" /> Visit Website
        </Link>
        <button onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${confirmLogout ? 'text-red-400 bg-red-400/10' : 'text-gray-400 hover:text-red-400 hover:bg-red-400/5'}`}>
          <LogOut className="w-4 h-4" />
          {confirmLogout ? 'Confirm Logout?' : 'Logout'}
        </button>
        {confirmLogout && <button onClick={() => setConfirmLogout(false)} className="w-full text-xs text-gray-500 py-1 hover:text-gray-300 transition-colors">Cancel</button>}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#0a0e1a] overflow-hidden">
      <aside className="hidden lg:flex w-64 shrink-0 bg-[#0d1120] border-r border-white/5 flex-col">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: 'spring', damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-72 bg-[#0d1120] border-r border-white/5 flex flex-col">
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-[#0d1120]/80 backdrop-blur-xl border-b border-white/5 flex items-center px-6 gap-4 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-white font-['Space_Grotesk']">{title}</h1>
          <div className="ml-auto flex items-center gap-3">
            <img src={user?.avatar} alt={user?.name} className="w-9 h-9 rounded-full object-cover border-2 border-indigo-400" />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
