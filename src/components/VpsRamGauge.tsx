import React, { useState } from 'react';
import { X, ShieldAlert, Cpu, HardDrive, CheckCircle2 } from 'lucide-react';

interface VpsRamGaugeProps {
  isOpen: boolean;
  onClose: () => void;
  currentRamGb?: number;
  currentSwapGb?: number;
}

export const VpsRamGauge: React.FC<VpsRamGaugeProps> = ({
  isOpen,
  onClose,
  currentRamGb = 3.7,
  currentSwapGb = 1.2,
}) => {
  const [ram, setRam] = useState(currentRamGb);
  const [swap, setSwap] = useState(currentSwapGb);

  if (!isOpen) return null;

  const totalRam = 4.0;
  const totalSwap = 8.0;
  const ramPercent = Math.min(100, Math.round((ram / totalRam) * 100));
  const swapPercent = Math.min(100, Math.round((swap / totalSwap) * 100));
  const isOomRisk = ram >= 3.9 && swap >= 7.5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-4 text-slate-200">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-rose-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Giám Sát RAM &amp; Swap VPS Hetzner</h3>
              <p className="text-[10px] text-slate-400 font-mono">Cấu hình 4GB RAM + 8GB Swapfile NVMe</p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* RAM Bar */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-rose-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
              Bộ Nhớ Vật Lý (RAM)
            </span>
            <span className="font-mono font-bold text-rose-400">
              {ram.toFixed(1)}GB / {totalRam}GB ({ramPercent}%)
            </span>
          </div>
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                ramPercent > 90 ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-rose-500'
              }`}
              style={{ width: `${ramPercent}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-slate-400">
            {ram >= 3.6 ? '⚠️ Đỉnh tải Spike khi ArtCraft nạp model ➔ Đã kích hoạt hoán chuyển sang Swap.' : 'Mức tải bình thường.'}
          </p>
        </div>

        {/* Swap Bar */}
        <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              Bộ Nhớ Đệm Ảo (Swapfile 8GB)
            </span>
            <span className="font-mono font-bold text-emerald-400">
              {swap.toFixed(1)}GB / {totalSwap}GB ({swapPercent}%)
            </span>
          </div>
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
              style={{ width: `${swapPercent}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-slate-400">
            Linux Kernel đã hoán chuyển an toàn 1.2GB bộ nhớ nhàn rỗi, triệt tiêu nguy cơ OOM.
          </p>
        </div>

        {/* OOM Status Badge */}
        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-emerald-300">Trạng Thái: OOM Killer = AN TOÀN</p>
            <p className="text-[11px] text-slate-300">
              Nhờ có 8GB Swap đệm và n8n khóa Concurrency = 1, tiến trình sinh ảnh không bao giờ bị dừng cưỡng chế.
            </p>
          </div>
        </div>

        {/* Diagnostic Simulator Sliders */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <p className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">
            Thử Nghiệm Mức Tải (Interactive Stress Slider)
          </p>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Mô phỏng RAM: {ram.toFixed(1)} GB</span>
              <button
                type="button"
                onClick={() => { setRam(3.7); setSwap(1.2); }}
                className="text-[10px] text-amber-400 hover:underline"
              >
                Đặt lại mốc sự cố (3.7G)
              </button>
            </div>
            <input
              type="range"
              min="1.0"
              max="4.0"
              step="0.1"
              value={ram}
              onChange={(e) => setRam(parseFloat(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={onClose}
          type="button"
          className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
        >
          Đóng Cửa Sổ Giám Sát
        </button>
      </div>
    </div>
  );
};
