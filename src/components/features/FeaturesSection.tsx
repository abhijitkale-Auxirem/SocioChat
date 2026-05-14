import { motion } from 'framer-motion';
import { MessageCircle, Video, Users, Share2, Shield, Zap, BarChart2, Bell } from 'lucide-react';
import { staggerContainer, fadeInUp, viewportOptions } from '@/lib/animations';

const FEATURES = [
  { icon: MessageCircle, title: 'Real-Time Chat', desc: 'One-to-one and group messaging with reactions, typing indicators, and read receipts.', color: 'from-indigo-500 to-purple-600', bg: 'from-indigo-500/10 to-purple-600/5' },
  { icon: Video, title: 'Voice & Video Calls', desc: 'Crystal-clear audio/video calls, group calling, and screen sharing with WebRTC.', color: 'from-cyan-500 to-blue-600', bg: 'from-cyan-500/10 to-blue-600/5' },
  { icon: Users, title: 'Communities', desc: 'Create public or private groups with roles, permissions, and a full invite system.', color: 'from-purple-500 to-pink-600', bg: 'from-purple-500/10 to-pink-600/5' },
  { icon: Share2, title: 'Social Feed', desc: 'Share posts, stories, images and videos. Like, comment, share trending content.', color: 'from-orange-500 to-red-600', bg: 'from-orange-500/10 to-red-600/5' },
  { icon: Shield, title: 'Moderation & Safety', desc: 'AI-powered spam detection, report/block users, content moderation tools.', color: 'from-green-500 to-teal-600', bg: 'from-green-500/10 to-teal-600/5' },
  { icon: Zap, title: 'AI Recommendations', desc: 'Smart friend suggestions, group recommendations, and personalized content feed.', color: 'from-yellow-500 to-orange-600', bg: 'from-yellow-500/10 to-orange-600/5' },
  { icon: BarChart2, title: 'Analytics Dashboard', desc: 'Deep insights into engagement, audience growth, and community activity metrics.', color: 'from-blue-500 to-indigo-600', bg: 'from-blue-500/10 to-indigo-600/5' },
  { icon: Bell, title: 'Smart Notifications', desc: 'Real-time alerts for messages, mentions, and community updates — never miss a beat.', color: 'from-pink-500 to-rose-600', bg: 'from-pink-500/10 to-rose-600/5' },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-indigo-400 font-medium mb-4">Platform Features</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-['Space_Grotesk']">Everything You Need to <span className="gradient-text">Connect</span></h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">A complete suite of communication and community tools built for India's digital generation.</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
            <motion.div key={title} variants={fadeInUp}
              className={`group p-6 rounded-2xl bg-gradient-to-br ${bg} border border-white/5 hover:border-indigo-400/30 transition-all duration-300 hover:-translate-y-2`}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2 font-['Space_Grotesk']">{title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
