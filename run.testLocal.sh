#!/bin/bash
set -e

# Use same DATABASE_URL as run.beLocal.sh
# Edit this to match your Neon connection string
export DATABASE_URL="${DATABASE_URL:-postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require}"
export NODE_ENV=test

echo "Running API tests (DATABASE_URL must be set and migrations run)..."

npm run test:api
