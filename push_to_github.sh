#!/bin/bash
echo "=================================="
echo "  🚀 LinguaFlow GitHub上传脚本"
echo "=================================="
echo ""
echo "请确保您已经在GitHub上创建了仓库：linguaflow"
echo ""
read -p "请输入您的GitHub用户名: " GITHUB_USERNAME
echo ""

# 更新远程仓库地址
git remote set-url origin https://github.com/$GITHUB_USERNAME/linguaflow.git

echo "✅ 远程仓库已更新为: https://github.com/$GITHUB_USERNAME/linguaflow.git"
echo ""
echo "请运行以下命令完成推送："
echo ""
echo "  git push -u origin main"
echo ""
echo "推送时会提示输入GitHub用户名和密码（密码使用Personal Access Token）"
echo ""
echo "如何获取Personal Access Token:"
echo "  1. 打开 GitHub → Settings → Developer settings"
echo "  2. 选择 Personal access tokens → Tokens (classic)"
echo "  3. Generate new token → 勾选 repo 权限"
echo "  4. 复制生成的Token"
echo "  5. 推送时密码输入框粘贴Token"