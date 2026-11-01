# CYAudit 个人开发者站

纯静态站点（HTML / CSS / 原生 JS），**零构建、零依赖**，任何静态托管都能跑
（GitHub Pages / Vercel / Netlify / Cloudflare Pages / Nginx / 甚至双击本地打开）。

## 目录结构

```
site-cyaudit/
├── index.html                 # 首页：CYAudit 大版位 + 功能 + 场景 + 技术亮点 + 下载/授权
├── about.html                 # 关于我：个人简介 + 联系方式
├── products/
│   ├── index.html             # 产品列表（自动读取 site-config.js）
│   └── cyaudit.html           # CYAudit 产品详情页（≈ 详情页模板）
└── assets/
    ├── css/style.css          # 全站样式（浅色专业风，响应式，断点 768px）
    └── js/
        ├── site-config.js     # ★ 唯一需要维护的数据文件（个人信息 + 产品清单）
        └── main.js            # 导航 / 页脚 / 产品卡片渲染
```

## 如何替换占位内容

所有占位内容用 **【】** 标注，共两类：

1. **个人信息**：编辑 `assets/js/site-config.js` 顶部 `owner` 对象
   （名字 / 头衔 / 简介 / 邮箱 / GitHub / 微信 / 城市），关于页与页脚自动更新。
2. **产品内容**：
   - 列表卡片：改 `site-config.js` 的 `products` 数组（首页与产品列表自动同步）；
   - 详情页长文案与操作视频：编辑 `products/cyaudit.html`，将视频占位区域替换为实际视频播放器；
   - 下载直链：把 `download.url` 的 `"#"` 换成网盘 / OSS / GitHub Releases 链接。

## 如何新增一款产品（3 步）

1. 复制 `products/cyaudit.html` → `products/新产品.html`，替换标题与各节内容；
2. 在 `site-config.js` 的 `products` 数组加一条记录（id / name / tagline / detailUrl / version…）；
   - 想上首页大版位：把该项 `featured: true`；
3. 刷新页面即可，首页与产品列表自动出现新卡片。

## 本地预览

双击 `index.html` 即可；或起一个静态服务：

```bash
cd site-cyaudit
python -m http.server 8080     # 打开 http://localhost:8080
```

## 部署

把整个目录上传任意静态托管即可，无后端、无环境变量。
建议 GitHub Pages：仓库根放本目录内容 → Settings → Pages → 选分支即可。
