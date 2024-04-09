const http = require('http');
const url = require('url');

const port = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/api/data' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            users: [
                {id: 1, name: "Alice"},
                {id: 2, name: "Bob"},
                {id: 3, name: "Carol"}
            ]
        }));
    } else if (parsedUrl.pathname === '/api/submit' && req.method === 'GET') {
        
        const name = parsedUrl.query.name;
        if (!name) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Name is required');
        } else {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(`Received submission for name: ${name}`);
        }
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

