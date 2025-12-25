const http = require('http');
const handleServer = require('./syntax');
const server = http.createServer(handleServer);
const PORT = 3002;
server.listen(PORT , ()=> {
    console.log(`server running on address http://localhost:${PORT}`);
});  