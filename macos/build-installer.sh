#!/bin/bash

# Set variables
APP_NAME="Tax Certification"
DMG_NAME="${APP_NAME}.dmg"
VOLUME_NAME="${APP_NAME} Installer"

# Create a temporary directory for building the DMG
TMP_DIR=$(mktemp -d)
DMG_DIR="$TMP_DIR/$VOLUME_NAME"
mkdir -p "$DMG_DIR"

# Copy the .app bundle
cp -R "Tax Certification.app" "$DMG_DIR/"

# Create Applications symlink
ln -s /Applications "$DMG_DIR/Applications"

# Create background directory
mkdir "$DMG_DIR/.background"
cp resources/background.png "$DMG_DIR/.background/"

# Create DMG
hdiutil create -volname "$VOLUME_NAME" -srcfolder "$DMG_DIR" -ov -format UDZO "$DMG_NAME"

# Cleanup
rm -rf "$TMP_DIR"

echo "Installer created: $DMG_NAME"
