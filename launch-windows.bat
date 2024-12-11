@echo off
echo Starting Tax Certification Platform...

REM Check if Docker is running
docker info > nul 2>&1
if errorlevel 1 (
    echo Docker is not running. Please start Docker Desktop and try again.
    pause
    exit /b
)

REM Pull and run the container
docker pull tax-certification-platform:latest
if errorlevel 1 (
    echo Building container locally...
    docker build -t tax-certification-platform .
)

REM Stop existing container if running
docker stop tax-cert-app 2>nul
docker rm tax-cert-app 2>nul

REM Run the container
docker run --name tax-cert-app -d -p 3000:3000 tax-certification-platform

echo Application starting...
echo Opening browser in 5 seconds...
timeout /t 5 /nobreak

start http://localhost:3000
