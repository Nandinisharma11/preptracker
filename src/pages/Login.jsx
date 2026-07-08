import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    // Simulate Network Request
    setTimeout(() => {
      const success = login(email, password);
      setIsLoading(false);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password.');
      }
    }, 1000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#05070F] text-white flex font-sans relative overflow-hidden">
        
        {/* Visual Details */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] pointer-events-none" />
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-brand-indigo/10 blur-[120px] rounded-full animate-blob-slow pointer-events-none" />
        
        {/* Left Panel: Visual/Promo (hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-brand-indigo/10 via-brand-purple/5 to-transparent border-r border-white/5 relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-cyan text-white shadow-neon-blue">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-outfit text-xl font-bold tracking-tight bg-gradient-to-r from-white via-brand-indigo to-brand-cyan bg-clip-text text-transparent">
              PrepTracker
            </span>
          </Link>

          <div className="max-w-md">
            <h2 className="font-outfit text-4xl font-extrabold tracking-tight mb-6 leading-tight">
              Prepare like top tech engineering teams.
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-indigo/20 border border-brand-indigo/30 text-brand-indigo shrink-0">
                  <Flame className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Gamified solve consistency</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mt-1">Keep motivated by maintaining streaks and tracking statistics daily.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan shrink-0">
                  <Award className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Spaced Repetition algorithm</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mt-1">Review flagged questions at systematic intervals to master data structures.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} PrepTracker. All rights reserved.
          </div>
        </div>

        {/* Right Panel: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10">
          <div className="w-full max-w-md">
            
            {/* Mobile-only logo */}
            <div className="lg:hidden flex justify-center mb-8">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-indigo to-brand-cyan text-white shadow-neon-blue">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
                <span className="font-outfit font-bold tracking-tight text-white">
                  PrepTracker
                </span>
              </div>
            </div>

            <div className="mb-8 text-center lg:text-left">
              <h1 className="font-outfit text-3xl font-extrabold tracking-tight mb-2">Welcome Back</h1>
              <p className="text-sm text-gray-400">Continue coding consistency. Log in to track progress.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-500" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-12 pl-10 pr-4 rounded-xl border bg-white/5 border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-indigo/50 text-white placeholder-gray-500 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                  <span className="text-xs text-brand-cyan hover:underline cursor-pointer">Forgot password?</span>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-500" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-12 pl-10 pr-10 rounded-xl border bg-white/5 border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-indigo/50 text-white placeholder-gray-500 text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-white/10 bg-white/5 text-brand-indigo focus:ring-brand-indigo/50 cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-gray-400 cursor-pointer select-none">
                  Remember me for 30 days
                </label>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-cyan font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-neon-blue btn-premium disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-xs text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-brand-cyan hover:underline font-semibold">
                Sign up free
              </Link>
            </p>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
