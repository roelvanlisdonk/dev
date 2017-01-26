# Deploy and update app (hot reloading)

* Gulp => manifest.yyyyMMddhhmmss.json
{
    files: [
        { path: './am/services/cuid.js', hash: 'dkls9kekd94ekkjf9999k' }
    ]
}
* Gulp => publish to CDN, only add "new" files.
* Each filename ends with hash:
    * to cachebust cdn
    * to allow multiple version of the app run side by side (A - B testing etc.)
* The app will always have only one version of the file
    * To preserve space
    * only one version of the app can be available on a device at one time.
* Per user settings: User.AppVersion: string => yyyyMMddhhmmss
* Per sync return User.AppVersion if changed, update AppVersion
* When all files are updated, updat client User.AppVersion.
* When file does not exist:
    * Clear System registration
    * System.import it.
    * update file ondisk




