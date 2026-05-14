import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { staggerContainer, fadeInUp, viewportOptions } from '@/lib/animations';
import { MOCK_BLOGS } from '@/lib/mockData';

export default function BlogSection() {
  return (
    <section className="py-24 bg-[#0a0e1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={fadeInUp} className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 glass rounded-full text-sm text-cyan-400 font-medium mb-4">Latest Insights</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white font-['Space_Grotesk']">From Our <span className="gradient-text">Blog</span></h2>
          </div>
          <Link to="/blog" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={viewportOptions} variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_BLOGS.map(post => (
            <motion.div key={post.id} variants={fadeInUp}
              className="group glass-dark rounded-2xl overflow-hidden hover:border-indigo-400/30 transition-all duration-300 hover:-translate-y-2">
              <div className="h-44 overflow-hidden relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className="text-xs bg-indigo-500/90 text-white px-2.5 py-1 rounded-full">{post.category}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-3 leading-snug line-clamp-2 group-hover:text-indigo-400 transition-colors font-['Space_Grotesk']">{post.title}</h3>
                <div className="flex items-center gap-2 mt-auto">
                  <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
                  <span className="text-xs text-gray-400">{post.author.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
