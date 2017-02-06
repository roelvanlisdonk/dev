
/**
 * Simple stub service base on: http://adrianmejia.com/blog/2016/08/24/Building-a-Node-js-static-file-server-files-over-HTTP-using-ES6/
 */

const fs = require("fs");
const https = require("https");
const path = require('path');
const url = require('url');

// To create the key.pem and cert.pem files for dev, use opensll:
// openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
//
// Cert and key are created for hosheader "stub.service.am.dev".
// Make sure the hosts file on windows contains:
// 127.0.0.1	stub.service.am.dev
const options = {
    key: fs.readFileSync("./libraries/am/stub/key.pem"),
    cert: fs.readFileSync("./libraries/am/stub/cert.pem")
};

// you can pass the parameter in the command line. e.g. node service.js 4433
const port: number = parseInt(process.argv[2]) || 4433;

https.createServer(options, function (req: any, res: any) {
    // Allow calls from all domains, for all methods ans request headers.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    // parse URL
    const parsedUrl = url.parse(req.url);

    // extract URL path
    let pathname = `.${parsedUrl.pathname}`;

    // maps file extention to MIME types
    const mimeType: any = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.eot': 'appliaction/vnd.ms-fontobject',
        '.ttf': 'aplication/font-sfnt'
    };
    
    fs.exists(pathname, function (exist: any) {
        if(!exist) {
        // if the file is not found, return 404
        res.statusCode = 404;
        res.end(`File ${pathname} not found!`);
        return;
        }
        // if is a directory, then look for index.html
        if (fs.statSync(pathname).isDirectory()) {
        pathname += '/index.html';
        }
        // read file from file system
        fs.readFile(pathname, function(err: any, data: any){
        if(err){
            res.statusCode = 500;
            res.end(`Error getting the file: ${err}.`);
        } else {
            // based on the URL path, extract the file extention. e.g. .js, .doc, ...
            const ext = path.parse(pathname).ext;
            // if the file is found, set Content-type and send data
            res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
            res.end(data);
        }
        });
    });
}).listen(port, function() {
    console.log(`Stub service listing on ${port}`);
});