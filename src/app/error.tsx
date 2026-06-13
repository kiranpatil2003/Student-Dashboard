'use client';

import React, { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application boundary error:', error);
  }, [error]);

  return (
    <div className="flex min-h-screen bg-background items-center justify-center p-6 text-foreground">
      <div className="bg-card border border-red-500/30 rounded-xl p-8 max-w-md w-full text-center space-y-6">
        <div className="mx-auto h-12 w-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Something went wrong</h2>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {error.message || 'An unexpected error occurred. Please check your network or try again.'}
          </p>
        </div>
        <button
          onClick={() => reset()}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer border border-zinc-700"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
