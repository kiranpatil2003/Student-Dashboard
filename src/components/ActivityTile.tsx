'use client';

import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface ActivityDay {
  date: string;
  count: number; // number of activities
  level: 0 | 1 | 2 | 3 | 4; // intensity
}

export default function ActivityTile() {
  const [hoveredDay, setHoveredDay] = useState<ActivityDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Generate mock activity data for 20 weeks (7 rows x 20 cols)
  const rows = 7;
  const cols = 22; // 22 weeks of learning history fits beautifully in the tile
  const totalDays = rows * cols;
  
  const daysOfWeek = ['M', '', 'W', '', 'F', '', 'S'];

  // Seed static random activities
  const generateMockActivity = (): ActivityDay[] => {
    const data: ActivityDay[] = [];
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() - totalDays);

    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(baseDate.getDate() + i);

      // Seed deterministic activity pattern based on day of week and index
      const dayNum = currentDate.getDay();
      let count = 0;
      if (dayNum !== 0 && dayNum !== 6) { // study more on weekdays
        count = Math.floor(((i * 7 + dayNum * 13) % 7) * 0.8);
      } else {
        count = Math.floor(((i * 3 + dayNum * 2) % 4) * 0.5);
      }

      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count > 4) level = 4;
      else if (count > 2) level = 3;
      else if (count > 1) level = 2;
      else if (count > 0) level = 1;

      data.push({
        date: currentDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        count,
        level,
      });
    }
    return data;
  };

  const activityData = generateMockActivity();

  // Grid styling matching the intensity levels
  const levelColors = {
    0: 'bg-zinc-800 hover:bg-zinc-700',
    1: 'bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-900/30',
    2: 'bg-indigo-800 hover:bg-indigo-750',
    3: 'bg-indigo-600 hover:bg-indigo-550',
    4: 'bg-indigo-400 hover:bg-indigo-350',
  };

  const handleMouseEnter = (day: ActivityDay, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const container = e.currentTarget.parentElement?.parentElement?.getBoundingClientRect();
    if (container) {
      setTooltipPos({
        x: rect.left - container.left + rect.width / 2,
        y: rect.top - container.top - 42,
      });
    }
    setHoveredDay(day);
  };

  return (
    <div className="flex flex-col h-full justify-between gap-5 relative">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-400" />
          <h2 className="font-bold text-white text-base">Learning Intensity</h2>
        </div>
        <div className="text-xs text-zinc-500 font-medium">Past 150 Days</div>
      </div>

      {/* Grid Container */}
      <div className="flex-1 flex flex-col justify-center relative min-h-[120px]">
        {/* Tooltip */}
        {hoveredDay && (
          <div
            className="absolute z-30 bg-zinc-900 border border-border text-[11px] text-white px-2.5 py-1 rounded shadow-xl pointer-events-none -translate-x-1/2 transition-all duration-150"
            style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
          >
            <span className="font-bold text-indigo-400">{hoveredDay.count} hours</span> on {hoveredDay.date}
          </div>
        )}

        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
          {/* Day of week labels */}
          <div className="grid grid-rows-7 gap-1.5 pr-1 select-none text-[10px] text-zinc-500 font-medium h-fit pt-[2px]">
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className="h-3 flex items-center justify-end w-3">
                {day}
              </div>
            ))}
          </div>

          {/* Grid Blocks */}
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 h-fit">
            {activityData.map((day, idx) => (
              <button
                key={idx}
                className={`h-3 w-3 rounded-[2px] transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-400 ${
                  levelColors[day.level]
                }`}
                onMouseEnter={(e) => handleMouseEnter(day, e)}
                onMouseLeave={() => setHoveredDay(null)}
                aria-label={`Activity score: ${day.count} on ${day.date}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Footer / Legend */}
      <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-800">
        <div>Total study time: <span className="text-zinc-300 font-medium">148 hours</span></div>
        <div className="flex items-center gap-1.5 select-none">
          <span>Less</span>
          <div className="h-2.5 w-2.5 rounded-[1px] bg-zinc-800" />
          <div className="h-2.5 w-2.5 rounded-[1px] bg-indigo-900/60" />
          <div className="h-2.5 w-2.5 rounded-[1px] bg-indigo-800" />
          <div className="h-2.5 w-2.5 rounded-[1px] bg-indigo-600" />
          <div className="h-2.5 w-2.5 rounded-[1px] bg-indigo-400" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
