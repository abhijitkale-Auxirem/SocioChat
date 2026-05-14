import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { LayoutDashboard, Users, BarChart2, Shield, Settings, FileText, AlertTriangle, Plus, Edit2, Trash2, Eye, X } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_BLOGS } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { toast } from 'sonner';

const SIDEBAR = [
  { label: 'Overview', path: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Users', path: '/admin/users', icon: <Users className="w-4 h-4" /> },
  { label: 'Communities', path: '/admin/communities', icon: <Users className="w-4 h-4" /> },
  { label: 'Blog', path: '/admin/blog', icon: <FileText className="w-4 h-4" /> },
  { label: 'Reports', path: '/admin/reports', icon: <AlertTriangle className="w-4 h-4" /> },
  { label: 'Analytics', path: '/admin/analytics', icon: <BarChart2 className="w-4 h-4" /> },
  { label: 'Security', path: '/admin/security', icon: <Shield className="w-4 h-4" /> },
  { label: 'Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
];

const emptyForm = { title: '', excerpt: '', category: '', author: '' };

export default function AdminBlog() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  if (!user || (user as any).role !== 'admin') { navigate('/admin-login'); return null; }

  const [blogs, setBlogs] = useState(MOCK_BLOGS);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [viewPost, setViewPost] = useState<any>(null);
  const [confirmDel, setConfirmDel] = useState<string | null>(null);

  const handleAdd = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const handleEdit = (post: any) => { setForm({ title: post.title, excerpt: post.excerpt, category: post.category, author: post.author.name }); setEditId(post.id); setShowForm(true); };
  const handleSave = () => {
    if (!form.title || !form.excerpt) { toast.error('Title and excerpt are required!'); return; }
    if (editId) {
      setBlogs(prev => prev.map(b => b.id === editId ? { ...b, title: form.title, excerpt: form.excerpt, category: form.category } : b));
      toast.success('Blog post updated!');
    } else {
      const newPost = { id: String(Date.now()), title: form.title, excerpt: form.excerpt, image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop', author: { name: form.author || 'Admin', avatar: user.avatar }, category: form.category || 'General', readTime: '5 min', date: new Date().toLocaleDateString(), tags: [] };
      setBlogs(prev => [newPost, ...prev]);
      toast.success('Blog post published!');
    }
    setShowForm(false); setForm(emptyForm); setEditId(null);
  };
  const handleDelete = (id: string) => {
    if (confirmDel !== id) { setConfirmDel(id); return; }
    setBlogs(prev => prev.filter(b => b.id !== id));
    toast.success('Blog post deleted!'); setConfirmDel(null);
  };

  return (
    <DashboardLayout sidebarItems={SIDEBAR} title="Blog Management" roleLabel="Platform Admin">
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-5">
        <motion.div variants={fadeInUp} className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white font-['Space_Grotesk']">Blog Posts ({blogs.length})</h2>
          <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 gradient-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">
            <Plus className="w-4 h-4" /> New Post
          </button>
        </motion.div>

        {showForm && (
          <motion.div variants={fadeInUp} className="glass-dark rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white font-['Space_Grotesk']">{editId ? 'Edit Post' : 'New Post'}</h3>
              <button onClick={() => setShowForm(false)}><X className="w-4 h-4 text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              {[{ label: 'Title *', key: 'title', placeholder: 'Blog post title' }, { label: 'Category', key: 'category', placeholder: 'e.g. Technology' }, { label: 'Author', key: 'author', placeholder: 'Author name' }].map(f => (
                <div key={f.key}>
                  <label className="block text-xs text-gray-400 mb-2">{f.label}</label>
                  <input value={form[f.key as keyof typeof form]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                    className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-400" />
                </div>
              ))}
              <div>
                <label className="block text-xs text-gray-400 mb-2">Excerpt *</label>
                <textarea value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} rows={3} placeholder="Brief description..."
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none" />
              </div>
              <div className="flex gap-3">
                <button onClick={handleSave} className="px-5 py-2.5 gradient-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">{editId ? 'Update Post' : 'Publish Post'}</button>
                <button onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-white/10 text-gray-300 text-sm rounded-xl hover:bg-white/5 transition-all">Cancel</button>
              </div>
            </div>
          </motion.div>
        )}

        {viewPost && (
          <div className="glass-dark rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-white font-['Space_Grotesk']">Post Preview</h3>
              <button onClick={() => setViewPost(null)}><X className="w-4 h-4 text-gray-400" /></button>
            </div>
            <img src={viewPost.image} alt={viewPost.title} className="w-full h-40 object-cover rounded-xl mb-4" />
            <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full">{viewPost.category}</span>
            <h4 className="text-lg font-bold text-white mt-2 mb-2 font-['Space_Grotesk']">{viewPost.title}</h4>
            <p className="text-sm text-gray-400">{viewPost.excerpt}</p>
          </div>
        )}

        <motion.div variants={fadeInUp} className="space-y-3">
          {blogs.map(post => (
            <div key={post.id} className="glass-dark rounded-2xl p-4 flex items-center gap-4">
              <img src={post.image} alt={post.title} className="w-16 h-12 object-cover rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">{post.title}</h3>
                <p className="text-xs text-gray-500">{post.category} · {post.date} · {post.readTime}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => setViewPost(post)} className="text-xs flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"><Eye className="w-3 h-3" />View</button>
                <button onClick={() => handleEdit(post)} className="text-xs flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"><Edit2 className="w-3 h-3" />Edit</button>
                <button onClick={() => handleDelete(post.id)} className={`text-xs flex items-center gap-1 transition-colors ${confirmDel === post.id ? 'text-red-500' : 'text-red-400 hover:text-red-300'}`}>
                  <Trash2 className="w-3 h-3" />{confirmDel === post.id ? 'Confirm?' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
