

# update kendo from downloaded zip:
$srcFolder = "C:\Users\Roel\Downloads\telerik.kendoui.professional.2017.1.118.commercial"
$destFolderMijnZvdZ = "C:\Projects\ZvdZ\mijnzvdz\Web\App\Common\Libraries\kendo"
$destFolderZvdZ = "C:\Projects\ZvdZ\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web\App\Common\Libraries\kendo"
$destFolder = $destFolderMijnZvdZ

Copy-Item "$srcFolder\js\cultures\kendo.culture.en.min.js" -destination "$destFolder\js\cultures" -Force
Copy-Item "$srcFolder\js\cultures\kendo.culture.en-US.min.js" -destination "$destFolder\js\cultures" -Force
Copy-Item "$srcFolder\js\cultures\kendo.culture.nl.min.js" -destination "$destFolder\js\cultures" -Force
Copy-Item "$srcFolder\js\cultures\kendo.culture.nl-NL.min.js" -destination "$destFolder\js\cultures" -Force

Copy-Item "$srcFolder\js\messages\kendo.messages.en-US.min.js" -destination "$destFolder\js\messages" -Force
Copy-Item "$srcFolder\js\messages\kendo.messages.nl-NL.min.js" -destination "$destFolder\js\messages" -Force

Copy-Item "$srcFolder\js\kendo.timezones.min.js" -destination "$destFolder\js" -Force
Copy-Item "$srcFolder\js\kendo.timezones.min.js.map" -destination "$destFolder\js" -Force

Copy-Item "$srcFolder\styles\Default" -destination "$destFolder\styles" -Force -Recurse
Copy-Item "$srcFolder\styles\fonts" -destination "$destFolder\styles" -Force -Recurse
Copy-Item "$srcFolder\styles\images" -destination "$destFolder\styles" -Force -Recurse
Copy-Item "$srcFolder\styles\Material" -destination "$destFolder\styles" -Force -Recurse
Copy-Item "$srcFolder\styles\MaterialBlack" -destination "$destFolder\styles" -Force -Recurse
Copy-Item "$srcFolder\styles\Silver" -destination "$destFolder\styles" -Force -Recurse
Copy-Item "$srcFolder\styles\textures" -destination "$destFolder\styles" -Force -Recurse
Copy-Item "$srcFolder\styles\kendo.common.min.css" -destination "$destFolder\styles\kendo.common.min.css" -Force
Copy-Item "$srcFolder\styles\kendo.common-material.min.css" -destination "$destFolder\styles\kendo.common-material.min.css" -Force
Copy-Item "$srcFolder\styles\kendo.dataviz.min.css" -destination "$destFolder\styles\kendo.dataviz.min.css" -Force
Copy-Item "$srcFolder\styles\kendo.dataviz.silver.min.css" -destination "$destFolder\styles\kendo.dataviz.silver.min.css" -Force
Copy-Item "$srcFolder\styles\kendo.material.min.css" -destination "$destFolder\styles\kendo.material.min.css" -Force
Copy-Item "$srcFolder\styles\kendo.materialblack.min.css" -destination "$destFolder\styles\kendo.materialblack.min.css" -Force
Copy-Item "$srcFolder\styles\kendo.rtl.min.css" -destination "$destFolder\styles\kendo.rtl.min.css" -Force
Copy-Item "$srcFolder\styles\kendo.silver.min.css" -destination "$destFolder\styles\kendo.silver.min.css" -Force
Copy-Item "$srcFolder\styles\kendo.silver.mobile.min.css" -destination "$destFolder\styles\kendo.silver.mobile.min.css" -Force

Copy-Item "$srcFolder\typescript\kendo.all.d.ts" -destination "$destFolder\typescript" -Force


# Update zvdz client Libraries
cd "C:\Projects\ZvdZ\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web"
npm outdated --depth=0
npm update

$srcFolder = "C:\Projects\ZvdZ\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web\node_modules";
$destFolder = "C:\Projects\ZvdZ\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web\App\Common\Libraries"

# angular                      
Copy-Item "$srcFolder\angular\angular-csp.css" -destination "$destFolder\angular\angular-csp.css" -Force
Copy-Item "$srcFolder\angular\angular.js" -destination "$destFolder\angular\angular.js" -Force
Copy-Item "$srcFolder\angular\angular.min.js" -destination "$destFolder\angular\angular.min.js" -Force
Copy-Item "$srcFolder\angular\angular.min.js.map" -destination "$destFolder\angular\angular.min.js.map" -Force

# angular-animate
Copy-Item "$srcFolder\angular-animate\angular-animate.js" -destination "$destFolder\angular-animate\angular-animate.js" -Force
Copy-Item "$srcFolder\angular-animate\angular-animate.min.js" -destination "$destFolder\angular-animate\angular-animate.min.js" -Force
Copy-Item "$srcFolder\angular-animate\angular-animate.min.js.map" -destination "$destFolder\angular-animate\angular-animate.min.js.map" -Force

# angular-sanitize
Copy-Item "$srcFolder\angular-sanitize\angular-sanitize.js" -destination "$destFolder\angular-sanitize\angular-sanitize.js" -Force
Copy-Item "$srcFolder\angular-sanitize\angular-sanitize.min.js" -destination "$destFolder\angular-sanitize\angular-sanitize.min.js" -Force
Copy-Item "$srcFolder\angular-sanitize\angular-sanitize.min.js.map" -destination "$destFolder\angular-sanitize\angular-sanitize.min.js.map" -Force



# TODO - also update locales (not found in npm package):
# C:\Projects\ZvdZ\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web\App\Common\Libraries\angular\i18n\angular-locale_nl-nl.js
# C:\Projects\ZvdZ\zvdzonline\Source\ZvdZOnline\ZvdZOnline.Web\App\Common\Libraries\angular\i18n\angular-locale_nl.js
