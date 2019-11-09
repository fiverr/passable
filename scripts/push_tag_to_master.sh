git config --global user.email "${GIT_NAME}@users.noreply.github.com" --replace-all
git config --global user.name $GIT_NAME

echo "Cloning repo"
git clone https://github.com/$TRAVIS_REPO_SLUG.git __temp
cd __temp
git checkout $TRAVIS_BRANCH

echo "Getting list of changes"
msg="$(git log --format=format:"%h %s (%aN)" --no-merges origin/master..)"
echo "$msg"

echo "Deleting cloned repo"
cd ../
rm -rf __temp

echo "Removing old master"
git branch -D master

echo "Switching to master"
git checkout -b master

export NEXT_VERSION=$(node ./scripts/handle_version.js "$msg")

echo "Rebuilding with current tag"
npm run build

EMOJIS=(🚀 🤘 ✨ 🔔 🌈 🤯)
EMOJI=${EMOJIS[$RANDOM % ${#EMOJIS[@]}]}

git add .

if (( $(grep -c . <<<"$msg") > 1 )); then
    git commit -m "$EMOJI Passable cumulative update: $NEXT_VERSION" -m "$msg"
else
    git commit -m "$EMOJI Passable update: $NEXT_VERSION" -m "$msg"
fi

echo "Pushing to master"
git push https://${GITHUB_TOKEN}@github.com/$GITHUB_REPO.git master

git tag $NEXT_VERSION
git push origin $NEXT_VERSION
