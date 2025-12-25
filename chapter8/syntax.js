const fs = require('fs');
const handleServer = (req,res)=>{
    if(req.url==="/"){
        res.setHeader('Content-Type' , 'text/html');
        res.write('<html>');  
             res.write ('<body>')
             res.write ('<h1>welcome home page</h1>');
             res.write( '</body>');
             res.write('</html>');        
            return res.end();
        }
      

    else{
            res.write('<html>');
             res.write ('<body>')
             res.write ('<h1>404 Error Find</h1>');
             res.write( '</body>');
             res.write('</html>');        
            return res.end();
    }

};
module.exports = handleServer;
