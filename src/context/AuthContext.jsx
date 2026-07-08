import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USER = {
  name: 'Nandini',
  email: 'nansharma77@gmail.com',
  college: 'Stanford University',
  targetCompany: 'Google',
  targetRole: 'Software Engineer, L4',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  github: 'https://github.com/Nandinisharma11',
  linkedin: 'https://www.linkedin.com/in/nandiniii11/',
  leetcode: 'https://leetcode.com/Nandinisharma11',
  codeforces: 'https://codeforces.com/profile/Nandinisharma11',
  skills: ['React', 'Node.js', 'Go', 'Data Structures & Algorithms', 'System Design', 'C++', 'Python'],
  streak: 15,
  dailyGoal: 5,
  solvedCount: 142,
  totalCount: 250,
  achievements: [
    { id: '1', title: '14-Day Streak', icon: '🔥', desc: 'Solved questions for 14 days in a row' },
    { id: '2', title: 'DP Master', icon: '🧠', desc: 'Solved 20 Dynamic Programming questions' },
    { id: '3', title: 'Speed Demon', icon: '⚡', desc: 'Solved an Hard question in under 15 minutes' }
  ]
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('preptracker_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'Alex Mercer' || parsed.email === 'alex.mercer@devmail.com') {
          return DEFAULT_USER;
        }
        return parsed;
      } catch (e) {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem('preptracker_token');
    return !!token;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('preptracker_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('preptracker_user');
    }
  }, [user]);

  const login = (email, password) => {
    // Mock login verification
    if (email && password) {
      setIsAuthenticated(true);
      localStorage.setItem('preptracker_token', 'mock-jwt-token-xyz');
      // If user wasn't stored, restore default
      if (!user) {
        setUser(DEFAULT_USER);
      }
      return true;
    }
    return false;
  };

  const signup = (name, email, password) => {
    if (name && email && password) {
      const newUser = {
        ...DEFAULT_USER,
        name,
        email,
        streak: 0,
        solvedCount: 0,
        achievements: []
      };
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('preptracker_token', 'mock-jwt-token-xyz');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('preptracker_token');
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => ({
      ...prev,
      ...updatedFields
    }));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
