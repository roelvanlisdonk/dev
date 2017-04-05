
# Getting node and nmp version
node -v
npm -version


# List packages
npm list -g --depth=0
npm list --depth=0


# Install packages
npm install -g cordova


# Install global package
npm install -g typescript@2.2.1
npm install -g typings@2.1.0


# Update all global packages
npm update -g
npm update


# Update global package typescript
npm update -g typescript@2.1.6


# Check for outdated packages
npm outdated -g --depth=0
npm outdated --depth=0


# Uninstall global package
npm uninstall -g typescript
npm list -g --depth=0
npm config get prefix