import React from 'react';
import { fetchCourses } from '@/app/actions/courses';
import DashboardClient from '@/components/DashboardClient';

// Force dynamic execution to check Supabase or env configuration on load
export const dynamic = 'force-dynamic';

export default async function Home() {
  const { courses, isMock, error } = await fetchCourses();

  return (
    <DashboardClient
      initialCourses={courses}
      isMock={isMock}
      error={error}
    />
  );
}
