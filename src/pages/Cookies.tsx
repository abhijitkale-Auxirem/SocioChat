import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Cookies() {
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-bold text-white mb-4 font-['Space_Grotesk']">Cookie <span className="gradient-text">Policy</span></h1>
            <p className="text-gray-400">Last updated: May 14, 2026</p>
          </motion.div>
        </div>
      </section>
      <section className="py-12 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="glass-dark rounded-3xl p-8 space-y-8">
            {[
              ['What Are Cookies?', 'Cookies are small text files stored on your device that help us improve your experience on SocioChat. They remember your preferences and allow our services to function properly.'],
              ['Types of Cookies We Use', 'Essential cookies (required for the platform to work), performance cookies (to analyze usage), functional cookies (to remember your preferences), and targeting cookies (for relevant content recommendations).'],
              ['How to Control Cookies', 'You can control cookies through your browser settings. Note that disabling essential cookies may impact your ability to use certain features of SocioChat.'],
              ['Third-Party Cookies', 'We use trusted third-party services that may set their own cookies, including analytics providers and payment processors. All third parties are required to maintain appropriate security standards.'],
            ].map(([title, content], i) => (
              <div key={i}>
                <h2 className="text-xl font-bold text-white mb-3 font-['Space_Grotesk']">{title}</h2>
                <p className="text-gray-400 leading-relaxed">{content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
