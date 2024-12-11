#!/bin/bash

# Function to show error dialog
show_error_dialog() {
    osascript -e "display dialog \"$1\" buttons {\"OK\"} default button \"OK\" with icon stop with title \"Error\""
}

# Function to show warning dialog
show_warning_dialog() {
    osascript -e "display dialog \"$1\" buttons {\"Yes\", \"No\"} default button \"No\" with icon caution with title \"Warning\"" | grep "button returned:Yes"
}

# Function to show update dialog
show_update_dialog() {
    osascript -e "display dialog \"$1\" buttons {\"OK\"} default button \"OK\" with icon note with title \"Update Available\""
}

echo "Initializing Tax Certification Platform..."

# Check if Docker is installed
if ! command -v docker > /dev/null; then
    show_error_dialog "Docker is not installed. Please install Docker Desktop from https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    show_error_dialog "Docker is not running. Please start Docker Desktop and try again."
    exit 1
fi

# Check available disk space
FREE_SPACE=$(df -k . | awk 'NR==2 {print $4}')
if [ "$FREE_SPACE" -lt 1000000 ]; then
    if ! show_warning_dialog "Low disk space detected (${FREE_SPACE}K free)\nThe application requires at least 1GB of free space.\nDo you want to continue?"; then
        exit 1
    fi
fi

# Check if port 3000 is available
if lsof -i :3000 > /dev/null; then
    show_error_dialog "Port 3000 is already in use.\nPlease either:\n1. Stop the application using that port\n2. Or contact system administrator"
    exit 1
fi

# Try to pull latest version
echo "Checking for updates..."
if ! docker pull tax-certification-platform:latest; then
    echo "Note: Could not pull latest version, using local build..."
    if ! docker build -t tax-certification-platform .; then
        show_error_dialog "Failed to build container.\nPlease check your internet connection or contact support."
        exit 1
    fi
fi

# Create data volume if it doesn't exist
docker volume create tax-cert-data > /dev/null

# Stop existing container if running
docker stop tax-cert-app > /dev/null 2>&1
docker rm tax-cert-app > /dev/null 2>&1

# Run the container
echo "Starting application..."
if ! docker run --name tax-cert-app -d -p 3000:3000 -v tax-cert-data:/app/data tax-certification-platform; then
    show_error_dialog "Failed to start the application.\nPlease try:\n1. Restarting Docker Desktop\n2. Restarting your computer\n3. Contacting support if the issue persists"
    exit 1
fi

# Wait for application to start
echo "Waiting for application to start..."
sleep 5

# Check if container is still running
if ! docker ps | grep tax-cert-app > /dev/null; then
    echo "Error: Application failed to start properly."
    echo "Checking container logs..."
    docker logs tax-cert-app
    show_error_dialog "Application failed to start properly.\nPlease check the terminal for more information."
    exit 1
fi

# Check for updates
VERSION_INFO=$(docker exec tax-cert-app /app/scripts/version-check.sh)
if echo "$VERSION_INFO" | grep -q '"updateAvailable": true'; then
    show_update_dialog "A new version of the application is available.\nPlease check our website for update instructions."
fi

# Open browser
echo "Opening application in your default browser..."
open http://localhost:3000

echo
echo "Application is running!"
echo "Press Ctrl+C to stop the application"
echo

# Keep the window open
read -r -d '' _