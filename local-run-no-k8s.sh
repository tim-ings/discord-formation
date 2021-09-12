#!/bin/bash

. .env
if [ -z "$DISCORD_TOKEN" ]; then
  echo "DISCORD_TOKEN is not set in .env"
  exit 1
fi

yarn build && DISCORD_TOKEN=$DISCORD_TOKEN node ./dist/app.js
