/* ============================================================
 * 站点配置（唯一需要维护的数据文件）
 * 新增产品：往 products 数组里加一条，首页/产品列表自动出现；
 *          再复制 products/cyaudit.html 作为详情页模板即可。
 * 占位内容统一用【】标注，替换成真实信息即可。
 * ============================================================ */
window.SITE = {
  owner: {
    name: "KFY",
    title: "独立开发者 · 审计信息化工具作者",
    bio: "8 年执业注册会计师，白天做审计，晚上写代码。相信审计行业的效率革命不会来自大而全的 ERP，而来自一线审计师手里顺手的小工具。",
    avatarText: "ME",
    email: "710365970@qq.com",
    github: "https://github.com/yourname",
    wechat: "15759956011",
    location: "福建·福州",
    // 备案号（ICP 备案通过后替换为「闽ICP备XXXXXXXX号」等；保持占位则页脚不显示）
    icp: "【备案号占位：闽ICP备XXXXXXXX号】",
  },

  /* 出现在导航与页脚 */
  nav: [
    { label: "首页", href: "index.html" },
    { label: "产品", href: "products/index.html" },
    { label: "关于我", href: "about.html" },
  ],

  /* 产品清单：featured=true 的会在首页大版位展示 */
  products: [
    {
      id: "cyaudit",
      name: "CYAudit 审计系统",
      tagline: "把审计底稿装进 Excel —— 一套覆盖「建项 → 取数 → 调整 → 注释 → 报告」全流程的 Excel/WPS 插件",
      detailUrl: "products/cyaudit.html",
      featured: true,
      badge: "核心产品",
      version: "v3.1（BUILD 20260915-…-perm3）",
      updated: "2026-11-01",
      status: "持续迭代中",
      icon: "🧮",
      accent: "#2563eb",
      shortDesc:
        "面向中小所与独立审计师的桌面端审计作业平台：不改变做底稿的习惯，把合并结构、未审数、调整分录、注释与审计报告全部数据化，按项目一键入库、取数与生成。",
      features: [
        "项目管理：一键建库 + 生成 4 套底稿工作簿",
        "读取系统：批量提取未审报表，秒级并行解析",
        "调整系统：合并结构 / 调整分录入库，TB / FS / conTB 一键查询导出",
        "注释系统：目录驱动建表、GUID 增量同步、三种勾稽表",
        "报告生成：Excel 注释副本 + Word 审计报告自动排版",
        "权限体系：账号职级 + 项目角色双层管控，数据按库隔离",
      ],
      tech: [
        "C# / .NET 8–9",
        "Excel-DNA（Excel 加载项）",
        "WPS COM 宿主（jsaddons + 托盘进程）",
        "ASP.NET Core 最小 API",
        "MySQL（一项目一库）",
        "NPOI / ClosedXML / OpenXML",
      ],
      scenarios: [
        { title: "年报审计项目组", desc: "3–10 人小团队共用一套项目库，底稿同源不抄错数。" },
        { title: "合并报表业务", desc: "多层合并结构 + 抵销分录 + 合并 TB / 合并注释，自动展开层级。" },
        { title: "连续年度审计", desc: "一键导入上期注释，期初数自动衔接上年期末。" },
        { title: "Excel / WPS 双宿主", desc: "客户机器只有 WPS 也能跑完整流程，功能与 Excel 一致。" },
      ],
      audience: "中小会计师事务所 · 独立审计师 · 财务尽调团队 · 对底稿自动化有兴趣的 CPA",
      license:
        "当前为闭源授权软件：付费授权 + 免费试用。【按你的实际授权方式修改，例如：个人非商业免费 / 按项目库授权 / 年度订阅】",
      download: {
        // GitHub Releases「最新版」固定链接：以后发新 Release 链接不变，网站无需改动
        url: "https://github.com/kfy616/cyaudit-release/releases/latest/download/CyAuditClientSetup.exe",
        fileName: "CyAuditClientSetup.exe",
        size: "56.7 MB",
        requirement: "Windows 10+ · Excel 2016+ 或 WPS 表格 12.x",
        sha256: "256157BEC8EB832B1F4E0EC0CFFB1E2E34A061883FA4322E4DF231E4A4F5BA31",
      },
    },
    {
      id: "placeholder-2",
      name: "【下一款产品占位】",
      tagline: "【一句话定位，上线前替换】",
      detailUrl: "#",
      featured: false,
      badge: "开发中",
      version: "v0.1",
      updated: "—",
      status: "筹备中",
      icon: "🧩",
      accent: "#0ea5e9",
      shortDesc: "【产品简介占位：解决什么问题、给谁用】",
      features: [],
      tech: [],
      scenarios: [],
      audience: "",
      license: "【授权说明占位】",
      download: null,
    },
  ],
};
