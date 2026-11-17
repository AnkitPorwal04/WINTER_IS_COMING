#!/bin/zsh
# Builds WinterIsComing.app into ~/Applications (or the directory given as $1).
# Double-click the app to start snowing; the ❄︎ in the menu bar toggles it.
set -e
cd "$(dirname "$0")"

DEST="${1:-$HOME/Applications}"
APP="$DEST/WinterIsComing.app"

mkdir -p "$APP/Contents/MacOS"
swiftc -O WinterIsComing.swift -o "$APP/Contents/MacOS/WinterIsComing"

cat > "$APP/Contents/Info.plist" <<'PLIST'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleName</key>
	<string>WinterIsComing</string>
	<key>CFBundleDisplayName</key>
	<string>Winter Is Coming</string>
	<key>CFBundleExecutable</key>
	<string>WinterIsComing</string>
	<key>CFBundleIdentifier</key>
	<string>com.ankitporwal.winter-is-coming</string>
	<key>CFBundleShortVersionString</key>
	<string>1.2.0</string>
	<key>CFBundleVersion</key>
	<string>1.2.0</string>
	<key>CFBundlePackageType</key>
	<string>APPL</string>
	<key>LSMinimumSystemVersion</key>
	<string>13.0</string>
	<key>LSUIElement</key>
	<true/>
	<key>NSHighResolutionCapable</key>
	<true/>
</dict>
</plist>
PLIST

echo "❄︎ Built $APP"
echo "   Double-click it (or: open \"$APP\") and let it snow."
