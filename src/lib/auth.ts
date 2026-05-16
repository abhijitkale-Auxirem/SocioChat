export type UserRole = 'user' | 'creator' | 'community_admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio: string;
  phone: string;
  joinedAt: string;
  verified: boolean;
}

export interface RegisteredUser extends AuthUser {
  password: string;
}

const USERS_KEY = 'sociochat_users';
const CURRENT_USER_KEY = 'sociochat_current_user';

const GLOBAL_AVATARS = [
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
];

export function getUsers(): RegisteredUser[] {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveUsers(users: RegisteredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(data: {
  name: string; email: string; password: string; role: UserRole; phone: string;
}): { success: boolean; message: string } {
  const users = getUsers();
  if (users.find(u => u.email === data.email)) {
    return { success: false, message: 'Email already registered. Please login.' };
  }
  const newUser: RegisteredUser = {
    id: `user_${Date.now()}`,
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
    phone: data.phone,
    avatar: GLOBAL_AVATARS[Math.floor(Math.random() * GLOBAL_AVATARS.length)],
    bio: '',
    joinedAt: new Date().toISOString(),
    verified: false,
  };
  saveUsers([...users, newUser]);
  return { success: true, message: 'Registration successful! Please login.' };
}

export function loginUser(email: string, password: string): { success: boolean; message: string; user?: AuthUser } {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) return { success: false, message: 'No account found. Please register first.' };
  if (user.password !== password) return { success: false, message: 'Incorrect password. Please try again.' };
  const { password: _, ...authUser } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(authUser));
  return { success: true, message: `Welcome back, ${user.name}!`, user: authUser };
}

export function loginAdmin(email: string, password: string): { success: boolean; message: string } {
  if (email === 'admin@sociochat.com' && password === 'Admin@123') {
    const admin = {
      id: 'admin_001', name: 'Admin User', email, role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      bio: 'Platform Administrator', phone: '+1 9000000000', joinedAt: '2024-01-01', verified: true,
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(admin));
    return { success: true, message: 'Admin login successful!' };
  }
  return { success: false, message: 'Invalid admin credentials.' };
}

export function getCurrentUser(): AuthUser | null {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function updateUserProfile(updates: Partial<AuthUser>) {
  const current = getCurrentUser();
  if (!current) return;
  const updated = { ...current, ...updates };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updated));
  const users = getUsers();
  const idx = users.findIndex(u => u.id === current.id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...updates };
    saveUsers(users);
  }
}

export function getDashboardPath(role: string): string {
  switch (role) {
    case 'creator': return '/creator-dashboard';
    case 'community_admin': return '/community-admin';
    case 'admin': return '/admin';
    default: return '/dashboard';
  }
}
