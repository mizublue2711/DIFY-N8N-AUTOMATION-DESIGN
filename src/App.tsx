import React, { useState } from 'react';
import { ViewTab, ScreenMode, RoadmapPhase, MasterPayload } from './types/system';
import { INITIAL_ROADMAP, INITIAL_MASTER_PAYLOAD } from './data/systemSpec';
import { HeaderAlert } from './components/HeaderAlert';
import { NavTabs } from './components/NavTabs';
import { ArchitecturePillars } from './components/ArchitecturePillars';
import { PipelineTimeline } from './components/PipelineTimeline';
import { SelfHealingCard } from './components/SelfHealingCard';
import { RoadmapPhases } from './components/RoadmapPhases';
import { EmergencyRunbook } from './components/EmergencyRunbook';
import { KeyTakeawayCard } from './components/KeyTakeawayCard';
import { VpsRamGauge } from './components/VpsRamGauge';
import { PayloadInspectorModal } from './components/PayloadInspectorModal';
import { PipelineSimulatorModal } from './components/PipelineSimulatorModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('architecture');
  const [screenMode, setScreenMode] = useState<ScreenMode>('mobile');
  const [roadmap, setRoadmap] = useState<RoadmapPhase[]>(INITIAL_ROADMAP);
  const [masterPayload, setMasterPayload] = useState<MasterPayload>(INITIAL_MASTER_PAYLOAD);

  // Modals state
  const [isRamGaugeOpen, setIsRamGaugeOpen] = useState(false);
  const [isPayloadModalOpen, setIsPayloadModalOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);

  // Toggle tasks completion
  const handleToggleTask = (phaseId: number, taskId: string) => {
    setRoadmap((prev) =>
      prev.map((phase) => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          tasks: phase.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        };
      })
    );
  };

  const handleTabChange = (tab: ViewTab) => {
    setActiveTab(tab);
    if (tab === 'simulator') {
      setIsSimulatorOpen(true);
    } else if (tab === 'payload') {
      setIsPayloadModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased relative selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Ambient Glow Background matching reference HTML */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div
        className={`relative z-10 mx-auto px-4 pt-6 space-y-6 pb-16 transition-all duration-300 ${
          screenMode === 'mobile' ? 'max-w-md' : 'max-w-4xl'
        }`}
      >
        {/* Top Incident Alert Banner & Spec Header */}
        <HeaderAlert
          jobId={masterPayload.job_id}
          attempt={masterPayload.qa_evaluation.round}
          maxAttempts={3}
          ramSpikeText="3.7G/4G (Swap OK)"
          autoRecoveryText="Self-Healing ON"
          onOpenSimulator={() => setIsSimulatorOpen(true)}
          onOpenRamGauge={() => setIsRamGaugeOpen(true)}
          onInspectPayload={() => setIsPayloadModalOpen(true)}
        />

        {/* Quick Navigation / Stats Bar & Mode Switcher */}
        <NavTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          screenMode={screenMode}
          onScreenModeChange={setScreenMode}
        />

        {/* Content Layout: 1-column in mobile, 2-column in wide mode */}
        {screenMode === 'wide' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left Column: 3 Pillars & Pipeline Timeline */}
            <div className="space-y-6">
              <ArchitecturePillars />
              <PipelineTimeline isRetrying={true} />
            </div>

            {/* Right Column: Self-Healing, 4 Roadmap Phases, Emergency, Key Takeaway */}
            <div className="space-y-6">
              <SelfHealingCard />
              <RoadmapPhases phases={roadmap} onToggleTask={handleToggleTask} />
              <EmergencyRunbook />
              <KeyTakeawayCard />
            </div>
          </div>
        ) : (
          /* Mobile Stacked View matching exact original layout */
          <div className="space-y-6">
            {/* 1. 3 TẦNG KIẾN TRÚC MỚI */}
            <ArchitecturePillars />

            {/* 2. DÒNG CHẢY DỮ LIỆU ĐỒNG BỘ (E2E TIMELINE) */}
            <PipelineTimeline isRetrying={true} />

            {/* Self-Healing Diagnostic */}
            <SelfHealingCard />

            {/* 3. KẾ HOẠCH HÀNH ĐỘNG ƯU TIÊN (4 GIAI ĐOẠN) */}
            <RoadmapPhases phases={roadmap} onToggleTask={handleToggleTask} />

            {/* Emergency Incident Checklist */}
            <EmergencyRunbook />

            {/* Key Takeaway / Safety Card & Footer */}
            <KeyTakeawayCard />
          </div>
        )}
      </div>

      {/* Interactive Modals */}
      <VpsRamGauge
        isOpen={isRamGaugeOpen}
        onClose={() => setIsRamGaugeOpen(false)}
        currentRamGb={3.7}
        currentSwapGb={1.2}
      />

      <PayloadInspectorModal
        isOpen={isPayloadModalOpen}
        onClose={() => setIsPayloadModalOpen(false)}
        payload={masterPayload}
      />

      <PipelineSimulatorModal
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
        onUpdatePayload={setMasterPayload}
      />
    </div>
  );
}
