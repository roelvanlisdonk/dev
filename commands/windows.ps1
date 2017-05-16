
# Microsoft Outlook - Start outlook in safe mode
& "C:\Program Files\Microsoft Office\root\Office16\OUTLOOK.EXE" /safe

# Devolutions - Remote Dekstop Manager - Run as specific user
runas /netonly /user:ada-ict\rlisdonk "C:\Program Files (x86)\Devolutions\Remote Desktop Manager\RemoteDesktopManager.exe"


# Micrososft Internet Information Services (IIS)
iisreset




# Microsoft SQL Server 2016 - Management Studio - Run as specific user
runas /netonly /user:ada-ict\rlisdonk "C:\Program Files (x86)\Microsoft SQL Server\130\Tools\Binn\ManagementStudio\ssms.exe"


# Hosts file - Open in code as administrator
code "C:\Windows\System32\drivers\etc\hosts"


# Add programs to path environment variable
$env:Path = $env:Path + ";C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\IDE"


# List all (including hidden) "*.html" files in a folder recursively and don't truncate the output.
Get-ChildItem "C:\Projects\ZvdZ\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web" -force -recurse | 
Where-Object {$_.Extension -eq ".html"} | Select-Object FullName | Ft -autosize | out-string -width 4096

# Create file
new-item -type file test.txt

