import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Target, 
  BarChart3, 
  Zap, 
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Lock,
  Globe,
  Shuffle
} from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const features = [
    {
      icon: Target,
      title: 'Structured Spaced Repetition',
      desc: 'Smart revision scheduling based on active forgetting curves to lock algorithms in memory.',
      color: 'from-blue-500 to-indigo-500',
      badge: 'Scientific'
    },
    {
      icon: Flame,
      title: 'Daily Streak Gamification',
      desc: 'Keep motivated with streak tracking, leveling up, and earning premium profile achievements.',
      color: 'from-orange-500 to-red-500',
      badge: 'Popular'
    },
    {
      icon: BarChart3,
      title: 'Deep Analytics Engine',
      desc: 'Visualize topic distributions, weekly solve consistency, and platform strengths instantly.',
      color: 'from-purple-500 to-pink-500',
      badge: 'Advanced'
    },
    {
      icon: Shuffle,
      title: 'Multi-Platform Integration',
      desc: 'Track problems from LeetCode, HackerRank, Codeforces, and custom coding platforms seamlessly.',
      color: 'from-cyan-500 to-teal-500',
      badge: 'Seamless'
    }
  ];

  const roadmaps = [
    { step: '01', title: 'Curate your target syllabus', desc: 'Define your language, topic weaknesses, and target companies.' },
    { step: '02', title: 'Solve & Log Daily', desc: 'Code solutions on external platforms and catalog your tags, complexity, and tricky edge-cases.' },
    { step: '03', title: 'Automated Reminders', desc: 'Trackers prompt review lists at 1-day, 3-day, and 7-day intervals dynamically.' },
    { step: '04', title: 'Unlock Offers', desc: 'Enter interview loops with complete structural clarity and zero algorithmic rust.' }
  ];

  const testimonials = [
    {
      quote: "PrepTracker transformed my DSA prep. The spaced repetition layout made sure I didn't forget graph patterns by the time I hit my final loops. Landed L5 at Meta!",
      author: "Sarah Jenkins",
      role: "Senior Software Engineer",
      company: "Meta",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
    },
    {
      quote: "The interface alone motivated me to code every day. Having analytics of where my weaknesses lay (graphs & DP) helped me direct my final study sprint.",
      author: "David Chen",
      role: "Graduate SWE",
      company: "Google",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
    }
  ];

  const faqs = [
    { q: "How does spaced repetition work in PrepTracker?", a: "When you log a solved question, you specify its status and next revision date. Based on your review status, the system calculates forgetting curves and warns you in the notifications dropdown when a key question is due for a refresher." },
    { q: "Can I sync Leetcode questions directly?", a: "Yes, you can paste the URLs of any LeetCode, HackerRank, or Codeforces questions. The app automatically groups and saves them in local storage under specific filter tags." },
    { q: "Is PrepTracker completely free to use?", a: "Our core tracker, progress widgets, revision calendars, and analytics dashboards are 100% free and client-persistent, making it a perfect tool to demo on your portfolio." }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#05070F] text-white relative overflow-hidden font-sans">
        
        {/* Decorative Grid and Background Blobs */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-indigo/10 blur-[150px] rounded-full animate-blob-slow pointer-events-none" />
        <div className="absolute top-[30%] right-10 w-[450px] h-[450px] bg-brand-purple/10 blur-[150px] rounded-full animate-blob-slower pointer-events-none" />

        {/* Global Landing Navbar */}
        <nav className="relative z-10 flex h-20 items-center justify-between px-6 lg:px-16 max-w-7xl mx-auto border-b border-white/5 backdrop-blur-md bg-transparent">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-cyan text-white shadow-neon-blue">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-outfit text-xl font-bold tracking-tight bg-gradient-to-r from-white via-brand-indigo to-brand-cyan bg-clip-text text-transparent">
              PrepTracker
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Log in
            </Link>
            <Link to="/signup" className="flex items-center gap-1.5 bg-gradient-to-r from-brand-indigo to-brand-purple hover:opacity-90 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-neon-purple btn-premium">
              Sign up free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 lg:pt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-brand-cyan tracking-wide mb-6"
          >
            <Zap className="h-3.5 w-3.5 fill-brand-cyan" />
            THE ULTIMATE DSA TRACKER FOR SOFTWARE ENGINEERS
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-outfit text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.1] mb-8"
          >
            Master DSA with{' '}
            <span className="bg-gradient-to-r from-brand-blue via-brand-indigo to-brand-cyan bg-clip-text text-transparent">
              Structured Analytics
            </span>{' '}
            & Spaced Repetition.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10"
          >
            Stop solving questions randomly. Catalog your coding solutions, schedule smart revision paths, analyze algorithmic patterns, and build mock portfolios to show interviewers.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <Link to="/signup" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-brand-indigo to-brand-cyan hover:opacity-90 px-8 py-4 rounded-2xl text-base font-bold transition-all shadow-neon-blue btn-premium">
              Get Started for Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 border border-white/10 hover:bg-white/5 bg-white/5 px-8 py-4 rounded-2xl text-base font-bold transition-all">
              Go to Dashboard
            </Link>
          </motion.div>

          {/* Premium Floating Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-5xl mx-auto rounded-3xl border border-white/10 bg-dark-card p-2 shadow-glass-dark backdrop-blur-md"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo/10 to-brand-purple/10 rounded-3xl pointer-events-none" />
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-gray-500 ml-4 font-mono">dashboard.preptracker.dev</span>
            </div>
            
            {/* Mock screenshot representation inside CSS */}
            <div className="bg-[#0b0e1b] rounded-2xl p-6 text-left aspect-video overflow-hidden relative">
              {/* Header inside mock */}
              <div className="flex justify-between items-center mb-6">
                <div className="h-6 w-32 bg-white/5 rounded-lg" />
                <div className="flex gap-2">
                  <div className="h-8 w-8 bg-white/5 rounded-lg" />
                  <div className="h-8 w-24 bg-brand-indigo/20 rounded-lg border border-brand-indigo/30" />
                </div>
              </div>
              
              {/* Mini dashboard grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="h-24 bg-white/5 rounded-xl border border-white/5 p-3 flex flex-col justify-between">
                  <div className="h-3 w-16 bg-gray-600 rounded" />
                  <div className="h-6 w-10 bg-white rounded" />
                </div>
                <div className="h-24 bg-white/5 rounded-xl border border-white/5 p-3 flex flex-col justify-between">
                  <div className="h-3 w-16 bg-gray-600 rounded" />
                  <div className="h-6 w-10 bg-brand-cyan rounded" />
                </div>
                <div className="h-24 bg-white/5 rounded-xl border border-white/5 p-3 flex flex-col justify-between">
                  <div className="h-3 w-20 bg-gray-600 rounded" />
                  <div className="h-6 w-14 bg-brand-purple rounded" />
                </div>
              </div>
              
              {/* Chart mock block */}
              <div className="h-40 bg-white/5 rounded-xl border border-white/5 p-4 flex items-end gap-3 justify-around">
                <div className="h-[40%] w-[10%] bg-brand-indigo/30 rounded-t" />
                <div className="h-[60%] w-[10%] bg-brand-indigo/30 rounded-t" />
                <div className="h-[50%] w-[10%] bg-brand-indigo/30 rounded-t" />
                <div className="h-[75%] w-[10%] bg-brand-indigo/50 rounded-t" />
                <div className="h-[90%] w-[10%] bg-gradient-to-t from-brand-indigo to-brand-cyan rounded-t" />
              </div>
              
              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e1b] via-[#0b0e1b]/40 to-transparent flex items-center justify-center">
                <div className="flex gap-4">
                  <div className="px-4 py-2.5 rounded-full bg-black/60 border border-white/10 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    142 Solved Questions
                  </div>
                  <div className="px-4 py-2.5 rounded-full bg-black/60 border border-white/10 text-xs font-semibold flex items-center gap-2">
                    <Flame className="h-4 w-4 text-orange-500 fill-orange-500" />
                    15 Day Active Streak
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Company Logos */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-white/5">
          <p className="text-center text-xs font-semibold tracking-wider text-gray-500 mb-8 uppercase">
            Prep Tracker Alums Work At World-Class Engineering Teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all">
            <span className="font-outfit text-xl font-bold font-mono tracking-widest">GOOGLE</span>
            <span className="font-outfit text-xl font-bold font-mono tracking-widest">META</span>
            <span className="font-outfit text-xl font-bold font-mono tracking-widest">AMAZON</span>
            <span className="font-outfit text-xl font-bold font-mono tracking-widest">NETFLIX</span>
            <span className="font-outfit text-xl font-bold font-mono tracking-widest">APPLE</span>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Everything you need to master algorithmic interviews.
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Designed specifically for software engineering candidate workflows. Avoid spreadsheets and build consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div 
                key={i} 
                className="glass-card hover:-translate-y-2 border border-white/5 p-6 rounded-3xl hover:border-brand-indigo/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className={`p-3 rounded-2xl bg-gradient-to-tr ${f.color} text-white`}>
                      <f.icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400 px-2.5 py-1 bg-white/5 rounded-full border border-white/10">
                      {f.badge}
                    </span>
                  </div>
                  <h3 className="font-outfit text-lg font-bold mb-2 group-hover:text-brand-cyan transition-colors">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interview Roadmap Timeline */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <h2 className="font-outfit text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-4">
                Your Road to Big Tech, Structured.
              </h2>
              <p className="text-gray-400 text-sm sm:text-base mb-6 leading-relaxed">
                Interviews are a game of pattern recognition. We help you systematically tag and revisit algorithms so you walk in with complete problem-solving familiarity.
              </p>
              <div className="flex gap-4 items-center">
                <div className="flex -space-x-3">
                  <img className="h-8 w-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50" alt="" />
                  <img className="h-8 w-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50" alt="" />
                  <img className="h-8 w-8 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=50" alt="" />
                </div>
                <span className="text-xs font-semibold text-gray-300">Used by 4,000+ candidates</span>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {roadmaps.map((r, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden flex gap-4">
                  <span className="font-outfit text-3xl font-extrabold text-brand-indigo/35 shrink-0 select-none">
                    {r.step}
                  </span>
                  <div>
                    <h3 className="font-outfit text-base font-bold mb-1.5">{r.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-outfit text-3xl font-bold tracking-tight mb-4">Loved by candidates who crushed their interviews</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/5 flex flex-col justify-between shadow-glass-light relative">
                <p className="text-gray-300 italic text-base leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.author} className="h-10 w-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-outfit text-sm font-bold">{t.author}</h4>
                    <p className="text-xs text-gray-500">{t.role} @ <span className="text-brand-indigo font-semibold">{t.company}</span></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="relative z-10 max-w-3xl mx-auto px-6 py-24 border-t border-white/5">
          <h2 className="font-outfit text-3xl font-bold tracking-tight text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/10 transition-colors"
                >
                  <span className="font-outfit font-semibold text-sm sm:text-base flex items-center gap-2.5">
                    <HelpCircle className="h-4.5 w-4.5 text-brand-cyan shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`h-4.5 w-4.5 text-gray-400 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} />
                </button>
                
                {activeFaq === index && (
                  <div className="p-6 pt-0 border-t border-white/5 text-gray-400 text-xs sm:text-sm leading-relaxed animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-tr from-brand-indigo/20 via-brand-purple/10 to-brand-cyan/5 p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            
            <h2 className="font-outfit text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Crush your next algorithmic interview.
            </h2>
            <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
              Create your account now to log questions, track revision dates, visualize metrics, and build confidence. No card required.
            </p>
            
            <Link to="/signup" className="inline-flex items-center gap-2 bg-white text-[#05070F] hover:bg-white/90 px-8 py-4 rounded-2xl text-base font-bold transition-all btn-premium shadow-lg">
              Start Tracking Now
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/5 bg-[#03050b] py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-brand-indigo to-brand-cyan text-white">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <span className="font-outfit font-bold tracking-tight text-white text-sm">
                PrepTracker
              </span>
            </div>
            
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} PrepTracker. Built for high-performance software engineering preparation.
            </p>
            
            <div className="flex gap-4">
              <span className="text-xs text-gray-500 hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="text-xs text-gray-500 hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
}
