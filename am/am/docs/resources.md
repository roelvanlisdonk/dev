# Resources

* Resources are assets (json), like code en styling, and are not considered data.
* Resources will be updated like normal assets.
* There are shared resources that should be imported to use them.
* Modules can have there own resources, so not all resources have to be loaded, when not needed


// locales:['en', 'de'],

class Resources {
    public locales:['nl', 'en'];

}

const resources = {
    ok: { nl: 'ok', en: 'ok' }
};