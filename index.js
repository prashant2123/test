const http = require('http');
const path = require("path");
const fs = require('fs');

http.createServer((req, res) => {
    let filePath = "." + req.url;
    if (filePath === "./") {
        filePath = "./index.html";  // default page
    }

    const ext = path.extname(filePath).toLowerCase();

    const mimeTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/javascript",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".gif": "image/gif",
        ".svg": "image/svg+xml",
    };

    const contentType = mimeTypes[ext] || "application/octet-stream";

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        }
    });

}).listen(3000, function () {
    console.log('Server is running: http://localhost:3000');
});