# 🌍 LinguaFlow - 多语种在线学习平台

> 一款温暖、个性化的沉浸式语言学习平台，支持英语、日语、韩语等多主流语种

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6.svg)
![Vite](https://img.shields.io/badge/Vite-6.4.2-646cffa.svg)

## ✨ 平台特色

### 🎯 核心功能

- **📚 分级课程体系** - 从A1到C2，循序渐进的课程设置
- **💡 互动式学习模块**：
  - 单词记忆 - 闪卡学习、智能复习
  - 语法练习 - 互动讲解、实战练习
  - 口语跟读 - 智能评分、即时反馈
  - 听力训练 - 分级材料、变速播放
- **📊 学习进度追踪** - 每日目标、能力雷达图、统计分析
- **🎖️ 成就激励系统** - 丰富徽章、等级系统、学习动力
- **👥 社区交流** - 学习小组、心得分享、互助问答

### 🌟 为什么选择 LinguaFlow？

- 🏠 **温馨的学习氛围** - 像在家里一样舒适
- 🎮 **游戏化体验** - 完成任务、解锁成就、升级称号
- 📖 **个性化推荐** - 智能学习路径，量身定制
- 🤝 **温暖的社区** - 互相鼓励、共同进步
- 📱 **响应式设计** - 支持多端设备，随时随地学习

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装步骤

```bash
# 克隆项目（如果您已克隆）
git clone <your-repo-url>
cd linguaflow

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 主要命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run check` | TypeScript类型检查 |
| `npm run lint` | 代码规范检查 |
| `npm run preview` | 预览生产版本 |

## 🛠️ 技术栈

### 前端框架
- **React 18** - UI组件化开发
- **TypeScript 5** - 类型安全
- **Vite 6** - 极速构建工具

### 路由与状态
- **React Router DOM 7** - SPA路由管理
- **Zustand 5** - 轻量级状态管理

### 样式方案
- **Tailwind CSS 3** - 原子化CSS框架
- **Lucide React** - 现代化图标库

### 其他工具
- **ESLint** - 代码质量检查
- **PostCSS** - CSS后处理器

## 📁 项目结构

```
linguaflow/
├── src/
│   ├── components/     # 可复用组件
│   │   └── layout/     # 布局组件
│   │       └── Header.tsx
│   ├── pages/          # 页面组件
│   │   ├── Home.tsx           # 首页
│   │   ├── Dashboard.tsx      # 学习仪表盘
│   │   ├── CourseCenter.tsx   # 课程中心
│   │   ├── CourseDetail.tsx   # 课程详情
│   │   ├── Vocabulary.tsx     # 单词记忆
│   │   ├── Grammar.tsx       # 语法练习
│   │   ├── Speaking.tsx       # 口语跟读
│   │   ├── Listening.tsx      # 听力训练
│   │   ├── Community.tsx       # 社区
│   │   ├── Achievements.tsx   # 成就
│   │   ├── Login.tsx         # 登录
│   │   ├── Register.tsx       # 注册
│   │   └── Profile.tsx        # 个人资料
│   ├── store/          # 状态管理
│   │   └── index.ts
│   ├── types/          # TypeScript类型定义
│   │   └── index.ts
│   ├── data/           # 模拟数据
│   │   └── mockData.ts
│   ├── App.tsx         # 应用入口
│   ├── main.tsx        # React渲染
│   └── index.css       # 全局样式
├── public/             # 静态资源
├── package.json        # 项目配置
├── tsconfig.json       # TypeScript配置
├── vite.config.ts      # Vite配置
├── tailwind.config.js  # Tailwind配置
└── README.md           # 项目文档
```

## 🎨 支持的语言

| 语言 | 旗帜 | 课程数量 |
|------|------|----------|
| 🇬🇧 英语 | English | 3门 |
| 🇯🇵 日语 | 日本語 | 2门 |
| 🇰🇷 韩语 | 한국어 | 1门 |

## 📖 学习路径

```
新用户注册 → 选择语言 → 完成水平测试 → 获得个性化学习路径
    ↓
每日学习：单词记忆 → 语法练习 → 口语跟读 → 听力训练
    ↓
复习巩固 → 社区讨论 → 获得成就 → 提升等级
```

## 🤝 如何贡献

我们欢迎所有形式的贡献！

1. **Fork** 本仓库
2. **Clone** 您的Fork
   ```bash
   git clone https://github.com/YOUR_USERNAME/linguaflow.git
   ```
3. **创建特性分支**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
4. **提交更改**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
5. **推送到分支**
   ```bash
   git push origin feature/AmazingFeature
   ```
6. **创建 Pull Request**

## 📝 开发指南

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 React 最佳实践
- 使用 Tailwind CSS 进行样式开发
- 保持组件小而专注（< 300行）

### 提交信息格式

```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
test: 测试相关
chore: 构建/工具相关
```

## 🔮 未来规划

- [ ] 添加更多语言（法语、德语、西班牙语）
- [ ] 实现真实语音识别
- [ ] 添加AI智能辅导功能
- [ ] 开发移动端APP
- [ ] 添加离线学习功能
- [ ] 实现云端数据同步

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- 感谢所有开源库的贡献者
- 感谢所有测试和使用本平台的学习者
- 感谢您的支持与信任

---

## 💬 联系方式

- **项目主页**: https://github.com/your-username/linguaflow
- **问题反馈**: https://github.com/your-username/linguaflow/issues
- **功能建议**: https://github.com/your-username/linguaflow/discussions

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/your-username">Your Name</a></p>
  <p>如果这个项目对您有帮助，请给我们一个 ⭐️</p>
</div>
