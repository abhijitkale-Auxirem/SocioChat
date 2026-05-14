import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Guidelines() {
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl font-bold text-white mb-4 font-['Space_Grotesk']">Community <span className="gradient-text">Guidelines</span></h1>
            <p className="text-xl text-gray-400">Rules that keep SocioChat safe, respectful, and welcoming for everyone.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-12 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="glass-dark rounded-3xl p-8">
            {[
              ['Be Respectful', 'Treat all users with dignity and respect. Harassment, bullying, and hate speech are strictly prohibited.'],
              ['No Spam', 'Do not send unsolicited messages, post irrelevant content, or use automated systems to spam communities.'],
              ['Authentic Identity', 'Use your real identity. Impersonating others or creating fake accounts is not allowed.'],
              ['Legal Content Only', 'Do not share illegal content including pirated material, explicit content, or content that violates laws.'],
              ['Protect Privacy', 'Do not share others\' private information without their consent. Respect personal boundaries.'],
              ['Safe Communities', 'Community admins are responsible for maintaining healthy environments in their communities.'],
            ].map(([title, desc], i) => (
              <div key={i} className="mb-6 pb-6 border-b border-white/5 last:border-0">
                <h3 className="text-lg font-semibold text-white mb-2 font-['Space_Grotesk']">{`${i + 1}. ${title}`}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
