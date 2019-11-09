echo "Removing old master"
git branch -D master

echo "Switching to master"
git checkout -b master

EMOJIS=(🚀 🤘 ✨ 🔔 🌈 🤯)
EMOJI=${EMOJIS[$RANDOM % ${#EMOJIS[@]}]}

git add .

if (( $(grep -c . <<<"$commit_msg") > 1 )); then
    git commit -m "$EMOJI Passable cumulative update: $(version_number)" -m "$commit_msg"
else
    git commit -m "$EMOJI Passable update: $(version_number)" -m "$commit_msg"
fi

git tag

echo "Pushing to master"
git push https://${GITHUB_TOKEN}@github.com/$GITHUB_REPO.git master

git tag $version_number
get push origin $version_number
