@echo off
setlocal enabledelayedexpansion

echo Initializing Tax Certification Platform...

:: Check if Docker is installed
docker --version > nul 2>&1
if errorlevel 1 (
    echo Error: Docker is not installed.
    echo Please install Docker Desktop from https://www.docker.com/products/docker-desktop
    echo.
    pause
    exit /b 1
)

:: Check if Docker is running
docker info > nul 2>&1
if errorlevel 1 (
    echo Error: Docker is not running.
    echo Please start Docker Desktop and try again.
    echo.
    pause
    exit /b 1
)

:: Check available disk space
for /f "tokens=3" %%a in ('dir /-c 2^>nul ^| find "bytes free"') do set FREE_SPACE=%%a
if !FREE_SPACE! LSS 1000000000 (
    echo Warning: Low disk space detected ^(!FREE_SPACE! bytes free^)
    echo The application requires at least 1GB of free space.
    echo.
    set /p CONTINUE="Do you want to continue anyway? (Y/N): "
    if /i "!CONTINUE!" neq "Y" exit /b 1
)

:: Check if port 3000 is available
netstat -ano | find "3000" > nul
if not errorlevel 1 (
    echo Error: Port 3000 is already in use.
    echo Please either:
    echo 1. Stop the application using that port
    echo 2. Or contact system administrator
    echo.
    pause
    exit /b 1
)

:: Try to pull latest version
echo Checking for updates...
docker pull tax-certification-platform:latest
if errorlevel 1 (
    echo Note: Could not pull latest version, using local build...
    docker build -t tax-certification-platform .
    if errorlevel 1 (
        echo Error: Failed to build container.
        echo Please check your internet connection or contact support.
        echo.
        pause
        exit /b 1
    )
)

:: Create data volume if it doesn't exist
docker volume create tax-cert-data > nul 2>&1

:: Stop existing container if running
docker stop tax-cert-app > nul 2>&1
docker rm tax-cert-app > nul 2>&1

:: Run the container
echo Starting application...
docker run --name tax-cert-app -d -p 3000:3000 -v tax-cert-data:/app/data tax-certification-platform
if errorlevel 1 (
    echo Error: Failed to start the application.
    echo Please try:
    echo 1. Restarting Docker Desktop
    echo 2. Restarting your computer
    echo 3. Contacting support if the issue persists
    echo.
    pause
    exit /b 1
)

:: Wait for application to start
echo Waiting for application to start...
timeout /t 5 /nobreak > nul

:: Check if container is still running
docker ps | find "tax-cert-app" > nul
if errorlevel 1 (
    echo Error: Application failed to start properly.
    echo Checking container logs...
    docker logs tax-cert-app
    echo.
    pause
    exit /b 1
)

:: Check for updates
for /f "tokens=*" %%a in ('docker exec tax-cert-app /app/scripts/version-check.sh') do set VERSION_INFO=%%a
echo !VERSION_INFO! | find "updateAvailable": true > nul
if not errorlevel 1 (
    echo.
    echo =============================================
    echo UPDATE AVAILABLE
    echo A new version of the application is available.
    echo Please check our website for update instructions.
    echo =============================================
    echo.
)

:: Open browser
echo Opening application in your default browser...
start http://localhost:3000

echo.
echo Application is running!
echo Press Ctrl+C to stop the application
echo.

:: Keep the window open
pause > nul