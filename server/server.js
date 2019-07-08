const path = require('path');
const express = require('express');
const http = require('http');
const pathBuilder = path.join(__dirname,'../public');
const fs = require('fs');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3010;
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.static(pathBuilder),);
io.on('connection',(socket)=>{
   console.log("new user connected");

   socket.on('disconnect',()=>{
       console.log("user was disconnected");
   })
});

server.listen(port,()=>{
    console.log(`server is up on ${port}`);
});