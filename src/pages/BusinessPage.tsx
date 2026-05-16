import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { fadeInUp, viewportOptions } from '@/lib/animations';
import { ArrowRight, BarChart3, DollarSign, LayoutDashboard, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const TOOLS = [
  { icon: LayoutDashboard, title: 'Creator Monetization', desc: 'Sell subscriptions, run paid communities, and offer premium content to your audience.', color: 'from-purple-500 to-pink-600' },
  { icon: BarChart3, title: 'Business Analytics', desc: 'Track revenue, engagement, and retention with clear creator-friendly dashboards.', color: 'from-blue-500 to-cyan-600' },
  { icon: DollarSign, title: 'Revenue Streams', desc: 'Manage tips, sponsorships, paid chat, and exclusive support tiers from one place.', color: 'from-green-500 to-teal-600' },
  { icon: Users, title: 'Audience Growth', desc: 'Attract fans with creator tools, community rewards, and in-app discovery features.', color: 'from-indigo-500 to-purple-600' },
  { icon: Sparkles, title: 'Creative Studio', desc: 'Publish multimedia posts, stories, and premium content with rich creator controls.', color: 'from-orange-500 to-amber-600' },
];

export default function BusinessPage() {
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "url('/assets/business-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b18]/70 to-[#070b18]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-indigo-400 font-medium mb-6">Business Solutions</span>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 font-['Space_Grotesk']">Build Your Creator<br />Revenue With <span className="gradient-text">SocioChat</span></h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">A business-ready creator platform with monetization tools, analytics, and audience growth features designed for global creators.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2 initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="text-4xl font-bold text-white mb-6 font-['Space_Grotesk']">Optimize Your Creator Business</motion.h2>
              <motion.p initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} transition={{ delay: 0.1 }} className="text-gray-400 text-lg leading-relaxed mb-8">Monetize communities, sell premium content, and keep your workflow in one place with tools built for audience-driven creators.</motion.p>
              <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="inline-flex items-center justify-center gap-2 px-8 py-4 gradient-primary text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all">
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/creator-tools" className="inline-flex items-center justify-center gap-2 px-8 py-4 glass text-white font-semibold rounded-2xl hover:bg-white/10 transition-all">
                  Explore Creator Tools
                </Link>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {TOOLS.map((tool, index) => (
                <motion.div key={tool.title} initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} transition={{ delay: index * 0.08 }} className="glass-dark rounded-3xl p-6 border border-white/10 hover:border-indigo-400/30 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-3xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 font-['Space_Grotesk']">{tool.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{tool.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#070b18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={viewportOptions} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold text-white mb-6 font-['Space_Grotesk']">Ready to grow your creator business?</h2>
            <p className="text-gray-400 mb-8">Create your global creator storefront, monetize premium content, and manage every audience interaction from one dashboard.</p>
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all">
              Start Building Now
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
