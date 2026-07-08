# 🚀 Prep Tracker

An ultra-premium, portfolio-worthy **MERN Stack frontend** built for software engineering candidates to track their **Data Structures & Algorithms (DSA)** preparation. Designed like a high-performance modern SaaS dashboard with a dark theme, glassmorphic UI, responsive layouts, and interactive data visualizations.

---

## ✨ Features

### 🏠 SaaS Landing Page
- Premium marketing homepage
- Hero section with smooth animations
- Learning roadmap
- Testimonials section
- Accordion FAQ section

### 📊 Interactive Dashboard
- **Time-Aware Welcome Panel**
  - Dynamic greeting based on the current time of day.

- **7-Day Streak Tracker**
  - Displays active solving streak.
  - Neon glowing mini sparkline graph.

- **Metrics Overview**
  - Total Questions
  - Solved Questions
  - Easy
  - Medium
  - Hard

- **Progress Area Chart**
  - Visualizes daily solved questions.

- **Topic Distribution Donut Chart**
  - Percentage breakdown of DSA topics.
  - Center indicator showing total solved.

- **Circular Accuracy Ring**
  - SVG radial progress tracker displaying solving accuracy.

---

### 📚 Question Management (CRUD)

- Search questions
- Filter by:
  - Difficulty
  - Platform
  - Status
- Sort dynamically
- Add Question
- Edit Question
- Delete Question
- Local Storage persistence (simulated database)

---

### 📈 Analytics

- GitHub-style Activity Heatmap
- Tracks coding consistency for the past **20 weeks**
- Dynamic insights engine
- Personalized recommendations based on topic coverage

---

### 👤 Candidate Profile

- Custom profile cover
- Target Company Goals
- University Details
- GitHub Profile
- LeetCode Profile
- LinkedIn Profile
- Skill Matrix

---

### ⚙️ Settings

- Daily solving target
- Email reminders
- Slack reminders
- Layout preferences
- Database reset option

---

### 🛎️ Notification Hub

- Revision reminders
- Achievement notifications
- Streak milestones

---

### 🌓 Theme

- Dark Mode
- Responsive design
- Ambient glassmorphism UI
- Modern SaaS-inspired interface

---

# 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React.js (v19) |
| Styling | Tailwind CSS (v3) |
| Animations | Framer Motion |
| Icons | React Icons |
| Charts | Recharts |
| Routing | React Router DOM (v7) |
| Storage | Local Storage |

---

# 📂 Project Structure

```text
src/
│
├── assets/                 # Static assets & background patterns
├── components/             # Reusable UI components
│   ├── Layout
│   ├── Sidebar
│   ├── Navbar
│   ├── PageTransition
│   └── Skeleton
│
├── context/                # React Context Providers
│   ├── ThemeContext
│   └── AuthContext
│
├── hooks/                  # Custom Hooks
│   └── useQuestions
│
├── pages/
│   ├── Home
│   ├── Dashboard
│   ├── Questions
│   ├── Analytics
│   ├── Profile
│   ├── Settings
│   └── NotFound
│
├── App.jsx                 # Routing configuration
└── index.css               # Tailwind imports & global styles
```

---

# 🚀 Installation

## Clone the Repository

```bash
git clone https://github.com/Nandinisharma11/interview-prep-tracker.git
```

```bash
cd interview-prep-tracker
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

Visit:

```text
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

---



---

# 🎯 Future Improvements

- Backend Integration (Node.js + Express)
- MongoDB Database
- Authentication (JWT)
- Google Login
- Cloud Sync
- Email Notifications
- Leaderboard
- Interview Calendar
- Coding Contest Tracker

---

# 👨‍💻 Author

**Nandini Sharma**

- **GitHub:** https://github.com/Nandinisharma11
- **LinkedIn:** https://www.linkedin.com/in/nandiniii11

---

# ⭐ Support

If you like this project, consider giving it a **⭐ Star** on GitHub.

It motivates me to build more open-source projects!

---

## 📄 License

This project is open source and available under the **MIT License**.
