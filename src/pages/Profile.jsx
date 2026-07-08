import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuestions } from '../hooks/useQuestions';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Building, 
  GraduationCap, 
  Award, 
  Flame, 
  Edit3, 
  Sparkles,
  ExternalLink,
  Code2,
  X,
  CheckCircle,
  Plus
} from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { questions } = useQuestions();

  const [showEditModal, setShowEditModal] = useState(false);

  // Form Fields
  const [formName, setFormName] = useState(user.name);
  const [formCollege, setFormCollege] = useState(user.college);
  const [formTargetCompany, setFormTargetCompany] = useState(user.targetCompany);
  const [formTargetRole, setFormTargetRole] = useState(user.targetRole);
  const [formAvatar, setFormAvatar] = useState(user.avatarUrl);
  const [formGithub, setFormGithub] = useState(user.github);
  const [formLinkedin, setFormLinkedin] = useState(user.linkedin);
  const [formLeetcode, setFormLeetcode] = useState(user.leetcode);
  const [formSkills, setFormSkills] = useState(user.skills.join(', '));

  // Count solved questions
  const totalSolved = questions.filter(q => q.status === 'Solved').length;

  const handleSubmit = (e) => {
    e.preventDefault();

    const skillsArray = formSkills
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '');

    updateUser({
      name: formName,
      college: formCollege,
      targetCompany: formTargetCompany,
      targetRole: formTargetRole,
      avatarUrl: formAvatar,
      github: formGithub,
      linkedin: formLinkedin,
      leetcode: formLeetcode,
      skills: skillsArray
    });

    setShowEditModal(false);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        
        {/* Cover Banner & Avatar */}
        <div className="relative rounded-3xl border border-gray-200/50 dark:border-white/5 overflow-hidden bg-white/5 backdrop-blur-md">
          {/* Cover gradient */}
          <div className="h-32 sm:h-44 bg-gradient-to-r from-brand-indigo via-brand-purple to-brand-cyan opacity-40 shadow-inner" />
          
          {/* Profile details grid */}
          <div className="px-6 pb-6 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-10 sm:-mt-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 min-w-0">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="h-20 w-20 sm:h-28 sm:w-28 rounded-2xl border-4 border-[#05070f] object-cover shrink-0 shadow-lg"
              />
              <div className="min-w-0 pb-1">
                <h2 className="font-outfit text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 truncate">
                  {user.name}
                  <span className="text-xs font-semibold px-2 py-0.5 bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 rounded-full">Pro Candidate</span>
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1.5 truncate">
                  <GraduationCap className="h-4.5 w-4.5 text-gray-400 shrink-0" />
                  {user.college}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-white/5 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors"
            >
              <Edit3 className="h-4 w-4" />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Primary split details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left panel: Info stats & Handles */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Target Goal Panel */}
            <div className="p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 bg-white/5 backdrop-blur-md">
              <h3 className="font-outfit font-bold text-gray-900 dark:text-white text-sm mb-4">Target Career Goal</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-brand-indigo/10 flex items-center justify-center text-brand-indigo">
                    <Building className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Target Company</p>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">{user.targetCompany}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                    <Code2 className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400">Target Role</p>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">{user.targetRole}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Socials / Coding Profiles */}
            <div className="p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 bg-white/5 backdrop-blur-md">
              <h3 className="font-outfit font-bold text-gray-900 dark:text-white text-sm mb-4">Connected Handles</h3>
              
              <div className="space-y-3">
                
                {user.leetcode && (
                  <a 
                    href={user.leetcode} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-indigo/25 flex items-center justify-between gap-3 text-xs text-gray-400 hover:text-white transition-all"
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      🖥 LeetCode
                    </span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                {user.github && (
                  <a 
                    href={user.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-indigo/25 flex items-center justify-between gap-3 text-xs text-gray-400 hover:text-white transition-all"
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <FaGithub className="h-4 w-4" />
                      GitHub
                    </span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                {user.linkedin && (
                  <a 
                    href={user.linkedin} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-indigo/25 flex items-center justify-between gap-3 text-xs text-gray-400 hover:text-white transition-all"
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <FaLinkedin className="h-4 w-4 text-blue-500 fill-blue-500/20" />
                      LinkedIn
                    </span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

              </div>
            </div>

          </div>

          {/* Right panel: Skills cloud + Achievements */}
          <div className="lg:col-span-2 space-y-6">

            {/* Skills & DSA Topics */}
            <div className="p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 bg-white/5 backdrop-blur-md">
              <h3 className="font-outfit font-bold text-gray-900 dark:text-white text-sm mb-4">Skills Matrix</h3>
              
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, idx) => (
                  <span 
                    key={idx}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-tr from-brand-indigo/10 to-brand-cyan/5 border border-white/5 hover:border-brand-indigo/35 text-xs font-semibold text-gray-900 dark:text-gray-300 transition-all select-none"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements details */}
            <div className="p-6 rounded-3xl border border-gray-200/50 dark:border-white/5 bg-white/5 backdrop-blur-md">
              <h3 className="font-outfit font-bold text-gray-900 dark:text-white text-sm mb-4">Unlocked Milestones</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-[#0b0f19] border border-white/5 flex gap-3">
                  <span className="text-3xl shrink-0">🔥</span>
                  <div>
                    <h4 className="text-xs font-bold text-white">Active Streak Mastery</h4>
                    <p className="text-[10px] text-gray-400 leading-normal mt-0.5">Maintain solved question progress for 15 straight days.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0f19] border border-white/5 flex gap-3">
                  <span className="text-3xl shrink-0">🧠</span>
                  <div>
                    <h4 className="text-xs font-bold text-white">Graph Master</h4>
                    <p className="text-[10px] text-gray-400 leading-normal mt-0.5">Unlock complete understanding of traversal schemas.</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Modal: Edit Profile Info */}
        <AnimatePresence>
          {showEditModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-lg rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-dark-bg p-6 shadow-glass-dark relative overflow-hidden"
              >
                <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-white/5 mb-4">
                  <h3 className="font-outfit font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-brand-purple" />
                    Modify Candidate Profile
                  </h3>
                  <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 max-h-[450px] overflow-y-auto pr-1">
                  
                  {/* Name & College */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Candidate Name</label>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">University / College</label>
                      <input
                        type="text"
                        value={formCollege}
                        onChange={(e) => setFormCollege(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Target Company & Role */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Target Company</label>
                      <input
                        type="text"
                        value={formTargetCompany}
                        onChange={(e) => setFormTargetCompany(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Target Role</label>
                      <input
                        type="text"
                        value={formTargetRole}
                        onChange={(e) => setFormTargetRole(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Avatar URL */}
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Avatar image URL</label>
                    <input
                      type="url"
                      value={formAvatar}
                      onChange={(e) => setFormAvatar(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
                    />
                  </div>

                  {/* Skills Cloud */}
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Skills Matrix (comma-separated)</label>
                    <input
                      type="text"
                      value={formSkills}
                      onChange={(e) => setFormSkills(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
                    />
                  </div>

                  {/* Handles */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">GitHub URL</label>
                      <input
                        type="url"
                        value={formGithub}
                        onChange={(e) => setFormGithub(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">LinkedIn URL</label>
                      <input
                        type="url"
                        value={formLinkedin}
                        onChange={(e) => setFormLinkedin(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">LeetCode URL</label>
                      <input
                        type="url"
                        value={formLeetcode}
                        onChange={(e) => setFormLeetcode(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-white/10 text-gray-400 hover:bg-white/5"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs rounded-xl bg-gradient-to-r from-brand-indigo to-brand-cyan text-white font-bold"
                    >
                      Save Changes
                    </button>
                  </div>

                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}
