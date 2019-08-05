echo "Preparing next tag"
passable_version=$(node -p -e "require('./package.json').version")
next_version="${passable_version}-next-${TRAVIS_COMMIT:(0):6}"
echo $next_version
npm version $next_version --no-git-tag-version
