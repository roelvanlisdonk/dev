

# Pull
cls
cd "C:\Projects\ZvdZ\businessservice\ZvdZ.BS.Service"
git pull

cls
cd "C:\Projects\ZvdZ\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web"
git pull

cls
cd "C:\Projects\ZvdZ\mijnzvdz"
git pull



# Pull and rebuild
cls
cd "C:\Projects\ZvdZ\businessservice\ZvdZ.BS.Service"
git pull
devenv "C:\Projects\ZvdZ\businessservice\ZvdZBusinessService.sln" /Clean
devenv "C:\Projects\ZvdZ\businessservice\ZvdZBusinessService.sln" /Build "Debug"

cls
cd "C:\Projects\ZvdZ\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web"
git pull
devenv "C:\Projects\ZvdZ\zvdzonline\ZvdZOnline.sln" /Clean
devenv "C:\Projects\ZvdZ\zvdzonline\ZvdZOnline.sln" /Build "Debug"
npm run gulp apply-theming

cls
cd "C:\Projects\ZvdZ\mijnzvdz\Web"
git pull
devenv "C:\Projects\ZvdZ\mijnzvdz\MijnZvdZ.sln" /Clean
devenv "C:\Projects\ZvdZ\mijnzvdz\MijnZvdZ.sln" /Build "Debug"
npm run gulp apply-theming

cls
cd "C:\Projects\ZvdZ\xmlinterface"
git pull
devenv "C:\Projects\ZvdZ\xmlinterface\XmlInterface.sln" /Clean
devenv "C:\Projects\ZvdZ\xmlinterface\XmlInterface.sln" /Build "Debug"

cls
cd "C:\Projects\ZvdZ\database"
git pull




# Switch branches
# Master: "master"
# Choco: "release/20161223-ChocoladeGlas"


# Switch to a branch release/????
cls
cd "C:\Projects\ZvdZ\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web"
git checkout "release/????"
git pull
git clean -d -x -f
npm install
npm run gulp apply-theming
devenv "C:\Projects\ZvdZ\zvdzonline\ZvdZOnline.sln" /Clean
devenv "C:\Projects\ZvdZ\zvdzonline\ZvdZOnline.sln" /Build "Debug"


# Switch to master
cls
cd "C:\Projects\ZvdZ\businessservice\ZvdZ.BS.Service"
git checkout "master"
git pull
git clean -d -x -f
devenv "C:\Projects\ZvdZ\businessservice\ZvdZBusinessService.sln" /Clean
devenv "C:\Projects\ZvdZ\businessservice\ZvdZBusinessService.sln" /Build "Debug"

cls
cd "C:\Projects\ZvdZ\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web"
git checkout "master"
git pull
git clean -d -x -f
npm install
devenv "C:\Projects\ZvdZ\zvdzonline\ZvdZOnline.sln" /Clean
devenv "C:\Projects\ZvdZ\zvdzonline\ZvdZOnline.sln" /Build "Debug"
npm run gulp apply-theming

cd "C:\Projects\ZvdZ\mijnzvdz\Web"
git checkout "master"
git clean -d -x -f
npm install
devenv "C:\Projects\ZvdZ\mijnzvdz\MijnZvdZ.sln" /Clean
devenv "C:\Projects\ZvdZ\mijnzvdz\MijnZvdZ.sln" /Build "Debug"
npm run gulp apply-theming




