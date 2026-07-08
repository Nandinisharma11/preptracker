import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [strengthScore, setStrengthScore] = useState(0);

  // Check password strength score out of 4
  useEffect(() => {
    let score = 0;
    if (!password) {
      setStrengthScore(0);
      return;
    }
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setStrengthScore(score);
  }, [password]);

  const getStrengthColor = () => {
    switch (strengthScore) {
      case 0: return 'bg-gray-700';
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-green-500 shadow-neon-blue';
      default: return 'bg-gray-700';
    }
  };

  const getStrengthText = () => {
    switch (strengthScore) {
      case 0: return 'None';
      case 1: return 'Weak (Requires digits/caps/symbols)';
      case 2: return 'Medium (Add upper & symbols)';
      case 3: return 'Strong';
      case 4: return 'Perfect';
      default: return 'None';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = signup(name, email, password);
      setIsLoading(false);
      if (success) {
        if (targetCompany) {
          // Update details with target company
          const userStr = localStorage.getItem('preptracker_user');
          if (userStr) {
            try {
              const u = JSON.parse(userStr);
              u.targetCompany = targetCompany;
              localStorage.setItem('preptracker_user', JSON.stringify(u));
            } catch (e) {
              console.error(e);
            }
          }
        }
        navigate('/dashboard');
      } else {
        setError('Registration failed. Try a different email.');
      }
    }, 1000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#05070F] text-white flex font-sans relative overflow-hidden">
        
        {/* Design Blobs */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.1] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-brand-purple/10 blur-[120px] rounded-full animate-blob-slow pointer-events-none" />

        {/* Left Panel: Info (hidden on mobile) */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-brand-purple/10 via-brand-indigo/5 to-transparent border-r border-white/5 relative z-10">
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
              Build resume-worthy interview habits.
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-purple/20 border border-brand-purple/30 text-brand-purple shrink-0">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Targeted analytics dashboard</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mt-1">Spot weak algorithmic tags early and target practice structures efficiently.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan shrink-0">
                  <Building className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Big Tech alignment goals</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mt-1">Compare your statistics against hiring criteria of tier-1 companies.</p>
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
            
            {/* Mobile Logo */}
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
              <h1 className="font-outfit text-3xl font-extrabold tracking-tight mb-2">Create Account</h1>
              <p className="text-sm text-gray-400">Join thousands of software engineers leveling up DSA.</p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-500 text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Full Name <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <User className="h-4 w-4 text-gray-500" />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Mercer"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border bg-white/5 border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-indigo/50 text-white placeholder-gray-505 text-sm transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email Address <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-500" />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@gmail.com"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border bg-white/5 border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-indigo/50 text-white placeholder-gray-505 text-sm transition-all"
                    required
                  />
                </div>
              </div>

              {/* Target Company */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Target Company (Optional)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Building className="h-4 w-4 text-gray-500" />
                  </span>
                  <input
                    type="text"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    placeholder="e.g. Google, Apple"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border bg-white/5 border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-indigo/50 text-white placeholder-gray-505 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Password <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-500" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 pl-10 pr-10 rounded-xl border bg-white/5 border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-indigo/50 text-white placeholder-gray-505 text-sm transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {password && (
                  <div className="mt-3">
                    <div className="flex h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${(strengthScore / 4) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] text-gray-400">Password Strength:</span>
                      <span className="text-[10px] font-bold text-gray-300">{getStrengthText()}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 mt-4 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-neon-purple btn-premium disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <>
                    Sign Up Free
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-cyan hover:underline font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
