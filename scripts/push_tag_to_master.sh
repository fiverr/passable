echo "Removing old satmer"
git branch -D satmer

echo "Switching to satmer"
git checkout -b satmer

echo "Rebuilding with current tag"
npm run build

EMOJIS=(🚀 🤘 ✨ 🔔 🌈 🤯)
EMOJI=${EMOJIS[$RANDOM % ${#EMOJIS[@]}]}

git add .

if (( $(grep -c . <<<"$commit_msg") > 1 )); then
    git commit -m "$EMOJI Passable cumulative update: $(version_number)" -m "$commit_msg"
else
    git commit -m "$EMOJI Passable update: $(version_number)" -m "$commit_msg"
fi

git tag

echo "Pushing to satmer"
git push https://${GITHUB_TOKEN}@github.com/$GITHUB_REPO.git satmer
