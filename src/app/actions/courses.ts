import { supabase } from '@/lib/supabase';

export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface FetchCoursesResponse {
  courses: Course[];
  isMock: boolean;
  error?: string | null;
}

export async function fetchCourses(): Promise<FetchCoursesResponse> {
  // Simulating delay for loading UI skeleton demo
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!supabase) {
    return {
      courses: [],
      isMock: false,
      error: 'Supabase client is not initialized. Please verify your environment keys in .env.local.',
    };
  }

  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('--- SUPABASE QUERY LOG ---');
    console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Key length:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.length);
    console.log('Data returned:', data);
    console.log('Error returned:', error);
    console.log('--------------------------');

    if (error) {
      console.error('Supabase query error:', error.message);
      return {
        courses: [],
        isMock: false,
        error: `Database connection error: ${error.message}`,
      };
    }

    return {
      courses: (data as Course[]) || [],
      isMock: false,
      error: null,
    };
  } catch (err: any) {
    console.error('Failed to fetch from Supabase:', err);
    return {
      courses: [],
      isMock: false,
      error: `Network error: ${err.message || err}`,
    };
  }
}
