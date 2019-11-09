git config --global user.email "${GIT_NAME}@users.noreply.github.com" --replace-all
git config --global user.name $GIT_NAME

echo "Cloning repo"
git clone https://github.com/$TRAVIS_REPO_SLUG.git __temp
cd __temp
git checkout $TRAVIS_BRANCH

echo "Current version number:"
echo "$(npm view . version)"

echo "Getting list of changes"
export commit_msg="$(git log --format=format:"%h %s (%aN)" --no-merges origin/master..)"
echo "$commit_msg"

echo "Calling handle version"
node ./scripts/handle_version.js "$commit_msg"

echo "Deleting cloned repo"
cd ../
rm -rf __temp

echo "Rebuilding with current tag"
yarn build

echo "Next version number:"
export version_number="$(npm view . version)"
echo "$version_number"
