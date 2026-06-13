# 🎓 Student Dashboard

A premium, modern, and dark-themed **Student Learning Dashboard** built with **Next.js** and **Supabase**. This dashboard helps students monitor their learning metrics, maintain their daily study streaks, view their study intensity through a custom activity heatmap, and manage course enrollments in real time.

---

## ✨ Features

- **📊 Comprehensive Analytics & Heatmap**: Track performance metrics (total hours, lessons finished, active streak, and progress) along with a GitHub-style *Learning Intensity* heatmap showing daily study activity for the past 150 days.
- **🔥 Habit & Streak Tracker**: A dynamic greeting header containing an interactive 7-day habit streak tracker showing completion statuses.
- **📚 Live Course Enrollments**: View active course cards with dynamic progress bars, completion percentages, and course icons.
- **🔌 Hybrid Database Connection**: Connects to a live **Supabase** database if configured, or falls back gracefully to a mock demo mode with inline database integration guidelines.
- **🎨 Glassmorphism Design**: Responsive developer-centric dark mode UI built with Tailwind CSS v4, Framer Motion animations, and Lucide React icons.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI & Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database Backend**: [Supabase](https://supabase.com/)
- **Language**: TypeScript

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy the template `.env.example` file to create your local environment file:
```bash
cp .env.example .env.local
```
Open `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Database Setup (Optional)
To use live data rather than demo fallbacks, execute this SQL script in your Supabase project SQL Editor to create the table and populate initial data:
```sql
create table courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  progress integer not null,
  icon_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns', 84, 'Layers'),
  ('Next.js App Router Masterclass', 95, 'Terminal'),
  ('Database Scaling & Optimization', 40, 'Database'),
  ('System Architecture & Design', 62, 'Cpu');
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.
