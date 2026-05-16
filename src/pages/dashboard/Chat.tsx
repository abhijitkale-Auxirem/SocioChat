import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import {
  LayoutDashboard, MessageCircle, Users, Rss, UserPlus,
  Bell, User, Settings, Send, Paperclip, Smile, X,
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import { MOCK_MESSAGES } from '@/lib/mockData';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const SIDEBAR = [
  { label: 'Overview', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: 'Messages', path: '/dashboard/chat', icon: <MessageCircle className="w-4 h-4" /> },
  { label: 'Communities', path: '/dashboard/communities', icon: <Users className="w-4 h-4" /> },
  { label: 'Feed', path: '/dashboard/feed', icon: <Rss className="w-4 h-4" /> },
  { label: 'Friends', path: '/dashboard/friends', icon: <UserPlus className="w-4 h-4" /> },
  { label: 'Notifications', path: '/dashboard/notifications', icon: <Bell className="w-4 h-4" /> },
  { label: 'Profile', path: '/dashboard/profile', icon: <User className="w-4 h-4" /> },
  { label: 'Settings', path: '/dashboard/settings', icon: <Settings className="w-4 h-4" /> },
];

interface Message {
  text: string;
  self: boolean;
  time: string;
}

const INITIAL_MSGS: Message[] = [
  { text: 'Hey! How are you doing today?', self: false, time: '10:28 AM' },
  { text: 'I am doing great, thanks for asking!', self: true, time: '10:29 AM' },
  { text: 'Did you see the new features on SocioChat?', self: false, time: '10:30 AM' },
  { text: 'Yes! The communities section is amazing.', self: true, time: '10:31 AM' },
  { text: 'Absolutely! We should join the Tech World community together.', self: false, time: '10:32 AM' },
];

interface ProfileModalProps {
  contact: typeof MOCK_MESSAGES[0];
  onClose: () => void;
}

function ProfileModal({ contact, onClose }: ProfileModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-[#0d1120] border border-white/10 rounded-2xl p-8 w-full max-w-sm text-center shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <img src={contact.avatar} alt={contact.sender} className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white font-['Space_Grotesk'] mb-1">{contact.sender}</h3>
        <span className="inline-block text-xs text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full mb-4">SocioChat User</span>
        <div className="space-y-2 text-sm text-gray-400 mb-6">
          <p>Active member of SocioChat communities</p>
          <p className="text-green-400 flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> Online now
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 gradient-primary text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-all">
            Send Message
          </button>
          <button onClick={() => { toast.success(`Friend request sent to ${contact.sender}!`); onClose(); }} className="flex-1 py-2.5 border border-indigo-400/40 text-indigo-400 text-sm font-semibold rounded-xl hover:bg-indigo-400/10 transition-all">
            Add Friend
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Chat() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  if (!user) { navigate('/login'); return null; }

  const initialSelected = MOCK_MESSAGES.find(m => m.id === (location.state as any)?.selectedId) || MOCK_MESSAGES[0];
  const [selected, setSelected] = useState(initialSelected);
  const [text, setText] = useState('');
  const [chatHistory, setChatHistory] = useState<Record<string, Message[]>>(
    Object.fromEntries(MOCK_MESSAGES.map(m => [m.id, [...INITIAL_MSGS]]))
  );
  const [viewProfile, setViewProfile] = useState<typeof MOCK_MESSAGES[0] | null>(null);
  const [search, setSearch] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentMessages = chatHistory[selected.id] || [...INITIAL_MSGS];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selected.id, currentMessages.length]);

  const filteredContacts = MOCK_MESSAGES.filter(m =>
    m.sender.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const newMsg: Message = { text: trimmed, self: true, time: timeStr };
    setChatHistory(prev => ({
      ...prev,
      [selected.id]: [...(prev[selected.id] || []), newMsg],
    }));
    setText('');
    toast.success('Message sent!');
  };

  return (
    <>
      <AnimatePresence>
        {viewProfile && (
          <ProfileModal contact={viewProfile} onClose={() => setViewProfile(null)} />
        )}
      </AnimatePresence>

      <DashboardLayout sidebarItems={SIDEBAR} title="Messages" roleLabel="General User">
        <div className="flex h-[calc(100vh-8rem)] glass-dark rounded-2xl overflow-hidden">

          {/* Contact list */}
          <div className="w-72 shrink-0 border-r border-white/5 flex flex-col">
            <div className="p-4 border-b border-white/5">
              <h3 className="text-sm font-semibold text-white mb-3">Conversations</h3>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search contacts..."
                className="w-full px-3 py-2 bg-white/5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {filteredContacts.length === 0 && (
                <p className="text-center text-gray-500 text-xs mt-6">No contacts found</p>
              )}
              {filteredContacts.map(msg => (
                <button
                  key={msg.id}
                  onClick={() => setSelected(msg)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all mb-1 ${
                    selected.id === msg.id ? 'bg-indigo-400/15' : 'hover:bg-white/5'
                  }`}
                >
                  <img src={msg.avatar} alt={msg.sender} className="w-9 h-9 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{msg.sender}</p>
                    <p className="text-xs text-gray-400 truncate">
                      {(chatHistory[msg.id] || []).slice(-1)[0]?.text || msg.text}
                    </p>
                  </div>
                  {msg.unread > 0 && (
                    <span className="text-xs bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center shrink-0">
                      {msg.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Chat header — click avatar/name to open profile */}
            <div className="flex items-center gap-3 p-4 border-b border-white/5 shrink-0">
              <button
                onClick={() => setViewProfile(selected)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <img src={selected.avatar} alt={selected.sender} className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-400/50" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-white hover:text-indigo-300 transition-colors">{selected.sender}</p>
                  <p className="text-xs text-green-400">Online</p>
                </div>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((m, i) => (
                <div key={i} className={`flex items-end gap-2 ${m.self ? 'flex-row-reverse' : ''}`}>
                  {!m.self && (
                    <button onClick={() => setViewProfile(selected)}>
                      <img src={selected.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0 hover:ring-2 hover:ring-indigo-400 transition-all" />
                    </button>
                  )}
                  <div className={`max-w-xs px-4 py-2.5 text-sm rounded-2xl ${
                    m.self
                      ? 'bg-indigo-500 text-white rounded-br-sm'
                      : 'bg-white/8 text-gray-200 rounded-bl-sm'
                  }`}>
                    {m.text}
                  </div>
                  <span className="text-xs text-gray-600 shrink-0">{m.time}</span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 flex items-center gap-3 shrink-0">
              <button
                onClick={() => toast.info('File sharing coming soon!')}
                className="text-gray-400 hover:text-indigo-400 transition-colors shrink-0"
              >
                <Paperclip className="w-5 h-5" />
              </button>
              <button
                onClick={() => toast.info('Emoji picker coming soon!')}
                className="text-gray-400 hover:text-indigo-400 transition-colors shrink-0"
              >
                <Smile className="w-5 h-5" />
              </button>
              <input
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder={`Message ${selected.sender}...`}
                className="flex-1 px-4 py-2.5 bg-white/5 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-400 min-w-0"
              />
              <button
                onClick={handleSend}
                disabled={!text.trim()}
                className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center hover:opacity-90 transition-all disabled:opacity-40 shrink-0"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
