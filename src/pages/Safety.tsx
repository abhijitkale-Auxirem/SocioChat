import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Safety() {
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-16 text-center relative">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-green-400 font-medium mb-6">Safety Center</span>
            <h1 className="text-5xl font-bold text-white mb-6 font-['Space_Grotesk']">Your Safety is Our <span className="gradient-text">Priority</span></h1>
            <p className="text-xl text-gray-400">We're committed to making SocioChat a safe space for everyone in India.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-12 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          {[
            { title: 'AI-Powered Moderation', desc: 'Our AI systems scan for harmful content, spam, and abusive behavior in real-time, removing violations before they impact your experience.' },
            { title: 'Report & Block', desc: 'Easily report any user or content that violates our community guidelines. Block any user to prevent them from contacting you.' },
            { title: 'Privacy Controls', desc: 'Control who can see your profile, send you messages, or add you to groups with our granular privacy settings.' },
            { title: 'Two-Factor Authentication', desc: 'Protect your account with 2FA using your phone number or authenticator app to prevent unauthorized access.' },
            { title: 'Crisis Resources', desc: 'We partner with mental health organizations across India to provide support resources directly within the platform.' },
          ].map((item, i) => (
            <div key={i} className="p-6 glass-dark rounded-2xl mb-4 hover:border-green-400/30 transition-all">
              <h3 className="text-lg font-semibold text-white mb-2 font-['Space_Grotesk']">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
          <div className="mt-8 p-6 glass-dark rounded-2xl text-center">
            <p className="text-gray-400 mb-4">Need to report an urgent safety issue?</p>
            <a href="mailto:safety@sociochat.in" className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-xl text-sm hover:bg-green-600 transition-colors">safety@sociochat.in</a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
