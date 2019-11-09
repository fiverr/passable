echo "Preparing next tag"

echo "Logging passable version:"
echo $version_number

next_version="${version_number}-next-${TRAVIS_COMMIT:(0):6}"

echo $next_version
npm version $next_version --no-git-tag-version
