#!/bin/sh

# Initialize database
echo "Checking database..."
/app/scripts/init-db.sh

# Check for updates
echo "Checking for updates..."
/app/scripts/version-check.sh > /app/data/version-status.json

# Start the Next.js application
echo "Starting Tax Certification Platform..."
echo "Application will be available at http://localhost:3000"
NODE_ENV=production npm run start
