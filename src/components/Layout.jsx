import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
  const { isAuthenticated } = useAuth();
  const { isDark } = useTheme();
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // If not authenticated, redirect to Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`min-h-screen font-sans flex transition-colors duration-300 ${isDark ? 'bg-mesh-dark text-white' : 'bg-mesh-light text-gray-900'}`}>
      
      {/* Background blobs for dark mode premium visual depth */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[20%] left-[10%] h-[350px] w-[350px] rounded-full bg-brand-indigo/5 blur-[120px] animate-blob-slow" />
          <div className="absolute bottom-[30%] right-[10%] h-[400px] w-[400px] rounded-full bg-brand-purple/5 blur-[150px] animate-blob-slower" />
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed}
        isOpen={isMobileSidebarOpen}
        setIsOpen={setIsMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 z-10 transition-all duration-300 
        ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}
      >
        <Navbar onMenuClick={() => setIsMobileSidebarOpen(true)} />
        
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
