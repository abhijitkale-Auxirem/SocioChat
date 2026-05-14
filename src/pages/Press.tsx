import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { fadeInUp, staggerContainer, viewportOptions } from '@/lib/animations';

export default function Press() {
  const MEDIA = [
    { outlet: 'TechCrunch India', headline: 'SocioChat raises $12M Series A to build India\'s Discord', date: 'March 2026', logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=60&fit=crop' },
    { outlet: 'Economic Times', headline: 'SocioChat hits 5 million users in just 18 months', date: 'February 2026', logo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=100&h=60&fit=crop' },
    { outlet: 'YourStory', headline: 'How SocioChat is redefining creator monetization in India', date: 'January 2026', logo: 'https://images.unsplash.com/photo-1546422904-90eab23c3d7e?w=100&h=60&fit=crop' },
  ];
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-16 text-center relative">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-indigo-400 font-medium mb-6">Press & Media</span>
            <h1 className="text-5xl font-bold text-white mb-6 font-['Space_Grotesk']">SocioChat in the <span className="gradient-text">News</span></h1>
            <p className="text-xl text-gray-400">Media coverage and announcements about SocioChat's growth and impact.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-12 pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer} className="space-y-6">
            {MEDIA.map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="p-6 glass-dark rounded-2xl flex gap-6 items-start hover:border-indigo-400/30 transition-all">
                <img src={item.logo} alt={item.outlet} className="w-20 h-14 object-cover rounded-lg shrink-0" />
                <div>
                  <p className="text-xs text-indigo-400 font-medium mb-1">{item.outlet} · {item.date}</p>
                  <h3 className="text-lg font-semibold text-white font-['Space_Grotesk']">{item.headline}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-10 p-6 glass-dark rounded-2xl text-center">
            <h3 className="text-xl font-bold text-white mb-3 font-['Space_Grotesk']">Media Inquiries</h3>
            <p className="text-gray-400 mb-4">For press inquiries, contact our communications team.</p>
            <a href="mailto:press@sociochat.in" className="inline-block px-6 py-3 gradient-primary text-white font-semibold rounded-xl text-sm">press@sociochat.in</a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
