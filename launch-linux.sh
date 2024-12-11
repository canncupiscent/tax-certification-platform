#!/bin/bash

# Function to show error in GUI if available, fallback to terminal
show_error() {
    MESSAGE="$1"
    if command -v zenity >/dev/null; then
        zenity --error --text="$MESSAGE" --title="Error"
    elif command -v kdialog >/dev/null; then
        kdialog --error "$MESSAGE"
    elif command -v xmessage >/dev/null; then
        xmessage -center "ERROR: $MESSAGE"
    else
        echo "ERROR: $MESSAGE"
        read -p "Press Enter to continue..."
    fi
}

# Function to show warning and get confirmation
show_warning() {
    MESSAGE="$1"
    if command -v zenity >/dev/null; then
        zenity --question --text="$MESSAGE" --title="Warning"
        return $?
    elif command -v kdialog >/dev/null; then
        kdialog --warningyesno "$MESSAGE"
        return $?
    elif command -v xmessage >/dev/null; then
        xmessage -center -buttons "Yes:0,No:1" "WARNING: $MESSAGE"
        return $?
    else
        echo "WARNING: $MESSAGE"
        read -p "Do you want to continue? (y/N) " response
        [[ "$response" =~ ^[Yy]$ ]]
        return $?
    fi
}

# Function to show update notification
show_update() {
    MESSAGE="$1"
    if command -v zenity >/dev/null; then
        zenity --info --text="$MESSAGE" --title="Update Available"
    elif command -v kdialog >/dev/null; then
        kdialog --msgbox "$MESSAGE"
    elif command -v xmessage >/dev/null; then
        xmessage -center "UPDATE: $MESSAGE"
    else
        echo "UPDATE: $MESSAGE"
        read -p "Press Enter to continue..."
    fi
}

# Function to open URL in default browser
open_url() {
    URL="$1"
    if command -v xdg-open >/dev/null; then
        xdg-open "$URL"
    elif command -v gnome-open >/dev/null; then
        gnome-open "$URL"
    elif command -v kde-open >/dev/null; then
        kde-open "$URL"
    else
        echo "Please open this URL in your browser: $URL"
    fi
}

echo "Initializing Tax Certification Platform..."

# Check if running with necessary privileges
if [ "$(id -u)" = 0 ]; then
    show_error "Please do not run this script as root/sudo"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker >/dev/null; then
    show_error "Docker is not installed. Please install Docker from your distribution's package manager or visit https://docs.docker.com/engine/install/"
    exit 1
fi

# Check if user is in docker group
if ! groups | grep -q docker && [ "$(id -u)" != 0 ]; then
    show_error "Current user is not in the docker group. Please run:\nsudo usermod -aG docker $USER\nThen log out and back in."
    exit 1
fi

# Check if Docker daemon is running
if ! docker info >/dev/null 2>&1; then
    show_error "Docker daemon is not running. Please start Docker service:\nsudo systemctl start docker"
    exit 1
fi

# Check available disk space
FREE_SPACE=$(df -k . | awk 'NR==2 {print $4}')
if [ "$FREE_SPACE" -lt 1000000 ]; then
    if ! show_warning "Low disk space detected (${FREE_SPACE}K free)\nThe application requires at least 1GB of free space.\nDo you want to continue?"; then
        exit 1
    fi
fi

# Check if port 3000 is available
if netstat -tuln | grep -q ':3000 '; then
    show_error "Port 3000 is already in use.\nPlease either:\n1. Stop the application using that port\n2. Or contact system administrator"
    exit 1
fi

# Try to pull latest version
echo "Checking for updates..."
if ! docker pull tax-certification-platform:latest; then
    echo "Note: Could not pull latest version, using local build..."
    if ! docker build -t tax-certification-platform .; then
        show_error "Failed to build container.\nPlease check your internet connection or contact support."
        exit 1
    fi
fi

# Create data volume if it doesn't exist
docker volume create tax-cert-data >/dev/null

# Stop existing container if running
docker stop tax-cert-app >/dev/null 2>&1
docker rm tax-cert-app >/dev/null 2>&1

# Run the container
echo "Starting application..."
if ! docker run --name tax-cert-app -d -p 3000:3000 -v tax-cert-data:/app/data tax-certification-platform; then
    show_error "Failed to start the application.\nPlease try:\n1. Restarting Docker service\n2. Restarting your computer\n3. Contacting support if the issue persists"
    exit 1
fi

# Wait for application to start
echo "Waiting for application to start..."
sleep 5

# Check if container is still running
if ! docker ps | grep -q tax-cert-app; then
    echo "Error: Application failed to start properly."
    echo "Checking container logs..."
    docker logs tax-cert-app
    show_error "Application failed to start properly.\nPlease check the terminal for more information."
    exit 1
fi

# Check for updates
VERSION_INFO=$(docker exec tax-cert-app /app/scripts/version-check.sh)
if echo "$VERSION_INFO" | grep -q '"updateAvailable": true'; then
    show_update "A new version of the application is available.\nPlease check our website for update instructions."
fi

# Open browser
echo "Opening application in your default browser..."
open_url "http://localhost:3000"

echo
echo "Application is running!"
echo "Press Ctrl+C to stop the application"
echo

# Set up cleanup on script exit
cleanup() {
    echo "\nStopping application..."
    docker stop tax-cert-app >/dev/null 2>&1
    echo "Application stopped."
}

trap cleanup EXIT

# Keep the script running and show logs
docker logs -f tax-cert-app