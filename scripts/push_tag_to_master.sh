
git config --global user.email $GIT_EMAIL
git config --global user.name $GIT_NAME

echo "Cloning repo"
git clone https://github.com/$TRAVIS_REPO_SLUG.git __temp
cd __temp
git checkout $TRAVIS_TAG

echo "Getting list of changes"
msg="$(git log --pretty=oneline --abbrev-commit --no-merges origin/master..)"
echo "$msg"

echo "Deleting cloned repo"
cd ../
rm -rf __temp

echo "Removing old master"
git branch -D master

echo "Switching to master"
git checkout -b master

echo "Updating package.json"
npm version $TRAVIS_TAG --no-git-tag-version

echo "Rebuilding with current tag"
npm run build

EMOJIS=(🚀 🤘 ✨ 🔔 🌈 🤯 ‼️)
EMOJI=${EMOJIS[$RANDOM % ${#EMOJIS[@]}]}

git add .
git commit -m "$EMOJI Passable cumulative update: $TRAVIS_TAG" -m "$msg"

echo "Pushing to master"
git push https://${GITHUB_TOKEN}@github.com/$GITHUB_REPO.git master