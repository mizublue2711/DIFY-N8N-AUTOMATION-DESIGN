import { RoadmapPhase, MasterPayload } from '../types/system';

export const INITIAL_MASTER_PAYLOAD: MasterPayload = {
  job_id: "#JOB-98240",
  timestamp: "2026-10-21T09:14:02Z",
  concurrency_limit: 1,
  trigger_source: "Webhook Master Ingestion",
  prompt: "Cyberpunk neon street at twilight with high contrast holographic billboard",
  refined_prompt: "Cyberpunk neon street at twilight with intensified cyan/magenta contrast, crisp geometric edge lighting and volumetric rain reflection",
  global_seed: "8492042",
  rag_context: {
    vector_id: "vec_artcraft_neon_v2",
    similarity: 0.94,
    art_style: "ArtCraft v2 Synth-Hyperreal",
    target_dimensions: "1920x1080"
  },
  mcp_call: {
    tool: "generate_banner_artcraft",
    channel: "Cloudflare Tunnel SSE (mcp.thuyvux.site)",
    status: "dispatched"
  },
  storage: {
    temp_path: "/tmp/artcraft_buffer/render_output_98240.png",
    r2_uploaded: true,
    banner_2d_url: "https://pub-r2.thuyvux.site/banners/job_98240_v2.png",
    purge_status: "Purged via rm -f /tmp/artcraft_buffer/*"
  },
  qa_evaluation: {
    round: 2,
    score: 6.2,
    threshold: 8.5,
    verdict: "FAIL",
    feedback: "Độ bão hòa màu tốt nhưng độ tương phản viền còn mờ, cần gia cố chi tiết ánh sáng neon và sinh seed mới.",
    retry_injected: true
  },
  system_health: {
    ram_usage: "3.7G / 4.0G (92.5%)",
    swap_usage: "1.2G / 8.0G Active",
    oom_killer: "PREVENTED (Swap Absorption Active)"
  }
};

export const INITIAL_ROADMAP: RoadmapPhase[] = [
  {
    id: 1,
    phaseNum: 1,
    title: "GIAI ĐOẠN 1: GIA CỐ HẠ TẦNG & n8n",
    subtitle: "Mục tiêu: Đảm bảo VPS không crash OOM khi load model",
    priorityLabel: "ƯU TIÊN 1",
    themeColor: "rose",
    tasks: [
      {
        id: "task-1-1",
        title: "1. Tạo Swap Space 8GB trên VPS",
        desc: "Chạy lệnh cấp phát swap đệm để ArtCraft nạp model mà không tràn RAM 4GB:",
        codeSnippet: "fallocate -l 8G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile",
        badge: "Sống còn",
        badgeColor: "rose",
        completed: true
      },
      {
        id: "task-1-2",
        title: "2. Tạo Thư Mục Đệm Buffer",
        desc: "Thiết lập phân quyền ghi tối đa cho thư mục kết xuất nhị phân tạm:",
        codeSnippet: "mkdir -p /tmp/artcraft_buffer && chmod 777 /tmp/artcraft_buffer",
        badge: "I/O Local",
        badgeColor: "slate",
        completed: true
      },
      {
        id: "task-1-3",
        title: "3. Khóa Chặt Concurrency Trên n8n",
        desc: "Vào Settings Workflow n8n ➔ Bật Concurrency Control ➔ Set Limit Concurrent Executions = 1.",
        badge: "Safe Rule",
        badgeColor: "emerald",
        completed: true
      }
    ]
  },
  {
    id: 2,
    phaseNum: 2,
    title: "GIAI ĐOẠN 2: THIẾT LẬP ARTCRAFT & MCP SERVER",
    subtitle: "Mục tiêu: Đóng gói CLI và expose qua Cloudflare Tunnel",
    priorityLabel: "ƯU TIÊN 2",
    themeColor: "blue",
    tasks: [
      {
        id: "task-2-1",
        title: "1. Cài đặt ArtCraft Rust CLI",
        desc: "Kiểm tra render headless qua dòng lệnh terminal và kiểm tra file xuất tại /tmp/artcraft_buffer.",
        codeSnippet: "artcraft-cli render --model /models/artcraft-v2.bin --prompt \"test\" --output /tmp/artcraft_buffer/test.png",
        completed: true
      },
      {
        id: "task-2-2",
        title: "2. Dựng MCP Server Wrapper (Node/Rust)",
        desc: "Viết script mcp_server.js định nghĩa tool generate_banner_artcraft nhận tham số (prompt, seed, dimensions).",
        codeSnippet: "node --loader ts-node/esm mcp_server.ts --port 3030 --host 127.0.0.1",
        completed: true
      },
      {
        id: "task-2-3",
        title: "3. Thiết lập Cloudflare Tunnel",
        desc: "Expose port của MCP Wrapper ra subdomain an toàn (ví dụ: mcp.thuyvux.site) - Tuyệt đối không mở port VPS trực tiếp.",
        codeSnippet: "cloudflared tunnel run --url http://localhost:3030 mcp-artcraft",
        completed: true
      }
    ]
  },
  {
    id: 3,
    phaseNum: 3,
    title: "GIAI ĐOẠN 3: ĐỊNH TUYẾN DỮ LIỆU & R2",
    subtitle: "Mục tiêu: Xử lý bơm - xả file nhị phân & cập nhật Payload",
    priorityLabel: "ƯU TIÊN 3",
    themeColor: "amber",
    tasks: [
      {
        id: "task-3-1",
        title: "3.1 Code Node khởi tạo Master Payload JSON",
        desc: "Thiết lập cấu trúc schema chuẩn ngay sau nút tiếp nhận Webhook.",
        codeSnippet: "return [{ json: { job_id: 'JOB-' + $execution.id, global_seed: null, r2_url: null, qa_attempts: 0 } }];",
        completed: true
      },
      {
        id: "task-3-2",
        title: "3.2 Cấu hình Cụm Bơm - Xả Cloudflare R2",
        desc: "Đọc binary từ buffer đệm ➔ Push qua Cloudflare R2 S3 API ➔ Nhận Public URL tương ứng.",
        completed: true
      },
      {
        id: "task-3-3",
        title: "3.3 Nút Dọn dẹp cục bộ (Purge Node)",
        desc: "Kích hoạt lệnh rm -f /tmp/artcraft_buffer/* ngay khi R2 phản hồi 200 OK.",
        codeSnippet: "rm -f /tmp/artcraft_buffer/*",
        completed: true
      },
      {
        id: "task-3-4",
        title: "3.4 Cập nhật URL vào Master Payload",
        desc: "Ghi đè URL mới vào key tương ứng (VD: banner_2d_url) phục vụ QA & bước kế.",
        completed: true
      }
    ]
  },
  {
    id: 4,
    phaseNum: 4,
    title: "GIAI ĐOẠN 4: NÂNG CẤP BỘ NÃO DIFY CLOUD",
    subtitle: "Mục tiêu: Khai báo MCP & đóng vai Orchestrator hoàn chỉnh",
    priorityLabel: "ƯU TIÊN 4",
    themeColor: "emerald",
    tasks: [
      {
        id: "task-4-1",
        title: "1. Khai báo MCP Server trên Dify Cloud",
        desc: "Vào Dify ➔ Tools ➔ Add MCP Server ➔ Dán URL Cloudflare Tunnel bảo mật vừa tạo ở Giai đoạn 2.",
        completed: true
      },
      {
        id: "task-4-2",
        title: "2. Viết lại System Prompt Chuẩn Agentic",
        desc: "Huấn luyện Dify đóng vai trò Agentic Orchestrator: tự đọc Master Payload, sinh mã global_seed và tự động gọi ArtCraft MCP Tool khi có nhu cầu render.",
        completed: true
      }
    ]
  }
];

export const EMERGENCY_TASKS = [
  {
    id: "em-1",
    title: "1. Kiểm tra trạng thái Swap & RAM trực quan",
    desc: "Kiểm tra dung lượng bộ nhớ vật lý và phân vùng swap đã nạp:",
    codeSnippet: "free -h && swapon --show",
    badge: "Active",
    badgeColor: "emerald" as const
  },
  {
    id: "em-2",
    title: "2. Lệnh cưỡng chế dọn sạch đệm nếu nghẽn I/O",
    desc: "Xóa toàn bộ artifact đệm dở dang và giải phóng cache nhân hệ thống:",
    codeSnippet: "rm -rf /tmp/artcraft_buffer/* && sync && echo 3 > /proc/sys/vm/drop_caches",
    badge: "Purge Command",
    badgeColor: "amber" as const
  },
  {
    id: "em-3",
    title: "3. Bật n8n Error Trigger Workflow",
    desc: "Nếu lượt Retry thứ 3 tiếp tục thất bại, n8n tự động phát thông báo khẩn cấp tới kênh Telegram DevOps với đầy đủ Master Payload dump.",
    codeSnippet: "curl -X POST https://api.telegram.org/bot<TOKEN>/sendMessage -d chat_id=<CHAT_ID> -d text=\"ALERT: Retry loop exceeded limit on #JOB-98240\"",
    badge: "Telegram Alert",
    badgeColor: "rose" as const
  }
];
