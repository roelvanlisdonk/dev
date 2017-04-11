
# Install chocolatey
iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex


# install
# DO NOT: choco install npm, it is deprecated.
choco install nuget.commandline
choco install nodejs
choco install openssl.light --force -y


# check current version
node -v
npm -version


# Update installed programs
# DO NOT: choco upgrade npm, it is deprecated.
nuget update -self
choco upgrade chocolatey -y
choco upgrade nodejs -y

# TO DO investigate which of the following to lines should be used.
npm i -g npm
npm install -g npm@latest

# Update npm global packages
npm outdated -g --depth=0
npm update -g


# check versions
node -v
npm -version


# Uninstall programs
choco uninstall npm -y --remove-dependencies
choco uninstall nodejs -y --remove-dependencies

