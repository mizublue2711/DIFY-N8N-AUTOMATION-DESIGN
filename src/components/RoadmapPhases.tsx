import React, { useState } from 'react';
import { RoadmapPhase } from '../types/system';
import { CodeBlock } from './CodeBlock';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface RoadmapPhasesProps {
  phases: RoadmapPhase[];
  onToggleTask?: (phaseId: number, taskId: string) => void;
}

export const RoadmapPhases: React.FC<RoadmapPhasesProps> = ({ phases, onToggleTask }) => {
  const [collapsedPhases, setCollapsedPhases] = useState<Record<number, boolean>>({});

  const togglePhaseCollapse = (id: number) => {
    setCollapsedPhases(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getColorClasses = (color: RoadmapPhase['themeColor']) => {
    switch (color) {
      case 'rose':
        return {
          border: 'border-rose-500/30',
          title: 'text-rose-400',
          badge: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
          accent: 'accent-rose-500'
        };
      case 'blue':
        return {
          border: 'border-blue-500/30',
          title: 'text-blue-400',
          badge: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
          accent: 'accent-blue-500'
        };
      case 'amber':
        return {
          border: 'border-amber-500/30',
          title: 'text-amber-400',
          badge: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
          accent: 'accent-amber-500'
        };
      case 'emerald':
        return {
          border: 'border-emerald-500/30',
          title: 'text-emerald-400',
          badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
          accent: 'accent-emerald-500'
        };
    }
  };

  return (
    <section className="space-y-3" id="section-roadmap">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
            2
          </span>
          <h2 className="text-base font-bold text-white tracking-wide">KẾ HOẠCH HÀNH ĐỘNG ƯU TIÊN</h2>
        </div>
        <span className="text-[10px] text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded font-mono">
          Không nhảy cóc
        </span>
      </div>

      {/* Render 4 Phases */}
      {phases.map((phase) => {
        const colors = getColorClasses(phase.themeColor);
        const isCollapsed = !!collapsedPhases[phase.id];
        const completedCount = phase.tasks.filter(t => t.completed).length;

        return (
          <div
            key={phase.id}
            className={`bg-slate-900/90 rounded-2xl p-4 border ${colors.border} space-y-3 transition-all`}
          >
            {/* Phase Header */}
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => togglePhaseCollapse(phase.id)}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">🎯</span>
                <div>
                  <h3 className={`text-xs font-bold uppercase tracking-wider ${colors.title}`}>
                    {phase.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {phase.subtitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded border ${colors.badge} text-[10px] font-bold font-mono`}>
                  {phase.priorityLabel}
                </span>
                <button type="button" className="text-slate-400 hover:text-slate-200">
                  {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Tasks list */}
            {!isCollapsed && (
              <div className="space-y-2 text-xs">
                {phase.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 transition-colors hover:border-slate-700"
                  >
                    <div className="flex items-center justify-between font-semibold text-slate-200">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => onToggleTask && onToggleTask(phase.id, task.id)}
                          className={`${colors.accent} rounded w-3.5 h-3.5 cursor-pointer`}
                        />
                        <span className={task.completed ? 'text-slate-200' : 'text-slate-400 line-through'}>
                          {task.title}
                        </span>
                      </label>
                      {task.badge && (
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                            task.badgeColor === 'rose'
                              ? 'text-rose-400 border-rose-500/30 bg-rose-500/10'
                              : task.badgeColor === 'emerald'
                              ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                              : 'text-slate-400 border-slate-700 bg-slate-800'
                          }`}
                        >
                          {task.badge}
                        </span>
                      )}
                    </div>

                    {task.desc && (
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {task.desc}
                      </p>
                    )}

                    {task.codeSnippet && (
                      <CodeBlock code={task.codeSnippet} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};
