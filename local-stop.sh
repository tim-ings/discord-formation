#!/bin/bash

sh ./local-set-context.sh

sudo helm uninstall -n discord-formation discord-formation || true
