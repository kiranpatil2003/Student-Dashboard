'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Sidebar for Desktop and Tablet */}
      <aside
        className={`hidden md:flex flex-col border-r border-border bg-card text-foreground transition-all duration-300 relative shrink-0 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center px-4 border-b border-border justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg text-white shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
              <GraduationCap className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-lg tracking-tight select-none whitespace-nowrap">
                Aether Learn
              </span>
            )}
          </div>

          {/* Toggle Button for Desktop only (hidden on tablet) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-md border border-border hover:bg-zinc-800 transition-colors cursor-pointer text-zinc-400 hover:text-white"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium relative group transition-colors cursor-pointer ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {/* Active Highlight Animation */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-gradient-to-r from-zinc-800/80 to-zinc-800/40 border-l-2 border-indigo-500 rounded-lg -z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                
                <Icon className="h-5 w-5 shrink-0 z-10" />
                {!isCollapsed && (
                  <span className="z-10 truncate transition-opacity duration-200">
                    {item.label}
                  </span>
                )}
                
                {/* Tooltip for collapsed mode */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-2.5 py-1 bg-zinc-900 border border-border text-xs text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile Muted Area */}
        <div className="p-4 border-t border-border flex items-center gap-3 overflow-hidden">
          <div className="h-9 w-9 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700">
            <span className="text-sm font-semibold text-white">JD</span>
          </div>
          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="text-sm font-medium text-zinc-200 select-none">Jane Doe</span>
              <span className="text-xs text-zinc-500 truncate select-none">jane.doe@aether.edu</span>
            </div>
          )}
        </div>
      </aside>

      {/* Bottom Navigation for Mobile (< 768px) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-border bg-card/95 backdrop-blur-md z-40 flex items-center justify-around px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl text-xs font-medium relative transition-colors cursor-pointer ${
                isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-mobile"
                  className="absolute inset-x-1 inset-y-1 bg-gradient-to-b from-zinc-800 to-zinc-800/70 border border-zinc-700/50 rounded-lg -z-0"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className="h-5 w-5 z-10" />
              <span className="mt-1 text-[10px] z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
