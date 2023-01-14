#!/bin/bash

EOL=$'\n'
SERVICE_PATH=$1
PREV_COMMIT_ID=$2
HEAD_COMMIT_ID=$3
ENV=$4
S3_BUCKET_NAME=$5
DISTRIBUTION_ID=$6
CODEBUILD_BUILD_URL=$7

deploy() {
  node -v
  npm -v
  yarn -v

  echo "> start build"
  cd "$SERVICE_PATH"

  echo "> yarn install"
  if ! yarn install; then
    exit 255
  fi

  echo "> yarn build"
  if ! yarn build; then
    exit 255
  fi

  echo "> AWS S3 Upload"
  if ! aws s3 sync ./build s3://"$S3_BUCKET_NAME" --exclude "config.json" --delete; then
    exit 255
  fi

  echo "> AWS S3 index.html Replace Metadata"
  if ! aws s3 cp s3://"$S3_BUCKET_NAME" s3://"$S3_BUCKET_NAME" --metadata-directive REPLACE --exclude "*" --include "index.html" --recursive --cache-control "no-cache,no-store,must-revalidate,max-age=0" --content-type "text/html"; then
    exit 255
  fi

  echo "> AWS CloudFront Invalidate"
  if ! aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*"; then
    exit 255
  fi
}

echo "> SERVICE_PATH"
echo "$SERVICE_PATH"
echo

echo "> SERVICE_PACKAGE_NAME"
if SERVICE_PACKAGE_NAME=$(node -p -e "require('$SERVICE_PATH/package.json').name"); then
  echo "$SERVICE_PACKAGE_NAME"
  echo
else
  echo "package.json name field error"
  exit 255
fi

echo "> start deploy"
deploy
