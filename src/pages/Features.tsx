import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { staggerContainer, fadeInUp, viewportOptions } from '@/lib/animations';
import { MessageCircle, Video, Users, Share2, Shield, Zap, BarChart2, Bell, Lock, Globe, Mic, FileText, Image, Gift, Star, TrendingUp, IndianRupee, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURE_CATEGORIES = [
  {
    id: 'messaging', title: 'Messaging & Communication', color: 'from-indigo-500 to-purple-600',
    features: [
      { icon: MessageCircle, name: 'Real-Time Chat', desc: 'Instant one-to-one and group messaging with sub-second delivery across India.' },
      { icon: Video, name: 'Video & Audio Calls', desc: 'HD video calls, group calling up to 50 participants, and screen sharing.' },
      { icon: Mic, name: 'Voice Notes', desc: 'Send voice messages up to 5 minutes for quick, personal communication.' },
      { icon: FileText, name: 'File Sharing', desc: 'Share documents, PDFs, and files up to 100MB securely within chats.' },
      { icon: Image, name: 'Media Gallery', desc: 'Auto-organized photo and video gallery for every conversation.' },
      { icon: Gift, name: 'Stickers & GIFs', desc: 'Express yourself with thousands of culturally relevant stickers and GIFs.' },
    ],
  },
  {
    id: 'community', title: 'Community & Groups', color: 'from-cyan-500 to-blue-600',
    features: [
      { icon: Users, name: 'Community Builder', desc: 'Create public or private communities with custom branding and channels.' },
      { icon: Lock, name: 'Roles & Permissions', desc: 'Granular role management: Owner, Admin, Moderator, and Member roles.' },
      { icon: Globe, name: 'Invite System', desc: 'Share invite links, QR codes, or manage direct invitations for communities.' },
      { icon: Bell, name: 'Community Channels', desc: 'Organize discussions into topic-specific channels within each community.' },
      { icon: Shield, name: 'Member Moderation', desc: 'Kick, ban, mute members, and manage content in your community.' },
      { icon: Star, name: 'Featured Communities', desc: 'Get discovered through trending and featured community sections.' },
    ],
  },
  {
    id: 'creator', title: 'Creator & Business Tools', color: 'from-purple-500 to-pink-600',
    features: [
      { icon: BadgeCheck, name: 'Verified Badge', desc: 'Gain trust with a verified creator badge on your profile and content.' },
      { icon: IndianRupee, name: 'Monetization', desc: 'Earn through paid communities, tipping, sponsored posts, and subscriptions.' },
      { icon: BarChart2, name: 'Creator Analytics', desc: 'Deep insights into reach, engagement rate, follower growth, and earnings.' },
      { icon: TrendingUp, name: 'Audience Growth Tools', desc: 'AI-powered suggestions to grow your audience faster and smarter.' },
      { icon: Share2, name: 'Content Scheduling', desc: 'Plan and schedule posts, stories, and announcements in advance.' },
      { icon: Zap, name: 'Sponsored Content', desc: 'Partner with brands for sponsored posts and community promotions.' },
    ],
  },
];

export default function Features() {
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-indigo-400 font-medium mb-6">Platform Features</span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 font-['Space_Grotesk']">Every Tool You Need to <span className="gradient-text">Connect & Grow</span></h1>
            <p className="text-xl text-gray-400 leading-relaxed">Messaging, communities, creator tools, analytics — SocioChat has everything India's digital creators and communities need.</p>
          </motion.div>
        </div>
      </section>

      {FEATURE_CATEGORIES.map((cat, ci) => (
        <section key={cat.id} id={cat.id} className={`py-20 ${ci % 2 === 0 ? 'bg-[#0a0e1a]' : 'bg-[#070b18]'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="mb-12">
              <div className={`inline-block px-5 py-2 rounded-full bg-gradient-to-r ${cat.color} bg-opacity-20 text-white text-sm font-semibold mb-4`}>{cat.title}</div>
              <h2 className="text-3xl font-bold text-white font-['Space_Grotesk']">{cat.title}</h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.features.map(({ icon: Icon, name, desc }) => (
                <motion.div key={name} variants={fadeInUp} className="p-6 glass-dark rounded-2xl hover:border-indigo-400/30 transition-all duration-300 hover:-translate-y-1 group">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2 font-['Space_Grotesk'] group-hover:text-indigo-400 transition-colors">{name}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      <section className="py-20 bg-[#0a0e1a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp}>
            <h2 className="text-4xl font-bold text-white mb-6 font-['Space_Grotesk']">Ready to Experience <span className="gradient-text">All Features?</span></h2>
            <Link to="/register" className="inline-flex items-center gap-2 px-10 py-4 gradient-primary text-white font-semibold rounded-2xl text-lg shadow-xl shadow-indigo-500/30 hover:scale-105 transition-all duration-300">
              Start Free Today
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
