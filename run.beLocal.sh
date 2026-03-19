#!/bin/bash
set -e

# Backend environment variables for local development
# Paste your Neon connection string below (from https://console.neon.tech)
export DATABASE_URL="${DATABASE_URL:-postgresql://neondb_owner:npg_aAJKTH1QdGe2@ep-lucky-union-a1f24mvx-pooler.ap-southeast-1.aws.neon.tech/woundtech?sslmode=require&channel_binding=require}"
export PORT="${PORT:-3001}"
export NODE_ENV=development

echo "Starting API server on port $PORT"
echo "Database: Neon (connection configured)"

# Run migrations before starting
npm run db:migrate

# Start the API (from project root, uses workspace)
npm run dev:api
