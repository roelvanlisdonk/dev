
# clone
git clone https://github.com/roelvanlisdonk/apps.git
git clone https://github.com/After-Midnight/am.git


# commit (add files to staging and commit with message)
git commit -a -m "v2 - gulpfile.helpers.js toegevoegd aan git om build timing problemen met apply-theming op te lossen"
git push


# stash (used to temporarily save sources before switching branch)
git stash list
git stash show
git stash apply
git stash clear
git stash


# status
git status

# clean working folder
# Note: this will remove the complete "node_modules" folder, so be carefull, when using it.
git clean -f -x -d


# SSL uitschakelen
git config --global http.sslVerify false


