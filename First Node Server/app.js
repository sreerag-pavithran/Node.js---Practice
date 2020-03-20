const http = require('http');
const server = http.createServer((req, res) => {
    const url = req.url;
    if (url === '/') {
        res.write(' <html><head><title>My Page</title></head><body><form action = "/message" method = "POST"><input type = "text" name = "message"><button type = "submit">Send</button></form></body></html> ');
        return res.end();
    }
    res.setHeader('Content-Type', 'text/html');
    res.write(' <html><head><title>My Page</title></head><body><h1>My first node js server response<h1></body></html> ');
    res.end();
});
server.listen(3000);