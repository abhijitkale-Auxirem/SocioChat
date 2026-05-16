import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { fadeInLeft, fadeInRight, viewportOptions } from '@/lib/animations';

const CHAT_MESSAGES = [
  { text: 'Hey! Just joined the Global Tech community', self: false, name: 'Alex', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=32&h=32&fit=crop&crop=face' },
  { text: 'Welcome! You will love it here. We share amazing content daily.', self: true },
  { text: 'Can you share the resource links?', self: false, name: 'Alex', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=32&h=32&fit=crop&crop=face' },
  { text: 'Sure! Dropping them in the community channel right now.', self: true },
];

export default function AppPreviewSection() {
  return (
    <section className="py-24 bg-[#080c1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInLeft}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-indigo-400 font-medium mb-6">Live Chat Experience</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-['Space_Grotesk']">Chat That <span className="gradient-text">Feels Natural</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">Experience real-time messaging with read receipts, typing indicators, message reactions, and seamless media sharing — all designed for the world's fast-paced communication style.</p>
            {['End-to-end encrypted messages', 'Voice notes and media sharing', 'Group chats up to 500 members', 'Message reactions and replies'].map(f => (
              <div key={f} className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-indigo-400 shrink-0" />
                <span className="text-gray-300 text-sm">{f}</span>
              </div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInRight}>
            <div className="glass-dark rounded-3xl p-1 shadow-2xl shadow-indigo-500/20">
              <div className="bg-[#0d1120] rounded-2xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                  <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop&crop=face" alt="Priya" className="w-10 h-10 rounded-full object-cover border-2 border-indigo-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">Priya Sharma</p>
                    <p className="text-xs text-green-400">Online</p>
                  </div>
                </div>
                <div className="p-5 space-y-4 min-h-[280px]">
                  {CHAT_MESSAGES.map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: msg.self ? 20 : -20 }} whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }} viewport={{ once: true }}
                      className={`flex items-end gap-2 ${msg.self ? 'flex-row-reverse' : ''}`}>
                      {!msg.self && <img src={msg.avatar} alt={msg.name} className="w-7 h-7 rounded-full object-cover shrink-0" />}
                      <div className={`max-w-[75%] px-4 py-2.5 text-sm ${msg.self ? 'chat-bubble-self text-white' : 'chat-bubble-other text-gray-200'}`}>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  <div className="flex items-center gap-2 pt-2">
                    <div className="flex-1 bg-white/5 rounded-xl px-4 py-2.5 text-sm text-gray-500">Type a message...</div>
                    <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
