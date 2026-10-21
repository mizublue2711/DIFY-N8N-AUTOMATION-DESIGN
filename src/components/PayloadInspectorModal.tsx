import React, { useState } from 'react';
import { X, Copy, Check, Database, Filter } from 'lucide-react';
import { MasterPayload } from '../types/system';

interface PayloadInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  payload: MasterPayload;
}

export const PayloadInspectorModal: React.FC<PayloadInspectorModalProps> = ({
  isOpen,
  onClose,
  payload,
}) => {
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const jsonString = JSON.stringify(payload, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[85vh] flex flex-col bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Soi Master Payload JSON
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {payload.job_id}
                </span>
              </h3>
              <p className="text-[10px] text-slate-400">
                Payload siêu nhẹ: chỉ mang Metadata, Seed và Public URL (Không truyền binary)
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

        {/* Quick Toolbar */}
        <div className="px-4 py-2 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px]">Trạng thái:</span>
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-mono text-[10px]">
              QA Fail (6.2/10) ➔ Retry Active
            </span>
          </div>

          <button
            onClick={handleCopy}
            type="button"
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã sao chép' : 'Copy JSON'}</span>
          </button>
        </div>

        {/* JSON Content */}
        <div className="flex-1 overflow-auto p-4 bg-slate-950 font-mono text-[11px] leading-relaxed select-text">
          <pre className="text-amber-200/90 whitespace-pre-wrap">{jsonString}</pre>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/90 flex justify-end">
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
