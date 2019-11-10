git config --global user.email "${GIT_NAME}@users.noreply.github.com" --replace-all
git config --global user.name $GIT_NAME

echo "Removing old master"
git branch -D master

echo "Switching to new master"
git checkout -b master

echo "Bumping version"
npm version $NEXT_VERSION --no-git-tag

echo "Rebuilding with current tag"
yarn build

echo "Updating changelog"
node ./scripts/update_changelog.js

EMOJIS=(🚀 🤘 ✨ 🔔 🌈 🤯)
EMOJI=${EMOJIS[$RANDOM % ${#EMOJIS[@]}]}

git add .

if (( $(grep -c . <<<"$msg") > 1 )); then
    git commit -m "$EMOJI Passable cumulative update: $NEXT_VERSION" -m "$COMMIT_MESSAGES"
else
    git commit -m "$EMOJI Passable update: $NEXT_VERSION" -m "$COMMIT_MESSAGES"
fi

echo "Pushing to master"
git push https://${GITHUB_TOKEN}@github.com/$GITHUB_REPO.git master

git tag $NEXT_VERSION
git push origin $NEXT_VERSION
