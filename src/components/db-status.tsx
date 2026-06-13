import React from 'react';
import { Database, Link2, WifiOff } from 'lucide-react';

interface DbStatusProps {
  isMock: boolean;
  error?: string | null;
}

export default function DbStatus({ isMock, error }: DbStatusProps) {
  return (
    <div className="flex items-center gap-2 select-none">
      {isMock ? (
        <div className="group relative flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-xs font-medium text-yellow-400">
          <WifiOff className="h-3.5 w-3.5" />
          <span>Demo Mode</span>

          {/* Hover tooltip with detailed instructions */}
          <div className="absolute right-0 top-full mt-2 w-72 p-3 bg-zinc-900 border border-border text-zinc-400 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none text-[11px] leading-relaxed z-50">
            <span className="font-bold text-white block mb-1">Local Mock Data Loaded</span>
            {error ? (
              <span className="text-yellow-500 block mb-1.5">{error}</span>
            ) : (
              <span className="block mb-1.5">Missing environment variables.</span>
            )}
            To fetch live data, create a <code className="text-white bg-zinc-800 px-1 py-0.5 rounded">.env.local</code> file at root containing:
            <pre className="mt-1.5 p-1.5 bg-black rounded text-[10px] overflow-x-auto text-zinc-300">
{`NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...`}
            </pre>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400">
          <Database className="h-3.5 w-3.5" />
          <span>Supabase Live</span>
        </div>
      )}
    </div>
  );
}
