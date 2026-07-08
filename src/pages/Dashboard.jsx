import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useQuestions } from '../hooks/useQuestions';
import { useTheme } from '../context/ThemeContext';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Flame, 
  Target, 
  FileText, 
  CheckCircle2, 
  Plus, 
  ArrowRight,
  Computer,
  Calendar,
  BarChart3,
  ChevronDown
} from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function Dashboard() {
  const { user } = useAuth();
  const { questions } = useQuestions();
  const { isDark } = useTheme();

  // Streak sparkline data
  const sparklineData = [
    { value: 1.5 },
    { value: 3.0 },
    { value: 2.2 },
    { value: 4.8 },
    { value: 3.5 },
    { value: 6.2 },
    { value: 7.0 }
  ];

  // Weekly solving data
  const weeklyData = [
    { name: 'Mon', count: 20 },
    { name: 'Tue', count: 42 },
    { name: 'Wed', count: 28 },
    { name: 'Thu', count: 48 },
    { name: 'Fri', count: 62 },
    { name: 'Sat', count: 58 },
    { name: 'Sun', count: 80 }
  ];

  // Topic donut data
  const topicData = [
    { name: 'Data Structures', value: 28, color: '#3B82F6' },
    { name: 'Algorithms', value: 24, color: '#6366F1' },
    { name: 'Dynamic Prog.', value: 16, color: '#EC4899' },
    { name: 'Graphs', value: 14, color: '#F97316' },
    { name: 'System Design', value: 10, color: '#06B6D4' },
    { name: 'Others', value: 8, color: '#10B981' }
  ];

  // Circular progress calculations for accuracy ring
  const accuracyRadius = 50;
  const accuracyCircumference = 2 * Math.PI * accuracyRadius;
  const accuracyStrokeOffset = accuracyCircumference - (71.5 / 100) * accuracyCircumference;

  return (
    <PageTransition>
      <div className="space-y-6 text-left">
        
        {/* Header Greeting & Streak Card */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="font-outfit text-2xl font-bold md:text-3xl text-white flex items-center gap-2">
              Welcome back, Nandini! 👋
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Let's crush your interview goals today.
            </p>
          </div>

          {/* 7-Day Streak Card */}
          <div className="flex items-center justify-between gap-6 px-5 py-3 rounded-2xl border border-white/5 bg-[#121528] shrink-0 shadow-lg min-w-[280px]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
                <Flame className="h-5.5 w-5.5 fill-orange-500/20" />
              </div>
              <div className="text-left">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-outfit text-2xl font-extrabold text-white">7</span>
                  <span className="text-[10px] font-bold text-white">Day Streak</span>
                </div>
                <p className="text-[9px] text-gray-500 font-medium">Keep it up!</p>
              </div>
            </div>
            {/* Embedded neon sparkline */}
            <div className="w-20 h-10 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparklineData}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#6366F1" 
                    strokeWidth={2} 
                    dot={false} 
                    shadow="0 0 10px rgba(99, 102, 241, 0.5)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 5 Stats Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          
          {/* Card 1: Total Questions */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#0e1124] text-left relative overflow-hidden group shadow-lg flex flex-col justify-between h-32">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Total Questions</span>
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/15">
                <FileText className="h-4.5 w-4.5" />
              </div>
            </div>
            <div>
              <h3 className="font-outfit text-2xl font-black text-white">1,248</h3>
              <p className="text-[9px] text-brand-blue font-bold mt-1">+12 this week</p>
            </div>
          </div>

          {/* Card 2: Questions Solved */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#0e1124] text-left relative overflow-hidden group shadow-lg flex flex-col justify-between h-32">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Questions Solved</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/15">
                <CheckCircle2 className="h-4.5 w-4.5" />
              </div>
            </div>
            <div>
              <h3 className="font-outfit text-2xl font-black text-white">892</h3>
              <p className="text-[9px] text-emerald-400 font-bold mt-1 flex items-center gap-1">
                <span>71.5% accuracy</span>
                <span className="h-3 w-3 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[7px]">✓</span>
              </p>
            </div>
          </div>

          {/* Card 3: Easy */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#0e1124] text-left relative overflow-hidden group shadow-lg flex flex-col justify-between h-32">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Easy</span>
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500 border border-purple-500/15">
                <span className="text-[10px] font-bold">E</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="font-outfit text-2xl font-black text-white">214</h3>
                <p className="text-[9px] text-gray-500 font-medium mt-1">Solved</p>
              </div>
              {/* Micro bar visualizer */}
              <div className="flex items-end gap-0.5 h-6 text-purple-500">
                <span className="h-2 w-1 bg-current opacity-40 rounded-t-sm" />
                <span className="h-3 w-1 bg-current opacity-60 rounded-t-sm" />
                <span className="h-5.5 w-1 bg-current rounded-t-sm animate-pulse" />
              </div>
            </div>
          </div>

          {/* Card 4: Medium */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#0e1124] text-left relative overflow-hidden group shadow-lg flex flex-col justify-between h-32">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Medium</span>
              <div className="p-2 rounded-lg bg-yellow-500/10 text-yellow-500 border border-yellow-500/15">
                <span className="text-[10px] font-bold">M</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="font-outfit text-2xl font-black text-white">512</h3>
                <p className="text-[9px] text-gray-500 font-medium mt-1">Solved</p>
              </div>
              {/* Micro line visualizer */}
              <div className="w-8 h-4 shrink-0 text-yellow-500">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[{v:1},{v:2},{v:1.5},{v:3}]}>
                    <Line type="monotone" dataKey="v" stroke="currentColor" strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Card 5: Hard */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#0e1124] text-left relative overflow-hidden group shadow-lg flex flex-col justify-between h-32">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Hard</span>
              <div className="p-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/15">
                <span className="text-[10px] font-bold">H</span>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h3 className="font-outfit text-2xl font-black text-white">166</h3>
                <p className="text-[9px] text-gray-500 font-medium mt-1">Solved</p>
              </div>
              {/* Mini target concentric rings */}
              <div className="h-5 w-5 rounded-full border-4 border-red-500/20 flex items-center justify-center shrink-0">
                <div className="h-2 w-2 rounded-full bg-red-500" />
              </div>
            </div>
          </div>

        </div>

        {/* 3 Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Chart 1: Weekly Progress */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#0e1124] flex flex-col justify-between min-h-[340px]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-outfit font-bold text-white text-sm">Weekly Progress</h3>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/5 bg-white/5 text-[9px] text-gray-400 font-semibold hover:text-white transition-colors">
                This Week
                <ChevronDown className="h-3 w-3" />
              </button>
            </div>
            
            <div className="flex-1 min-h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
                  <defs>
                    <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#475569" fontSize={9} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={9} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0b0f19', 
                      borderColor: 'rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '11px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#3B82F6" 
                    strokeWidth={2.5} 
                    fillOpacity={1} 
                    fill="url(#blueGlow)" 
                    dot={{ fill: '#3B82F6', strokeWidth: 1 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Topic Distribution Donut */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#0e1124] flex flex-col justify-between min-h-[340px]">
            <div>
              <h3 className="font-outfit font-bold text-white text-sm">Topic Distribution</h3>
            </div>
            
            <div className="flex-1 flex items-center justify-between gap-4 mt-2">
              {/* Donut wheel */}
              <div className="relative h-36 w-36 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topicData}
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={65}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {topicData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-base font-black text-white leading-none">1,248</span>
                  <span className="text-[8px] text-gray-500 font-semibold tracking-wider uppercase mt-0.5">Total</span>
                </div>
              </div>

              {/* Legends list */}
              <div className="flex-1 space-y-1.5 max-w-[130px]">
                {topicData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[10px] gap-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-400 truncate">{item.name}</span>
                    </div>
                    <span className="font-bold text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chart 3: Accuracy circular progress ring */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#0e1124] flex flex-col justify-between min-h-[340px]">
            <div>
              <h3 className="font-outfit font-bold text-white text-sm">Accuracy Rate</h3>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center py-4">
              {/* Custom SVG Circular Progress */}
              <div className="relative h-36 w-36">
                <svg className="h-full w-full transform -rotate-90">
                  {/* Track ring */}
                  <circle
                    cx="72"
                    cy="72"
                    r={accuracyRadius}
                    className="stroke-[#1e293b]"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  {/* Active progress ring */}
                  <circle
                    cx="72"
                    cy="72"
                    r={accuracyRadius}
                    className="stroke-emerald-400"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={accuracyCircumference}
                    strokeDashoffset={accuracyStrokeOffset}
                    strokeLinecap="round"
                  />
                </svg>
                
                {/* Accuracy ring label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-outfit text-lg font-black text-white leading-none">71.5%</span>
                  <span className="text-[8px] text-emerald-400 font-bold tracking-wide mt-1">Great Job!</span>
                </div>
              </div>

              {/* Subtext info */}
              <p className="text-[10px] font-bold text-emerald-400 mt-4 flex items-center gap-1">
                <span>↗ +8.2%</span>
                <span className="text-gray-500 font-normal">from last week</span>
              </p>
            </div>
          </div>

        </div>

        {/* Lists & Actions row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Revisions list */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#0e1124] flex flex-col justify-between h-[300px]">
            <div>
              <h3 className="font-outfit font-bold text-white text-sm mb-4">Upcoming Revisions</h3>
              <div className="space-y-3.5">
                {[
                  { tag: 'Graph: Topological Sort', diff: 'Hard', date: 'May 26, 2024', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
                  { tag: 'Dynamic Programming', diff: 'Medium', date: 'May 27, 2024', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
                  { tag: 'Binary Search Tree', diff: 'Easy', date: 'May 28, 2024', color: 'bg-green-500/10 text-green-500 border-green-500/20' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs gap-3">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-white truncate text-[11px]">{item.tag}</h4>
                      <span className={`inline-flex items-center px-1.5 py-0.2 mt-1 rounded text-[8px] font-bold border ${item.color}`}>
                        {item.diff}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500 shrink-0 font-medium font-mono">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Link 
              to="/questions" 
              className="text-[10px] font-bold text-brand-blue flex items-center gap-1 mt-4 hover:translate-x-1 duration-200"
            >
              View All Revisions
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Recent solves feed */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#0e1124] flex flex-col justify-between h-[300px]">
            <div>
              <h3 className="font-outfit font-bold text-white text-sm mb-4">Recent Activity</h3>
              <div className="space-y-3.5">
                {[
                  { desc: 'Solved "LRU Cache Implementation"', diff: 'Hard', time: '2h ago', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
                  { desc: 'Added new question on Arrays', diff: 'Medium', time: '5h ago', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
                  { desc: 'Updated notes for "Dijkstra Algorithm"', diff: 'Hard', time: '1d ago', color: 'bg-red-500/10 text-red-500 border-red-500/20' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs gap-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-white truncate text-[11px] leading-relaxed">{item.desc}</h4>
                      <span className={`inline-flex items-center px-1.5 py-0.2 mt-0.5 rounded text-[8px] font-bold border ${item.color}`}>
                        {item.diff}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500 shrink-0 font-medium">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Link 
              to="/analytics" 
              className="text-[10px] font-bold text-brand-blue flex items-center gap-1 mt-4 hover:translate-x-1 duration-200"
            >
              View All Activity
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Quick Actions Panel */}
          <div className="p-5 rounded-2xl border border-white/5 bg-[#0e1124] flex flex-col justify-between h-[300px]">
            <div>
              <h3 className="font-outfit font-bold text-white text-sm mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-3.5">
                {/* Action 1: Add Question */}
                <Link 
                  to="/questions"
                  className="p-3.5 rounded-xl border border-blue-500/15 bg-blue-500/5 hover:bg-blue-500/10 text-left transition-colors flex flex-col justify-between h-20 relative group"
                >
                  <Plus className="h-4.5 w-4.5 text-blue-500" />
                  <span className="text-[10px] font-bold text-white">Add Question</span>
                </Link>

                {/* Action 2: Start Mock */}
                <button 
                  className="p-3.5 rounded-xl border border-emerald-500/15 bg-emerald-500/5 hover:bg-emerald-500/10 text-left transition-colors flex flex-col justify-between h-20 relative group"
                >
                  <Computer className="h-4.5 w-4.5 text-emerald-500" />
                  <span className="text-[10px] font-bold text-white">Start Mock</span>
                </button>

                {/* Action 3: Revision Planner */}
                <button 
                  className="p-3.5 rounded-xl border border-purple-500/15 bg-purple-500/5 hover:bg-purple-500/10 text-left transition-colors flex flex-col justify-between h-20 relative group"
                >
                  <Calendar className="h-4.5 w-4.5 text-purple-500" />
                  <span className="text-[10px] font-bold text-white">Revision Planner</span>
                </button>

                {/* Action 4: View Analytics */}
                <Link 
                  to="/analytics"
                  className="p-3.5 rounded-xl border border-yellow-500/15 bg-yellow-500/5 hover:bg-yellow-500/10 text-left transition-colors flex flex-col justify-between h-20 relative group"
                >
                  <BarChart3 className="h-4.5 w-4.5 text-yellow-500" />
                  <span className="text-[10px] font-bold text-white">View Analytics</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="relative rounded-2xl border border-white/5 bg-gradient-to-r from-brand-indigo/35 via-[#0e1124] to-[#121528] p-6 overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          {/* Trophy & Texts */}
          <div className="flex items-center gap-4 text-center sm:text-left z-10">
            <span className="text-4xl shrink-0 select-none">🏆</span>
            <div>
              <h3 className="font-outfit text-sm sm:text-base font-bold text-white">
                You're doing amazing, Nandini! 🎉
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-1 leading-normal font-light">
                Consistency is the key to success. Keep going!
              </p>
            </div>
          </div>

          {/* Custom vector climber illustration */}
          <div className="w-48 h-20 shrink-0 opacity-80 sm:opacity-100 z-0">
            <svg viewBox="0 0 200 80" className="w-full h-full text-brand-indigo fill-current">
              <defs>
                <linearGradient id="mountGlow" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.6}/>
                  <stop offset="100%" stopColor="#06B6D4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              {/* Star dots */}
              <circle cx="20" cy="15" r="0.8" fill="#fff" opacity="0.5" />
              <circle cx="50" cy="25" r="0.8" fill="#fff" opacity="0.3" />
              <circle cx="150" cy="10" r="0.8" fill="#fff" opacity="0.6" />
              <circle cx="180" cy="30" r="0.8" fill="#fff" opacity="0.4" />
              {/* Mountains */}
              <path d="M 0 80 L 70 30 L 120 60 L 160 20 L 200 80 Z" fill="url(#mountGlow)" />
              {/* Climber route dotted line */}
              <path d="M 30 75 Q 60 70 70 50 Q 80 30 110 38 Q 140 45 158 24" fill="none" stroke="#06B6D4" strokeWidth="1" strokeDasharray="3,3" />
              {/* flag */}
              <line x1="160" y1="20" x2="160" y2="10" stroke="#06B6D4" strokeWidth="1.5" />
              <polygon points="160,10 172,13 160,16" fill="#06B6D4" />
              {/* climber icon */}
              <circle cx="110" cy="38" r="2.5" fill="#3B82F6" />
              <line x1="110" y1="38" x2="108" y2="44" stroke="#3B82F6" strokeWidth="1" />
            </svg>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
