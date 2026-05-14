import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Users, Zap } from 'lucide-react';

const FLOATING_BADGES = [
  { icon: MessageCircle, text: '2.4M Messages/day', color: 'from-indigo-500 to-purple-600', x: '8%', y: '30%', delay: 0 },
  { icon: Users, text: '850K+ Communities', color: 'from-cyan-500 to-blue-600', x: '82%', y: '22%', delay: 0.4 },
  { icon: Zap, text: 'Real-time Sync', color: 'from-purple-500 to-pink-600', x: '75%', y: '68%', delay: 0.8 },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4, size: Math.random() * 2 + 0.5, alpha: Math.random() * 0.6 + 0.1 });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
        ctx.fill();
        particles.slice(i + 1).forEach(p2 => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(79, 70, 229, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#070b18]">
      <div className="absolute inset-0" style={{ backgroundImage: `url('/assets/hero-bg.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#070b18]/60 via-transparent to-[#070b18]" />
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {FLOATING_BADGES.map(({ icon: Icon, text, color, x, y, delay }) => (
        <motion.div key={text} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{ delay, duration: 0.6, y: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay } }}
          className="absolute hidden md:flex items-center gap-2 glass rounded-2xl px-4 py-2.5 shadow-xl"
          style={{ left: x, top: y }}>
          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
            <Icon className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-xs font-semibold text-white whitespace-nowrap">{text}</span>
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-gray-300">Live on all platforms across India</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight font-['Space_Grotesk']">
          Connect, Chat &<br />
          <span className="gradient-text">Build Communities</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          India's most powerful social communication platform. Real-time messaging, thriving communities, and creator tools — all in one place.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="group flex items-center justify-center gap-2 px-8 py-4 gradient-primary text-white font-semibold rounded-2xl text-lg shadow-2xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-105 transition-all duration-300">
            Start For Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/features" className="flex items-center justify-center gap-2 px-8 py-4 glass text-white font-semibold rounded-2xl text-lg hover:bg-white/10 transition-all duration-300">
            Explore Features
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="mt-16 flex items-center justify-center gap-8 flex-wrap">
          {[['4.9M+', 'Active Users'], ['850K+', 'Communities'], ['2.4M+', 'Messages/Day'], ['99.9%', 'Uptime']].map(([num, label]) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-bold gradient-text font-['Space_Grotesk']">{num}</div>
              <div className="text-xs text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
