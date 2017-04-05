var fs = require("fs");
var https = require("http2");
var path = require('path');
var url = require('url');
var options = {
    key: fs.readFileSync("./libraries/am/stub/key.pem"),
    cert: fs.readFileSync("./libraries/am/stub/cert.pem")
};
var port = parseInt(process.argv[2]) || 4433;
https.createServer(options, function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    var parsedUrl = url.parse(req.url);
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
            res.statusCode = 404;
            res.end("File " + pathname + " not found!");
            return;
        }
        if (fs.statSync(pathname).isDirectory()) {
            pathname += '/index.html';
        }
        fs.readFile(pathname, function (err, data) {
            if (err) {
                res.statusCode = 500;
                res.end("Error getting the file: " + err + ".");
            }
            else {
                var ext = path.parse(pathname).ext;
                res.setHeader('Content-type', mimeType[ext] || 'text/plain');
                res.end(data);
            }
        });
    });
}).listen(port, function () {
    console.log("Stub service listing on " + port);
});
//# sourceMappingURL=service.js.map