'use client';

import React from 'react';
import { Flame, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroTile() {
  const userName = 'Jane Doe';
  const streakCount = 7;

  // Streak status for the past 7 days: true = completed, false = missed
  const weeklyStreak = [
    { day: 'M', completed: true },
    { day: 'T', completed: true },
    { day: 'W', completed: true },
    { day: 'T', completed: true },
    { day: 'F', completed: true },
    { day: 'S', completed: true },
    { day: 'S', completed: true, isToday: true },
  ];

  return (
    <div className="flex flex-col h-full justify-between gap-6">
      {/* Header Info */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-medium text-indigo-400 select-none">
          <Sparkles className="h-3 w.5-3 w-3" />
          Pro Student Account
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mt-1">
          Welcome back, {userName}
        </h1>
        <p className="text-zinc-400 text-sm max-w-md">
          You are maintaining a perfect week. Finish today's session to secure your streak!
        </p>
      </div>

      {/* Streak Section */}
      <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-orange-950/40 border border-orange-800/60 flex items-center justify-center text-orange-500 shrink-0">
            <Flame className="h-6 w-6 fill-orange-500/20" />
          </div>
          <div>
            <div className="text-lg font-bold text-white flex items-center gap-1.5">
              {streakCount} Day Streak
              <span className="text-sm font-normal text-zinc-500">(Active)</span>
            </div>
            <p className="text-xs text-zinc-500">Next milestone: 10 days</p>
          </div>
        </div>

        {/* Weekly Habit Tracker Circles */}
        <div className="flex items-center gap-2">
          {weeklyStreak.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium text-zinc-500 select-none">{day.day}</span>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 + idx * 0.05, type: 'spring' }}
                className={`h-8 w-8 rounded-full border flex items-center justify-center text-xs font-semibold relative ${
                  day.completed
                    ? 'bg-orange-500 text-black border-orange-500'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                } ${day.isToday && day.completed ? 'ring-2 ring-orange-500/40 ring-offset-2 ring-offset-zinc-950' : ''}`}
              >
                {day.isToday && !day.completed && (
                  <span className="absolute inset-0 rounded-full border border-orange-500 animate-ping opacity-75" />
                )}
                {day.day === 'S' && day.isToday ? 'Today' : day.day}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
