export type ViewTab = 'architecture' | 'pipeline' | 'roadmap' | 'simulator' | 'payload';

export type ScreenMode = 'mobile' | 'wide';

export interface IncidentState {
  jobId: string;
  attempt: number;
  maxAttempts: number;
  status: 'alert' | 'recovering' | 'healthy' | 'retrying';
  ramUsageGb: number;
  swapUsageGb: number;
  qaScore: number;
  currentStep: number;
  globalSeed: string;
}

export interface MasterPayload {
  job_id: string;
  timestamp: string;
  concurrency_limit: number;
  trigger_source: string;
  prompt: string;
  refined_prompt?: string;
  global_seed: string;
  rag_context: {
    vector_id: string;
    similarity: number;
    art_style: string;
    target_dimensions: string;
  };
  mcp_call: {
    tool: string;
    channel: string;
    status: string;
  };
  storage: {
    temp_path: string;
    r2_uploaded: boolean;
    banner_2d_url: string;
    purge_status: string;
  };
  qa_evaluation: {
    round: number;
    score: number;
    threshold: number;
    verdict: 'FAIL' | 'PASS';
    feedback: string;
    retry_injected: boolean;
  };
  system_health: {
    ram_usage: string;
    swap_usage: string;
    oom_killer: string;
  };
}

export interface TaskItem {
  id: string;
  title: string;
  desc: string;
  codeSnippet?: string;
  badge?: string;
  badgeColor?: 'rose' | 'amber' | 'emerald' | 'blue' | 'slate';
  completed: boolean;
}

export interface RoadmapPhase {
  id: number;
  phaseNum: number;
  title: string;
  subtitle: string;
  priorityLabel: string;
  themeColor: 'rose' | 'blue' | 'amber' | 'emerald';
  tasks: TaskItem[];
}
