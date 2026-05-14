import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '@/components/layout/ScrollToTop';

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/dashboard" element={<UserOverview />} />
          <Route path="/dashboard/chat" element={<Chat />} />
          <Route path="/dashboard/communities" element={<DashboardCommunities />} />
          <Route path="/dashboard/feed" element={<Feed />} />
          <Route path="/dashboard/friends" element={<Friends />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/settings" element={<UserSettings />} />
          <Route path="/creator-dashboard" element={<CreatorOverview />} />
          <Route path="/creator-dashboard/content" element={<CreatorContent />} />
          <Route path="/creator-dashboard/analytics" element={<CreatorAnalytics />} />
          <Route path="/creator-dashboard/monetization" element={<Monetization />} />
          <Route path="/creator-dashboard/audience" element={<CreatorAudience />} />
          <Route path="/creator-dashboard/growth" element={<CreatorGrowth />} />
          <Route path="/creator-dashboard/verified" element={<VerifiedBadge />} />
          <Route path="/creator-dashboard/settings" element={<CreatorSettings />} />
          <Route path="/community-admin" element={<CommunityAdminOverview />} />
          <Route path="/community-admin/communities" element={<MyCommunities />} />
          <Route path="/community-admin/members" element={<Members />} />
          <Route path="/community-admin/content" element={<CommunityContent />} />
          <Route path="/community-admin/analytics" element={<CommunityAnalytics />} />
          <Route path="/community-admin/moderation" element={<Moderation />} />
          <Route path="/community-admin/roles" element={<MemberRoles />} />
          <Route path="/community-admin/settings" element={<CommunitySettings />} />
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
