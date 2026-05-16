import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { fadeInUp, viewportOptions } from '@/lib/animations';
import { Link } from 'react-router-dom';

export default function Careers() {
  const JOBS = [
    { title: 'Senior React Developer', dept: 'Engineering', location: 'Global / Remote', type: 'Full-time' },
    { title: 'Product Designer (UI/UX)', dept: 'Design', location: 'Bangalore / Remote', type: 'Full-time' },
    { title: 'Community Growth Manager', dept: 'Marketing', location: 'Mumbai', type: 'Full-time' },
    { title: 'Backend Engineer (Node.js)', dept: 'Engineering', location: 'Remote', type: 'Full-time' },
    { title: 'Content Creator Partnerships', dept: 'Business', location: 'Delhi / Remote', type: 'Full-time' },
  ];
  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-20 left-1/3 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-indigo-400 font-medium mb-6">Join Our Team</span>
            <h1 className="text-5xl font-bold text-white mb-6 font-['Space_Grotesk']">Build the Future of <span className="gradient-text">Global Social</span></h1>
            <p className="text-xl text-gray-400 mb-8">We are a passionate team building the world's most loved social platform. Come grow with us.</p>
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop" alt="Team" className="w-full h-64 object-cover rounded-2xl" />
          </motion.div>
        </div>
      </section>
      <section className="py-12 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 font-['Space_Grotesk']">Open <span className="gradient-text">Positions</span></h2>
          <div className="space-y-4">
            {JOBS.map((job, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp}
                className="p-6 glass-dark rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-400/30 transition-all">
                <div>
                  <h3 className="text-base font-semibold text-white font-['Space_Grotesk']">{job.title}</h3>
                  <p className="text-sm text-gray-400">{job.dept} · {job.location} · {job.type}</p>
                </div>
                <Link to="/contact" className="px-5 py-2 gradient-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all shrink-0">Apply Now</Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 p-6 glass-dark rounded-2xl text-center">
            <p className="text-gray-400 mb-4">Don't see your role? We're always looking for great talent.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white font-semibold rounded-xl text-sm">Send Your Resume</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
