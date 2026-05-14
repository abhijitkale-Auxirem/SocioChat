import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { fadeInUp, viewportOptions } from '@/lib/animations';

const SECTIONS = [
  { title: '1. Information We Collect', content: 'We collect information you provide directly to us such as your name, email address, phone number, profile picture, and bio when you create an account. We also collect information about your use of our services, including messages (encrypted), community activity, and device information.' },
  { title: '2. How We Use Your Information', content: 'We use your information to provide, personalize, and improve our services; send notifications; facilitate connections between users; process payments; and comply with legal obligations. We do not sell your personal data to third parties.' },
  { title: '3. Data Security', content: 'All one-to-one messages on SocioChat are end-to-end encrypted. We use industry-standard security measures including TLS encryption, secure data centers in India, and regular security audits to protect your information.' },
  { title: '4. Data Retention', content: 'We retain your account information as long as your account is active. You may request deletion of your account and associated data at any time. Some data may be retained for legal compliance purposes for up to 90 days after deletion.' },
  { title: '5. Sharing of Information', content: 'We may share your information with other users as part of normal platform operation (e.g., your profile is visible to people you chat with). We share data with service providers who assist us in operating the platform, all under strict confidentiality agreements.' },
  { title: '6. Your Rights', content: 'You have the right to access, correct, or delete your personal data. You may also object to certain processing, request data portability, and withdraw consent at any time. Contact us at privacy@sociochat.in for any privacy-related requests.' },
  { title: '7. Cookies', content: 'We use cookies and similar technologies to provide our services, analyze usage, and personalize content. You can control cookie preferences through your browser settings.' },
  { title: '8. Changes to This Policy', content: 'We may update this Privacy Policy periodically. We will notify you of significant changes via email or in-app notification. Continued use of SocioChat after changes constitutes acceptance of the updated policy.' },
];

export default function Privacy() {
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-12 text-center relative overflow-hidden">
        <div className="absolute top-20 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-4 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-indigo-400 font-medium mb-6">Legal</span>
            <h1 className="text-5xl font-bold text-white mb-4 font-['Space_Grotesk']">Privacy <span className="gradient-text">Policy</span></h1>
            <p className="text-gray-400">Last updated: May 14, 2026</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="glass-dark rounded-3xl p-8">
            <p className="text-gray-400 leading-relaxed mb-8">SocioChat ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, share, and protect your personal information when you use our platform. By using SocioChat, you agree to the practices described in this policy.</p>
            {SECTIONS.map((section, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4 font-['Space_Grotesk']">{section.title}</h2>
                <p className="text-gray-400 leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
            <div className="mt-8 p-5 bg-indigo-400/10 border border-indigo-400/20 rounded-xl">
              <p className="text-sm text-gray-300">For privacy-related inquiries, contact our Data Protection Officer at <a href="mailto:privacy@sociochat.in" className="text-indigo-400 hover:underline">privacy@sociochat.in</a></p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
