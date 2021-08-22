#!/bin/bash

sh ./local-set-context.sh

function is_pod_running() {
  POD_NAME=$(kubectl get pods -n discord-formation -o jsonpath="{.items[0].metadata.name}")
  kubectl logs -n discord-formation $POD_NAME >/dev/null 2>&1
  if [ $? -ne 0 ]; then
    return 1
  fi
  return 0
}

for i in {1..10}; do
  echo 'Checking if discord-formation is up (attempt '$i')...'
  if is_pod_running; then
    echo 'discord-formation is running'
    break
  else
    if [ $i -eq 10 ]; then
      echo 'discord-formation failed to start after 10s'
      exit 1
    fi
    sleep 1
  fi
done

POD_NAME=$(kubectl get pods -n discord-formation -o jsonpath="{.items[0].metadata.name}")
kubectl logs -n discord-formation --follow $POD_NAME
