"use strict";
var fs = require("fs");
var https = require("https");
var path = require('path');
var url = require('url');
var zlib = require('zlib');
var options = {
    key: fs.readFileSync("./www/libraries/am/stub/key.pem"),
    cert: fs.readFileSync("./www/libraries/am/stub/cert.pem")
};
var port = parseInt(process.argv[2]) || 4433;
https.createServer(options, function (request, response) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", true);
    response.setHeader("Access-Control-Allow-Methods", "*");
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.setHeader("Cache-Control", "public, max-age=31536000");
    response.setHeader("Accept-Ranges", "bytes");
    response.setHeader("Expires", "Tue, 12 Dec 2017 11:11:34 GMT");
    response.setHeader("Last-Modified", "Tue, 14 Feb 2017 11:11:39 GMT");
    var parsedUrl = url.parse(request.url);
    var pathname = "." + parsedUrl.pathname;
    var mimeType = {
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
    fs.exists(pathname, function (exist) {
        if (!exist) {
            response.statusCode = 404;
            response.end("File " + pathname + " not found!");
            return;
        }
        if (fs.statSync(pathname).isDirectory()) {
            pathname += 'www/index.browser.html';
        }
        var ext = path.parse(pathname).ext;
        response.setHeader('Content-type', mimeType[ext] || 'text/plain');
        var raw = fs.createReadStream(pathname);
        var acceptEncoding = request.headers['accept-encoding'];
        if (!acceptEncoding) {
            acceptEncoding = '';
        }
        if (acceptEncoding.match(/\bgzip\b/)) {
            response.writeHead(200, { 'Content-Encoding': 'gzip' });
            raw.pipe(zlib.createGzip()).pipe(response);
        }
        else {
            response.writeHead(200, {});
            raw.pipe(response);
        }
    });
}).listen(port, function () {
    console.log("Stub service listing on " + port);
});
//# sourceMappingURL=service.js.map