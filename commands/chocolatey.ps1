
# Install chocolatey
iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex


# install
# DO NOT: choco install npm, it is deprecated.
choco install nuget.commandline
choco install nodejs
choco install openssl.light --force -y


# check versions
node -v
npm -version

# Update installed programs
# DO NOT: choco upgrade npm, it is deprecated.
nuget update -self
choco upgrade chocolatey -y
choco upgrade nodejs -y

# Update npm.
npm install -g npm

# Update npm global packages
npm outdated -g --depth=0
npm update -g

# Uninstall programs
choco uninstall npm -y --remove-dependencies
choco uninstall nodejs -y --remove-dependencies

