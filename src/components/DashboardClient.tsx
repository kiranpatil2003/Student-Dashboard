'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import BentoGrid, { BentoCard } from '@/components/BentoGrid';
import HeroTile from '@/components/HeroTile';
import CourseCard from '@/components/CourseCard';
import ActivityTile from '@/components/ActivityTile';
import DbStatus from '@/components/db-status';
import { Course } from '@/app/actions/courses';
import { BookOpen, ShieldAlert, Award, Clock, Flame } from 'lucide-react';

interface DashboardClientProps {
  initialCourses: Course[];
  isMock: boolean;
  error?: string | null;
}

export default function DashboardClient({
  initialCourses,
  isMock,
  error,
}: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courses] = useState<Course[]>(initialCourses);

  // Return readable page title based on active tab
  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Overview';
      case 'courses':
        return 'My Learning';
      case 'analytics':
        return 'Performance';
      case 'settings':
        return 'Preferences';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground select-text">
      {/* Collapsible/Responsive Left Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 sm:px-8 bg-zinc-950/20 sticky top-0 backdrop-blur-md z-30">
          <h2 className="text-xl font-bold tracking-tight text-white">
            {getPageTitle()}
          </h2>
          <DbStatus isMock={isMock} error={error} />
        </header>

        {/* Dynamic Pages depending on Tab */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <BentoGrid>
              {/* Hero Greeting Tile */}
              <BentoCard colSpan="col-span-1 md:col-span-2 lg:col-span-2">
                <HeroTile />
              </BentoCard>

              {/* Activity Grid Tile */}
              <BentoCard colSpan="col-span-1 md:col-span-2 lg:col-span-1">
                <ActivityTile />
              </BentoCard>

              {/* Course Cards dynamically fetched */}
              {courses.length > 0 ? (
                courses.map((course) => (
                  <BentoCard key={course.id}>
                    <CourseCard course={course} />
                  </BentoCard>
                ))
              ) : (
                <BentoCard colSpan="col-span-1 md:col-span-2 lg:col-span-3">
                  <div className="flex flex-col items-center justify-center text-center py-10 px-4 space-y-3">
                    <div className="p-3 bg-zinc-800 rounded-full text-zinc-500">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">No courses available</h4>
                      <p className="text-zinc-500 text-xs mt-1">
                        Ensure your Supabase project contains the &apos;courses&apos; table with active entries.
                      </p>
                    </div>
                  </div>
                </BentoCard>
              )}
            </BentoGrid>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
                <div>
                  <h3 className="text-lg font-bold text-white">Active Enrollments</h3>
                  <p className="text-sm text-zinc-500">Track and resume your ongoing courses.</p>
                </div>
                <div className="text-xs text-zinc-400 bg-zinc-800 px-3 py-1 rounded-md border border-zinc-700">
                  {courses.length} Courses
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.length > 0 ? (
                  courses.map((course) => (
                    <BentoCard key={course.id}>
                      <CourseCard course={course} />
                    </BentoCard>
                  ))
                ) : (
                  <BentoCard colSpan="col-span-1 md:col-span-2 lg:col-span-3">
                    <div className="flex flex-col items-center justify-center text-center py-10 px-4 space-y-3">
                      <div className="p-3 bg-zinc-800 rounded-full text-zinc-500">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">No courses available</h4>
                        <p className="text-zinc-500 text-xs mt-1">
                          No enrollments found. Set up your Supabase database according to guidelines in settings.
                        </p>
                      </div>
                    </div>
                  </BentoCard>
                )}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              <div className="pb-4 border-b border-zinc-800">
                <h3 className="text-lg font-bold text-white">Weekly Performance</h3>
                <p className="text-sm text-zinc-500">Analyze your metrics, time spent, and milestones.</p>
              </div>

              {/* Metric stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card border border-border p-5 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-zinc-400">
                    <Clock className="h-5 w-5 text-indigo-400" />
                    <span className="text-xs font-semibold">Total Hours</span>
                  </div>
                  <div className="text-3xl font-extrabold text-white">148.5h</div>
                  <p className="text-xs text-zinc-500">+12% from last week</p>
                </div>

                <div className="bg-card border border-border p-5 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-zinc-400">
                    <Award className="h-5 w-5 text-indigo-400" />
                    <span className="text-xs font-semibold">Lessons Finished</span>
                  </div>
                  <div className="text-3xl font-extrabold text-white">42</div>
                  <p className="text-xs text-zinc-500">Completed 4 modules</p>
                </div>

                <div className="bg-card border border-border p-5 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-zinc-400">
                    <Flame className="h-5 w-5 text-orange-400" />
                    <span className="text-xs font-semibold">Active Streak</span>
                  </div>
                  <div className="text-3xl font-extrabold text-white">7 Days</div>
                  <p className="text-xs text-zinc-500">Perfect attendance</p>
                </div>

                <div className="bg-card border border-border p-5 rounded-xl space-y-3">
                  <div className="flex justify-between items-center text-zinc-400">
                    <BookOpen className="h-5 w-5 text-indigo-400" />
                    <span className="text-xs font-semibold">Current Progress</span>
                  </div>
                  <div className="text-3xl font-extrabold text-white">70.2%</div>
                  <p className="text-xs text-zinc-500">Avg. course percentage</p>
                </div>
              </div>

              {/* Big Activity Graph Section */}
              <div className="bg-card border border-border p-6 rounded-xl space-y-4">
                <ActivityTile />
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <div className="pb-4 border-b border-zinc-800">
                <h3 className="text-lg font-bold text-white">Account Preferences</h3>
                <p className="text-sm text-zinc-500">Manage dashboard features and developer settings.</p>
              </div>

              <div className="space-y-4">
                <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white text-sm">Theme Settings</h4>
                    <p className="text-xs text-zinc-500">Simple dark theme enabled by default.</p>
                  </div>
                  <span className="text-xs bg-zinc-800 border border-zinc-700 px-2.5 py-1 rounded text-zinc-400 font-mono">
                    Dark Only
                  </span>
                </div>

                <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-white text-sm">Real-time DB Connection</h4>
                    <p className="text-xs text-zinc-500">Toggle or check status of local database connection.</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded border font-mono ${
                    isMock
                      ? 'bg-yellow-500/15 border-yellow-500/25 text-yellow-400'
                      : 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400'
                  }`}>
                    {isMock ? 'Demo Mode Active' : 'Supabase Active'}
                  </span>
                </div>

                {isMock && (
                  <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl space-y-3">
                    <div className="flex items-start gap-2.5 text-zinc-300">
                      <ShieldAlert className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                      <div className="text-xs leading-relaxed space-y-1">
                        <p className="font-semibold text-white text-sm">Supabase Integration Guide</p>
                        <p>To populate courses from your own PostgreSQL database, follow these steps:</p>
                        <ol className="list-decimal pl-4 space-y-1 mt-2 text-zinc-400">
                          <li>Create a project on <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-indigo-400 underline">supabase.com</a>.</li>
                          <li>Run the SQL schema in your SQL Editor:
                            <pre className="mt-1 p-2 bg-black rounded text-[10.5px] overflow-x-auto text-zinc-300 select-all whitespace-pre">
{`create table courses (
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
  ('System Architecture & Design', 62, 'Cpu');`}
                            </pre>
                          </li>
                          <li>Copy your Project API Credentials into a file named <code className="text-white">.env.local</code> in the root directory.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
