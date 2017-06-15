
# Create release ZvdZ-O only
#
# Notes
# - Close all debug sessions in visual studio, before running this script.
#

#########################################################  DEV #########################################################################
Clear-Host
$MsBuild = "C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\MSBuild\15.0\Bin\MSBuild.exe"
$RootFolder = "C:\Projects\ZvdZ"
$Configuration = "Debug"

#$Branch = "Himaliya"
$Branch = "sprints/genesis"
$BusinessServiceSolutionPath="$RootFolder\businessservice\ZvdZBusinessService.sln"
Set-Location "$RootFolder\businessservice\ZvdZ.BS.Service"
git checkout "$Branch"
git pull
git clean -f
& $MsBuild "$BusinessServiceSolutionPath" /t:restore /p:Configuration="$Configuration" /verbosity:minimal
& $MsBuild "$BusinessServiceSolutionPath" /t:Clean /p:Configuration="$Configuration" /verbosity:minimal
& $MsBuild "$BusinessServiceSolutionPath" /t:Build /p:Configuration="$Configuration" /verbosity:minimal

#$Branch = "release/himaliya"
$Branch = "sprints/genesis"
$ZvdZOSolutionPath="$RootFolder\zvdzonline\ZvdZOnline.sln"
Set-Location "$RootFolder\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web"
git checkout "$Branch"
git pull
git clean -f
npm install
& $MsBuild "$ZvdZOSolutionPath" /t:restore /p:Configuration="$Configuration" /verbosity:minimal
& $MsBuild "$ZvdZOSolutionPath" /t:Clean /p:Configuration="$Configuration" /verbosity:minimal
& $MsBuild "$ZvdZOSolutionPath" /t:Build /p:Configuration="$Configuration" /verbosity:minimal
npm run gulp -- apply-theming

####################################################  Deployment #########################################################################
Clear-Host
$MsBuild = "C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\MSBuild\15.0\Bin\MSBuild.exe"
$RootFolder = "C:\Projects\ZvdZ"
$Configuration = "Release"

$Branch = "Himaliya"
#$Branch = "sprints/genesis"
$BusinessServiceSolutionPath="$RootFolder\businessservice\ZvdZBusinessService.sln"
Set-Location "$RootFolder\businessservice\ZvdZ.BS.Service"
git checkout "$Branch"
git pull
git clean -f
& $MsBuild "$BusinessServiceSolutionPath" /t:restore /p:Configuration="$Configuration" /verbosity:minimal
& $MsBuild "$BusinessServiceSolutionPath" /t:Clean /p:Configuration="$Configuration" /verbosity:minimal
& $MsBuild "$BusinessServiceSolutionPath" /t:Build /p:Configuration="$Configuration" /verbosity:minimal

# TODO: voeg hier het runnen van de "apply-theming" taak toe.

$Branch = "release/himaliya"
#$Branch = "sprints/genesis"
$ZvdZOSolutionPath="$RootFolder\zvdzonline\ZvdZOnline.sln"
Set-Location "$RootFolder\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web"
git checkout "$Branch"
git pull
git clean -f
npm install
& $MsBuild "$ZvdZOSolutionPath" /t:restore /p:Configuration="$Configuration" /verbosity:minimal
& $MsBuild "$ZvdZOSolutionPath" /t:Clean /p:Configuration="$Configuration" /verbosity:minimal
& $MsBuild "$ZvdZOSolutionPath" /t:Build /p:Configuration="$Configuration" /verbosity:minimal

# Create release
& $MsBuild "$ZvdZOSolutionPath" /p:DeployOnBuild=true /p:PublishProfile=Deploy /verbosity:minimal
& $MsBuild "$ZvdZOSolutionPath" /p:DeployOnBuild=true /p:PublishProfile=Deploy /verbosity:minimal /t:AfterPublish





# on locale dev machine
# use a seperate build folder for building

# cd
# git checkout branch
# git clean
# git pull
# nuget restore
# npm restore
# msbuild clean
# msbuild build
# msbuild publish
# msbuild after publish
# create zip
# call deploy agent passing zip en configuration (welke omgeving etc.)
# toon pagina dat "t1" in gebruik is.
# warmup site



# on test workstation
# c






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




