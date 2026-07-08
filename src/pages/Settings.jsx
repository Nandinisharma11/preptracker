import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuestions } from '../hooks/useQuestions';
import { useTheme } from '../context/ThemeContext';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Trash2, 
  Sun, 
  Moon, 
  Target, 
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Database
} from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function Settings() {
  const { user, updateUser } = useAuth();
  const { resetData } = useQuestions();
  const { isDark, toggleTheme } = useTheme();

  // Settings form states
  const [dailyGoal, setDailyGoal] = useState(user.dailyGoal);
  const [emailNotify, setEmailNotify] = useState(true);
  const [slackNotify, setSlackNotify] = useState(false);
  const [browserNotify, setBrowserNotify] = useState(true);
  const [isResetSuccess, setIsResetSuccess] = useState(false);

  const handleSaveGoal = (e) => {
    e.preventDefault();
    updateUser({ dailyGoal: parseInt(dailyGoal) || 5 });
    // Trigger notification or alert
    alert('Daily coding target updated successfully!');
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all tracking data? This will clear custom logged questions.')) {
      resetData();
      setIsResetSuccess(true);
      setTimeout(() => setIsResetSuccess(false), 3000);
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6 max-w-4xl">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Left: Navigation Categories */}
          <div className="md:col-span-1 space-y-2">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3 text-brand-indigo font-semibold text-sm">
              <SettingsIcon className="h-4.5 w-4.5" />
              General Preferences
            </div>
          </div>

          {/* Right: Actual Settings Panes */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Theme Toggle */}
            <div className="p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 bg-white/5 backdrop-blur-md">
              <h3 className="font-outfit font-bold text-gray-900 dark:text-white text-sm mb-4 flex items-center gap-2">
                {isDark ? <Moon className="h-4.5 w-4.5 text-brand-purple" /> : <Sun className="h-4.5 w-4.5 text-yellow-500" />}
                Theme Display Mode
              </h3>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">Light vs Dark theme</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Toggle display layout brightness levels</p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 dark:bg-[#0b0f19] border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-700 dark:text-gray-300"
                >
                  Switch theme
                </button>
              </div>
            </div>

            {/* Coding Targets */}
            <div className="p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 bg-white/5 backdrop-blur-md">
              <h3 className="font-outfit font-bold text-gray-900 dark:text-white text-sm mb-4 flex items-center gap-2">
                <Target className="h-4.5 w-4.5 text-brand-indigo" />
                Target Prep Milestones
              </h3>
              <form onSubmit={handleSaveGoal} className="space-y-4">
                <div className="max-w-xs">
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Daily Solving Goal</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={dailyGoal}
                      onChange={(e) => setDailyGoal(e.target.value)}
                      min="1"
                      max="20"
                      className="w-24 h-10 px-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs rounded-xl bg-gradient-to-r from-brand-indigo to-brand-cyan text-white font-bold"
                    >
                      Update Target
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Notification Preferences */}
            <div className="p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 bg-white/5 backdrop-blur-md">
              <h3 className="font-outfit font-bold text-gray-900 dark:text-white text-sm mb-4 flex items-center gap-2">
                <Bell className="h-4.5 w-4.5 text-brand-cyan" />
                Notification Schedules
              </h3>
              <div className="space-y-4">
                
                {/* Email Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 dark:text-white">Email Daily Digest</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Receive spaced repetition due lists each morning</p>
                  </div>
                  <button onClick={() => setEmailNotify(!emailNotify)} className="text-gray-400 hover:text-white">
                    {emailNotify ? <ToggleRight className="h-7 w-7 text-brand-indigo" /> : <ToggleLeft className="h-7 w-7" />}
                  </button>
                </div>

                {/* Slack alerts */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 dark:text-white">Slack integration reminders</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Ping daily streaks statistics into Slack workspaces</p>
                  </div>
                  <button onClick={() => setSlackNotify(!slackNotify)} className="text-gray-400 hover:text-white">
                    {slackNotify ? <ToggleRight className="h-7 w-7 text-brand-indigo" /> : <ToggleLeft className="h-7 w-7" />}
                  </button>
                </div>

                {/* Browser notify */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-900 dark:text-white">In-browser alerts</h4>
                    <p className="text-[10px] text-gray-400 mt-0.5">Alerts when revision cards are actively due</p>
                  </div>
                  <button onClick={() => setBrowserNotify(!browserNotify)} className="text-gray-400 hover:text-white">
                    {browserNotify ? <ToggleRight className="h-7 w-7 text-brand-indigo" /> : <ToggleLeft className="h-7 w-7" />}
                  </button>
                </div>

              </div>
            </div>

            {/* Database Reset utility */}
            <div className="p-6 rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-md">
              <h3 className="font-outfit font-bold text-red-500 text-sm mb-4 flex items-center gap-2">
                <Trash2 className="h-4.5 w-4.5" />
                Danger Zone
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">Reset Prep Tracker Database</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Restore all question databases and profile counters to their original mock state.</p>
                </div>
                <button
                  onClick={handleResetData}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition-colors"
                >
                  <Database className="h-4 w-4" />
                  Reset Database
                </button>
              </div>

              {isResetSuccess && (
                <div className="mt-4 p-3 rounded-xl border border-green-500/20 bg-green-500/10 text-green-500 text-xs font-bold animate-in fade-in duration-200">
                  Prep Tracker data successfully restored to defaults!
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </PageTransition>
  );
}
