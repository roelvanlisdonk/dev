# C# .NET Core code

This folder contains code written in .NET Core.


## Install chocolatey
I used chocolateley to install .NET Core SDK.
To install chocolateley, use the following line in PowerShell:
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

## Update chocolatey
To update chocolatey use:
choco upgrade chocolatey

## Install .Net Core
To install .NET Core use:
choco install dotnetcore-sdk


## Create .NET Core C# mstest project
Note chocolatey packages can be found at: https://chocolatey.org/packages

To create a .NET Core C# mstest project, first create a directory, e.g.
md "C:\Dev\GitHub\roelvanlisdonk\dev\C#\core\test"

Then execute
dotnet new mstest

Rename the generated core.csproj to core.test.csproj



## Install .NET Core Test Explorer
ctrl + shift + x
Search for .NET core Test Explorer

## Set test project
File > Preferences > Settings > Workspace Settings > Extensions > .NET Core Test Exlorer > Test project Path

or just open Settings.json and enter:
"dotnet-test-explorer.testProjectPath": "**/*.test.csproj"

Now the .NET Core Test Explorer should find the "C:\Dev\GitHub\roelvanlisdonk\dev\C#\core\test\core.test.csproj"