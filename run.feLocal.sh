#!/bin/bash
set -e

# Frontend environment variables for local development
export NODE_ENV=development

# Use empty string so API requests go through Vite proxy (localhost:5173 -> localhost:3001)
# Override with full URL if running without proxy (e.g. VITE_API_URL=http://localhost:3001)
export VITE_API_URL="${VITE_API_URL:-}"

# Optional: Load from .env if it exists in apps/web
if [ -f "apps/web/.env" ]; then
  set -a
  source apps/web/.env
  set +a
fi

echo "Starting frontend dev server on http://localhost:5173"
echo "API proxy targets: http://localhost:3001"

# Start the web app (from project root, uses workspace)
npm run dev:web
