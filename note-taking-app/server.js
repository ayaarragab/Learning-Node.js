import http from "node:http"

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('content-type', 'text/plain');
    response.end("Hello there");
})

server.listen(4000, () => {
    console.log(`server running on port http://localhost:4000`);
})
