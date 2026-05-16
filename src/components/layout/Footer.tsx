import { useRef, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  Twitter, Instagram, Linkedin, Youtube, Facebook,
  Mail, Phone, MapPin, Zap, ArrowRight, MessageCircle,
  Shield, Globe, Heart, Send
} from 'lucide-react';
import { toast } from 'sonner';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Communities', path: '/communities' },
    { label: 'Creator Tools', path: '/features#creator' },
    { label: 'Business', path: '/business' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Careers', path: '/careers' },
    { label: 'Press', path: '/press' },
    { label: 'Contact', path: '/contact' },
  ],
  Support: [
    { label: 'Help Center', path: '/help-center' },
    { label: 'Community Guidelines', path: '/guidelines' },
    { label: 'Safety Center', path: '/safety' },
    { label: 'Report a Problem', path: '/report' },
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
  { Icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500/20 hover:border-sky-400/40 hover:text-sky-400' },
  { Icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-500/20 hover:border-pink-400/40 hover:text-pink-400' },
  { Icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-500/20 hover:border-blue-400/40 hover:text-blue-400' },
  { Icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-500/20 hover:border-red-400/40 hover:text-red-400' },
  { Icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600/20 hover:border-blue-500/40 hover:text-blue-400' },
];

const STATS = [
  { value: '5M+', label: 'Global Users', icon: Globe },
  { value: '850K+', label: 'Communities', icon: MessageCircle },
  { value: '99.9%', label: 'Uptime', icon: Shield },
  { value: '$100M+', label: 'Creator Payouts', icon: Heart },
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
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanedEmail) {
      toast.error('Please enter your email address.');
      return;
    }

    if (!emailRegex.test(cleanedEmail)) {
      toast.error('Enter a valid email to subscribe.');
      return;
    }

    toast.success("You're subscribed! We'll keep you updated.");
    setEmail('');
  };

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
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      {/* Newsletter Section */}
      <div className="relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white font-['Space_Grotesk']">
                Stay in the <span className="text-indigo-400">Loop</span>
              </h3>
              <p className="text-gray-400 text-sm mt-1">Get product updates and creator tips delivered globally.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full lg:w-auto max-w-md">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>
              <button type="submit" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-500/20">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white font-['Space_Grotesk']">{value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-white font-['Space_Grotesk']">SocioChat</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              The world's premier real-time social communication platform. Connect, collaborate, and create communities across the globe.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-indigo-400" /> hello@sociochat.com
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Globe className="w-4 h-4 text-indigo-400" /> Global Headquarters
              </div>
            </div>
            {/* Social Icons */}
            <div className="flex gap-2">
              {SOCIAL.map(({ Icon, href, label, color }) => (
                <a key={label} href={href} className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all ${color}`}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <h4 className="text-white font-semibold mb-5 font-['Space_Grotesk'] uppercase text-xs tracking-widest">{section}</h4>
                <ul className="space-y-3">
                  {links.map(link => (
                    <li key={link.label}>
                      <Link to={link.path} className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Official App Store Buttons Section */}
          <div className="lg:col-span-3 space-y-5">
            <p className="text-xs font-semibold text-white uppercase tracking-[0.2em]">Download SocioChat</p>
            <div className="grid gap-4">
              <a href="https://apps.apple.com/app/sociochat" target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-indigo-400/30">
                <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" className="w-full h-auto" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.sociochat" target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-indigo-400/30">
                <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Google Play" className="w-full h-auto" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            © 2026 SocioChat. Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for the World.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map(l => (
              <Link key={l} to={`/${l.toLowerCase()}`} className="text-xs text-gray-500 hover:text-indigo-400 transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}