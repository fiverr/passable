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

node ./scripts/handle_version.js "$commit_msg"

echo "Next version number:"
export version_number="$(npm view . version)"
echo "$version_number"

echo "Deleting cloned repo"
cd ../
rm -rf __temp
