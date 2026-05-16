import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';
import { useState } from 'react';

import { Navigate } from 'react-router-dom';

import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import About from './pages/About';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Communities from './pages/Communities';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import Help from './pages/Help';
import HelpCenter from './pages/HelpCenter';
import ReportPage from './pages/ReportPage';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Careers from './pages/Careers';
import Press from './pages/Press';
import Safety from './pages/Safety';
import Guidelines from './pages/Guidelines';
import Cookies from './pages/Cookies';
import Status from './pages/Status';
import Gdpr from './pages/Gdpr';
import Accessibility from './pages/Accessibility';
import CreatorTools from './pages/CreatorTools';
import BusinessPage from './pages/BusinessPage';
import { getCurrentUser, getDashboardPath } from '@/lib/auth';

import UserOverview from './pages/dashboard/Overview';
import Chat from './pages/dashboard/Chat';
import DashboardCommunities from './pages/dashboard/Communities';
import Feed from './pages/dashboard/Feed';
import Friends from './pages/dashboard/Friends';
import Notifications from './pages/dashboard/Notifications';
import Profile from './pages/dashboard/Profile';
import UserSettings from './pages/dashboard/Settings';

import CreatorOverview from './pages/creator/Overview';
import CreatorContent from './pages/creator/Content';
import CreatorAnalytics from './pages/creator/Analytics';
import Monetization from './pages/creator/Monetization';
import CreatorAudience from './pages/creator/Audience';
import CreatorGrowth from './pages/creator/Growth';
import VerifiedBadge from './pages/creator/Verified';
import CreatorSettings from './pages/creator/Settings';

import CommunityAdminOverview from './pages/community-admin/Overview';
import MyCommunities from './pages/community-admin/Communities';
import Members from './pages/community-admin/Members';
import CommunityContent from './pages/community-admin/Content';
import CommunityAnalytics from './pages/community-admin/Analytics';
import Moderation from './pages/community-admin/Moderation';
import MemberRoles from './pages/community-admin/Roles';
import CommunitySettings from './pages/community-admin/Settings';

import AdminOverview from './pages/admin/Overview';
import AdminUsers from './pages/admin/Users';
import AdminCommunities from './pages/admin/Communities';
import AdminBlog from './pages/admin/BlogManagement';
import AdminReports from './pages/admin/Reports';
import AdminAnalytics from './pages/admin/Analytics';
import AdminSecurity from './pages/admin/Security';
import AdminSettings from './pages/admin/Settings';



const queryClient = new QueryClient();

/**
 * NEW: Maintenance Mode Guard
 * If maintenance is ON and user is NOT an admin, 
 * redirect them to a special status page or block access.
 */
function MaintenanceGuard({ children }: { children: React.ReactNode }) {
  const [isMaintenance, setIsMaintenance] = useState(() => localStorage.getItem('app_maintenance') === 'true');
  const user = getCurrentUser();
  
  // Listen for changes in storage (in case admin changes it in another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsMaintenance(localStorage.getItem('app_maintenance') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Block access if Maintenance is ON and user is not an Admin
  if (isMaintenance && (user?.role as string) !== 'admin') {
    return (
      <div className="min-h-screen bg-[#0A0C14] flex items-center justify-center p-6 text-center">
        <div className="glass-dark p-8 rounded-[2rem] border border-white/10 max-w-md">
          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚙️</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 font-['Space_Grotesk']">Under Maintenance</h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            We are currently upgrading our servers to provide a better experience. 
            Please check back in a few minutes.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 transition-all"
          >
            Check Status
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function AuthRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    // Redirect logged-in users away from auth pages
    if (['/login', '/register', '/admin-login'].includes(location.pathname)) {
      navigate(getDashboardPath(currentUser.role), { replace: true });
    }
  }, [location.pathname, navigate]);

  return null;
}

const App = () => {
  // Check if registrations are allowed
  const registrationsAllowed = localStorage.getItem('app_reg_enabled') !== 'false';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthRedirect />
          <ScrollToTop />
          {/* Wrap everything in the MaintenanceGuard */}
          <MaintenanceGuard>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              
              {/* Conditional Registration Route */}
              <Route 
                path="/register" 
                element={registrationsAllowed ? <Register /> : <Navigate to="/login" replace />} 
              />
              
              <Route path="/admin-login" element={<AdminLogin />} />
              
              {/* ... (All your other static routes: /about, /features, etc.) */}
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/communities" element={<Communities />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/help" element={<Help />} />
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/report" element={<ReportPage />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/press" element={<Press />} />
              <Route path="/safety" element={<Safety />} />
              <Route path="/guidelines" element={<Guidelines />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/status" element={<Status />} />
              <Route path="/gdpr" element={<Gdpr />} />
              <Route path="/accessibility" element={<Accessibility />} />
              <Route path="/creator-tools" element={<CreatorTools />} />
              <Route path="/business" element={<BusinessPage />} />

              {/* User Dashboard Routes */}
              <Route path="/dashboard" element={<UserOverview />} />
              <Route path="/dashboard/chat" element={<Chat />} />
              <Route path="/dashboard/communities" element={<DashboardCommunities />} />
              <Route path="/dashboard/feed" element={<Feed />} />
              <Route path="/dashboard/friends" element={<Friends />} />
              <Route path="/dashboard/notifications" element={<Notifications />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/dashboard/settings" element={<UserSettings />} />

              {/* Creator Dashboard Routes */}
              <Route path="/creator-dashboard" element={<CreatorOverview />} />
              <Route path="/creator-dashboard/content" element={<CreatorContent />} />
              <Route path="/creator-dashboard/analytics" element={<CreatorAnalytics />} />
              <Route path="/creator-dashboard/monetization" element={<Monetization />} />
              <Route path="/creator-dashboard/audience" element={<CreatorAudience />} />
              <Route path="/creator-dashboard/growth" element={<CreatorGrowth />} />
              <Route path="/creator-dashboard/verified" element={<VerifiedBadge />} />
              <Route path="/creator-dashboard/settings" element={<CreatorSettings />} />

              {/* Community Admin Routes */}
              <Route path="/community-admin" element={<CommunityAdminOverview />} />
              <Route path="/community-admin/communities" element={<MyCommunities />} />
              <Route path="/community-admin/members" element={<Members />} />
              <Route path="/community-admin/content" element={<CommunityContent />} />
              <Route path="/community-admin/analytics" element={<CommunityAnalytics />} />
              <Route path="/community-admin/moderation" element={<Moderation />} />
              <Route path="/community-admin/roles" element={<MemberRoles />} />
              <Route path="/community-admin/settings" element={<CommunitySettings />} />

              {/* Platform Admin Routes (Note: These bypass MaintenanceGuard logic inside components) */}
              <Route path="/admin" element={<AdminOverview />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/communities" element={<AdminCommunities />} />
              <Route path="/admin/blog" element={<AdminBlog />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
              <Route path="/admin/security" element={<AdminSecurity />} />
              <Route path="/admin/settings" element={<AdminSettings />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </MaintenanceGuard>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;