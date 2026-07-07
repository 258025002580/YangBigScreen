# 阳的数据大屏 (YangBigScreen)

一个从 0 到 1 教你如何动手制作数据可视化大屏的开源项目。

## 项目简介

本项目旨在帮助开发者从零开始，一步步学习和掌握数据可视化大屏的开发流程。项目采用 **Vue 3 + TypeScript + ECharts** 技术栈，通过 **数据适配器模式** 实现 Mock 数据与真实 API 的无缝切换，并内置了完整的测试体系、日志系统和代码质量保障。

## 技术栈

- **前端框架：** Vue 3 + TypeScript + Vite
- **状态管理：** Pinia
- **数据可视化：** ECharts 5
- **测试：** Vitest + Playwright
- **代码质量：** ESLint + Prettier + Husky + Commitlint

## 项目架构

```
src/
├── adapters/          # 数据适配器层（MockAdapter / ApiAdapter）
├── components/        # 可复用组件
│   ├── charts/        #   图表组件族（BaseChart、Bar、Line、Pie、Scatter、Map）
│   ├── common/        #   通用组件（DataCard、NumberFlop、TitleBar）
│   └── layout/        #   布局组件（DashboardLayout）
├── composables/       # 组合式函数（useChartData、useAutoRefresh、useScreenAdapt）
├── config/            # 应用配置（主题、图表默认配置）
├── mock/              # Mock 数据定义
├── services/          # 业务服务层
├── stores/            # Pinia 状态管理
├── types/             # TypeScript 类型定义
├── utils/             # 工具函数
│   └── logger/        #   日志系统（支持分级、持久化、可插拔 Transport）
└── views/             # 大屏页面
    └── panels/        #   页面面板（Header、Left、Center、Right）
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

# 格式化代码
npm run format
```

## Mock ↔ API 切换

通过环境变量 `VITE_DATA_SOURCE` 一键切换数据源：

- `.env.development` → `VITE_DATA_SOURCE=mock`（使用本地 Mock 数据）
- `.env.production` → `VITE_DATA_SOURCE=api`（使用真实 API）

业务代码无需任何改动，由适配器层统一处理。

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
