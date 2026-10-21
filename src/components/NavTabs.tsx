import React from 'react';
import { ViewTab, ScreenMode } from '../types/system';
import { Smartphone, Monitor, Database, PlayCircle, Layers } from 'lucide-react';

interface NavTabsProps {
  activeTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  screenMode: ScreenMode;
  onScreenModeChange: (mode: ScreenMode) => void;
}

export const NavTabs: React.FC<NavTabsProps> = ({
  activeTab,
  onTabChange,
  screenMode,
  onScreenModeChange,
}) => {
  const scrollToSection = (id: string) => {
    onTabChange('architecture');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="space-y-2">
      {/* 3 Quick Jump Cards matching the HTML visual */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800/80 text-center shadow-lg">
        <button
          onClick={() => scrollToSection('section-architecture')}
          type="button"
          className="py-2 px-1 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition text-[11px] font-semibold text-slate-300 flex flex-col items-center group cursor-pointer"
        >
          <span className="text-orange-400 text-base group-hover:scale-110 transition-transform">🗺️</span>
          <span className="mt-0.5">Kiến Trúc 2.0</span>
        </button>

        <button
          onClick={() => scrollToSection('section-pipeline')}
          type="button"
          className="py-2 px-1 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition text-[11px] font-semibold text-slate-300 flex flex-col items-center group cursor-pointer"
        >
          <span className="text-blue-400 text-base group-hover:scale-110 transition-transform">⚡</span>
          <span className="mt-0.5">Dòng Dữ Liệu</span>
        </button>

        <button
          onClick={() => scrollToSection('section-roadmap')}
          type="button"
          className="py-2 px-1 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition text-[11px] font-semibold text-slate-300 flex flex-col items-center group cursor-pointer"
        >
          <span className="text-emerald-400 text-base group-hover:scale-110 transition-transform">🎯</span>
          <span className="mt-0.5">4 Giai Đoạn</span>
        </button>
      </div>

      {/* Interactive Tool Bar: View Mode Switchers */}
      <div className="flex items-center justify-between gap-1 p-1 bg-slate-950/90 rounded-xl border border-slate-800/80 text-[10px] font-medium overflow-x-auto">
        <div className="flex items-center gap-1">
          <button
            onClick={() => onTabChange('architecture')}
            type="button"
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'architecture'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3 h-3" />
            Infographic
          </button>

          <button
            onClick={() => onTabChange('simulator')}
            type="button"
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'simulator'
                ? 'bg-rose-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <PlayCircle className="w-3 h-3" />
            Mô phỏng E2E
          </button>

          <button
            onClick={() => onTabChange('payload')}
            type="button"
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
              activeTab === 'payload'
                ? 'bg-amber-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Database className="w-3 h-3" />
            Soi Payload
          </button>
        </div>

        {/* Screen Frame Mode Switcher */}
        <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
          <button
            onClick={() => onScreenModeChange('mobile')}
            title="Khung giao diện điện thoại (chuẩn hình mẫu)"
            className={`p-1 rounded ${screenMode === 'mobile' ? 'bg-slate-800 text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Smartphone className="w-3 h-3" />
          </button>
          <button
            onClick={() => onScreenModeChange('wide')}
            title="Chế độ toàn màn hình Responsive"
            className={`p-1 rounded ${screenMode === 'wide' ? 'bg-slate-800 text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <Monitor className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
