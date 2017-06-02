
# Create release ZvdZ-O only
#
# Notes
# - Close all visual studio instances before running this script
#
cls
$MsBuild = "C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\MSBuild\15.0\Bin\MSBuild.exe"
$RootFolder = "C:\Projects\ZvdZ"
$Branch = "ACC"

# cd "$RootFolder\businessservice\ZvdZ.BS.Service"
# git pull
# $BusinessServiceSolutionPath="$RootFolder\businessservice\ZvdZBusinessService.sln"
# & $MsBuild "$BusinessServiceSolutionPath" /t:Clean /p:Configuration=Release /verbosity:quiet
# & $MsBuild "$BusinessServiceSolutionPath" /t:Build /p:Configuration=Release /verbosity:quiet

# on locale dev machine

# cd
# ask git branch
# git stash
# git checkout branch
# git clean
# git pull
# nuget restore
# npm restore
# msbuild clean
# msbuild build
# msbuild publish
# msbuild after publish
# git checkout branch
# git stash apply


# on test workstation
# copy fiel





cd "$RootFolder\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web"
git pull
$ZvdZOSolutionPath="$RootFolder\zvdzonline\ZvdZOnline.sln"
$ZvdZOPublishProfilePath="$RootFolder\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web\Properties\PublishProfiles\Deploy.pubxml"
& $MsBuild "$ZvdZOSolutionPath" /t:Clean /p:Configuration=Release /verbosity:quiet
& $MsBuild "$ZvdZOSolutionPath" /t:Build /p:Configuration=Release /verbosity:quiet
& $MsBuild "$ZvdZOSolutionPath" /p:DeployOnBuild=true /p:PublishProfile=Deploy /verbosity:detailed

# Los  
& $MsBuild "$ZvdZOSolutionPath" /p:DeployOnBuild=true /p:PublishProfile=Deploy /verbosity:detailed /t:AfterPublish
#& $MsBuild "$ZvdZOSolutionPath" /t:Build /p:Configuration=Release /p:PublishProfile=$ZvdZOPublishProfilePath /verbosity:quiet

#/p:PublishProfile=$ZvdZOPublishProfilePath




# git pull
# $MsBuild $RootFolder\businessservice\ZvdZBusinessService.sln /t:Clean /p:Configuration=Release"
MSBuild "$RootFolder\businessservice\ZvdZBusinessService.sln" /t:Rebuild /p:Configuration=Release

# devenv "$RootFolder\businessservice\ZvdZBusinessService.sln" /Clean "Release"
# devenv "$RootFolder\businessservice\ZvdZBusinessService.sln" /Build "Release"

# cd "$RootFolder\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web"
# git pull
# MSBuild "$RootFolder\zvdzonline\ZvdZOnline.sln" /t:Clean /p:Configuration=Release
# MSBuild "$RootFolder\zvdzonline\ZvdZOnline.sln" /t:Rebuild /p:Configuration=Release

# devenv "$RootFolder\zvdzonline\ZvdZOnline.sln" /Clean "Release"
# devenv "$RootFolder\zvdzonline\ZvdZOnline.sln" /Build "Release"
# npm run gulp apply-theming





# Switch to "Himaliya"
cls
cd "$RootFolder\businessservice\ZvdZ.BS.Service"
git checkout "master"
git pull
git clean -f
devenv "$RootFolder\businessservice\ZvdZBusinessService.sln" /Clean
devenv "$RootFolder\businessservice\ZvdZBusinessService.sln" /Build "Debug"

# Switch to "release/himaliya"
cls
cd "$RootFolder\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web"
git checkout "release/himaliya"
git pull
git clean -f
npm install
npm run gulp apply-theming
devenv "$RootFolder\zvdzonline\ZvdZOnline.sln" /Clean
devenv "$RootFolder\zvdzonline\ZvdZOnline.sln" /Build "Debug"



cls
cd "$RootFolder\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web"
git checkout "master"
git pull
git clean
npm install
devenv "$RootFolder\zvdzonline\ZvdZOnline.sln" /Clean
devenv "$RootFolder\zvdzonline\ZvdZOnline.sln" /Build "Debug"
npm run gulp apply-theming

cd "$RootFolder\mijnzvdz\Web"
git checkout "master"
git clean -f
npm install
devenv "$RootFolder\mijnzvdz\MijnZvdZ.sln" /Clean
devenv "$RootFolder\mijnzvdz\MijnZvdZ.sln" /Build "Debug"
npm run gulp apply-theming




