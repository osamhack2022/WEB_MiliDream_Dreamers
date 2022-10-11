const express = require('express');
const path = require('path');
const app = express();

const http = require('http').createServer(app);
http.listen(3000, function(){
    console.log('listening in 3000');
});

app.use( express.static( path.join(__dirname, 'survey/build') ) );

app.get('/', function(request, response){
    response.sendFile( path.join(__dirname, 'survey/build/index.html') )
});
