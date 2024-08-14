import http from 'http';
// server is a computer connected to the internet
// how res and req are passed to http.createServer() ? event-driven-archeticture, like when you click and event listeners
const server = http.createServer((request, response) => {
  if (request.method === 'GET' && request.url === '/') {
    response.statusCode = 200;
    response.end();
  }
})

server.listen(4000, () => {
  console.log("Hello Aya!");
})
