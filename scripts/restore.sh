#!/bin/bash

FILE=$1

cat "$FILE" | docker exec -i centro-cultural-db-1 \
psql -U admin centro_cultural