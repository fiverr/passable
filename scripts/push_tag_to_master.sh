git config --global user.email "${GIT_NAME}@users.noreply.github.com" --replace-all
git config --global user.name $GIT_NAME

echo "Cloning repo"
git clone https://github.com/$TRAVIS_REPO_SLUG.git __temp
cd __temp
git checkout $TRAVIS_BRANCH

echo "Getting list of changes"
msg="$(git log --format=format:"%h %s (%aN)" --no-merges origin/satmer..)"
echo "$msg"

echo "Deleting cloned repo"
cd ../
rm -rf __temp

echo "Removing old satmer"
git branch -D satmer

echo "Switching to satmer"
git checkout -b satmer

node ./scripts/handle_version.js "$msg"

echo "Rebuilding with current tag"
npm run build

EMOJIS=(🚀 🤘 ✨ 🔔 🌈 🤯)
EMOJI=${EMOJIS[$RANDOM % ${#EMOJIS[@]}]}

export pass_ver="$(npm view . version)"

git add .

if (( $(grep -c . <<<"$msg") > 1 )); then
    git commit -m "$EMOJI Passable cumulative update: $(npm view . version)" -m "$msg"
else
    git commit -m "$EMOJI Passable update: $(npm view . version)" -m "$msg"
fi

echo "Pushing to satmer"
git push https://${GITHUB_TOKEN}@github.com/$GITHUB_REPO.git satmer
