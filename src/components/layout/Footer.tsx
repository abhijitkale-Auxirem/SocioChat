import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Twitter, Instagram, Linkedin, Youtube, Facebook,
  Mail, Phone, MapPin, Zap, ArrowRight, MessageCircle,
  Shield, Globe, Heart, Send
} from 'lucide-react';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Communities', path: '/communities' },
    { label: 'Creator Tools', path: '/features#creator' },
    { label: 'Business', path: '/features#business' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Careers', path: '/careers' },
    { label: 'Press', path: '/press' },
    { label: 'Contact', path: '/contact' },
  ],
  Support: [
    { label: 'Help Center', path: '/help' },
    { label: 'Community Guidelines', path: '/guidelines' },
    { label: 'Safety Center', path: '/safety' },
    { label: 'Report a Problem', path: '/help#report' },
    { label: 'Status', path: '/status' },
  ],
  Legal: [
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Cookie Policy', path: '/cookies' },
    { label: 'GDPR', path: '/gdpr' },
    { label: 'Accessibility', path: '/accessibility' },
  ],
};

const SOCIAL = [
  { Icon: Twitter, href: 'https://twitter.com/sociochat', label: 'Twitter', color: 'hover:bg-sky-500/20 hover:border-sky-400/40 hover:text-sky-400' },
  { Icon: Instagram, href: 'https://instagram.com/sociochat', label: 'Instagram', color: 'hover:bg-pink-500/20 hover:border-pink-400/40 hover:text-pink-400' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/sociochat', label: 'LinkedIn', color: 'hover:bg-blue-500/20 hover:border-blue-400/40 hover:text-blue-400' },
  { Icon: Youtube, href: 'https://youtube.com/sociochat', label: 'YouTube', color: 'hover:bg-red-500/20 hover:border-red-400/40 hover:text-red-400' },
  { Icon: Facebook, href: 'https://facebook.com/sociochat', label: 'Facebook', color: 'hover:bg-blue-600/20 hover:border-blue-500/40 hover:text-blue-400' },
];

const STATS = [
  { value: '4.9M+', label: 'Active Users', icon: Globe },
  { value: '850K+', label: 'Communities', icon: MessageCircle },
  { value: '99.9%', label: 'Uptime', icon: Shield },
  { value: '₹84Cr+', label: 'Creator Earnings', icon: Heart },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <footer ref={ref} className="relative bg-[#050810] overflow-hidden">

      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#4F46E5 1px, transparent 1px), linear-gradient(90deg, #4F46E5 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Glow orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-600/8 rounded-full blur-3xl pointer-events-none" />

      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      {/* Newsletter CTA Band */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                Stay in the <span className="gradient-text">Loop</span>
              </h3>
              <p className="text-gray-400 text-sm mt-1">Get product updates, community news, and creator tips delivered weekly.</p>
            </div>
            <div className="flex items-center gap-2 w-full lg:w-auto max-w-md lg:max-w-none">
              <div className="relative flex-1 lg:w-72">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-3 gradient-primary text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/30 whitespace-nowrap"
              >
                <Send className="w-4 h-4" />
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ value, label, icon: Icon }) => (
              <motion.div key={label} variants={fadeUp} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl gradient-primary/20 border border-indigo-400/20 flex items-center justify-center shrink-0 group-hover:border-indigo-400/50 transition-colors">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="text-lg font-bold gradient-text font-['Space_Grotesk'] leading-none">{value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">

          {/* Brand Column */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="lg:col-span-2"
          >
            <Link to="/" className="flex items-center gap-2.5 mb-5 group">
              <motion.div
                className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-indigo-500/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Zap className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <span className="font-bold text-2xl text-white font-['Space_Grotesk']">Socio<span className="gradient-text">Chat</span></span>
                <p className="text-[9px] text-indigo-400/60 tracking-widest uppercase font-medium">Connect. Create. Chat.</p>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              India's premier real-time social communication platform. Connect, collaborate, and create communities that matter.
            </p>

            <div className="space-y-3 mb-8">
              {[
                { Icon: Mail, text: 'hello@sociochat.in', href: 'mailto:hello@sociochat.in' },
                { Icon: Phone, text: '+91 80000 00000', href: 'tel:+918000000000' },
                { Icon: MapPin, text: '12th Floor, DLF Cyber City, Gurugram, Haryana', href: null },
              ].map(({ Icon, text, href }) => (
                <motion.div key={text} whileHover={{ x: 4 }} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-indigo-400/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  {href ? (
                    <a href={href} className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">{text}</a>
                  ) : (
                    <span className="text-sm text-gray-400">{text}</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-2">
              {SOCIAL.map(({ Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 transition-all duration-300 ${color}`}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links], colIdx) => (
            <motion.div
              key={section}
              variants={stagger}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: colIdx * 0.05 }}
            >
              <motion.h4 variants={fadeUp} className="text-white font-semibold mb-5 flex items-center gap-2 font-['Space_Grotesk']">
                <span className="w-1.5 h-4 rounded-full gradient-primary inline-block" />
                {section}
              </motion.h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <motion.li key={link.label} variants={fadeLeft}>
                    <Link
                      to={link.path}
                      className="group flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition-all duration-200"
                    >
                      <motion.span
                        className="w-0 h-px bg-indigo-400 rounded-full"
                        initial={{ width: 0 }}
                        whileHover={{ width: 8 }}
                        transition={{ duration: 0.2 }}
                      />
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* App download strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ delay: 0.4 }}
          className="mt-14 p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Get SocioChat App</p>
              <p className="text-xs text-gray-500">Available on all platforms</p>
            </div>
          </div>
          <div className="flex gap-3">
            {['App Store', 'Google Play'].map(store => (
              <motion.button
                key={store}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-gray-300 hover:text-white border border-white/10 hover:border-indigo-400/30 transition-all"
              >
                <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                {store}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/5">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent origin-left"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            © 2026 SocioChat. Made with
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-3 h-3 text-red-400 fill-red-400 inline" />
            </motion.span>
            in India. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {[{ label: 'Privacy', path: '/privacy' }, { label: 'Terms', path: '/terms' }, { label: 'Cookies', path: '/cookies' }].map(({ label, path }) => (
              <Link key={label} to={path} className="text-xs text-gray-500 hover:text-indigo-400 transition-colors">
                {label}
              </Link>
            ))}
            <Link to="/admin-login" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
