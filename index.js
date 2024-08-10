const http = require('http');
const url = require('url');
const fs = require('fs');
const PORT = 8080;

const server = http.createServer(function(req, res){
    const q = url.parse(req.url, true);
    const filename = req.url === "/" ? "./index.html":`./${q.pathname}.html`;
    const fileNotFount = './404';

    fs.readFile(filename, (err, data) => {
        if (err) {
          res.writeHead(404, {'Content-Type': 'text/html'});
          return res.end("404 Not Found");
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

/* 
http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080);
*/