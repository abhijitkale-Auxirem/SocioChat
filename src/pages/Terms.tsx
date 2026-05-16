import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { fadeInUp, viewportOptions } from '@/lib/animations';

const SECTIONS = [
  { title: '1. Acceptance of Terms', content: 'By accessing or using SocioChat, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. We may update these terms from time to time, and your continued use constitutes acceptance.' },
  { title: '2. Account Registration', content: 'You must provide accurate and complete information when creating your account. You are responsible for maintaining the security of your account credentials. You may not use another person\'s account without permission. Users must be at least 13 years old to create an account.' },
  { title: '3. Acceptable Use', content: 'You agree not to use SocioChat to harass, threaten, or harm others; share illegal content; spread misinformation; engage in spam or phishing; violate others\' intellectual property rights; or engage in any illegal activity.' },
  { title: '4. Content Ownership', content: 'You retain ownership of content you create and share on SocioChat. By posting content, you grant SocioChat a non-exclusive, royalty-free license to use, display, and distribute your content within the platform. You are responsible for ensuring you have the rights to share any content.' },
  { title: '5. Privacy', content: 'Your use of SocioChat is governed by our Privacy Policy, which is incorporated into these Terms of Service by reference. Please review our Privacy Policy to understand our practices.' },
  { title: '6. Monetization & Payments', content: 'Creator earnings are subject to our monetization policy. SocioChat charges a 20% platform fee on all monetized content and community revenues. Payments are processed through secure global payment gateways and disbursed weekly.' },
  { title: '7. Termination', content: 'SocioChat reserves the right to suspend or terminate accounts that violate these terms. Users may also delete their accounts at any time through account settings. Upon termination, your access to the platform will cease immediately.' },
  { title: '8. Limitation of Liability', content: 'SocioChat is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability is limited to the fees paid in the 3 months preceding the claim.' },
];

export default function Terms() {
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-12 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-indigo-400 font-medium mb-6">Legal</span>
            <h1 className="text-5xl font-bold text-white mb-4 font-['Space_Grotesk']">Terms of <span className="gradient-text">Service</span></h1>
            <p className="text-gray-400">Last updated: May 14, 2026</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="glass-dark rounded-3xl p-8">
            <p className="text-gray-400 leading-relaxed mb-8">Welcome to SocioChat. These Terms of Service ("Terms") govern your access to and use of our platform, services, and applications. Please read these terms carefully before using SocioChat.</p>
            {SECTIONS.map((section, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4 font-['Space_Grotesk']">{section.title}</h2>
                <p className="text-gray-400 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
            <div className="mt-8 p-5 bg-indigo-400/10 border border-indigo-400/20 rounded-xl">
              <p className="text-sm text-gray-300">Questions about our terms? Contact us at <a href="mailto:legal@sociochat.com" className="text-indigo-400 hover:underline">legal@sociochat.com</a></p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
