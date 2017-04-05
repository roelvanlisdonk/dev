
# Keyboard shortcuts

Shortcut            |   Description
F1                  |   Most important shortcut - From this textbox you can control everything.
	
ctrl + enter        |   Inside the commit message textbox, this will commit all changes
ctrl + shift + g	|   Show the commit dialog with focus on commit message
ctrl + shift + e    |   Show explorer dialog, but also toggle between editor and explorer dialog.
ctrl + shift + f    |   Show find and replace dialog.
ctrl + shift + o    |   Find symbols, like functions class names etc.


# Custom keybindings

Shortcut            |   Description
ctrl + s            |   When I press CTRL + S, I want all my files to be saved, not only the one I am currently editing. This is a overwrite of the default behavior.
ctrl + shift + s    |   When I am in the GIT dialog, I want to press CTRL + ENTER to commit the changes and then press CTRL + SHIFT + S to sync the changes.


## keybindings.json
// Place your key bindings in this file to overwrite the defaults
[
    { "key": "ctrl+s",          "command": "workbench.action.files.saveAll" },
    { "key": "ctrl+shift+s",    "command": "workbench.action.git.sync" }
]

More information on keybindings
http://www.hongkiat.com/blog/key-binding-management-visual-studio-code/

