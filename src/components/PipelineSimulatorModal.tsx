import React, { useState, useEffect } from 'react';
import { X, Play, RotateCcw, CheckCircle2, AlertTriangle, ArrowRight, Activity, Terminal, Shield } from 'lucide-react';
import { MasterPayload } from '../types/system';

interface PipelineSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdatePayload?: (payload: MasterPayload) => void;
}

export const PipelineSimulatorModal: React.FC<PipelineSimulatorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [attempt, setAttempt] = useState<number>(1);
  const [ramSpike, setRamSpike] = useState<number>(1.8);
  const [swapSpike, setSwapSpike] = useState<number>(0.2);
  const [logs, setLogs] = useState<string[]>([]);
  const [qaScore, setQaScore] = useState<number | null>(null);
  const [isLoopingBack, setIsLoopingBack] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setIsRunning(false);
      setCurrentStep(0);
      setAttempt(1);
      setLogs([]);
      setQaScore(null);
      setIsLoopingBack(false);
      setIsFinished(false);
    }
  }, [isOpen]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const startSimulation = () => {
    setIsRunning(true);
    setIsFinished(false);
    setCurrentStep(1);
    setAttempt(1);
    setLogs([]);
    setRamSpike(1.8);
    setSwapSpike(0.2);
    setQaScore(null);
    setIsLoopingBack(false);

    addLog('🚀 [n8n]: Webhook Trigger kích hoạt #JOB-98240.');
    addLog('🔒 [n8n]: Khóa Concurrency Control = 1 luồng duy nhất.');

    // Step 1 -> 2
    setTimeout(() => {
      addLog('🌲 [Pinecone]: RAG Query đối chiếu phong cách visual (Score: 0.94).');
      setCurrentStep(2);
      addLog('🧠 [Dify Cloud]: Tiếp nhận Master Payload. Khởi tạo initial seed: 5183921.');
      addLog('🔌 [Dify MCP]: Kết nối MCP Server qua Cloudflare Tunnel (SSE).');

      // Step 2 -> 3
      setTimeout(() => {
        setCurrentStep(3);
        setRamSpike(3.7);
        setSwapSpike(1.2);
        addLog('⚙️ [VPS Hetzner]: ArtCraft Rust CLI nạp model weights.');
        addLog('⚡ [Spike Alert]: RAM tăng vọt lên 3.7GB/4.0GB!');
        addLog('🛡️ [Kernel Swap]: Swapfile 8GB hấp thụ 1.2GB nhàn rỗi. OOM Killer không can thiệp.');
        addLog('📁 [Local I/O]: Banner render hoàn tất tại /tmp/artcraft_buffer/render_output.png.');

        // Step 3 -> 4
        setTimeout(() => {
          setCurrentStep(4);
          setRamSpike(2.1);
          addLog('☁️ [Cloudflare R2]: Đọc buffer nhị phân tải lên bucket S3 API.');
          addLog('🔗 [R2 Public]: Nhận CDN URL: https://pub-r2.thuyvux.site/banners/job_98240_v1.png.');
          addLog('🧹 [Purge Node]: Thực thi `rm -f /tmp/artcraft_buffer/*`. Zero-leak đảm bảo.');

          // Step 4 -> 5 (Fail attempt 1)
          setTimeout(() => {
            setCurrentStep(5);
            setQaScore(6.2);
            setIsLoopingBack(true);
            addLog('⚠️ [QA Gemini/Claude]: Đánh giá mỹ thuật: Điểm 6.2/10 (< Ngưỡng 8.5). KẾT QUẢ: REJECTED!');
            addLog('🔄 [Retry Engine]: Kích hoạt Self-Healing Retry Node. Tự động bảo lưu Concurrency = 1.');

            // Loopback to Step 2 for Attempt 2
            setTimeout(() => {
              setAttempt(2);
              setCurrentStep(2);
              setIsLoopingBack(false);
              addLog('🔁 [Loopback]: Vòng ngược về Dify Cloud cho lượt 2/3.');
              addLog('✨ [Dify Cloud]: Tái cấu trúc seed mới: 8492042. Gia cố contrast & lighting.');

              // Step 3 (Attempt 2)
              setTimeout(() => {
                setCurrentStep(3);
                setRamSpike(3.6);
                setSwapSpike(1.4);
                addLog('⚙️ [VPS Hetzner]: ArtCraft CLI render lại với seed 8492042.');

                // Step 4 (Attempt 2)
                setTimeout(() => {
                  setCurrentStep(4);
                  setRamSpike(2.0);
                  addLog('☁️ [Cloudflare R2]: Cập nhật asset banner_2d_url v2.');
                  addLog('🧹 [Purge Node]: Dọn sạch /tmp buffer an toàn.');

                  // Step 5 (Attempt 2 - PASS!)
                  setTimeout(() => {
                    setCurrentStep(5);
                    setQaScore(8.9);
                    setIsRunning(false);
                    setIsFinished(true);
                    addLog('🎉 [QA Gemini/Claude]: Điểm đánh giá: 8.9/10 (≥ 8.5). KẾT QUẢ: APPROVED & PASS!');
                    addLog('✅ [Hoàn Tất]: Pipeline kết thúc thắng lợi không cần can thiệp thủ công.');
                  }, 2000);
                }, 2000);
              }, 2000);
            }, 2500);
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl text-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Mô Phỏng Trực Quan Dòng Chảy E2E &amp; Cơ Chế Tự Phục Hồi
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Lượt {attempt}/3
                </span>
              </h3>
              <p className="text-[10px] text-slate-400">
                Quan sát quá trình nạp model, spike RAM 3.7GB, Swap 8GB và vòng lặp Retry tự động
              </p>
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

        {/* Simulator Controls & Step Indicator */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/40 space-y-3">
          <div className="flex items-center justify-between">
            <button
              onClick={startSimulation}
              disabled={isRunning}
              type="button"
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                isRunning
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600 hover:from-orange-600 hover:to-indigo-700 text-white shadow-lg shadow-rose-950/50'
              }`}
            >
              {isRunning ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  Đang chạy mô phỏng...
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {isFinished ? 'Chạy Lại Mô Phỏng' : 'Bắt Đầu Mô Phỏng E2E'}
                </>
              )}
            </button>

            {/* Quick Metrics */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="text-right">
                <span className="text-[9px] text-slate-500 block">RAM Spike</span>
                <span className={`font-bold ${ramSpike > 3.5 ? 'text-rose-400' : 'text-slate-300'}`}>
                  {ramSpike.toFixed(1)}G / 4.0G
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-500 block">Swap Active</span>
                <span className="font-bold text-emerald-400">
                  {swapSpike.toFixed(1)}G / 8.0G
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-slate-500 block">QA Điểm</span>
                <span
                  className={`font-bold ${
                    qaScore === null
                      ? 'text-slate-500'
                      : qaScore >= 8.5
                      ? 'text-emerald-400'
                      : 'text-rose-400 animate-pulse'
                  }`}
                >
                  {qaScore === null ? '--' : `${qaScore}/10`}
                </span>
              </div>
            </div>
          </div>

          {/* Step Progress Line */}
          <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-mono">
            {[
              { num: 1, label: '1. Webhook' },
              { num: 2, label: '2. Dify Seed' },
              { num: 3, label: '3. VPS Render' },
              { num: 4, label: '4. Bơm R2' },
              { num: 5, label: '5. QA Eval' }
            ].map(s => {
              const active = currentStep === s.num;
              const passed = currentStep > s.num || isFinished;
              return (
                <div
                  key={s.num}
                  className={`p-2 rounded-xl border transition-all ${
                    active
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-md shadow-amber-950/50'
                      : passed
                      ? 'bg-slate-900 border-slate-700 text-emerald-400'
                      : 'bg-slate-950/60 border-slate-800 text-slate-500'
                  }`}
                >
                  <span>{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Loopback notification banner */}
        {isLoopingBack && (
          <div className="px-4 py-2 bg-gradient-to-r from-rose-950 via-amber-950 to-slate-950 border-y border-rose-500/50 flex items-center justify-between text-xs text-rose-200 animate-pulse">
            <span className="flex items-center gap-2 font-semibold">
              <RotateCcw className="w-4 h-4 text-rose-400 animate-spin" />
              ⚠️ QA Reject (6.2/10)! Tự động kích hoạt Loopback về Bước 2 với global_seed: 8492042...
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Queue Locked
            </span>
          </div>
        )}

        {/* Terminal Logs Output */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-950 font-mono text-[11px] space-y-1.5 min-h-[220px]">
          <div className="flex items-center gap-2 text-slate-500 pb-2 border-b border-slate-800">
            <Terminal className="w-3.5 h-3.5" />
            <span>Telemetry Pipeline Live Log:</span>
          </div>
          {logs.length === 0 ? (
            <p className="text-slate-600 italic py-6 text-center">
              Nhấn nút &quot;Bắt Đầu Mô Phỏng E2E&quot; để quan sát luồng dữ liệu và cơ chế chống tràn OOM trực tiếp.
            </p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="text-slate-300 leading-relaxed animate-fadeIn">
                {log}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <span className="text-[10px] text-slate-400 font-mono">
            Hệ thống: Hetzner 4GB RAM • Swap 8GB NVMe • n8n Concurrency = 1
          </span>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
