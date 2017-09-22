#!/usr/bin/env bash
export PROCESS_NAME="$(yarn run d-process-name --silent)-${DEPLOY_ENV}"
export TARGET_DIR="${HOME}/${PROCESS_NAME}"
npm install --only=dev
yarn run compile
mkdir "${TARGET_DIR}"
cp ./package.json "${TARGET_DIR}/package.json"
cp ./yarn.lock "${TARGET_DIR}/yarn.lock"
cp ./docker/prod.Dockerfile "${TARGET_DIR}/Dockerfile"
cp -Rf ./dist/ "${TARGET_DIR}/dist"
cd "${TARGET_DIR}"
git init
git add .
git commit -q -am "Push to \"${PROCESS_NAME}\" $(date +"%m_%d_%Y")"
git remote add aptible "${REPO_URL}"
git push -f aptible master
rm -rf "${TARGET_DIR}"

