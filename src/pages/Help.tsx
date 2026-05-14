import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { staggerContainer, fadeInUp, viewportOptions } from '@/lib/animations';
import { Search, MessageCircle, Users, Shield, Settings, CreditCard, Video, ChevronDown, ChevronUp } from 'lucide-react';

const CATEGORIES = [
  { icon: MessageCircle, label: 'Messaging', color: 'from-indigo-500 to-purple-600' },
  { icon: Users, label: 'Communities', color: 'from-cyan-500 to-blue-600' },
  { icon: Shield, label: 'Privacy & Safety', color: 'from-green-500 to-teal-600' },
  { icon: Settings, label: 'Account', color: 'from-orange-500 to-red-600' },
  { icon: CreditCard, label: 'Billing', color: 'from-purple-500 to-pink-600' },
  { icon: Video, label: 'Video Calls', color: 'from-blue-500 to-indigo-600' },
];

const FAQS = [
  { q: 'How do I start a new conversation?', a: 'Go to your dashboard and click the "New Chat" button, then search for the person you want to message. You can also find contacts through the People search feature.' },
  { q: 'How do I create a community?', a: 'In your dashboard, navigate to Communities and click "Create Community". Set your community name, description, category, and whether it\'s public or private.' },
  { q: 'Can I delete messages?', a: 'Yes! Long-press or right-click any message you sent to see the delete option. You can delete for yourself or for everyone in the conversation.' },
  { q: 'How does the monetization work?', a: 'Upgrade to a Creator plan to unlock paid communities, creator tipping, and sponsored post features. Earnings are paid out to your bank account or UPI within 7 business days.' },
  { q: 'How do I report a user?', a: 'Visit the user\'s profile, click the three-dot menu, and select "Report User". Fill in the reason and submit. Our moderation team reviews all reports within 24 hours.' },
  { q: 'Is SocioChat end-to-end encrypted?', a: 'Yes! All one-to-one messages on SocioChat are end-to-end encrypted by default. Group messages and community channels use server-side encryption.' },
];

export default function Help() {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-cyan-400 font-medium mb-6">Help Center</span>
            <h1 className="text-5xl font-bold text-white mb-6 font-['Space_Grotesk']">How Can We <span className="gradient-text">Help You?</span></h1>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for answers..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
            {CATEGORIES.map(({ icon: Icon, label, color }) => (
              <motion.button key={label} variants={fadeInUp} className="p-5 glass-dark rounded-2xl hover:border-indigo-400/30 transition-all duration-300 hover:-translate-y-1 text-left group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">{label}</p>
              </motion.button>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp}>
            <h2 className="text-3xl font-bold text-white mb-8 font-['Space_Grotesk']">Frequently Asked <span className="gradient-text">Questions</span></h2>
            <div className="space-y-3">
              {FAQS.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())).map((faq, i) => (
                <div key={i} className="glass-dark rounded-2xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left">
                    <span className="text-base font-medium text-white pr-4">{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="w-5 h-5 text-indigo-400 shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="mt-16 p-8 glass-dark rounded-2xl text-center">
            <h3 className="text-xl font-bold text-white mb-3 font-['Space_Grotesk']">Still Need Help?</h3>
            <p className="text-gray-400 mb-6">Our support team is available Monday to Friday, 9AM–6PM IST.</p>
            <a href="mailto:support@sociochat.in" className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-500/30 hover:opacity-90 transition-all">
              <MessageCircle className="w-4 h-4" /> Contact Support
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
