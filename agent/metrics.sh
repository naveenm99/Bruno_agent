#!/bin/bash

MEMORY=$(free -m | awk 'NR==2{printf "%.2f%%\n", $3*100/$2 }')
DISK=$(df -h | awk '$NF=="/"{gsub("%",""); printf "%d%%\n", $5}')
CPU=$(mpstat 1 1 | awk '/Average/ && $12 ~ /[0-9.]+/ { printf "%.2f%%\n", 100 - $12 }')

echo "$MEMORY"
echo "$DISK"
echo "$CPU"

