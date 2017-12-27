git config --global user.email $GIT_EMAIL
git config --global user.name $GIT_NAME

echo "Removing old master"
git branch -D master

echo "Switching to master"
git checkout -b master

echo "Updating package.json"
npm version $TRAVIS_TAG --no-git-tag-version

git add .
git commit -m "Updating passable: $TRAVIS_TAG"

echo "Pushing to master"

git push https://${GITHUB_TOKEN}@github.com/$GITHUB_REPO.git master