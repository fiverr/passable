cp ./README.md ./documentation/MAIN.md

node ./scripts/make_version_file.js
find ./documentation -type f > ./tree.txt
node ./scripts/add_version_to_files.js

passable_version=$(<version.txt)

git config --global user.email $GIT_EMAIL
git config --global user.name $GIT_NAME
git config --global github.token $GITHUB_TOKEN

git clone -b $DOCS_BRANCH git@github.com:fiverr/passable.git docs
rm -rf docs/*

npx node-sass documentation/assets/style -o documentation/assets/style --output-style compressed
npx docpress b
cd docs
rm -rf assets/style/**/*.scss

git add .
git commit -m "Updating Documentation: $passable_version"
git push git@github.com:fiverr/passable.git $DOCS_BRANCH
