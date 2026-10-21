import React from 'react';
import { ArrowDown, Cpu, Sparkles, Server, Zap, CheckCircle2 } from 'lucide-react';

interface ArchitecturePillarsProps {
  onPillarClick?: (pillar: string) => void;
  activePillar?: string;
  isSimulating?: boolean;
  highlightedPillar?: 'n8n' | 'dify' | 'vps' | null;
}

export const ArchitecturePillars: React.FC<ArchitecturePillarsProps> = ({
  highlightedPillar,
}) => {
  return (
    <section className="space-y-3" id="section-architecture">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30">
            1
          </span>
          <h2 className="text-base font-bold text-white tracking-wide">3 TẦNG KIẾN TRÚC MỚI</h2>
        </div>
        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
          Hybrid System
        </span>
      </div>

      {/* ========================================================= */}
      {/* Pillar 1: n8n Orchestrator */}
      {/* ========================================================= */}
      <div
        className={`relative bg-gradient-to-b from-slate-900/90 to-slate-950/90 rounded-2xl p-4 border transition-all duration-300 ${
          highlightedPillar === 'n8n'
            ? 'border-orange-400 shadow-[0_0_35px_rgba(255,109,90,0.5)] scale-[1.01]'
            : 'border-orange-500/30 glow-orange'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-black text-sm shadow-inner">
              n8n
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                n8n Orchestration
                {highlightedPillar === 'n8n' && (
                  <span className="text-[9px] px-1.5 py-0.2 bg-orange-500/20 text-orange-300 rounded animate-pulse">Đang xử lý</span>
                )}
              </h3>
              <p className="text-[10px] text-orange-300/80 font-mono font-medium">Trạm Điều Phối &amp; Quản Trị Pipeline</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-orange-500/10 text-orange-300 border border-orange-500/20 font-semibold">
            Concurrency = 1
          </span>
        </div>

        <div className="space-y-2 text-xs">
          {/* Item A */}
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/90 transition-colors">
            <span className="text-orange-400 mt-0.5 text-sm">📥</span>
            <div>
              <p className="font-semibold text-slate-200">Webhook Trigger &amp; Master Payload</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Khởi tạo Payload JSON chuẩn hóa, giới hạn xử lý tuần tự 1 luồng duy nhất tránh nghẽn RAM.
              </p>
            </div>
          </div>

          {/* Item B */}
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/90 transition-colors">
            <span className="text-orange-400 mt-0.5 text-sm">🌲</span>
            <div>
              <p className="font-semibold text-slate-200">Pinecone Vector Search (RAG)</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Truy vấn ngữ cảnh &amp; tri thức đối ứng gắn kèm vào Master Payload.
              </p>
            </div>
          </div>

          {/* Item C */}
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/90 transition-colors">
            <span className="text-orange-400 mt-0.5 text-sm">☁️</span>
            <div>
              <p className="font-semibold text-slate-200">Bơm Xả Cloudflare R2 &amp; Dọn /tmp</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Đọc buffer nhị phân tải lên R2, ghi đè public URL vào Payload và xóa sạch đệm VPS.
              </p>
            </div>
          </div>

          {/* Item D: QA Node */}
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-rose-950/40 border border-rose-500/50 shadow-inner">
            <span className="text-rose-400 mt-0.5 text-sm">⚠️</span>
            <div className="w-full">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-rose-200">QA Vòng 1 &amp; 2 (Gemini / Claude)</p>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
                  Điểm: 6.2/10 (Fail)
                </span>
              </div>
              <p className="text-[11px] text-rose-300/80 mt-0.5 leading-relaxed">
                Tiêu chuẩn ≥ 8.5. Kích hoạt <span className="text-amber-300 font-semibold">Retry Logic Node</span>: Tự động điều chỉnh Prompt, cấp seed mới &amp; phát lệnh render lại.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Connector Badge 1 */}
      <div className="flex justify-center -my-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-[10px] text-slate-300 font-mono shadow-md">
          <span>HTTP Request (Chỉ gửi Metadata &amp; Public URL)</span>
          <span className="text-blue-400 animate-bounce">↓</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* Pillar 2: Dify Cloud */}
      {/* ========================================================= */}
      <div
        className={`relative bg-gradient-to-b from-slate-900/90 to-slate-950/90 rounded-2xl p-4 border transition-all duration-300 ${
          highlightedPillar === 'dify'
            ? 'border-blue-400 shadow-[0_0_35px_rgba(22,119,255,0.5)] scale-[1.01]'
            : 'border-blue-500/30 glow-blue'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-black text-sm shadow-inner">
              Dify
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                Dify Cloud
                {highlightedPillar === 'dify' && (
                  <span className="text-[9px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded animate-pulse">Suy luận</span>
                )}
              </h3>
              <p className="text-[10px] text-blue-300/80 font-mono font-medium">Bộ Não Suy Luận &amp; Điều Phối Agent</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/20 font-semibold">
            Agentic Core
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/90 transition-colors">
            <span className="text-blue-400 mt-0.5 text-sm">🧠</span>
            <div>
              <p className="font-semibold text-slate-200">Tiếp Nhận Payload &amp; Sinh Seed</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Suy luận bước kế tiếp, sinh mã <code className="text-blue-300 bg-blue-950 px-1 py-0.5 rounded font-mono">global_seed</code> để đồng nhất phong cách.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/90 transition-colors">
            <span className="text-blue-400 mt-0.5 text-sm">🔌</span>
            <div>
              <p className="font-semibold text-slate-200">MCP Client qua Cloudflare Tunnel</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Kích hoạt Tool gọi MCP Server cục bộ bảo mật qua SSE mà không cần mở port public.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-amber-950/40 border border-amber-500/40 shadow-inner">
            <span className="text-amber-400 mt-0.5 text-sm">🔄</span>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-amber-200">Tái Cấu Trúc Seed &amp; Refine Prompt</p>
                <span className="text-[9px] font-mono px-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">Retry Injected</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                Nhận phản hồi từ QA, sinh mã seed mới <code className="text-amber-300 bg-slate-950 px-1 py-0.5 rounded font-mono">seed: 8492042</code> và tự động gia cố độ tương phản trong system prompt.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Connector Badge 2 */}
      <div className="flex justify-center -my-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-[10px] text-slate-300 font-mono shadow-md">
          <span>Cloudflare Tunnel SSE (Bảo Mật 2 Chiều)</span>
          <span className="text-rose-400 animate-bounce">↓</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* Pillar 3: Hetzner VPS */}
      {/* ========================================================= */}
      <div
        className={`relative bg-gradient-to-b from-slate-900/90 to-slate-950/90 rounded-2xl p-4 border transition-all duration-300 ${
          highlightedPillar === 'vps'
            ? 'border-rose-400 shadow-[0_0_35px_rgba(244,63,94,0.5)] scale-[1.01]'
            : 'border-rose-500/30 glow-purple'
        }`}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 font-black text-sm shadow-inner">
              VPS
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                VPS Hetzner 4GB
                {highlightedPillar === 'vps' && (
                  <span className="text-[9px] px-1.5 py-0.2 bg-rose-500/20 text-rose-300 rounded animate-pulse">Render CLI</span>
                )}
              </h3>
              <p className="text-[10px] text-rose-300/80 font-mono font-medium">Cơ Bắp Thực Thi &amp; Local Compute</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/20 font-semibold">
            Swap 8GB Active
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/90 transition-colors">
            <span className="text-rose-400 mt-0.5 text-sm">🛡️</span>
            <div>
              <p className="font-semibold text-slate-200">MCP Server Wrapper (Node/Rust)</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Expose tool <code className="text-rose-300 bg-rose-950 px-1 py-0.5 rounded font-mono">generate_banner_artcraft</code> đón nhận tham số từ Dify.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/90 transition-colors">
            <span className="text-rose-400 mt-0.5 text-sm">⚙️</span>
            <div>
              <p className="font-semibold text-slate-200">ArtCraft Rust CLI (Headless Mode)</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Chu kỳ chuẩn: <span className="text-rose-300 font-semibold">Load Model ➔ Render Banner ➔ Unload giải phóng RAM</span>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-950/60 border border-emerald-500/40">
            <span className="text-emerald-400 mt-0.5 text-sm">🛡️</span>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-slate-200">Buffer Cục Bộ &amp; Swap 8GB Bảo Vệ OOM</p>
                <span className="text-[9px] font-mono px-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  OOM Prevented
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                Swap 8GB đã hấp thụ thành công đỉnh tải spike RAM (3.7GB), không sập VPS. Lệnh Purge <code className="font-mono text-amber-300">/tmp/artcraft_buffer</code> đã xóa sạch file artifact lỗi trước khi nạp lượt retry.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
