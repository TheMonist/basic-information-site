const http = require('http');
const url = require('url');
const fs = require('fs');
const PORT = 8080;

const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => {
    if (err) throw err;
    return data;
})

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    const filename = req.url === "/" ? "./index.html":`./${q.pathname}.html`;

    fs.readFile(filename, (err, data) => {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.write(page404);
          return res.end();
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        }
      });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});