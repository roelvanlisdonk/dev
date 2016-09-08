
This folder contains files that are used to create a custom kendo ui core build.
Most of the information for creating a custom kendo ui core build can be found at: 
https://github.com/telerik/kendo-ui-core#building-only-what-you-need

Steps taken to create a custom kendo ui build:
- git clone https://github.com/telerik/kendo-ui-core.git
- cd kendo-ui-core
- git submodule update --init
- npm run build
- npm install --global gulp
- gulp --version
- gulp build
- gulp --tasks
- gulp custom -c autocomplete,dropdownlist