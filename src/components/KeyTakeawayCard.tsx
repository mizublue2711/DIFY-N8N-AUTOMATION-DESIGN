import React from 'react';

export const KeyTakeawayCard: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Key Takeaway / Safety Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/30 text-xs space-y-2 glow-emerald">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <span>💡</span>
          <span>Nguyên Tắc Vàng Khi Vận Hành</span>
        </div>
        <p className="text-slate-300 leading-relaxed text-[11px] space-y-1">
          <span className="block">
            1. <b className="text-white">Payload siêu nhẹ:</b> Không bao giờ truyền binary qua HTTP / Tunnel, chỉ truyền Public R2 URL &amp; Metadata.
          </span>
          <span className="block">
            2. <b className="text-white">Bộ nhớ an toàn:</b> Swap 8GB + Concurrency = 1 bảo đảm VPS 4GB Hetzner chạy bền bỉ không bị OOM Killer dừng tiến trình.
          </span>
          <span className="block">
            3. <b className="text-white">Zero-leak:</b> Dọn sạch thư mục buffer ngay sau khi R2 xác nhận lưu trữ thành công.
          </span>
        </p>
      </div>

      {/* Footer */}
      <footer className="text-center text-[11px] text-slate-500 py-2 font-mono">
        Hybrid Agentic Workflow 2.0 • Trực quan hóa bởi Stitch
      </footer>
    </div>
  );
};
