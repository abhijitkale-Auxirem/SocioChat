import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Gdpr() {
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-4 font-['Space_Grotesk']">GDPR & Data <span className="gradient-text">Compliance</span></h1>
            <p className="text-gray-400 mb-10">SocioChat is committed to full compliance with the General Data Protection Regulation (GDPR) and India's Personal Data Protection Act.</p>
          </motion.div>
          <div className="glass-dark rounded-3xl p-8 space-y-6">
            {[
              ['Your Rights Under GDPR', 'Right to access, rectify, erase, restrict processing, data portability, and object to processing of your personal data.'],
              ['Data Processing', 'We process data only with a lawful basis: consent, contract performance, legal obligation, or legitimate interest.'],
              ['Data Transfers', 'Your data is stored primarily on servers in India. Any international transfers use standard contractual clauses.'],
              ['Data Breach Notification', 'We will notify you of any data breach affecting your rights within 72 hours of becoming aware.'],
            ].map(([title, content]) => (
              <div key={title}>
                <h2 className="text-lg font-bold text-white mb-2 font-['Space_Grotesk']">{title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{content}</p>
              </div>
            ))}
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-gray-400">For GDPR requests: <a href="mailto:privacy@sociochat.in" className="text-indigo-400 hover:underline">privacy@sociochat.in</a></p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
