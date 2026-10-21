import React, { useState } from 'react';
import { EMERGENCY_TASKS } from '../data/systemSpec';
import { CodeBlock } from './CodeBlock';
import { AlertCircle, Terminal, Send } from 'lucide-react';

export const EmergencyRunbook: React.FC = () => {
  const [tasks, setTasks] = useState(EMERGENCY_TASKS.map(t => ({ ...t, checked: true })));
  const [testAlertSent, setTestAlertSent] = useState(false);

  const toggleCheck = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  const handleSendTelegramTest = () => {
    setTestAlertSent(true);
    setTimeout(() => setTestAlertSent(false), 3000);
  };

  return (
    <div className="bg-slate-900/90 rounded-2xl p-4 border border-rose-500/40 space-y-3 glow-rose">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🚨</span>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400">
              QUY TRÌNH XỬ LÝ SỰ CỐ &amp; GIÁM SÁT TẢI
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              Checklist kiểm tra khẩn cấp khi hệ thống kích hoạt Retry liên tục
            </p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[10px] font-bold font-mono">
          Emergency
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {/* Task 1 */}
        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between font-semibold text-slate-200">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={tasks[0].checked}
                onChange={() => toggleCheck(tasks[0].id)}
                className="accent-rose-500 rounded w-3.5 h-3.5"
              />
              <span>1. Kiểm tra trạng thái Swap &amp; RAM trực quan</span>
            </label>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.2 rounded">
              Active
            </span>
          </div>
          <CodeBlock code="free -h && swapon --show" />
        </div>

        {/* Task 2 */}
        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between font-semibold text-slate-200">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={tasks[1].checked}
                onChange={() => toggleCheck(tasks[1].id)}
                className="accent-rose-500 rounded w-3.5 h-3.5"
              />
              <span>2. Lệnh cưỡng chế dọn sạch đệm nếu nghẽn I/O</span>
            </label>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.2 rounded">
              Purge Command
            </span>
          </div>
          <CodeBlock code="rm -rf /tmp/artcraft_buffer/* && sync && echo 3 > /proc/sys/vm/drop_caches" />
        </div>

        {/* Task 3 */}
        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between font-semibold text-slate-200">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={tasks[2].checked}
                onChange={() => toggleCheck(tasks[2].id)}
                className="accent-rose-500 rounded w-3.5 h-3.5"
              />
              <span>3. Bật n8n Error Trigger Workflow</span>
            </label>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-rose-300 bg-rose-500/10 border border-rose-500/30 px-1.5 py-0.2 rounded">
                Telegram Alert
              </span>
              <button
                type="button"
                onClick={handleSendTelegramTest}
                className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-colors"
                title="Bắn test thông báo Telegram giả lập"
              >
                <Send className="w-2.5 h-2.5" />
                {testAlertSent ? 'Đã gửi!' : 'Test'}
              </button>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            Nếu lượt Retry thứ 3 tiếp tục thất bại, n8n tự động phát thông báo khẩn cấp tới kênh Telegram DevOps với đầy đủ Master Payload dump.
          </p>
          {testAlertSent && (
            <div className="mt-2 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-[10px] text-emerald-300 font-mono animate-fadeIn">
              ✓ [Telegram Bot API 200 OK]: Đã gửi alert payload dump #JOB-98240 tới nhóm DevOps On-call.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
