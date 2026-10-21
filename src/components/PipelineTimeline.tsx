import React from 'react';
import { ArrowRight, RotateCcw, Lock } from 'lucide-react';

interface PipelineTimelineProps {
  currentSimulatedStep?: number;
  isRetrying?: boolean;
}

export const PipelineTimeline: React.FC<PipelineTimelineProps> = ({
  currentSimulatedStep,
  isRetrying = true,
}) => {
  return (
    <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3" id="section-pipeline">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <span>🔄</span>
          <span>Chu Trình Dữ Liệu Khép Kín (E2E)</span>
        </h3>
        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full font-mono">
          Anti-OOM Design
        </span>
      </div>

      <div className="space-y-0 relative">
        {/* Step 1 */}
        <div
          className={`relative pl-6 border-l-2 border-orange-500/50 pb-3 transition-colors ${
            currentSimulatedStep === 1 ? 'bg-orange-500/10 rounded-r-xl p-2 pl-6' : ''
          }`}
        >
          <span
            className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-orange-500 flex items-center justify-center text-[9px] font-bold text-orange-400 ${
              currentSimulatedStep === 1 ? 'ring-4 ring-orange-500/30' : ''
            }`}
          >
            1
          </span>
          <p className="text-xs font-semibold text-slate-200">Webhook Trigger ➔ Nạp Master Payload JSON</p>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
            Khóa Concurrency = 1. Song song gọi Pinecone Vector Search để bổ sung ngữ cảnh tri thức.
          </p>
        </div>

        {/* Step 2 */}
        <div
          className={`relative pl-6 border-l-2 border-blue-500/50 pb-3 transition-colors ${
            currentSimulatedStep === 2 ? 'bg-blue-500/10 rounded-r-xl p-2 pl-6' : ''
          }`}
        >
          <span
            className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-blue-500 flex items-center justify-center text-[9px] font-bold text-blue-400 ${
              currentSimulatedStep === 2 ? 'ring-4 ring-blue-500/30' : ''
            }`}
          >
            2
          </span>
          <p className="text-xs font-semibold text-slate-200">Gọi Dify Cloud ➔ Suy Luận &amp; Điều Phối MCP</p>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
            Payload chỉ gửi Metadata &amp; URL (không ôm file nhị phân). Dify sinh seed &amp; phát lệnh tới VPS qua Tunnel.
          </p>
        </div>

        {/* Step 3 */}
        <div
          className={`relative pl-6 border-l-2 border-rose-500/50 pb-3 transition-colors ${
            currentSimulatedStep === 3 ? 'bg-rose-500/10 rounded-r-xl p-2 pl-6' : ''
          }`}
        >
          <span
            className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-rose-500 flex items-center justify-center text-[9px] font-bold text-rose-400 ${
              currentSimulatedStep === 3 ? 'ring-4 ring-rose-500/30' : ''
            }`}
          >
            3
          </span>
          <p className="text-xs font-semibold text-slate-200">Hetzner VPS Render ➔ Kết Xuất Đệm /tmp</p>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
            ArtCraft CLI dựng hình với 8GB Swap đệm an toàn, lưu kết quả ra <code className="text-rose-300 font-mono text-[10px]">/tmp/artcraft_buffer</code>.
          </p>
        </div>

        {/* Step 4 */}
        <div
          className={`relative pl-6 border-l-2 border-amber-500/50 pb-3 transition-colors ${
            currentSimulatedStep === 4 ? 'bg-amber-500/10 rounded-r-xl p-2 pl-6' : ''
          }`}
        >
          <span
            className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-500 flex items-center justify-center text-[9px] font-bold text-amber-400 ${
              currentSimulatedStep === 4 ? 'ring-4 ring-amber-500/30' : ''
            }`}
          >
            4
          </span>
          <p className="text-xs font-semibold text-slate-200">Bơm R2 ➔ Nhận Public URL ➔ Dọn Dẹp /tmp</p>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
            n8n chuyển file lên Cloudflare R2, cập nhật key URL vào Master Payload và chạy lệnh <code className="text-amber-300 font-mono text-[10px]">rm -f</code> ngay.
          </p>
        </div>

        {/* Step 5 */}
        <div
          className={`relative pl-6 border-l-2 border-rose-500/80 transition-colors ${
            currentSimulatedStep === 5 ? 'bg-rose-500/10 rounded-r-xl p-2 pl-6' : ''
          }`}
        >
          <span
            className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-rose-500 flex items-center justify-center text-[9px] font-bold text-rose-400 ${
              isRetrying ? 'animate-pulse' : ''
            }`}
          >
            5
          </span>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-rose-200">QA Đánh Giá ➔ REJECTED (Điểm 6.2/10)</p>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold animate-bounce">
              RETRYING
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
            Chưa đạt chuẩn chất lượng mỹ thuật. n8n tự động kích hoạt nhánh Retry, bảo toàn Concurrency = 1 để tránh xung đột tải.
          </p>

          {/* Loopback Sub-Card */}
          <div className="mt-2 p-2 rounded-xl bg-rose-950/30 border border-rose-500/30 flex items-center justify-between text-[11px]">
            <span className="text-rose-300 flex items-center gap-1.5 font-medium">
              <RotateCcw className="w-3.5 h-3.5 text-rose-400 animate-spin" />
              <span>Loopback: Vòng ngược về Bước 2 với Seed &amp; Prompt mới</span>
            </span>
            <span className="text-[9px] font-mono text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30 flex items-center gap-1">
              <Lock className="w-2.5 h-2.5" />
              Queue Locked
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
