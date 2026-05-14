import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function Status() {
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4 font-['Space_Grotesk']">All Systems <span className="gradient-text">Operational</span></h1>
            <p className="text-gray-400 mb-10">SocioChat is running smoothly. All services are online.</p>
          </motion.div>
          <div className="space-y-3">
            {['Messaging Service', 'Video & Voice Calls', 'Community Features', 'Storage & Media', 'Authentication', 'Push Notifications', 'API Gateway'].map(s => (
              <div key={s} className="flex items-center justify-between p-4 glass-dark rounded-xl">
                <span className="text-sm text-gray-300">{s}</span>
                <span className="flex items-center gap-2 text-xs text-green-400"><span className="w-2 h-2 bg-green-400 rounded-full" />Operational</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-8">99.9% uptime over the last 90 days</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
