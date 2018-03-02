echo "Preparing next tag"
passable_version=$(<version.txt)
next_version="${passable_version}-next-${TRAVIS_COMMIT:(-6):6}"
echo $next_version
npm version $next_version --no-git-tag-version