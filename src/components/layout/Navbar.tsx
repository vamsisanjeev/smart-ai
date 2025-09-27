import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Moon, Sun, Menu, X, User, Sparkles } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { label: 'Trip Planner', href: '/trip-planner' },
    { label: 'Budget Estimator', href: '/budget-estimator' },
    { label: 'Group Tracking', href: '/group-tracking' },
    { label: 'Shop', href: '/shop' },
    { label: 'Safety', href: '/safety' },
    { label: 'Contact', href: '/contact' }
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-gray-800/50 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <Compass className="h-10 w-10 text-primary-500" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-primary-500/20 blur-md"
                />
              </motion.div>
              <span className="font-display font-bold text-2xl bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Smart Travel Guide
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.div 
                key={item.label} 
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.href}
                  className={`relative px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
                    isActive(item.href)
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/10'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.div
                      className="absolute -bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                      layoutId="activeTab"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ rotate: 180, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-800/70 shadow-lg"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.button>
            
            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <User className="h-4 w-4 text-white" />
                  </motion.div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                </div>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button glow>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 shadow-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-6 space-y-2 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-2xl mt-4 border border-white/20 dark:border-gray-800/50">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`block px-4 py-3 mx-2 rounded-xl transition-all duration-300 font-medium ${
                  isActive(item.href)
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-700/50 space-y-2 px-2">
              {user ? (
                <>
                  <div className="flex items-center space-x-3 px-2 py-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center shadow-lg">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {user.name}
                    </span>
                  </div>
                  <Button variant="ghost" className="w-full" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full" glow>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};