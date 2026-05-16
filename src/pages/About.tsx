import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight, viewportOptions } from '@/lib/animations';
import { Target, Heart, Lightbulb, Shield, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_TESTIMONIALS } from '@/lib/mockData';
import { Star } from 'lucide-react';

const VALUES = [
  { icon: Heart, title: 'Community First', desc: 'Every decision we make puts our community at the center. People are the heart of SocioChat.', color: 'from-pink-500 to-rose-600' },
  { icon: Shield, title: 'Privacy & Safety', desc: 'We are deeply committed to protecting user privacy and maintaining a safe, inclusive platform.', color: 'from-green-500 to-teal-600' },
  { icon: Lightbulb, title: 'Constant Innovation', desc: 'We relentlessly pursue new features and improvements to serve the global digital generation.', color: 'from-yellow-500 to-orange-600' },
  { icon: Target, title: 'Impact at Scale', desc: 'Our mission is to empower millions through meaningful digital connections.', color: 'from-indigo-500 to-purple-600' },
];

export default function About() {
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "url('/assets/about-hero.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b18]/60 to-[#070b18]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-indigo-400 font-medium mb-6">About SocioChat</span>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 font-['Space_Grotesk']">Building the World's <span className="gradient-text">Social Future</span></h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">We are on a mission to connect everyone through meaningful conversations, thriving communities, and powerful creator tools — all in one platform.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInLeft}>
              <h2 className="text-4xl font-bold text-white mb-6 font-['Space_Grotesk']">Our <span className="gradient-text">Vision</span></h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">Founded in 2023 by a team of passionate engineers and designers from top global tech companies, SocioChat was born from a simple belief: that everyone deserves a world-class platform to connect, communicate, and collaborate.</p>
              <p className="text-gray-400 leading-relaxed mb-6">We combine the best of Discord's community tools, Telegram's messaging power, and Instagram's content sharing — but built for the global digital generation, with multi-language support and culturally relevant features.</p>
              <Link to="/features" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                Explore Features <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInRight} className="grid grid-cols-2 gap-4">
              {[['2023', 'Founded'], ['4.9M+', 'Active Users'], ['$11M+', 'Creator Earnings'], ['99.9%', 'Uptime SLA']].map(([num, label]) => (
                <div key={label} className="p-6 glass-dark rounded-2xl text-center hover:-translate-y-2 transition-all duration-300">
                  <div className="text-4xl font-bold gradient-text mb-2 font-['Space_Grotesk']">{num}</div>
                  <div className="text-sm text-gray-400">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#070b18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-['Space_Grotesk']">Why Choose <span className="gradient-text">SocioChat?</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Built for the world, by global innovators. Here's what sets us apart from every other social platform.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc, color }) => (
              <motion.div key={title} variants={fadeInUp} className="p-6 glass-dark rounded-2xl hover:-translate-y-2 transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-['Space_Grotesk']">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0e1a]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4 font-['Space_Grotesk']">What Our Users <span className="gradient-text">Are Saying</span></h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_TESTIMONIALS.slice(0, 2).map(t => (
              <motion.div key={t.id} variants={fadeInUp} className="p-6 glass-dark rounded-2xl">
                <div className="flex gap-1 mb-3">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
                <p className="text-gray-300 mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div><p className="text-sm font-semibold text-white">{t.name}</p><p className="text-xs text-gray-500">{t.role}</p></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
