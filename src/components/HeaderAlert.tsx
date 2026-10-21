import React from 'react';
import { AlertTriangle, Play, RefreshCw, Cpu, Activity } from 'lucide-react';

interface HeaderAlertProps {
  jobId: string;
  attempt: number;
  maxAttempts: number;
  ramSpikeText: string;
  autoRecoveryText: string;
  onOpenSimulator: () => void;
  onOpenRamGauge: () => void;
  onInspectPayload: () => void;
}

export const HeaderAlert: React.FC<HeaderAlertProps> = ({
  jobId,
  attempt,
  maxAttempts,
  ramSpikeText,
  autoRecoveryText,
  onOpenSimulator,
  onOpenRamGauge,
  onInspectPayload,
}) => {
  return (
    <div className="space-y-4">
      {/* Top Badge & Incident Alert Card */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-rose-950/80 via-amber-950/70 to-slate-900 border border-rose-500/50 shadow-lg space-y-2.5 animate-pulse glow-rose">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              SYSTEM INCIDENT ALERT
            </span>
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 inline" />
              QA REJECTED & RETRY TRIGGERED
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
              Attempt {attempt}/{maxAttempts}
            </span>
            <button
              onClick={onOpenSimulator}
              type="button"
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 flex items-center gap-1 transition-all"
            >
              <Play className="w-2.5 h-2.5 fill-current" />
              Mô phỏng
            </button>
          </div>
        </div>

        {/* 3 Metric Tiles */}
        <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
          <button
            onClick={onInspectPayload}
            type="button"
            className="p-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-slate-300 text-left transition-colors cursor-pointer group"
          >
            <span className="text-slate-500 block text-[9px] flex items-center justify-between">
              Job ID
              <span className="text-[8px] text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">Soi ➔</span>
            </span>
            <span className="text-amber-400 font-bold group-hover:underline">{jobId}</span>
          </button>

          <button
            onClick={onOpenRamGauge}
            type="button"
            className="p-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-rose-500/30 text-rose-300 text-left transition-colors cursor-pointer group"
          >
            <span className="text-slate-500 block text-[9px] flex items-center justify-between">
              VPS RAM Spike
              <Activity className="w-2.5 h-2.5 text-rose-400" />
            </span>
            <span className="font-bold text-rose-400 group-hover:underline">{ramSpikeText}</span>
          </button>

          <button
            onClick={onOpenSimulator}
            type="button"
            className="p-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-emerald-500/30 text-emerald-300 text-left transition-colors cursor-pointer group"
          >
            <span className="text-slate-500 block text-[9px] flex items-center justify-between">
              Auto-Recovery
              <RefreshCw className="w-2.5 h-2.5 text-emerald-400 animate-spin" />
            </span>
            <span className="font-bold text-emerald-400 group-hover:underline">{autoRecoveryText}</span>
          </button>
        </div>
      </div>

      {/* Main Spec Title & Header */}
      <header className="text-center space-y-2 pt-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500/20 via-blue-500/20 to-emerald-500/20 border border-slate-800 text-slate-300 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>AGENTIC SYSTEM SPEC 2.0</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          Sơ Đồ Kiến Trúc &amp; Kế Hoạch
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed font-medium max-w-sm mx-auto">
          Hệ thống tự động hóa Hybrid: n8n điều phối + Dify AI + VPS Hetzner chạy ArtCraft Model
        </p>
      </header>
    </div>
  );
};
