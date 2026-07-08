import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  Bell, 
  Search, 
  Menu, 
  User, 
  Settings, 
  LogOut,
  ChevronDown,
  Calendar,
  CheckCircle,
  Award
} from 'lucide-react';

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: 'Revision due today!',
      desc: 'Review "Merge k Sorted Lists" to lock it in your memory.',
      time: '2 hours ago',
      icon: Calendar,
      iconColor: 'text-brand-purple bg-brand-purple/10'
    },
    {
      id: 2,
      title: 'Streak extended!',
      desc: 'Congrats! You reached a 7-day solving streak.',
      time: '5 hours ago',
      icon: CheckCircle,
      iconColor: 'text-green-500 bg-green-500/10'
    },
    {
      id: 3,
      title: 'Achievement unlocked!',
      desc: 'Earned the "DP Master" badge for 20 DP questions.',
      time: '1 day ago',
      icon: Award,
      iconColor: 'text-brand-cyan bg-brand-cyan/10'
    }
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Dashboard';
    if (path.includes('questions')) return 'Questions';
    if (path.includes('analytics')) return 'Analytics';
    if (path.includes('profile')) return 'User Profile';
    if (path.includes('settings')) return 'Settings';
    return 'Overview';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between px-4 lg:px-8 border-b border-white/5 backdrop-blur-xl bg-[#060814]/75">
      {/* Hamburger & Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 text-gray-400 hover:bg-white/5 lg:hidden"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      {/* Right side controls */}
      <div className="flex-1 flex items-center justify-end gap-3 md:gap-5">
        
        {/* Ctrl+K Search Bar */}
        <div className="relative hidden md:block w-72 lg:w-96">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-3.5 w-3.5 text-gray-500" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, topics, companies..."
            className="w-full h-9 pl-9 pr-16 rounded-xl text-xs border border-white/5 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue/40 focus:ring-1 focus:ring-brand-blue/30 transition-all"
          />
          <kbd className="absolute inset-y-1.5 right-1.5 flex items-center px-2 rounded-lg border border-white/5 bg-white/5 text-[9px] text-gray-500 font-mono select-none pointer-events-none">
            Ctrl + K
          </kbd>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 hover:bg-white/5 transition-colors"
          aria-label="Toggle Theme"
        >
          {isDark ? <Moon className="h-4.5 w-4.5 text-gray-400" /> : <Sun className="h-4.5 w-4.5 text-yellow-500" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 hover:bg-white/5 transition-colors"
          >
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-purple text-[8px] font-bold text-white leading-none">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 md:w-96 rounded-2xl border border-white/5 bg-[#0b0f19] p-4 shadow-glass-dark backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <h3 className="font-outfit font-semibold text-white text-xs">Notifications</h3>
                <span className="text-[10px] font-medium text-brand-purple bg-brand-purple/10 px-2 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="mt-3 space-y-3 max-h-[300px] overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="flex gap-3 p-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${n.iconColor}`}>
                      <n.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-white truncate">{n.title}</h4>
                      <p className="text-[10px] text-gray-400 line-clamp-2 mt-0.5">{n.desc}</p>
                      <span className="text-[9px] text-gray-500 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center rounded-full border border-white/10 hover:bg-white/5 transition-all"
          >
            <img
              src={user.avatarUrl}
              alt="Nandini Sharma"
              className="h-8 w-8 rounded-full object-cover"
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-white/5 bg-[#0b0f19] p-1.5 shadow-glass-dark backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-3 py-2 border-b border-white/5 mb-1">
                <p className="text-[10px] text-gray-500">Signed in as</p>
                <p className="text-xs font-semibold text-white truncate">{user.email}</p>
              </div>
              <Link
                to="/profile"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs rounded-xl text-gray-400 hover:bg-white/5 transition-all"
              >
                <User className="h-4 w-4" />
                Profile Details
              </Link>
              <Link
                to="/settings"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs rounded-xl text-gray-400 hover:bg-white/5 transition-all"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
              <div className="h-[1px] bg-white/5 my-1" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-left"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
