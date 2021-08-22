#!/bin/bash

sh ./local-set-context.sh

. .env
if [ -z "$DISCORD_TOKEN" ]; then
  echo "DISCORD_TOKEN is not set in .env"
  exit 1
fi

sudo helm upgrade -i discord-formation ./helm/discord-formation \
  --namespace discord-formation --create-namespace \
  -f ./helm/discord-formation/values.local.yaml \
  --set localSecrets.token=$DISCORD_TOKEN
