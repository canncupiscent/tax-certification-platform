#!/bin/bash

echo "Starting Tax Certification Platform..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running. Please start Docker Desktop and try again."
    read -p "Press any key to exit..."
    exit 1
fi

# Pull or build the container
if ! docker pull tax-certification-platform:latest; then
    echo "Building container locally..."
    docker build -t tax-certification-platform .
fi

# Stop existing container if running
docker stop tax-cert-app 2>/dev/null
docker rm tax-cert-app 2>/dev/null

# Run the container
docker run --name tax-cert-app -d -p 3000:3000 tax-certification-platform

echo "Application starting..."
echo "Opening browser in 5 seconds..."
sleep 5

# Open browser (works on macOS)
open http://localhost:3000
