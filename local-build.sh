#!/bin/bash

sh ./local-set-context.sh

VERSION=$(cat ./helm/discord-formation/Chart.yaml | grep version | awk '{ print $2 }')
docker build -t discord-formation:${VERSION} .

if [[ "$LOCAL_KUBE_CONTEXT" = "minikube" ]]; then
  # minikube uses a separate daemon to the host, so images built on the host need to be transferred to it
  docker save discord-formation:${VERSION} | (eval $(minikube docker-env) && docker load)
elif [[ ! -z "$LOCAL_KUBE_CONTEXT" ]]; then
  # kind uses a separate daemon to the host, so images built on the host need to be transferred to it
  kind load docker-image discord-formation:${VERSION} --name $LOCAL_KUBE_CONTEXT
fi
