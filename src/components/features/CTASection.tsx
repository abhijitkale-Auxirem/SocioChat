import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, MessageCircle } from 'lucide-react';
import { fadeInUp, viewportOptions } from '@/lib/animations';

export default function CTASection() {
  return (
    <section className="py-24 bg-[#070b18] relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp}>
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 font-['Space_Grotesk']">
            Ready to Join <span className="gradient-text">4.9 Million</span> Indians?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Start your journey on SocioChat today. Connect with communities, share your story, and build meaningful relationships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/register" className="group flex items-center justify-center gap-2 px-10 py-4 gradient-primary text-white font-semibold rounded-2xl text-lg shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-105 transition-all duration-300">
              Create Free Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/features" className="flex items-center justify-center gap-2 px-10 py-4 glass text-white font-semibold rounded-2xl text-lg hover:bg-white/10 transition-all duration-300">
              See All Features
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 flex-wrap text-sm text-gray-500">
            <span className="flex items-center gap-2"><Users className="w-4 h-4 text-indigo-400" /> No credit card required</span>
            <span className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-cyan-400" /> Free forever plan</span>
            <span className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-purple-400" /> Setup in 2 minutes</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
