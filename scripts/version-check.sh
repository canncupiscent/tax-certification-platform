#!/bin/sh

CURRENT_VERSION=$(sqlite3 /app/data/certifications.db "SELECT version FROM versions ORDER BY installed_at DESC LIMIT 1;")
LATEST_VERSION=$(curl -s https://api.github.com/repos/canncupiscent/tax-certification-platform/releases/latest | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')

if [ -z "$LATEST_VERSION" ]; then
    echo "Error: Could not fetch latest version"
    exit 1
fi

if [ "$CURRENT_VERSION" != "$LATEST_VERSION" ]; then
    echo "{
        \"updateAvailable\": true,
        \"currentVersion\": \"$CURRENT_VERSION\",
        \"latestVersion\": \"$LATEST_VERSION\"
    }"
else
    echo "{
        \"updateAvailable\": false,
        \"currentVersion\": \"$CURRENT_VERSION\",
        \"latestVersion\": \"$LATEST_VERSION\"
    }"
fi
