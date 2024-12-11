#!/bin/bash

# Check if running as root
if [ "$(id -u)" != "0" ]; then
   echo "This script must be run as root" 
   exit 1
fi

# Copy service file
cp tax-certification.service /etc/systemd/system/

# Reload systemd
systemctl daemon-reload

# Enable service
systemctl enable tax-certification.service

echo "Service installed. You can now:"
echo "Start: systemctl start tax-certification"
echo "Stop: systemctl stop tax-certification"
echo "Check status: systemctl status tax-certification"
