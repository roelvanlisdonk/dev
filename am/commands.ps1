# Chocolatey (choco) can be used to install and update programs
# This script assumes chocolatey is installed.


# installing programs
iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex
choco install nuget.commandline



# Upgrading programs
nuget update -self

choco upgrade chocolatey
choco upgrade nodejs
choco upgrade npm






"open hosts file:"
code "C:\Windows\System32\drivers\etc\hosts"

"add programs to path environment variable"
# Make devenv.exe work on the commandline.
# $env:Path = $env:Path + ";C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\IDE"



"Get latest sources from server:"
cd "C:\Projects\ZvdZ\businessservice\ZvdZ.BS.Service"
git pull

cd "C:\Projects\ZvdZ\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web"
git pull

cd "C:\Projects\ZvdZ\mijnzvdz"
git pull

git status
git commit -m "v2 - gulpfile.helpers.js toegevoegd aan git om build timing problemen met apply-theming op te lossen"
git push


# Switch branches
# Master: "master"
# Choco: "release/20161223-ChocoladeGlas"

# Switch to choco
cd "C:\Projects\ZvdZ\businessservice\ZvdZ.BS.Service"
git checkout "release/20161223-ChocoladeGlas"
git pull
git clean -d -x -f
devenv "C:\Projects\ZvdZ\businessservice\ZvdZBusinessService.sln" /Clean
devenv "C:\Projects\ZvdZ\businessservice\ZvdZBusinessService.sln" /Build "Debug"

cd "C:\Projects\ZvdZ\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web"
git checkout "release/20161223-ChocoladeGlas"
git pull
git clean -d -x -f
npm install
npm run gulp apply-theming
devenv "C:\Projects\ZvdZ\zvdzonline\ZvdZOnline.sln" /Clean
devenv "C:\Projects\ZvdZ\zvdzonline\ZvdZOnline.sln" /Build "Debug"

cd "C:\Projects\ZvdZ\mijnzvdz\Web"
git checkout "release/20161223-ChocoladeGlas"
git clean -d -x -f
npm install
npm run gulp apply-theming
devenv "C:\Projects\ZvdZ\mijnzvdz\MijnZvdZ.sln" /Clean
devenv "C:\Projects\ZvdZ\mijnzvdz\MijnZvdZ.sln" /Build "Debug"


# Switch to master
cd "C:\Projects\ZvdZ\businessservice\ZvdZ.BS.Service"
git checkout "master"
git pull
git clean -d -x -f
devenv "C:\Projects\ZvdZ\businessservice\ZvdZBusinessService.sln" /Clean
devenv "C:\Projects\ZvdZ\businessservice\ZvdZBusinessService.sln" /Build "Debug"

cd "C:\Projects\ZvdZ\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web"
git checkout "master"
git pull
git clean -d -x -f
npm install
npm run gulp apply-theming
devenv "C:\Projects\ZvdZ\zvdzonline\ZvdZOnline.sln" /Clean
devenv "C:\Projects\ZvdZ\zvdzonline\ZvdZOnline.sln" /Build "Debug"

cd "C:\Projects\ZvdZ\mijnzvdz\Web"
git checkout "master"
git clean -d -x -f
npm install
npm run gulp apply-theming
devenv "C:\Projects\ZvdZ\mijnzvdz\MijnZvdZ.sln" /Clean
devenv "C:\Projects\ZvdZ\mijnzvdz\MijnZvdZ.sln" /Build "Debug"
