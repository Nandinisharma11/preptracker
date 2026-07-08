🚀 Prep Tracker
An ultra-premium, portfolio-worthy MERN stack frontend built for software engineering candidates to track their Data Structures & Algorithms (DSA) preparation. Designed like a high-performance modern SaaS dashboard with a dark theme, glassmorphic card widgets, responsive menus, and real-time interactive charts.

✨ Features
🏠 SaaS Landing Page: Premium marketing homepage featuring hero animations, roadmaps, testimonials, and accordion FAQs.
📊 Live Interactive Dashboard:
Time-aware Welcome Panel: Dynamic welcome banner greeting you based on the time of day.
Interactive 7-Day Streak Card: Displays active solving days equipped with a neon glowing mini sparkline graph.
5-Column Metrics Grid: Tracks Total Questions, Solved counts, and Easy/Medium/Hard statistics.
Progress Area Chart: Detailed visualization of questions solved each day.
Topic Donut Chart: Dynamic percentage breakdown of algorithm categories with a centered total count indicator.
Circular Accuracy Ring: Radial SVG tracker showing success ratios.
📚 Spaced Repetition Syllabus Queue:
Search, filter by difficulty/platform/status, and sort questions dynamically.
Full simulated database CRUD Operations (Add, Edit, and Delete modals) backed by local storage persistence.
📈 Advanced Analytics Page:
GitHub-Style Activity Heatmap: Grid tile calendar calculating coding consistency over the past 20 weeks.
Insights Engine: Contextual recommendations generated dynamically based on topic coverage.
👤 Candidate Profile: Custom cover header displaying target company goals, university details, linked profiles (GitHub, LeetCode, LinkedIn), and skill matrices.
⚙️ Settings Panel: Control daily solving targets, configure email/Slack reminders, toggle layout displays, and trigger database resets.
🛎️ Notification Hub: Bell dropdown indicating active revisions due, achievements unlocked, and streak milestones.
🌓 Theme Display Modes: Fully responsive dark mode setup with ambient backdrop glows.
🛠️ Tech Stack
Core: React.js (v19)
Styling: Tailwind CSS (v3)
Animations: Framer Motion
Iconography:  React Icons
Data Visualization: Recharts (Area, Donut, Line graphs)
Routing: React Router DOM (v7)
📂 Project Structure
bash

src/
├── assets/          # Static assets & background patterns
├── components/      # Common components (Layout, Sidebar, Navbar, PageTransition, Skeleton)
├── context/         # React Context Providers (ThemeContext, AuthContext)
├── hooks/           # Custom React Hooks (useQuestions client-side CRUD)
├── pages/           # Page-level route views (Home, Dashboard, Questions, Analytics, Profile, Settings, NotFound)
├── App.jsx          # Router configurations
└── index.css        # Tailwind imports & global glassmorphic style variables
🚀 Installation & Setup
Clone the Repository:

bash

git clone https://github.com/Nandinisharma11/interview-prep-tracker.git
cd interview-prep-tracker
Install Dependencies:

bash

npm install
Run Development Server:

bash

npm run dev
Open http://localhost:5173 in your browser.

Build for Production:

bash

npm run build
👨‍💻 Author
Nandini Sharma
GitHub: @Nandinisharma11
LinkedIn: nandiniii11
