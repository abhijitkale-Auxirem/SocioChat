import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Clock, ArrowLeft, Share2, Twitter, Linkedin, Facebook, Tag } from 'lucide-react';
import { MOCK_BLOGS } from '@/lib/mockData';
import { toast } from 'sonner';

export default function BlogPost() {
  const { id } = useParams();
  const post = MOCK_BLOGS.find(b => b.id === id) || MOCK_BLOGS[0];

  const handleShare = (platform: string) => {
    toast.success(`Shared on ${platform}!`);
  };

  return (
    <div className="bg-[#070b18]">
      <Navbar />
      <article className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            <div className="mb-6">
              <span className="text-xs bg-indigo-500/80 text-white px-3 py-1 rounded-full">{post.category}</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-['Space_Grotesk']">{post.title}</h1>

            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/10">
              <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover border-2 border-indigo-400/50" />
              <div>
                <p className="text-sm font-semibold text-white">{post.author.name}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} read</span>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-2">
                {[{ icon: Twitter, platform: 'Twitter' }, { icon: Linkedin, platform: 'LinkedIn' }, { icon: Facebook, platform: 'Facebook' }].map(({ icon: Icon, platform }) => (
                  <button key={platform} onClick={() => handleShare(platform)} className="w-9 h-9 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-indigo-400 transition-colors">
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden mb-10">
              <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">{post.excerpt}</p>
              {[
                'India\'s digital landscape is transforming at an unprecedented pace. With over 800 million smartphone users and the world\'s cheapest mobile data, the opportunity for social communication platforms has never been greater.',
                'At SocioChat, we\'ve built our platform with this reality in mind. Every feature, from our lightweight messaging to our community tools, is designed to work flawlessly across India\'s diverse network conditions and device spectrum.',
                'The creator economy in India is booming. From regional language content creators to niche community builders, SocioChat provides the tools that allow creators to monetize their passion and build sustainable income streams.',
                'Our AI-powered recommendation system understands Indian content preferences, regional languages, and cultural context — something global platforms often miss. This allows us to surface the most relevant communities, content, and connections for each user.',
              ].map((para, i) => (
                <p key={i} className="text-gray-400 leading-relaxed mb-6">{para}</p>
              ))}
              <h2 className="text-2xl font-bold text-white mb-4 font-['Space_Grotesk']">Key Takeaways</h2>
              <ul className="space-y-3 mb-8">
                {['Real-time communication is the foundation of meaningful digital communities', 'Creator monetization in India requires understanding local payment preferences', 'Privacy and safety features are non-negotiable for building user trust', 'AI personalization must account for cultural and regional diversity'].map(item => (
                  <li key={item} className="flex items-start gap-3 text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2 flex-wrap pt-8 border-t border-white/10">
              {post.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 text-xs glass text-gray-400 px-3 py-1.5 rounded-full hover:text-indigo-400 transition-colors cursor-pointer">
                  <Tag className="w-3 h-3" />{tag}
                </span>
              ))}
            </div>

            <div className="mt-12 p-6 glass-dark rounded-2xl flex items-start gap-4">
              <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-400/50 shrink-0" />
              <div>
                <p className="font-semibold text-white mb-1">{post.author.name}</p>
                <p className="text-sm text-gray-400">Content Creator & SocioChat Community Lead. Writing about digital communities, creator tools, and the future of social media in India.</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link to="/blog" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                <ArrowLeft className="w-4 h-4" /> Browse More Articles
              </Link>
            </div>
          </motion.div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
