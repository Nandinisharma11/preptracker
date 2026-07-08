import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, RefreshCw } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-[#05070F] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        
        {/* Visual design elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
        <div className="absolute top-[30%] left-[20%] w-[350px] h-[350px] bg-brand-indigo/10 blur-[130px] rounded-full animate-blob-slow pointer-events-none" />
        <div className="absolute bottom-[20%] right-[20%] w-[350px] h-[350px] bg-brand-purple/10 blur-[130px] rounded-full animate-blob-slower pointer-events-none" />

        <div className="relative z-10 text-center max-w-md">
          
          {/* Header Icon */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-brand-indigo via-brand-purple to-brand-cyan text-white shadow-neon-blue mb-8"
          >
            <Sparkles className="h-8 w-8 animate-spin" style={{ animationDuration: '6s' }} />
          </motion.div>

          {/* Typography */}
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-outfit text-7xl font-extrabold tracking-tight bg-gradient-to-r from-white via-brand-indigo to-brand-cyan bg-clip-text text-transparent mb-4"
          >
            404
          </motion.h1>

          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-outfit text-xl font-bold mb-3"
          >
            Lost in Code Space
          </motion.h2>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-10"
          >
            The algorithm path you are seeking does not exist. Check the address string or return to the active preparation metrics dashboard.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link 
              to="/dashboard" 
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-indigo to-brand-cyan hover:opacity-95 px-6 py-3.5 rounded-xl text-xs font-semibold shadow-neon-blue transition-all btn-premium"
            >
              <ArrowLeft className="h-4 w-4" />
              Go to Dashboard
            </Link>
            
            <Link 
              to="/" 
              className="flex items-center justify-center gap-2 border border-white/10 hover:bg-white/5 bg-white/5 px-6 py-3.5 rounded-xl text-xs font-semibold transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>

        </div>

      </div>
    </PageTransition>
  );
}
