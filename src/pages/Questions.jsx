import React, { useState } from 'react';
import { useQuestions } from '../hooks/useQuestions';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  HelpCircle,
  Clock
} from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function Questions() {
  const { questions, addQuestion, editQuestion, deleteQuestion } = useQuestions();

  // Search & Filter state
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('title');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Active item details for CRUD
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formLink, setFormLink] = useState('');
  const [formDifficulty, setFormDifficulty] = useState('Medium');
  const [formPlatform, setFormPlatform] = useState('LeetCode');
  const [formStatus, setFormStatus] = useState('Todo');
  const [formTags, setFormTags] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formRevisionDate, setFormRevisionDate] = useState('');

  // Handle Add Form Submission
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const tagsArray = formTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    addQuestion({
      title: formTitle,
      link: formLink,
      difficulty: formDifficulty,
      platform: formPlatform,
      status: formStatus,
      tags: tagsArray,
      notes: formNotes,
      revisionDate: formRevisionDate || new Date().toISOString().split('T')[0]
    });

    // Reset and Close
    resetForm();
    setShowAddModal(false);
  };

  // Handle Edit Form Submission
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !currentQuestion) return;

    const tagsArray = formTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    editQuestion({
      id: currentQuestion.id,
      title: formTitle,
      link: formLink,
      difficulty: formDifficulty,
      platform: formPlatform,
      status: formStatus,
      tags: tagsArray,
      notes: formNotes,
      revisionDate: formRevisionDate
    });

    // Reset and Close
    resetForm();
    setShowEditModal(false);
  };

  const resetForm = () => {
    setFormTitle('');
    setFormLink('');
    setFormDifficulty('Medium');
    setFormPlatform('LeetCode');
    setFormStatus('Todo');
    setFormTags('');
    setFormNotes('');
    setFormRevisionDate('');
    setCurrentQuestion(null);
  };

  // Open Edit Modal with prefilled details
  const openEditModal = (q) => {
    setCurrentQuestion(q);
    setFormTitle(q.title);
    setFormLink(q.link || '');
    setFormDifficulty(q.difficulty);
    setFormPlatform(q.platform);
    setFormStatus(q.status);
    setFormTags(q.tags.join(', '));
    setFormNotes(q.notes || '');
    setFormRevisionDate(q.revisionDate || '');
    setShowEditModal(true);
  };

  // Open Delete Modal
  const openDeleteModal = (q) => {
    setCurrentQuestion(q);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (currentQuestion) {
      deleteQuestion(currentQuestion.id);
      setShowDeleteModal(false);
      setCurrentQuestion(null);
    }
  };

  // Filter & Sort questions
  const filteredQuestions = questions.filter(q => {
    const matchesSearch = 
      q.title.toLowerCase().includes(search.toLowerCase()) || 
      q.notes.toLowerCase().includes(search.toLowerCase()) ||
      q.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
    const matchesPlatform = platformFilter === 'All' || q.platform === platformFilter;
    const matchesStatus = statusFilter === 'All' || q.status === statusFilter;

    return matchesSearch && matchesDifficulty && matchesPlatform && matchesStatus;
  });

  // Sort logic
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'difficulty') {
      const order = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      return order[a.difficulty] - order[b.difficulty];
    }
    if (sortBy === 'revisionDate') {
      return new Date(a.revisionDate || '') - new Date(b.revisionDate || '');
    }
    return 0;
  });

  // Pagination calculation
  const totalPages = Math.ceil(sortedQuestions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = sortedQuestions.slice(startIndex, startIndex + itemsPerPage);

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/10 text-green-500 border border-green-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20';
      case 'Hard': return 'bg-red-500/10 text-red-500 border border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Solved': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      case 'Reviewing': return 'bg-brand-purple/20 text-brand-purple border border-brand-purple/30';
      case 'Todo': return 'bg-gray-500/20 text-gray-400 border border-white/5';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getPlatformBadge = (platform) => {
    switch (platform) {
      case 'LeetCode': return 'bg-yellow-600/10 text-yellow-500 border border-yellow-600/20';
      case 'HackerRank': return 'bg-emerald-600/10 text-emerald-500 border border-emerald-600/20';
      case 'Codeforces': return 'bg-blue-600/10 text-blue-500 border border-blue-600/20';
      default: return 'bg-gray-600/10 text-gray-400 border border-white/5';
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6">

        {/* Action Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-outfit text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Prep Syllabus Queue</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Search, filter, and modify your coding problems.</p>
          </div>
          
          <button
            onClick={() => { resetForm(); setShowAddModal(true); }}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple text-white text-xs font-semibold shadow-neon-purple btn-premium"
          >
            <Plus className="h-4 w-4" />
            Add New Question
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 rounded-2xl border border-gray-200/50 dark:border-white/5 bg-white/5 backdrop-blur-md space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            
            {/* Search */}
            <div className="relative lg:col-span-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search by title, tag, notes..."
                className="w-full h-10 pl-9 pr-4 rounded-xl text-xs border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
              />
            </div>

            {/* Difficulty Filter */}
            <div>
              <select
                value={difficultyFilter}
                onChange={(e) => { setDifficultyFilter(e.target.value); setCurrentPage(1); }}
                className="w-full h-10 px-3 rounded-xl text-xs border bg-white/5 dark:bg-[#0b0f19] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 focus:outline-none transition-all"
              >
                <option value="All">Difficulty: All</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Platform Filter */}
            <div>
              <select
                value={platformFilter}
                onChange={(e) => { setPlatformFilter(e.target.value); setCurrentPage(1); }}
                className="w-full h-10 px-3 rounded-xl text-xs border bg-white/5 dark:bg-[#0b0f19] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 focus:outline-none transition-all"
              >
                <option value="All">Platform: All</option>
                <option value="LeetCode">LeetCode</option>
                <option value="HackerRank">HackerRank</option>
                <option value="Codeforces">Codeforces</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-10 px-3 rounded-xl text-xs border bg-white/5 dark:bg-[#0b0f19] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 focus:outline-none transition-all"
              >
                <option value="title">Sort: Alphabetical</option>
                <option value="difficulty">Sort: Difficulty</option>
                <option value="revisionDate">Sort: Revision Date</option>
              </select>
            </div>

          </div>
        </div>

        {/* Table / Grid */}
        <div className="rounded-3xl border border-gray-200/50 dark:border-white/5 bg-white/5 backdrop-blur-md overflow-hidden">
          {paginatedQuestions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-white/5 text-[10px] font-semibold tracking-wider text-gray-500 uppercase">
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Difficulty</th>
                    <th className="px-6 py-4">Platform</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Tags</th>
                    <th className="px-6 py-4">Revision Due</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {paginatedQuestions.map((q) => (
                    <tr 
                      key={q.id} 
                      className="group text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-150"
                    >
                      {/* Title */}
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white max-w-[200px]">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="truncate">{q.title}</span>
                          {q.link && (
                            <a 
                              href={q.link} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-gray-400 hover:text-brand-cyan shrink-0"
                            >
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      </td>
                      
                      {/* Difficulty */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-bold text-[9px] ${getDifficultyBadge(q.difficulty)}`}>
                          {q.difficulty}
                        </span>
                      </td>

                      {/* Platform */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium text-[9px] ${getPlatformBadge(q.platform)}`}>
                          {q.platform}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-semibold text-[9px] ${getStatusBadge(q.status)}`}>
                          {q.status}
                        </span>
                      </td>

                      {/* Tags */}
                      <td className="px-6 py-4 max-w-[180px]">
                        <div className="flex flex-wrap gap-1">
                          {q.tags.map((tag, i) => (
                            <span 
                              key={i} 
                              className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[8px] font-medium text-gray-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Revision Date */}
                      <td className="px-6 py-4">
                        <span className="text-gray-400 flex items-center gap-1 font-mono">
                          <Clock className="h-3 w-3 text-brand-indigo shrink-0" />
                          {q.revisionDate}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(q)}
                            className="p-1.5 rounded-lg border border-white/5 hover:bg-brand-indigo/10 text-gray-400 hover:text-brand-indigo transition-colors"
                            title="Edit"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(q)}
                            className="p-1.5 rounded-lg border border-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <HelpCircle className="h-10 w-10 text-gray-500 mb-3" />
              <h3 className="font-bold text-gray-900 dark:text-white">No questions found</h3>
              <p className="text-xs text-gray-400 max-w-xs mt-1">Try resetting search filters or log a new question to start tracking.</p>
            </div>
          )}

          {/* Table footer / Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-gray-500">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedQuestions.length)} of {sortedQuestions.length} entries
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none text-gray-400"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none text-gray-400"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal: ADD Question */}
        <AnimatePresence>
          {showAddModal && (
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
                    Log Coding Problem
                  </h3>
                  <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleAddSubmit} className="space-y-4">
                  
                  {/* Title & Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Problem Title <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. Reverse Linked List"
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Problem URL</label>
                      <input
                        type="url"
                        value={formLink}
                        onChange={(e) => setFormLink(e.target.value)}
                        placeholder="https://leetcode.com/..."
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Difficulty, Platform, Status */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Difficulty</label>
                      <select
                        value={formDifficulty}
                        onChange={(e) => setFormDifficulty(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 dark:bg-[#0b0f19] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs focus:outline-none transition-all"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Platform</label>
                      <select
                        value={formPlatform}
                        onChange={(e) => setFormPlatform(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 dark:bg-[#0b0f19] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs focus:outline-none transition-all"
                      >
                        <option value="LeetCode">LeetCode</option>
                        <option value="HackerRank">HackerRank</option>
                        <option value="Codeforces">Codeforces</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Status</label>
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 dark:bg-[#0b0f19] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs focus:outline-none transition-all"
                      >
                        <option value="Todo">Todo</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Solved">Solved</option>
                      </select>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={formTags}
                      onChange={(e) => setFormTags(e.target.value)}
                      placeholder="e.g. Arrays, Trees, DFS"
                      className="w-full h-10 px-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Tricky notes & complexity</label>
                    <textarea
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      placeholder="Write core algorithms details here..."
                      rows="3"
                      className="w-full p-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all resize-none"
                    />
                  </div>

                  {/* Revision Date */}
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Next Revision Date</label>
                    <input
                      type="date"
                      value={formRevisionDate}
                      onChange={(e) => setFormRevisionDate(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border bg-white/5 dark:bg-[#0b0f19] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs focus:outline-none transition-all"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-white/10 text-gray-400 hover:bg-white/5"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs rounded-xl bg-gradient-to-r from-brand-indigo to-brand-cyan text-white font-bold"
                    >
                      Save Question
                    </button>
                  </div>

                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: EDIT Question */}
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
                    <Edit3 className="h-5 w-5 text-brand-purple" />
                    Modify Question
                  </h3>
                  <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleEditSubmit} className="space-y-4">
                  
                  {/* Title & Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Problem Title <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="e.g. Reverse Linked List"
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Problem URL</label>
                      <input
                        type="url"
                        value={formLink}
                        onChange={(e) => setFormLink(e.target.value)}
                        placeholder="https://leetcode.com/..."
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
                      />
                    </div>
                  </div>

                  {/* Difficulty, Platform, Status */}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Difficulty</label>
                      <select
                        value={formDifficulty}
                        onChange={(e) => setFormDifficulty(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 dark:bg-[#0b0f19] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs focus:outline-none transition-all"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Platform</label>
                      <select
                        value={formPlatform}
                        onChange={(e) => setFormPlatform(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 dark:bg-[#0b0f19] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs focus:outline-none transition-all"
                      >
                        <option value="LeetCode">LeetCode</option>
                        <option value="HackerRank">HackerRank</option>
                        <option value="Codeforces">Codeforces</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Status</label>
                      <select
                        value={formStatus}
                        onChange={(e) => setFormStatus(e.target.value)}
                        className="w-full h-10 px-3 rounded-xl border bg-white/5 dark:bg-[#0b0f19] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs focus:outline-none transition-all"
                      >
                        <option value="Todo">Todo</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Solved">Solved</option>
                      </select>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={formTags}
                      onChange={(e) => setFormTags(e.target.value)}
                      placeholder="e.g. Arrays, Trees, DFS"
                      className="w-full h-10 px-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all"
                    />
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Tricky notes & complexity</label>
                    <textarea
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      placeholder="Write core algorithms details here..."
                      rows="3"
                      className="w-full p-3 rounded-xl border bg-white/5 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-brand-indigo/50 transition-all resize-none"
                    />
                  </div>

                  {/* Revision Date */}
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Next Revision Date</label>
                    <input
                      type="date"
                      value={formRevisionDate}
                      onChange={(e) => setFormRevisionDate(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border bg-white/5 dark:bg-[#0b0f19] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 text-xs focus:outline-none transition-all"
                    />
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
                      Update Question
                    </button>
                  </div>

                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Modal: DELETE Question */}
        <AnimatePresence>
          {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-sm rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-dark-bg p-6 shadow-glass-dark relative text-center"
              >
                <h3 className="font-outfit font-bold text-lg text-gray-900 dark:text-white mb-2">Delete Question?</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                  Are you sure you want to remove <span className="font-bold text-gray-800 dark:text-white">"{currentQuestion?.title}"</span>? This action cannot be undone.
                </p>
                
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-white/10 text-gray-400 hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 text-xs rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold"
                  >
                    Confirm Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}
