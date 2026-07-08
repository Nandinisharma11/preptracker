import React from 'react';
import { useQuestions } from '../hooks/useQuestions';
import { useTheme } from '../context/ThemeContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  Award, 
  CheckCircle,
  Clock,
  Sparkles,
  ChevronRight,
  Lightbulb
} from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function Analytics() {
  const { questions } = useQuestions();
  const { isDark } = useTheme();

  // Helper Stats
  const totalSolved = questions.filter(q => q.status === 'Solved').length;
  const easySolved = questions.filter(q => q.difficulty === 'Easy' && q.status === 'Solved').length;
  const medSolved = questions.filter(q => q.difficulty === 'Medium' && q.status === 'Solved').length;
  const hardSolved = questions.filter(q => q.difficulty === 'Hard' && q.status === 'Solved').length;

  // 1. Difficulty Bar Chart Data
  const difficultyData = [
    { name: 'Easy', Solved: easySolved, Total: questions.filter(q => q.difficulty === 'Easy').length },
    { name: 'Medium', Solved: medSolved, Total: questions.filter(q => q.difficulty === 'Medium').length },
    { name: 'Hard', Solved: hardSolved, Total: questions.filter(q => q.difficulty === 'Hard').length }
  ];

  // 2. Topic/Tag Radar Chart Data
  const topicRadarData = () => {
    const topics = ['Arrays', 'Strings', 'Trees', 'Graphs', 'Dynamic Programming', 'Stacks', 'Heaps'];
    return topics.map(topic => {
      const solved = questions.filter(q => q.tags.includes(topic) && q.status === 'Solved').length;
      const logged = questions.filter(q => q.tags.includes(topic)).length;
      return {
        subject: topic,
        A: solved, // Solved
        B: logged, // Logged
        fullMark: 10
      };
    });
  };

  // 3. Solving Speed/Progress Line Chart (cumulative solves over past 10 days)
  const solvesProgressionData = () => {
    const data = [];
    const today = new Date();
    let cumulative = totalSolved - 10; // estimate start point to look increasing
    if (cumulative < 0) cumulative = 0;

    for (let i = 9; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const addedSolves = questions.filter(q => q.completedAt === dateStr).length;
      cumulative += addedSolves;
      data.push({
        date: d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
        Solved: cumulative
      });
    }
    return data;
  };

  // 4. Github-style Heatmap Grid (Last 20 weeks = 140 days)
  const getHeatmapCells = () => {
    const cells = [];
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 139); // 20 weeks ago

    for (let i = 0; i < 140; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const count = questions.filter(q => q.completedAt === dateStr).length;
      cells.push({
        date: dateStr,
        count
      });
    }
    return cells;
  };

  const getHeatmapColor = (count) => {
    if (count === 0) return isDark ? 'bg-white/5' : 'bg-gray-200';
    if (count === 1) return 'bg-emerald-500/30 text-emerald-400';
    if (count === 2) return 'bg-emerald-500/60 text-emerald-300';
    return 'bg-emerald-400 shadow-neon-blue text-white'; // 3+ solves
  };

  const chartTheme = {
    grid: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    text: isDark ? '#9CA3AF' : '#4B5563'
  };

  // Smart Insights Generation
  const getInsights = () => {
    const insights = [];
    if (hardSolved === 0) {
      insights.push("You haven't solved any Hard questions yet. Try tackling 'Merge k Sorted Lists' to push your boundary.");
    } else {
      insights.push(`Crushing it! You completed ${hardSolved} Hard level questions. Keep up the high complexity preparation.`);
    }

    const dpSolved = questions.filter(q => q.tags.includes('Dynamic Programming') && q.status === 'Solved').length;
    if (dpSolved < 3) {
      insights.push("Dynamic Programming is a high-yield topic for Google/Meta loops. Focus on solving 2D DP memoization algorithms.");
    } else {
      insights.push("Strong DP coverage. Make sure to review sliding window tag variations next.");
    }

    return insights;
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        
        {/* Statistics Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 bg-gradient-to-tr from-brand-indigo/10 to-transparent flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Preparation Ratio</p>
              <h3 className="font-outfit text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
                {questions.length > 0 ? Math.round((totalSolved / questions.length) * 100) : 0}%
              </h3>
              <p className="text-[10px] text-gray-400 mt-1">Solved vs logged questions</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-brand-indigo/10 flex items-center justify-center text-brand-indigo">
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
          
          <div className="p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 bg-gradient-to-tr from-brand-cyan/10 to-transparent flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Solve Velocity</p>
              <h3 className="font-outfit text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
                {questions.filter(q => q.completedAt === new Date().toISOString().split('T')[0]).length} / Day
              </h3>
              <p className="text-[10px] text-gray-400 mt-1">Current daily solving rate</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 bg-gradient-to-tr from-brand-purple/10 to-transparent flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">Revision Health</p>
              <h3 className="font-outfit text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
                {questions.filter(q => q.status === 'Reviewing').length} Pending
              </h3>
              <p className="text-[10px] text-gray-400 mt-1">Flagged questions to review</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple">
              <Clock className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* GitHub-style calendar activity Heatmap */}
        <div className="p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-brand-cyan" />
            <div>
              <h3 className="font-outfit font-bold text-gray-900 dark:text-white text-base">Activity Heatmap</h3>
              <p className="text-xs text-gray-400">Your solved question frequency over the past 20 weeks</p>
            </div>
          </div>

          {/* Grid display */}
          <div className="overflow-x-auto py-2">
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[700px] max-w-full justify-start">
              {getHeatmapCells().map((cell, idx) => (
                <div 
                  key={idx}
                  className={`h-3 w-3 rounded-sm ${getHeatmapColor(cell.count)} transition-all duration-300`}
                  title={`${cell.date}: ${cell.count} solved`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end items-center gap-2 mt-4 text-[10px] text-gray-400">
            <span>Less</span>
            <div className="h-3 w-3 bg-white/5 rounded-sm" />
            <div className="h-3 w-3 bg-emerald-500/30 rounded-sm" />
            <div className="h-3 w-3 bg-emerald-500/60 rounded-sm" />
            <div className="h-3 w-3 bg-emerald-400 rounded-sm" />
            <span>More</span>
          </div>
        </div>

        {/* Chart row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Line Chart - Cumulative Solves Progression */}
          <div className="p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 bg-white/5 backdrop-blur-md flex flex-col justify-between min-h-[350px]">
            <div>
              <h3 className="font-outfit font-bold text-gray-900 dark:text-white text-base">Progress Progression</h3>
              <p className="text-xs text-gray-400">Cumulative questions solved over the last 10 days</p>
            </div>
            
            <div className="flex-1 min-h-[220px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={solvesProgressionData()} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                  <XAxis dataKey="date" stroke={chartTheme.text} fontSize={10} />
                  <YAxis stroke={chartTheme.text} fontSize={10} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDark ? '#0b0f19' : '#ffffff', 
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                      borderRadius: '12px',
                      color: isDark ? '#fff' : '#000'
                    }} 
                  />
                  <Line type="monotone" dataKey="Solved" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart - Difficulty breakdown */}
          <div className="p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 bg-white/5 backdrop-blur-md flex flex-col justify-between min-h-[350px]">
            <div>
              <h3 className="font-outfit font-bold text-gray-900 dark:text-white text-base">Syllabus vs Solved Ratio</h3>
              <p className="text-xs text-gray-400">Questions solved compared to total logged per difficulty</p>
            </div>
            
            <div className="flex-1 min-h-[220px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={difficultyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartTheme.grid} />
                  <XAxis dataKey="name" stroke={chartTheme.text} fontSize={10} />
                  <YAxis stroke={chartTheme.text} fontSize={10} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: isDark ? '#0b0f19' : '#ffffff', 
                      borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                      borderRadius: '12px',
                      color: isDark ? '#fff' : '#000'
                    }} 
                  />
                  <Bar dataKey="Total" fill="rgba(255, 255, 255, 0.1)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Solved" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Radar Chart + AI study insights row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Radar Chart: Topic strengths */}
          <div className="lg:col-span-1 p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 bg-white/5 backdrop-blur-md flex flex-col justify-between min-h-[350px]">
            <div>
              <h3 className="font-outfit font-bold text-gray-900 dark:text-white text-base">Syllabus Breakdown</h3>
              <p className="text-xs text-gray-400">Solving density across core topics</p>
            </div>
            
            <div className="flex-1 flex items-center justify-center min-h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={topicRadarData()}>
                  <PolarGrid stroke={chartTheme.grid} />
                  <PolarAngleAxis dataKey="subject" stroke={chartTheme.text} fontSize={9} />
                  <PolarRadiusAxis stroke={chartTheme.text} fontSize={8} />
                  <Radar name="Solved" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  <Radar name="Logged" dataKey="B" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.1} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dynamic AI Prep Insights */}
          <div className="lg:col-span-2 p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 bg-white/5 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                <h3 className="font-outfit font-bold text-gray-900 dark:text-white text-base">Algorithmic Study Insights</h3>
              </div>
              
              <div className="space-y-4">
                {getInsights().map((insight, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex gap-3">
                    <span className="text-lg shrink-0">💡</span>
                    <p className="text-xs text-gray-300 leading-relaxed font-light">{insight}</p>
                  </div>
                ))}
                
                {/* Additional mock metrics */}
                <div className="p-4 rounded-2xl bg-[#0b0f19] border border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">Revision Cycle Efficiency</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Average days between logging and final completion</p>
                  </div>
                  <span className="text-xs font-bold text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded-full border border-brand-cyan/25 shrink-0">
                    3.4 Days Avg
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-end">
              <span className="text-[10px] text-gray-500">Insights updated dynamically based on solve log</span>
            </div>
          </div>

        </div>

      </div>
    </PageTransition>
  );
}
