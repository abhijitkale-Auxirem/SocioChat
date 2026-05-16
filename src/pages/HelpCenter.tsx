import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { fadeInUp, viewportOptions } from '@/lib/animations';
import { Search, Shield, Settings, CreditCard, MessageCircle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  { q: 'How do I start a new conversation?', a: 'Go to your dashboard and click the New Chat button. Use the people search to find contacts and begin messaging instantly.' },
  { q: 'How do I create a community?', a: 'Navigate to Communities in your dashboard, click Create Community, and choose public or private settings with custom permissions.' },
  { q: 'How can I monetize my creator content?', a: 'Use Creator Tools to offer paid communities, premium posts, tipping, and exclusive subscriber-only content.' },
  { q: 'How do I report a bug or issue?', a: 'Use the Report page to submit details, screenshots, and priority. Our support team reviews reports within 24 hours.' },
  { q: 'Is my account secure?', a: 'Yes. SocioChat offers two-factor authentication, secure password controls, and privacy settings to protect your account.' },
];

const CATEGORIES = [
  { icon: MessageCircle, label: 'Messaging', color: 'from-indigo-500 to-purple-600' },
  { icon: Shield, label: 'Safety', color: 'from-green-500 to-teal-600' },
  { icon: Settings, label: 'Account', color: 'from-orange-500 to-red-600' },
  { icon: CreditCard, label: 'Billing', color: 'from-purple-500 to-pink-600' },
  { icon: Search, label: 'Search Tips', color: 'from-cyan-500 to-blue-600' },
];

export default function HelpCenter() {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.18),transparent_35%)]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-cyan-400 font-medium mb-6">Help Center</span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 font-['Space_Grotesk']">Find Answers Fast</h1>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">Search our knowledge base, browse common topics, or submit a report to our support team.</p>
            <div className="relative mx-auto max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search for answers or keywords..."
                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
            {CATEGORIES.map(category => (
              <div key={category.label} className="glass-dark rounded-3xl p-5 border border-white/10">
                <div className={`w-12 h-12 rounded-3xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-white mb-2">{category.label}</p>
                <p className="text-sm text-gray-400 leading-relaxed">Helpful resources for common issues and questions.</p>
              </div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="space-y-4">
            {FAQS.filter(faq => faq.q.toLowerCase().includes(search.toLowerCase()) || faq.a.toLowerCase().includes(search.toLowerCase())).map((faq, index) => (
              <div key={faq.q} className="glass-dark rounded-3xl overflow-hidden border border-white/10">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-base font-medium text-white">{faq.q}</span>
                  {openFaq === index ? <ChevronUp className="w-5 h-5 text-indigo-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          <div className="mt-16 p-8 glass-dark rounded-3xl border border-white/10 text-center">
            <h2 className="text-3xl font-bold text-white mb-4 font-['Space_Grotesk']">Still need help?</h2>
            <p className="text-gray-400 mb-6">Submit a report or contact our support team for faster assistance.</p>
            <Link to="/report" className="inline-flex items-center gap-2 px-8 py-4 gradient-primary text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all">
              Report an Issue <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
