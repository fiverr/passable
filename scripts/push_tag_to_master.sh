
git config --global user.email $GIT_EMAIL
git config --global user.name $GIT_NAME
git config --global github.token $GITHUB_TOKEN

echo "Removing old master"
git branch -D master

echo "Switching to master"
git checkout -b master

echo "Updating package.json"
npm version $TRAVIS_TAG --no-git-tag-version

echo "Rebuilding with current tag"
npm run build

git add .
git commit -m "Updating passable: $TRAVIS_TAG"

echo "Pushing to master"

git push git@github.com:fiverr/passable.git master