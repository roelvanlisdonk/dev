
# Create release ZvdZ-O only
#
# Notes
# - Close all debug sessions in visual studio, before running this script.
#

#########################################################  DEV #########################################################################
Clear-Host
$MsBuild = "C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\MSBuild\15.0\Bin\MSBuild.exe"
$RootFolder = "C:\Projects\ZvdZ\PRI"
$Configuration = "Debug"

# TODO: when there are changes on the current branch abort build.

#$Branch = "master"
#$Branch = "Test"
$Branch = "Dev"
git checkout "$Branch"
git pull
git clean -f

$BusinessServiceSolutionPath="$RootFolder\businessservice\ZvdZBusinessService.sln"
Set-Location "$RootFolder\businessservice\ZvdZ.BS.Service"
& $MsBuild "$BusinessServiceSolutionPath" /t:restore /p:Configuration="$Configuration" /verbosity:minimal
& $MsBuild "$BusinessServiceSolutionPath" /t:Clean /p:Configuration="$Configuration" /verbosity:minimal
& $MsBuild "$BusinessServiceSolutionPath" /t:Build /p:Configuration="$Configuration" /verbosity:minimal

$ZvdZOSolutionPath="$RootFolder\zvdzonline\ZvdZOnline.sln"
Set-Location "$RootFolder\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web"
npm install
& $MsBuild "$ZvdZOSolutionPath" /t:restore /p:Configuration="$Configuration" /verbosity:minimal
& $MsBuild "$ZvdZOSolutionPath" /t:Clean /p:Configuration="$Configuration" /verbosity:minimal
& $MsBuild "$ZvdZOSolutionPath" /t:Build /p:Configuration="$Configuration" /verbosity:minimal
npm run gulp -- apply-theming

Set-Location "$RootFolder"


#########################################################  CLONE - PRI #########################################################################
cd "C:\Projects\ZvdZ"
git clone https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/pri.git
cd "pri"




#########################################################  DEV - OLD #########################################################################
Clear-Host
$MsBuild = "C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\MSBuild\15.0\Bin\MSBuild.exe"
$RootFolder = "C:\Projects\ZvdZ"
$Configuration = "Debug"

# TODO: when there are changes on the current branch abort build.

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

# TODO: when there are changes on the current branch abort build.

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



cd "C:\Projects\ZvdZ"
cd "C:\Projects\ZvdZ\pri\ZvdZOnline\Source\ZvdZOnline\ZvdZOnline.Web"


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







#################################################################################################################################

# Commit and sync repositories to merge
# Make repositories to merge read-only
# Create repository "pri" at git.zorgvandezaak.nl



cd "C:\Projects\ZvdZ"
git clone https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/pri.git
cd "pri"



# Copy over ZvdZOnline to simpsons

# ZvdZOnline
# https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/zvdzonline.git

# MijnZvdZ
# https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/mijnzvdz.git

# Database
# https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/database.git

# BusinessService
# https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/businessservice.git

# dArbois
# https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/darbois.git

# XmlInterface
# https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/xmlinterface.git

# EOS
# https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/eos.git

# ZvdZComponenten
# https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/zvdzcomponenten.git

# dArbois 2.0
# https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/darbois-2.0.git


# Clone PRI
cd "C:\Projects\ZvdZ"
git clone https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/pri.git
cd "C:\Projects\ZvdZ\PRI"






# Add a remote for and fetch the old repo
git remote add -f "darbois-2.0" "https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/darbois-2.0.git"

# Merge the files from old_a/master into new/master
git merge "darbois-2.0/master" --allow-unrelated-histories


# Move the old_a repo files and folders into a subdirectory so they don’t collide with the other repo coming later
mkdir "darbois-2.0"
dir –exclude ZvdZOnline,MijnZvdZ,Database,BusinessService,dArbois,XmlInterface,EOS,ZvdZComponenten,"darbois-2.0" | %{git mv $_.Name "darbois-2.0"}

# Commit the move
git commit -m "Move darbois-2.0 files into subdir"

git merge -s recursive -Xsubtree="darbois-2.0" --allow-unrelated-histories
git push

cd "C:\Program Files (x86)\Microsoft Visual Studio\2017\Community\Web\External"
cd "C:\Projects\ZvdZ\pri\ZvdZOnline\Source\ZvdZOnline\ZvdZOnline.Web"
cd "C:\Projects\ZvdZ"

git clone "https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/businessservice.git"
cd "C:\Projects\ZvdZ\businessservice" 
git checkout "sprints/genesis"


cd "C:\Projects\ZvdZ"
git clone "https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/zvdzonline.git"
cd "C:\Projects\ZvdZ\zvdzonline"
git checkout "sprints/genesis"



cd "C:\Projects\ZvdZ"
git clone "https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/pri.git"
cd "C:\Projects\ZvdZ\PRI"

git status
git checkout "Dev"

cd "C:\Projects\ZvdZ\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web"
npm install
# git clean -f -d -x

git checkout -b dev_old 1c05f863

#rename the local branch to the new name
git branch -m dev_old Dev

#delete the old branch on remote - where <remote> is eg. origin
git push <remote> --delete old_name

#push the new branch to remote         
git push <remote> new_name

git remote add -f "BusinessService" "https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/businessservice.git"


iisreset



250 426
git config --global core.autocrlf false
    HSE.Frontoffice@tatasteel.com

C:\amUncaught TypeError: Cannot read property 'LoginId' of undefined
    at InloggenAlsController.selecteerGebruiker (inloggen-als.controller.ts:57)
    at HTMLTableRowElement.<anonymous> (inloggen-als.controller.ts:140)
    at HTMLTableElement.dispatch (jquery.min.js:3)
    at HTMLTableElement.q.handle (jquery.min.js:3)



j.devries@wildlands.nl

# Clone Database

cd "C:\Projects\ZvdZ"
git clone https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/database.git
cd "C:\Projects\ZvdZ\Database"
git checkout "sprints/genesis"


cd "C:\Projects\ZvdZ"
git clone https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/mijnzvdz.git
cd "C:\Projects\ZvdZ\MijnZvdZ"
git checkout "sprints/Genesis"

git checkout "Dev"


cd "C:\Projects\ZvdZ\PRI"
git status
git pull
git remote add -f "MijnZvdZ" "https://lisdonr@git.zorgvandezaak.nl/scm/zvdz/mijnzvdz.git"
git add .
git commit -m "zvdz.bs.ef verwijderd, stond op het verkeerde niveau" 

git clean -f -x -d

git status