
const https = require("https");
const fs = require("fs");

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
const port = 4433;

https.createServer(options, function (req: any, res: any) {
    // Allow calls from all domains, for all methods ans request headers.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    res.end(`Request received on server. Path Hit: ${res.url}`);
}).listen(port, function() {
    console.log(`Stub service listing on ${port}`);
});