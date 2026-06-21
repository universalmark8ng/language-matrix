#!/usr/bin/env bash
# One-command deploy to GitHub Pages (gh-pages branch).
#   npm run deploy
# Builds the app and force-pushes dist/ to the gh-pages branch. Used instead of
# an Actions workflow because the local gh token lacks `workflow` scope.
set -e

REPO="https://github.com/universalmark8ng/language-matrix.git"
cd "$(dirname "$0")/.."

npm run build

cd dist
rm -rf .git
git init -q
git checkout -q -b gh-pages
git add -A
git -c user.name="Universal Mark8ng" -c user.email="nikhil@jaitly.in" commit -q -m "deploy $(date -u +%Y-%m-%dT%H:%MZ)"
git -c http.version=HTTP/1.1 push -q --force "$REPO" gh-pages
cd ..
echo "Deployed → https://universalmark8ng.github.io/language-matrix/"
