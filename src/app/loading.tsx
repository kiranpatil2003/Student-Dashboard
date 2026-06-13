import React from 'react';

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar Placeholder */}
      <aside className="hidden md:flex flex-col w-20 lg:w-64 border-r border-border bg-card p-4 space-y-6 animate-pulse shrink-0">
        <div className="h-10 bg-zinc-800 rounded-lg w-3/4" />
        <div className="space-y-4 pt-10">
          <div className="h-8 bg-zinc-800 rounded-lg" />
          <div className="h-8 bg-zinc-800 rounded-lg" />
          <div className="h-8 bg-zinc-800 rounded-lg" />
          <div className="h-8 bg-zinc-800 rounded-lg" />
        </div>
      </aside>

      {/* Main Grid Content Placeholder */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-background animate-pulse">
          <div className="h-6 bg-zinc-800 rounded-md w-1/4" />
          <div className="h-8 bg-zinc-800 rounded-full w-24" />
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto animate-pulse">
            {/* Hero Tile Skeleton */}
            <div className="bg-card border border-border rounded-xl p-6 col-span-1 md:col-span-2 h-[220px] space-y-6">
              <div className="space-y-2">
                <div className="h-4 bg-zinc-800 rounded w-28" />
                <div className="h-8 bg-zinc-800 rounded w-1/2" />
                <div className="h-4 bg-zinc-800 rounded w-3/4" />
              </div>
              <div className="h-12 bg-zinc-800 rounded-xl" />
            </div>

            {/* Activity Tile Skeleton */}
            <div className="bg-card border border-border rounded-xl p-6 h-[220px] space-y-6">
              <div className="flex justify-between">
                <div className="h-5 bg-zinc-800 rounded w-1/3" />
                <div className="h-4 bg-zinc-800 rounded w-1/4" />
              </div>
              <div className="h-20 bg-zinc-800 rounded" />
              <div className="h-4 bg-zinc-800 rounded w-1/2" />
            </div>

            {/* Course Card Skeletons */}
            {[1, 2, 3, 4].map((id) => (
              <div
                key={id}
                className="bg-card border border-border rounded-xl p-6 h-[240px] flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <div className="h-12 w-12 bg-zinc-800 rounded-lg" />
                  <div className="h-5 bg-zinc-800 rounded w-20" />
                </div>
                <div className="space-y-2">
                  <div className="h-6 bg-zinc-800 rounded w-3/4" />
                  <div className="h-4 bg-zinc-800 rounded w-1/3" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-zinc-800 rounded w-1/4" />
                  <div className="h-2 bg-zinc-800 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
