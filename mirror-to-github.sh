#!/bin/bash
# mirror-to-github.sh

echo "🔄 Mirroring to GitHub for Amplify Gen 2..."

# Add GitHub remote (chỉ cần làm 1 lần)
git remote remove github 2>/dev/null || true
git remote add github https://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@github.com/huyddits/ct-nextjs-amplify.git

# Push current branch to GitHub
git push github $(git branch --show-current) --force
git push github --tags --force

echo "✅ Mirrored to GitHub successfully!"
echo "🚀 Amplify will auto-deploy from GitHub"