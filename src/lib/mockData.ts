export const MOCK_PROFILES = [
  { id: '1', name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&crop=face', role: 'Creator', followers: '12.4K', verified: true },
  { id: '2', name: 'Arjun Mehta', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face', role: 'User', followers: '3.2K', verified: false },
  { id: '3', name: 'Anjali Patel', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&crop=face', role: 'Creator', followers: '28.7K', verified: true },
  { id: '4', name: 'Rohit Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', role: 'Admin', followers: '5.1K', verified: true },
  { id: '5', name: 'Neha Singh', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=face', role: 'User', followers: '1.8K', verified: false },
  { id: '6', name: 'Vikram Nair', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face', role: 'Creator', followers: '45.2K', verified: true },
];

export const MOCK_COMMUNITIES = [
  { id: '1', name: 'Tech India', members: 45200, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop', category: 'Technology', type: 'Public' },
  { id: '2', name: 'Startup Network', members: 23100, image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=200&fit=crop', category: 'Business', type: 'Public' },
  { id: '3', name: 'Creative Hub', members: 18500, image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop', category: 'Design', type: 'Private' },
  { id: '4', name: 'Fitness First', members: 67300, image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300&h=200&fit=crop', category: 'Health', type: 'Public' },
  { id: '5', name: 'Film Buffs India', members: 34700, image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=200&fit=crop', category: 'Entertainment', type: 'Public' },
  { id: '6', name: 'Foodie Network', members: 89200, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop', category: 'Food', type: 'Public' },
];

export const MOCK_MESSAGES = [
  { id: '1', sender: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop&crop=face', text: 'Hey! Did you check the new features?', time: '10:30 AM', unread: 2, self: false },
  { id: '2', sender: 'Arjun Mehta', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face', text: 'The startup event was amazing!', time: '9:45 AM', unread: 0, self: false },
  { id: '3', sender: 'Anjali Patel', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face', text: 'Can we schedule a call tomorrow?', time: 'Yesterday', unread: 1, self: false },
  { id: '4', sender: 'Tech India Group', avatar: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=40&h=40&fit=crop', text: 'New post shared by Rohit Kumar', time: 'Yesterday', unread: 5, self: false },
];

export const MOCK_POSTS = [
  {
    id: '1', user: { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=50&h=50&fit=crop&crop=face', verified: true },
    content: 'Excited to announce our new AI-powered features at SocioChat! Connect with thousands of creators across India.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    likes: 1240, comments: 89, shares: 45, time: '2 hours ago',
  },
  {
    id: '2', user: { name: 'Vikram Nair', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face', verified: true },
    content: 'The Indian startup ecosystem is booming! We are witnessing a golden era of innovation and entrepreneurship.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop',
    likes: 3450, comments: 234, shares: 178, time: '5 hours ago',
  },
  {
    id: '3', user: { name: 'Anjali Patel', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop&crop=face', verified: false },
    content: 'Just wrapped up an amazing workshop on digital content creation! Thank you to everyone who attended.',
    image: null,
    likes: 892, comments: 67, shares: 23, time: '1 day ago',
  },
];

export const MOCK_BLOGS = [
  {
    id: '1', title: 'The Future of Social Communication in India',
    excerpt: 'Exploring how real-time communication platforms are transforming the way Indians connect and collaborate online.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
    author: { name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=40&h=40&fit=crop&crop=face' },
    category: 'Technology', readTime: '5 min', date: 'May 10, 2026', tags: ['Social', 'Technology', 'India'],
  },
  {
    id: '2', title: 'Building Communities That Last: A Creator Guide',
    excerpt: 'Learn proven strategies to build, grow and monetize thriving online communities with SocioChat tools.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop',
    author: { name: 'Vikram Nair', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face' },
    category: 'Creator Tips', readTime: '8 min', date: 'May 8, 2026', tags: ['Creator', 'Community', 'Growth'],
  },
  {
    id: '3', title: 'Privacy and Safety on Social Platforms',
    excerpt: 'Understanding privacy controls, two-factor authentication, and how SocioChat keeps your data secure.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
    author: { name: 'Anjali Patel', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face' },
    category: 'Security', readTime: '6 min', date: 'May 5, 2026', tags: ['Privacy', 'Security', 'Tips'],
  },
  {
    id: '4', title: 'How to Grow Your Audience as a Creator',
    excerpt: 'Data-driven strategies to increase follower count, engagement rate, and monetization on SocioChat.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop',
    author: { name: 'Rohit Kumar', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face' },
    category: 'Growth', readTime: '7 min', date: 'May 3, 2026', tags: ['Growth', 'Creator', 'Strategy'],
  },
];

export const MOCK_TESTIMONIALS = [
  { id: '1', name: 'Kavya Reddy', role: 'Content Creator, Hyderabad', text: 'SocioChat transformed how I connect with my audience. The community features are unmatched!', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face', rating: 5 },
  { id: '2', name: 'Siddharth Rao', role: 'Startup Founder, Bangalore', text: 'Built our entire startup community on SocioChat. The group management tools are incredibly powerful.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face', rating: 5 },
  { id: '3', name: 'Meera Joshi', role: 'Digital Marketer, Mumbai', text: 'The analytics dashboard gives me deep insights into my community engagement. Worth every rupee!', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face', rating: 5 },
  { id: '4', name: 'Amit Verma', role: 'Fitness Coach, Delhi', text: 'I monetized my fitness community within weeks. SocioChat creator tools are game-changing!', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face', rating: 5 },
];

export const PRICING_PLANS = [
  {
    name: 'Free', price: 0, period: 'forever',
    features: ['Up to 5 communities', '100 MB storage', 'Basic messaging', 'Standard support', '10 members per group'],
    highlighted: false, cta: 'Get Started Free',
  },
  {
    name: 'Pro', price: 499, period: 'month',
    features: ['Unlimited communities', '10 GB storage', 'HD voice & video calls', 'Priority support', 'Advanced analytics', 'Custom profile themes', '500 members per group'],
    highlighted: true, cta: 'Start Pro Trial',
  },
  {
    name: 'Creator', price: 1299, period: 'month',
    features: ['Everything in Pro', 'Monetization tools', 'Verified badge', '50 GB storage', 'Sponsored posts', 'Creator analytics', 'Unlimited members', 'Dedicated support'],
    highlighted: false, cta: 'Become a Creator',
  },
];
