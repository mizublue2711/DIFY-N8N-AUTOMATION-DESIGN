import React, { useState } from 'react';
import { ShieldCheck, Check, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';

export const SelfHealingCard: React.FC = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-950/40 to-slate-900 border border-amber-500/30 shadow-lg space-y-3 glow-amber">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center gap-2">
          <span className="text-base">🛠️</span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Cơ Chế Tự Phục Hồi (Self-Healing Diagnostic)
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-semibold">
            Autonomous
          </span>
          <button type="button" className="text-slate-400 hover:text-slate-200">
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="space-y-2 text-xs text-slate-300">
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <p className="font-semibold text-slate-200 flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Tại sao VPS 4GB không bị sập (No Crash)?</span>
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Khi ArtCraft Model tăng đột biến lên 3.7GB RAM, Linux Kernel tự động hoán chuyển 1.2GB trang nhớ nhàn rỗi vào <b className="text-slate-200">Swapfile 8GB</b>. Không kích hoạt OOM Killer, tiến trình kết xuất vẫn hoàn tất trọn vẹn.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <p className="font-semibold text-slate-200 flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Quy trình dọn dẹp và vòng lặp tự động (Zero-leak)</span>
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              File lỗi trong <code className="text-amber-300 font-mono bg-slate-900 px-1 py-0.5 rounded">/tmp/artcraft_buffer</code> bị xóa sạch ngay trước khi yêu cầu Dify tái tạo với <code className="text-blue-300 font-mono bg-slate-900 px-1 py-0.5 rounded">global_seed: 8492042</code>, hoàn toàn không cần can thiệp con người thủ công.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
