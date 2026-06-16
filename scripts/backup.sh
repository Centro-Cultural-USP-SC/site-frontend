#!/bin/bash

DATE=$(date +%Y-%m-%d_%H-%M-%S)

mkdir -p backups

docker exec centro-cultural-db-1 \
pg_dump -U admin centro_cultural \
> backups/backup_$DATE.sql

find backups -type f -mtime +30 -delete

echo "Backup criado:"
echo "backups/backup_$DATE.sql"