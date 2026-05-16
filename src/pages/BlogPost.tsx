import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { 
  Clock, 
  ArrowLeft, 
  Calendar, 
  Tag, 
  Share2, 
  ChevronRight,
} from 'lucide-react';

// Master Data Import - This ensures the 9 blocks are always available
import { MOCK_BLOGS } from '@/lib/mockData';

// Shared Layout Components
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();

  // Logic: Find the specific block from the full list of 9
  const post = MOCK_BLOGS.find((b) => b.id === id);

  // Auto-scroll to top when clicking a new post
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // If the ID is invalid or the post doesn't exist
  if (!post) {
    return (
      <div className="bg-[#020617] min-h-screen flex items-center justify-center text-white">
        <Navbar />
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 font-['Space_Grotesk']">Article Not Found</h2>
          <Link to="/blog" className="text-purple-500 font-bold hover:underline uppercase tracking-widest text-xs">
            Back to All Articles
          </Link>
        </div>
      </div>
    );
  }

  // Fallback to 'Technology' if category isn't defined in mockData
  const displayCategory = post.category || 'Technology';

  return (
    <div className="bg-[#020617] min-h-screen text-white selection:bg-purple-500/30">
      <Navbar />
      
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px]" />
      </div>

      <main className="relative pt-40 pb-24 z-10">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Navigation Block */}
            <div className="flex items-center gap-4 mb-10">
              <Link to="/blog" className="p-3 bg-[#0f172a] border border-slate-800 rounded-2xl hover:bg-purple-600 transition-all group">
                <ArrowLeft className="w-5 h-5 text-purple-400 group-hover:text-white" />
              </Link>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                <span>Blog</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-purple-400">{displayCategory}</span>
              </div>
            </div>

            {/* Header Block */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-10 leading-[1.1] font-['Space_Grotesk'] tracking-tight">
              {post.title}
            </h1>

            {/* Info Block */}
            <div className="flex flex-wrap items-center justify-between gap-6 p-8 bg-[#0f172a]/40 border border-slate-800 rounded-[2.5rem] backdrop-blur-xl mb-16">
              <div className="flex items-center gap-4">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500/20" 
                />
                <div>
                  <p className="text-sm font-bold text-white uppercase tracking-wider">{post.author.name}</p>
                  <div className="flex items-center gap-4 text-[10px] text-slate-500 mt-1 font-black uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-purple-500" /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-purple-500" /> {post.readTime}</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-600/20">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>

            {/* Image Block */}
            <div className="rounded-[3.5rem] overflow-hidden border border-white/5 shadow-2xl mb-16 aspect-video relative group">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute top-6 left-6 bg-purple-600/80 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">
                {displayCategory}
              </div>
            </div>

            {/* Content Block */}
            <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-p:text-lg prose-p:leading-relaxed prose-h2:text-white prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-16 font-['Inter']">
              <p className="text-white font-bold text-2xl leading-relaxed mb-12 italic border-l-4 border-purple-500 pl-8 bg-purple-500/5 py-6 rounded-r-3xl">
                "{post.excerpt}"
              </p>

              <div className="space-y-6">
                <p>
                  Exploring the future of digital connectivity requires a deep understanding of 
                  how communities interact. Our infrastructure at SocioChat is designed to 
                  support the next generation of creators.
                </p>
                <h2 className="font-['Space_Grotesk']">Strategic Insights</h2>
                <p>
                  By maintaining a fixed standard of quality and security, we ensure that every 
                  interaction is protected. The 2026 roadmap focuses on enhancing these 
                  core blocks of communication.
                </p>
              </div>
            </div>

            {/* Tags Block */}
            <div className="flex flex-wrap gap-2 mt-16 pt-12 border-t border-slate-800">
              {post.tags?.map((tag) => (
                <span 
                  key={tag} 
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#0f172a] border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-purple-500 transition-colors cursor-default"
                >
                  <Tag className="w-3.5 h-3.5 text-purple-500" /> {tag}
                </span>
              ))}
            </div>

            {/* Author Attribution Block */}
            <div className="mt-20 p-10 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-[3rem] border border-purple-500/20 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-24 h-24 rounded-[2rem] border-4 border-white/5 shadow-2xl relative z-10" 
              />
              <div className="relative z-10 text-center md:text-left">
                <h4 className="text-2xl font-bold font-['Space_Grotesk'] mb-2 uppercase tracking-tight">
                  About {post.author.name}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xl font-medium">
                  Senior Community strategist at SocioChat. Dedicated to building secure and 
                  scalable communication blocks for global creators.
                </p>
                <div className="flex justify-center md:justify-start gap-4">
                  <button className="text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 px-6 py-2.5 rounded-xl hover:bg-white/10 transition-all">
                    Profile
                  </button>
                  <button className="text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 px-6 py-2.5 rounded-xl hover:bg-white/10 transition-all">
                    More Posts
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}