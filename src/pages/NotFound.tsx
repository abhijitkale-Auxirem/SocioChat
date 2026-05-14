import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070b18]">
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center px-4">
        <div className="text-8xl font-black gradient-text font-['Space_Grotesk'] mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-4 font-['Space_Grotesk']">Page Not Found</h1>
        <p className="text-gray-400 mb-8 max-w-md">The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 gradient-primary text-white font-semibold rounded-2xl text-lg shadow-xl shadow-indigo-500/30 hover:scale-105 transition-all duration-300">
          <Home className="w-5 h-5" /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
