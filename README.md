# 如意数据大屏 (RuyiBigScreen)

一个从 0 到 1 教你如何动手制作数据可视化大屏的开源项目。

## 效果预览

启动后浏览器访问 `http://localhost:3000` 即可看到完整的数据大屏页面：

```text
┌──────────────────────────────────────────────────────────────┐
│  ◉ 数据可视化平台         如意数据大屏          2024-07-07 20:30:00 │
│                         RuyiBigScreen                        │
├──────────────┬────────────────────────┬──────────────────────┤
│ 访问趋势折线图 │                      │   城市排名柱状图        │
│  (30天趋势)   │    全国态势总览图       │   (8个城市)           │
│              │    (散点气泡图)         │                      │
├──────────────┤                      ├──────────────────────┤
│ 分类占比饼图   │                      │   能力雷达图            │
│  (5个行业)    │                      │   (6个维度)            │
├──────────────┴────────────────────────┴──────────────────────┤
│  ● 订单 #20240707001 已完成支付    10:25:30                   │
│  ● 新用户注册：张** 来自 北京市     10:24:15                   │
│  ● 服务器 CPU 使用率超过 80%        10:22:08                   │
└──────────────────────────────────────────────────────────────┘
```

**核心特性：**

- **深色科技感主题**：蓝青色视觉风格，多层次渐变和发光效果，适合教学演示
- **1920x1080 设计稿**：通过 CSS transform 缩放，自适应任意浏览器窗口
- **4 个核心指标卡片**：今日访问量、实时订单数、活跃用户数、系统健康度（含趋势箭头）
- **左侧面板**：30 天访问趋势折线图 + 5 个行业分类占比饼图
- **中间面板**：全国态势总览散点气泡图（省份活跃度可视化）
- **右侧面板**：8 个城市排名柱状图 + 6 维度能力雷达图
- **底部面板**：8 条实时动态列表（含成功/警告/错误/信息分类）
- **实时时钟**：顶部标题栏实时显示当前时间，每秒更新

## 项目简介

本项目旨在帮助开发者从零开始，一步步学习和掌握数据可视化大屏的开发流程。项目采用 **Vue 3 + TypeScript + ECharts** 技术栈，通过 **数据源切换机制** 实现 Mock 数据与 Axios 真实 API 的无缝切换，并内置了完整的测试体系、日志系统和代码质量保障。

## 技术栈

- **前端框架：** Vue 3 + TypeScript + Vite
- **状态管理：** Pinia
- **数据可视化：** ECharts 5
- **HTTP 请求：** Axios
- **Mock 方案：** MSW (Mock Service Worker) + 本地 Mock 数据源切换
- **测试：** Vitest + Playwright
- **代码质量：** ESLint + Prettier + Stylelint + Husky + Commitlint

## 项目架构

```
src/
├── app/                # 应用入口
│   ├── App.vue
│   └── main.ts
├── assets/             # 静态资源
├── components/         # 通用组件
│   ├── BasePanel.vue       # 面板容器
│   ├── MetricCard.vue      # 指标卡片
│   └── ScreenHeader.vue    # 大屏标题栏
├── charts/             # 图表组件
│   ├── LineTrendChart.vue      # 折线趋势图
│   ├── BarRankingChart.vue     # 柱状排名图
│   ├── PieStatusChart.vue      # 饼状占比图
│   ├── RadarAbilityChart.vue   # 雷达能力图
│   └── MapOverviewChart.vue    # 地图总览图
├── views/              # 页面视图
│   └── DashboardView.vue       # 主大屏页面
├── layouts/            # 布局组件
│   └── BigScreenLayout.vue     # 大屏自适应布局
├── services/           # 数据服务层
│   ├── http.ts             # Axios 实例 + 拦截器
│   ├── dashboardService.ts # 仪表盘数据服务
│   └── dataSource.ts       # 数据源切换（Mock / API）
├── mocks/              # Mock 数据
│   ├── browser.ts          # MSW Worker
│   ├── handlers.ts         # MSW 请求处理器
│   └── dashboardMock.ts    # Mock 数据定义
├── stores/             # Pinia 状态管理
│   └── dashboardStore.ts
├── utils/              # 工具函数
│   ├── format.ts           # 格式化工具
│   └── resize.ts           # 屏幕自适应
├── logs/               # 日志系统
│   └── logger.ts           # 支持 info/warn/error/debug
├── types/              # TypeScript 类型定义
│   └── dashboard.ts
└── env.d.ts
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行单元测试
npm run test:run

# 运行 E2E 测试
npm run test:e2e

# 代码检查
npm run lint

# 样式检查
npm run lint:style

# 格式化代码
npm run format
```

## Mock ↔ API 切换

通过环境变量 `VITE_DATA_SOURCE` 一键切换数据源：

- `.env.development` → `VITE_DATA_SOURCE=mock`（使用本地 Mock 数据）
- `.env.production` → `VITE_DATA_SOURCE=api`（使用 Axios + 真实 API）

切换逻辑在 `src/services/dataSource.ts` 中实现，业务代码无需任何改动。

## 日志系统

`src/logs/logger.ts` 提供统一的日志接口：

```typescript
import { createLogger } from '@/logs/logger'

const log = createLogger('MyModule')
log.info('操作成功', { data })
log.warn('警告信息')
log.error('错误信息', error)
log.debug('调试信息', { detail })
```

- 开发环境自动输出到 console
- 通过 `Logger.addHandler()` 可接入 Sentry 等外部日志平台

## 数据访问规范

- 页面组件 **不能** 直接读取 mock 文件
- 必须通过 `services` 层获取数据
- `stores` 层缓存数据，避免重复请求

## 页面内容

| 区域     | 内容                                           |
| -------- | ---------------------------------------------- |
| 顶部标题 | 如意数据大屏 RuyiBigScreen + 实时时间          |
| 指标卡片 | 今日访问量、实时订单数、活跃用户数、系统健康度 |
| 左侧     | 访问趋势折线图、分类占比饼图                   |
| 中间     | 全国态势总览地图                               |
| 右侧     | 城市排名柱状图、能力雷达图                     |
| 底部     | 实时动态列表                                   |

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助完善本项目！

### Commit 规范

- `feat:` 新功能
- `fix:` Bug 修复
- `refactor:` 重构
- `test:` 测试相关
- `docs:` 文档
- `chore:` 构建/工具

## 开源协议

本项目基于 [MIT License](LICENSE) 开源。
