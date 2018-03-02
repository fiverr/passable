echo $TRAVIS_COMMIT
next_version="next-"${TRAVIS_COMMIT:(-6)}
echo $next_version