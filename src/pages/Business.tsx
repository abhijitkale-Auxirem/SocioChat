import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { fadeInUp, viewportOptions } from '@/lib/animations';
import { Building, Users, BarChart3, Shield, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: Building, title: 'Team Collaboration', desc: 'Seamless communication and project management for distributed teams.', color: 'from-blue-500 to-indigo-600' },
  { icon: Users, title: 'Community Building', desc: 'Create and manage professional communities for networking and engagement.', color: 'from-green-500 to-teal-600' },
  { icon: BarChart3, title: 'Analytics & Insights', desc: 'Comprehensive analytics to track engagement and business metrics.', color: 'from-purple-500 to-pink-600' },
  { icon: Shield, title: 'Enterprise Security', desc: 'Advanced security features for sensitive business communications.', color: 'from-red-500 to-orange-600' },
  { icon: Zap, title: 'Automation Tools', desc: 'Streamline workflows with bots, integrations, and automated processes.', color: 'from-yellow-500 to-amber-600' },
  { icon: Globe, title: 'Global Reach', desc: 'Connect with international partners and clients worldwide.', color: 'from-cyan-500 to-blue-600' },
];

export default function Business() {
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "url('/assets/business-bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b18]/60 to-[#070b18]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-indigo-400 font-medium mb-6">For Business</span>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 font-['Space_Grotesk']">Power Your <span className="gradient-text">Business</span></h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">Enterprise-grade communication and collaboration tools for modern businesses.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-['Space_Grotesk']">Business <span className="gradient-text">Solutions</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Comprehensive tools designed to enhance productivity and collaboration.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div key={feature.title} initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} transition={{ delay: i * 0.1 }}
                className="p-6 glass-dark rounded-2xl hover:-translate-y-2 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-['Space_Grotesk']">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#070b18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-white mb-6 font-['Space_Grotesk']">Ready to Transform Your Business?</h2>
            <p className="text-gray-400 mb-8">Join leading companies already using SocioChat for enterprise communication.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all">
              Contact Sales
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}