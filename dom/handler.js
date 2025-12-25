const http = require("http");

const requestHandlers = require('./calculator');
const server = http.createServer(requestHandlers);
const PORT = 3000;
server.listen(PORT,()=>{
    console.log(`server is running on address http://localhost:${PORT}`);
});