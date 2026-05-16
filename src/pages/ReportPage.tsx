import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { fadeInUp, viewportOptions } from '@/lib/animations';
import { Mail, Bug, AlertTriangle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ReportPage() {
  const [form, setForm] = useState({ email: '', subject: '', details: '', category: 'Bug Report' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.subject || !form.details) {
      toast.error('Please complete all required fields.');
      return;
    }
    setSubmitted(true);
    toast.success('Report submitted. Our team will review it shortly.');
  };

  return (
    <div className="bg-[#070b18] min-h-screen">
      <Navbar />
      <section className="pt-32 pb-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),transparent_35%)]" />
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-rose-400 font-medium mb-6">Report</span>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 font-['Space_Grotesk']">Submit a Bug or Issue</h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">Tell us about the problem and we’ll prioritize it with our support and engineering teams.</p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="glass-dark rounded-3xl p-8 border border-white/10">
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Bug, label: 'Bug Report' },
                { icon: AlertTriangle, label: 'User Abuse' },
                { icon: Mail, label: 'Support Request' },
              ].map(item => (
                <div key={item.label} className="p-4 glass rounded-3xl text-center">
                  <div className="mx-auto mb-3 w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                </div>
              ))}
            </div>

            {submitted ? (
              <div className="p-8 bg-green-500/10 border border-green-500/20 rounded-3xl text-center">
                <CheckCircle className="mx-auto mb-4 w-10 h-10 text-green-400" />
                <h2 className="text-2xl font-semibold text-white mb-2">Thank you!</h2>
                <p className="text-gray-300">Your report has been sent. We’ll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    placeholder="Short summary"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Report Type</label>
                  <select
                    value={form.category}
                    onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                  >
                    <option>Bug Report</option>
                    <option>User Abuse</option>
                    <option>Feature Request</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Details</label>
                  <textarea
                    value={form.details}
                    onChange={e => setForm(p => ({ ...p, details: e.target.value }))}
                    placeholder="Describe the issue in detail"
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                  />
                </div>
                <motion.button whileTap={{ scale: 0.98 }} type="submit" className="w-full py-4 gradient-primary text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all">
                  Submit Report
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
