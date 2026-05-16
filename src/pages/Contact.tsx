import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { fadeInLeft, fadeInRight, staggerContainer, fadeInUp, viewportOptions } from '@/lib/animations';
import { Mail, Phone, MapPin, Send, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Please fill all required fields.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    toast.success('Message sent! We will get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute top-20 left-1/3 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-indigo-400 font-medium mb-6">Get In Touch</span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 font-['Space_Grotesk']">We'd Love to <span className="gradient-text">Hear From You</span></h1>
            <p className="text-xl text-gray-400">Questions, feedback, partnerships — our team is here to help.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInLeft}>
              <h2 className="text-3xl font-bold text-white mb-8 font-['Space_Grotesk']">Contact Information</h2>
              {[
                { icon: Mail, label: 'Email Us', value: 'hello@sociochat.com', sub: 'We reply within 24 hours', href: 'mailto:hello@sociochat.com' },
                { icon: Phone, label: 'Call Us', value: '+1 800 000 0000', sub: 'Mon-Fri, 9AM-6PM UTC', href: 'tel:+18000000000' },
                { icon: MapPin, label: 'Visit Us', value: '12th Floor, Global Operations', sub: 'Worldwide Support Center', href: '#' },
              ].map(({ icon: Icon, label, value, sub, href }) => (
                <a key={label} href={href} className="flex items-start gap-4 p-5 glass-dark rounded-2xl mb-4 hover:border-indigo-400/30 transition-all group">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <p className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors">{value}</p>
                    <p className="text-xs text-gray-500">{sub}</p>
                  </div>
                </a>
              ))}

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-4 font-['Space_Grotesk']">Follow Us</h3>
                <div className="flex gap-3">
                  {[{ icon: Twitter, href: 'https://twitter.com/sociochat', label: 'Twitter' }, { icon: Instagram, href: 'https://instagram.com/sociochat', label: 'Instagram' }, { icon: Linkedin, href: 'https://linkedin.com/company/sociochat', label: 'LinkedIn' }, { icon: Youtube, href: 'https://youtube.com/sociochat', label: 'YouTube' }].map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="w-12 h-12 glass-dark rounded-xl flex items-center justify-center text-gray-400 hover:text-indigo-400 hover:border-indigo-400/30 transition-all">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInRight}>
              <div className="glass-dark rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 font-['Space_Grotesk']">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    {[{ label: 'Full Name *', key: 'name', type: 'text', placeholder: 'Alex Rivers' }, { label: 'Email *', key: 'email', type: 'email', placeholder: 'alex@example.com' }].map(({ label, key, type, placeholder }) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
                        <input type={type} value={form[key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                          placeholder={placeholder}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <input type="text" value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="How can we help?"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                    <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} rows={5} placeholder="Tell us what's on your mind..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all resize-none" />
                  </div>
                  <motion.button type="submit" whileTap={{ scale: 0.98 }} disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 gradient-primary text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all disabled:opacity-70">
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-5 h-5" /> Send Message</>}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
