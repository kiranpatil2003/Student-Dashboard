'use client';

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Course } from '@/app/actions/courses';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  // Dynamically map icon name to Lucide React component
  const getIcon = (name: string) => {
    // Resolve Lucide icons by name
    const IconComponent = (Icons as any)[name];
    if (IconComponent) {
      return <IconComponent className="h-6 w-6" />;
    }
    return <Icons.BookOpen className="h-6 w-6" />;
  };

  return (
    <div className="flex flex-col h-full justify-between gap-6">
      {/* Icon and Progress Info */}
      <div className="flex justify-between items-start">
        <div className="p-3 bg-zinc-800 rounded-lg text-indigo-400 border border-zinc-700">
          {getIcon(course.icon_name)}
        </div>
        <span className="text-xs font-semibold text-zinc-500 bg-zinc-800/40 border border-zinc-800/80 px-2 py-1 rounded-md">
          Active Course
        </span>
      </div>

      {/* Course Title */}
      <div className="space-y-1">
        <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">
          {course.title}
        </h3>
        <p className="text-xs text-zinc-500">
          Started on {new Date(course.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>
      </div>

      {/* Animated Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-zinc-400 font-medium">Course Progress</span>
          <span className="text-white font-bold">{course.progress}%</span>
        </div>
        <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{
              type: 'spring',
              stiffness: 80,
              damping: 15,
              delay: 0.2,
            }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.5)]"
          />
        </div>
      </div>
    </div>
  );
}
