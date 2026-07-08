import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  User, 
  Settings, 
  ChevronDown, 
  MessageSquare,
  Calendar,
  Route,
  Target,
  FileText,
  Bookmark,
  Crown,
  X,
  Code2
} from 'lucide-react';

export default function Sidebar({ isCollapsed, setIsCollapsed, isOpen, setIsOpen }) {
  const { logout, user } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [showPromo, setShowPromo] = useState(true);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Questions', path: '/questions', icon: BookOpen },
    { name: 'Mock Interviews', path: '/mock-interviews', icon: MessageSquare },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Revision Planner', path: '/revision-planner', icon: Calendar },
    { name: 'Roadmap', path: '/roadmap', icon: Route },
    { name: 'Daily Goals', path: '/daily-goals', icon: Target },
    { name: 'Notes', path: '/notes', icon: FileText },
    { name: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col border-r transition-all duration-350
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isDark 
            ? 'bg-[#060814]/90 border-white/5 text-gray-200' 
            : 'bg-white/90 border-gray-200 text-gray-800'}
          backdrop-blur-xl`}
      >
        {/* Header / Logo */}
        <div className="flex h-16 items-center px-4 border-b border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-blue to-brand-indigo text-white shadow-neon-blue">
              <Code2 className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col text-left">
                <span className="font-outfit text-sm font-bold tracking-tight text-white">
                  PrepTracker
                </span>
                <span className="text-[10px] text-gray-500 font-medium tracking-wide leading-none mt-0.5">
                  Interview Prep
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 p-3 overflow-y-auto mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group text-xs font-medium
                ${isActive 
                  ? 'bg-gradient-to-r from-brand-indigo/15 to-transparent border-l-2 border-brand-blue text-white shadow-sm' 
                  : 'hover:bg-white/5 text-gray-400 hover:text-white'
                }
              `}
            >
              <item.icon className={`h-4.5 w-4.5 shrink-0 transition-transform group-hover:scale-110 duration-200`} />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Promotion Card */}
        {showPromo && !isCollapsed && (
          <div className="p-4 mx-3 mb-2 rounded-2xl bg-gradient-to-tr from-[#111327] to-[#1c1f3d] border border-white/5 relative overflow-hidden text-left shadow-lg">
            <button 
              onClick={() => setShowPromo(false)}
              className="absolute top-2.5 right-2.5 p-1 rounded-md text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500 mb-3 border border-yellow-500/20">
              <Crown className="h-4 w-4" />
            </div>
            <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
              Upgrade to Pro
            </h4>
            <p className="text-[10px] text-gray-400 leading-normal mb-3.5 pr-2">
              Unlock advanced analytics, unlimited mocks and more.
            </p>
            <button className="w-full py-2 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-blue hover:opacity-95 text-[10px] font-bold text-white shadow-md transition-all">
              Upgrade Now
            </button>
          </div>
        )}

        {/* User Footer Profile Card */}
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3 overflow-hidden">
              <img 
                src={user.avatarUrl} 
                alt="Nandini Sharma" 
                className="h-9 w-9 rounded-xl border border-white/10 object-cover shrink-0" 
              />
              {!isCollapsed && (
                <div className="text-left overflow-hidden">
                  <h4 className="text-xs font-semibold text-white truncate">Nandini Sharma</h4>
                  <p className="text-[9px] text-gray-500 truncate mt-0.5">B.Tech CSE</p>
                </div>
              )}
            </div>
            {!isCollapsed && <ChevronDown className="h-3.5 w-3.5 text-gray-500 group-hover:text-white transition-colors" />}
          </div>
        </div>

      </aside>
    </>
  );
}
