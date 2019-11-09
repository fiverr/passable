echo "Preparing next tag"
echo "Logging passable version"
echo $pass_ver
next_version="next-${TRAVIS_COMMIT:(0):6}"
echo $next_version
npm version $next_version --no-git-tag-version
