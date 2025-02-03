#!/bin/sh

# Show message to the cli
echo "[INFO] Sabar yak mas, server sedang dalam proses di-jalankan! 🚀"

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# Run database seeding
npx node prisma/seed.js

# Start the application
exec node dist/index.js