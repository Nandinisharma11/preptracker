import { useState, useEffect } from 'react';

const INITIAL_QUESTIONS = [
  {
    id: 'q1',
    title: 'Two Sum',
    link: 'https://leetcode.com/problems/two-sum/',
    difficulty: 'Easy',
    platform: 'LeetCode',
    status: 'Solved',
    tags: ['Arrays', 'Hash Table'],
    notes: 'Classic hash map solution. O(N) time and space complexity. Watch out for duplicate elements.',
    revisionDate: '2026-07-10',
    completedAt: '2026-07-04'
  },
  {
    id: 'q2',
    title: 'Longest Substring Without Repeating Characters',
    link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    difficulty: 'Medium',
    platform: 'LeetCode',
    status: 'Solved',
    tags: ['Sliding Window', 'Strings', 'Hash Table'],
    notes: 'Sliding window technique. Keep track of character indices in a map to skip index pointer fast.',
    revisionDate: '2026-07-06',
    completedAt: '2026-07-03'
  },
  {
    id: 'q3',
    title: 'Merge k Sorted Lists',
    link: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    difficulty: 'Hard',
    platform: 'LeetCode',
    status: 'Reviewing',
    tags: ['Divide and Conquer', 'Heap', 'Linked List'],
    notes: 'Use a min-heap to optimize finding the smallest element. Time complexity O(N log k). Need to practice implementation.',
    revisionDate: '2026-07-05',
    completedAt: '2026-07-01'
  },
  {
    id: 'q4',
    title: 'Binary Tree Maximum Path Sum',
    link: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
    difficulty: 'Hard',
    platform: 'LeetCode',
    status: 'Todo',
    tags: ['Trees', 'DFS', 'Dynamic Programming'],
    notes: 'Need to compute max path through any node. Tricky base cases. Revisit tree traversals first.',
    revisionDate: '2026-07-08',
    completedAt: null
  },
  {
    id: 'q5',
    title: 'Edit Distance',
    link: 'https://leetcode.com/problems/edit-distance/',
    difficulty: 'Medium',
    platform: 'LeetCode',
    status: 'Solved',
    tags: ['Dynamic Programming', 'Strings'],
    notes: 'Standard 2D DP problem. State definition: dp[i][j] is the min operations to convert word1[0...i] to word2[0...j].',
    revisionDate: '2026-07-09',
    completedAt: '2026-07-02'
  },
  {
    id: 'q6',
    title: 'Subarray Sum Equals K',
    link: 'https://leetcode.com/problems/subarray-sum-equals-k/',
    difficulty: 'Medium',
    platform: 'LeetCode',
    status: 'Solved',
    tags: ['Arrays', 'Prefix Sum', 'Hash Table'],
    notes: 'Cumulative sum + hash map. If (sum - k) is in the map, add its frequency. O(N) time.',
    revisionDate: '2026-07-07',
    completedAt: '2026-07-05'
  },
  {
    id: 'q7',
    title: 'Valid Parentheses',
    link: 'https://leetcode.com/problems/valid-parentheses/',
    difficulty: 'Easy',
    platform: 'LeetCode',
    status: 'Solved',
    tags: ['Stacks', 'Strings'],
    notes: 'Use stack to push open brackets and pop on closing. O(N) time and space.',
    revisionDate: '2026-07-12',
    completedAt: '2026-07-05'
  },
  {
    id: 'q8',
    title: 'Course Schedule',
    link: 'https://leetcode.com/problems/course-schedule/',
    difficulty: 'Medium',
    platform: 'HackerRank',
    status: 'Solved',
    tags: ['Graphs', 'BFS', 'DFS', 'Topological Sort'],
    notes: 'Cycle detection in directed graph. Kahn\'s algorithm (indegrees) or DFS cycle checking works.',
    revisionDate: '2026-07-08',
    completedAt: '2026-07-04'
  },
  {
    id: 'q9',
    title: 'Kth Largest Element in an Array',
    link: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
    difficulty: 'Medium',
    platform: 'LeetCode',
    status: 'Solved',
    tags: ['Heaps', 'Quickselect'],
    notes: 'Can use a min-heap of size K, or Quickselect algorithm. O(N log K) with Heap, O(N) average with Quickselect.',
    revisionDate: '2026-07-11',
    completedAt: '2026-07-03'
  },
  {
    id: 'q10',
    title: 'Sliding Window Maximum',
    link: 'https://leetcode.com/problems/sliding-window-maximum/',
    difficulty: 'Hard',
    platform: 'Codeforces',
    status: 'Reviewing',
    tags: ['Sliding Window', 'Queue', 'Monotonic Queue'],
    notes: 'Use a double-ended queue (deque) to maintain elements in decreasing order. O(N) time complexity.',
    revisionDate: '2026-07-05',
    completedAt: '2026-06-30'
  }
];

export function useQuestions() {
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem('preptracker_questions');
    if (saved) return JSON.parse(saved);
    return INITIAL_QUESTIONS;
  });

  useEffect(() => {
    localStorage.setItem('preptracker_questions', JSON.stringify(questions));
  }, [questions]);

  const addQuestion = (question) => {
    const newQuestion = {
      ...question,
      id: 'q_' + Date.now(),
      completedAt: question.status === 'Solved' ? new Date().toISOString().split('T')[0] : null
    };
    setQuestions((prev) => [newQuestion, ...prev]);
    updateUserSolvedCount(1, question.status);
  };

  const editQuestion = (updatedQuestion) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === updatedQuestion.id) {
          // If status changed to Solved, set completedAt, otherwise clear/maintain
          let completedAt = q.completedAt;
          if (updatedQuestion.status === 'Solved' && q.status !== 'Solved') {
            completedAt = new Date().toISOString().split('T')[0];
          } else if (updatedQuestion.status !== 'Solved' && q.status === 'Solved') {
            completedAt = null;
          }
          return { ...updatedQuestion, completedAt };
        }
        return q;
      })
    );
  };

  const deleteQuestion = (id) => {
    const question = questions.find(q => q.id === id);
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    if (question && question.status === 'Solved') {
      updateUserSolvedCount(-1, 'Solved');
    }
  };

  const updateUserSolvedCount = (modifier, status) => {
    if (status !== 'Solved') return;
    const userStr = localStorage.getItem('preptracker_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        user.solvedCount = Math.max(0, user.solvedCount + modifier);
        localStorage.setItem('preptracker_user', JSON.stringify(user));
        // Dispatch custom event to let other components know the user updated
        window.dispatchEvent(new Event('user_updated'));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const resetData = () => {
    setQuestions(INITIAL_QUESTIONS);
    localStorage.setItem('preptracker_questions', JSON.stringify(INITIAL_QUESTIONS));
    const userStr = localStorage.getItem('preptracker_user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        user.solvedCount = 142; // reset to mock default
        localStorage.setItem('preptracker_user', JSON.stringify(user));
        window.dispatchEvent(new Event('user_updated'));
      } catch (e) {
        console.error(e);
      }
    }
  };

  return {
    questions,
    addQuestion,
    editQuestion,
    deleteQuestion,
    resetData
  };
}
