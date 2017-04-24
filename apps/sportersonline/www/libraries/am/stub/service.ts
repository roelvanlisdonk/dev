
/**
 * Simple stub service base on: http://adrianmejia.com/blog/2016/08/24/Building-a-Node-js-static-file-server-files-over-HTTP-using-ES6/
 */

// Maybay this will help the chrome caching: https://github.com/jshttp/etag


const fs = require("fs");
const http = require("http");
const path = require('path');
const url = require('url');
const zlib = require('zlib');
const livereload = require('livereload');

// To create the key.pem and cert.pem files for dev, use opensll:
// openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
//
// Cert and key are created for hosheader "stub.service.am.dev".
// Make sure the hosts file on windows contains:
// 127.0.0.1	stub.service.am.dev
const options = {
    key: fs.readFileSync("./www/libraries/am/stub/key.pem"),
    cert: fs.readFileSync("./www/libraries/am/stub/cert.pem")
};

// you can pass the parameter in the command line. e.g. node service.js 4433
const port: number = parseInt(process.argv[2]) || 4433;

http.createServer(function (request: any, response: any) {
    // Allow calls from all domains, for all methods ans request headers.
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", true);
    response.setHeader("Access-Control-Allow-Methods", "*");
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.setHeader("Cache-Control", "public, max-age=31536000");
    response.setHeader("Accept-Ranges", "bytes");
    response.setHeader("Expires", "Tue, 12 Dec 2017 11:11:34 GMT");
    response.setHeader("Last-Modified", "Tue, 14 Feb 2017 11:11:39 GMT");
    // response.setHeader("Vary", "Accept-Encoding");
    
    // parse URL
    const parsedUrl = url.parse(request.url);

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
        if (!exist) {
            // if the file is not found, return 404
            response.statusCode = 404;
            response.end(`File ${pathname} not found!`);
            return;
        }
        
        // if is a directory, then look for index.html
        if (fs.statSync(pathname).isDirectory()) {
            pathname += 'www/index.browser.html';
        }

        const ext = path.parse(pathname).ext;
        response.setHeader('Content-type', mimeType[ext] || 'text/plain');

        var raw = fs.createReadStream(pathname);
        var acceptEncoding = request.headers['accept-encoding'];
        if (!acceptEncoding) {
            acceptEncoding = '';
        }


        // Note: this is not a conformant accept-encoding parser.
        // See http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3

        // if (acceptEncoding.match(/\bdeflate\b/)) {
        //     response.writeHead(200, { 'Content-Encoding': 'deflate' });
        //     raw.pipe(zlib.createDeflate()).pipe(response);
        // } else 

        if (acceptEncoding.match(/\bgzip\b/)) {
            response.writeHead(200, { 'Content-Encoding': 'gzip' });
            raw.pipe(zlib.createGzip()).pipe(response);
        } else {
            response.writeHead(200, {});
            raw.pipe(response);
        }

        // read file from file system
        // Because all javascripts are loaded by the module loader, we don't directly read files from filesystem.
        // fs.readFile(pathname, function (err: any, data: any) {
        //     if (err) {
        //         res.statusCode = 500;
        //         res.end(`Error getting the file: ${err}.`);
        //     } else {
        //         // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        //         const ext = path.parse(pathname).ext;
        //         // if the file is found, set Content-type and send data
        //         res.setHeader('Content-type', mimeType[ext] || 'text/plain');
        //         res.end(data);
        //     }
        // });
    });
}).listen(port, function () {
    console.log(`Stub service listing on http://am.dev:${port}`);
});

const wwwDir = path.resolve(__dirname + "/../../../../www");
console.log(wwwDir);

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(wwwDir);