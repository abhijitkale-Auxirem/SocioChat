import { motion } from 'framer-motion';
import { UserPlus, Users, MessageCircle, TrendingUp } from 'lucide-react';
import { staggerContainer, fadeInUp, viewportOptions } from '@/lib/animations';

const STEPS = [
  { step: '01', icon: UserPlus, title: 'Create Your Account', desc: 'Sign up in under 2 minutes. Choose your role — User, Creator, or Community Admin.', color: 'from-indigo-500 to-purple-600' },
  { step: '02', icon: Users, title: 'Build Your Profile', desc: 'Customize your bio, add interests, upload your photo, and set your privacy preferences.', color: 'from-cyan-500 to-blue-600' },
  { step: '03', icon: MessageCircle, title: 'Connect & Chat', desc: 'Add friends, join communities, start conversations, and share your content with the world.', color: 'from-purple-500 to-pink-600' },
  { step: '04', icon: TrendingUp, title: 'Grow & Monetize', desc: 'Build your audience, track engagement analytics, and unlock monetization as a creator.', color: 'from-orange-500 to-red-600' },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-[#070b18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-purple-400 font-medium mb-4">How It Works</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-['Space_Grotesk']">Get Started in <span className="gradient-text">4 Simple Steps</span></h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">From sign-up to your first community — everything happens in minutes.</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ step, icon: Icon, title, desc, color }, i) => (
            <motion.div key={step} variants={fadeInUp} className="relative group">
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-indigo-400/40 to-transparent z-10" style={{ width: 'calc(100% - 80px)', left: '80px' }} />
              )}
              <div className="p-6 glass-dark rounded-2xl hover:border-indigo-400/30 transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-5xl font-black text-white/5 font-['Space_Grotesk']">{step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-['Space_Grotesk']">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
